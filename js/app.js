

var scotchApp = angular.module('scotchApp', ['ngRoute','firebase']);

scotchApp.controller("addingCtrl", function($scope, $firebaseArray){
    var songsRef = new Firebase('http://on-repeat.firebaseio.com/');
    var childRef = songsRef.child('message');

    $scope.setMessage = function() {
        childRef.set({
            user: 'Sean',
            text: 'Check this song out.'
        })
    }

    $scope.editMessage = function() {
        childRef.update({
            text: 'Wait, nvm. This song is just ok.'
        })
    }

    $scope.deleteMessage = function() {
        childRef.remove();

    }


    $scope.listings = $firebaseArray(songsRef);

    console.log($scope.listings);
    $scope.addSong = function(w, x, y, z) {
        $scope.listings.$add({ artist: w, name: x, album: y, images: z});
        $scope.artist = "";
        $scope.name = "";
        $scope.album = "";
        $scope.images = "";
    }

    $scope.deleteSong = function(song){
        var check = confirm("Are you sure you want to delete this song?");
        if(check == true){
            $scope.listings.splice(song, 1);
        }
    }


});

scotchApp.controller('musicCtrl', function($scope){
   $scope.listings = songs;
});

var songs = [{
                name: 'Cause Im A Man',
                artist: 'Tame Impala',
                album: 'Currents',
                images: 'img/3.jpg',
                href: 'https://www.youtube.com/watch?v=EyEB2AEqHxc'
            },
            {
                name: 'Bored in the USA',
                artist: 'Father John Misty',
                album: 'I Love You, Honeybear',
                images: 'img/4.jpg',
                href: 'https://www.youtube.com/watch?v=hIFrG_6fySg'
            },
            {
                name: 'Buffalo',
                artist: 'Toro Y Moi',
                album: 'What For?',
                images: 'img/5.jpg',
                href: 'https://www.youtube.com/watch?v=WNTSDOlkuR8'
            }


]

scotchApp.config(function($routeProvider){
    $routeProvider

        .when('/', {
            templateUrl : 'pages/home.html',
            controller  : 'mainCtrl'
        })

        // route for the about page
        .when('/about', {
            templateUrl : 'pages/about.html',
            controller  : 'aboutCtrl'
        })
        .when('/chat', {
            templateUrl: 'pages/chat.html',
            controller: 'ChatCtrl'
        })
        .when('/login', {
            templateUrl: 'pages/login.html',
            controller: 'LoginCtrl'
        })
        .when('/register', {
            templateUrl: 'pages/register.html',
            controller: 'RegisterCtrl'
        })
        .otherwise({
            redirectTo: '/'
        })

});


scotchApp.controller('mainCtrl', function($scope, $routeParams){
    $scope.message = 'Share your weekly eargasm obsessions, or daily repeats with your friends!';
    $scope.model = {
        message: $routeParams.message
    }
});

scotchApp.controller('aboutCtrl', function($scope){
    $scope.message = 'Ride on the same chillwaves as your friends, at the same time, all the time.' +
    ' Connect with one of the following:';
});
