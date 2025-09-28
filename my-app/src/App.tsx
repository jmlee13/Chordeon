import './index.css';
import './App.css'
import MusicCharacter from './components/MusicCharacter';
import Metronome from './components/Metronome';
import { BeatProvider }  from './components/BeatContext';
import DraggableCharacter from './components/DraggableCharacter';

function App() {
  return (
    <BeatProvider>
      <div>
        <div>
          <Metronome bpm={125}/>
        </div>
        <DraggableCharacter id='kickPattern' soundFile='/audio/harmonix - Track 1.wav' label='kick'/>
        <DraggableCharacter id='melodyPattern' soundFile='/audio/harmonix - Track 2.wav' label='melody'/>
        <MusicCharacter/>
        <MusicCharacter/>
      </div>
      </BeatProvider>
  )
}

export default App;
