<?php
   @ob_start();
   session_start();
   if(isset($_SESSION['username'])){
       //user not logged in so tell the angular user is not authorized
        $returnData = [
                       'logged_in' => true,
                        'username' => $_SESSION['username'],
                        'name' => $_SESSION['name']
                        ];

   }else{
        //user logged in so check user data from session to angular know it so no need to login user again.
        $returnData = [
                    'logged_in' => false
        ];
   }

   //use json_encode to post our array in JSON object format to angular. So we can use parameters like objecct
   echo json_encode($returnData);

?>