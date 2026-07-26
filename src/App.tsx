import { Home } from './screens/Home';

function App() {
  return (
    <Home
      onStartGame={() => console.log('Start Game — player-count screen not implemented yet')}
      onHowToPlay={() => console.log('How to Play — screen not implemented yet')}
    />
  );
}

export default App;
