import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/docs/',
    component: ComponentCreator('/docs/', 'cda'),
    routes: [
      {
        path: '/docs/',
        component: ComponentCreator('/docs/', 'f63'),
        routes: [
          {
            path: '/docs/',
            component: ComponentCreator('/docs/', 'eb9'),
            routes: [
              {
                path: '/docs/api/credentials/',
                component: ComponentCreator('/docs/api/credentials/', '473'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/overview/',
                component: ComponentCreator('/docs/api/overview/', '890'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-kms/api-reference/getting-started/',
                component: ComponentCreator('/docs/api/q-kms/api-reference/getting-started/', '3b7'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-kms/api-reference/key-operations/cancel-key-deletion/',
                component: ComponentCreator('/docs/api/q-kms/api-reference/key-operations/cancel-key-deletion/', '6b5'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-kms/api-reference/key-operations/create-alias/',
                component: ComponentCreator('/docs/api/q-kms/api-reference/key-operations/create-alias/', 'a4c'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-kms/api-reference/key-operations/create-grant/',
                component: ComponentCreator('/docs/api/q-kms/api-reference/key-operations/create-grant/', '355'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-kms/api-reference/key-operations/create-key/',
                component: ComponentCreator('/docs/api/q-kms/api-reference/key-operations/create-key/', 'f52'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-kms/api-reference/key-operations/decrypt/',
                component: ComponentCreator('/docs/api/q-kms/api-reference/key-operations/decrypt/', '54d'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-kms/api-reference/key-operations/delete-alias/',
                component: ComponentCreator('/docs/api/q-kms/api-reference/key-operations/delete-alias/', '253'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-kms/api-reference/key-operations/delete-imported-key-material/',
                component: ComponentCreator('/docs/api/q-kms/api-reference/key-operations/delete-imported-key-material/', 'd8a'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-kms/api-reference/key-operations/derive-shared-secret/',
                component: ComponentCreator('/docs/api/q-kms/api-reference/key-operations/derive-shared-secret/', 'f82'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-kms/api-reference/key-operations/describe-key/',
                component: ComponentCreator('/docs/api/q-kms/api-reference/key-operations/describe-key/', 'c23'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-kms/api-reference/key-operations/disable-key-rotation/',
                component: ComponentCreator('/docs/api/q-kms/api-reference/key-operations/disable-key-rotation/', '9f1'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-kms/api-reference/key-operations/disable-key/',
                component: ComponentCreator('/docs/api/q-kms/api-reference/key-operations/disable-key/', 'f51'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-kms/api-reference/key-operations/enable-key-rotation/',
                component: ComponentCreator('/docs/api/q-kms/api-reference/key-operations/enable-key-rotation/', '2dd'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-kms/api-reference/key-operations/enable-key/',
                component: ComponentCreator('/docs/api/q-kms/api-reference/key-operations/enable-key/', '360'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-kms/api-reference/key-operations/encrypt/',
                component: ComponentCreator('/docs/api/q-kms/api-reference/key-operations/encrypt/', '008'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-kms/api-reference/key-operations/generate-data-key-pair-without-plaintext/',
                component: ComponentCreator('/docs/api/q-kms/api-reference/key-operations/generate-data-key-pair-without-plaintext/', '4ac'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-kms/api-reference/key-operations/generate-data-key-pair/',
                component: ComponentCreator('/docs/api/q-kms/api-reference/key-operations/generate-data-key-pair/', '74c'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-kms/api-reference/key-operations/generate-data-key-without-plaintext/',
                component: ComponentCreator('/docs/api/q-kms/api-reference/key-operations/generate-data-key-without-plaintext/', 'e5e'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-kms/api-reference/key-operations/generate-data-key/',
                component: ComponentCreator('/docs/api/q-kms/api-reference/key-operations/generate-data-key/', '5d7'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-kms/api-reference/key-operations/generate-mac/',
                component: ComponentCreator('/docs/api/q-kms/api-reference/key-operations/generate-mac/', '0e1'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-kms/api-reference/key-operations/get-key-policy/',
                component: ComponentCreator('/docs/api/q-kms/api-reference/key-operations/get-key-policy/', '69b'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-kms/api-reference/key-operations/get-key-rotation-status/',
                component: ComponentCreator('/docs/api/q-kms/api-reference/key-operations/get-key-rotation-status/', '575'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-kms/api-reference/key-operations/get-parameters-for-import/',
                component: ComponentCreator('/docs/api/q-kms/api-reference/key-operations/get-parameters-for-import/', '88a'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-kms/api-reference/key-operations/get-public-key/',
                component: ComponentCreator('/docs/api/q-kms/api-reference/key-operations/get-public-key/', '03b'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-kms/api-reference/key-operations/import-key-material/',
                component: ComponentCreator('/docs/api/q-kms/api-reference/key-operations/import-key-material/', '71e'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-kms/api-reference/key-operations/list-aliases/',
                component: ComponentCreator('/docs/api/q-kms/api-reference/key-operations/list-aliases/', '315'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-kms/api-reference/key-operations/list-grants/',
                component: ComponentCreator('/docs/api/q-kms/api-reference/key-operations/list-grants/', 'dd5'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-kms/api-reference/key-operations/list-key-policies/',
                component: ComponentCreator('/docs/api/q-kms/api-reference/key-operations/list-key-policies/', '1c9'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-kms/api-reference/key-operations/list-keys/',
                component: ComponentCreator('/docs/api/q-kms/api-reference/key-operations/list-keys/', '8c8'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-kms/api-reference/key-operations/list-resource-tags/',
                component: ComponentCreator('/docs/api/q-kms/api-reference/key-operations/list-resource-tags/', '786'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-kms/api-reference/key-operations/list-retirable-grants/',
                component: ComponentCreator('/docs/api/q-kms/api-reference/key-operations/list-retirable-grants/', '920'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-kms/api-reference/key-operations/put-key-policy/',
                component: ComponentCreator('/docs/api/q-kms/api-reference/key-operations/put-key-policy/', 'ef5'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-kms/api-reference/key-operations/re-encrypt/',
                component: ComponentCreator('/docs/api/q-kms/api-reference/key-operations/re-encrypt/', '09d'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-kms/api-reference/key-operations/replicate-key/',
                component: ComponentCreator('/docs/api/q-kms/api-reference/key-operations/replicate-key/', 'e99'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-kms/api-reference/key-operations/retire-grant/',
                component: ComponentCreator('/docs/api/q-kms/api-reference/key-operations/retire-grant/', 'b3c'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-kms/api-reference/key-operations/revoke-grant/',
                component: ComponentCreator('/docs/api/q-kms/api-reference/key-operations/revoke-grant/', '65f'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-kms/api-reference/key-operations/schedule-key-deletion/',
                component: ComponentCreator('/docs/api/q-kms/api-reference/key-operations/schedule-key-deletion/', '4c2'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-kms/api-reference/key-operations/sign/',
                component: ComponentCreator('/docs/api/q-kms/api-reference/key-operations/sign/', '7ef'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-kms/api-reference/key-operations/tag-resource/',
                component: ComponentCreator('/docs/api/q-kms/api-reference/key-operations/tag-resource/', 'abc'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-kms/api-reference/key-operations/untag-resource/',
                component: ComponentCreator('/docs/api/q-kms/api-reference/key-operations/untag-resource/', '721'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-kms/api-reference/key-operations/update-alias/',
                component: ComponentCreator('/docs/api/q-kms/api-reference/key-operations/update-alias/', '428'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-kms/api-reference/key-operations/update-key-description/',
                component: ComponentCreator('/docs/api/q-kms/api-reference/key-operations/update-key-description/', '9d9'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-kms/api-reference/key-operations/update-primary-region/',
                component: ComponentCreator('/docs/api/q-kms/api-reference/key-operations/update-primary-region/', '89f'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-kms/api-reference/key-operations/verify-mac/',
                component: ComponentCreator('/docs/api/q-kms/api-reference/key-operations/verify-mac/', '2d5'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-kms/api-reference/key-operations/verify/',
                component: ComponentCreator('/docs/api/q-kms/api-reference/key-operations/verify/', '22a'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-kms/overview/',
                component: ComponentCreator('/docs/api/q-kms/overview/', 'b8f'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-kms/user-manual/creating-keys/',
                component: ComponentCreator('/docs/api/q-kms/user-manual/creating-keys/', '2b5'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-kms/user-manual/deleting-keys/',
                component: ComponentCreator('/docs/api/q-kms/user-manual/deleting-keys/', '978'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-kms/user-manual/getting-started/',
                component: ComponentCreator('/docs/api/q-kms/user-manual/getting-started/', '61f'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-kms/user-manual/importing-key-material/',
                component: ComponentCreator('/docs/api/q-kms/user-manual/importing-key-material/', '5cc'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-kms/user-manual/key-policies/',
                component: ComponentCreator('/docs/api/q-kms/user-manual/key-policies/', '2db'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-kms/user-manual/key-states/',
                component: ComponentCreator('/docs/api/q-kms/user-manual/key-states/', 'e08'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-kms/user-manual/using-grants/',
                component: ComponentCreator('/docs/api/q-kms/user-manual/using-grants/', 'd42'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/api-reference/bucket-operations/create-bucket/',
                component: ComponentCreator('/docs/api/q-storage/api-reference/bucket-operations/create-bucket/', 'c1f'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/api-reference/bucket-operations/delete-bucket-cors/',
                component: ComponentCreator('/docs/api/q-storage/api-reference/bucket-operations/delete-bucket-cors/', '700'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/api-reference/bucket-operations/delete-bucket-encryption/',
                component: ComponentCreator('/docs/api/q-storage/api-reference/bucket-operations/delete-bucket-encryption/', 'b42'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/api-reference/bucket-operations/delete-bucket-lifecycle/',
                component: ComponentCreator('/docs/api/q-storage/api-reference/bucket-operations/delete-bucket-lifecycle/', 'fdd'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/api-reference/bucket-operations/delete-bucket-policy/',
                component: ComponentCreator('/docs/api/q-storage/api-reference/bucket-operations/delete-bucket-policy/', '905'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/api-reference/bucket-operations/delete-bucket-tagging/',
                component: ComponentCreator('/docs/api/q-storage/api-reference/bucket-operations/delete-bucket-tagging/', '081'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/api-reference/bucket-operations/delete-bucket-website/',
                component: ComponentCreator('/docs/api/q-storage/api-reference/bucket-operations/delete-bucket-website/', 'a62'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/api-reference/bucket-operations/delete-bucket/',
                component: ComponentCreator('/docs/api/q-storage/api-reference/bucket-operations/delete-bucket/', 'cc7'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/api-reference/bucket-operations/delete-public-access-block/',
                component: ComponentCreator('/docs/api/q-storage/api-reference/bucket-operations/delete-public-access-block/', '876'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/api-reference/bucket-operations/get-bucket-acl/',
                component: ComponentCreator('/docs/api/q-storage/api-reference/bucket-operations/get-bucket-acl/', 'e98'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/api-reference/bucket-operations/get-bucket-analytics-configuration/',
                component: ComponentCreator('/docs/api/q-storage/api-reference/bucket-operations/get-bucket-analytics-configuration/', 'd48'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/api-reference/bucket-operations/get-bucket-cors/',
                component: ComponentCreator('/docs/api/q-storage/api-reference/bucket-operations/get-bucket-cors/', 'ab2'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/api-reference/bucket-operations/get-bucket-encryption/',
                component: ComponentCreator('/docs/api/q-storage/api-reference/bucket-operations/get-bucket-encryption/', '861'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/api-reference/bucket-operations/get-bucket-lifecycle-configuration/',
                component: ComponentCreator('/docs/api/q-storage/api-reference/bucket-operations/get-bucket-lifecycle-configuration/', '566'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/api-reference/bucket-operations/get-bucket-lifecycle/',
                component: ComponentCreator('/docs/api/q-storage/api-reference/bucket-operations/get-bucket-lifecycle/', '322'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/api-reference/bucket-operations/get-bucket-logging/',
                component: ComponentCreator('/docs/api/q-storage/api-reference/bucket-operations/get-bucket-logging/', '435'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/api-reference/bucket-operations/get-bucket-metadata-table-configuration/',
                component: ComponentCreator('/docs/api/q-storage/api-reference/bucket-operations/get-bucket-metadata-table-configuration/', 'c91'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/api-reference/bucket-operations/get-bucket-ownership-controls/',
                component: ComponentCreator('/docs/api/q-storage/api-reference/bucket-operations/get-bucket-ownership-controls/', '485'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/api-reference/bucket-operations/get-bucket-policy-status/',
                component: ComponentCreator('/docs/api/q-storage/api-reference/bucket-operations/get-bucket-policy-status/', '3a8'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/api-reference/bucket-operations/get-bucket-policy/',
                component: ComponentCreator('/docs/api/q-storage/api-reference/bucket-operations/get-bucket-policy/', 'd9b'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/api-reference/bucket-operations/get-bucket-tagging/',
                component: ComponentCreator('/docs/api/q-storage/api-reference/bucket-operations/get-bucket-tagging/', 'cd5'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/api-reference/bucket-operations/get-bucket-versioning/',
                component: ComponentCreator('/docs/api/q-storage/api-reference/bucket-operations/get-bucket-versioning/', '240'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/api-reference/bucket-operations/get-bucket-website/',
                component: ComponentCreator('/docs/api/q-storage/api-reference/bucket-operations/get-bucket-website/', '1a4'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/api-reference/bucket-operations/head-bucket/',
                component: ComponentCreator('/docs/api/q-storage/api-reference/bucket-operations/head-bucket/', '168'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/api-reference/bucket-operations/list-buckets/',
                component: ComponentCreator('/docs/api/q-storage/api-reference/bucket-operations/list-buckets/', 'ae3'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/api-reference/bucket-operations/put-bucket-acl/',
                component: ComponentCreator('/docs/api/q-storage/api-reference/bucket-operations/put-bucket-acl/', '2c1'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/api-reference/bucket-operations/put-bucket-encryption/',
                component: ComponentCreator('/docs/api/q-storage/api-reference/bucket-operations/put-bucket-encryption/', 'e75'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/api-reference/bucket-operations/put-bucket-lifecycle-configuration/',
                component: ComponentCreator('/docs/api/q-storage/api-reference/bucket-operations/put-bucket-lifecycle-configuration/', '703'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/api-reference/bucket-operations/put-bucket-lifecycle/',
                component: ComponentCreator('/docs/api/q-storage/api-reference/bucket-operations/put-bucket-lifecycle/', 'd6c'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/api-reference/bucket-operations/put-bucket-website/',
                component: ComponentCreator('/docs/api/q-storage/api-reference/bucket-operations/put-bucket-website/', '33d'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/api-reference/bucket-operations/put-object-lock-configuration/',
                component: ComponentCreator('/docs/api/q-storage/api-reference/bucket-operations/put-object-lock-configuration/', 'c34'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/api-reference/data-types/abort-incomplete-multipart-upload/',
                component: ComponentCreator('/docs/api/q-storage/api-reference/data-types/abort-incomplete-multipart-upload/', '1a5'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/api-reference/data-types/analytics-filter/',
                component: ComponentCreator('/docs/api/q-storage/api-reference/data-types/analytics-filter/', '189'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/api-reference/data-types/bucket-logging-status/',
                component: ComponentCreator('/docs/api/q-storage/api-reference/data-types/bucket-logging-status/', '95c'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/api-reference/data-types/bucket-policy/',
                component: ComponentCreator('/docs/api/q-storage/api-reference/data-types/bucket-policy/', '920'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/api-reference/data-types/bucket/',
                component: ComponentCreator('/docs/api/q-storage/api-reference/data-types/bucket/', 'acc'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/api-reference/data-types/completed-part/',
                component: ComponentCreator('/docs/api/q-storage/api-reference/data-types/completed-part/', 'abb'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/api-reference/data-types/condition/',
                component: ComponentCreator('/docs/api/q-storage/api-reference/data-types/condition/', 'c11'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/api-reference/data-types/copy-object-result/',
                component: ComponentCreator('/docs/api/q-storage/api-reference/data-types/copy-object-result/', 'e63'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/api-reference/data-types/cors-rule/',
                component: ComponentCreator('/docs/api/q-storage/api-reference/data-types/cors-rule/', 'e37'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/api-reference/data-types/default-retention/',
                component: ComponentCreator('/docs/api/q-storage/api-reference/data-types/default-retention/', 'c75'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/api-reference/data-types/error-details/',
                component: ComponentCreator('/docs/api/q-storage/api-reference/data-types/error-details/', '5d4'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/api-reference/data-types/error-document/',
                component: ComponentCreator('/docs/api/q-storage/api-reference/data-types/error-document/', '40f'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/api-reference/data-types/grant/',
                component: ComponentCreator('/docs/api/q-storage/api-reference/data-types/grant/', '4bd'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/api-reference/data-types/grantee/',
                component: ComponentCreator('/docs/api/q-storage/api-reference/data-types/grantee/', '3cf'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/api-reference/data-types/index-document/',
                component: ComponentCreator('/docs/api/q-storage/api-reference/data-types/index-document/', '35e'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/api-reference/data-types/initiator/',
                component: ComponentCreator('/docs/api/q-storage/api-reference/data-types/initiator/', '4a1'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/api-reference/data-types/lifecycle-expiration/',
                component: ComponentCreator('/docs/api/q-storage/api-reference/data-types/lifecycle-expiration/', 'bdb'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/api-reference/data-types/lifecycle-rule-and-operator/',
                component: ComponentCreator('/docs/api/q-storage/api-reference/data-types/lifecycle-rule-and-operator/', '403'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/api-reference/data-types/lifecycle-rule-filter/',
                component: ComponentCreator('/docs/api/q-storage/api-reference/data-types/lifecycle-rule-filter/', '83f'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/api-reference/data-types/lifecycle-rule/',
                component: ComponentCreator('/docs/api/q-storage/api-reference/data-types/lifecycle-rule/', '93c'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/api-reference/data-types/logging-enabled/',
                component: ComponentCreator('/docs/api/q-storage/api-reference/data-types/logging-enabled/', '126'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/api-reference/data-types/metadata-table-configuration-result/',
                component: ComponentCreator('/docs/api/q-storage/api-reference/data-types/metadata-table-configuration-result/', 'aed'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/api-reference/data-types/metadata-table-configuration/',
                component: ComponentCreator('/docs/api/q-storage/api-reference/data-types/metadata-table-configuration/', '9e5'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/api-reference/data-types/noncurrent-version-expiration/',
                component: ComponentCreator('/docs/api/q-storage/api-reference/data-types/noncurrent-version-expiration/', '678'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/api-reference/data-types/object-lock-rule/',
                component: ComponentCreator('/docs/api/q-storage/api-reference/data-types/object-lock-rule/', '1e9'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/api-reference/data-types/object/',
                component: ComponentCreator('/docs/api/q-storage/api-reference/data-types/object/', '06c'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/api-reference/data-types/owner/',
                component: ComponentCreator('/docs/api/q-storage/api-reference/data-types/owner/', 'c9e'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/api-reference/data-types/ownership-controls-rule/',
                component: ComponentCreator('/docs/api/q-storage/api-reference/data-types/ownership-controls-rule/', 'c78'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/api-reference/data-types/ownership-controls/',
                component: ComponentCreator('/docs/api/q-storage/api-reference/data-types/ownership-controls/', 'cc4'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/api-reference/data-types/part/',
                component: ComponentCreator('/docs/api/q-storage/api-reference/data-types/part/', 'a9c'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/api-reference/data-types/policy-status/',
                component: ComponentCreator('/docs/api/q-storage/api-reference/data-types/policy-status/', 'e6c'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/api-reference/data-types/redirect-all-requests-to/',
                component: ComponentCreator('/docs/api/q-storage/api-reference/data-types/redirect-all-requests-to/', '4bb'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/api-reference/data-types/redirect/',
                component: ComponentCreator('/docs/api/q-storage/api-reference/data-types/redirect/', 'cd0'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/api-reference/data-types/routing-rule/',
                component: ComponentCreator('/docs/api/q-storage/api-reference/data-types/routing-rule/', '734'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/api-reference/data-types/rule/',
                component: ComponentCreator('/docs/api/q-storage/api-reference/data-types/rule/', '6e1'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/api-reference/data-types/s3-tables-destination-result/',
                component: ComponentCreator('/docs/api/q-storage/api-reference/data-types/s3-tables-destination-result/', 'e85'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/api-reference/data-types/server-side-encryption-rule/',
                component: ComponentCreator('/docs/api/q-storage/api-reference/data-types/server-side-encryption-rule/', 'ffe'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/api-reference/data-types/statement/',
                component: ComponentCreator('/docs/api/q-storage/api-reference/data-types/statement/', '49d'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/api-reference/data-types/tag/',
                component: ComponentCreator('/docs/api/q-storage/api-reference/data-types/tag/', '16b'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/api-reference/data-types/tagging/',
                component: ComponentCreator('/docs/api/q-storage/api-reference/data-types/tagging/', 'c21'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/api-reference/data-types/transition/',
                component: ComponentCreator('/docs/api/q-storage/api-reference/data-types/transition/', '31a'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/api-reference/data-types/upload-part/',
                component: ComponentCreator('/docs/api/q-storage/api-reference/data-types/upload-part/', 'c17'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/api-reference/data-types/versioning-configuration/',
                component: ComponentCreator('/docs/api/q-storage/api-reference/data-types/versioning-configuration/', '78c'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/api-reference/data-types/website-configuration/',
                component: ComponentCreator('/docs/api/q-storage/api-reference/data-types/website-configuration/', 'e36'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/api-reference/getting-started/',
                component: ComponentCreator('/docs/api/q-storage/api-reference/getting-started/', '524'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/api-reference/index/',
                component: ComponentCreator('/docs/api/q-storage/api-reference/index/', '6fd'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/api-reference/multipart-operations/abort-multipart-upload/',
                component: ComponentCreator('/docs/api/q-storage/api-reference/multipart-operations/abort-multipart-upload/', '1eb'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/api-reference/multipart-operations/complete-multipart-upload/',
                component: ComponentCreator('/docs/api/q-storage/api-reference/multipart-operations/complete-multipart-upload/', '48c'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/api-reference/multipart-operations/create-multipart-upload/',
                component: ComponentCreator('/docs/api/q-storage/api-reference/multipart-operations/create-multipart-upload/', '1bc'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/api-reference/multipart-operations/list-multipart-uploads/',
                component: ComponentCreator('/docs/api/q-storage/api-reference/multipart-operations/list-multipart-uploads/', 'd5e'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/api-reference/multipart-operations/list-parts/',
                component: ComponentCreator('/docs/api/q-storage/api-reference/multipart-operations/list-parts/', 'd3e'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/api-reference/multipart-operations/upload-part/',
                component: ComponentCreator('/docs/api/q-storage/api-reference/multipart-operations/upload-part/', '512'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/api-reference/object-operations/copy-object/',
                component: ComponentCreator('/docs/api/q-storage/api-reference/object-operations/copy-object/', '2af'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/api-reference/object-operations/delete-object/',
                component: ComponentCreator('/docs/api/q-storage/api-reference/object-operations/delete-object/', '9a4'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/api-reference/object-operations/get-object-acl/',
                component: ComponentCreator('/docs/api/q-storage/api-reference/object-operations/get-object-acl/', 'b62'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/api-reference/object-operations/get-object/',
                component: ComponentCreator('/docs/api/q-storage/api-reference/object-operations/get-object/', 'bba'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/api-reference/object-operations/head-object/',
                component: ComponentCreator('/docs/api/q-storage/api-reference/object-operations/head-object/', '812'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/api-reference/object-operations/list-objects-v2/',
                component: ComponentCreator('/docs/api/q-storage/api-reference/object-operations/list-objects-v2/', '95a'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/api-reference/object-operations/list-objects/',
                component: ComponentCreator('/docs/api/q-storage/api-reference/object-operations/list-objects/', '5e8'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/api-reference/object-operations/put-object-acl/',
                component: ComponentCreator('/docs/api/q-storage/api-reference/object-operations/put-object-acl/', '4e8'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/api-reference/object-operations/put-object-legal-hold/',
                component: ComponentCreator('/docs/api/q-storage/api-reference/object-operations/put-object-legal-hold/', 'dcc'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/api-reference/object-operations/put-object/',
                component: ComponentCreator('/docs/api/q-storage/api-reference/object-operations/put-object/', '6be'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/hosting-websites-on-quilibrium/',
                component: ComponentCreator('/docs/api/q-storage/hosting-websites-on-quilibrium/', '9da'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/overview/',
                component: ComponentCreator('/docs/api/q-storage/overview/', '99d'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/user-manual/access-control/',
                component: ComponentCreator('/docs/api/q-storage/user-manual/access-control/', '8c3'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/user-manual/credentials/',
                component: ComponentCreator('/docs/api/q-storage/user-manual/credentials/', '294'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/user-manual/getting-started/',
                component: ComponentCreator('/docs/api/q-storage/user-manual/getting-started/', 'a8c'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/user-manual/object-versioning/',
                component: ComponentCreator('/docs/api/q-storage/user-manual/object-versioning/', '9ba'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/user-manual/pricing/',
                component: ComponentCreator('/docs/api/q-storage/user-manual/pricing/', 'ad3'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/user-manual/privacy/',
                component: ComponentCreator('/docs/api/q-storage/user-manual/privacy/', '50e'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/user-manual/regions/',
                component: ComponentCreator('/docs/api/q-storage/user-manual/regions/', '8e3'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/user-manual/working-with-buckets/bucket-names/',
                component: ComponentCreator('/docs/api/q-storage/user-manual/working-with-buckets/bucket-names/', 'fec'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/user-manual/working-with-buckets/creating-a-bucket/',
                component: ComponentCreator('/docs/api/q-storage/user-manual/working-with-buckets/creating-a-bucket/', '4a4'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/user-manual/working-with-buckets/delete-a-bucket/',
                component: ComponentCreator('/docs/api/q-storage/user-manual/working-with-buckets/delete-a-bucket/', '3a4'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/user-manual/working-with-buckets/edit-bucket-visibility/',
                component: ComponentCreator('/docs/api/q-storage/user-manual/working-with-buckets/edit-bucket-visibility/', '671'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/user-manual/working-with-buckets/empty-a-bucket/',
                component: ComponentCreator('/docs/api/q-storage/user-manual/working-with-buckets/empty-a-bucket/', '5ec'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/user-manual/working-with-buckets/list-buckets/',
                component: ComponentCreator('/docs/api/q-storage/user-manual/working-with-buckets/list-buckets/', '3c2'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/user-manual/working-with-buckets/using-bucket-tags/',
                component: ComponentCreator('/docs/api/q-storage/user-manual/working-with-buckets/using-bucket-tags/', 'e0b'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/user-manual/working-with-buckets/what-is-a-bucket/',
                component: ComponentCreator('/docs/api/q-storage/user-manual/working-with-buckets/what-is-a-bucket/', '998'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/user-manual/working-with-objects/change-object-visibility/',
                component: ComponentCreator('/docs/api/q-storage/user-manual/working-with-objects/change-object-visibility/', 'b30'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/user-manual/working-with-objects/copying-moving-renaming-objects/',
                component: ComponentCreator('/docs/api/q-storage/user-manual/working-with-objects/copying-moving-renaming-objects/', '98e'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/user-manual/working-with-objects/delete-an-object/',
                component: ComponentCreator('/docs/api/q-storage/user-manual/working-with-objects/delete-an-object/', '7f2'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/user-manual/working-with-objects/downloading-an-object/',
                component: ComponentCreator('/docs/api/q-storage/user-manual/working-with-objects/downloading-an-object/', '7b5'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/user-manual/working-with-objects/list-bucket-contents/',
                component: ComponentCreator('/docs/api/q-storage/user-manual/working-with-objects/list-bucket-contents/', '4c7'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/user-manual/working-with-objects/organizing-and-listing-objects/listing-objects/',
                component: ComponentCreator('/docs/api/q-storage/user-manual/working-with-objects/organizing-and-listing-objects/listing-objects/', '6a2'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/user-manual/working-with-objects/organizing-and-listing-objects/organizing-objects-using-folders/',
                component: ComponentCreator('/docs/api/q-storage/user-manual/working-with-objects/organizing-and-listing-objects/organizing-objects-using-folders/', '92c'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/user-manual/working-with-objects/organizing-and-listing-objects/using-tags/',
                component: ComponentCreator('/docs/api/q-storage/user-manual/working-with-objects/organizing-and-listing-objects/using-tags/', '7eb'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/user-manual/working-with-objects/organizing-and-listing-objects/viewing-object-properties/',
                component: ComponentCreator('/docs/api/q-storage/user-manual/working-with-objects/organizing-and-listing-objects/viewing-object-properties/', '707'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/user-manual/working-with-objects/upload-an-object/',
                component: ComponentCreator('/docs/api/q-storage/user-manual/working-with-objects/upload-an-object/', 'b11'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/user-manual/working-with-objects/what-is-an-object/',
                component: ComponentCreator('/docs/api/q-storage/user-manual/working-with-objects/what-is-an-object/', 'b51'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/api/q-storage/user-manual/working-with-objects/working-with-metadata/',
                component: ComponentCreator('/docs/api/q-storage/user-manual/working-with-objects/working-with-metadata/', 'cbb'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/build/applications/compiling-to-ot-circuits/',
                component: ComponentCreator('/docs/build/applications/compiling-to-ot-circuits/', '08c'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/docs/build/applications/deploying-to-the-network/',
                component: ComponentCreator('/docs/build/applications/deploying-to-the-network/', 'e4f'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/docs/build/applications/running-applications/',
                component: ComponentCreator('/docs/build/applications/running-applications/', 'b93'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/docs/build/q-service-apis/',
                component: ComponentCreator('/docs/build/q-service-apis/', '49e'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/docs/build/tokens/creating-tokens/',
                component: ComponentCreator('/docs/build/tokens/creating-tokens/', '882'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/docs/category/api-reference/',
                component: ComponentCreator('/docs/category/api-reference/', '24b'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/category/applications/',
                component: ComponentCreator('/docs/category/applications/', 'b40'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/docs/category/bucket-operations/',
                component: ComponentCreator('/docs/category/bucket-operations/', '7a9'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/category/data-types/',
                component: ComponentCreator('/docs/category/data-types/', '4d0'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/category/key-management/',
                component: ComponentCreator('/docs/category/key-management/', 'ae7'),
                exact: true,
                sidebar: "run"
              },
              {
                path: '/docs/category/key-operations/',
                component: ComponentCreator('/docs/category/key-operations/', '4f8'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/category/multipart-operations/',
                component: ComponentCreator('/docs/category/multipart-operations/', '747'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/category/node-management-via-qclient/',
                component: ComponentCreator('/docs/category/node-management-via-qclient/', '737'),
                exact: true,
                sidebar: "run"
              },
              {
                path: '/docs/category/node-system-service/',
                component: ComponentCreator('/docs/category/node-system-service/', '5d1'),
                exact: true,
                sidebar: "run"
              },
              {
                path: '/docs/category/object-operations/',
                component: ComponentCreator('/docs/category/object-operations/', '5c1'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/category/organizing-and-listing-objects/',
                component: ComponentCreator('/docs/category/organizing-and-listing-objects/', '469'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/category/qclient-commands/',
                component: ComponentCreator('/docs/category/qclient-commands/', '0f9'),
                exact: true,
                sidebar: "run"
              },
              {
                path: '/docs/category/qkms-user-manual/',
                component: ComponentCreator('/docs/category/qkms-user-manual/', '7ae'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/category/qkms/',
                component: ComponentCreator('/docs/category/qkms/', '436'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/category/qstorage-api-reference/',
                component: ComponentCreator('/docs/category/qstorage-api-reference/', '947'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/category/qstorage-user-manual/',
                component: ComponentCreator('/docs/category/qstorage-user-manual/', '08d'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/category/qstorage/',
                component: ComponentCreator('/docs/category/qstorage/', '572'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/category/tokens/',
                component: ComponentCreator('/docs/category/tokens/', '7f5'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/docs/category/using-qclient/',
                component: ComponentCreator('/docs/category/using-qclient/', 'da0'),
                exact: true,
                sidebar: "run"
              },
              {
                path: '/docs/category/working-with-buckets/',
                component: ComponentCreator('/docs/category/working-with-buckets/', 'd76'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/category/working-with-objects/',
                component: ComponentCreator('/docs/category/working-with-objects/', '369'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/discover/core-technologies-in-quilibrium/',
                component: ComponentCreator('/docs/discover/core-technologies-in-quilibrium/', '294'),
                exact: true,
                sidebar: "discover"
              },
              {
                path: '/docs/discover/FAQ/',
                component: ComponentCreator('/docs/discover/FAQ/', 'c3b'),
                exact: true,
                sidebar: "discover"
              },
              {
                path: '/docs/discover/gas-fees-and-dynamic-fee-market-on-quilibrium/',
                component: ComponentCreator('/docs/discover/gas-fees-and-dynamic-fee-market-on-quilibrium/', 'e14'),
                exact: true,
                sidebar: "discover"
              },
              {
                path: '/docs/discover/how-does-quilibrium-maintain-decentralization/',
                component: ComponentCreator('/docs/discover/how-does-quilibrium-maintain-decentralization/', '424'),
                exact: true,
                sidebar: "discover"
              },
              {
                path: '/docs/discover/how-quilibrium-protects-privacy-without-enabling-crime/',
                component: ComponentCreator('/docs/discover/how-quilibrium-protects-privacy-without-enabling-crime/', 'd64'),
                exact: true,
                sidebar: "discover"
              },
              {
                path: '/docs/discover/programmable-mpc-vs-zkp/',
                component: ComponentCreator('/docs/discover/programmable-mpc-vs-zkp/', '75d'),
                exact: true,
                sidebar: "discover"
              },
              {
                path: '/docs/discover/q-story/',
                component: ComponentCreator('/docs/discover/q-story/', 'fe5'),
                exact: true,
                sidebar: "discover"
              },
              {
                path: '/docs/discover/quilibrium-kms/',
                component: ComponentCreator('/docs/discover/quilibrium-kms/', 'bc8'),
                exact: true,
                sidebar: "discover"
              },
              {
                path: '/docs/discover/quilibrium-tokenomics/',
                component: ComponentCreator('/docs/discover/quilibrium-tokenomics/', 'fad'),
                exact: true,
                sidebar: "discover"
              },
              {
                path: '/docs/discover/quilibriums-innovative-use-of-passkeys/',
                component: ComponentCreator('/docs/discover/quilibriums-innovative-use-of-passkeys/', '40a'),
                exact: true,
                sidebar: "discover"
              },
              {
                path: '/docs/discover/security-audits-of-quilibriums-cryptographic-protocols/',
                component: ComponentCreator('/docs/discover/security-audits-of-quilibriums-cryptographic-protocols/', '3ff'),
                exact: true,
                sidebar: "discover"
              },
              {
                path: '/docs/discover/the-alternative-thesis-for-consumer-crypto/',
                component: ComponentCreator('/docs/discover/the-alternative-thesis-for-consumer-crypto/', '680'),
                exact: true,
                sidebar: "discover"
              },
              {
                path: '/docs/discover/the-illusion-of-decentralization-in-crypto-and-quilibriums-radical-alternative./',
                component: ComponentCreator('/docs/discover/the-illusion-of-decentralization-in-crypto-and-quilibriums-radical-alternative./', '0f3'),
                exact: true,
                sidebar: "discover"
              },
              {
                path: '/docs/discover/what-is-quilibrium/',
                component: ComponentCreator('/docs/discover/what-is-quilibrium/', '77a'),
                exact: true,
                sidebar: "discover"
              },
              {
                path: '/docs/learn/block-storage/',
                component: ComponentCreator('/docs/learn/block-storage/', '197'),
                exact: true,
                sidebar: "learn"
              },
              {
                path: '/docs/learn/block-storage/bloom-clock/',
                component: ComponentCreator('/docs/learn/block-storage/bloom-clock/', '18d'),
                exact: true,
                sidebar: "learn"
              },
              {
                path: '/docs/learn/block-storage/vdfs/',
                component: ComponentCreator('/docs/learn/block-storage/vdfs/', '3e7'),
                exact: true,
                sidebar: "learn"
              },
              {
                path: '/docs/learn/communication/',
                component: ComponentCreator('/docs/learn/communication/', 'ba3'),
                exact: true,
                sidebar: "learn"
              },
              {
                path: '/docs/learn/communication/addressing/',
                component: ComponentCreator('/docs/learn/communication/addressing/', '2d7'),
                exact: true,
                sidebar: "learn"
              },
              {
                path: '/docs/learn/communication/e2ee/',
                component: ComponentCreator('/docs/learn/communication/e2ee/', 'e42'),
                exact: true,
                sidebar: "learn"
              },
              {
                path: '/docs/learn/communication/mixnet-routing/',
                component: ComponentCreator('/docs/learn/communication/mixnet-routing/', '34b'),
                exact: true,
                sidebar: "learn"
              },
              {
                path: '/docs/learn/communication/p2p-communication/',
                component: ComponentCreator('/docs/learn/communication/p2p-communication/', '52c'),
                exact: true,
                sidebar: "learn"
              },
              {
                path: '/docs/learn/oblivious-hypergraph/',
                component: ComponentCreator('/docs/learn/oblivious-hypergraph/', '666'),
                exact: true,
                sidebar: "learn"
              },
              {
                path: '/docs/learn/oblivious-hypergraph/hypergraph-construction/',
                component: ComponentCreator('/docs/learn/oblivious-hypergraph/hypergraph-construction/', 'c63'),
                exact: true,
                sidebar: "learn"
              },
              {
                path: '/docs/learn/oblivious-hypergraph/oblivious-transfer/',
                component: ComponentCreator('/docs/learn/oblivious-hypergraph/oblivious-transfer/', 'e70'),
                exact: true,
                sidebar: "learn"
              },
              {
                path: '/docs/learn/oblivious-hypergraph/query-evaluator/',
                component: ComponentCreator('/docs/learn/oblivious-hypergraph/query-evaluator/', '46b'),
                exact: true,
                sidebar: "learn"
              },
              {
                path: '/docs/learn/oblivious-hypergraph/query-planner/',
                component: ComponentCreator('/docs/learn/oblivious-hypergraph/query-planner/', 'f80'),
                exact: true,
                sidebar: "learn"
              },
              {
                path: '/docs/learn/oblivious-hypergraph/rdf-storage/',
                component: ComponentCreator('/docs/learn/oblivious-hypergraph/rdf-storage/', '50c'),
                exact: true,
                sidebar: "learn"
              },
              {
                path: '/docs/learn/operating-system/',
                component: ComponentCreator('/docs/learn/operating-system/', 'b32'),
                exact: true,
                sidebar: "learn"
              },
              {
                path: '/docs/learn/operating-system/accounts/',
                component: ComponentCreator('/docs/learn/operating-system/accounts/', '121'),
                exact: true,
                sidebar: "learn"
              },
              {
                path: '/docs/learn/operating-system/dbos/',
                component: ComponentCreator('/docs/learn/operating-system/dbos/', '00a'),
                exact: true,
                sidebar: "learn"
              },
              {
                path: '/docs/learn/operating-system/file-system/',
                component: ComponentCreator('/docs/learn/operating-system/file-system/', '918'),
                exact: true,
                sidebar: "learn"
              },
              {
                path: '/docs/learn/operating-system/ipc/',
                component: ComponentCreator('/docs/learn/operating-system/ipc/', '0a0'),
                exact: true,
                sidebar: "learn"
              },
              {
                path: '/docs/learn/operating-system/key-management/',
                component: ComponentCreator('/docs/learn/operating-system/key-management/', 'f36'),
                exact: true,
                sidebar: "learn"
              },
              {
                path: '/docs/learn/operating-system/message-queues/',
                component: ComponentCreator('/docs/learn/operating-system/message-queues/', 'b4f'),
                exact: true,
                sidebar: "learn"
              },
              {
                path: '/docs/learn/operating-system/scheduler/',
                component: ComponentCreator('/docs/learn/operating-system/scheduler/', '4d7'),
                exact: true,
                sidebar: "learn"
              },
              {
                path: '/docs/learn/operating-system/universal-resources/',
                component: ComponentCreator('/docs/learn/operating-system/universal-resources/', 'bd0'),
                exact: true,
                sidebar: "learn"
              },
              {
                path: '/docs/protocol/consensus/',
                component: ComponentCreator('/docs/protocol/consensus/', 'b4c'),
                exact: true,
                sidebar: "protocol"
              },
              {
                path: '/docs/protocol/data-structures/',
                component: ComponentCreator('/docs/protocol/data-structures/', '023'),
                exact: true,
                sidebar: "protocol"
              },
              {
                path: '/docs/protocol/overview/',
                component: ComponentCreator('/docs/protocol/overview/', '709'),
                exact: true,
                sidebar: "protocol"
              },
              {
                path: '/docs/run-node/account-aliases/',
                component: ComponentCreator('/docs/run-node/account-aliases/', '13c'),
                exact: true,
                sidebar: "run"
              },
              {
                path: '/docs/run-node/advanced-configuration/',
                component: ComponentCreator('/docs/run-node/advanced-configuration/', 'c75'),
                exact: true,
                sidebar: "run"
              },
              {
                path: '/docs/run-node/advanced-node-management/',
                component: ComponentCreator('/docs/run-node/advanced-node-management/', '0f7'),
                exact: true,
                sidebar: "run"
              },
              {
                path: '/docs/run-node/linux_configuration/',
                component: ComponentCreator('/docs/run-node/linux_configuration/', '9fb'),
                exact: true,
                sidebar: "run"
              },
              {
                path: '/docs/run-node/qclient/checksum/',
                component: ComponentCreator('/docs/run-node/qclient/checksum/', 'dd8'),
                exact: true,
                sidebar: "run"
              },
              {
                path: '/docs/run-node/qclient/commands/alias/',
                component: ComponentCreator('/docs/run-node/qclient/commands/alias/', '82b'),
                exact: true,
                sidebar: "run"
              },
              {
                path: '/docs/run-node/qclient/commands/bridging/',
                component: ComponentCreator('/docs/run-node/qclient/commands/bridging/', '230'),
                exact: true,
                sidebar: "run"
              },
              {
                path: '/docs/run-node/qclient/commands/command-list/',
                component: ComponentCreator('/docs/run-node/qclient/commands/command-list/', 'b42'),
                exact: true,
                sidebar: "run"
              },
              {
                path: '/docs/run-node/qclient/commands/compute/',
                component: ComponentCreator('/docs/run-node/qclient/commands/compute/', 'b6c'),
                exact: true,
                sidebar: "run"
              },
              {
                path: '/docs/run-node/qclient/commands/deploy/',
                component: ComponentCreator('/docs/run-node/qclient/commands/deploy/', '3f1'),
                exact: true,
                sidebar: "run"
              },
              {
                path: '/docs/run-node/qclient/commands/global-flags/',
                component: ComponentCreator('/docs/run-node/qclient/commands/global-flags/', '72f'),
                exact: true,
                sidebar: "run"
              },
              {
                path: '/docs/run-node/qclient/commands/hypergraph/',
                component: ComponentCreator('/docs/run-node/qclient/commands/hypergraph/', 'ca3'),
                exact: true,
                sidebar: "run"
              },
              {
                path: '/docs/run-node/qclient/commands/key/',
                component: ComponentCreator('/docs/run-node/qclient/commands/key/', '47a'),
                exact: true,
                sidebar: "run"
              },
              {
                path: '/docs/run-node/qclient/commands/messaging/',
                component: ComponentCreator('/docs/run-node/qclient/commands/messaging/', '38f'),
                exact: true,
                sidebar: "run"
              },
              {
                path: '/docs/run-node/qclient/commands/node/',
                component: ComponentCreator('/docs/run-node/qclient/commands/node/', 'f8e'),
                exact: true,
                sidebar: "run"
              },
              {
                path: '/docs/run-node/qclient/commands/qclient-config/',
                component: ComponentCreator('/docs/run-node/qclient/commands/qclient-config/', '57c'),
                exact: true,
                sidebar: "run"
              },
              {
                path: '/docs/run-node/qclient/commands/qclient/',
                component: ComponentCreator('/docs/run-node/qclient/commands/qclient/', '0ae'),
                exact: true,
                sidebar: "run"
              },
              {
                path: '/docs/run-node/qclient/commands/token/',
                component: ComponentCreator('/docs/run-node/qclient/commands/token/', 'bbe'),
                exact: true,
                sidebar: "run"
              },
              {
                path: '/docs/run-node/qclient/managing-configs/',
                component: ComponentCreator('/docs/run-node/qclient/managing-configs/', '94f'),
                exact: true,
                sidebar: "run"
              },
              {
                path: '/docs/run-node/qclient/node/auto-update/',
                component: ComponentCreator('/docs/run-node/qclient/node/auto-update/', '96b'),
                exact: true,
                sidebar: "run"
              },
              {
                path: '/docs/run-node/qclient/node/clean/',
                component: ComponentCreator('/docs/run-node/qclient/node/clean/', 'd42'),
                exact: true,
                sidebar: "run"
              },
              {
                path: '/docs/run-node/qclient/node/install/',
                component: ComponentCreator('/docs/run-node/qclient/node/install/', '09f'),
                exact: true,
                sidebar: "run"
              },
              {
                path: '/docs/run-node/qclient/node/key-management/create-new-keyset/',
                component: ComponentCreator('/docs/run-node/qclient/node/key-management/create-new-keyset/', '324'),
                exact: true,
                sidebar: "run"
              },
              {
                path: '/docs/run-node/qclient/node/key-management/import-keysets/',
                component: ComponentCreator('/docs/run-node/qclient/node/key-management/import-keysets/', '702'),
                exact: true,
                sidebar: "run"
              },
              {
                path: '/docs/run-node/qclient/node/key-management/initial-keyset/',
                component: ComponentCreator('/docs/run-node/qclient/node/key-management/initial-keyset/', '029'),
                exact: true,
                sidebar: "run"
              },
              {
                path: '/docs/run-node/qclient/node/key-management/keys/',
                component: ComponentCreator('/docs/run-node/qclient/node/key-management/keys/', '1a6'),
                exact: true,
                sidebar: "run"
              },
              {
                path: '/docs/run-node/qclient/node/key-management/multiple-keysets/',
                component: ComponentCreator('/docs/run-node/qclient/node/key-management/multiple-keysets/', '6eb'),
                exact: true,
                sidebar: "run"
              },
              {
                path: '/docs/run-node/qclient/node/node-service/commands/',
                component: ComponentCreator('/docs/run-node/qclient/node/node-service/commands/', 'cd4'),
                exact: true,
                sidebar: "run"
              },
              {
                path: '/docs/run-node/qclient/node/node-service/environment-variables/',
                component: ComponentCreator('/docs/run-node/qclient/node/node-service/environment-variables/', '8b2'),
                exact: true,
                sidebar: "run"
              },
              {
                path: '/docs/run-node/qclient/node/node-service/installing-node-service/',
                component: ComponentCreator('/docs/run-node/qclient/node/node-service/installing-node-service/', '78a'),
                exact: true,
                sidebar: "run"
              },
              {
                path: '/docs/run-node/qclient/node/node-service/overview/',
                component: ComponentCreator('/docs/run-node/qclient/node/node-service/overview/', 'adc'),
                exact: true,
                sidebar: "run"
              },
              {
                path: '/docs/run-node/qclient/node/run-node-via-node-service/',
                component: ComponentCreator('/docs/run-node/qclient/node/run-node-via-node-service/', '94a'),
                exact: true,
                sidebar: "run"
              },
              {
                path: '/docs/run-node/qclient/node/update/',
                component: ComponentCreator('/docs/run-node/qclient/node/update/', '697'),
                exact: true,
                sidebar: "run"
              },
              {
                path: '/docs/run-node/qclient/qclient-101/',
                component: ComponentCreator('/docs/run-node/qclient/qclient-101/', '938'),
                exact: true,
                sidebar: "run"
              },
              {
                path: '/docs/run-node/qclient/setup/',
                component: ComponentCreator('/docs/run-node/qclient/setup/', '9de'),
                exact: true,
                sidebar: "run"
              },
              {
                path: '/docs/run-node/quick-start/',
                component: ComponentCreator('/docs/run-node/quick-start/', '655'),
                exact: true,
                sidebar: "run"
              },
              {
                path: '/docs/run-node/RPC/',
                component: ComponentCreator('/docs/run-node/RPC/', 'b39'),
                exact: true,
                sidebar: "run"
              },
              {
                path: '/docs/run-node/shard-enrollment-process/',
                component: ComponentCreator('/docs/run-node/shard-enrollment-process/', 'f9f'),
                exact: true,
                sidebar: "run"
              },
              {
                path: '/docs/run-node/system-requirements/',
                component: ComponentCreator('/docs/run-node/system-requirements/', '472'),
                exact: true,
                sidebar: "run"
              },
              {
                path: '/docs/run-node/upgrade-2.1/',
                component: ComponentCreator('/docs/run-node/upgrade-2.1/', '353'),
                exact: true,
                sidebar: "run"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/', 'e5f'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
