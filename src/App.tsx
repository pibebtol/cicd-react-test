import './App.css';
import { Route, Routes } from 'react-router-dom';
import TrainerPoC from './TrainerPoC.tsx';
import Home from './Home.tsx';
import About from './About.tsx';
import Configure from './Configure.tsx';

function App() {
  return (
    <>
      <Routes>
        <Route path="/cicd-react-test/" element={<Home />} />
        <Route path="/cicd-react-test/train" element={<TrainerPoC />} />
        <Route path="/cicd-react-test/configure" element={<Configure />} />
        <Route path="/cicd-react-test/about" element={<About />} />
      </Routes>
    </>
  );
}

export default App;
