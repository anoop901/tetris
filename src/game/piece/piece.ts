import { IndexedBlock } from '../block'

/// Information about an arbitrary piece.
///
export default interface Piece {

    /// Returns an iterable over the blocks that this piece is made up of, along
    /// with their positions.
    getBlocks(): Iterable<IndexedBlock>;

    /// Returns the piece that this piece would become if it is translated by
    /// the given row and column offset.
    translated(dRow: number, dCol: number): Piece;

    /// Returns the piece that this piece would become if it is rotated
    /// clockwise. If the piece can't rotate returns the original piece.
    rotatedCW(isValidFn: (piece: Piece) => boolean): Piece;

    /// Returns the piece that this piece would become if it is rotated
    /// counter-clockwise. If the piece can't rotate returns the original piece.
    rotatedCCW(isValidFn: (piece: Piece) => boolean): Piece;
}
