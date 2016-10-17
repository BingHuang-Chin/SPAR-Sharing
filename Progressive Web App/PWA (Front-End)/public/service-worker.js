/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';
importScripts('js/sw-toolbox.js');
toolbox.router.get('/GetChatUsers', toolbox.networkFirst, { origin: 'https://spar-pwa.azurewebsites.net' });








var precacheConfig = [["/chat.html","7ab9e91721a9a57af278139b2faeee16"],
                      ["/css/app.css","d41d8cd98f00b204e9800998ecf8427e"],
                      ["/dist/angular/angular.min.js","c8ddded85c81cfcd8dd4e54b71724d85"],
                      ["/dist/angular/angular.min.js.map","5ab4b4c6d699fd0146596eb01db89487"],
                      ["/dist/framework7/css/framework7.material.colors.css","29da87a3f6618bb7aa571bbdb1d7d12a"],
                      ["/dist/framework7/css/framework7.material.colors.min.css","d15d565567da04b93d112a69289cf955"],
                      ["/dist/framework7/css/framework7.material.css","1c3d8a472d2b1a61312c80ac9678a239"],
                      ["/dist/framework7/css/framework7.material.min.css","51c79eef9588e94c467eb84393de5ced"],
                      ["/dist/framework7/css/framework7.material.rtl.css","fbe5569cd7a8cacf42cad13431d1e29a"],
                      ["/dist/framework7/css/framework7.material.rtl.min.css","f7043ee7de787d4672486e73cbdcba1b"],
                      ["/dist/framework7/img/i-f7-material.png","ccc2c70bd64673a3fdc669741f749af2"],
                      ["/dist/framework7/img/i-form-calendar-material.svg","b17d8c9206b9c0198106c1a1978cc292"],
                      ["/dist/framework7/img/i-form-comment-material.svg","1a503d147a6803b776f60bb841d7066c"],
                      ["/dist/framework7/img/i-form-email-material.svg","89e20536334428179471475b35d0cf1c"],
                      ["/dist/framework7/img/i-form-gender-material.svg","acf4c1c2e3871adb7c5c4b1274bd9d56"],
                      ["/dist/framework7/img/i-form-name-material.svg","24e83f6a908da41c8544a6831794bc9a"],
                      ["/dist/framework7/img/i-form-password-material.svg","15a9cd5151c318e2575e7d91f5cd1969"],
                      ["/dist/framework7/img/i-form-settings-material.svg","0e0ec79de204ac66a9cf07e32005d300"],
                      ["/dist/framework7/img/i-form-tel-material.svg","7fcb3c7bda1d09dd6a0e609461962664"],
                      ["/dist/framework7/img/i-form-toggle-material.svg","3f38dcdba86bbb49ef21a9167e1eaf03"],
                      ["/dist/framework7/img/i-form-url-material.svg","f0d780c2c893b9598c4119206148eb89"],
                      ["/dist/framework7/js/framework7.min.js","b769198f9f383594705da09372bfaf28"],
                      ["/dist/framework7/js/framework7.min.js.map","f0cbefa7f1d20723f50ba0efdbeed1b3"],
                      ["/dist/framework7/js/my-app.js","7cc891318bd02654b3e7f791d37d00a0"],
                      ["/dist/jquery/jquery.min.js","d0212568ce69457081dacf84e327fa5c"],
                      ["/dist/jquery/jquery.min.map","339b713df5565abd253bc2483dbcde11"],
                      ["/home.html","5e649e524e90078e2895d75934f53780"],
                      ["/index.html","6a4d5d7a747f95f59f7e52d1036ade53"],
                      ["/js/app.js","da06d5c8db18b636540a3616f9d69cc7"],
                      ["/js/framework7.angular.hook.js","c612fc9bffc054782228b4552f2d73f8"]];
var cacheName = 'sw-precache-v2--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.toString().match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              return cache.add(new Request(cacheKey, {credentials: 'same-origin'}));
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameter and see if we have that URL
    // in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







