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

app.controller('Event',function ($scope, $interval) {
    var deadline = '2017-04-16 23:59';
    var deadeline2 = '2017-01-31 12:00';
    $scope.bisa = true;
    var remainingtimes = function (endtime) {

        accepted = [
            '1301154313',
            '1301150063',
            '1301154368',
            '1301150036',
            '1301164318',
            '1301154247',
            '1301154351',
            '1301160321',
            '1301164422',
            '1301164136',
            '1301154406',
            '1301154565',
            '1301154566',
            '1301154312',
            '1301164495',
            '1301154409',
            '1301154522',
            '1301150441',
            '1301160479',
            '1301151429',
            '1301154247',
            '1301154247',
            '1301144316',
            '1301144105',
            '1301144105',
            '1301144395',
            '1301144205',
            '1301140237',
            '1301140144',
            '1302144170',
            '1301140210',
            '1301140384'
        ];

        $scope.lulusga = function (nim) {
            if (accepted.indexOf(nim)!=-1){
                $scope.hasil = "Selamat Kamu Lulus :D, Jangan lupa untuk hadir first meet pada tanggal 18 Maret"
            } else {
                $scope.hasil = "Maaf kamu tidak lulus, jangan berkecil hati ya :)"
            }
        };

        var t = Date.parse(endtime) - Date.parse(new Date());
        var seconds = Math.floor( (t/1000) % 60 );
        var minutes = Math.floor( (t/1000/60) % 60 );
        var hours = Math.floor( (t/(1000*60*60)) % 24 );
        var days = Math.floor( t/(1000*60*60*24) );
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    };
    var update = function () {
        $scope.remaining = remainingtimes(deadline);
        $scope.remaining2 = remainingtimes(deadeline2);
        if ($scope.remaining.total<0){
            $scope.bisa = false;
        }
    };
    $interval(update,1000);
});

app.filter("Summ",function () {
    return function (input) {
        return input.substr(0,500)+"...";
    }
});
