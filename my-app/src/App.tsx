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
        <DraggableCharacter id='kickPattern' soundFile='/audio/harmonix - Track 1.wav' label='kick' strokeColor='#ED2F07'/>
        <DraggableCharacter id='melodyPattern' soundFile='/audio/harmonix - Track 2.wav' label='melody' strokeColor='#30C0FF'/>
        <DraggableCharacter id='kickPattern' soundFile='/audio/harmonix - Track 3.wav' label='hihats' strokeColor='#F6FF4A'/>
        <DraggableCharacter id='melodyPattern' soundFile='/audio/harmonix - Track 4.wav' label='clap' strokeColor='#38FF41'/>
        <DraggableCharacter id='melodyPattern' soundFile='/audio/harmonix - Track 5.wav' label='bass' strokeColor='#B533FF'/>
        <div className = 'flex justify-self-start'>
        <MusicCharacter/>
        <MusicCharacter/>
        <MusicCharacter/>
        <MusicCharacter/>
        <MusicCharacter/>
        </div>
      </div>
      </BeatProvider>
  )
}

export default App;
