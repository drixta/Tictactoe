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

var state = 0; //neutral squares
for (var row = 0; row < dimension; row++) {
	for (var col = 0; col < dimension; col++){
		var len = stageWidth/dimension;
		var square = new Kinetic.Rect({
			id : row + "," + col,
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

	}
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
		gameLayer.draw();
	}
});

//debugging code
single = squareGroup.get('#0,0')[0];
shape.each(function(shape){
	console.log(shape.attrs.id);
	console.log(shape.attrs.selected);
});
console.log(single.attrs.id);
console.log(single.attrs.state);

//adding layers and stage
gameLayer.add(squareGroup);
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
	fill: 'green',
})

var player1Text = new Kinetic.Text({
	x: scoreStage.getWidth()/4,
	y: 20,
	text: 'P1',
	fontSize: 50,
	fontFamily: 'Helvetica',
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
	fontFamily: 'Helvetica',
	fill: 'blue',
	stroke: 'white',
	strokeWidth: 1,
	fontStyle: 'bold'
})

scoreLayer.add(player1Box);
scoreLayer.add(player1Text);
scoreLayer.add(player1ScoreText);

var player2Box = new Kinetic.Rect({
	x:0,
	y: sboardHeight/2,
	width: sboardWidth,
	height: sboardHeight/2,
	stroke: 'black',
	strokeWidth: 2,
	fill: 'yellow',
})
var player2Text = new Kinetic.Text({
	x: scoreStage.getWidth()/4,
	y: scoreStage.getHeight()/2 + 20,
	text: 'P2',
	fontSize: 50,
	fontFamily: 'Helvetica',
	fill: 'red',
	stroke: 'grey',
	strokeWidth: 1,
	fontStyle: 'bold'
});

var player2ScoreText = new Kinetic.Text({
	x: scoreStage.getWidth()/3,
	y: scoreStage.getHeight()/2 + scoreStage.getHeight()/3,
	text: String(player2Score),
	fontSize: 50,
	fontFamily: 'Helvetica',
	fill: 'red',
	stroke: 'grey',
	strokeWidth: 1,
	fontStyle: 'bold'
})
scoreLayer.add(player2Box);
scoreLayer.add(player2Text);
scoreLayer.add(player2ScoreText);

scoreStage.add(scoreLayer);
});