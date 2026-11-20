import Graph from 'graphology';
import CelestialBody from './CelestialBody.js'
import Card from './Card.js'

export default class SuperCard extends Card {

    constructor(numberOfRows = 4, numberOfCols = 4) {
        super(numberOfRows, numberOfCols)
        this.dummy = null
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