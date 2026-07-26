import { useState } from 'react';
import { Home } from './screens/Home';
import { HowToPlay } from './screens/HowToPlay';
import { PlayerCount } from './screens/PlayerCount';

type AppScreen = 'home' | 'how-to-play' | 'player-count';

function App() {
  const [screen, setScreen] = useState<AppScreen>('home');

  const startGame = () => setScreen('player-count');

  switch (screen) {
    case 'home':
      return <Home onStartGame={startGame} onHowToPlay={() => setScreen('how-to-play')} />;
    case 'how-to-play':
      return <HowToPlay onBack={() => setScreen('home')} onStartGame={startGame} />;
    case 'player-count':
      return (
        <PlayerCount
          onBack={() => setScreen('home')}
          onContinue={(count) =>
            console.log(`Continue — player-names screen not implemented yet (count=${count})`)
          }
        />
      );
  }
}

export default App;
