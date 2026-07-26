import { useReducer } from 'react';
import { gameReducer, initialState } from './game/gameReducer';
import { CluePhase } from './screens/CluePhase';
import { EveryoneReady } from './screens/EveryoneReady';
import { FinalResult } from './screens/FinalResult';
import { Home } from './screens/Home';
import { HowToPlay } from './screens/HowToPlay';
import { ImposterGuess } from './screens/ImposterGuess';
import { ImposterReveal } from './screens/ImposterReveal';
import { PassPhone } from './screens/PassPhone';
import { PlayerCount } from './screens/PlayerCount';
import { PlayerNames } from './screens/PlayerNames';
import { ReadyToVote } from './screens/ReadyToVote';
import { TapToReveal } from './screens/TapToReveal';
import { VoteLocked } from './screens/VoteLocked';
import { VoteReveal } from './screens/VoteReveal';
import { VoteSelection } from './screens/VoteSelection';
import { VotesAreIn } from './screens/VotesAreIn';
import { WordReveal } from './screens/WordReveal';

function App() {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  switch (state.screen) {
    case 'home':
      return (
        <Home
          onStartGame={() => dispatch({ type: 'GO_TO', screen: 'player-count' })}
          onHowToPlay={() => dispatch({ type: 'GO_TO', screen: 'how-to-play' })}
        />
      );

    case 'how-to-play':
      return (
        <HowToPlay
          onBack={() => dispatch({ type: 'GO_TO', screen: 'home' })}
          onStartGame={() => dispatch({ type: 'GO_TO', screen: 'player-count' })}
        />
      );

    case 'player-count':
      return (
        <PlayerCount
          onBack={() => dispatch({ type: 'GO_TO', screen: 'home' })}
          onContinue={(count) => dispatch({ type: 'SET_PLAYER_COUNT', count })}
        />
      );

    case 'player-names':
      return (
        <PlayerNames
          playerCount={state.playerCount}
          onBack={() => dispatch({ type: 'GO_TO', screen: 'player-count' })}
          onContinue={(players) => dispatch({ type: 'START_ROUND', players })}
        />
      );

    case 'pass-phone':
      return (
        <PassPhone
          nextPlayerName={state.players[state.currentPlayerIndex].name}
          onReady={() => dispatch({ type: 'GO_TO', screen: 'tap-to-reveal' })}
        />
      );

    case 'tap-to-reveal':
      return (
        <TapToReveal
          playerName={state.players[state.currentPlayerIndex].name}
          onReveal={() => dispatch({ type: 'REVEAL_ROLE' })}
        />
      );

    case 'imposter-reveal':
      return <ImposterReveal onHideAndPass={() => dispatch({ type: 'HIDE_AND_PASS' })} />;

    case 'word-reveal-normal':
      // secretWord is always set by START_ROUND before this screen is reachable.
      return <WordReveal word={state.secretWord!} onHideAndPass={() => dispatch({ type: 'HIDE_AND_PASS' })} />;

    case 'everyone-ready':
      return <EveryoneReady onStartClues={() => dispatch({ type: 'GO_TO', screen: 'clue-phase' })} />;

    case 'clue-phase':
      return (
        <CluePhase
          players={state.players}
          currentPlayerIndex={state.currentClueIndex}
          onBack={() => dispatch({ type: 'GO_TO', screen: 'everyone-ready' })}
          onNextPlayer={() => dispatch({ type: 'NEXT_CLUE_PLAYER' })}
        />
      );

    case 'ready-to-vote':
      return <ReadyToVote onStartVoting={() => dispatch({ type: 'START_VOTING' })} />;

    case 'vote-pass-phone':
      return (
        <PassPhone
          nextPlayerName={state.players[state.currentVoterIndex].name}
          subtitle="Make your vote privately."
          onReady={() => dispatch({ type: 'GO_TO', screen: 'vote-selection' })}
        />
      );

    case 'vote-selection':
      return (
        <VoteSelection
          players={state.players}
          onBack={() => dispatch({ type: 'GO_TO', screen: 'vote-pass-phone' })}
          onLockIn={(votedForId) => dispatch({ type: 'LOCK_IN_VOTE', votedForId })}
        />
      );

    case 'vote-locked':
      return <VoteLocked onNext={() => dispatch({ type: 'NEXT_VOTER' })} />;

    case 'votes-are-in':
      return <VotesAreIn onRevealVotes={() => dispatch({ type: 'REVEAL_VOTES' })} />;

    case 'vote-reveal': {
      const tally = state.tally!;
      if (tally.winnerId === null) {
        return <VoteReveal isTie onVoteAgain={() => dispatch({ type: 'VOTE_AGAIN' })} />;
      }
      const votedPlayer = state.players.find((p) => p.id === tally.winnerId)!;
      return (
        <VoteReveal
          isTie={false}
          votedPlayerName={votedPlayer.name}
          wasCaught={tally.winnerId === state.imposterId}
          onContinue={() => dispatch({ type: 'CONTINUE_AFTER_VOTE_REVEAL' })}
        />
      );
    }

    case 'imposter-guess':
      return <ImposterGuess onSubmitGuess={(guess) => dispatch({ type: 'SUBMIT_IMPOSTER_GUESS', guess })} />;

    case 'final-result':
      return (
        <FinalResult
          players={state.players}
          imposterId={state.imposterId!}
          secretWord={state.secretWord!}
          votes={state.votes}
          roundResult={state.roundResult!}
          onPlayAgain={() => dispatch({ type: 'PLAY_AGAIN' })}
          onNewGame={() => dispatch({ type: 'NEW_GAME' })}
        />
      );
  }
}

export default App;
