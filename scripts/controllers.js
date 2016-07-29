define(function (require, exports) {
    'use strict';

    // @ngInject
    exports.LoginController = function($scope, i18nUtils, lpCoreUtils, lpWidget, LoginService) {
        var widget = lpWidget;
        var utils = lpCoreUtils;

        i18nUtils.loadMessages(widget).success(function(bundle) {
            $scope.messages = bundle.messages;
        });

		$scope.user = {};

        $scope.allowSubmit = function() {
            return $scope.user.id;
        };

        $scope.doLogin = function() {
            $scope.$broadcast('autofill:update');

            LoginService.doLogin($scope.user.id, $scope.user.password, $scope.user.remember).then(function(data) {
                // Always assign error from service to our scope, so it can be visible
                if (LoginService.error) {
                    $scope.error = $scope.messages && $scope.messages[LoginService.error] || LoginService.error;
                }
            });
        };

        widget.addEventListener('preferencesSaved', function () {
            widget.refreshHTML();
        });

    };
});
