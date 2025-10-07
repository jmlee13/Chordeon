import './index.css';
import './App.css'
import MusicCharacter from './components/MusicCharacter';
import Metronome from './components/Metronome';
import { BeatProvider }  from './components/BeatContext';
import DraggableCharacter from './components/DraggableCharacter';
import LoopTracker from './components/LoopTracker';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
  return (
    <>
    <h1 className="font-rushblade text-9xl flex justify-center mb-[100px] text-white">Harmonix</h1>
    <BeatProvider>
      <div>
        <Metronome/>
        <LoopTracker/>
        <DndProvider backend={HTML5Backend}>
        <div className = 'flex justify-center gap-2'>
        <MusicCharacter/>
        <MusicCharacter/>
        <MusicCharacter/>
        <MusicCharacter/>
        <MusicCharacter/>
        <MusicCharacter/>
        <MusicCharacter/>
        </div>
        </DndProvider>

        <div className='w-screen'></div>

        <DndProvider backend={HTML5Backend}>
        <div className = "flex justify-center">
        <div className = 'flex justify-center max-w-[900px] flex-wrap gap-5'>
        <DraggableCharacter id='kickPattern' soundFile='/audio/edm1kick.wav' icon='/icons/kick.png' strokeColor='#ED2F07' strokeColorDark='#991a00'/>
        <DraggableCharacter id='snarePattern' soundFile='/audio/edm2snare.wav' icon='/icons/snare.png' strokeColor='#30C0FF' strokeColorDark='#2080ac'/>
        <DraggableCharacter id='hihatsPattern' soundFile='/audio/edm3hihats.wav' icon='/icons/hat.png' strokeColor='#F6FF4A' strokeColorDark='#b7be27'/>
        <DraggableCharacter id='chordsPattern' soundFile='/audio/edm5chords.wav' icon='/icons/chords.png' strokeColor='#38FF41' strokeColorDark='#25c12d'/>
        <DraggableCharacter id='bassPattern' soundFile='/audio/edm6bass.wav' icon='/icons/bass.png' strokeColor='#B533FF' strokeColorDark='#7822aa'/>
        <DraggableCharacter id='plunksPattern' soundFile='/audio/edm7plunks.wav' icon='/icons/plunks.png' strokeColor='#4133ffff' strokeColorDark='#271f93'/>
        <DraggableCharacter id='shakerPattern' soundFile='/audio/edm10shaker.wav' icon='/icons/shaker.png' strokeColor='#FFCB4F' strokeColorDark='#d2a12d'/>
        <DraggableCharacter id='reverbclapPattern' soundFile='/audio/edm11reverbclap.wav' icon='/icons/echoclap.png' strokeColor='#F3A1FF' strokeColorDark='#ca75d7'/>
        <DraggableCharacter id='subPattern' soundFile='/audio/edm12sub.wav' icon='/icons/sub.png' strokeColor='#FF0D87' strokeColorDark='#aa0959'/>
        <DraggableCharacter id='ridePattern' soundFile='/audio/edm13ride.wav' icon='/icons/ride.png' strokeColor='#A3FF7D' strokeColorDark='#72ce4b'/>
        <DraggableCharacter id='tomsPattern' soundFile='/audio/edm14toms.wav' icon='/icons/toms.png' strokeColor='#FF9321' strokeColorDark='#b46918'/>
        <DraggableCharacter id='clapsPattern' soundFile='/audio/edm15claps.wav' icon='/icons/claps.png' strokeColor='#FFFFFF' strokeColorDark='#bfbfbf'/>
        <DraggableCharacter id='heyPattern' soundFile='/audio/edm16hey.wav' icon='/icons/hey.png' strokeColor='#ADFFFD' strokeColorDark='#79d2d1'/>
        </div>
        </div>
        </DndProvider>
      
      </div>
      </BeatProvider>
      </>
  )
}

export default App;
