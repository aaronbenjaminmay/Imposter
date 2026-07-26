import { useRef, useState, type KeyboardEvent } from 'react';
import { Button } from '../components/Button';
import { NavHeader } from '../components/NavHeader';
import { PlayerChip } from '../components/PlayerChip';
import { ScreenShell } from '../components/ScreenShell';
import { TextInput } from '../components/TextInput';
import type { Player } from '../types/game';
import styles from './PlayerNames.module.css';

type PlayerNamesProps = {
  playerCount: number;
  onBack: () => void;
  onContinue: (players: Player[]) => void;
};

/**
 * Figma: "02 — Core Flow" > player-names (#2:112).
 * Note: the Figma REST API hit its rate limit while building this screen
 * (viewer-seat tier, ~4 day cooldown), so the exact list-header copy
 * couldn't be re-verified live. Layout, the Text Input/Player Chip specs,
 * and this screen's behavior were already captured from an earlier full
 * fetch and the AI Implementation Guide's "PLAYER NAMES" doc, which this
 * follows exactly: name count must match player count, names as
 * removable chips, no avatars, "Start Round" disabled until full, names
 * unique, input auto-focused with focus returning after each add.
 */
export function PlayerNames({ playerCount, onBack, onContinue }: PlayerNamesProps) {
  const [players, setPlayers] = useState<Player[]>([]);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const canAddMore = players.length < playerCount;

  const handleAdd = () => {
    const name = inputValue.trim();
    if (!name || !canAddMore) return;
    const isDuplicate = players.some((p) => p.name.toLowerCase() === name.toLowerCase());
    if (isDuplicate) return;

    setPlayers([...players, { id: crypto.randomUUID(), name }]);
    setInputValue('');
    inputRef.current?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleAdd();
    }
  };

  const handleRemove = (id: string) => {
    setPlayers(players.filter((p) => p.id !== id));
  };

  const canStart = players.length === playerCount;

  return (
    <ScreenShell>
      <div className={styles.topSection}>
        <NavHeader title="Enter Names" onBack={onBack} />
        <div className={styles.inputArea}>
          <h2 className={styles.title}>Who&apos;s playing?</h2>
          <TextInput
            ref={inputRef}
            label="Player name"
            placeholder="Enter player name..."
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            onKeyDown={handleKeyDown}
            disabled={!canAddMore}
            autoFocus
          />
        </div>
        {players.length > 0 && (
          <div className={styles.listSection}>
            <div className={styles.listHeader}>
              <span className={styles.listLabel}>Players</span>
              <span className={styles.listCount}>
                {players.length}/{playerCount}
              </span>
            </div>
            <div className={styles.chipsWrap}>
              {players.map((player) => (
                <PlayerChip key={player.id} name={player.name} onRemove={() => handleRemove(player.id)} />
              ))}
            </div>
          </div>
        )}
      </div>
      <div className={styles.bottomSection}>
        <Button variant="primary" onClick={() => onContinue(players)} disabled={!canStart}>
          Start Round
        </Button>
      </div>
    </ScreenShell>
  );
}
