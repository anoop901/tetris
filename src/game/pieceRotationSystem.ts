import Piece from './piece';

interface PieceRotationSystem<T extends Piece<T>> {
    rotatedCW(piece: T, isValidFn: (piece: Piece<T>) => boolean): T;
    rotatedCCW(piece: T, isValidFn: (piece: Piece<T>) => boolean): T;
}