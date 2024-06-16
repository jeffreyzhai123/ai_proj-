import Home from './Home';
import Practice from './Practice'; 
import Test from './Test';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;