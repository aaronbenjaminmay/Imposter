import { Button } from '../components/Button';
import { NavHeader } from '../components/NavHeader';
import { PlayerRow, type PlayerRowStatus } from '../components/PlayerRow';
import { ScreenShell } from '../components/ScreenShell';
import type { Player } from '../types/game';
import styles from './CluePhase.module.css';

type CluePhaseProps = {
  players: Player[];
  currentPlayerIndex: number;
  onBack: () => void;
  onNextPlayer: () => void;
};

/**
 * Figma: "02 — Core Flow" > clue-phase (#2:381).
 * Turn tracker only — the secret word is never displayed here (see
 * docs/GAME_RULES.md "Clue phase"). Clues are given out loud; the phone
 * just tracks whose turn it is.
 *
 * Assumption: the "turn-indicator" frame (#2:422) had no captured
 * children in the source fetch. Implemented as an overline + name
 * callout ("CURRENT TURN" / player name) restating the highlighted row
 * below the list, since that pattern (overline + prominent name) is
 * already established elsewhere (pass-phone). Flag if Figma shows
 * otherwise once the rate limit clears.
 */
export function CluePhase({ players, currentPlayerIndex, onBack, onNextPlayer }: CluePhaseProps) {
  const currentPlayer = players[currentPlayerIndex];

  const statusFor = (index: number): PlayerRowStatus => {
    if (index < currentPlayerIndex) return 'completed';
    if (index === currentPlayerIndex) return 'current';
    return 'pending';
  };

  return (
    <ScreenShell>
      <div className={styles.topSection}>
        <NavHeader title="Clue Round" onBack={onBack} />
        <div className={styles.content}>
          <h2 className={styles.heading}>Clue round</h2>
          <div className={styles.playerList}>
            {players.map((player, index) => (
              <PlayerRow key={player.id} name={player.name} status={statusFor(index)} />
            ))}
          </div>
          <div className={styles.turnIndicator}>
            <p className={styles.turnLabel}>Current turn</p>
            <p className={styles.turnName}>{currentPlayer.name}</p>
          </div>
        </div>
      </div>
      <div className={styles.bottomSection}>
        <Button variant="primary" onClick={onNextPlayer}>
          Next Player
        </Button>
      </div>
    </ScreenShell>
  );
}
