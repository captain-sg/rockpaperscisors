const score = {
  wins: 0,
  lose: 0,
  ties: 0,
};

let scores = ''
const key = "scoreObj"; // Define a key to identify the object

function saveToLocalStorage(core) {
  console.log("start of func");
  console.log(`core=${JSON.stringify(core)}`);

  const existingScore = JSON.parse(localStorage.getItem(key)); //returns a truthy or falsy val

  console.log(`exScr=${JSON.stringify(existingScore)}`);

  if (existingScore) {
    //...remove init data in localstorge

    if (
      core.wins > existingScore.wins ||
      core.lose > existingScore.lose ||
      core.ties > existingScore.ties
    ) {
      //...Update values in existing object
      existingScore.wins = core.wins;
      existingScore.lose = core.lose;
      existingScore.ties = core.ties;

      //...update localstorage as needed
      localStorage.setItem(key, JSON.stringify(existingScore));
    }

    console.log("localStorage" + localStorage.getItem(key));

    console.log("reached 1st if");
  } else {
    //...Create new object if it doesn't exist
    localStorage.setItem(key, JSON.stringify(core));

    console.log("reached 2nd if");
  }
  //...sets default
  scores = existingScore || core;
  console.log(scores);

  return scores;
}

// func to calc results, it takes a par
function plyrMove(playerMove) {
  console.log("start of on click");

  //...call compMove n save its retn val
  let computerMove = compMove();

  htmlResult = document.querySelector(".js-result");

  htmlScore = document.querySelector(".js-scores");

  // if block in func to compare comp and plyr move
  if (playerMove === "rock") {
    if (computerMove === "rock") {
      score.ties += 1;
      scores = saveToLocalStorage(score);
      htmlResult.innerHTML = "its a tie";
      htmlScore.innerHTML = JSON.stringify(scores);
    } else if (computerMove === "paper") {
      score.lose += 1;
      scores = saveToLocalStorage(score);
      htmlResult.innerHTML = "you lose";
      htmlScore.innerHTML = JSON.stringify(scores);
    } else {
      score.wins += 1;
      scores = saveToLocalStorage(score);
      htmlResult.innerHTML = "you won";
      htmlScore.innerHTML = JSON.stringify(scores);
    }
  } else if (playerMove === "paper") {
    if (computerMove === "rock") {
      score.wins += 1;
      scores = saveToLocalStorage(score);
      htmlResult.innerHTML = "you won";
      htmlScore.innerHTML = JSON.stringify(scores);
    } else if (computerMove === "paper") {
      score.ties += 1;
      scores = saveToLocalStorage(score);
      htmlResult.innerHTML = "its a tie";
      htmlScore.innerHTML = JSON.stringify(scores);
    } else {
      score.lose += 1;
      scores = saveToLocalStorage(score);
      htmlResult.innerHTML = "you lose";
      htmlScore.innerHTML = JSON.stringify(scores);
    }
  } else if (playerMove === "scissors") {
    if (computerMove === "rock") {
      score.lose += 1;
      scores = saveToLocalStorage(score);
      htmlResult.innerHTML = "you lose";
      htmlScore.innerHTML = JSON.stringify(scores);
    } else if (computerMove === "paper") {
      score.wins += 1;
      scores = saveToLocalStorage(score);
      htmlResult.innerHTML = "you won";
      htmlScore.innerHTML = JSON.stringify(scores);
    } else {
      score.ties += 1;
      scores = saveToLocalStorage(score);
      htmlResult.innerHTML = "its a tie";
      htmlScore.innerHTML = JSON.stringify(scores);
    }
  }

  // updates img src and rtrns templt string with img elem
  return `plyr = <img class="img" src="img/${playerMove}-emoji.png" alt="${playerMove}"> <img class="img" src="img/${computerMove}-emoji.png" alt="${compMove}"> = comp`;
}

//...updates scores element
function setOutput(move) {
  document.querySelector(".js-moves").innerHTML = move;
}

// a func to generate computer move
function compMove() {
  const randomNumber = Math.random();
  if (0 < randomNumber && randomNumber <= 1 / 3) {
    return "rock";
  } else if (1 / 3 < randomNumber && randomNumber <= 2 / 3) {
    return "paper";
  } else if (2 / 3 < randomNumber && randomNumber < 3 / 3) {
    return "scissors";
  }
}
