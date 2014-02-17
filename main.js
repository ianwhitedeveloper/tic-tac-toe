
// Using NaN instead of null is a clever hack. See checkForWinner for details.
var spaces = [
  NaN, NaN, NaN,
  NaN, NaN, NaN,
  NaN, NaN, NaN
];

var player1 = 'veggies';
var player2 = 'junkfood';
var currentPlayer = null;
var game_over = false
var gamesWon_veggies = 0
var gamesWon_junkfood = 0

var setNextTurn = function () {
  if (currentPlayer === player1) {
    currentPlayer = player2;
  }
  else {
    currentPlayer = player1;
  }
  $('#turn-label').text(currentPlayer);
};

var checkForWinner = function () {
  // Because (NaN === NaN) is always false, we can safely assume
  // that if three spaces in a row are the same, all three spaces are
  // marked by a player, and not all empty.

  if ( spaces[0] === spaces[1] && spaces[1] === spaces[2]
    || spaces[3] === spaces[4] && spaces[4] === spaces[5]
    || spaces[6] === spaces[7] && spaces[7] === spaces[8]
    // left, middle, and right column wins
    || spaces[0] === spaces[3] && spaces[3] === spaces[6]
    || spaces[1] === spaces[4] && spaces[4] === spaces[7]
    || spaces[2] === spaces[5] && spaces[5] === spaces[8]
    // diagonal left and right wins
    || spaces[0] === spaces[4] && spaces[4] === spaces[8]
    || spaces[2] === spaces[4] && spaces[4] === spaces[6]
  )
  {
    console.log('somebody won');
    // TODO: Trigger 'game-win' event with the winning player as the event data
    $(document).trigger('game-win', currentPlayer);
    game_over = true
    if (game_over === true) {
      alert("GAME OVER");
      if (currentPlayer === player1) {
        gamesWon_veggies += 1
        $('#veggies-wins').text(currentPlayer + " has won " + gamesWon_veggies + " games.");
      } else if (currentPlayer === player2) {
        gamesWon_junkfood += 1
        $('#junkfood-wins').text(currentPlayer + " has won " + gamesWon_junkfood + " games.");
      };
    };
  }
};

$(document).on('click', '#board .space', function (e) {
  if (game_over === false) {
    var spaceNum = $(e.currentTarget).index();
    console.log('You clicked on space #' + spaceNum);

    // Marks the space with the current player's name
    // TODO: Don't mark it unless the space is blank
    if (spaces[spaceNum] != spaces[spaceNum]) {
      spaces[spaceNum] = currentPlayer;
      // Adds a class to elem so css can take care of the visuals
      $('#board .space:eq(' + spaceNum + ')').addClass(currentPlayer);

      checkForWinner();
      setNextTurn();
    } else {
      alert("Taken");
    }
  };
});

$('#submit-newgame').on('click', function (e) {
    $('#board .space').removeClass("veggies junkfood");

    game_over = false;
    player1 = 'veggies';
    player2 = 'junkfood';
    currentPlayer = null;
    spaces = [
      NaN, NaN, NaN,
      NaN, NaN, NaN,
      NaN, NaN, NaN
    ];

      setNextTurn();
  });

$(document).on('game-win', function (e, winner) {
  // TODO: Alert who won the game
  alert(winner + " is the winner!");
});

// Start the game
setNextTurn();
