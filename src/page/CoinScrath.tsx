import React from 'react'
import ScratchPath from '../components/ScratchPath'
import Coin from '../components/Coin'
import Header from '../components/Header'
import Footer from '../components/Footer'

function CoinScratch() {
  const [isMouseDown, setIsMouseDown] = React.useState(false)
  return (
    <div style={{}}>
      <Header/>
      <ScratchPath width={400} isMouseDown={isMouseDown} />
      <Coin setIsMouseDown={setIsMouseDown} />
      <Footer />
    </div>
  )
}

export default CoinScratch
