<?php
// 1. Create database connection

   // Constants
   define("dbhost",  "localhost");
   define("dbuser",  "phpuser");
   define("dbpass",  "phpstrangers");
   define("dbname",  "strangerschat");
   $connection = mysqli_connect(dbhost, dbuser, dbpass, dbname);

   // Test if connection happened
   if(mysqli_connect_errno()){
   	die("Database connection failed: " .
          mysqli_connect_error() .
          " (" . mysqli_connect_errno() . ")"
   		);
   }

?>