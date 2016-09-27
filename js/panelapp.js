var app = angular.module('App',['ngRoute','firebase']);

var config = {
    apiKey: "AIzaSyB-UAD6SUv9Cv7QyjyVCv9cLEFb1Y9lqrQ",
    authDomain: "computing-awesome.firebaseapp.com",
    databaseURL: "https://computing-awesome.firebaseio.com",
    storageBucket: "computing-awesome.appspot.com",
    messagingSenderId: "936964279529"
};
firebase.initializeApp(config);

app.run(function ($rootScope,$timeout) {
    $rootScope.$on('$viewContentLoaded', function(){
        $timeout(function() {
        componentHandler.upgradeAllRegistered();
    })
})
});

app.config(function ($routeProvider) {
    $routeProvider
        .when("/login",{
            controller:"LoginCtrl",
            templateUrl:"template/login.htm"
        });
});

app.controller("LoginCtrl",function ($scope) {

    $scope.loginbtn = function () {
        console.log($scope.user);
    }

});