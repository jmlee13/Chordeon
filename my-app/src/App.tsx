import './App.css'
import MusicCharacter from './components/MusicCharacter';
import Metronome from './components/Metronome';
import { BeatProvider }  from './components/BeatContext';
import SampleDragAndDrop from './components/SampleDragAndDrop';


function App() {

  return (
    <>
    <BeatProvider>
      <div>
        <div>
          <Metronome bpm={125}/>
        </div>
        <SampleDragAndDrop onSnap= {() => console.log("snap action triggered")}/>
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
