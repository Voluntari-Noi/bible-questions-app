<?php
// TODO Replace with real values.
global $admin_password;
$admin_password = "demo";

global $db_name;
$db_name = "db_bible_questions";

global $db_user;
$db_user = "qadmin";

global $db_password;
$db_password = "strongPASSWORD#99";

global $db_token; // used only for GET //REPLACED BY createToken
$db_token = "vgXMHHTrOL"; // this is a real value used now for test version

global $conn;

define("OK", 0);
define("MISSING_TOKEN", 10);
define("INVALID_TOKEN", 11);
define("INVALID_PARAMS", 20);
define('MISSING_PASSWORD', 21);
define("WRONG_PASSWORD", 22);
define("QUERY_FAILED", 30);
define("SERVER_EXCEPTION", 99);
global $default_errors;
$default_errors = array(
  MISSING_TOKEN => "Missing token",
  INVALID_TOKEN => "Invalid Token",
  INVALID_PARAMS => "Invalid parameters",
  WRONG_PASSWORD => "Wrong password",
  MISSING_PASSWORD => "Missing password",
  QUERY_FAILED => "Query failed",
  SERVER_EXCEPTION => "Server exception"
);
