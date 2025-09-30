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
        <Metronome/>
        <div className = 'flex justify-center gap-2'>
        <MusicCharacter/>
        <MusicCharacter/>
        <MusicCharacter/>
        <MusicCharacter/>
        <MusicCharacter/>
        <MusicCharacter/>
        <MusicCharacter/>
        </div>
        <div className='w-screen h-[100px]'></div>
        <div className = 'flex justify-start'>
        <DraggableCharacter id='kickPattern' soundFile='/audio/edm1kick.wav' label='kick' strokeColor='#ED2F07'/>
        <DraggableCharacter id='snarePattern' soundFile='/audio/edm2snare.wav' label='snare' strokeColor='#30C0FF'/>
        <DraggableCharacter id='hihatsPattern' soundFile='/audio/edm3hihats.wav' label='hihats' strokeColor='#F6FF4A'/>
        <DraggableCharacter id='chordsPattern' soundFile='/audio/edm5chords.wav' label='chords' strokeColor='#38FF41'/>
        <DraggableCharacter id='bassPattern' soundFile='/audio/edm6bass.wav' label='bass' strokeColor='#B533FF'/>
        <DraggableCharacter id='plunksPattern' soundFile='/audio/edm7plunks.wav' label='plunks' strokeColor='#4133ffff'/>
        <DraggableCharacter id='shakerPattern' soundFile='/audio/edm10shaker.wav' label='shake' strokeColor='#FFCB4F'/>
        <DraggableCharacter id='reverbclapPattern' soundFile='/audio/edm11reverbclap.wav' label='clap echo' strokeColor='#F3A1FF'/>
        <DraggableCharacter id='subPattern' soundFile='/audio/edm12sub.wav' label='sub' strokeColor='#FF0D87'/>
        <DraggableCharacter id='ridePattern' soundFile='/audio/edm13ride.wav' label='ride' strokeColor='#A3FF7D'/>
        <DraggableCharacter id='tomsPattern' soundFile='/audio/edm14toms.wav' label='toms' strokeColor='#FF9321'/>
        <DraggableCharacter id='clapsPattern' soundFile='/audio/edm15claps.wav' label='claps' strokeColor='#FFFFFF'/>
        <DraggableCharacter id='heyPattern' soundFile='/audio/edm16hey.wav' label='hey' strokeColor='#ADFFFD'/>
        </div>
      </div>
      </BeatProvider>
  )
}

export default App;
