$(document). ready(function(){
//Making the gameboard
var canvasLen = $('#gameboard').width();//size of the desk
var dimension = 10;
var gameStage = new Kinetic.Stage({
	container: 'gameboard',
	width: canvasLen,
	height: canvasLen
});
var stageWidth = gameStage.getWidth();


gameLayer = new Kinetic.Layer({
});

var squareGroup = new Kinetic.Group({

});
var xGroup = new Kinetic.Group({

});

var state = 0; //neutral squares
for (var row = 0; row < dimension; row++) {
	for (var col = 0; col < dimension; col++){
		var len = stageWidth/dimension;
		var square = new Kinetic.Rect({
			id : "square"+ row + "," + col,
			name: 'square',
			rowNumber: row,
			colNumber: col,
			state : state,
			x: row*len,
			y: col*len,
			width: len,
			height: len,
			stroke: 'black',
			strokeWidth: 2,
			fill: 'white',
			selected: false
		});
		squareGroup.add(square);
		console.log(square.attrs.id);
		var ltrx = new Kinetic.Line({
			id : "x" + row + "," + col,
			name : 'x',
			rowNumber: row,
			colNumber: col,
			points: [7,7, len - 7, len -7],
			stroke: 'black',
			strokeWidth: 7,
			lineCap: 'round',
			visible: false
		});
		var rtlx = new Kinetic.Line({
			id : "x" + row + "," + col,
			name : 'x',
			rowNumber: row,
			colNumber: col,
			points: [7, len - 7, len - 7, 7],
			stroke: 'black',
			strokeWidth: 7,
			lineCap: 'round',
			visible: false
		});
		var circle = new Kinetic.Circle({
			id : "circle" + row + "," + col,
			name: 'circle',
			rowNumber: row,
			colNumber: col,
			x: row*len + len/2,
			y: col*len + len/2,
			radius: len/2 - 7,
			stroke: 'black',
			strokeWidth: 4,
			visible:false
		})
		//using move to change position of Xs
		ltrx.move(col * len,row * len);
		rtlx.move(col * len,row * len);
		xGroup.add(circle);
		xGroup.add(ltrx);
		xGroup.add(rtlx);
	}
}
/*

//debugging code
single = squareGroup.get('#0,0')[0];
shape.each(function(shape){
	console.log(shape.attrs.id);
	console.log(shape.attrs.selected);
});
console.log(single.attrs.id);
console.log(single.attrs.state);
""
*/

//adding layers and stage
gameLayer.add(squareGroup);
gameLayer.add(xGroup);
gameStage.add(gameLayer);


//scoreboard
var player1Score = 0;
var player2Score = 0;

var sboardWidth = $('#scoreboard').width();
var sboardHeight = $('#scoreboard').height();
var scoreStage = new Kinetic.Stage({
	container: 'scoreboard',
	width: sboardWidth,
	height: sboardHeight
});

var scoreLayer = new Kinetic.Layer({
})

var player1Box = new Kinetic.Rect({
	x:0,
	y:0,
	width: sboardWidth,
	height: sboardHeight/2,
	stroke: 'black',
	strokeWidth: 2,
	fill: 'green'
});

var player1Text = new Kinetic.Text({
	x: 15,
	y: 10,
	text: ' P1',
	fontSize: 40,
	fontFamily: 'Tahoma',
	fill: 'blue',
	stroke: 'white',
	strokeWidth: 1,
	fontStyle: 'bold'
});

var player1ScoreText = new Kinetic.Text({
	x: scoreStage.getWidth()/3,
	y: scoreStage.getHeight()/3,
	text: String(player1Score),
	fontSize: 50,
	fontFamily: 'Tahoma',
	fill: 'blue',
	stroke: 'white',
	strokeWidth: 1,
	fontStyle: 'bold'
});



var player2Box = new Kinetic.Rect({
	x:0,
	y: sboardHeight/2,
	width: sboardWidth,
	height: sboardHeight/2,
	stroke: 'black',
	strokeWidth: 2,
	fill: 'brown'
});

var player2Text = new Kinetic.Text({
	x: 15,
	y: scoreStage.getHeight()/2 + 10,
	text: ' P2',
	fontSize: 40,
	fontFamily: 'Tahoma',
	fill: 'red',
	stroke: 'white',
	strokeWidth: 1,
	fontStyle: 'bold'
});

var player2ScoreText = new Kinetic.Text({
	x: scoreStage.getWidth()/3,
	y: scoreStage.getHeight()/2 + scoreStage.getHeight()/3,
	text: String(player2Score),
	fontSize: 50,
	fontFamily: 'Tahoma',
	fill: 'red',
	stroke: 'white',
	strokeWidth: 1,
	fontStyle: 'bold'
});
scoreLayer.add(player1Box);
scoreLayer.add(player1Text);
scoreLayer.add(player1ScoreText);

scoreLayer.add(player2Box);
scoreLayer.add(player2Text);
scoreLayer.add(player2ScoreText);
scoreStage.add(scoreLayer);
//Game logic

var player = 1


console.log(player1Text);
function highlightPlayername(player1,player2){
	if (player === 1){
		player1.setStrokeWidth(3);
		player1.setText(' P1\nturn');
		player2.setStrokeWidth(1);
		player2.setText(' P2');
	}
	else {
		player2.setStrokeWidth(3);
		player2.setText(' P2\nturn');
		player1.setStrokeWidth(1);
		player1.setText(' P1');
	}
	scoreLayer.draw();
}
highlightPlayername(player1Text,player2Text);

function other(){
	player = (player + 1) % 2;
};

function drawx(square){

}

shape = squareGroup.get('.square');
shape.on("mouseenter", function(){
	if (this.attrs.state === 0){
		this.attrs.selected = true;
		this.setFill('blue');
		gameLayer.draw();
	}
});
shape.on("mouseleave", function(){
	this.attrs.selected = false;
	this.setFill('white');
	gameLayer.draw();
});

shape.on("mouseup", function(){
	if (this.attrs.selected === true){
		this.setFill('red');
		other();
		highlightPlayername(player1Text,player2Text);
		console.log(player);
		gameLayer.draw();

	}
});

//end of the program
});