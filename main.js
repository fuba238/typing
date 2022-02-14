const questions = [
  "demonssoul",
  "darksoul",
  "bloodborne",
  "sekiro",
  "eldenring"
]

const question = document.querySelector('.question');
const counter = document.querySelector('.counter');
const space = document.querySelector('.space');

let num = questions.length;
document.addEventListener("keydown", keyDown);
function keyDown(e){
  /*　開始時 */
  if( space.textContent === "[START]PRESS SPACE" ) {

    space.textContent = ""
    question.textContent = questions[Math.floor(Math.random() * 5)];
    counter.textContent = questions.length + "/" + num;
    questions.splice(questions.indexOf(question.textContent),1);
    /* ゲーム中 */
    if( space.textContent   ) {
      /* 問題文を打っている時 */
      if( question.textContent !== "" ) {
        /* 合っている時 */
        if( question.textContent.slice(0,1) === e.key ) {
          space.textContent = "good"
          question.textContent = question.textContent.slice(1);
          if( question.textContent === "" ) {
            if( questions.length !== 0 ) {
              question.textContent = questions[Math.floor(Math.random() * questions.length)];
              counter.textContent = questions.length + "/" + num;
              questions.splice(questions.indexOf(question.textContent),1);
              space.textContent = "";
            }
            else {
              counter.textContent = "Congratulation!!";
              space.textContent = "END";
            }
          }
        }
      }
      /* 間違えている時 */
      else {
      space.textContent = "bad"
      }
    }
  }
}
