function Quiz (aQuiz)
{
  this.clear();
  if (aQuiz) {
    this.name = aQuiz.name;
    this.data = aQuiz.data.slice();
  }
}

Quiz.prototype.clear = function ()
{
  this.name = "";
  this.data = [];
  this.activeQuestionIndex = -1;
  this.answers = 0;
  this.correctAnswers = 0;
}

Quiz.prototype.setName = function (aName)
{
  this.name = aName;
}

Quiz.prototype.addQuestion = function (aQuestion, aAnswer)
{
  this.data.push({question: aQuestion, answer: aAnswer});
}

Quiz.prototype.getActiveQuestion = function ()
{
  return this.data[this.activeQuestionIndex];
}

Quiz.prototype.randomQuestion = function ()
{
  this.activeQuestionIndex = Math.floor((Math.random() * gQuiz.data.length));
  return this.getActiveQuestion();
}

Quiz.prototype.deleteActiveQuestion = function ()
{
  this.data.splice(this.activeQuestionIndex, 1);
}

Quiz.prototype.checkAnswer = function (aAnswer)
{
  this.answers++;
  if (this.getActiveQuestion().answer == aAnswer) {
    this.correctAnswers++;
    return true;    
  } else
    return false;
}