import React from 'react'
import ScratchPath from '../components/ScratchPath'
import Coin from '../components/Coin'

function CoinScratch() {
  const [isMouseDown, setIsMouseDown] = React.useState(false)
  return (
    <div>
      <ScratchPath width={400} isMouseDown={isMouseDown} />
      <Coin setIsMouseDown={setIsMouseDown} />
    </div>
  )
}

export default CoinScratch
