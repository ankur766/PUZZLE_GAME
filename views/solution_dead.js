
      class Node {
        constructor(grid, parent, move, cost) {
          this.grid = grid;
          this.parent = parent;
          this.move = move;
          this.g = parent ? parent.g + cost : 0;
          this.h = this.calculateHeuristic();
        }
        
        calculateHeuristic() {
          let distance = 0;
          for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
              const tile = this.grid[i][j];
              if (tile !== 0) {
                const goalX = Math.floor((tile - 1) / 4);
                const goalY = (tile - 1) % 4;
                distance += Math.abs(goalX - i) + Math.abs(goalY - j);
              }
            }
          }
          return distance;
        }
        
        isGoalState() {
          for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
              if (this.grid[i][j] !== i * 4 + j + 1) {
                return false;
              }
            }
          }
          return true;
        }
        
        findEmptyTile() {
          for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
              if (this.grid[i][j] === 0) {
                return [i, j];
              }
            }
          }
        }
        
        getTotalCost() {
          return this.g + this.h;
        }
        
      }
      
      function generateGrid() {
        let nums = [...Array(15)].map((_, i) => i + 1);
        nums.push(0);
        nums.sort(() => Math.random() - 0.5);
        let grid = [];
        for (let i = 0; i < 4; i++) {
          grid.push(nums.slice(i * 4, i * 4 + 4));
        }
        return grid;
      }
      
      function isDeadEnd(grid) {
        let count = 0;
        for (let i = 0; i < 4; i++) {
          for (let j = 0; j < 4; j++) {
            const current = grid[i][j];
            let numSmaller = 0;
            for (let m = i; m < 4; m++) {
              for (let n = j; n < 4; n++) {
                const other = grid[m][n];
                if ((m > i || n > j) && other !== 0 && other < current) {
                  numSmaller++;
                }
              }
            }
            count += numSmaller;
          }
        }
        return count % 2 !== 0;
      }
      
      function solve() {
        // Generate the initial grid
        let grid;
        do {
          grid = generateGrid();
        } 
     while (isDeadEnd(grid));
      
    // Create the initial node
    const startNode = new Node(grid, null, null, 0);
    
    // Initialize the open and closed sets
    let openSet = [startNode];
    let closedSet = new Set();
    
    while (openSet.length > 0) {
      // Get the node with the lowest total cost
      
      const currentNode = openSet.reduce((a, b) => a.getTotalCost() < b.getTotalCost() ? a : b);
      
      // Check if the current node is the goal state
      if (currentNode.isGoalState()) {
      
        // Build the solution path
        let path = [];
        let node = currentNode;
        while (node.parent) {
          path.push(node.move);
          node = node.parent;
        }
        path.reverse();
        
        // Move the tiles to solve the puzzle
        let emptyTile = currentNode.findEmptyTile();
        for (let i = 0; i < path.length; i++) {
          let move = path[i];
          let x = emptyTile[0] + move[0];
          let y = emptyTile[1] + move[1];
          let temp = grid[emptyTile[0]][emptyTile[1]];
          grid[emptyTile[0]][emptyTile[1]] = grid[x][y];
          grid[x][y] = temp;
          emptyTile = [x, y];
        }
        
        // Display the solution on the page
        const gridDiv = document.getElementById("grid");
        
        gridDiv.innerHTML = "";
        for (let i = 0; i < 4; i++) {
          for (let j = 0; j < 4; j++) {
            const tile = document.createElement("div");
            tile.classList.add("tile");
            if (grid[i][j] !== 0) {
              tile.innerText = grid[i][j];
            }
            gridDiv.appendChild(tile);
          }
        }
        
        // Exit the function
        return;
      }
      
      // Add the current node to the closed set
      closedSet.add(currentNode);
      
      // Generate the child nodes
      const emptyTile = currentNode.findEmptyTile();
      const moves = [[-1, 0], [1, 0], [0, -1], [0, 1]];
      for (let i = 0; i < 4; i++) {
        const x = emptyTile[0] + moves[i][0];
        const y = emptyTile[1] + moves[i][1];
        if (x >= 0 && x < 4 && y >= 0 && y < 4) {
          const newGrid = JSON.parse(JSON.stringify(currentNode.grid));
          const temp = newGrid[emptyTile[0]][emptyTile[1]];
          newGrid[emptyTile[0]][emptyTile[1]] = newGrid[x][y];
          newGrid[x][y] = temp;
          const childNode = new Node(newGrid, currentNode, moves[i], 1);
          if (!closedSet.has(childNode)) {
            let foundNode = openSet.find(n => n.grid.toString() === childNode.grid.toString());
            if (!foundNode) {
              openSet.push(childNode);
            } else if (childNode.g < foundNode.g) {
              foundNode.parent = currentNode;
              foundNode.move = moves[i];
            }
          }
        }
      }
      
      // Remove the current node from the open set
            // Remove the current node from the open set
            openSet.splice(openSet.indexOf(currentNode), 1);
        }
        
      }
      alert("HELLO")
      // If we get here, there is no solution
     // Backtrack to find the solution
              

    
     

