$(document). ready(function(){
var canvasLen = 500;//size of the desk
var dimension = 10;
var stage = new Kinetic.Stage({
	container: 'container',
	width: canvasLen,
	height: canvasLen
});
var stageWidth = stage.getWidth();


layer = new Kinetic.Layer({
});


var desk = new Kinetic.Rect({
	x: 0,
    y: 0,
    width: canvasLen,
    height: canvasLen,
    stroke: 'black',
    strokeWidth: 4
});
layer.add(desk);


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
			fill: 'white'
		});
		squareGroup.add(square);
		console.log(square.attrs.id);

	}
}
shape = squareGroup.get('.square');
single = squareGroup.get('#0,0')[0];
shape.on("mouseenter", function(){
	this.setFill('blue');
	layer.draw();
});
shape.on("mouseleave", function(){
	this.setFill('white');
	layer.draw();
});
shape.each(function(shape){
	console.log(shape.attrs.id);
})
console.log(single.attrs.id);
layer.add(squareGroup);
stage.add(layer);
});