#!/bin/bash

# Set up clock
VBoxService --timesync-set-threshold 60000
mv /etc/localtime /etc/localtime-default && ln /usr/share/zoneinfo/US/Central /etc/localtime
echo 'ZONE="/US/Central"' > /etc/sysconfig/clock

# Install packages
#

# Webtatic
rpm -Uvh https://mirror.webtatic.com/yum/el6/latest.rpm

# EPEL
yum install -y epel-release

# NodeSource v6 (nodejs and npm)
curl --silent --location https://rpm.nodesource.com/setup_6.x | bash -

yum upgrade -y

yum install -y automake gcc perl kernel-devel dkms

# Disable SELinux
perl -i -pe 's/^SELINUX=\Kpermissive/disabled/g' /etc/selinux/config
setenforce 0

yum install -y yum-plugin-replace && \
yum replace -y mysql-libs --replace-with mysql55w-libs && \
yum install -y \
httpd httpd-devel \
mod_ssl openssl \
openssl-devel libmcrypt \
readline-devel \
mysql55w-server mysql55w mysql55w-devel \
php56w php56w-cli php56w-common php56w-mbstring php56w-mcrypt php56w-mysqlnd php56w-pdo php56w-xml \
mod_fcgid \
git man man-pages vim-enhanced colordiff source-highlight yum-utils \
nodejs


# Disable mod_php
truncate -s0 /etc/httpd/conf.d/php.conf

# PHP and FCGI conf
printf "\ncgi.fix_pathinfo=1" >> /etc/php.ini
printf "\nPHP_Fix_Pathinfo_Enable 1" >> /etc/httpd/conf.d/fcgid.conf

# Create PHP suexec wrapper script
mkdir -vp /var/www/php-fcgi-scripts/vagrant
cat <<'PHPWRAPPER' > /var/www/php-fcgi-scripts/vagrant/php-fcgi-starter
#!/bin/sh
PHPRC=/etc/
export PHPRC
export PHP_FCGI_MAX_REQUESTS=5000
export PHP_FCGI_CHILDREN=8
exec /usr/bin/php-cgi
PHPWRAPPER
chmod 755 /var/www/php-fcgi-scripts/vagrant/php-fcgi-starter
chown -R vagrant:vagrant /var/www/php-fcgi-scripts/vagrant

# Generate self-signed key, certificate
cd /etc/pki/tls/
openssl genrsa -out private/ca.key
openssl req -new -key private/ca.key -out private/ca.csr -subj "/C=US/ST=Kansas/L=Kansas City/O=Juniper Gardens Children's Project/OU=Technology Innovation and Development Lab/CN=localhost"
openssl x509 -req -days 365 -in private/ca.csr -signkey private/ca.key -out certs/ca.crt
cd -

# Configure mod_ssl to use generated key and certificate
perl -i -pe 's/^SSLCertificateFile \K.*$/\/etc\/pki\/tls\/certs\/ca.crt/' /etc/httpd/conf.d/ssl.conf
perl -i -pe 's/^SSLCertificateKeyFile \K.*$/\/etc\/pki\/tls\/private\/ca.key/' /etc/httpd/conf.d/ssl.conf

# Set up httpd configuration
cat <<'HTTPDCONF' >> /etc/httpd/conf/httpd.conf
DirectoryIndex index.php
SuexecUserGroup vagrant vagrant
NameVirtualHost *:443
<Directory "/var/www/html">
    Options +ExecCGI
    EnableSendfile Off
    AllowOverride All
    AddHandler fcgid-script .php
    FCGIWrapper /var/www/php-fcgi-scripts/vagrant/php-fcgi-starter .php
    Order allow,deny
    Allow from all
</Directory>
<VirtualHost *:80>
    DocumentRoot /var/www/html
    ServerName localhost
</VirtualHost>
<VirtualHost *:443>
    SSLEngine on
    SSLCertificateFile /etc/pki/tls/certs/ca.crt
    SSLCertificateKeyFile /etc/pki/tls/private/ca.key
    DocumentRoot /var/www/html
    ServerName localhost
</VirtualHost>
HTTPDCONF

# Point Apache configured doc root to project public directory
rmdir /var/www/html && ln -sT /vagrant/public /var/www/html

# Install composer locally in a PATH location (https://getcomposer.org/doc/faqs/how-to-install-composer-programmatically.md)
EXPECTED_SIGNATURE=$(wget -q -O - https://composer.github.io/installer.sig)
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
ACTUAL_SIGNATURE=$(php -r "echo hash_file('SHA384', 'composer-setup.php');")
if [ "$EXPECTED_SIGNATURE" != "$ACTUAL_SIGNATURE" ]
then
    >&2 echo 'ERROR: Invalid installer signature'
    rm composer-setup.php
    exit 1
fi
mkdir -v /root/bin
php composer-setup.php --install-dir=/root/bin --filename=composer
RESULT=$?
rm composer-setup.php
echo $RESULT

# Set up local database access
service mysqld start
cat <<'ICONNECTDB' | mysql -uroot
grant all on *.* to 'root'@'10.0.2.2';
create database iconnect;
create user 'iconnectdata'@'localhost' identified by 'secret';
grant all on iconnect.* to 'iconnectdata'@'localhost';
flush privileges;
ICONNECTDB

# Optional provisioning: add any dotfile personalizations

# Use solarized source-highlight colors from https://github.com/jrunning/source-highlight-solarized
yes n | source-highlight-settings  # Make sure configuration file exists; use default datadir
cd /root
git clone https://github.com/jrunning/source-highlight-solarized
ln -sf /root/source-highlight-solarized/esc-solarized.outlang /usr/share/source-highlight/esc.outlang
ln -sf /root/source-highlight-solarized/esc-solarized.style /usr/share/source-highlight/esc.style

# Add some custom bash configuration with useful aliases
# Need to source the file
cat <<'BASHRCLOCAL' > /root/.bashrc.local
cd /vagrant
alias phpunit='vendor/bin/phpunit --colors=always'
alias phpunitvvv='vendor/bin/phpunit --colors=always --debug --verbose'
alias resetdb='php artisan migrate:refresh --seed'
alias resetdb-test='php artisan migrate:refresh --seed --env=testing --database=sqlite'
alias recreatedb='mysql -uroot -e "drop database iconnect; create database iconnect;"'
alias recreatedb-test='truncate -s0 database/testing.sqlite'
alias icinit='composer self-update && composer install && resetdb && resetdb-test'
BASHRCLOCAL

# Create a VirtualBox Guest Additions installer script
cat <<'VBGAINSTALL' > /root/bin/vbga-install
#!/bin/sh

VBOXVER="$1"

cd /root && \
curl -fO http://download.virtualbox.org/virtualbox/$VBOXVER/VBoxGuestAdditions_$VBOXVER.iso && \
mkdir -vp /media/VBoxGuestAdditions && \
mount -o loop,ro VBoxGuestAdditions_$VBOXVER.iso /media/VBoxGuestAdditions && \
sh /media/VBoxGuestAdditions/VBoxLinuxAdditions.run
VBGAINSTALL
chmod 700 /root/bin/vbga-install

# Assuming kernel was updated, reboot into the latest kernel
reboot
