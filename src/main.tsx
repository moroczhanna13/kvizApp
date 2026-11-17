import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { App } from './components/App';
import { QuizProvider } from './context/QuizProvider';
import { theme } from './utils/theme';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QuizProvider>
        <App />
      </QuizProvider>
    </ThemeProvider>
  </StrictMode>,
);
