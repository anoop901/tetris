
const canvas = document.createElement('canvas');
document.body.appendChild(canvas);

const context = canvas.getContext('2d')!;

context.fillStyle = 'green';
context.fillRect(10, 20, 30, 40);
