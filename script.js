
const Player = function(id, char){
    
    let name;
    let score = 0;
    
    
    const increaseScore = function() {
        score++;
        console.log("Current score of", this.name, "is", score);
    }
    
    return{
        name,
        increaseScore,
        char
    }
}

player1 = Player(1, "X");
player1.name = "apple";
player2 = Player(2, "O");
player2.name = "player 2: The Stick Meister ;}"

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
            console.log("Test Win! horisontal", playerChar);    //check if player has won horizontally
            player1.char === playerChar ? player1.increaseScore() : player2.increaseScore(); 
            endGame();
            //console.log(grid);
        }

        if((temp[0] && temp[3] && temp[6]) ||
         (temp[1] && temp[4] && temp[7]) ||
         (temp[2] && temp[5] && temp[8])){
            console.log("Test Win! vertical", playerChar);      //check if player has won vertically
            player1.char === playerChar ? player1.increaseScore() : player2.increaseScore();
            endGame();
        }

        if((temp[0] && temp[4] && temp[8]) ||
         (temp[2] && temp[4] && temp[6])){
            console.log("Test Win! diagonal", playerChar);      //check if player has won diagonally
            player1.char === playerChar ? player1.increaseScore() : player2.increaseScore();
            endGame();
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
//Game.playTurn(2);Game.playTurn(5);

console.log(Game.grid);

//just finished the win conditions


let displayController = function() {
 
    let gridContainer = document.createElement("div");
    let cellTemplate = document.createElement("div");
    let cells = gridContainer.childNodes;


    function createGrid() {
        gridContainer.classList.add("grid");
        cellTemplate.classList.add("cell");



        for (let i = 0; i < 9; i++) {
            let cell = cellTemplate.cloneNode("deep");
            cell.setAttribute("index", i);

            cell.addEventListener("click", (e) => {
                Game.playTurn(e.target.getAttribute("index"));
                updateGrid();
            });


            gridContainer.appendChild(cell);

        }




        document.querySelector("body").appendChild(gridContainer);

    }
    createGrid();

    const updateGrid = function(){
        for(let i = 0; i < 9; i++){
            cells[i].textContent = Game.grid[i];
        }
    }


    return{
        updateGrid
    }
}();


//displayController.updateGrid();


