const Gameboard = (function GameBoard(){
    const arr = [[firstSquare, secondSquare, thirdSquare], [forthSquare, fifthSquare ,sixthSquare], [seventhSquare, eighthSquare, ninethSquare]];
    function getSquareValue(row, column){
        return arr[row][column];
    }
    function setSquareValue(row, column, value){
        return arr[row][column] = value;
    }
    return {getSquareValue, setSquareValue};
})()