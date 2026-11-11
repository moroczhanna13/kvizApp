import { createTheme } from '@mui/material/styles';

/** Az alkalmazás egységes Material Design témája. */
export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#3949ab' },
    secondary: { main: '#00897b' },
    success: { main: '#2e7d32' },
    error: { main: '#c62828' },
    warning: { main: '#ed6c02' },
    background: { default: '#f3f4f9', paper: '#ffffff' },
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: '"Roboto", "Segoe UI", "Helvetica", "Arial", sans-serif',
    h4: { fontWeight: 700 },
    h5: { fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  components: {
    MuiCard: {
      defaultProps: { elevation: 3 },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
    },
  },
});
