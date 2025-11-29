hms.service("httpService", ['$http', 'baseUrl', function ($http, baseUrl) {
    
    this.get = function (endPoint) {
        console.log("httGetService running...");
        return $http.get(`${baseUrl.url}/${endPoint}`)
    };

    this.delete = function (endPoint) {
        console.log("httpDeleteService running...")
        return $http.delete(`${baseUrl.url}/${endPoint}`);
    };

    this.post = function (endPoint, data, headers = { 'Content-Type': 'application/json' }) {
        console.log("httpPostService running...");
        return $http.post(`${baseUrl.url}/${endPoint}`, data, {
            headers: headers
        });
    };

}]);