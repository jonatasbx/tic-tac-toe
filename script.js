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

  const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],   // linhas
    [0, 3, 6], [1, 4, 7], [2, 5, 8],   // colunas
    [0, 4, 8], [2, 4, 6]               // diagonais
  ];

  let gameOver = false;

  function checkWinner(){
    let board = Gameboard.getBoard()
     return winningCombos.some(combo =>
    combo.every(index => board[index] === activePlayer.mark)
  );
  };

  function checkTie(){
    let board = Gameboard.getBoard()
    return board.every(cell=> cell !=="")
  }

  function playRound(index){
    if(gameOver){
      console.log("O jogo acabou");
      return
    };

    if(!Gameboard.placeMark(index, activePlayer.mark)){
      console.log("A casa está ocupada");
      return
    };

    if (checkWinner()){
      gameOver = true;
      console.log(`O vencedor é
        ${activePlayer.name}`)
      return
    };

    if(checkTie()){
      gameOver = true;
      console.log("Empatoooooou!")
      return
    };

    switchPlayer()
  }

  return {playRound, getActivePlayer}

})();

// Display Controller

const displayController = (function () {
  const boardDiv = document.querySelector("#board");

  const render = function(){
    boardDiv.textContent = "";
    Gameboard.getBoard().forEach(cell => {
      const cellDiv = document.createElement("div");
      cellDiv.classList.add("cell");
      cellDiv.textContent = cell;
      boardDiv.appendChild(cellDiv);
    });
  }
  render();
  
  return {render};
})()
