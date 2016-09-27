var app = angular.module("App",['firebase']);

var config = {
    apiKey: "AIzaSyB-UAD6SUv9Cv7QyjyVCv9cLEFb1Y9lqrQ",
    authDomain: "computing-awesome.firebaseapp.com",
    databaseURL: "https://computing-awesome.firebaseio.com",
    storageBucket: "computing-awesome.appspot.com",
    messagingSenderId: "936964279529"
};
firebase.initializeApp(config);

app.controller('Ctrl',function ($scope,$firebaseArray) {
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

    $scope.coba = function () {
        var postData = {
            tittle:".Meong",
            content:"Yoi"
        };
        $scope.posts.$add(postData);
    };
    

});
