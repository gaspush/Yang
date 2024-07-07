function Board(){
  
    this.grid = Array.from({ length: 8 }, () => Array(8).fill(null))
    
    this.grid[4][3] = this.grid[3][4] = 0
    this.grid[3][3] = this.grid[4][4] = 1
    
    this.place = function(row, col, toFlip){
      players[1-turn]++
      this.grid[row][col] = turn
      
      for (let i = 0; i < toFlip.length; i++){
        let flipR = toFlip[i][0]
        let flipC = toFlip[i][1]
        this.grid[flipR][flipC] = turn
        players[turn]--      
        players[1-turn]++
      }
      
      turn = 1 - turn
      calculateValid()
    }
    
    
    this.draw = function(){    
      push()
      
      let boardLength = height * 0.8
      let offsetX = (width - boardLength) / 2
      let offsetY = height - boardLength - 20
      translate(offsetX, offsetY)
      
      for (let row = 0; row < 8; row++){
        for (let col = 0; col < 8; col++){
          let color = this.grid[row][col]
          
          if (color === null) continue
          
          fill(0) 
          if (color) fill(255)
            
          strokeWeight(2.5)
          ellipse(col * (boardLength / 8) + boardLength / 16,
                  row * (boardLength / 8) + boardLength / 16,
                  0.8* boardLength / 8);
        }   
      }
      pop()
    }
    
  }