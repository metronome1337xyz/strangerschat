angular.module("MyServices", [])

.factory("loginRegisterLogout", ['$http', '$state', '$q', function( $http, $state,$q) {
    var objBag = {};


    objBag.registerUser = function(newUser){
        var defer = $q.defer();
        $http.post("server/createAccount.php", newUser).success(function(response){
            defer.resolve(response);
        }).error(function(error){
            alert(error);
        });
        return defer.promise;

    }

    objBag.userLogin = function(user){
        var defer = $q.defer();
        $http.post("server/login.php", user).success(function(response){
            defer.resolve(response);
        }).error(function(error){
            defer.reject("Error"  + error);
        });
        return defer.promise;
    }

    objBag.checkLogin = function(){
        var defer = $q.defer();
        $http.get("server/checkLogin.php").success(function(response){
            defer.resolve(response);
        }).error(function(error){
            alert(JSON.stringify(error));
        })
        return defer.promise;
    }

    objBag.userLogout = function(){
        $http.get("server/logout.php").success(function(response){
            if(response.search("Logout") != -1){
                $state.go("login");
            }

        }).error(function(error){
            alert(JSON.stringify(error));
        })
    }


    objBag.setChatsData = function(name){
        objBag.name = name;

    }


        return objBag;
}])


.factory("chatsService", ['$http', '$state', '$q', function( $http, $state,$q) {
    var objBag = {};

    objBag.getNamesList = function(){
        var defer = $q.defer();
        $http.get("server/getUsers.php").success(function(response){
            defer.resolve(response);
        }).error(function(error){
            alert(JSON.stringify(error));
        })
        return defer.promise;
    }

    objBag.setNamesList = function(namesList_data){
        objBag.namesList = namesList_data;
    }

    objBag.sendComment = function(message_author){
        var defer = $q.defer();
        $http.post("server/storeUserMessage.php", message_author).success(function(response){
            defer.resolve(response);
        }).error(function(error){
            defer.reject("Error"  + error);
        });
        return defer.promise;
    }


    objBag.getConversation = function(name){
        var defer = $q.defer();
        $http.post("server/getConvo.php", name).success(function(response){
            defer.resolve(response);
        }).error(function(error){
            alert(JSON.stringify(error));
        })
        return defer.promise;
    }


    objBag.getAdminConversation = function(){
        var defer = $q.defer();
        $http.post("server/getAdminConvo.php", name).success(function(response){
            defer.resolve(response);
        }).error(function(error){
            alert(JSON.stringify(error));
        })
        return defer.promise;
    }

    objBag.deleteComment = function(commentID){
        var defer = $q.defer();
        $http.post("server/deleteComment.php", commentID).success(function(response){
            defer.resolve(response);
        }).error(function(error){
            alert(JSON.stringify(error));
        })
        return defer.promise;
    }

    objBag.updateComment = function(changeComment){
        var defer = $q.defer();
        $http.post("server/updateComment.php", changeComment).success(function(response){
            defer.resolve(response);
        }).error(function(error){
            alert(JSON.stringify(alert));
        })

        return defer.promise;
    }

    return objBag;



}])
