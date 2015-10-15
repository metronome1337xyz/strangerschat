<?php include("db_connection.php");  ?>
<?php include("password.php");  ?>

<?php

 $Rdata = json_decode(file_get_contents('php://input'));
    $name = $Rdata->name;
    $username = $Rdata->username;
    $password = $Rdata->password;
    $email = $Rdata->email;


    // -------------------To encrypt password and then store in database ------------------//
        $hash = password_hash($password, PASSWORD_BCRYPT);
        // 2.1 INSERT data
        // often comes from user input such as form input


        $query = "INSERT INTO users(name, username, password, email) ";
        $query .= "VALUES ( '{$name}', '{$username}', '{$hash}', '{$email}') ";


        $result = mysqli_query($connection, $query);  // returns true or false
echo json_encode($result);

?>