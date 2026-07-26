import { useState } from 'react';
import { Home } from './screens/Home';
import { HowToPlay } from './screens/HowToPlay';

type AppScreen = 'home' | 'how-to-play';

function App() {
  const [screen, setScreen] = useState<AppScreen>('home');

  const startGame = () => console.log('Start Game — player-count screen not implemented yet');

  switch (screen) {
    case 'home':
      return <Home onStartGame={startGame} onHowToPlay={() => setScreen('how-to-play')} />;
    case 'how-to-play':
      return <HowToPlay onBack={() => setScreen('home')} onStartGame={startGame} />;
  }
}

export default App;
