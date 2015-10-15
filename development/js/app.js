angular.module('myApp',['ui.router', 'MyServices', 'MyControllers', 'ngMaterial', 'ngHamburger', 'ngMdIcons', 'ngStorage'])

    .config(function($stateProvider, $urlRouterProvider){

        $stateProvider

            .state('register', {  // child state
                url: '/register',
                views: {
                    'mainArea' : {
                        templateUrl: 'templates/register.html',
                        controller: 'loginRegisterController'
                    }
                }
            })


            .state('login', {
                url: '/login',
                views: {
                    'mainArea' : {
                        templateUrl: 'templates/login.html',
                        controller: 'loginRegisterController'
                    }
                }
            })

            .state('main',{   // parent State
                // is not provided because we never want to go to this state
                views: {
                    'mainArea' : {
                        templateUrl : 'templates/main.html',
                        controller : 'mainController'
                    }
                },
                resolve : { // resolve provide us data which is loaded before page load

                    session_data : function(loginRegisterLogout,$q){ //inject service and q - service is for load data and q for stops page load until data load finish
                        var defer = $q.defer();
                        loginRegisterLogout.checkLogin().then(function(response){ //fetch data from service
                            defer.resolve(response); //and resolve returned data so page can continue to load.
                        })
                        return defer.promise; // we say to browser hey wait we are waiting something. just keep this promise as  a tip. lol
                    },

                    namesList_data : function(chatsService,$q){ //inject service and q - service is for load data and q for stops page load until data load finish
                        var defer = $q.defer();
                        chatsService.getNamesList().then(function(response){ //fetch data from service
                            defer.resolve(response); //and resolve returned data so page can continue to load.
                        })
                        return defer.promise; // we say to browser hey wait we are waiting something. just keep this promise as  a tip. lol
                    },

                    admin_convo : function(chatsService, $q){
                        var defer = $q.defer();
                        chatsService.getAdminConversation().then(function(response){ //fetch data from service
                            defer.resolve(response); //and resolve returned data so page can continue to load.
                        })
                        return defer.promise; // we say to browser hey wait we are waiting something. just keep this promise as  a tip. lol

                    }

                }

            })


            .state('main.chats', {
                url: '/chats',
                views: {
                    'mainArea' : {
                        templateUrl: 'templates/chats.html',
                        controller: 'chatsController'
                    }
                }


            })


            .state('main.chats.user', {
                url: '/:name',
                views: {
                    'chatsContentView' : {
                        templateUrl: 'templates/main.chats.user.html'

                    }
                }

            })

        $urlRouterProvider.otherwise('/login');


    })
    .config(function($mdThemingProvider) {
        $mdThemingProvider.theme('default')

            .primaryPalette('purple', {
                'default': '900', // by default use shade 400 from the pink palette for primary intentions
                'hue-1': '50', // use shade 100 for the <code>md-hue-1</code> class
                'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
                'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
            })
            // If you specify less than all of the keys, it will inherit from the
            // default shades
            .accentPalette('light-green', {
                'default': 'A400' // use shade 200 for default, and keep all other shades the same
            });
    });

