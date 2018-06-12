# -*- mode: ruby -*-
# vi: set ft=ruby :

# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version (we support older styles for
# backwards compatibility). Please don't change it unless you know what
# you're doing.
Vagrant.configure(2) do |config|
  # Sync this version with deployment server version (e.g. deptsec, /etc/redhat-release)
  config.vm.box = 'bento/centos-6.9'

  # Forward 4567 to http, 4568 to https, 5678 to mysql
  config.vm.network :forwarded_port, host: 4568, guest: 443
  config.vm.network :forwarded_port, host: 4567, guest: 80
  config.vm.network :forwarded_port, host: 5678, guest: 3306

  # Log in as root by default
  config.ssh.username = 'root'
  config.ssh.password = 'vagrant'
  config.ssh.insert_key = 'false'

  # httpd will be running as user vagrant (without suexec), so set the synced folder ownership accordingly
  config.vm.synced_folder '.', '/vagrant', owner: 'vagrant', group: 'vagrant'

  # Initial provisioning script
  config.vm.provision 'shell', path: 'vagrant-provision.sh'

  # Start services in a run-always provisioner instead of setting guest OS `chkconfig` because:
  # 1. vagrant doesn't mount the synced folder until after the guest OS runs its service startup scripts, but
  # 2. httpd (DocumentRoot) needs the synced folder to be mounted to start successfully
  config.vm.provision 'shell', inline: 'service httpd start; service mysqld start', run: 'always'
end
