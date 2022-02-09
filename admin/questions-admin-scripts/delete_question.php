<?php
header('Access-Control-Allow-Origin: *');
require_once('config.php');
require_once('functions.php');

$deleteQuestion = function () {
  if (isset($_GET['id'])) {
    $question_id = $_GET['id'];
    $action = "";
    if ($question_id == "ALL") {
      $sql = "DELETE FROM questions";
      $action = 'DELETED_ALL';
    } else {
      $sql = "DELETE FROM questions WHERE id='$question_id'";
      $action = 'DELETED_ONE';
    }
    $response = executeQuery($sql, $action);
  } else {
    $response = getResponse(INVALID_PARAMS, "Missing question id");
  }
  return $response;
};

$response = validateRequest($deleteQuestion, true);
header('Content-Type: application/json; charset=utf-8');
echo json_encode($response);
