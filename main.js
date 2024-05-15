// ------------------------------------------------------------              CONSTANTS                  ------------------------------------------------------------------------------

var game_over = false;
var score = 0;
var game_array;
gameOverString = `Game Over
Press New Game To Try Again`

// ------------------------------------------------------------              LIVE METHODS                   ------------------------------------------------------------------------------
// Starting Game At App Launch
window.onload = displayHighScore();
NewGame();

// New Game Button Control
document.querySelector("#new_game_button").addEventListener("click", NewGame);

// UI Button Controls
document.querySelector("#up-button").addEventListener("click", function(){
  var gameOverStatus = isGameOver(game_array);
  console.log(gameOverStatus)
  if (isGameOver(game_array)){
    window.alert(gameOverString);      
  }                                                 
  else{
    ArrowUp();
    GenerateNewNumber();
    UpdateBoardAndScore();
  }
});
document.querySelector("#down-button").addEventListener("click", function(){
  var gameOverStatus = isGameOver(game_array);
  console.log(gameOverStatus)
  if (isGameOver(game_array)){
    window.alert(gameOverString);
  }
  else{
    ArrowDown();
    GenerateNewNumber();
    UpdateBoardAndScore();
  }
});
document.querySelector("#left-button").addEventListener("click", function(){
  var gameOverStatus = isGameOver(game_array);
  console.log(gameOverStatus)
  if (isGameOver(game_array)){      
    window.alert(gameOverString);
  }
  else{
    ArrowLeft();
    GenerateNewNumber();
    UpdateBoardAndScore();
  }
});
document.querySelector("#right-button").addEventListener("click", function(){
  var gameOverStatus = isGameOver(game_array);
  console.log(gameOverStatus)
  if (isGameOver(game_array)){
    console.log(isGameOver(game_array))
    window.alert(gameOverString);
  }
  else{
    ArrowRight();
    GenerateNewNumber();
    UpdateBoardAndScore();
  }
});

// Keyboard Button Controls
document.addEventListener("keydown", (e) => {
  if (e.key == "ArrowUp") {
    var gameOverStatus = isGameOver(game_array);
    console.log(gameOverStatus)
    if (isGameOver(game_array)){
      window.alert(gameOverString);      
    }                                                 
    else{
      ArrowUp();
      GenerateNewNumber();
      UpdateBoardAndScore();
    }
  }

  if (e.key == "ArrowDown") {
    var gameOverStatus = isGameOver(game_array);
    console.log(gameOverStatus)
    if (isGameOver(game_array)){
      window.alert(gameOverString);
    }
    else{
      ArrowDown();
      GenerateNewNumber();
      UpdateBoardAndScore();
    }
  }

  if (e.key == "ArrowLeft") {
    var gameOverStatus = isGameOver(game_array);
    console.log(gameOverStatus)
    if (isGameOver(game_array)){      
      window.alert(gameOverString);
    }
    else{
      ArrowLeft();
      GenerateNewNumber();
      UpdateBoardAndScore();
    }
  }

  if (e.key == "ArrowRight") {
    var gameOverStatus = isGameOver(game_array);
    console.log(gameOverStatus)
    if (isGameOver(game_array)){
      console.log(isGameOver(game_array))
      window.alert(gameOverString);
    }
    else{
      ArrowRight();
      GenerateNewNumber();
      UpdateBoardAndScore();
    }
  }
});


// ------------------------------------------------------------              FUNCTIONS                   ------------------------------------------------------------------------------
function ArrowRight() {
  
  for (var i = 0; i < game_array.length; i++) {
    var row = game_array[i];
    MergeRowLeftToRight(row)

    game_array[i] = row;
  }
}

function ArrowDown() {
  var temp_arr = game_array.slice();
  for (var i = 0; i < game_array.length; i++) {
    var new_row = new Array(game_array.length);
    // Transposing columns to rows
    for (var j = 0; j < game_array.length; j++) {  
      new_row[j] = temp_arr[j][i];
    }

    MergeRowLeftToRight(new_row)

    game_array[i] = new_row;
  }
  transpose();
}

function ArrowUp() {
  var temp_arr = game_array.slice();
  for (var i = 0; i < game_array.length; i++) {
    var new_row = new Array(4);
    for (var j = 0; j < game_array.length; j++) {
      new_row[j] = temp_arr[j][i];
    }

    MergeRowRightToLeft(new_row)

    game_array[i] = new_row;
  }
  transpose();
}

function ArrowLeft() {
  for (var i = 0; i < game_array.length; i++) {
    var row = game_array[i];

    MergeRowRightToLeft(row)

    game_array[i] = row;
  }
}

function UpdateBoardAndScore() {
  document.querySelector(".score").innerHTML = "Score: " + score;
  var elements = document.getElementsByClassName("grid-item");
  var k = 0;

  for (var i = 0; i < game_array.length; i++) {
    for (var j = 0; j < game_array.length; j++) {
      elements[k].innerHTML = "";
      elements[k].style.backgroundColor = '#FAF9F6'
      if (game_array[i][j] != 0) {
        el = game_array[i][j];
        elements[k].style.backgroundColor = rgbToHex([255, Math.floor(255 / Math.pow(el, 1/4)), Math.floor(255 / Math.pow(el, 1/4))]);
        elements[k].innerHTML = el;
      }
      k++;
    }
  }
}

function transpose() {
  var temp_arr = game_array.slice();
  for (var i = 0; i < game_array.length; i++) {
    var new_row = new Array(4);
    for (var j = 0; j < game_array.length; j++) {
      new_row[j] = temp_arr[j][i];
    }
    game_array[i] = new_row;
  }
}

function GenerateNewNumber() {
  var n = Math.random(); // 0(inclusive) to 1(exclusive)
  var indexesOfZeros = []; 
  for (let row = 0; row < game_array.length; row++) {
    for (let col = 0; col < game_array.length; col++) {
      if (game_array[row][col] == 0) {
        indexesOfZeros.push([row, col]);
      }
    }
  }
  // for example if there's 6 0's in game array (indexOfZeros.length), and Math.random = 0.59... then you do Math.floor(6 *0.59...)  
  // or Math.Floor(3.54) which returns 3 since it rounds down. So randomZeroIndex would be 3, meaning the 3rd zero input that was found and saved in indexes of Zeros 
  // it is returned as [row,col] at that index                            
  var randomZeroIndex = indexesOfZeros[Math.floor(Math.random() * indexesOfZeros.length)]; 
  var random_row_ZeroIndex = randomZeroIndex[0]; 
  var random_col_ZeroIndex = randomZeroIndex[1];

  // this assigns the new # that is updated to game_array in that random 0 index
  if (n < 0.9) {
    game_array[random_row_ZeroIndex][random_col_ZeroIndex] = 2;
  } else {
    game_array[random_row_ZeroIndex][random_col_ZeroIndex] = 4;
  }
}

function NewGame() {
  game_array = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
  score = 0;
  GenerateNewNumber();
  GenerateNewNumber();
  UpdateBoardAndScore();
  // LogHighScore();
}

function rgbToHex(rgb_array) {
  var hex_code = "#";
  for (var num of rgb_array)
    {
      var hex_val = num.toString(16);
      hex_val.length == 1 ? "0" + hex_val : hex_val;
      hex_code += hex_val;
    }
  return hex_code;
}

function isGameOver(game_array) {
  // Check for empty cells
  for (let row = 0; row < game_array.length; row++) {
      for (let col = 0; col < game_array[row].length; col++) {
          if (game_array[row][col] === 0) {
              return false; // Game is not over, there's empty cells
          }
      }
  }

  // Check cells from left to right and up to down for matching neighbors
  for (let row = 0; row < game_array.length-1; row++) {
      for (let col = 0; col < game_array.length-1; col++) {
        currentCell = game_array[row][col];
        cellToTheRightOfCurrentCell = game_array[row][col + 1];
        cellUnderCurrentCell = game_array[row + 1][col];
       
          // Check cell to the right of the current cell 
          if (col < game_array[row].length - 1 && currentCell == cellToTheRightOfCurrentCell) {
              return false; // Game is not over, there is matching neighbor cell to the right of the current cell
          }
          // Check cell to the bottom of the current cell
          else if (row < game_array.length - 1 && currentCell == cellUnderCurrentCell) {
              return false; // Game is not over, there is a matching neighbor cell under the current cell
          }
      }
  }
  // If no empty cells or neighbor cells with the same value are found, the game is over
 var currentHighScore = getHighScore();
 if (score > currentHighScore){
  saveHighScore(score);
  displayHighScore();
 }
  return true;  
}

function MergeRowLeftToRight(row){
    // Move all non-zero tiles to the right
    var move_target = 3;
    for (var j = 3; j >= 0; j--) {
      if (row[j] != 0) {
        row[move_target] = row[j];
        if (j < move_target) {
          row[j] = 0;
        }
        move_target--;
      }
    }

    //Combine tiles of the same value if they are next to eachother
    for (var j = 3; j > 0; j--) {
      if (row[j] == row[j - 1]) {
        row[j] = row[j] * 2;
        score += row[j];
        row[j - 1] = 0;
      }
    }

    //Move all non-zero tiles to the right again
    move_target = 3;
    for (var j = 3; j >= 0; j--) {
      if (row[j] != 0) {
        row[move_target] = row[j];
        if (j < move_target) {
          row[j] = 0;
        }
        move_target--;
      }
    }
}

function MergeRowRightToLeft(row){
  // Move all non-zero tiles to the left
  var move_target = 0;
  for (var j = 0; j <= 3; j++) {
    if (row[j] != 0) {
      row[move_target] = row[j];
      if (j > move_target) {
        row[j] = 0;
      }
      move_target++;
    }
  }

  //Combine tiles of the same value if they are next to eachother
  for (var j = 0; j < 3; j++) {
    if (row[j] == row[j + 1]) {
      row[j] = row[j] * 2;
      score += row[j];
      row[j + 1] = 0;
    }
  }

  //Move all non-zero tiles to the left again
  move_target = 0;
  for (var j = 0; j <= 3; j++) {
    if (row[j] != 0) {
      row[move_target] = row[j];
      if (j > move_target) {
        row[j] = 0;
      }
      move_target++;
    }
  }
}

// Function to save the high score to local storage
function saveHighScore(score) {
  localStorage.setItem('highScore', score);
}

// Function to retrieve the high score from local storage
function getHighScore() {
  return localStorage.getItem('highScore');
}

// Display the high score on the page
function displayHighScore() {
  // Get the high score from local storage
  var highScore = getHighScore();

  // Get the element where you want to display the high score
  var highScoreDisplayElement = document.getElementById('high-score-display');

  // Update the content of the element with the high score
  highScoreDisplayElement.textContent = 'High Score: ' + highScore;
}