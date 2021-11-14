<?php
  header('Access-Control-Allow-Origin: *');
  require_once('config.php');
  require_once('functions.php');

  if(isset($_GET['secret'])) {
    if($_GET['secret'] == $secret) {
      if(isset($_GET['id'])) {
        $question_id = $_GET['id'];
        if($question_id == "ALL") {
          $sql ="DELETE FROM questions";
          $response = "DELETED_ALL";
        } else {
          $sql ="DELETE FROM questions WHERE id='$question_id'";
          $response = "DELETED_ONE";
        }
        db_connect();
        $result = $conn -> query($sql);
        db_close();
      } else {
        $response = "ERROR_MISSING_ID";
      }
    } else {
      $response = "ERROR_INVALID";
    }
  } else {
    $response = "ERROR_MISSING";
  }

  header('Content-Type: application/json; charset=utf-8');
  echo json_encode($response);
?>
