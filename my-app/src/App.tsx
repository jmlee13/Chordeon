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
        
        <div className='w-screen h-[100px]'></div>

        <DndProvider backend={HTML5Backend}>
        <div className = 'flex justify-center'>
        <DraggableCharacter id='kickPattern' soundFile='/audio/edm1kick.wav' icon='/icons/kick.png' strokeColor='#ED2F07' strokeColorDark='#cc2200'/>
        <DraggableCharacter id='snarePattern' soundFile='/audio/edm2snare.wav' icon='/icons/snare.png' strokeColor='#30C0FF' strokeColorDark='#279dd5'/>
        <DraggableCharacter id='hihatsPattern' soundFile='/audio/edm3hihats.wav' icon='/icons/hat.png' strokeColor='#F6FF4A' strokeColorDark='#d1d83e'/>
        <DraggableCharacter id='chordsPattern' soundFile='/audio/edm5chords.wav' icon='/icons/chords.png' strokeColor='#38FF41' strokeColorDark='#2fd838'/>
        <DraggableCharacter id='bassPattern' soundFile='/audio/edm6bass.wav' icon='/icons/bass.png' strokeColor='#B533FF' strokeColorDark='#9129cd'/>
        <DraggableCharacter id='plunksPattern' soundFile='/audio/edm7plunks.wav' icon='/icons/plunks.png' strokeColor='#4133ffff' strokeColorDark='#3127bb'/>
        <DraggableCharacter id='shakerPattern' soundFile='/audio/edm10shaker.wav' icon='/icons/shaker.png' strokeColor='#FFCB4F' strokeColorDark='#d8ac44'/>
        <DraggableCharacter id='reverbclapPattern' soundFile='/audio/edm11reverbclap.wav' icon='/icons/echoclap.png' strokeColor='#F3A1FF' strokeColorDark='#d38cde'/>
        <DraggableCharacter id='subPattern' soundFile='/audio/edm12sub.wav' icon='/icons/sub.png' strokeColor='#FF0D87' strokeColorDark='#d30b6f'/>
        <DraggableCharacter id='ridePattern' soundFile='/audio/edm13ride.wav' icon='/icons/ride.png' strokeColor='#A3FF7D' strokeColorDark='#88d567'/>
        <DraggableCharacter id='tomsPattern' soundFile='/audio/edm14toms.wav' icon='toms' strokeColor='#FF9321' strokeColorDark='#d87e1d'/>
        <DraggableCharacter id='clapsPattern' soundFile='/audio/edm15claps.wav' icon='claps' strokeColor='#FFFFFF' strokeColorDark='#d8d8d8'/>
        <DraggableCharacter id='heyPattern' soundFile='/audio/edm16hey.wav' icon='hey' strokeColor='#ADFFFD' strokeColorDark='#96dcdb'/>
        </div>
        </DndProvider>
      
      </div>
      </BeatProvider>
  )
}

export default App;
