import { Tetromino, TetrominoType} from "./game/piece/tetromino";
import Matrix from "./game/matrix/matrix";

const canvas = document.createElement('canvas');
document.body.appendChild(canvas);

const context = canvas.getContext('2d')!;

context.fillStyle = 'green';
context.fillRect(10, 20, 30, 40);

const tPiece: Tetromino = new Tetromino(TetrominoType.T, 0, 0, 0);

for (const block of tPiece.getBlocks()) {
    console.log(block);
}

const rotatedTPiece = tPiece.rotatedCW((p)=>true);

for (const block of rotatedTPiece.getBlocks()) {
    console.log(block);
}

const matrix: Matrix = new Matrix(2,2);