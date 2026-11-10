<script setup>
import { ref, onMounted, onUnmounted } from 'vue'  
import { useRouter } from 'vue-router'              
import Graph from 'graphology';

const router = useRouter()        
// const gameId = ref(null)          
// const startTime = ref(null)       
const numberOfRows = ref(11)
const numberOfCols = ref(10)
const boardArray = ref(new Array(numberOfRows.value).fill(null).map(() => new Array(numberOfCols.value).fill('star'))) // Initialize the board with 'star'
const stateGraph = ref(new Graph()) 
const firstStar = ref(null)


function setupNewGame() {         
//   gameId.value = Math.random().toString(36).substring(7)
//   startTime.value = new Date().toLocaleTimeString()
    setUpBoard()
    console.log('Number of edges', stateGraph.value.size);
    console.log('Number of nodes', stateGraph.value.order);
    console.log('New game started:')
}

function setUpBoard(){
    // three random planets
    for (let i = 0; i < 3; i++) {
        const randomRow = Math.floor(Math.random() * numberOfRows.value)
        const randomCol = Math.floor(Math.random() * numberOfCols.value)
        boardArray.value[randomRow][randomCol] = 'planet'
    }
    for(let i = 0; i < numberOfRows.value; i++){
        for(let j = 0; j < numberOfCols.value; j++){
            stateGraph.value.addNode(`(${i},${j})`)
        }
    }
    console.log(stateGraph.value.nodes(0))
}

function handleCellClick(rowIndex, colIndex, cellType) {  
    if(cellType === 'planet'){
        alert('You cannot connect a planet')
        return
    }
    console.log(`Cell clicked at row ${rowIndex}, col ${colIndex}, type: ${cellType}`)
    if(firstStar.value == null){
        firstStar.value = { row: rowIndex, col: colIndex }
    } else if(firstStar.value.row === rowIndex && firstStar.value.col === colIndex){
        firstStar.value = null
    } else {
        stateGraph.value.addEdge(`(${firstStar.value.row},${firstStar.value.col})`, `(${rowIndex},${colIndex})`)
        console.log(`Added a new edge: (${firstStar.value.row},${firstStar.value.col}) -> (${rowIndex},${colIndex})`)
        firstStar.value = null
    }
    // Here you can implement the logic for what happens when a cell is clicked
    // For example, you might want to update the boardArray or the stateGraph
}

onMounted(() => {
  setupNewGame()
})

onUnmounted(() => {
  console.log('Game ended:')
})
  // todo:
  // make the width of buttons into a variable and adjust to total board width
  // 
</script>


<template>
  <div style="padding: 2rem;">
    <h1>current game</h1>  
    <!-- <p>Game ID: {{ gameId }} (started at {{ startTime }})</p> -->
    <button @click="router.push('/')">Home</button>
  </div>
  <div class="gameboard">
    <div class="board-grid">
      <template v-for="(row, rowIndex) in boardArray" :key="rowIndex" class="board-row">
        <button
          :class="cell + '-cell'"
          v-for="(cell, colIndex) in row"
          :key="colIndex"
          @click="handleCellClick(rowIndex, colIndex, cell)"
        >
        </button>
      </template>
    </div>
  </div>
</template>

<style scoped>
:global(:root) {
  --cell-size: 50px; /* Adjust this value to change the size of the cells */
  --board-padding: 25px; /* Adjust this value to change the padding around the board */
  --board-width: calc(10 * var(--cell-size) + 2 * var(--board-padding)); 
  --board-height: calc(11 * var(--cell-size) + 2 * var(--board-padding) + 50) ;
}

.star-cell {
  font-size: 1.5rem;
  cursor: pointer;
  color: white;
  border: 2px solid white;
  background-color: white;
  border-radius: 5px;
  width: 10px;
  height: 10px;
}

.planet-cell {
  font-size: 1.5rem;
  cursor: pointer;
  color: pink;
  background-color: pink;
  border: 2px solid black;
  border-radius: 6px;
  width: 12px;
  height: 12px;
}

.gameboard {
  color: white;
  border: 15px black;
  background-color: darkblue;
  width: var(--board-width)px;
  height: var(--board-height)px;
  max-width: 600px;
  margin: 100px;
}

.board-grid {
  padding: var(--board-padding);
  display: grid;
  grid-template-rows: repeat(11, var(--cell-size)); 
  grid-template-columns: repeat(10, var(--cell-size));
  gap: 2px;
}

</style>

