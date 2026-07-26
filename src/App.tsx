import { useState } from 'react';
import { Home } from './screens/Home';
import { HowToPlay } from './screens/HowToPlay';
import { PlayerCount } from './screens/PlayerCount';
import { PlayerNames } from './screens/PlayerNames';
import type { Player } from './types/game';

type AppScreen = 'home' | 'how-to-play' | 'player-count' | 'player-names';

function App() {
  const [screen, setScreen] = useState<AppScreen>('home');
  const [playerCount, setPlayerCount] = useState(0);

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
          onContinue={(count) => {
            setPlayerCount(count);
            setScreen('player-names');
          }}
        />
      );
    case 'player-names':
      return (
        <PlayerNames
          playerCount={playerCount}
          onBack={() => setScreen('player-count')}
          onContinue={(players: Player[]) =>
            console.log('Start Round — pass-phone screen not implemented yet', players)
          }
        />
      );
  }
}

export default App;
