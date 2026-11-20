import Graph from 'graphology';
import CelestialBody from './CelestialBody.js'
export default class Card {

    constructor(numberOfRows = 4, numberOfCols = 4) {
        this.padding = 4
        this.tileWidth = 5
        this.tileHeight = 5
        this.numberOfRows = numberOfRows
        this.numberOfCols = numberOfCols
        this.stateGraph = new Graph()
    }

    // since these cards are comparatively small, I want to set them up from an array
    // or string of pairs (a,b), where (a,b) are numbers in {0,...,15} and each pair 
    // represents a line between the two stars at those positions
    // or maybe also number them 00, 01, ... 33 (rc for row r, column c)
    setUpCard() {
        this.tiles = new Array(this.numberOfRows).fill(null).map(() =>
            new Array(this.numberOfCols).fill(null).map(() => new CelestialBody('star', this)))
    }

    setUpGraph(cardContent) {
        for (let i = 0; i < this.numberOfRows; i++) {
            for (let j = 0; j < this.numberOfCols; j++) {
                this.stateGraph.addNode(this.fromTupleToId(i, j))
            }
        }
        cardContent.forEach((pair) => {
            const [start, end] = pair.split(';')
            this.stateGraph.addEdge(start, end)
        })
        // draw two edges
        // the board starts with two lines between stars

    }

    fromTupleToId = (r, c) => `(${r}:${c})`
    fromIdToTuple(id) {
        return id.slice(1, -1).split(':').map(Number)
    }
}