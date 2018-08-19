import { IndexedBlock } from './block'

/// Information about an arbitrary falling piece.
///
/// Type parameters:
/// `T`
///     The type of piece that this transforms into. This is usually the same
///     as the implementing class.
export default interface Piece<T extends Piece<T>> {

    /// Returns an iterable over the blocks that this piece is made up of, along
    /// with their positions.
    getBlocks(): Iterable<IndexedBlock>;

    /// Returns the piece that this piece would become if it is translated by
    /// the given row and column offset.
    translated(dRow: number, dCol: number): T;

    /// Returns the piece that this piece would become if it is rotated
    /// clockwise by 90 degrees. If the piece can't rotate, returns the same
    /// piece back.
    rotatedCW(): T;

    /// Returns the piece that this piece would become if it is rotated
    /// counter-clockwise by 90 degrees. If the piece can't rotate, returns the
    /// same piece back.
    rotatedCCW(): T;
}
