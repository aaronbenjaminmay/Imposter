import { useState } from 'react';
import { Button } from '../components/Button';
import { NavHeader } from '../components/NavHeader';
import { ScreenShell } from '../components/ScreenShell';
import { VoteOption } from '../components/VoteOption';
import type { Player } from '../types/game';
import styles from './VoteSelection.module.css';

type VoteSelectionProps = {
  players: Player[];
  onBack: () => void;
  onLockIn: (votedForId: string) => void;
};

/**
 * Figma: "02 — Core Flow" > vote-selection (#2:476).
 * Private vote casting — selection must never persist visually for the
 * next voter (a fresh, unselected component mounts per voter since App
 * doesn't retain selection state across the pass-phone boundary).
 *
 * Self-voting is intentionally allowed here (project owner call — see
 * docs/GAME_RULES.md "Self-voting"), so all players are shown as options.
 *
 * Assumption: title-area's exact copy (#2:492) wasn't captured before
 * the Figma rate limit hit — used a title/subtitle consistent with the
 * AI guide's "VOTE SELECTION" doc ("privately select who they think is
 * the Imposter").
 */
export function VoteSelection({ players, onBack, onLockIn }: VoteSelectionProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <ScreenShell>
      <div className={styles.topSection}>
        <NavHeader title="Cast Vote" onBack={onBack} />
        <div className={styles.content}>
          <div className={styles.titleArea}>
            <h2 className={styles.title}>Who's the Imposter?</h2>
            <p className={styles.subtitle}>Select one player.</p>
          </div>
          <div className={styles.voteOptions} role="radiogroup" aria-label="Vote for the Imposter">
            {players.map((player) => (
              <VoteOption
                key={player.id}
                name={player.name}
                selected={selectedId === player.id}
                onClick={() => setSelectedId(player.id)}
              />
            ))}
          </div>
        </div>
      </div>
      <div className={styles.bottomSection}>
        <Button variant="primary" onClick={() => selectedId && onLockIn(selectedId)} disabled={!selectedId}>
          Lock In Vote
        </Button>
      </div>
    </ScreenShell>
  );
}
