import Graph from 'graphology';
import CelestialBody from './CelestialBody.js'
import GridGraph from './GridGraph.js'

export default class Card extends GridGraph {

    constructor(numberOfRows = 4, numberOfCols = 4) {
        super(numberOfRows, numberOfCols)
    }

    setUpCard() {
        super.setUpGrid()
        //     this.tiles = new Array(this.numberOfRows).fill(null).map(() =>
        //         new Array(this.numberOfCols).fill(null).map(() => new CelestialBody('star', this)))
    }
}