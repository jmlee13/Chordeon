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
        <DraggableCharacter id='kickPattern' soundFile='/audio/edm1kick.wav' label='kick' strokeColor='#ED2F07'/>
        <DraggableCharacter id='melodyPattern' soundFile='/audio/edm2snare.wav' label='snare' strokeColor='#30C0FF'/>
        <DraggableCharacter id='kickPattern' soundFile='/audio/edm3hihats.wav' label='hihats' strokeColor='#F6FF4A'/>
        <DraggableCharacter id='melodyPattern' soundFile='/audio/edm4chords.wav' label='chords' strokeColor='#38FF41'/>
        <DraggableCharacter id='melodyPattern' soundFile='/audio/edm6bass.wav' label='bass' strokeColor='#B533FF'/>
        <DraggableCharacter id='melodyPattern' soundFile='/audio/edm7plunks.wav' label='plunks' strokeColor='#B533FF'/>
        <DraggableCharacter id='melodyPattern' soundFile='/audio/edm10shaker.wav' label='shake' strokeColor='#B533FF'/>
        <DraggableCharacter id='melodyPattern' soundFile='/audio/edm11reverbclap.wav' label='clap echo' strokeColor='#B533FF'/>
        <DraggableCharacter id='melodyPattern' soundFile='/audio/edm12sub.wav' label='sub' strokeColor='#B533FF'/>
        <DraggableCharacter id='melodyPattern' soundFile='/audio/edm13ride.wav' label='ride' strokeColor='#B533FF'/>
        <DraggableCharacter id='melodyPattern' soundFile='/audio/edm14toms.wav' label='toms' strokeColor='#B533FF'/>
        <DraggableCharacter id='melodyPattern' soundFile='/audio/edm15claps.wav' label='claps' strokeColor='#B533FF'/>
        <DraggableCharacter id='melodyPattern' soundFile='/audio/edm16hey.wav' label='hey' strokeColor='#B533FF'/>
        <div className = 'flex justify-self-start'>
        <MusicCharacter/>
        <MusicCharacter/>
        <MusicCharacter/>
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
