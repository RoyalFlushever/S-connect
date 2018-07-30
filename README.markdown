# S-Connect
Web application and API

## Deployment Guide

### First-time
1. composer install --no-dev --optimize-autoloader`
1. Create the MySQL database. Assign the user all privileges to the database.
1. Copy `.env.example` to `.env` and update environment variable values
    1. Set the correct environment (e.g. `APP_ENV=staging`).
    1. Set the correct `APP_URL`
    1. Set the database connection information
        * `DB_HOST=127.0.0.1`
        * `DB_DATABASE=`database name
        * `DB_USERNAME=`database user username
        * `DB_PASSWORD=`database user password
1. Generate application key: `php artisan key:generate`
   
1. Run migrations and seed database: `php artisan migrate:refresh --seed`
1. Generate encryption keys for generating API access tokens: `php artisan passport:keys`
1. Create an OAuth password grant client: `php artisan passport:client --password`


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
