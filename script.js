const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');


//quote generator API
async function randomQuote() {
    const response = await fetch('https://api.quotable.io/random')
    const data = await response.json()
    const words = [`${data.content}`][0];
    let randomSentence;
    randomSentence = words;
    word.innerHTML = randomSentence;

    //Update score
    function updateScore() {
        //score increments by 1
        score++;
        scoreEl.innerHTML = score;

        if (score===10) {
            gameWon();
    }
    }

    function gameWon() {

    endgameEl.innerHTML = `
   <h2 style="color:yellow;">You Win!</h2>`;
   endgameEl.style.display = 'flex';
   setTimeout(location.reload.bind(location), 6000);
    }

//event listener for typing input box
text.addEventListener('input', e => {
    const insertedText = e.target.value;
        //inserted text is equal to the sentence
    if(insertedText===randomSentence) {
        randomQuote();
        updateScore();

        //refreshes input value cleared
        e.target.value = '';
        
        if (difficulty === 'hard') {
            time +=6;
        } else if (difficulty === 'medium') {
            time +=12;
        } else {
            time +=18;
        }

        updateTime();
    }
});
  }
  randomQuote();


  // init score
  let score = 0;
  //init time
  let time = 60; 

//ternary operator
//set difficulty to value in ls or medium
//sets to whatever variable is there, unless its null
// if else it will set to medium
  let difficulty = localStorage.getItem('difficulty') !== null
  ? localStorage.getItem('difficulty') : 'medium';


//set difficulty select value
difficultySelect.value =
localStorage.getItem('difficulty') !== null
? localStorage.getItem('difficulty') : 'medium';

  //Focus on text input on start
  text.focus();

  //Start counting down
  const timeInterval = setInterval(updateTime, 1000);

  //Update Time
  function updateTime() {
      //time counts down
      time--;
      timeEl.innerHTML = time + 's';

      //if time is = 0 game is over, no negatives
      if (time===0) {
          clearInterval(timeInterval);
          //end game
          gameOver();
      }
  }

  //Reset Button
  function resetButton() {
    window.location.reload("Refresh")
  }

  //Game over, shows end screen
  function gameOver() {
     endgameEl.innerHTML = `
  <h2 style="color:red;">Game Over! &nbsp </h2>
  <p>Your final score is <strong> ${score}pts </strong></p>`;

    endgameEl.style.display = 'flex';
    setTimeout(location.reload.bind(location), 6000);
  }

  //Settings btn click
  settingsBtn.addEventListener('click', () =>
  //toggles hide class
  settings.classList.toggle('hide'));

  //settings select
  //going to take settings form and add event listener,listening for change
  settingsForm.addEventListener('change', e=> {
    difficulty = e.target.value;
    localStorage.setItem('difficulty', difficulty);
  });


  //highlight text
text.addEventListener('input', (event) => {
    const searchText = event.target.value;
// no g or i modifiers in the '' space so it will capture first instance
    const regex = new RegExp(searchText, '');

let userInput = word.innerHTML;
userInput = userInput.replace(/(<mark class="highlight">|<\/mark>)/gim,
 '');

const newuserInput = userInput.replace(regex, '<mark class="highlight">$&</mark>');
word.innerHTML = newuserInput;

});