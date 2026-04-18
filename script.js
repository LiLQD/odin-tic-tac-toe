const Gameboard = (function GameBoard(){
    
    const arr = [["", "", ""], ["", "" ,""], ["", "", ""]];
    function getSquareValue(row, column){
        return arr[row][column];
    }
    function setSquareValue(row, column, value){
        return arr[row][column] = value;
    }
    return {getSquareValue, setSquareValue};
})()

function Player(name){
    let point = 0;
    let mark;
    function setMark(m){
        mark = m;
    }
    function getMark(){
        return mark;
    }
    return function createPlayer(){
        return {name, mark, setMark, getMark}
    };
};
