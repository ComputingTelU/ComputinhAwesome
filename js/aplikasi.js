var app = angular.module("App",['firebase','ngSanitize','ui.bootstrap']);

var config = {
    apiKey: "AIzaSyB-UAD6SUv9Cv7QyjyVCv9cLEFb1Y9lqrQ",
    authDomain: "computing-awesome.firebaseapp.com",
    databaseURL: "https://computing-awesome.firebaseio.com",
    storageBucket: "computing-awesome.appspot.com",
    messagingSenderId: "936964279529"
};
firebase.initializeApp(config);

// app.run(function ($rootScope,$timeout) {
//     $rootScope.$on('$viewContentLoaded', function(){
//         $timeout(function() {
//             componentHandler.upgradeAllRegistered();
//         })
//     })
// });

app.controller('Ctrl',function ($scope,$firebaseArray,$sce,$uibModal) {
    var rootref = firebase.database().ref().child('posts');
    $scope.blogvisible = false;
    $scope.posts = [
        {
            tittle:"3sadsa",
            content:"SAdasdsa"
        },
        {
            tittle:"2sadsa",
            content:"SAdasdsa"
        },
        {
            tittle:"1sadsa",
            content:"SAdasdsa"
        }
    ];
    var post =  $firebaseArray(rootref);
    post.$loaded(
        function () {
            $scope.posts = post;
            console.log(post);
            $scope.blogvisible = true;
        }
    );

    var bacacontroller = function ($scope,post,$sce) {
        $scope.isinya = post;
    };

    $scope.bacalengkap = function (_selectedpost) {
        var modalinstance  = $uibModal.open({
            size:'lg',
            templateUrl:'/readmore.htm',
            controller: bacacontroller,
            resolve:{
                post:function () {
                    return _selectedpost;
                }
            }
        });
    };

});

app.filter("Summ",function () {
    return function (input) {
        return input.substr(0,500)+"...";
    }
});
