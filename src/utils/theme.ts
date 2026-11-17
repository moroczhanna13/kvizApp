import { createTheme } from '@mui/material/styles';

/** Az alkalmazás egységes Material Design témája. */
export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#d81b60' },
    secondary: { main: '#00897b' },
    success: { main: '#6fd274' },
    error: { main: '#e96868' },
    warning: { main: '#f09245' },
    background: { default: '#ffcee0', paper: '#ffffff' },
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
