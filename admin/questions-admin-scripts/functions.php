<?php
function db_connect()
{
  global $db_user;
  global $db_password;
  global $db_name;
  global $conn;

  $conn = mysqli_connect("localhost", $db_user, $db_password, $db_name);
  ob_clean();
  if (!$conn) {
    return 'Could not connect: ' . mysqli_connect_error();
  }

  if (!mysqli_select_db($conn, $db_name))
    return 'Error: ' . mysqli_error($conn);
  return true;
}

function db_close()
{
  global $conn;
  mysqli_close($conn);
}
$seed = "intrebari_biblice";
function createToken($seed, $i = 0)
{
  $timestamp = time();
  $q = -3;
  //The epoch time stamp is truncated by $q chars, 
  //making the algorthim to change evry 1000 seconds
  //using q=-4; will give 10000 seconds= 2 hours 46 minutes usable time

  $TimeReduced = substr($timestamp, 0, $q) - $i;

  //the $seed is a constant string added to the string before hashing.    
  $string = $seed . $TimeReduced;
  $hash = hash('sha1', $string, false);
  return  $hash;
}
function checkToken($token, $seed)
{
  //Note that the previous nonce is also checked giving  between 
  // useful interval $t: 1*$qInterval < $t < 2* $qInterval where qInterval is the time deterimined by $q: 
  //$q=-2: 100 seconds, $q=-3 1000 seconds, $q=-4 10000 seconds, etc.
  return ($token == createToken($seed, 0) || $token == createToken($seed, 1));
}
function getResponse($status, $error_message = null, $response = null)
{
  if ($status == OK) {
    return array('status' => $status, 'response' => $response);
  }
  global $default_errors, $conn;
  if ($error_message == null) {
    $error_message = $default_errors[$status];
    if ($status == QUERY_FAILED) {
      $error_message = mysqli_error($conn);
    }
  }
  return array('status' => $status, 'error' => $error_message);
}
function validateRequest($callback, $requireAdmin = false)
{
  global $admin_password, $seed;
  if (!isset($_GET['token']))
    return getResponse(MISSING_TOKEN);
  if (!checkToken($_GET['token'], $seed))
    return getResponse(INVALID_TOKEN);
  if ($requireAdmin) {
    if (!isset($_GET['admin']))
      return getResponse(MISSING_PASSWORD);
    if ($_GET['admin'] != $admin_password)
      return getResponse(WRONG_PASSWORD);
  }
  return $callback();
}
function executeQuery($sql, $success_message)
{
  global $conn;
  if (($errors = db_connect()) !== true)
    return getResponse(QUERY_FAILED, $errors);

  if ($conn->query($sql) !== FALSE)
    $response = getResponse(OK, null, $success_message);
  else
    $response = getResponse(QUERY_FAILED);

  db_close();
  return $response;
}
function getExcludeIds()
{
  $exclude_sql = "";
  if (isset($_GET['exclude_ids'])) {
    $filterFunction = function ($val) {
      return $val > 0;
    };
    $integerIDs = array_filter(array_map('intval', explode(',', $_GET['exclude_ids'])), $filterFunction);
    if (count($integerIDs) > 0) {
      $exclude_sql = " WHERE id not in (" . implode(",", $integerIDs) . ")";
    }
  }
  return $exclude_sql;
}
