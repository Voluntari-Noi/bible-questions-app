<?php
  header("cache-control: no-cache, no-store, must-revalidate");
  header('Access-Control-Allow-Origin: *');
  ini_set('display_errors', 1); // TODO remove later
  require_once('config.php');
  require_once('functions.php');

  if(isset($_GET['secret'])) {
    if($_GET['secret'] == $secret or $_GET['secret'] == $db_token) {
      db_connect();
      $sql ="SELECT * from questions ORDER BY id DESC";
      $result = $conn -> query($sql);
      db_close();

      $rows = [];
      while($r = mysqli_fetch_assoc($result)) {
        $rows[] = $r;
      }
      $response = $rows;
    } else {
      $response = "ERROR_INVALID";
    }
  } else {
    $response = "ERROR_MISSING";
  }

  header('Content-Type: application/json; charset=utf-8');
  echo json_encode($response);
?>
