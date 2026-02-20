---
sidebar_position: 1
title: WordPress Backups with QStorage
description: Store WordPress media uploads and backups on QStorage using the S3-compatible API with the S3 Uploads plugin.
keywords: [wordpress, backups, qstorage, s3, media uploads, object storage, wp-cli]
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# WordPress Backups with QStorage

QStorage is fully compatible with the S3 API, which means you can use battle-tested WordPress plugins to offload your media library and backups to decentralized, encrypted storage on the Quilibrium network.

This guide walks through setting up the [S3 Uploads](https://github.com/humanmade/S3-Uploads) plugin by Human Made to store all WordPress uploads directly on QStorage instead of the local filesystem.

## Why Use QStorage for WordPress?

- **Decentralized storage** — your media is distributed across the Quilibrium network, not locked to a single cloud provider
- **S3-compatible** — drop-in replacement that works with existing S3 tooling and plugins
- **Built-in encryption** — all objects stored in QStorage are encrypted via QKMS by default
- **Scalable** — no need to worry about disk space on your web server

## Prerequisites

Before you begin, make sure you have:

1. A running WordPress installation (WordPress >= 5.3)
2. [Composer](https://getcomposer.org/) installed on your server
3. [WP-CLI](https://wp-cli.org/) installed (recommended)
4. PHP >= 7.4
5. QStorage credentials from [QConsole](https://console.quilibrium.com) — see [Setting Up Credentials](/docs/api/q-storage/user-manual/credentials) for details

You will need the following credentials:

| Credential | Description | Example |
|---|---|---|
| Access Key ID | Alphanumeric string from QConsole | `ABCDEF12D213546709A` |
| Secret Key | Secret access key string | `AbcdI32/daY+jjad4M...` |
| Endpoint | QStorage API endpoint | `https://qstorage.quilibrium.com` |
| Region | QStorage region | `q-world-1` |

## Step 1: Install S3 Uploads

Install the S3 Uploads plugin via Composer in your WordPress project root:

```bash
composer require humanmade/s3-uploads
```

:::important
Composer's autoloader must be loaded before WordPress loads.
Add the following line to your `wp-config.php` **before** the line that requires `wp-settings.php`:
:::

```php
require_once __DIR__ . '/vendor/autoload.php';
```

## Step 2: Configure QStorage Credentials

Add the following constants to your `wp-config.php` file, replacing the placeholder values with your QStorage credentials from QConsole:

```php
/** QStorage Configuration */
define( 'S3_UPLOADS_BUCKET', 'my-wp-backups' );
define( 'S3_UPLOADS_REGION', 'q-world-1' );
define( 'S3_UPLOADS_KEY', 'your-access-key-id' );
define( 'S3_UPLOADS_SECRET', 'your-secret-access-key' );
```

:::tip
You can use a path prefix within your bucket to organize uploads.
For example, to store all files under a `wp-uploads/` folder inside your bucket:

```php
define( 'S3_UPLOADS_BUCKET', 'my-wp-backups/wp-uploads' );
```
:::

## Step 3: Configure the QStorage Endpoint

S3 Uploads defaults to Amazon S3 endpoints.
To point it at QStorage, create a [must-use plugin](https://developer.wordpress.org/advanced-administration/plugins/mu-plugins/) file at `wp-content/mu-plugins/qstorage-endpoint.php`:

```php
<?php
add_filter( 's3_uploads_s3_client_params', function ( $params ) {
    $params['endpoint'] = 'https://qstorage.quilibrium.com';
    $params['use_path_style_endpoint'] = true;
    $params['request_checksum_calculation'] = 'when_required';
    $params['response_checksum_validation'] = 'when_required';
    return $params;
} );
```

:::note
The `request_checksum_calculation` and `response_checksum_validation` settings disable a newer AWS SDK integrity check that is not required by QStorage.
If you are using AWS SDK for PHP >= 3.337, these settings prevent compatibility errors.
:::

## Step 4: Configure URL Rewrites

By default, S3 Uploads rewrites media URLs to point to S3.
To serve your media from QStorage, set the bucket URL in `wp-config.php`:

```php
define( 'S3_UPLOADS_BUCKET_URL', 'https://my-wp-backups.qstorage.quilibrium.com' );
```

This rewrites all media URLs from your local `/wp-content/uploads/` path to your QStorage bucket URL.

:::tip
If you use a CDN or reverse proxy in front of QStorage, set `S3_UPLOADS_BUCKET_URL` to your CDN origin URL instead.
:::

## Step 5: Activate and Verify

<Tabs>
  <TabItem value="wp-cli" label="WP-CLI" default>

Activate the plugin and verify the connection:

```bash
wp plugin activate s3-uploads
```

```bash
wp s3-uploads verify
```

If the connection is successful, you will see a confirmation message.
All new media uploads will now be stored directly on QStorage.

  </TabItem>
  <TabItem value="manual" label="WordPress Admin">

1. Navigate to **Plugins** in your WordPress admin dashboard
2. Find **S3 Uploads** in the plugin list
3. Click **Activate**

To verify the connection, use WP-CLI as shown in the WP-CLI tab, or upload a test image through the Media Library and confirm it appears in your QStorage bucket via [QConsole](https://console.quilibrium.com).

  </TabItem>
</Tabs>

## Migrating Existing Media to QStorage

If you have an existing media library on local disk, use WP-CLI to copy everything to QStorage:

```bash
wp s3-uploads upload-directory /path/to/wp-content/uploads/ uploads
```

This copies all files from your local uploads directory to the `uploads/` prefix in your QStorage bucket.

You can also copy individual files:

```bash
wp s3-uploads cp ./backup.sql s3://my-wp-backups/backups/backup.sql
```

## Optional: Private Uploads

By default, uploaded objects are publicly readable.
To make all uploads private (requiring signed URLs for access), add the following to your theme's `functions.php` or a custom plugin:

```php
add_filter( 's3_uploads_is_attachment_private', '__return_true' );
```

Private files are served via temporarily signed URLs that expire after 6 hours.
You can customize the expiry:

```php
add_filter( 's3_uploads_private_attachment_url_expiry', function ( $expiry ) {
    return '+1 hour';
} );
```

## Optional: Cache Control Headers

Set cache headers for uploaded media to improve performance:

```php
define( 'S3_UPLOADS_HTTP_CACHE_CONTROL', 30 * 24 * 60 * 60 );
```

This sets a 30-day `Cache-Control` header on all uploaded objects.

## Full wp-config.php Example

Here is a complete example of all the QStorage-related configuration in `wp-config.php`:

```php
/** Load Composer autoloader (must be before wp-settings.php) */
require_once __DIR__ . '/vendor/autoload.php';

/** QStorage Configuration */
define( 'S3_UPLOADS_BUCKET', 'my-wp-backups' );
define( 'S3_UPLOADS_REGION', 'q-world-1' );
define( 'S3_UPLOADS_KEY', 'ABCDEF12D213546709A' );
define( 'S3_UPLOADS_SECRET', 'AbcdI32/daY+jjad4M...' );
define( 'S3_UPLOADS_BUCKET_URL', 'https://my-wp-backups.qstorage.quilibrium.com' );
define( 'S3_UPLOADS_HTTP_CACHE_CONTROL', 30 * 24 * 60 * 60 );
```

## Troubleshooting

### Connection Errors

If `wp s3-uploads verify` fails:

1. Double-check your Access Key ID and Secret Key in `wp-config.php`
2. Confirm the endpoint is set to `https://qstorage.quilibrium.com` in your mu-plugin
3. Ensure `use_path_style_endpoint` is set to `true`
4. Set `$params['debug'] = true;` in your mu-plugin to enable verbose logging

### Upload Failures

If uploads fail silently:

1. Check PHP error logs for S3 client exceptions
2. Verify your bucket exists — create one via [QConsole](https://console.quilibrium.com) or the [QStorage API](/docs/api/q-storage/user-manual/working-with-buckets/creating-a-bucket)
3. Ensure your credentials have write permissions on the target bucket

### URL Rewrite Issues

If media URLs still point to the local filesystem:

1. Verify `S3_UPLOADS_BUCKET_URL` is set correctly
2. Clear any caching plugins or CDN caches
3. Regenerate thumbnails with `wp media regenerate` if needed

## Next Steps

- [Create a Bucket](/docs/api/q-storage/user-manual/working-with-buckets/creating-a-bucket) in QStorage
- [Setting Up Credentials](/docs/api/q-storage/user-manual/credentials) for QStorage
- [QStorage User Manual](/docs/api/q-storage/user-manual/getting-started) for full documentation
- [S3 Uploads Plugin Documentation](https://github.com/humanmade/S3-Uploads) on GitHub
