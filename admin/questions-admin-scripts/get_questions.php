<?php
header("cache-control: no-cache, no-store, must-revalidate");
header('Access-Control-Allow-Origin: *');
ini_set('display_errors', 1); // TODO remove later
require_once('config.php');
require_once('functions.php');

$getQuestions = function () {
  global $conn, $seed;
  try {
    $errors = db_connect();
    if ($errors === true) {
      $exclude_sql = getExcludeIds();
      $sorting_sql = "ORDER BY id DESC";
      if (isset($_GET['limit']) && ($limit = intval($_GET['limit'])) > 0) {;
        $sorting_sql = "ORDER BY RAND() LIMIT $limit;";
      }
      $sql = "SELECT * from questions $exclude_sql $sorting_sql";
      $result = $conn->query($sql);
      db_close();
      if ($result !== false) {
        $rows = [];
        while ($r = mysqli_fetch_assoc($result)) {
          $rows[] = $r;
        }
        $response = array('status' => OK, 'next_token' => createToken($seed), 'response' => $rows);
      } else {
        $response = getResponse(QUERY_FAILED);
      }
    } else {
      $response = getResponse(QUERY_FAILED, $errors);
    }
  } catch (Exception $x) {
    $response = getResponse(SERVER_EXCEPTION, print_r($x, true));
  }
  return $response;
};

$response = validateRequest($getQuestions);
header('Content-Type: application/json; charset=utf-8');
echo json_encode($response);
