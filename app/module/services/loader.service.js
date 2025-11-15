hms.service("loaderService", ['$rootScope', function ($rootScope) {

    this.show = function () {
        $rootScope.loaderVisible = true;
    }

    this.hide = function () {
        $rootScope.loaderVisible = false;
    }

}]);