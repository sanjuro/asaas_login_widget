define(function(require, exports, module) {
    'use strict';

    // @ngInject
    exports.AsaasService = function($http, $window, lpPortal, lpCoreUtils) {

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

        this.doAuthentication = function() {
            var authentication = this.getAuthentication().success(function( response ) {

               if (response.data == "true") {
                    self.error = null;
                    self.handleSuccessfulAuthentication(response || {});
                } else {
                    self.error = response.data.errors;
                    self.handleUnSuccessfulAuthentication(response || {});
                }

            }).error(function(response) {
                self.handleUnSuccessfulAuthentication(response || {});
            });

            return authentication;
        };

        this.doLogin = function(username, password) {
            alert(username);
            var login = this.getLogin(username, password).success(function( response ) {

                if (response.data == "saved") {
                    self.error = null;
                    self.handleSuccessfulLogin(response || {});
                } else {
                    self.error = response.data.errors;
                    self.handleUnSuccessfulLogin(response || {});
                }

            }).error(function(response) {
                self.error = response.errors[0].code;
            });

            return login;
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

        this.getLogin = function(username, password) {
    
            var data = {
                username: username,
                password: password
            };

            return $http.post(config.loginUrl, lpCoreUtils.buildQueryString(data), {
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
            alert("Im not authenticated.");
        };

        this.handleSuccessfulLogin = function( response ) {
            alert("Im logged in.");
        };

        this.handleUnSuccessfulLogin = function( response ) {
            alert("Im not logged in.");
        };
    };
});

