<?php include("db_connection.php");  ?>
<?php session_start(); ?>
<?php
@ob_start();
    if(isset($_SESSION['username'])){

       $connection = mysqli_connect(dbhost, dbuser, dbpass, dbname);
       $query = "SELECT name ";
       $query .="FROM users ";
       $query .="WHERE name != '{$_SESSION["name"]}'";

       $namesList = mysqli_query($connection, $query);

       if ($namesList->num_rows > 0) {
           while($row =  mysqli_fetch_assoc($namesList)){

                $returnData['usersFound'] = true;
                $returnData [] = $row;
           }
       }
       else{
          $returnData = [
               'usersFound' =>false
           ];
       }
    }

    else{
       $returnData['sessionNotset'] = true;
    }



echo json_encode($returnData);
?>