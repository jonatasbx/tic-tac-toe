// Cria o Gameboard como IIFE

const Gameboard = (function () {
  const board = Array(9).fill("");

  const getBoard = () => board;

  const placeMark = (index, mark) => {
    if(board[index] === ""){
        board[index] = mark;
        return true;
    }else{
        return false
    }
  }
  return {getBoard, placeMark}
})();


// Cria a Player Factory
function createPlayer(name, mark){
  return {name, mark}
}

// Cria o Game Controller

const gameController = (function(){
  const players = [createPlayer("Jogador 1", "X"), createPlayer("Jogador 2", "O")];

  let activePlayer = players[0];

  function switchPlayer(){
  if(activePlayer === players[0]){
    activePlayer = players[1];
  }else{
    activePlayer = players[0];
  }
}

  function getActivePlayer(){
    return activePlayer
  }

  function playRound(index){
    if(Gameboard.placeMark(index, activePlayer.mark)=== true){
      switchPlayer()
    }else{
      console.log("A casa está ocupada");
    }
  }
  return {playRound, getActivePlayer}

})();
