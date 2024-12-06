import { useReducer } from 'react';
import './App.css';
import Board from './components/Board/Board';
import AppContext from './contexts/Context';
import { reducer } from './reducer/reducer';
import { getGameStateFromFen } from './utils/helper';
import { startingPositionFen } from './const';

function App() {
  const [appState, dispatch] = useReducer(reducer, getGameStateFromFen(startingPositionFen));

  const providerState = {
    appState,
    dispatch
  }

  return (
    <AppContext.Provider value={providerState}>
      <div className="App">
        <Board/>
      </div>
    </AppContext.Provider>
    
  );
}

export default App;
