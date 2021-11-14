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
    var jqxhr = $.getJSON("http://localhost/questions-admin-scripts/get_questions.php?secret=demo", function(data) {
      console.log(data);
      var validated = true;

      if(data === "ERROR_MISSING") {
        alert("Missing password in your request.");
        validated = false;
      }

      if(data === "ERROR_INVALID") {
        alert("Invalid password.");
        validated = false;
      }

      if(validated) {
        var questions = data;
        for (item in questions) {
          console.log(questions[item]);
          var question = questions[item];
          var text = question[0];
          var correct = question[1];
          var incorrect_1 = question[2];
          var incorrect_2 = question[3];
          var incorrect_3 = question[4];
          $("div.questions-list").append("<h5>" + text + "</h5>")
          $("div.questions-list").append("<p> Corect: " + correct + "</p>")
          $("div.questions-list").append("<p> Incorect 1: " + incorrect_1 + "</p>")
          $("div.questions-list").append("<p> Incorect 2: " + incorrect_2 + "</p>")
          $("div.questions-list").append("<p> Incorect 3: " + incorrect_3 + "</p>")
        }
      }
    })
    .fail(function() {
      alert("Error on trying to get the questions.");
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
