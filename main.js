var game_over = false;
var score = 0;
var game_array = [
  [0, 2, 0, 2],
  [0, 4, 16, 0],
  [32, 32, 16, 0],
  [0, 4, 4, 0],
];

document.addEventListener("keydown", (e) => {
  if (e.key == "ArrowUp") {
    GenerateNewNumber();
    console.log("Up Key");
    console.table(game_array);
  }

  if (e.key == "ArrowDown") {
    GenerateNewNumber();
    console.log("Down Key");
    console.table(game_array);
  }

  if (e.key == "ArrowLeft") {
    ArrowLeft();
    GenerateNewNumber();
    console.log("Left Key");
    console.table(game_array);
  }

  if (e.key == "ArrowRight") {
    ArrowRight();
    GenerateNewNumber();
    console.log("Right Key");
    console.table(game_array);
  }
});

function ArrowRight() {
  for (var i = 0; i < game_array.length; i++) {
    var row = game_array[i];

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

    game_array[i] = row;
  }
}

function ArrowLeft() {
  for (var i = 0; i < game_array.length; i++) {
    var row = game_array[i];

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

    game_array[i] = row;
  }
}

function CheckGameOver() {
  //Has to determine if 2d array is solvable
  //Check if 2d array contains a 0 zero value
  //If there is no zero value, game is over
}

function GenerateNewNumber() {
  //For each row in game_array
  //Collect indices where the row has 0 values
  //Randomly select a row number and index from that row
  //Generate a 2 (90% chance) or a 4 (10% chance) at that index
}

function UpdateScore() {}

function UpdateGridElements() {}
