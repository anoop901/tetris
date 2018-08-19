import {TetrominoType, tetrominoShapeMap, tetrominoKickTableMap} from "./TetrominoData";

enum BlockColor {
    IColor,
    JColor,
    LColor,
    OColor,
    SColor,
    TColor,
    ZColor,
}

class Block {
    readonly color: BlockColor;
    constructor(color: BlockColor) {
        this.color = color;
    }
}

class IndexedBlock {
    readonly block: Block;
    readonly row: number;
    readonly col: number;

    constructor(block: Block, row: number, col: number) {
        this.block = block;
        this.row = row;
        this.col = col;
    }
}

interface Piece<T extends Piece<T>> {
    getBlocks(): Iterable<IndexedBlock>;
    translated(dRow: number, dCol: number): T;
    rotatedCW(): T;
    rotatedCCW(): T;
}

interface PieceRotationSystem<T extends Piece<T>> {
    rotatedCW(piece: T, isValidFn: (piece: Piece<T>) => boolean): T;
    rotatedCCW(piece: T, isValidFn: (piece: Piece<T>) => boolean): T;

}

export class Tetromino implements Piece<Tetromino> {

    readonly tetrominoType: TetrominoType;
    readonly row: number;
    readonly col: number;
    // TODO: maybe make this a class Orientation which can be rotated between predefined states
    readonly orientation: number;


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