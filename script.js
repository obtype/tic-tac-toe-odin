const HumanFactory = (name, age) => {
	const walk = () => console.log("Step step, skip.");
	const run = () => console.log("DASH DASH!");
	return {name, age, walk, run};
}


let humuba = HumanFactory("Mubashir", 20);
/* humuba.run();
humuba.walk();

console.log(humuba.age);
 */


const playerFactory = function(playerNumber) {
	const mark = playerNumber===1 ? "X" : "O";
	
	

	return {
		mark
	}
}

let player1 = playerFactory(1);
let player2 = playerFactory(2);


const displayHandler = (function() {
	let gameBoardContainer = document.querySelector(".board");
	
	

	return {
		
	}
})();

const GameBoard = (function() {		//creating a module ,aka. a single use object, using the module pattern. 
	
	const num = 5;
	let gameBoardContainer;

	function hello() {
		console.log('hello World', num);
	}

	//testing ends here, real code starts here.

	function _createGameBoard() {
		gameBoardContainer = document.createElement('div');
		gameBoardContainer.classList.add('board');
		const gameTile = document.createElement('div');
		gameTile.classList.add("tile");
		//gameTile.setAttribute("index", null);
		for (let i = 1; i <= 9; i++) {
			let tile = gameTile.cloneNode();
			tile.setAttribute("index", i);
			tile.addEventListener("click", playTurn);
			gameBoardContainer.appendChild(tile);
			
		}

		document.body.appendChild(gameBoardContainer);
	}
	

	let turn = 1;

	function playTurn(event){

		let mark = (turn%2 === 1) ? player1.mark : player2.mark;	//player1 always goes first in my game.
		if(event.target.textContent){
			return;
		}

		event.target.textContent = mark;


		//check if game win condition has been reached, if so, end the game.

		if(checkWinCondition()) {
			(turn%2 === 1) ? endGame(player1) : endGame(player2);
			turn = 1;
			
			return;
		}
		let draw = true;
		gameBoardContainer.childNodes.forEach((node) => {
			if(node.textContent === ""){
				draw = false;
			}});
		
		if(draw === true){
			console.log("The game is DRAW.")
			let reset = prompt("Will you play again? (y/n)");
			if(reset === "y"){
				gameBoardContainer.childNodes.forEach((node) => node.textContent = "");
			}
			else{
				gameBoardContainer.childNodes.forEach((node) => node.removeEventListener("click", playTurn));
				console.log("reset page to restart game.");
			}

		}


		turn++;
	}

	
	function checkWinCondition() {
		let mark = (turn%2 === 1) ? player1.mark : player2.mark;
		
		let tile = gameBoardContainer.childNodes;
		tile.forEach(element => {
			element.state = (element.textContent === mark )? true : false;
		});

		/* console.log(tile[0].state, tile[1].state, tile[2].state);
		console.log(tile[0].state && tile[1].state && tile[2].state); */
		if((tile[0].state && tile[1].state && tile[2].state) ||
			(tile[3].state && tile[4].state && tile[5].state) ||
			(tile[6].state && tile[7].state && tile[8].state) ){
				console.log("WIn horiszontal");
			return true;
		}

		if((tile[0].state && tile[3].state && tile[6].state) ||
			(tile[1].state && tile[4].state && tile[7].state) ||
			(tile[2].state && tile[5].state && tile[8].state) ){
				console.log("WIn vertical");
			return true;
		}

		if((tile[0].state && tile[4].state && tile[8].state) ||
			(tile[6].state && tile[4].state && tile[2].state) ){
				console.log("WIn diagonal");
			return true;
		}


	}


	function endGame(winner){

		console.log("The game has ended,", winner== player1? "Player 1" : "Player 2", "has won the game.");

		let reset = prompt("Will you play again? (y/n)");
			if(reset === "y"){
				gameBoardContainer.childNodes.forEach((node) => node.textContent = "");
			}
			else{
				gameBoardContainer.childNodes.forEach((node) => node.removeEventListener("click", playTurn));
				console.log("reset page to restart game.");
			}

	}


	

	_createGameBoard()		//this line is responsible for creating the actual gameboard that is rendered when I load the page.



	//document.body.appendChild(_generateGameBoardNode());

	return {
		hello
	}
})();











