import { TetrominoType, tetrominoShapeMap } from "../data/tetrominoData";
import { BlockColor, Block, IndexedBlock } from '../block';
import Piece from '../piece';

/// Information about a falling tetromino, including its type, current position,
/// and current orientation. This type is immutable.
export class Tetromino implements Piece<Tetromino> {

    /// The type of tetromino.
    readonly tetrominoType: TetrominoType;

    /// The row number of the center of the tetromino. (0 is bottom row.)
    readonly row: number;

    /// The column number of the center of the tetromino. (0 is leftmost column.)
    readonly col: number;

    // TODO: maybe make this a class Orientation which can be rotated between predefined states
    /// The orientation of the tetromino.
    ///
    /// - 0 represents the spawn position
    /// - 1 represents an orientation rotated clockwise 90 degrees from the
    ///   spawn position
    /// - 2 represents an oriented rotated 180 degrees from the spawn position
    /// - 3 represents an orientation rotated counter-clockwise 90 degrees from
    ///   the spawn position
    readonly orientation: number;

    /// Creates a tetromino with the given type, center row and column, and
    /// orientation.
    constructor(tetrominoType: TetrominoType, row: number, col: number, orientation: number) {
        this.tetrominoType = tetrominoType;
        this.row = row;
        this.col = col;
        this.orientation = orientation;
    }

    *getBlocks(): Iterable<IndexedBlock> {
        // TODO: Make a color map
        const block: Block = new Block(BlockColor.IColor);
        for (const baseBlockPos of tetrominoShapeMap.get(this.tetrominoType)!) {
            switch(this.orientation) {
                case 0:
                    yield new IndexedBlock(block, baseBlockPos[0], baseBlockPos[1]);
                    break;
                case 1:
                    yield new IndexedBlock(block, -baseBlockPos[1], baseBlockPos[0]);
                    break;
                case 2:
                    yield new IndexedBlock(block, -baseBlockPos[0], -baseBlockPos[1]);
                    break;
                case 3:
                    yield new IndexedBlock(block, baseBlockPos[1], -baseBlockPos[0]);
                    break;
            }
        }
    }    

    translated(dRow: number, dCol: number): Tetromino {
        return new Tetromino(this.tetrominoType, this.row + dRow, this.col + dCol, this.orientation);
    }

    rotatedCW(): Tetromino {
        return new Tetromino(this.tetrominoType, this.row, this.col, (this.orientation + 1) % 4);
    }

    rotatedCCW(): Tetromino {
        return new Tetromino(this.tetrominoType, this.row, this.col, (this.orientation + 3) % 4);
    }
}
