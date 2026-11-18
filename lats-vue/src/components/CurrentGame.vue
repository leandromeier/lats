<script setup>
import { ref, onMounted, onUnmounted, computed, reactive } from 'vue'  
import { useRouter } from 'vue-router'              
import Graph from 'graphology';
import Board from '../models/Board.js'
import Game from '../models/Game.js'

const router = useRouter()        

const game = reactive(new Game(new Board()))
const boards = game.boards
const playerBoard = boards[0] // default, but needs to be adapted in time

const padding = boards[0].padding
const width = boards[0].getBoardWidth()
const height = boards[0].getBoardHeight()
const numberOfCols = boards[0].tiles[0].length
const numberOfRows = boards[0].tiles.length
const celestialBodies = ref(boards[0].tiles)

function cellPosition(row, col) {
  return {
    left: `${((col + 0.5) / numberOfCols) * 100}%`,
    top: `${((row + 0.5) / numberOfRows) * 100}%`
  }
}

function handleCellClick(rowIndex, colIndex, cellType) {  
    if(cellType === 'planet'){
        alert('You cannot connect a planet')
        return
    }
    else playerBoard.handleCellClick(rowIndex, colIndex)
  }

</script>

<template>
  <h1>Current Game</h1>
  <div
    class="board"
    :style="{ aspectRatio: `${numberOfCols} / ${numberOfRows}` }"
  >
    <svg
      class="board-art"
      :viewBox="`0 0 ${numberOfCols} ${numberOfRows}`"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <rect
        :width="numberOfCols"
        :height="numberOfRows"
        fill="darkblue"
      />
      <line
        v-for="(edge, index) in playerBoard.stateGraph.edges()"
        :key="index"
        :x1="playerBoard.edgeToLine(edge).x1 + 0.5"
        :y1="playerBoard.edgeToLine(edge).y1 + 0.5"
        :x2="playerBoard.edgeToLine(edge).x2 + 0.5"
        :y2="playerBoard.edgeToLine(edge).y2 + 0.5"
        stroke="white"
        stroke-width="0.04"
      /> 
    </svg>
    <template v-for="(row, rowIndex) in celestialBodies" :key="rowIndex">
      <button
        v-for="(cell, colIndex) in row"
        :key="colIndex"
        :class="`celestial-body ${cell.type} ${cell.selected ? 'selected' : ''}`"
        type="button"
        :style="cellPosition(rowIndex, colIndex)"
        :aria-label="`Select cell at row ${rowIndex + 1}, column ${colIndex + 1}`"
        @click="handleCellClick(rowIndex, colIndex, cell.type)"
      >
      </button>
    </template>
  </div>

  <footer>
    <button @click="router.push('/')">Back to Main Page</button>
  </footer>
</template>


<style scoped>
.board{
  width: 100%;
  max-width: 60em;
  min-width: 20em;
  margin: 0 auto;
  position: relative;
}

.board-art {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.celestial-body {
  width: 1em;
  height: 1em;
  position: absolute;
  transform: translate(-50%, -50%);
  padding: 0;
  border: 0;
  background: transparent;
  overflow: visible;
  cursor: pointer;
}

.star {
  transition: transform 0.15s ease;
}

.star:hover {
  transform: translate(-50%, -50%) scale(1.5);
}

/* cross: vertical and horizontal thin lines */
.star::before {
  content: '';
  position: absolute;
  inset: -0.3em;
  background:
    linear-gradient(white, white) center / 0.08em 100% no-repeat,
    linear-gradient(white, white) center / 100% 0.08em no-repeat;
}

/* circle overlaid on the cross */
.star::after {
  content: '';
  position: absolute;
  inset: 0.05em;
  border-radius: 50%;
  background: white;
}

.star.selected::before {
  background:
    linear-gradient(yellow, yellow) center / 0.08em 100% no-repeat,
    linear-gradient(yellow, yellow) center / 100% 0.08em no-repeat;
}

.star.selected::after {
  background: yellow;
}

.planet {
  font-size: 1.5em;
}

/* planet body */
.planet::before {
  content: '';
  position: absolute;
  inset: 0.15em;
  border-radius: 50%;
  background: #e8d5b0;
}

/* ring, drawn over the body */
.planet::after {
  content: '';
  position: absolute;
  left: -0.25em;
  right: -0.25em;
  top: 0.35em;
  bottom: 0.35em;
  border: 0.107em solid #e8d5b0;
  border-radius: 50%;
  transform: rotate(-20deg);
}
</style>