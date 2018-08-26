import {Block, BlockColor} from "../block";

export default class Matrix {

    readonly numRows: number;
    readonly numCols: number;

    blocks: (Block|null)[][];

    constructor(numRows: number, numCols: number) {
        this.numRows = numRows;
        this.numCols = numCols;

        this.blocks = new Array(numRows);
        for (let r = 0; r < numRows; r++) {
            this.blocks[r] = new Array(numCols).fill(null);
        }
        this.blocks[0][0] = new Block(BlockColor.IColor);
        console.log(this.blocks[1][0]);
    }

    
}