angular.module('MyControllers',[])

.controller('mainController',function($scope, loginRegisterLogout, chatsService, namesList_data, admin_convo, $localStorage,  session_data, $state){
        console.log('main controller fired');

        $scope.storage = $localStorage;


        if($scope.storage.clickedName){
            var name = {
                "name" : $scope.storage.clickedName
            }
            chatsService.getConversation(name).then(function(response){
                if(response.length){
                    $scope.convo  = response.slice().reverse();
                }
                else{
                    $scope.convo = null

                }

            });
        }
        else{   // get admin data
            if(admin_convo.length){     // check if admin has data or not

                $scope.convo  = admin_convo.slice().reverse();

            }
            else{
                $scope.convo = null;
            }
        }

        // ----------------------------- SET SESSION DATA such as Logged in user name -----------------------------//
        if(session_data.logged_in){
            loginRegisterLogout.setChatsData(session_data.name);

            if(namesList_data.usersFound){
                chatsService.setNamesList(namesList_data);  // set the name
                $state.go('main.chats');                    // then show the view
            }
            else{
                $state.go('main.chats');
            }
        }
        else{
            $state.go('login');
        }

})
.controller('loginRegisterController',function($scope, $state, chatsService, loginRegisterLogout){

        console.log('login controller fired');

        $scope.createAccount = function(name, username, email ,password){
            var newUser = {
                "name" : name,
                "username" : username,
                "email": email,
                "password" : password
            }

            loginRegisterLogout.registerUser(newUser).then(function(response){
                if(response.search("true")){
                    $state.go('login')
                }
                else{
                    alert("Error");
                }
            })
        }

        $scope.login = function(username, password){
            var user = {
                "username" : username,
                "password" : password
            }

            loginRegisterLogout.userLogin(user).then(function(response){
                if(response.logged_in){
                    $state.go("main");
                }else{
                    alert('wrong input');
                }
            });

        }
})


.controller('chatsController',function($scope,loginRegisterLogout, chatsService, $localStorage, $state ){


        $scope.name = loginRegisterLogout.name;  // contains the name of user logged in
        $scope.storage = $localStorage;

        if(!$scope.storage.selectedUser)
        $scope.storage.selectedUser = {   // toggle the background color on click on sidenav
            item : -1
        };

        // --------------------- By Default clickedName is not set, so set it the user logged in ---------------------//
        if(!$scope.storage.clickedName)
            $state.go('main.chats.user', {name:$scope.name})


        // ------------------ If the page is refreshed, set the url with the clickedName stored in local storage ---------//
        if($scope.storage.clickedName)
            $state.go('main.chats.user', {name:$scope.storage.clickedName})


        $scope.logout = function(){
            loginRegisterLogout.userLogout();
            $localStorage.$reset();  // destroy data in localstorage
            $state.go('login');
        }

        //-----------Side Menu Config ----------------//

        $scope.tgState = true;

        $scope.toggleSideMenu = function(){
            $scope.tgState =! $scope.tgState;
        }

        $scope.namesList = chatsService.namesList;

        //---------------- Get Convo ----------------------//

        $scope.getConvo = function(name){

            $scope.clickedName = name;
            $scope.storage.clickedName = $scope.clickedName;
            var name = {
                "name" : name
            }
            chatsService.getConversation(name).then(function(response){
                if(response.length){
                    $scope.convo  = response.slice().reverse();  // reverse the list, so that the last comment made appears on top
                }
                else{
                    $scope.convo = null

                }
            });

            return
        }
        //--------------Store User comments ----------------//


        $scope.postComment = function(userComment){

            var message_author = {
                 "to_user" : $scope.clickedName,
                 "comment" : userComment
            }
            chatsService.sendComment(message_author).then(function(response){
                $scope.getConvo($scope.clickedName);  // update comments view by getting the updated ones from database.

            });

        }

        // -------------------------- Edit & Delete Comment -------------------------- //
        $scope.isOpen = false;
        $scope.demo = {
            isOpen: false,
            count: 0,
            selectedMode : 'md-scale',
            selectedDirection: 'left'
        };

        $scope.editComment = function(index, comment){
            var changeComment = {
                "message_id": $scope.convo[index].message_id,
                "newComment" : comment
            }
            chatsService.updateComment(changeComment).then(function(response){
                if(response){ // if true
                    $scope.getConvo($scope.clickedName);
                }
            })

        }

        $scope.deleteComment = function(index){
            var commentID = {
                "message_id" : $scope.convo[index].message_id
            }

            chatsService.deleteComment(commentID).then(function(response){
                $scope.getConvo($scope.clickedName);
            })
        }







})
