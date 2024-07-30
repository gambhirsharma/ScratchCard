import '../index.css'
// import { Volume2, VolumeX } from 'lucide-react'
import React from "react"

const Header: React.FC = () =>{
  // const [sound, setSound] = React.useState(false)
  // const handleSound = () => {
  //   setSound(!sound)
  // }
  return (
    <div className='header'>
      {/* <RotateCw style={{ margin: "0 30px" }} /> */}
      {/* <div onClick={handleSound} */}
      {/* > */}
      {/*   { */}
      {/*     sound ? <Volume2 /> : <VolumeX /> */}
      {/*   } */}
      {/* </div> */}
      <h1 className='header-title'>scratch it :)</h1>
    </div>
  )
}

export default Header
