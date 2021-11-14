$(document).ready(function() {
  window.password = "placeholder";
  window.get_questions_url = "http://localhost/questions-admin-scripts/get_questions.php?secret=" + window.password;
  window.add_question_url = "http://localhost/questions-admin-scripts/add_question.php?secret=" + window.password;

  function get_form_data() {
    // Get the data from form submission
    var question_text = $("input#input-question").val();
    var correct_answer = $("input#input-correct-answer").val();
    var incorrect_answer_1 = $("input#input-incorrect-answer-1").val();
    var incorrect_answer_2 = $("input#input-incorrect-answer-2").val();
    var incorrect_answer_3 = $("input#input-incorrect-answer-3").val();
    var source = $("input#input-source").val();
    var password = $("input#input-password").val();

    return {
      'password': password,
      'question_text': question_text,
      'correct_answer': correct_answer,
      'incorrect_answer_1': incorrect_answer_1,
      'incorrect_answer_2': incorrect_answer_2,
      'incorrect_answer_3': incorrect_answer_3,
      'source': source
    }
  }

  function update_questions_list() {
    var jqxhr = $.getJSON(window.get_questions_url, function(data) {
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
        $("div.questions-list").html("");
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
  }

  $("input#input-password").change(function() {
    window.password = $("input#input-password").val();
    window.get_questions_url = "http://localhost/questions-admin-scripts/get_questions.php?secret=" + window.password;
    window.add_question_url = "http://localhost/questions-admin-scripts/add_question.php?secret=" + window.password;
  });

  $("button#show-questions").on("click", function() {
    update_questions_list();
  });

  $("#questions-form").submit(function(event) {
    // On form submit (add question)
    var form_data = get_form_data(); // Get the data as submitted by user
    var json_data = JSON.stringify(form_data); // Convert to JSON

    console.log(json_data);

    var jqxhr = $.post(window.add_question_url, {'json_data': json_data})
    .done(function(data) {
      if(data === "ERROR_MISSING") {
        alert("Missing password in your request.");
        validated = false;
      }

      if(data === "ERROR_INVALID") {
        alert("Invalid password.");
        validated = false;
      }

      if(data === "SUCCESS") {
        alert("Yey. Thank you for your question.");
      }
    })
    .fail(function() {
      alert("Error on adding new question.");
    });

    event.preventDefault();
  });

  // On page load
  init();
});
