/**
 * @author Michael
 */

var ticTacToeGame = (function() {

  var X = 'X',
      O = 'O',
      blankCell = ' ';


  var currentPlayer = X,
      moves = 0,
      board = [ blankCell, blankCell, blankCell, blankCell, blankCell, 
                blankCell, blankCell, blankCell, blankCell ];

  var displayMessage = function( message ) {
    $( '.textMessage' ).html( message );
  };

  var switchPlayer = function() { 
	currentPlayer =  currentPlayer === X  ? O : X;
    displayMessage( 'Current Player: ' + currentPlayer );
  };

  var isValidMove = function( index ) {
    if ( board[ index ] === blankCell ) {
      return true;
    } else {
      displayMessage( 'Select a blank board position' );
      return false;
    }
  };

  var makeMove = function( $square, index ) {
    board[ index ] = currentPlayer;
    $square.html( currentPlayer );
    moves++;
  };

 
  var gameOver = function() {
    var winCombinations = [ [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], 
                            [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6] ],
        winIndex = -1;
    $.each( winCombinations, function( index, winCombination ) {
      if( allEqual( winCombination ) ){
        winIndex = index;
        return false;
      }
    });
    if( winIndex !== -1 ) {
      return winCombinations[ winIndex ];
    } else if ( moves === 9 ) {
      return true; // Draw
    } else {
      return false;
    }
  };

  // Check if the board pieces at 3 board indexes are the same (that is, 
  // if they are all X or all O)
  var allEqual = function( indexes ) {
    return ( board[ indexes[0] ] === board[ indexes[1] ] ) &&
           ( board[ indexes[0] ] === board[ indexes[2] ] ) &&
           ( board[ indexes[0] ] !== blankCell );
  };

  
  var endGame = function( endFormation ) {
    var endMessage;

    if( $.isArray(endFormation) ){
      endMessage = 'Game Over.  Player ' + currentPlayer + ' Wins';
      showWinFormation( endFormation );
    } else {
      endMessage = 'Game Over.  Draw Game';
    }
    $( '.textMessage' ).addClass( 'endTextMessage' );
    displayMessage( endMessage );

    
    $('.gameCell').off('click');
    $( '.play-again-btn' ).show().on( 'click', function() {
        location.reload();
    });

  };

  
  var showWinFormation = function( formation ) {
    $.each( formation, function( index, winPosition ) {
      $( '.square' ).eq( winPosition ).addClass(' winning-cell ');
    });
  };

  // Main controller to run the game
  var play = function( $square ) {
    var index = +$square.attr( 'id' );

    if( isValidMove( index ) ){
      makeMove( $square, index );
      var winningFormation = gameOver();

      ( winningFormation ) ? endGame( winningFormation ) : switchPlayer();
    }
  };

  return { play: play };

})();

$( document ).ready( function() {
  $( '.gameCell' ).on( 'click', '.square', function() {
    ticTacToeGame.play( $(this) );
  });
});