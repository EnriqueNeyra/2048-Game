var game_over = false;
var score = 0;
var game_array = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];
GenerateNewNumber();
GenerateNewNumber();
UpdateBoardAndScore();

document.querySelector("button").addEventListener("click", () => {
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
});

document.addEventListener("keydown", (e) => {
  if (e.key == "ArrowUp") {
    ArrowUp();
    GenerateNewNumber();
    UpdateBoardAndScore();
    // console.log("Up Key");
    // console.log(`Score: ${score}`);
    // console.table(game_array);
  }

  if (e.key == "ArrowDown") {
    ArrowDown();
    GenerateNewNumber();
    UpdateBoardAndScore();
    // console.log("Down Key");
    // console.log(`Score: ${score}`);
    // console.table(game_array);
  }

  if (e.key == "ArrowLeft") {
    ArrowLeft();
    GenerateNewNumber();
    UpdateBoardAndScore();
    // console.log("Left Key");
    // console.log(`Score: ${score}`);
    // console.table(game_array);
  }

  if (e.key == "ArrowRight") {
    ArrowRight();
    GenerateNewNumber();
    UpdateBoardAndScore();
    // console.log("Right Key");
    // console.log(`Score: ${score}`);
    // console.table(game_array);
  }
});

function ArrowDown() {
  var temp_arr = game_array.slice();
  for (var i = 0; i < game_array.length; i++) {
    var new_row = new Array(4);
    for (var j = 0; j < game_array.length; j++) {
      new_row[j] = temp_arr[j][i];
    }

    // Move all non-zero tiles to the right
    var move_target = 3;
    for (var j = 3; j >= 0; j--) {
      if (new_row[j] != 0) {
        new_row[move_target] = new_row[j];
        if (j < move_target) {
          new_row[j] = 0;
        }
        move_target--;
      }
    }

    //Combine tiles of the same value if they are next to eachother
    for (var j = 3; j > 0; j--) {
      if (new_row[j] == new_row[j - 1]) {
        new_row[j] = new_row[j] * 2;
        score += new_row[j];
        new_row[j - 1] = 0;
      }
    }

    //Move all non-zero tiles to the right again
    move_target = 3;
    for (var j = 3; j >= 0; j--) {
      if (new_row[j] != 0) {
        new_row[move_target] = new_row[j];
        if (j < move_target) {
          new_row[j] = 0;
        }
        move_target--;
      }
    }

    game_array[i] = new_row;
  }

  transpose();
}

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

    game_array[i] = row;
  }
}

function ArrowUp() {
  var temp_arr = game_array.slice();
  for (var i = 0; i < game_array.length; i++) {
    var new_row = new Array(4);
    for (var j = 0; j < game_array.length; j++) {
      new_row[j] = temp_arr[j][i];
    }

    // Move all non-zero tiles to the left
    var move_target = 0;
    for (var j = 0; j <= 3; j++) {
      if (new_row[j] != 0) {
        new_row[move_target] = new_row[j];
        if (j > move_target) {
          new_row[j] = 0;
        }
        move_target++;
      }
    }

    //Combine tiles of the same value if they are next to eachother
    for (var j = 0; j < 3; j++) {
      if (new_row[j] == new_row[j + 1]) {
        new_row[j] = new_row[j] * 2;
        score += new_row[j];
        new_row[j + 1] = 0;
      }
    }

    //Move all non-zero tiles to the left again
    move_target = 0;
    for (var j = 0; j <= 3; j++) {
      if (new_row[j] != 0) {
        new_row[move_target] = new_row[j];
        if (j > move_target) {
          new_row[j] = 0;
        }
        move_target++;
      }
    }

    game_array[i] = new_row;
  }
  transpose();
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
      //elements[k].style.backgroundColor = rgba(255, 255, 255, 0.8);
      if (game_array[i][j] != 0) {
        el = game_array[i][j];
        //elements[k].style.backgroundColor = rgba(255 * Math.pow(el, 1/4), 255 * Math.pow(el, 1/4), 255, 0.8);
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
  var n = Math.random();
  var row_col = [];
  for (var i = 0; i < game_array.length; i++) {
    for (var j = 0; j < game_array.length; j++) {
      if (game_array[i][j] == 0) {
        row_col.push([i, j]);
      }
    }
  }

  var rand_2d_index = row_col[Math.floor(Math.random() * row_col.length)];
  var random_row_index = rand_2d_index[0];
  var random_col_index = rand_2d_index[1];

  if (n < 0.9) {
    game_array[random_row_index][random_col_index] = 2;
  } else {
    game_array[random_row_index][random_col_index] = 4;
  }
}

function CheckGameOver() {
  // create copy of game array
  //run each arrow key function against the copy
  //if 2d array is still full, then game is over
}

//function

// ?BLUEPRINT FOR SIMPLIFIED ARROW KEY FUNCTION?
// function AnyArrow() {
//   for (var i = 0; i < game_array.length; i++) {
//     var row = game_array[i];

//     // Remove all zeros
//     for (var j = 0; j < row.length; j++) {
//       if (row[j] == 0) {
//         row.splice(j, 1);
//       }
//     }

//     //Based on direction, combine numbers that are next to eachother
//     for (var j = 3; j > 0; j--) {
//       if (row[j] == row[j - 1]) {
//         row[j] = row[j] * 2;
//         score += row[j];
//         row[j - 1] = 0;
//       }
//     }

//     //Add back necessary zeros

//     game_array[i] = row;
//   }
// }
