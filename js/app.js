/*--- Step 1 - Defining global variables ---*/
var questionsArray = [
    //Question 1
    {
        questionText: "What is Captain America's real name?",
        questionChoices: ["Steve Rogers", "Bruce Banner", "Bruce Wayne"],
        questionCorrectChoice: 0,
        questionImage: "CapAmerica.jpeg",
        questionImageCaption: "Captain America",
        correctDetails: "His real name is Steve Rogers. "
    },

    //Question 2
    {
        questionText: "What country does Doctor Doom Rule?",
        questionChoices: ["Russia", "Genosha", "Latveria"],
        questionCorrectChoice: 2,
        questionImage: "doctor_doom.gif",
        questionImageCaption: "Doctor Doom",
        correctDetails: "He is ruler of Latveria "
    },
    //Question 3
    {
        questionText: "What college does Peter Parker attend?",
        questionChoices: ["Empire State U", "NYU", "Harvard"],
        questionCorrectChoice: 0,
        questionImage: "spider-man.jpg",
        questionImageCaption: "Spider Man",
        correctDetails: "He attends Empire State University. "
    },
//Question 4
    {
        questionText: "Which 2 X-Men are brothers?",
        questionChoices: ["Nightcrawler and Wolverine", "Cyclops and Havok", "Colossus and Beast"],
        questionCorrectChoice: 1,
        questionImage: "x-men.jpeg",
        questionImageCaption: "X-Man",
        correctDetails: "Cyclops and Havok are Brother."
    },

//Question 5
    {
        questionText: "Who is the founder of the X-Men?",
        questionChoices: ["Magneto", "Reed Richards", "Charles Xavier"],
        questionCorrectChoice: 2,
        questionImage: "x-men.jpeg",
        questionImageCaption: "The X-Men",
        correctDetails: "Charles Xavier is founder of the X-men."
    },
//Question 6
    {
        questionText: "What is Luke Cage's real name?",
        questionChoices: ["Mark Johnson", "Carl Lucas", "Luke Patterson"],
        questionCorrectChoice: 1,
        questionImage: "Power-Man.jpg",
        questionImageCaption: "Power Man",
        correctDetails: "Carl Lucas is his real name."
    },

//Question 7
    {
        questionText: "What country does the Black Panther rule?",
        questionChoices: ["Nigeria", "Wakanda", "Ghana"],
        questionCorrectChoice: 1,
        questionImage: "Black-Panther.jpg",
        questionImageCaption: "Black Panther",
        correctDetails: "The Black Panther is ruler of Wakanda."
    },

//Question 8
    {
        questionText: "Who is the current Black Panther?",
        questionChoices: ["T'Challa", "Suri", "Azzari"],
        questionCorrectChoice: 0,
        questionImage: "Black-Panther.jpg",
        questionImageCaption: "Black Panther",
        correctDetails: "T'Challa is the current Black Panther."
    },

//Question 9
    {
        questionText: "What was Sam Wilson's job before becoming the Falcon/Capatain America?",
        questionChoices: ["Police Officer", "FireFighter", "Social Worker"],
        questionCorrectChoice: 2,
        questionImage: "Sam-Wilson-NewCapAmerica.png",
        questionImageCaption: "Sam Wilson:Captain America",
        correctDetails: "Sam Wilson was a Social Worker."
    },

//Question 10
    {
        questionText: "Who created Ultron?",
        questionChoices: ["Tony Stark", "Hank Pym", "Bruce Banner"],
        questionCorrectChoice: 1,
        questionImage: "Ultron.png",
        questionImageCaption: "Ultron",
        correctDetails: "Hank Pym created Ultron."
    }
];
var currentQuestionNumber = 0;
var totalNumberOfQuestion = questionsArray.length;
var totalNumberOfCorrectAnswers = 0;

/*--- Step 2 - Defining functions ---*/

function questionDisplay() {
    //1 - update the each question text
    $('.question-content').text(questionsArray[currentQuestionNumber].questionText);
    //update the each question image
    var questionImageHTMLOutput = '<img src="/images/' + questionsArray[currentQuestionNumber].questionImage + '" alt="">';
    questionImageHTMLOutput += '<div class="image-caption">' + questionsArray[currentQuestionNumber].questionImageCaption + '</div>';
    $('.image-wrapper').html(questionImageHTMLOutput);

    //2 - display the what are the choices for the current question
    //2.1 - first delete all the existing choices before populating it with new ones
    $('.answer-content').empty();
    //2.2 - the get the total number of choices for the current question
    var totalNumberOfChoices = questionsArray[currentQuestionNumber].questionChoices.length;
    //2.3 - loop through all the choices and append them to the choices container
    for (var i = 0; i < totalNumberOfChoices; i++) {
        //2.3.1 - loop thru the answer choices and create a dynamically generated row for each of them
        var buildEachChoiceHTML = "<input type='radio' class='option' name='option' value=" + i + ">" + questionsArray[currentQuestionNumber].questionChoices[i] + "<br>";
        //2.3.2 append that row to the choices container in html
        $('.answer-content').append(buildEachChoiceHTML);
    }

    //3 - displays the number of the current question
    $('.question-number-display').text("Question " + (currentQuestionNumber + 1) + " of " + totalNumberOfQuestion);
}

/*--- Step 3 - Use the functions ---*/
$(document).ready(function () {
    $('.results').hide();
    $('.questions').hide();
    $('.intro').show();

    $('.startQuiz').click(function () {
        $('.results').hide();
        $('.intro').hide();
        $('.questions').show();
        questionDisplay();
    });

    $('.questions').on('click', '.option', function () {
        //get the question answer from the user
        var userAnswer = $("input[class='option']:checked").val();
        //get the correct answer from the questionsArray above
        var correctAnswer = questionsArray[currentQuestionNumber].questionCorrectChoice;
        if (userAnswer == correctAnswer) {
            //if the answer was correct increment the total number of correct answers
            totalNumberOfCorrectAnswers++;
            //console.log(totalNumberOfCorrectAnswers);
        }
        $('#result_msg').append("<h3>Q: " + questionsArray[currentQuestionNumber].questionText + "</h3>");
        $('#result_msg').append("<h4>A: " + questionsArray[currentQuestionNumber].correctDetails + "</h4>");

        //if quiz is finished, show result-section
        if ((currentQuestionNumber + 1) == totalNumberOfQuestion) {

            //show the final score
            $('#finalScore').text(totalNumberOfCorrectAnswers + "/" + totalNumberOfQuestion);

            $('.intro').hide();
            $('.questions').hide();
            $('.results').show();
        }
        //else continue to next question
        else {
            //increment the current question number
            currentQuestionNumber++;
            //display the following question
            questionDisplay();
        }
    });
    $('#tryAgain').click(function () {
        $('.results').hide();
        $('.questions').hide();
        $('.intro').show();
        currentQuestionNumber = 0;
        totalNumberOfCorrectAnswers = 0;

    });
});
