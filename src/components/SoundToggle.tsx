import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { useQuiz } from '../hooks/useQuiz';

/**
 * Gomb a hangok ki- és bekapcsolásához. A beállítás a többivel együtt mentődik.
 * @returns A hang kapcsoló gomb.
 */
export function SoundToggle() {
  const { settings, updateSettings } = useQuiz();

  return (
    <Tooltip title={settings.soundEnabled ? 'Hang kikapcsolása' : 'Hang bekapcsolása'}>
      <IconButton color="inherit" onClick={() => updateSettings({ soundEnabled: !settings.soundEnabled })}>
        {settings.soundEnabled ? <VolumeUpIcon /> : <VolumeOffIcon />}
      </IconButton>
    </Tooltip>
  );
}
