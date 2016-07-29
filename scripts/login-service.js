define(function(require, exports, module) {
    'use strict';

    // @ngInject
    exports.LoginService = function($http, $window, lpPortal, lpCoreUtils) {

        var self = this;
        var config = {
            authenticateUrl: lpPortal.root + '/services/rest/v1/asaas/checkUserAuthenticated',
            loginUrl: lpPortal.root + '/services/rest/v1/asaas/authenticateUser',
            successPage: null
        };

        // Allow user to configure some attributes
        this.configure = function(_config) {
            lpCoreUtils.extend(config, _config);
        };

        this.doCheckAuthentication = function() {
            var promise = this.getAuthentication().success(function( response ) {
                self.handleSuccessfulAuthentication(response || {});
            }).error(function(response) {
                self.handleUnSuccessfulAuthentication(response || {});
            });

            return promise;
        };

        this.doLogin = function(username, password) {
            var promise = this.getLoginPromise(username, password).success(function( response ) {

                if (response) {
                    self.error = null;
                    self.handleSuccessfulLogin(response || {});
                }
            }).error(function(response) {
                self.error = response.errors[0].code;
            });

            return promise;
        };

        this.getAuthentication = function() {
            var data = {};

            return $http.get(config.authenticateUrl, lpCoreUtils.buildQueryString(data), {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded;',
                    'Cache-Control': 'no-cache, no-store, must-revalidate',
                    'Pragma': 'no-cache',
                    'Expires': '0'
                }
            });
        };

        this.getLoginPromise = function(username, password) {
    
            var data = {
                username: username,
                password: password
            };

            return $http.get(config.loginUrl, lpCoreUtils.buildQueryString(data), {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded;',
                    'Cache-Control': 'no-cache, no-store, must-revalidate',
                    'Pragma': 'no-cache',
                    'Expires': '0'
                }
            });
        };


        this.handleSuccessfulAuthentication = function( response ) {
            alert("Im authenticatd.");
        };

        this.handleUnSuccessfulAuthentication = function( response ) {
            alert("Im not authenticatd.");
        };

        this.handleSuccessfulLogin = function( response ) {
            alert("Im logged in.");
        };

    };
});

