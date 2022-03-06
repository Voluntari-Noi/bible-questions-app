//var baseUrl = 'https://appboxstudios.com/software/intrebari-biblice/admin'
var baseUrl = 'https://pentrucer.net/aplicatii/intrebari-biblice/admin';
window.answered_ids = [];

$('document').ready(function() {
  window.current_question = 0;
  window.get_questions_url = baseUrl + '/get_questions.php?token=' + window.token;
  window.questions = [];

  function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  function get_questions_list_and_start() {
    var extra_args = '&limit=3&exclude_ids=' + encodeURI(window.answered_ids.join(','));
    var jqxhr = $.getJSON(
      window.get_questions_url + extra_args,
      function(data) {
        // console.log(data);
        if (data.status == 0) {
          $('div.questions-list').html('');
          window.token = data.next_token;
          window.questions = data.response;
          if (window.questions.length > 0) {
            next_question();
          }
        } else {
          if(data.status === 31) {
            $("div.row.row-board").html("<h2>Felicitări!</h2> <p>Ai parcurs toate întrebările.</p>");
          }
        }
      },
    )
    .fail(function(data) {
      var error = data.responseJSON.error;
      console.log('Eroare la deschiderea întrebărilor.', error);
    })
    .always(function(data) {
      console.log('complete');
    })
  }

  function next_question() {
    $('div.question').hide();
    $('div.spinner-border').show();
    $('.answer').hide();
    $("div.next-exercise button").hide();
    $('div.hint button').show();
    $('div.hint p').hide();
    $('.answer.show-correct').removeClass('show-correct');
    $('.answer.show-wrong').removeClass('show-wrong');
    $('.answer.active').removeClass('active');
    $('.answer.correct').removeClass('correct');

    // choose next question
    var question = window.questions[window.current_question];
    // console.log(
    //   'More questions?',
    //   window.questions.length,
    //   window.current_question,
    //   window.answered_ids.length,
    // );

    if (window.questions.length <= window.current_question) {
      window.current_question = 0;
      get_questions_list_and_start();
      return
    }

    window.current_question += 1;
    window.answered_ids.push(question.id);
    // console.log(question.id);
    $('p#question-text').text(question.question_text);

    var all_answers = [
      [1, question.correct_answer],
      [0, question.incorrect_answer_1],
      [0, question.incorrect_answer_2],
      [0, question.incorrect_answer_3]
    ];

    var rand_answers = shuffle(all_answers);

    $('a.answer_a').text(rand_answers[0][1]);
    $('a.answer_b').text(rand_answers[1][1]);
    $('a.answer_c').text(rand_answers[2][1]);
    $('a.answer_d').text(rand_answers[3][1]);
    $('p.text-hint').text("Referința biblică: " + question.source);

    if(rand_answers[0][0] === 1) {
      $('a.answer_a').addClass('correct');
    }

    if(rand_answers[1][0] === 1) {
      $('a.answer_b').addClass('correct');
    }

    if(rand_answers[2][0] === 1) {
      $('a.answer_c').addClass('correct');
    }

    if(rand_answers[3][0] === 1) {
      $('a.answer_d').addClass('correct');
    }

    $('.answer').show();
    $('div.spinner-border').hide();
    $('div.question').show();
  }

  $('.answer').on('click', function(evt) {
    $('div.hint button').hide();

    var selected_button = $('a.active');
    var is_correct = $(selected_button[0]).hasClass('correct');

    if (is_correct) {
      $(selected_button[0]).addClass('show-correct');
      $('div.hint p').show();
    } else {
      $(selected_button[0]).addClass('show-wrong');
      $(".answer.correct").addClass('show-correct');
      $('div.hint p').show();
    }
    $("div.next-exercise button").show();
  });

  $('div.hint button').on('click', function() {
    $('div.hint button').hide();
    $('div.hint p').show();
  });

  $("div.next-exercise button").on('click', function() {
    next_question();
  });

  $("button.btn-more").on('click', function() {
    $("div.row-footer").toggle();
  });

  function start_game() {
    get_questions_list_and_start();
  }

  start_game();
});
