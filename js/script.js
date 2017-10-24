var gQuiz = null;

function loadCategoryList()
{
  for (var i = 0; i < gQuizData.length; i++)   
    $("#categoryList")
      .append($("<option></option>")
      .attr("value", i)
      .text(gQuizData[i].category)); 
    
    loadQuizList();
} 

function loadQuizList ()
{
  var lCategoryIndex = $("#categoryList").val();
  var lQuizData = gQuizData[lCategoryIndex].data;
  
  $("#quizList").empty();
  
  for (var i = 0; i < lQuizData.length; i++) {   
    $("#quizList")
      .append($("<option></option>")
      .attr("value", i)
      .text(lQuizData[i].name)); 
  };  
}

function startQuiz()
{
  var lCategoryIndex = $("#categoryList").val();
  var lCategory = gQuizData[lCategoryIndex];
  $("#questionPrefix").html(lCategory.questionFormat.prefix);
  $("#questionPostfix").html(lCategory.questionFormat.postfix);

  var lQuizIndex = $("#quizList").val();
  gQuiz = new Quiz(lCategory.data[lQuizIndex]);
  $("#titleContainer").html(gQuiz.name);
  $("#questionBox").show();
  $("#resultBox").show();

  randomQuestion();
}

function randomQuestion()
{
  var lQuestion = gQuiz.randomQuestion(); 
  $("#questionIndex").html(gQuiz.data.length);
  $("#questionQuestion").html(lQuestion.question.replace(/_/g, "<img src=\"images/pytajnik.gif\"/>"));
  $("#checkButton").show();
  $("#nextQuestionButton").hide();
  $("#questionAnswer").val("");
  $("#answersCount").html(gQuiz.answers);
  if (gQuiz.answers > 0)
    $("#correctAnswersCount").html(gQuiz.correctAnswers + "&nbsp;&nbsp;&nbsp;&nbsp;" + Math.round(gQuiz.correctAnswers / gQuiz.answers * 100) + "%");
  else
    $("#correctAnswersCount").html(gQuiz.correctAnswers);
  clearComment(); 
}

function checkAnswer()
{
  var lAnswer = $("#questionAnswer").val();
  $("#nextQuestionButton").show();
  $("#checkButton").hide();
  
  if (gQuiz.checkAnswer(lAnswer)) {
    $("#correctAnswer").show();
    gQuiz.deleteActiveQuestion();
  } else {
    $("#wrongAnswer").show();
    $("#correctAnswerTxt").html(gQuiz.getActiveQuestion().answer);
  }
  
  $("#answersCount").html(gQuiz.answers);
  if (gQuiz.answers > 0)
    $("#correctAnswersCount").html(gQuiz.correctAnswers + "&nbsp;&nbsp;&nbsp;&nbsp;" + Math.round(gQuiz.correctAnswers / gQuiz.answers * 100) + "%");
  else
    $("#correctAnswersCount").html(gQuiz.correctAnswers);

  if (gQuiz.data.length == 0) {
    $("#answersCount").html(0);
    $("#questionBox").hide();
   }  
}

function clearComment()
{
  $("#correctAnswer").hide();
  $("#wrongAnswer").hide();
}

function nextQuestion()
{
  randomQuestion();
}