var app = angular.module("App",[firebase]);

var config = {
    apiKey: "AIzaSyB-UAD6SUv9Cv7QyjyVCv9cLEFb1Y9lqrQ",
    authDomain: "computing-awesome.firebaseapp.com",
    databaseURL: "https://computing-awesome.firebaseio.com",
    storageBucket: "computing-awesome.appspot.com",
    messagingSenderId: "936964279529"
};
firebase.initializeApp(config);

app.controller('Ctrl',function ($scope,$firebaseObject) {
    const rootref = firebase.database().ref().chid('computing-awesome');
    const ref = rootref.chid('posts');
    console.log($firebaseObject(ref));
    $scope.posts =[
        {
            post:"Lorem ipsum bla bla bla bla",
            title:"Pada suatu hari"
        },
        {
            post:"Lorem ipsum bla bla bla bla",
            title:"Pada suatu hari"
        },
        {
            post:"Lorem ipsum bla bla bla bla",
            title:"Pada suatu hari"
        }
    ];
});