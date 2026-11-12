<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'  
import { useRouter } from 'vue-router'              
import Graph from 'graphology';

const router = useRouter()        
// dimensions of the game board etc
const numberOfRows = ref(11)
const numberOfCols = ref(10)
const cellHeight = ref(50)
const cellWidth = ref(50)
const boardPadding = ref(25)
const svgWidth = numberOfCols.value * cellWidth.value + boardPadding.value 
const svgHeight = numberOfRows.value * cellHeight.value + boardPadding.value 

const boardArray = ref(new Array(numberOfRows.value).fill(null).map(() => new Array(numberOfCols.value).fill('star'))) // Initialize the board with 'star'
const stateGraph = ref(new Graph()) 
const graphNumberOfEdges = ref(0)
const onGraphChange = () => graphVersion.value++
const firstStar = ref(null)
const lines = ref([])


function setupNewGame() {         
    setUpBoard()
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
    // two (random) edges are present
    lines.value = [
        { x1: getCenter(0, 1).x, y1: getCenter(0, 1).y, x2: getCenter(1,1).x, y2: getCenter(1, 1).y },
        // { x1: getCenter(3, 4).x, y1: getCenter(3, 4).y, x2: getCenter(4, 5).x, y2: getCenter(4, 5).y }
    ]
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
        graphNumberOfEdges.value++
        firstStar.value = null
        // const edges = stateGraph.value.edges()
        // console.log("edges: " + stateGraph.value.source(edges[0])) 
        // updateLines()
    }
    console.log("lines: " + lines)
}

// Calculate center of a cell in pixels
function getCenter(row, col) {
  return {
    x: boardPadding.value + col * (cellWidth.value) + cellWidth.value / 2,
    y: boardPadding.value + row * (cellHeight.value) + cellHeight.value / 2
  }
}


// lines.value = computed(() => {
//   return stateGraph.value.edges().map(c => {
//     const a = getCenter(1,2)
//     const b = getCenter(2,3)
//     console.log("got here !")
//     // const a = getCenter(c.source, c.target)
//     // const b = getCenter(c.source, c.target)
//     console.log("coordinate!"+ a.x +","+ a.y)
//     return { x1: a.x, y1: a.y, x2: b.x, y2: b.y }
//   })
// })

onMounted(() => {
  setupNewGame()
  stateGraph.value.on('addEdge', onGraphChange)
})

onUnmounted(() => {
  console.log('Game ended:')
})
</script>


<template>
  <div style="padding: 2rem;">
    <h1>current game</h1>  
    <button @click="router.push('/')">Home</button>
  </div>
  <div class="board-wrapper"> 
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
  <svg class="line-overlay" :viewBox="viewBox" preserveAspectRatio="none">
      <line
        v-for="(line, i) in lines"
        :key="i"
        :x1="line.x1"
        :y1="line.y1"
        :x2="line.x2"
        :y2="line.y2"
        stroke="red"
        stroke-width="5"
        stroke-linecap="round"
      />
    </svg>
 </div>
</template>

<style scoped>

.star-cell {
  font-size: 1.5rem;
  cursor: pointer;
  color: white;
  border: 2px solid white;
  background-color: white;
  border-radius: v-bind(0.1* cellWidth + "px");
  width: v-bind(0.2 * cellWidth + "px");
  height: v-bind(0.2 * cellHeight+ "px");
}

.planet-cell {
  font-size: 1.5rem;
  cursor: pointer;
  color: pink;
  background-color: pink;
  border: 2px solid black;
  border-radius: v-bind(0.1* cellWidth + "px");
  width: v-bind(0.2 * cellWidth + "px");
  height: v-bind(0.2 * cellHeight+ "px");
}

.gameboard {
  color: white;
  border: 15px black;
  background-color: darkblue;
  width: v-bind(svgWidth + "px");
  height: v-bind(svgHeight + "px");
  /* width: v-bind(numberOfCols * cellWidth + 1 * boardPadding + "px");
  height: v-bind(numberOfRows * cellHeight + 1 * boardPadding + "px"); */
  max-width: 600px;
  margin: 100px;
}

.board-grid {
  padding: v-bind(boardPadding + "px");
  display: grid;
  grid-template-rows: repeat(v-bind(numberOfRows), v-bind(cellHeight + "px")); 
  grid-template-columns: repeat(v-bind(numberOfCols), v-bind(cellWidth + "px"));
  /* gap: 2px; */
}

.line-overlay {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 10;
}

.board-wrapper {
  position: relative; /* ← establishes context for absolute children */
  display: inline-block; /* shrinks to fit grid exactly */
}
</style>

