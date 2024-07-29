import { useRef, useEffect } from 'react';
import p5 from 'p5';
// import "p5/lib/addons/p5.sound"

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
    const canvasHeight = width / 6;

    const sketch = (p: p5) => {
      let squareSize = 10;
      let cols: number, rows: number;
      let grid: (number | never | boolean)[][] = [];
      // let sound: any;

      // p.preload = () => {
      //
      //   sound = p5.sourceFile('../../public/sound.mp3'); // Replace with the path to your sound file
      // };

      p.setup = () => {
        if (canvasRef.current) {
          p.createCanvas(canvasWidth, canvasHeight).parent(canvasRef.current);
        }
        p.noStroke();

        cols = p.width / squareSize;
        rows = p.height / squareSize;

        grid = Array.from({ length: cols }, () => Array(rows).fill(false));
      };

      p.draw = () => {
        p.clear();

        const startColor = p.color(159, 158, 160);
        const middleColor = p.color(215, 215, 215);
        const endColor = p.color(159, 158, 160);

        for (let i = 0; i < cols; i++) {
          for (let j = 0; j < rows; j++) {
            if (
              isMouseDownRef.current &&
              p.mouseX > i * squareSize &&
              p.mouseX < i * squareSize + squareSize &&
              p.mouseY > j * squareSize &&
              p.mouseY < j * squareSize + squareSize
            ) {
              // if (!grid[i][j]) {
              //   sound.play();
              // }
              grid[i][j] = true;
            }
            const colFraction = i / (cols - 1); // Calculate fraction of column position

            // Determine if the current square is in the first half or the second half
            let gradientColor;
            if (colFraction <= 0.5) {
              // Interpolate from startColor to middleColor
              gradientColor = p.lerpColor(startColor, middleColor, colFraction * 2);
            } else {
              // Interpolate from middleColor to endColor
              gradientColor = p.lerpColor(middleColor, endColor, (colFraction - 0.5) * 2);
            }

            // @ts-ignore
            p.fill(grid[i][j] ? 'rgba(255, 255, 255, 0)' : gradientColor);
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
