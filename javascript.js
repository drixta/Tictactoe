window.onload = function(){
var canvas_len = 500;
var stage = new Kinetic.Stage({
	container: 'container',
	width: canvas_len,
	height: canvas_len
});
var layer = new Kinetic.Layer();

var desk = new Kinetic.Rect({
 	x: 0,
    y: 0,
    width: canvas_len,
    height: canvas_len,
    stroke: 'black',
    strokeWidth: 4
});

// add the shape to the layer
layer.add(desk);

//creating Square group
var square_group = new Kinetic.Group({
	x: 0,
	y: 0,
});
//adding squares onto layer
var stage_width = stage.getWidth()
var dimension = 20;
var creat_square = function(posr,posc,state,len){
	var square = new Kinetic.Rect({
		id : String(posr)+',' + String(posc),
		posr: posr,
		posc: posc,
		state : state,
		x: posr*len,
		y: posc*len,
		width: len,
		height: len,
		stroke: 'black',
		strokeWidth: 2
	});	
	square_group.add(square);
}
var addsquare = function(dimension){
	for (var n = 0; n<dimension; n++) {
		for (var i = 0; i < dimension; i++){
			var len = stage_width/dimension;
			creat_square(n,i,0,len);
		}
	}
};
var highlight = function(square){
	square.fill = "#00D2FF"
};

addsquare(10);
layer.add(square_group);
stage.add(layer);
};