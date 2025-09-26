import './App.css'
import MusicCharacter from './components/MusicCharacter';
import Metronome from './components/Metronome';
import { BeatProvider }  from './components/BeatContext';


function App() {

  return (
    <>
    <BeatProvider>
      <div>
        <div>
          <Metronome bpm={125}/>
        </div>
        <MusicCharacter soundFile='/audio/harmonix - Track 1.wav'/>
        <MusicCharacter soundFile='/audio/harmonix - Track 2.wav'/>
        <MusicCharacter soundFile='/audio/harmonix - Track 3.wav'/>
        <MusicCharacter soundFile='/audio/harmonix - Track 4.wav'/>
        <MusicCharacter soundFile='/audio/harmonix - Track 5.wav'/>
      </div>
      </BeatProvider>
    </>
  )
}

export default App;
