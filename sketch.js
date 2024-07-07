let side = 8
let turn = 1
let board
let players = [2,2]
let valid
const directions = [[-1, -1], [-1, 0], [-1, 1],
                     [0, -1],           [0, 1],
                     [1, -1],  [1, 0],  [1, 1]]

function setup() {
  createCanvas(500, 600)
  board = new Board()
  calculateValid()
}

function draw() {  
  background(180)
  lines(side)
  board.draw()
  displayScore()
  hover()    
}

function hover() {
  push()
  
  strokeWeight(0.5)
  if(turn) fill(255,255,255,127)
  else fill(0,0,0,127)  
  
  let boardLength = height * 0.8
  let offsetX = (width - boardLength) / 2
  let offsetY = height - boardLength - 20
  
  let gridX = mouseX - offsetX
  let gridY = mouseY - offsetY
  
  let cellSize = boardLength / 8
  let row = floor(gridY / cellSize)
  let col = floor(gridX / cellSize)
  
  let pos = [row,col]
  
  let validMove = valid.find(move => arraysEqual(move[0], pos))
  
  if (validMove){
  
    let centerY = offsetY + row * cellSize + cellSize / 2
    let centerX = offsetX + col * cellSize + cellSize / 2
  
    ellipse(centerX, centerY, cellSize * 0.8)
    
    if(mouseIsPressed){
      board.place(row,col,validMove[1])
    }
       
  }  
  pop()  
}

function calculateValid(){
  valid = []
  
  for (let row = 0; row < 8; row++){
    for (let col = 0; col < 8; col++){
      if (board.grid[row][col] === null){
        let toFlip = flipable(row,col)
        if (toFlip.length > 0){
          valid.push([[row,col],toFlip])
        }
      }
    }
  }  
}

function flipable(row,col){  
  let res = []
  
  for (let i = 0; i < 8; i++){
    let partial = piecesInDir(row,col,directions[i])
    res = res.concat(partial)
  }
  
  return res
}

function piecesInDir(row,col,dir){
  let res = []
  
  let newR = row + dir[0]
  let newC = col + dir[1]
  
  let opp = 1 - turn
     
  while (newR >= 0 && newR < 8 && newC >= 0 && newC < 8 &&
         board.grid[newR][newC] == opp){
    res.push([newR,newC])
    newR += dir[0]    
    newC += dir[1]
  }
  
  if (newR >= 0 && newR < 8 && newC >= 0 && newC < 8 &&
      board.grid[newR][newC] === turn){
      return res
      }
  
  else return []
}

function arraysEqual(a, b) {
  if (a.length !== b.length) return false
  
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false
  }
  
  return true
}

function keyPressed() {
  if (keyCode === 32) {
    turn = turn ^ 1
    calculateValid()
  }
}

function lines(side) {
  push()
  
  strokeWeight(2)
  
  let boardLength = height * 0.8
  let offsetX = (width - boardLength) / 2
  let offsetY = height - boardLength - 20   
  translate(offsetX, offsetY)
    
  fill(255, 253, 208)
  
  noStroke()
  rect(0, 0, boardLength, boardLength)
  
  stroke(0)
  for (let i = 0; i < side; i++) {
    for (let i = 0; i < side + 1; i++) {
      line(i * (boardLength / side), 0, i * (boardLength / side), boardLength)
      line(0, i * (boardLength / side), boardLength, i * (boardLength / side))
    }
  }
  
  noFill()
  rect(0, 0, boardLength, boardLength)
  
  pop()
}

function displayScore() {
  push()

  strokeWeight(2.5)
  fill(255)
  ellipse (width / 8, 0.8 * height / 8, 0.75 * height / 8)
  fill(0)
  ellipse (width - width / 8 + 10, 0.8 * height / 8,  0.75 * height / 8)
  
  textAlign(CENTER, CENTER)
  noStroke()
  

  textSize(50)
  text(players[0],
       width / 8 + 0.75 * height / 8 / 2 + 40,
       0.8 * height / 8)
  
  text(players[1],
       width - width / 8 - 0.75 * height / 8 / 2 - 40,
       0.8 * height / 8)
  
  textSize(30)
  
  text("Turno:", width/2, 30)
  
  strokeWeight(2.5)
  stroke(0)
  
  if(turn) fill(255)
  else fill(0)
  
  
  ellipse (width / 2, 70, 0.6 * height / 8)
  
  
  
  pop()
}
