/// Represents a possible color that a block can have. Each value does not
/// inherently represent an fixed color; rather, it represents a set of blocks
/// that are to be colored in the same way.
export enum BlockColor {
    IColor,
    JColor,
    LColor,
    OColor,
    SColor,
    TColor,
    ZColor,
}

/// Represents a block, including all its properties, such as its color. The
/// block may be part of the falling piece, or it may be already placed on the
/// matrix.
export class Block {

    /// The group of same-colored blocks that this block belongs to.
    readonly color: BlockColor;

    /// Creates a `Block` from the given `BlockColor`.
    constructor(color: BlockColor) {
        this.color = color;
    }
}

/// Represents a block on the grid and its position.
export class IndexedBlock {

    /// The raw block, without position information.
    readonly block: Block;

    /// The row in which this block is located.
    readonly row: number;

    /// The column in which this block is located.
    readonly col: number;

    /// Creates an `IndexedBlock` from the given raw block, row, and column.
    constructor(block: Block, row: number, col: number) {
        this.block = block;
        this.row = row;
        this.col = col;
    }
}
