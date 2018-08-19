export enum TetrominoType {
    I, J, L, O, S, T, Z,
}

export type PieceShape = [number, number][];

const I_BLOCKS: PieceShape = [[0, -1], [0, 0], [0, 1], [0, 2]];
const J_BLOCKS: PieceShape = [[1, -1], [0, -1], [0, 0], [0, 1]];
const L_BLOCKS: PieceShape = [[1, 1], [0, -1], [0, 0], [0, 1]];
const O_BLOCKS: PieceShape = [[1, 0], [1, 1], [0, 0], [0, 1]];
const S_BLOCKS: PieceShape = [[1, 0], [1, 1], [0, -1], [0, 0]];
const T_BLOCKS: PieceShape = [[1, 0], [0, -1], [0, 0], [0, 1]];
const Z_BLOCKS: PieceShape = [[1, -1], [1, 0], [0, 0], [0, 1]];

export type KickTable = [number, number][][];
/*
    Indices for offset tables are [STATE][ATTEMPT #][ROW (0) / COL (1)]
    Rotating from state A to state B calculate the offset sequence by taking
    (offset row, offset col) := (table[A][n][0] - table[B][n][0], table[A][n][1] - table[B][n][1])
    where each n is attempted in order 0 ... N
*/
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

export const tetrominoShapeMap:Map<TetrominoType, PieceShape> = new Map();
tetrominoShapeMap.set(TetrominoType.I, I_BLOCKS);
tetrominoShapeMap.set(TetrominoType.J, J_BLOCKS);
tetrominoShapeMap.set(TetrominoType.L, L_BLOCKS);
tetrominoShapeMap.set(TetrominoType.O, O_BLOCKS);
tetrominoShapeMap.set(TetrominoType.S, S_BLOCKS);
tetrominoShapeMap.set(TetrominoType.T, T_BLOCKS);
tetrominoShapeMap.set(TetrominoType.Z, Z_BLOCKS);

export const tetrominoKickTableMap:Map<TetrominoType, KickTable> = new Map();
tetrominoKickTableMap.set(TetrominoType.I, I_KICK_OFFSET_TABLE);
tetrominoKickTableMap.set(TetrominoType.J, J_L_S_T_Z_KICK_OFFSET_TABLE);
tetrominoKickTableMap.set(TetrominoType.L, J_L_S_T_Z_KICK_OFFSET_TABLE);
tetrominoKickTableMap.set(TetrominoType.O, O_KICK_OFFSET_TABLE);
tetrominoKickTableMap.set(TetrominoType.S, J_L_S_T_Z_KICK_OFFSET_TABLE);
tetrominoKickTableMap.set(TetrominoType.T, J_L_S_T_Z_KICK_OFFSET_TABLE);
tetrominoKickTableMap.set(TetrominoType.Z, J_L_S_T_Z_KICK_OFFSET_TABLE);

