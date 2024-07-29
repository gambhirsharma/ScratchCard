import '../index.css'
import { RotateCw, Volume2, VolumeX } from 'lucide-react'
import React from 'react'

function Header() {
  const [sound, setSound] = React.useState(false)
  const handleSound = () => {
    setSound(!sound)
  }
  return (
    <div
      className='header'
    >
      {/* <RotateCw style={{ margin: "0 30px" }} /> */}
      <div onClick={handleSound}
      >
        {
          sound ? <Volume2 /> : <VolumeX />
        }
      </div>
    </div>
  )
}

export default Header
