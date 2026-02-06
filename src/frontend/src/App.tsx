import { useState } from 'react';
import { ThemeProvider } from './theme/ThemeProvider';
import AppLayout from './components/layout/AppLayout';
import SearchPage from './pages/SearchPage';
import SettingsPage from './pages/SettingsPage';

type Page = 'search' | 'settings';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('search');

  return (
    <ThemeProvider>
      <AppLayout currentPage={currentPage} onNavigate={setCurrentPage}>
        {currentPage === 'search' && <SearchPage />}
        {currentPage === 'settings' && <SettingsPage />}
      </AppLayout>
    </ThemeProvider>
  );
}

export default App;
