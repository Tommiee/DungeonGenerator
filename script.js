const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const tileSize = 20;

var cols, rows;
var w = 15;
var grid;
var rooms = [,];
var totalTiles = 20;

resize();

function generateGrid(){
  cols = Math.floor(canvas.width / w);
  rows = Math.floor(canvas.height / w);
  grid = make2DArray(cols,rows);
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++){
      grid[i][j] = new Tile(i,j,w);
    }
  }

  var options = [];
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      options.push([i, j]);
    }
  }

  for (var n = 0; n < totalTiles; n++) {
    var index = Math.floor(Math.random() * options.length);
    var choice = options[index];
    var i = choice[0];
    var j = choice[1];
    options.splice(index,1);
    grid[i][j].tile = true;
    rooms.push([i,j]);
    grid[i][j].expandRoom();
  }
  rooms.sort(function(a, b){return a-b});
}

function draw(){
  context.clearRect(0,0,canvas.width,canvas.height);
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++){
      grid[i][j].show();
    }
  }
}

function drawPath(){
  for (var i = 0; i < rooms.length; i++) {
    context.beginPath();
    // console.log(grid[rooms[i][0]][rooms[i][1]].x , grid[rooms[i+1][0]][rooms[i][1]].y);
    try{
      context.moveTo(grid[rooms[i][0]][rooms[i][1]].x,grid[rooms[i][0]][rooms[i][1]].y);
      context.lineTo(grid[rooms[i][0]][rooms[i][1]].x,grid[rooms[i+1][0]][rooms[i+1][1]].y);
      context.lineTo(grid[rooms[i+1][0]][rooms[i+1][1]].x,grid[rooms[i+1][0]][rooms[i+1][1]].y);
    } catch(err){

    }
    context.lineWidth=10;
    context.stroke();
  }
}

generateGrid();
console.log(rooms);
draw();
drawPath();
