import { useState } from 'react';
import { createRound } from './game/roundSetup';
import { EveryoneReady } from './screens/EveryoneReady';
import { Home } from './screens/Home';
import { HowToPlay } from './screens/HowToPlay';
import { ImposterReveal } from './screens/ImposterReveal';
import { PassPhone } from './screens/PassPhone';
import { PlayerCount } from './screens/PlayerCount';
import { PlayerNames } from './screens/PlayerNames';
import { TapToReveal } from './screens/TapToReveal';
import { WordReveal } from './screens/WordReveal';
import type { Player } from './types/game';

type AppScreen =
  | 'home'
  | 'how-to-play'
  | 'player-count'
  | 'player-names'
  | 'pass-phone'
  | 'tap-to-reveal'
  | 'role-reveal'
  | 'everyone-ready';

function App() {
  const [screen, setScreen] = useState<AppScreen>('home');
  const [playerCount, setPlayerCount] = useState(0);
  const [players, setPlayers] = useState<Player[]>([]);
  const [imposterId, setImposterId] = useState<string | null>(null);
  const [secretWord, setSecretWord] = useState<string | null>(null);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

  const startGame = () => setScreen('player-count');

  const startRound = (finalPlayers: Player[]) => {
    const round = createRound(finalPlayers);
    setPlayers(finalPlayers);
    setImposterId(round.imposterId);
    setSecretWord(round.secretWord);
    setCurrentPlayerIndex(0);
    setScreen('pass-phone');
  };

  const advancePastReveal = () => {
    const isLastPlayer = currentPlayerIndex === players.length - 1;
    if (isLastPlayer) {
      setScreen('everyone-ready');
    } else {
      setCurrentPlayerIndex((i) => i + 1);
      setScreen('pass-phone');
    }
  };

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
          onContinue={startRound}
        />
      );

    case 'pass-phone':
      return <PassPhone nextPlayerName={players[currentPlayerIndex].name} onReady={() => setScreen('tap-to-reveal')} />;

    case 'tap-to-reveal':
      return <TapToReveal playerName={players[currentPlayerIndex].name} onReveal={() => setScreen('role-reveal')} />;

    case 'role-reveal':
      // secretWord is always set by startRound before this screen is reachable.
      return players[currentPlayerIndex].id === imposterId ? (
        <ImposterReveal onHideAndPass={advancePastReveal} />
      ) : (
        <WordReveal word={secretWord!} onHideAndPass={advancePastReveal} />
      );

    case 'everyone-ready':
      return (
        <EveryoneReady
          onStartClues={() => console.log('Start Clues — clue-phase screen not implemented yet')}
        />
      );
  }
}

export default App;
