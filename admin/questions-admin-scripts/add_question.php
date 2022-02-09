<?php
header('Access-Control-Allow-Origin: *');
require_once('config.php');
require_once('functions.php');

$addQuestions = function () {
  if (isset($_POST['json_data'])) {
    $json_data = json_decode($_POST['json_data'], true);
    $response = $json_data['source'];
    $question_text = $json_data['question_text'];
    $correct_answer = $json_data['correct_answer'];
    $incorrect_answer_1 = $json_data['incorrect_answer_1'];
    $incorrect_answer_2 = $json_data['incorrect_answer_2'];
    $incorrect_answer_3 = $json_data['incorrect_answer_3'];
    $source = $json_data['source'];
    $sql = "INSERT INTO questions (question_text, correct_answer, incorrect_answer_1, incorrect_answer_2, incorrect_answer_3, source) VALUES ('$question_text', '$correct_answer', '$incorrect_answer_1', '$incorrect_answer_2', '$incorrect_answer_3', '$source')";
    $response = executeQuery($sql, "Success");
  } else {
    $response = getResponse(INVALID_PARAMS);
  }
  return $response;
};

$response = validateRequest($addQuestions, true);
header('Content-Type: application/json; charset=utf-8');
echo json_encode($response);
