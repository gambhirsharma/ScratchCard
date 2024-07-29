
import { useRef, useEffect } from 'react';
import p5 from 'p5';

interface SketchProps {
  width: number;
  isMouseDown: boolean;
}

const Sketch: React.FC<SketchProps> = ({ width, isMouseDown }) => {
  const canvasRef = useRef(null);

  const isMouseDownRef = useRef(isMouseDown);

  useEffect(() => {
    isMouseDownRef.current = isMouseDown;
  }, [isMouseDown]);

  useEffect(() => {
    const canvasWidth = width;
    const canvasHeight = width / 6; // Adjust this fraction as needed

    const sketch = (p: p5) => {
      let squareSize = 10;
      let cols: number, rows: number;
      let grid: (number | never)[][] = [];

      p.setup = () => {
        p.createCanvas(canvasWidth, canvasHeight).parent(canvasRef.current);
        p.noStroke();

        cols = p.width / squareSize;
        rows = p.height / squareSize;

        grid = Array.from({ length: cols }, () => Array(rows).fill(false));
      };

      p.draw = () => {
        p.clear(); // Clear canvas with transparent background

        for (let i = 0; i < cols; i++) {
          for (let j = 0; j < rows; j++) {
            if (
              isMouseDownRef.current &&
              p.mouseX > i * squareSize &&
              p.mouseX < i * squareSize + squareSize &&
              p.mouseY > j * squareSize &&
              p.mouseY < j * squareSize + squareSize
            ) {
              grid[i][j] = true;
            }

            p.fill(grid[i][j] ? 'rgba(255, 255, 255, 0)' : 128);
            p.rect(i * squareSize, j * squareSize, squareSize, squareSize);
          }
        }
      };
    };

    // Create a new p5 instance and pass the sketch function
    const p5sketch = new p5(sketch);


    return () => {
      // Cleanup p5 instance on component unmount
      // p5.instances.forEach(instance => instance.remove());
      // console.log(`instance: ${JSON.stringify(p5sketch)}`)
      p5sketch.remove();
    };
  }, [width]);

  return <div ref={canvasRef} style={{ zIndex: 4, display: "flex", alignItems: "center", justifyContent: "center" }}></div>;
};

export default Sketch;
