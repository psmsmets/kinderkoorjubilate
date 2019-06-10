# Kinderkoor Jubilate

Symfony 4 project

Run `git pull` to update the master branch clone to its latest version.

## Create a user

```
INSERT INTO `user` (`id`, `email`, `roles`, `password`, `firstname`, `lastname`, `mobile_phone`, `enabled`, `verified`, `is_active`, `created_at`, `last_login_at`, `password_updated_at`) VALUES
(1, 'email@domain.com', '[\"ROLE_SUPERADMIN\"]', '$2y$12$8fVeYx5JqokSSZGdbnhFj.lB6H39UC/xZL1/xQ7O1hvQvnGW5k2tS', 'First', 'Last', '+32400000000', 1, 1, 0, '2018--18 12:00:00', '2019-05-28 21:24:55', '2019-04-18 18:00:19');
```

## Deploy steps

A summary based on https://symfony.com/doc/current/deployment.html

1. Configure your Environment variables
   * Make sure you have the .env file present and configured properly (and if a .env.local file is present check its APP_ENV!).
1. Generate composer dependencies for this (prod) environment
   * `composer require symfony/dotenv`
1. Install/update vendors
   * `export APP_ENV=prod`
   * `composer install --no-dev --optimize-autoloader`
1. Clear and warmup symfony cache
   * `APP_ENV=prod APP_DEBUG=0 php bin/console cache:clear`
   * `APP_ENV=prod APP_DEBUG=0 php bin/console cache:warmup`
1. Fix changes in public_html bundles
   * `cp public_html/assets/js/ckeditor_config.js public_html/bundles/fosckeditor/config.js`
