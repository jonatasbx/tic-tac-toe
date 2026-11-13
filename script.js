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

  const reset = ()=> board.fill("");

  return {getBoard, placeMark, reset}
})();


// Cria a Player Factory
function createPlayer(name, mark){
  return {name, mark}
}

// Cria o Game Controller

const gameController = (function(){
  let result = "";

  function getStatus(){
    if(!result){
      return `Vez de ${activePlayer.name}`
    }else{
      return result
    }
  }
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
      result = `${activePlayer.name} venceu!`;
      return
    };

    if(checkTie()){
      gameOver = true;
      result = "Empatoooooou!"
      return
    };

    switchPlayer()
  }

  function resetGame(name1, name2){
    players[0] = createPlayer(name1 || "Jogador 1", "X");
    players[1] = createPlayer(name2 || "Jogador 2", "O");

    Gameboard.reset();
    activePlayer = players[0];
    gameOver = false;
    result = "";
  }

  return {playRound, getActivePlayer, getStatus, resetGame}

})();

// Display Controller

const displayController = (function () {
  const input1 = document.querySelector("#player1");
  const input2 = document.querySelector("#player2");

  const boardDiv = document.querySelector("#board");

  const para = document.querySelector("#status");

  const restartButton = document.querySelector("#restart");

  const render = function(){
    para.textContent = gameController.getStatus();
    boardDiv.textContent = "";
    Gameboard.getBoard().forEach((cell, index) => {
      const cellDiv = document.createElement("div");
      cellDiv.classList.add("cell");
      cellDiv.textContent = cell;
      cellDiv.addEventListener("click", () => {
        gameController.playRound(index);
        render()
      })
      boardDiv.appendChild(cellDiv);
    });
  };

  restartButton.addEventListener("click", ()=>{
    gameController.resetGame(input1.value.trim(), input2.value.trim());
    render()
  })
  render();

  return {render};
})()
