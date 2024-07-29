import '../index.css'
import React from 'react'
import Sketch from '../components/Sketch';

interface ScratchProps {
  width?: number;
  isMouseDown: boolean;
}

const ScratchPath: React.FC<ScratchProps> = ({ width = 400, isMouseDown }) => {
  const [randomString, setRandomString] = React.useState<null | string>(null);
  React.useEffect(() => {
    const generateRandomString = (length: number) => {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let result = '';
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
      }
      console.log(`Random string: ${result}`);
      return result;
    };

    // Generate the random number when the component mounts
    const timer = setTimeout(() => {
      setRandomString(generateRandomString(10));
    }, 500);

    // Cleanup timeout if component unmounts before timeout completes
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="scratch-main"
      style={{ width: `${width}px` }}>
      <Sketch width={600} isMouseDown={isMouseDown} />
      {/* <div className="scratch-text" style={{ display: showText ? "flex" : "none",  }} > */}
      <div className="scratch-text"
        style={{ width: `${width}px`  }}>
        {randomString}
      </div>
    </div>
  )
}

export default ScratchPath

