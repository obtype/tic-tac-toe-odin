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
	let turn = 1;

	function playTurn(event, mark){

		mark = (turn%2 === 1)? player1.mark : player2.mark;

		event.target.textContent = mark;

		turn++;
		
	}



	return {
		playTurn
	}
})();

const GameBoard = (function() {		//creating a module ,aka. a single use object, using the module pattern. 
	
	const num = 5;

	function hello() {
		console.log('hello World', num);
	}

	//testing ends here, real code starts here.

	function _createGameBoard() {
		const gameBoardContainer = document.createElement('div');
		gameBoardContainer.classList.add('board');
		const gameTile = document.createElement('div');
		gameTile.classList.add("tile");
		//gameTile.setAttribute("index", null);
		for (let i = 1; i <= 9; i++) {
			let tile = gameTile.cloneNode();
			tile.setAttribute("index", i);
			tile.addEventListener("click", displayHandler.playTurn);
			gameBoardContainer.appendChild(tile);
			
		}

		document.body.appendChild(gameBoardContainer);
	}

	

	_createGameBoard()		//this line is responsible for creating the actual gameboard that is rendered when I load the page.



	//document.body.appendChild(_generateGameBoardNode());

	return {
		hello
	}
})();











