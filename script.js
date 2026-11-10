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

function createPlayer(name, mark){
  this.name = name;
  this.mark = mark;

  return {name, mark}
}
