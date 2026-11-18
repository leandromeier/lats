import Board from './Board.js'
export default class CelestialBody {

    constructor(type, board) {
        this.type = type
        this.board = board
        this.row = null
        this.col = null
        this.selected = false
    }

    isNeighborOf(otherCelestialBody) {
        if (this.board !== otherCelestialBody.board) {
            return false
        } else if (this === otherCelestialBody) {
            return false
        }
        let absRowDiff = Math.abs(this.row - otherCelestialBody.row)
        let absColDiff = Math.abs(this.col - otherCelestialBody.col)
        return (Math.max(absRowDiff, absColDiff) <= 1)
    }

}
