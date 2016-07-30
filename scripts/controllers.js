define(function (require, exports) {
    'use strict';

    // @ngInject
    exports.LoginController = function($scope, i18nUtils, lpCoreUtils, lpWidget, AsaasService) {
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

            AsaasService.doLogin($scope.user.id, $scope.user.password, $scope.user.remember).then(function(data) {
                if (AsaasService.error) {
                    $scope.error = $scope.messages && $scope.messages[AsaasService.error] || AsaasService.error;
                }
            });
        };

    };
});
