var app = angular.module('App',['ngRoute','firebase','ui.tinymce']);

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

app.run(["$rootScope", "$location", function($rootScope, $location) {
    $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
        // We can catch the error thrown when the $requireSignIn promise is rejected
        // and redirect the user back to the home page
        if (error === "AUTH_REQUIRED") {
            $location.path("/");
            window.alert("login dulu cuy")
        }
    });
}]);

app.config(function ($routeProvider) {
    $routeProvider
        .when("/",{
            controller:"LoginCtrl",
            templateUrl:"template/login.htm",
            resolve:{
                "currentAuth": ["Auth",function (Auth) {
                    return Auth.$waitForSignIn();
                }]
            }
        })
        .when("/post",{
            controller:"PostCtrl",
            templateUrl:"template/posts.htm",
            resolve:{
                "currentAuth": ["Auth", function (Auth) {
                    return Auth.$requireSignIn();
                }]
            }
        })
});

app.controller("headerCtrl",function (Auth, $scope, $location) {
    $scope.logout = function () {
        Auth.$signOut();
        $location.path('/');
    }
});

app.controller("LoginCtrl",function ($scope,$firebaseAuth,$location,currentAuth) {
    var auth = $firebaseAuth();
    console.log(currentAuth);
    if (currentAuth){
        $location.path('/post')
    }

    $scope.loginbtn = function () {
        console.log($scope.user);
        var user = $scope.user;
        auth.$signInWithEmailAndPassword(user.email,user.pass).then(function (firebaseUser) {
            $location.path('/post')
        }).catch(function (error) {
            console.log(error);
            alert(" Password salah cuy, atau belum kedaftar")
        })
    }

});

app.controller("PostCtrl",function ($scope,currentAuth,$firebaseArray) {
    $scope.saha = currentAuth;
    var rootref = firebase.database().ref().child('posts');
    var posts =  $firebaseArray(rootref);
    $scope.addmode = true;
    $scope.editmode = false;
    posts.$loaded(
        function () {
            $scope.posts = posts;
            console.log(posts);
        }
    );
    $scope.addPost = function (post) {
        console.log(post);
        $scope.post = null;
        posts.$add(post);
    };
    $scope.selecteditPost = function (selected) {
        $scope.post = selected;
        $scope.addmode = false;
        $scope.editmode = true;
    };
    $scope.editPost = function () {
        posts.$save($scope.post);
        $scope.post = null;
        $scope.addmode = true;
        $scope.editmode = false;
    };
    $scope.tinyMceOpt = {
        plugins: 'link image code',
        toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code '
    };

});

app.factory("Auth", ["$firebaseAuth",
    function($firebaseAuth) {
        return $firebaseAuth();
    }
]);

app.filter("Summ",function () {
    return function (input) {
        return input.substr(0,20)+"...";
    }
});
