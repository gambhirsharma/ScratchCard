import React from 'react'
interface CoinProps {
  setIsMouseDown: (isMouseDown: boolean) => void;
}
const Coin: React.FC<CoinProps> = ({ setIsMouseDown }) => {
  const [position, setPosition] = React.useState({ x: 950, y: 500 })
  const coinRef = React.useRef<HTMLDivElement>(null)

  let mouseStartPos = { x: 0, y: 0 };

  const setNewOffset = (coin: React.RefObject<HTMLDivElement>, mouseMoveDir = { x: 0, y: 0 }) => {
    if (coin.current !== null) {
      const offsetLeft = coin.current.offsetLeft - mouseMoveDir.x;
      const offsetTop = coin.current.offsetTop - mouseMoveDir.y;

      return {
        x: offsetLeft < 0 ? 0 : offsetLeft,
        y: offsetTop < 0 ? 0 : offsetTop,
      };
    }
  };

  // mousDown
  const mouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (coinRef.current !== null) {
      coinRef.current.classList.add('transformed');
      // console.log(`Position: ${e.clientX}, ${e.clientY}`);
      mouseStartPos.x = e.clientX;
      mouseStartPos.y = e.clientY;

      document.addEventListener("mousemove", mouseMove);
      document.addEventListener("mouseup", mouseUp);
      setIsMouseDown(true);

    }
  };

  // mouseMove
  const mouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {

    // console.log(`mouseMove: ${e.clientX}, ${e.clientY}`);
    //1 - Calculate move direction
    let mouseMoveDir = {
      x: mouseStartPos.x - e.clientX,
      y: mouseStartPos.y - e.clientY,
    };

    //2 - Update start position for next move.
    mouseStartPos.x = e.clientX;
    mouseStartPos.y = e.clientY;

    //3 - Update card top and left position.
    const newPosition = setNewOffset(coinRef, mouseMoveDir);
    setPosition(newPosition);

  }
  // mouseUp
  const mouseUp = () => {
    // console.log(`mouseUP`)
    if (coinRef.current !== null) {
      coinRef.current.classList.remove('transformed');
    }
    document.removeEventListener("mousemove", mouseMove);
    document.removeEventListener("mouseup", mouseUp);

      setIsMouseDown(false);
    // const newPosition = setNewOffset(coinRef); //{x,y}
    // saveData("position", newPosition);
  }
  return (
    <div className="coin" ref={coinRef} onMouseDown={mouseDown}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`
      }}>
    </div>
  )
}

export default Coin
