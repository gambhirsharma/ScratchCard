import { Github, Twitter } from 'lucide-react'
import '../index.css'

function Footer() {
  return (
    <div className="footer" style={{}}>
      <a href='https://www.x.com/gambhir_sharma' target="_blank">
      <Twitter />
      </a>
      <a href='https://www.github.com/gambhirsharma' target="_blank">
      <Github />
      </a>
    </div>
  )
}

export default Footer
