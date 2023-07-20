
const Player = function(id, char){
    
    let name;
    let score = 0;
    
    
    const increaseScore = function() {
        score++;
        console.log("Current score of", this.name, "is", score);
        displayController.updateScoreBoard();
    }
    function getScore(){
        return score;
    }
    
    return{
        name,
        increaseScore,
        char,
        getScore
    }
}

player1 = Player(1, "X");
player1.name = "apple";
player2 = Player(2, "O");
player2.name = "player 2"

const Game = (function() {
    let grid = [];
    
    /* for(let i = 9; i < 9; i++){
        grid[i] = "";
    } */
    
    let turn = 1;

    const playTurn = function(position){

        if(grid[position]){
            console.log(12);
            return;
        }

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
            console.log("Test Win! horisontal", playerChar);    //check if player has won horizontally
            let winner  = player1.char === playerChar ? player1 : player2; 
            winner.increaseScore();
            displayController.disableGrid();
            displayController.displayWinMessage(winner);
        }

        if((temp[0] && temp[3] && temp[6]) ||
         (temp[1] && temp[4] && temp[7]) ||
         (temp[2] && temp[5] && temp[8])){
            console.log("Test Win! vertical", playerChar);      //check if player has won vertically
            let winner  = player1.char === playerChar ? player1 : player2; 
            winner.increaseScore();
            displayController.disableGrid();
            displayController.displayWinMessage(winner);
        }

        if((temp[0] && temp[4] && temp[8]) ||
         (temp[2] && temp[4] && temp[6])){
            console.log("Test Win! diagonal", playerChar);      //check if player has won diagonally
            let winner  = player1.char === playerChar ? player1 : player2; 
            winner.increaseScore();
            displayController.disableGrid();
            displayController.displayWinMessage(winner);
        }

        let draw = true;

        for(let i = 0; i < 9; i++){
            if(!grid[i]){
                draw = false;      
                break;
            }
        }

        if(draw){
            console.log("The game is a draw.");
            displayController.disableGrid();
        }
    }

    const endGame = function () {
        console.log("Game ending");
        grid.length = 0
        turn = 1;
        

    }




    return{
        grid,
        turn,
        playTurn,
        endGame
    }
})();

//console.log(123);
/* console.log(Game.grid);
Game.playTurn(0);Game.playTurn(3);
Game.playTurn(1);Game.playTurn(4); */
//Game.playTurn(2);Game.playTurn(5);

console.log(Game.grid);

//just finished the win conditions


let displayController = function() {
 
    let gridContainer = document.createElement("div");
    let cellTemplate = document.createElement("div");
    let cells = gridContainer.childNodes;
    let winMessageBox = document.querySelector("div.congrats");

    let resetButton = document.querySelector("button.reset").addEventListener("click", _resetClick);

    document.querySelector('button[data-player="1"]').addEventListener("click", () => {
        player1.name = prompt("Enter name for player 1");
        updateScoreBoard();
    })

    document.querySelector('button[data-player="2"]').addEventListener("click", () => {
        player2.name = prompt("Enter name for player 2");
        updateScoreBoard();
    })


    function _resetClick(){
        Game.endGame();
        updateGrid();
        enableGrid();
        winMessageBox.textContent = "";
        updateScoreBoard();
        
    }


    const updateScoreBoard = function () {
        /*         let scoreBoard = document.querySelector("div.score");
                scoreBoard.childNodes[0].textContent = `${player1.name}: ${player1.score}`;
                scoreBoard.childNodes[1].textContent = `${player2.name}: ${player2.score}`; */

        let scoreBoard1 = document.querySelector('[data-player="1"]');
        let scoreBoard2 = document.querySelector('[data-player="2"]');
        scoreBoard1.textContent = `${player1.name}: ${player1.getScore()}`;
        scoreBoard2.textContent = `${player2.name}: ${player2.getScore()}`;
        console.log(scoreBoard1);
    }

        
    function createGrid() {
        gridContainer.classList.add("grid");
        cellTemplate.classList.add("cell");


        

        for (let i = 0; i < 9; i++) {
            let cell = cellTemplate.cloneNode("deep");
            cell.setAttribute("index", i);

            cell.addEventListener("click", _cellClick);


            gridContainer.appendChild(cell);

        }
        



        document.querySelector(".container").appendChild(gridContainer);
        updateScoreBoard();
        
    }
    createGrid();

    function _cellClick(e){
        Game.playTurn(e.target.getAttribute("index"));
        updateGrid();
    }


    const disableGrid = function() {
        for(let i = 0; i < 9; i++){
            cells[i].removeEventListener("click", _cellClick);
        }
        console.log("removing event listeners from cells...");
    }

    const enableGrid = function() {
        for(let i = 0; i < 9; i++){
            cells[i].addEventListener("click", _cellClick);
        }
        console.log("adding event listeners to cells...");
    }

    const updateGrid = function(){
        for(let i = 0; i < 9; i++){
            cells[i].textContent = Game.grid[i];
        }
    }


    const displayWinMessage = function(player) {
        winMessageBox.textContent = `Player ${player.name} has won the game!`;
    }


    
    


    return{
        updateGrid,
        disableGrid,
        displayWinMessage,
        updateScoreBoard
    }
}();


//displayController.updateGrid();


