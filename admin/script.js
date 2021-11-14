$(document).ready(function() {
  $("div.questions-list").append("<p>Lista de întrebări</p>");

  $("#questions-form" ).submit(function(event) {
    var question_text = $("input#input-question").val();
    var correct_answer = $("input#input-correct-answer").val();
    var incorrect_answer_1 = $("input#input-incorrect-answer-1").val();
    var incorrect_answer_2 = $("input#input-incorrect-answer-2").val();
    var incorrect_answer_3 = $("input#input-incorrect-answer-3").val();
    var password = $("input#input-password").val();

    console.log(question_text, correct_answer, incorrect_answer_1, incorrect_answer_2, incorrect_answer_3, password);

    event.preventDefault();
  });
});
