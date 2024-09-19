import './App.css';
import Form from "./components/Form"
import Submission from "./components/Submission"
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Main from './components/Main';
import {useState} from 'react';


function App() {
  const [archetype, setArchetype] = useState([]);
  const [archetypeLoaded, setArchetypeLoaded] = useState(false);
  return (
    <>
    <Router>
      <Routes>
        <Route exact path="/" element={<Main key = "FileUploadPage"  archetypeLoaded = {archetypeLoaded} setArchetypeLoaded = {setArchetypeLoaded} archetype={archetype} setArchetype = {setArchetype}/>}></Route>
        <Route exact path="/archetype/:rmType/:archetypeId" element={<Form key = "Archetype" archetypeLoaded = {archetypeLoaded} setArchetypeLoaded = {setArchetypeLoaded} archetype={archetype} setArchetype = {setArchetype}/>}></Route>
        <Route exact path="/archetype/:rmType/:archetypeId/submission" element={<Submission key = "Submission" archetypeLoaded = {archetypeLoaded} setArchetypeLoaded = {setArchetypeLoaded} archetype={archetype} setArchetype = {setArchetype}/>}></Route>
      </Routes>
    </Router>
    </>
  );
}

export default App;
