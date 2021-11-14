<?php
  header('Access-Control-Allow-Origin: *');
  require_once('config.php');
  require_once('functions.php');

  if(isset($_GET['secret'])) {
    if($_GET['secret'] == $secret) {
      // db_connect();
      //
      // db_close();
      $json_data = $_POST['json_data'];

      $response = $json_data;
    } else {
      $response = "ERROR_INVALID";
    }
  } else {
    $response = "ERROR_MISSING";
  }

  header('Content-Type: application/json; charset=utf-8');
  echo json_encode($response);
?>
