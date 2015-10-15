<?php include("db_connection.php");  ?>
<?php session_start(); ?>
<?php

   $Rdata = json_decode(file_get_contents('php://input'));
   $comment = $Rdata->comment;
   $user_id = $_SESSION["user_id"];

   if(empty($Rdata->to_user)){
       $to_user = $_SESSION["name"];
    }
   else{
       $to_user = $Rdata->to_user;
    }


   $connection = mysqli_connect(dbhost, dbuser, dbpass, dbname);
   $query = "INSERT INTO usermessages(to_user, comment, user_id) ";
   $query .= "VALUES ( '{$to_user}', '{$comment}', '{$user_id}')";


   $result = mysqli_query($connection, $query);  // returns true or false
   echo json_encode($result);
  // echo $connection->error;

?>