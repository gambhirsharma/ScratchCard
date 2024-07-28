import '../index.css'
import React from 'react'

interface ScratchPatchProps {
  width?: number;
}

// setting up dynamic size according to the screen size: 


const ScratchPatch: React.FC<ScratchPatchProps> = ({ width = 400 }) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const cellSize = 3;


  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext('2d');
      if (context) {
        drawGrid(context);
      }
    }
  }, []);

  const drawGrid = (context: CanvasRenderingContext2D) => {
    const width = context.canvas.width;
    const height = context.canvas.height;

    context.clearRect(0, 0, width, height);

    // context.strokeStyle = '#ccc'; // Grid color
    context.fillStyle = "black";

    // Draw vertical lines
    for (let x = 0; x <= width; x += cellSize) {
      context.beginPath();
      context.moveTo(x, 0);
      context.lineTo(x, height);
      context.stroke();
    }

    // Draw horizontal lines
    for (let y = 0; y <= height; y += cellSize) {
      context.beginPath();
      context.moveTo(0, y);
      context.lineTo(width, y);
      context.stroke();
    }
  };

  return (
    <div className="scratch-main"
      style={{ width: `${width}px` }}>
      <div className="scratch-text" >
        0E276E119F21
      </div>
      <canvas
        ref={canvasRef}
        height={width / 6}
        width={width}
        style={{ border: '1px solid black', position: "absolute" }}></canvas>
    </div>
  )
}

export default ScratchPatch


{/* <div className="scratch-main"> */ }
{/*   <div className="scratch-top"> */ }
{/*     <div className="scratch-text"> */ }
{/*     0E276E119F21 */ }
{/*     </div> */ }
{/*   </div> */ }
{/**/ }
{/* </div> */ }

