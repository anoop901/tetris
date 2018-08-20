import { BlockColor, Block, IndexedBlock } from '../block';
import Piece from './piece';

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

/// Represents one of the seven types of tetrominoes.
export enum TetrominoType {
    I, J, L, O, S, T, Z,
}

/// Represents the shape of a piece.
///
/// For each [r, c] in this array, it represents that if the piece were centered
/// at row centerRow and column centerColumn, it would contain a block at row
/// (centerRow + r) and column (centerColumn + c).
export type PieceShape = [number, number][];

const I_BLOCKS: PieceShape = [[0, -1], [0, 0], [0, 1], [0, 2]];
const J_BLOCKS: PieceShape = [[1, -1], [0, -1], [0, 0], [0, 1]];
const L_BLOCKS: PieceShape = [[1, 1], [0, -1], [0, 0], [0, 1]];
const O_BLOCKS: PieceShape = [[1, 0], [1, 1], [0, 0], [0, 1]];
const S_BLOCKS: PieceShape = [[1, 0], [1, 1], [0, -1], [0, 0]];
const T_BLOCKS: PieceShape = [[1, 0], [0, -1], [0, 0], [0, 1]];
const Z_BLOCKS: PieceShape = [[1, -1], [1, 0], [0, 0], [0, 1]];

/// Represents a tetris kick table.
///
/// Indices for offset tables are [STATE][ATTEMPT #][ROW (0) / COL (1)]
/// Rotating from state A to state B calculate the offset sequence by taking
/// (offset row, offset col) := (table[A][n][0] - table[B][n][0], table[A][n][1] - table[B][n][1])
/// where each n is attempted in order 0 ... N
export type KickTable = [number, number][][];

const O_KICK_OFFSET_TABLE: KickTable = [
    [[0, 0]], // INITIAL
    [[-1, 0]], // RIGHT
    [[-1, -1]], // 2 ROTATIONS
    [[0, -1]]  // LEFT
];
const I_KICK_OFFSET_TABLE: KickTable = [
    [[0, 0], [0, -1], [0, 2], [0, -1], [0, 2]], // INITIAL
    [[0, -1], [0, 0], [0, 0], [1, 0], [-2, 0]], // RIGHT
    [[1, -1], [1, 1], [1, -2], [0, 1], [0, -2]], // 2 ROTATIONS
    [[1, 0], [1, 0], [1, 0], [-1, 0], [2, 0]]  // LEFT
];
const J_L_S_T_Z_KICK_OFFSET_TABLE: KickTable = [
    [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0]], // INITIAL
    [[0, 0], [0, 1], [-1, 1], [2, 0], [2, 1]], // RIGHT
    [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0]], // 2 ROTATIONS
    [[0, 0], [0, -1], [-1, -1], [2, 0], [2, -1]]  // LEFT
];

/// A map that maps each tetromino type to its shape, in spawn orientation.
export const tetrominoShapeMap:Map<TetrominoType, PieceShape> = new Map();
tetrominoShapeMap.set(TetrominoType.I, I_BLOCKS);
tetrominoShapeMap.set(TetrominoType.J, J_BLOCKS);
tetrominoShapeMap.set(TetrominoType.L, L_BLOCKS);
tetrominoShapeMap.set(TetrominoType.O, O_BLOCKS);
tetrominoShapeMap.set(TetrominoType.S, S_BLOCKS);
tetrominoShapeMap.set(TetrominoType.T, T_BLOCKS);
tetrominoShapeMap.set(TetrominoType.Z, Z_BLOCKS);

/// A map that maps each tetromino type to its kick table.
export const tetrominoKickTableMap:Map<TetrominoType, KickTable> = new Map();
tetrominoKickTableMap.set(TetrominoType.I, I_KICK_OFFSET_TABLE);
tetrominoKickTableMap.set(TetrominoType.J, J_L_S_T_Z_KICK_OFFSET_TABLE);
tetrominoKickTableMap.set(TetrominoType.L, J_L_S_T_Z_KICK_OFFSET_TABLE);
tetrominoKickTableMap.set(TetrominoType.O, O_KICK_OFFSET_TABLE);
tetrominoKickTableMap.set(TetrominoType.S, J_L_S_T_Z_KICK_OFFSET_TABLE);
tetrominoKickTableMap.set(TetrominoType.T, J_L_S_T_Z_KICK_OFFSET_TABLE);
tetrominoKickTableMap.set(TetrominoType.Z, J_L_S_T_Z_KICK_OFFSET_TABLE);
