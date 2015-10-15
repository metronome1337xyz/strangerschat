<?php include("db_connection.php");  ?>
<?php include("password.php");  ?>
<?php session_start(); ?>
<?php

 function password_check($password, $hash){
     if (password_verify($password, $hash)) {
          return true;
     } else {
          return false;
     }
 }

 function find_user_by_username($username){

        $connection = mysqli_connect(dbhost, dbuser, dbpass, dbname);
        $safe_username = mysqli_real_escape_string($connection, $username);

        $query = "SELECT * ";
        $query .="FROM users ";
        $query  .= "WHERE username = '{$safe_username}' ";
        $query  .= "LIMIT 1";

        $admin_set = mysqli_query($connection, $query);
        if($admin = mysqli_fetch_assoc($admin_set)){
           return $admin;
        }
         else{
           return null;
         }

 }

 function attempt_login($username, $password){
     $admin = find_user_by_username($username);

     if($admin){
        // found the user, now check password
       if (password_check($password, $admin["password"])){
           // password matched
           return $admin;  // return the hash
       }
       else{
          return false;
       }

     }
     else{
       return false;
     }
 }

?>


<?php
    $Rdata = json_decode(file_get_contents('php://input'));
    $username = $Rdata->username;
    $password = $Rdata->password;


    $found_user = attempt_login($username, $password);

    if($found_user){

        $_SESSION["username"] = $found_user["username"];  // field name in the table user
        $_SESSION["name"] = $found_user["name"];
        $_SESSION["user_id"] = $found_user["user_id"];
        $userData =  [
               'logged_in' => true,
               'username'  => $found_user["username"],
               'name' => $found_user["name"]
        ];


    }
    else{
      $userData = [
           'logged_in' => false
      ];
    }



echo json_encode($userData);

?>

