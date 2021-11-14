<?php
  header('Access-Control-Allow-Origin: *');
  require_once('config.php');
  require_once('functions.php');

  if(isset($_GET['secret'])) {
    if($_GET['secret'] == $secret) {
      $json_data = json_decode($_POST['json_data'], true);

      $response = $json_data['source'];
      $question_text = $json_data['question_text'];
      $correct_answer = $json_data['correct_answer'];
      $incorrect_answer_1 = $json_data['incorrect_answer_1'];
      $incorrect_answer_2 = $json_data['incorrect_answer_2'];
      $incorrect_answer_3 = $json_data['incorrect_answer_3'];
      $source = $json_data['source'];

      db_connect();
      $sql ="INSERT INTO questions (question_text, correct_answer, incorrect_answer_1, incorrect_answer_2, incorrect_answer_3, source) VALUES ('$question_text', '$correct_answer', '$incorrect_answer_1', '$incorrect_answer_2', '$incorrect_answer_3', '$source')";
      $result = $conn -> query($sql);
      db_close();

      $response = "SUCCESS";
    } else {
      $response = "ERROR_INVALID";
    }
  } else {
    $response = "ERROR_MISSING";
  }

  header('Content-Type: application/json; charset=utf-8');
  echo json_encode($response);
?>
