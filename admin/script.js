$(document).ready(function() {
  function get_form_data() {
    // Get the data from form submission
    var question_text = $("input#input-question").val();
    var correct_answer = $("input#input-correct-answer").val();
    var incorrect_answer_1 = $("input#input-incorrect-answer-1").val();
    var incorrect_answer_2 = $("input#input-incorrect-answer-2").val();
    var incorrect_answer_3 = $("input#input-incorrect-answer-3").val();
    var password = $("input#input-password").val();

    return {
      'password': password,
      'question_text': question_text,
      'correct_answer': correct_answer,
      'incorrect_answer_1': incorrect_answer_1,
      'incorrect_answer_2': incorrect_answer_2,
      'incorrect_answer_3': incorrect_answer_3
    }
  }

  function update_questions_list() {
    var jqxhr = $.getJSON("http://localhost/questions-admin-scripts/get_questions.php", function() {
      console.log( "success" );
    })
    .done(function() {
      console.log( "second success" );
    })
    .fail(function() {
      console.log( "error" );
    })
    .always(function() {
      console.log( "complete" );
    });
  }

  function init() {
    $("div.questions-list").append("<p>Lista de întrebări</p>");
    update_questions_list();
  }

  $("#questions-form" ).submit(function(event) {
    // On form submit
    var form_data = get_form_data(); // Get the data as submitted by user
    var json_data = JSON.stringify(form_data); // Convert to JSON

    console.log(json_data);

    event.preventDefault();
  });

  // On page load
  init();
});
