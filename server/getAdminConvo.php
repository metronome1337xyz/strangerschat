<?php include("db_connection.php");  ?>
<?php session_start()  ?>

<?php
@ob_start();

    $connection = mysqli_connect(dbhost, dbuser, dbpass, dbname);

       $query = "SELECT comment, name ";
       $query .="FROM usermessages um JOIN users u ON um.user_id = u.user_id ";
       $query .="WHERE to_user = '{$_SESSION['name']}'";

       // from this i am getting the message and the author of message.
       $convo = mysqli_query($connection, $query);
        if ($convo->num_rows > 0) {
           while($row =  mysqli_fetch_assoc($convo)){
               $returnData []  = $row;
           }
       }
       else{
            $returnData['noConversation'] = false;
       }

       echo json_encode($returnData);


?>
