import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Play from './components/Play/Play';
import LoginSignup from './components/LoginSignup/LoginSignup';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path='/' element={ <LoginSignup /> }></Route>
          <Route path='/play' element={ <Play /> }></Route>
          <Route path='*'></Route>
        </Routes>
        
      </div>
    </Router>
    
  );
}

export default App;
