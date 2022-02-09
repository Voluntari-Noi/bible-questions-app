$(document).ready(function() {
    $("button.delete.all").hide(); // It exists, it works, but shhhh.
    var baseUrl = "http://localhost/questions-admin-scripts";
    // baseUrl = "https://appboxstudios.com/software/intrebari-biblice/admin"
    baseUrl = "https://pentrucer.net/aplicatii/intrebari-biblice/admin"
    $.ajaxSetup({ cache: false });
    window.password = "placeholder";
    window.get_questions_url = baseUrl + "/get_questions.php?token=" + token + "&admin=" + window.password;
    window.add_question_url = baseUrl + "/add_question.php?token=" + token + "&admin=" + window.password;
    window.delete_question_url = baseUrl + "/delete_question.php?token=" + token + "&admin=" + window.password;

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
            token: token,
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
                if (data.status == 0) {
                    $("div.questions-list").html("");
                    var questions = data.response;
                    token = data.next_token;
                    for (var item = 0; item < questions.length; item++) {
                        console.log(questions[item]);
                        var question = questions[item];
                        var question_id = question['id'];
                        var text = question['question_text'];
                        var correct = question['correct_answer'];
                        var incorrect_1 = question['incorrect_answer_1'];
                        var incorrect_2 = question['incorrect_answer_2'];
                        var incorrect_3 = question['incorrect_answer_3'];
                        var source = question['source'];
                        $("div.questions-list").append("<h5>[ID " + question_id + "] " + text + "</h5>");
                        $("div.questions-list").append("<p> Corect: " + correct + "</p>");
                        $("div.questions-list").append("<p> Incorect 1: " + incorrect_1 + "</p>");
                        $("div.questions-list").append("<p> Incorect 2: " + incorrect_2 + "</p>");
                        $("div.questions-list").append("<p> Incorect 3: " + incorrect_3 + "</p>");
                        $("div.questions-list").append("<p> Referința: " + source + "</p>");
                        $("div.questions-list").append("<button class='delete btn btn-sm btn-warning mb-5' data-id='" + question_id + "'>Șterge întrebare [ID " + question_id + "]</button>");
                    }
                }
            })
            .fail(function() {
                alert("Eroare la deschiderea întrebărilor.");
            })
            .always(function() {
                console.log("complete");
            });
    }

    $("input#input-password").change(function() {
        window.password = $("input#input-password").val();
        window.get_questions_url = baseUrl + "/get_questions.php?token=" + token + "&admin=" + window.password;
        window.add_question_url = baseUrl + "/add_question.php?token=" + token + "&admin=" + window.password;
        window.delete_question_url = baseUrl + "/delete_question.php?token=" + token + "&admin=" + window.password;
    });

    $("button#show-questions").on("click", function() {
        update_questions_list();
    });

    $(document).on('click', 'button.delete', function() {
        // DELETE question
        var question_id = $(this).attr("data-id");
        console.log(question_id);
        var suffix = "&id=" + question_id;
        var url = window.delete_question_url + suffix;

        var jqxhr = $.getJSON(url, function(data) {
                console.log(data);
                if (data.status === 0) {
                    if (data.response === "DELETED_ONE") {
                        console.log("Întrebare ștearsă cu succes.");
                        update_questions_list();
                    } else if (data.response === "DELETED_ALL") {
                        console.log("Întrebările au fost șterse.");
                        update_questions_list();
                    }
                } else {
                    console.error(data);
                    if (data.status === 21) {
                        alert("Lipsește parola din link. Problemă de configurare.");
                    } else if (data.status === 22) {
                        alert("Parolă greșită. Mai încearcă.");
                    } else
                        alert("Eroare când am încercat să șterg.");
                }
            })
            .fail(function() {
                alert("Eroare când am încercat să șterg.");
            })
    });

    $("#questions-form").submit(function(event) {
        // On form submit (add question)
        var form_data = get_form_data(); // Get the data as submitted by user
        var json_data = JSON.stringify(form_data); // Convert to JSON

        console.log(json_data);

        var jqxhr = $.post(window.add_question_url, { 'json_data': json_data })
            .done(function(data) {
                if (data.status === 0 && data.response === "Success") {
                    console.log("Mulțumiiiim.");
                    update_questions_list();
                } else {
                    console.error(data);
                    if (data.status === 21) {
                        alert("Lipsește parola din link. Problemă de configurare.");
                    } else if (data.status === 22) {
                        alert("Parolă greșită. Mai încearcă.");
                    } else
                        alert("N-am putut adăuga întrebarea.");
                }
            })
            .fail(function() {
                alert("N-am putut adăuga întrebarea.");
            });

        event.preventDefault();
    });
});