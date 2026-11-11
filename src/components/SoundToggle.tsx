import { useCallback } from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { useQuiz } from '../hooks/useQuiz';

/**
 * A hangeffektek be- és kikapcsolására szolgáló gomb; az állapot a beállításokkal együtt mentődik.
 * @returns A hangkapcsoló ikon gomb.
 */
export function SoundToggle() {
  const { settings, updateSettings } = useQuiz();
  const label = settings.soundEnabled ? 'Hang kikapcsolása' : 'Hang bekapcsolása';

  const handleToggle = useCallback(() => {
    updateSettings({ soundEnabled: !settings.soundEnabled });
  }, [settings.soundEnabled, updateSettings]);

  return (
    <Tooltip title={label}>
      <IconButton color="inherit" onClick={handleToggle} aria-label={label} aria-pressed={settings.soundEnabled}>
        {settings.soundEnabled ? <VolumeUpIcon /> : <VolumeOffIcon />}
      </IconButton>
    </Tooltip>
  );
}
