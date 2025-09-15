import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import * as Tone from "tone";

function App() {
  const [count, setCount] = useState(0)
  const synth = new Tone.Synth().toDestination();

  // Schedule notes in sync with the audio clock
  Tone.Transport.scheduleRepeat((time) => {
    synth.triggerAttackRelease("C4", "8n", time); // sample-accurate tick
  }, "4n");

  // Set tempo
  Tone.Transport.bpm.value = 120;

  // Start the transport (starts the audio clock)
  Tone.Transport.start();

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App;
