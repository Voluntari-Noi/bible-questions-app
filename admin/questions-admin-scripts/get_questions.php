<?php
  header('Access-Control-Allow-Origin: *');
  require_once('config.php');

  $questions  = [
    array("Q1", "AC1", "I11", "I21", "I31"),
    array("Q2", "AC2", "I21", "I22", "I32"),
    array("Q3", "AC3", "I31", "I23", "I33"),
    array("Q4", "AC4", "I41", "I24", "I34"),
    array("Q5", "AC5", "I51", "I25", "I35"),
  ];

  if(isset($_GET['secret'])) {
    if($_GET['secret'] == $secret) {
      $response = $questions;
    } else {
      $response = "ERROR_INVALID";
    }
  } else {
    $response = "ERROR_MISSING";
  }

  header('Content-Type: application/json; charset=utf-8');
  echo json_encode($response);
?>
