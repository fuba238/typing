const from_data = [
  "demonssoul",
  "darksoul",
  "bloodborne",
  "sekiro",
  "eldenring"
]

const nintendo_data = [
  "supermario",
  "pokemon",
  "metroid",
  "ringfitadventure",
  "kirby"
]

const blizzard_data = [
  "overwatch",
  "hearthstone",
  "diablo",
  "worldofwarcraft",
  "starcraft"
]

const data = [];

const questions = [];

const question = document.querySelector('.question');
const counter = document.querySelector('.counter');
const space = document.querySelector('.space');

document.querySelectorAll('.game_data').forEach((data) => {
  data.addEventListener('click', () => {
    if( data.textContent === "FROM SOFTWARE" ) {
      data = from_data;
      alert('FROM SOFTWAREに変更しました');
    }
    else if( data.textContent === "NINTENDO" ) {
      data = nintendo_data;
      alert('NINTENDOに変更しました');
    }
    else if( data.textContent === "BLIZZARD" ){
      data = blizzard_data;
      alert('BLIZZARDに変更しました');
    }
    data_set(data);
  })
})



function data_set(arr) {
  for( let i = 0; i < arr.length; i++ ) {
    questions[i] = arr[i];
  }
}

let game_data = 0;
let num = 0;
let clear_count = 0;
let start_time;
let finish_time;
document.addEventListener("keydown", keyDown);
function keyDown(e){
  if( game_data === 0 ){
    if( space.textContent === "[START]PRESS SPACE" ){
      if( e.key === " " ){
        space.textContent = "";
        num = questions.length;
        countdown();
      }
    }
  }
  else if( game_data === 1 ){
    if( e.key === question.textContent.slice(0,1) ){
      space.textContent = "good";
      question.textContent = question.textContent.slice(1);
      if( question.textContent === "" ){
        question.textContent = questions[Math.floor(Math.random() * questions.length)];
        counter.textContent = questions.length + "/" + num;
        questions.splice(questions.indexOf(question.textContent),1);
        space.textContent = "";
        if( counter.textContent === "0/5" ){
          counter.textContent = "Congratulation!!";
          space.textContent = "[RESET]PRESS ENTER";
          game_data = 2;
          finish_time = Date.now();
        }
      }
    }
    else{
      space.textContent = "bad";
    } 
  }
  else if( game_data === 2 ){
    if( e.key === "Enter" ){
      game_data = 0;
      clear_count += 1;
      counter.textContent = "CLEAR COUNTER:" + clear_count;
      question.textContent = "CLEAR TIME:" + String((finish_time - start_time)/1000);
      space.textContent = "[START]PRESS SPACE"
      return;
    }
  }
}

/* カウントダウン開始 */
function countdown(){
  const totalTime = 4000;
  const oldTime = Date.now();
  const timerId = setInterval(() => {
    const currentTime = Date.now();

    const diff = currentTime - oldTime;

    const remainMSec = totalTime - diff;
    const remainSec = Math.ceil(remainMSec / 1000);

    let label = `${remainSec}`;

    if (remainMSec <= 0) {
      clearInterval(timerId);
      label = ""
      gameStart(questions);
    }
    space.textContent = label;
  }, 1000);
}

/* カウントダウン終了後 */
function gameStart(data){
  start_time = Date.now();
  question.textContent = questions[Math.floor(Math.random() * 5)];  
  counter.textContent = questions.length + "/" + num;
  questions.splice(questions.indexOf(question.textContent),1);
  game_data = 1;
}