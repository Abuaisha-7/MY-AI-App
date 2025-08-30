

import { useEffect, useState } from "react"
import { Button } from "./components/ui/button"

function App() {
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch('/api/hello')
      .then(response => response.json())
      .then(data => setMessage(data.message))
  }, [])
  
  return (
    <div className="font-bold p-4 text-3xl">
      <h1>{message}</h1>
      <Button variant="outline"> Click Me</Button>
    </div>
  )
}

export default App
