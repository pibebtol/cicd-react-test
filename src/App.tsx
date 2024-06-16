import './App.css';
import { Route, Routes } from 'react-router-dom';
import TrainerPoC from './training/TrainerPoC.tsx';
import Home from './home/Home.tsx';
import About from './about/About.tsx';
import Configure from './configure/Configure.tsx';
import { pages } from './general/constants.ts';

function App() {
  return (
    <>
      <Routes>
        <Route path={pages[0].path} element={<Home />} />
        <Route path={pages[1].path} element={<TrainerPoC />} />
        <Route path={pages[2].path} element={<Configure />} />
        <Route path={pages[3].path} element={<About />} />
      </Routes>
    </>
  );
}

export default App;
