let context;
let pacman = new Pacman();
let small_food = new SmallFood();
let med_food = new MediumFood();
let big_food = new BigFood();
let board = new Board();
let score;
let start_time;
let time_elapsed;
let interval;
let cur_username;
let food_remain;
let try_remain;
// let mySound = new sound("bounce.mp3");
let cnt;
let lastKey;

$(document).ready(function() {
	context = canvas.getContext("2d");
	window.addEventListener("keydown", function(e) {
		if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
			e.preventDefault();
		}
	}, false);
});

function createBoard(){
	/** W - WALL
	 * F5 - Food 5
	 * P - Pacman
	 * E - EMPTY
	 */
	 //get the food num from the settings
	//small_food.remain = chosen_num_of_food_points*0.6;
	//med_food.remain =  chosen_num_of_food_points*0.3;
	//big_food.remain =  chosen_num_of_food_points*0.1;
	pacman.lives_remain = 1;
	board.arr = new Array();
	food_remain = chosen_num_of_food_points
	for (var i = 0; i < board.cols_num; i++) {
		board.arr[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < board.rows_num; j++) {
			if (
				// 
				(i == 0) || (j==0) || 	(i == board.cols_num-1) || (j== board.rows_num-1)||
			
				(i == 3 && j == 3) || (i==3&&j==4) || (i==3&&j==5) || (i==3&&j==6)|| 
				(i==4&&j==3) || (i==5&&j==3) || (i==6&&j==3)||
				(i == 3 && j == 13) || (i==3&&j==12) || (i==3&&j==11) || (i==3&&j==10)||
				(i == 3 && j == 13) || (i==4&&j==13) || (i==5&&j==13) || (i==6&&j==13)||


				(i == 23 && j == 3) || (i==23 && j==4) || (i==23&&j==5) || (i==23&&j==6)||
				(i == 22 && j == 3) || (i==21&&j==3) || (i==20&&j==3)||

				(i == 23 && j == 13) || (i==22 && j==13) || (i==21&&j==13) || (i==20&&j==13)||
				(i == 23 && j == 13) || (i==23&&j==12) || (i==23&&j==11) || (i==23&&j==10)||

				(i == 12 && j == 3) || (i==13&&j==3) || (i==14&&j==3) ||
				(i == 12 && j == 13) || (i==13&&j==13) || (i==14&&j==13) ||
				(i == 9 && j == 1) || (i==9&&j==2) || (i==9&&j==3) || (i == 9 && j == 13) || (i==9&&j==15) || (i==9&&j==14)||
				(i == 17 && j == 1) || (i==17&&j==2) || (i==17&&j==3) || (i == 17 && j == 13) || (i==17&&j==15) || (i==17&&j==14)||
				(i == 12 && j == 13) || (i==13&&j==13) || (i==14&&j==13)||
				(i == 8 && j == 6) || (i==9&&j==6) || (i==10&&j==6) || (i == 11 && j == 6) || (i==12&&j==6) || (i == 14 && j == 6) || (i==15&&j==6) || (i==16&&j==6)|| (i==17&&j==6) || (i==18&&j==6)  ||
				(i == 8 && j == 10) || (i==9&&j==10) || (i==10&&j==10) || (i == 11 && j == 10) || (i==12&&j==10) || (i == 14 && j == 10) || (i==15&&j==10) || (i==16&&j==10)|| (i==17&&j==10) || (i==18&&j==10)
				||(i == 8 && j == 7) ||(i == 8 && j == 9) ||(i == 18 && j == 7) ||(i == 18 && j == 9) ||
				(i==12&&j==11) || (i == 14 && j == 11) || (i==12&&j==5) || (i == 14 && j == 5)||
				(i==7&&j==7) || (i == 7 && j == 9) || (i==19&&j==7) || (i == 19 && j == 9)||
				(i==3&&j==8) || (i == 23 && j == 8) || (i==12&&j==5) || (i == 14 && j == 5)
			)
			{
				board.arr[i][j] = "W";
			} 
			else if(i==13 && j==8){
				board.arr[i][j] = "T";
			}
			else {
				var randomNum = Math.random();
				if (randomNum <= (1.0 * food_remain) / board.cnt) 
				{
					const random_food = Math.random();
					if(random_food<=0.6){
						board.arr[i][j] = "F5";
						//small_food.remain--;
					}
					else if(random_food>0.6 && random_food<=0.9){
						board.arr[i][j] = "F15";
						//small_food.remain--;
					}
					else{
						board.arr[i][j] = "F25";
						//small_food.remain--;
					}
					food_remain--	
				} 
				// else if (randomNum < (1.0 * (pacman.lives_remain + food_remain)) / board.cnt) {
				// 	pacman.i = i;
				// 	pacman.j = j;
				// 	pacman.lives_remain--;
				// 	board.arr[i][j] = "P";
				// } 
				else {
					board.arr[i][j] = "E";
				}
				board.cnt--;
			}
		}
	}
	while (food_remain > 0) {
		let emptyCell = findRandomEmptyCell(board);
		//board.arr[emptyCell[0]][emptyCell[1]] = "F5";
		//small_food.remain--;
		const random_food = Math.random();
		if(random_food<=0.6){
			board.arr[emptyCell[0]][emptyCell[1]] = "F5";
			//small_food.remain--;
		}
		else if(random_food>0.6 && random_food<=0.9){
			board.arr[emptyCell[0]][emptyCell[1]] = "F15";
			//small_food.remain--;
		}
		else{
			board.arr[emptyCell[0]][emptyCell[1]] = "F25";
			//small_food.remain--;
		}
		food_remain--
	}
	let pacman_cell = findRandomEmptyCell(board);
		score = 0;
		pacman.i=pacman_cell[0]
		pacman.j=pacman_cell[1]


	// set empty for teleport
	board.arr[0][8]="E"
	board.arr[26][8]="E"
	board.arr[13][0]="E"
	board.arr[13][16]="E"

}

function Start() {
	createBoard();
	// mySound.play();
	start_time = new Date();
	startTimer(chosen_game_time, document.getElementById("timer"));
	document.getElementById("username_title").innerHTML= username_curr;
	small_food.color = chosen_color5;
	med_food.color = chosen_color15;
	big_food.color = chosen_color25;
	keysDown = {};
	addEventListener(
		"keydown",
		function(e) {
			keysDown[e.keyCode] = true;
		},
		false
	);
	addEventListener(
		"keyup",
		function(e) {
			keysDown[e.keyCode] = false;
		},
		false
	);
	interval = setInterval(UpdatePosition, 150);
}

function findRandomEmptyCell(board) {
	let i = getRandomInt(0,board.cols_num-1);
	let j = getRandomInt(0,board.rows_num-1);
	while (board.arr[i][j] != "E") {
		i = getRandomInt(0,board.cols_num-1);
		j = getRandomInt(0,board.rows_num-1);
	}
	return [i, j];
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function GetKeyPressed() {
	// UP
	if (keysDown[chosen_key_code_up]) {
		return 1;
	}
	// DOWN
	if (keysDown[chosen_key_code_down]) {
		return 2;
	}
	// LEFT
	if (keysDown[chosen_key_code_left]) {
		return 3;
	}
	// RIGHT
	if (keysDown[chosen_key_code_right]) {
		return 4;
	}
}

function DrawPacman(center){
	if (pacman.direction == "U"){
		context.drawImage(pacman.img_up, center.x-10, center.y-10, board.cell_width*0.7, 0.7*board.cell_height);
	}
	else if (pacman.direction == "D"){
		context.drawImage(pacman.img_down, center.x-10, center.y-10, board.cell_width*0.7,0.7* board.cell_height);
	}
	else if (pacman.direction == "R"){
		context.drawImage(pacman.img_right, center.x-10, center.y-10, board.cell_width*0.7,0.7* board.cell_height);
	}
	else{
		context.drawImage(pacman.img_left, center.x-10, center.y-10, board.cell_width*0.7,0.7* board.cell_height);
	}
}

function Draw() {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblTime.value = time_elapsed;
	for (let i = 0; i < board.cols_num; i++) {
		for (let j = 0; j < board.rows_num; j++) {
			let center = new Object();
			center.x = i * 30 + 30;
			center.y = j * 30 + 30;
			if (board.arr[i][j] == "P") {
				DrawPacman(center);
			} 
			else if (board.arr[i][j] == "F5") {
				context.beginPath();
				context.arc(center.x, center.y, 4, 0, 2 * Math.PI); // circle
				context.fillStyle = small_food.color; //color
				context.fill();
			} else if (board.arr[i][j] == "F15") {
				context.beginPath();
				context.arc(center.x, center.y, 8, 0, 2 * Math.PI); // circle
				context.fillStyle = med_food.color; //color
				context.fill();
			}
			else if (board.arr[i][j] == "F25") {
				context.beginPath();
				context.arc(center.x, center.y, 12, 0, 2 * Math.PI); // circle
				context.fillStyle = big_food.color; //color
				context.fill();
			}
			else if (board.arr[i][j] == "W") {
				wall_img = new Image(10,10);
				wall_img.src = "./assets/wall.png";
				context.drawImage(wall_img,center.x-15, center.y-15, board.cell_width, board.cell_height);
			}
			else if (board.arr[i][j] == "T") {
				teleport_img = new Image(10,10);
				teleport_img.src = "./assets/teleport.jpg";
				context.drawImage(teleport_img,center.x-15, center.y-15, board.cell_width, board.cell_height);
			}
		}
	}
}
// // set empty for teleport
// board.arr[0][8]="E" 
// board.arr[26][8]="E"
// board.arr[13][0]="E"
function UpdatePosition() {
	if (pacman.i==undefined || pacman.j==undefined){
		return
	}
	board.arr[pacman.i][pacman.j] = "E";
	board.arr[13][8] = "T";
	lastKey = GetKeyPressed();
	if(lastKey == undefined){
		lastKey = 0;
	}
	// UP
	if (lastKey == 1) {
		pacman.direction = "U";
		if(pacman.i==13 && pacman.j==0){
			pacman.i = 13 
			pacman.j= 16
		}
		else if (pacman.j > 0 && board.arr[pacman.i][pacman.j - 1] != "W") {
			pacman.j--;
		}
	}
	// DOWN
	if (lastKey == 2) {
		pacman.direction = "D";
		if(pacman.i==13 && pacman.j==16){
			pacman.i = 13 
			pacman.j= 0
		}
		else if (pacman.j < board.rows_num-1 && board.arr[pacman.i][pacman.j + 1] != "W") {
			pacman.j++;
		}
	}
	// LEFT
	if (lastKey == 3) {
		pacman.direction = "L";
		if(pacman.i==0 && pacman.j==8){
			pacman.i = 26 
			pacman.j= 8
		}
		else if (pacman.i > 0 && board.arr[pacman.i - 1][pacman.j] != "W") {
			pacman.i--;
		}
	}
	// RIGHT
	if (lastKey == 4) {
		pacman.direction = "R";
		if(pacman.i==26 && pacman.j==8){
			pacman.i = 0 
			pacman.j= 8
		}
		if (pacman.i < board.cols_num-1 && board.arr[pacman.i + 1][pacman.j] != "W") {
			pacman.i++;
		}
	}
	if (board.arr[pacman.i][pacman.j] == "F5") {
		score+=5;
	}
	if (board.arr[pacman.i][pacman.j] == "F15") {
		score+=15;
	}
	if (board.arr[pacman.i][pacman.j] == "F25") {
		score+=25;
	}
	if(board.arr[pacman.i][pacman.j] == "T"){
		let emptyCell = findRandomEmptyCell(board);
		pacman.i=emptyCell[0]
		pacman.j=emptyCell[1]
	}
	board.arr[pacman.i][pacman.j] = "P";
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	if (score == 1000) {
		window.clearInterval(interval);
		window.alert("Game completed");
	} else {
		Draw();
	}
}

function startTimer(duration, display) {
	var timer = duration, minutes, seconds;
	setInterval(function () {
		minutes = parseInt(timer / 60, 10)
		seconds = parseInt(timer % 60, 10);

		minutes = minutes < 10 ? "0" + minutes : minutes;
		seconds = seconds < 10 ? "0" + seconds : seconds;

		display.value = minutes + ":" + seconds;

		if (--timer < 0) {
			//window.alert("game over!");
			var ben =null
		}
	}, 1000);
}
