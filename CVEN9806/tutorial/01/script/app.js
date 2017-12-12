var app = angular.module("app", []);

app.controller("Controller", function($scope) {
    $scope.prob = new Problem();
    
    $scope.start = function(e) {
        var $next = $(e.target).hide().next("section");
        $next.css("display", "block");
    };
});