# I-Connect
Web application and API

## Deployment Guide

### First-time
1. Clone deployment
1. Install composer into PATH location (e.g. `~/bin`): https://getcomposer.org/download/
1. Install dependencies: `TMPDIR="$HOME/tmp/" ~/bin/composer install --no-dev --optimize-autoloader`
1. Create the MySQL database. Assign the user all privileges to the database.
1. Copy `.env.example` to `.env` and update environment variable values
    1. Set the correct environment (e.g. `APP_ENV=staging`).
    1. Set the correct `APP_URL`
    1. Set the database connection information
        * `DB_HOST=deptsecprddb01.cc.ku.edu`
        * `DB_DATABASE=`database name
        * `DB_USERNAME=`database user username
        * `DB_PASSWORD=`database user password
1. Generate application key: `php artisan key:generate`

    **If storing any data encrypted by Laravel's Encryption library**, it is important that the generated APP_KEY value be backed up in a secure location so that the data can be decrypted.

1. Run migrations and seed database: `php artisan migrate:refresh --seed`
1. Generate encryption keys for generating API access tokens: `php artisan passport:keys`
1. Create an OAuth password grant client: `php artisan passport:client --password`
1. Ensure correct repo permissions for suPHP/FastCGI (755 for directories, 644 for files)
1. Link the `public` directory to a web server document root (e.g. `ln -s $HOME/git-deployments/my-project/public $HOME/public_html`)

### Updating existing deployments
1. Pull the latest changes (preferably into an inactive deployment)
1. Update composer: `TMPDIR="$HOME/tmp/" ~/bin/composer self-update`
1. Install dependencies: `TMPDIR="$HOME/tmp/" ~/bin/composer install --no-dev --optimize-autoloader`
1. Refer to story-specific deployment guides for required configuration file changes, migrations, etc.
1. Fix repo permissions (755/644)

## Local Development Environment
To get started, first ensure that [VirtualBox](https://www.virtualbox.org/) and [Vagrant](https://www.vagrantup.com/) are installed.

1. Create and provision the guest machine: `vagrant up`
1. Install the correct VirtualBox Guest Additions (if needed). In the guest machine: `vbga-install <version>`

    If the VirtualBox Guest Additions installed on the guest do not match the Virtualbox version, some features, such as forwarded ports and shared folders, may not function as expected. Note that this _may_ occur whenever the host and guest versions become out of sync, but more often occurs because the guest's kernel is updated (e.g. via a `yum update|upgrade`).

1. Log out of the guest machine and run a `vagrant reload` to start a working environment.
1. Deploy
    ```
    cd /vagrant
    composer install
    cp .env.example .env
    php artisan key:generate
    resetdb

    # TODO: Automate these steps
    php artisan passport:keys
    ```

### Compiling Assets
* First-time (and any time dependencies change): [`npm cache clean && rm -rf node_modules && `] `npm install`
* `npm run dev` | `npm run watch`
* Compiled assets *are* controlled source for deployments, so prior to merging into master, assets should be compiled with `npm run production` and verified.

### Test environment setup
1. Create test database file: `touch database/testing.sqlite`
1. Run migrations and seeds on the test database: `resetdb-test`


## Dependencies

This project uses `composer` and `npm` to manage dependencies. See [composer.json](composer.json) and [package.json](package.json) for the list of dependencies.

### Composer updates
1. Review any applicable changelogs and follow the upgrade guides for making code changes, paying special attention to deprecations and breaking changes.
1. `composer self-update`
1. `composer require dep@x.y.z` to add any *new* dependencies/versions.
1. `composer validate` and correct any errors if needed.
1. `composer update dep` to install the updates and update [composer.lock](composer.lock).
1. Run tests and verifications to ensure the software still works as expected.

### npm updates
1. Review changelogs and upgrade guides
1. `npm cache clean`
1. `rm -rf node_modules`
1. `npm update --save-dev <package>@<version-spec>`. To install a new dependency, use the `install` npm command.
1. `npm install`
