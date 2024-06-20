import Home from './Home';
import Practice from './Practice'; 
import Test from './Test';
import Stats from './Stats'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PrivateRoute from './PrivateRoute';
import './App.css';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/practice" element={<PrivateRoute element={Practice} />} />
          <Route path="/test" element={<PrivateRoute element={Test} />} />
          <Route path="/stats" element={<PrivateRoute element={Stats} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;