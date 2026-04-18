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
    let usedMark = new Set();
    let mark;
    function checkUsedMark(setMark){
        if(usedMark.has(setMark)){
            return true;
        }
    }
    function win(){
        point++;
        console.log(`The winner is ${name} with ${point} points`);
    }
    function setMarkX(){
        if(checkUsedMark("X") === true){
            console.log("X mark is already in use, you are Y mark");
            mark = "Y";
        }
        else{
            mark = "X";
        }
    }
    function setMarkY(){
        if(checkUsedMark("Y") === true){
            console.log("Y mark is already in use, you are X mark");
            mark = "X";
        }
        else{
            mark = "Y";
        }
    }
    function getMark(){
        return mark;
    }
    return {win, setMarkX, setMarkY, getMark};
}
