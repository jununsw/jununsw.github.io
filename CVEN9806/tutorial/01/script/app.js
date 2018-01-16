var model = new Problem();
var submission = new Problem();
var app = angular.module("app", []);

app.controller("Controller", function($scope) {
    $scope.prob = model;
    $scope.submission = submission;
    
    $scope.start = function(e) {
        var $next = $(e.target).hide().next("section");
        $next.css("display", "block");
    };
});