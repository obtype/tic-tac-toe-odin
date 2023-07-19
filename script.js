
const Player = function(){

}


const Game = (function() {
    let grid = [];
    
    /* for(let i = 9; i < 9; i++){
        grid[i] = "";
    } */
    
    let turn = 1;

    const playTurn = function(position){
        grid[position] = (turn%2 === 1) ? "X" : "O";
        checkWinCondition();
        turn++;
    }

    const checkWinCondition = function(){
        
        let playerChar = (turn%2 === 1) ? "X" : "O";
        let temp = grid.slice(0);
        //temp.length = 9;
        //temp.forEach((item) => (item === playerChar ? item = true : item = false));
        //console.log(grid);
        for(let item = 0; item < 9; item++){
            (temp[item] === playerChar) ? temp[item] = true : temp[item] = false;
            /* if(temp[item] === playerChar){
                temp[item] = true;
            }
            else{
                temp[item] = false;
            } */
            //console.log(12);
            
        }
        
        //console.log(temp);
        if((temp[0] && temp[1] && temp[2]) ||
         (temp[3] && temp[4] && temp[5]) ||
         (temp[6] && temp[7] && temp[8])){
            console.log("Test Win! horisontal", playerChar);
            endGame();
            //console.log(grid);
        }

        if((temp[0] && temp[3] && temp[6]) ||
         (temp[1] && temp[4] && temp[7]) ||
         (temp[2] && temp[5] && temp[8])){
            console.log("Test Win! vertical", playerChar);
            endGame();
        }

        if((temp[0] && temp[4] && temp[8]) ||
         (temp[2] && temp[4] && temp[6])){
            console.log("Test Win! diagonal", playerChar);
            endGame();
        }

    }

    const endGame = function () {
        console.log("Game ending");
        grid.length = 0
        turn = 0;
    }




    return{
        grid,
        turn,
        playTurn
    }
})();

//console.log(123);
console.log(Game.grid);
Game.playTurn(0);Game.playTurn(3);
Game.playTurn(1);Game.playTurn(4);
Game.playTurn(2);Game.playTurn(5);

console.log(Game.grid);


