function Tile(i,j,w){
  this.i = i;
  this.j = j;
  this.x = i * w;
  this.y = j * w;
  this.w = w;
  this.neighborCount = 0;
  this.tile = false;
  this.revealed = false;
}

Tile.prototype.show = function(){
  context.rect(this.x,this.y,this.w,this.w);
  // if(this.revealed){
    // context.fillRect(this.x,this.y,this.w,this.w);
    if(this.tile){
      context.fillStyle = "black"
      context.fillRect(this.x,this.y,this.w,this.w);
    } else {
      // if(this.neighborCount > 0){
        context.fillStyle = "#cccccc";
        context.fillRect(this.x,this.y,this.w,this.w);
      // }
    // }
  }
}

Tile.prototype.countTiles = function(){
  if(this.tile) {
    this.neighborCount = -1;
    return;
  }

  var total = 0;

  for (var xOff = -1; xOff <= 1; xOff++){
    for (var yOff = -1; yOff <= 1; yOff++){
      var i = this.i + xOff;
      var j = this.j + yOff;
      if(i > -1 && i < cols && j > -1 && j < rows){
        var neighbor = grid[i][j];
        if(neighbor.tile){
          total++;
        }
      }
    }
  }
  this.neighborCount = total;
}

Tile.prototype.contains = function(x,y){
  return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w)
}

Tile.prototype.reveal = function(){
  this.revealed = true;
  if(this.neighborCount == 0){
    this.floodFill();
  }
}

Tile.prototype.floodFill = function(){
  for (var xOff = -1; xOff <= 1; xOff++){
    for (var yOff = -1; yOff <= 1; yOff++){
      var i = this.i + xOff;
      var j = this.j + yOff;
      if(i > -1 && i < cols && j > -1 && j < rows){
        var neighbor = grid[i][j]
        if(!neighbor.tile && !neighbor.revealed){
          neighbor.reveal();
        }
      }
    }
  }
}

Tile.prototype.expandRoom = function(){
  xOffMin = Math.floor(Math.random()*4)+1;
  yOffMin = Math.floor(Math.random()*4)+1;
  xOffMax = Math.floor(Math.random()*4);
  yOffMax = Math.floor(Math.random()*4);
  for (var xOff = -xOffMin; xOff <= xOffMax; xOff++){
    for (var yOff = -yOffMin; yOff <= yOffMax; yOff++){
      var i = this.i + xOff;
      var j = this.j + yOff;
      if(i > -1 && i < cols && j > -1 && j < rows){
        var neighbor = grid[i][j];
        if(!neighbor.tile){
          neighbor.tile = true;
        }
      }
    }
  }
}
