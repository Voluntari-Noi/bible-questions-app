<?php
function db_connect() {
  global $db_user;
  global $db_password;
  global $db_name;
  global $conn;

  $conn = mysqli_connect("localhost", $db_user, $db_password, $db_name);

  if (!$conn) {
    die('Could not connect: ' . $mysqli_connect_error());
  }

  mysqli_select_db($conn, $db_name) or die ('Error: '.mysqli_error ());
}

function db_close() {
  global $conn;
  mysqli_close($conn);
}

?>
