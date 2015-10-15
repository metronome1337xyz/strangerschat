<?php include("db_connection.php");  ?>
<?php session_start(); ?>
<?php
    $Rdata = json_decode(file_get_contents('php://input'));
    $message_id = $Rdata->message_id;

    $connection = mysqli_connect(dbhost, dbuser, dbpass, dbname);
       $query = "DELETE ";
       $query .="FROM usermessages ";
       $query .="WHERE message_id = '{$message_id}' AND user_id = '{$_SESSION[user_id]}'";

       $result = mysqli_query($connection, $query);
       echo json_encode($result);

?>