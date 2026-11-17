<script setup>
import { ref, onMounted, onUnmounted, computed, reactive } from 'vue'  
import { useRouter } from 'vue-router'              
import Graph from 'graphology';
import Board from '../models/Board.js'
import Game from '../models/Game.js'

const game = reactive(new Game(new Board()))

const router = useRouter()        
// dimensions of the game board etc
// const currentGame = reactive(new curentGame())

const padding = game.board.padding
const width = game.board.getBoardWidth()
const height = game.board.getBoardHeight()
const numberOfCols = game.board.tiles[0].length
const numberOfRows = game.board.tiles.length
const celestialBodies = ref(game.board.tiles)

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
    else game.handleCellClick(rowIndex, colIndex)
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
        v-for="(edge, index) in game.stateGraph.edges()"
        :key="index"
        :x1="game.edgeToLine(edge).x1 + 0.5"
        :y1="game.edgeToLine(edge).y1 + 0.5"
        :x2="game.edgeToLine(edge).x2 + 0.5"
        :y2="game.edgeToLine(edge).y2 + 0.5"
        stroke="white"
        stroke-width="0.04"
      /> 
    </svg>

    <template v-for="(row, rowIndex) in celestialBodies" :key="rowIndex">
      <button
        v-for="(cell, colIndex) in row"
        :key="colIndex"
        :class="`celestial-body ${cell}`"
        type="button"
        :style="cellPosition(rowIndex, colIndex)"
        :aria-label="`Select cell at row ${rowIndex + 1}, column ${colIndex + 1}`"
        @click="handleCellClick(rowIndex, colIndex, cell)"
      >
      </button>
    </template>
  </div>
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
  border-radius: 50%;
}

.star {
  background: white;
  cursor: pointer;
}

.planet {
  background: yellow;
  cursor: pointer;
}
</style>