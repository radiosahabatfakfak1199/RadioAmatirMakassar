import AppLayout from '@/components/layout/AppLayout';
import HomePage from '@/pages/HomePage';
import { useSiteSettings } from '@/hooks/useSiteSettings';

function App() {
  const { state } = useSiteSettings();
  const radioName =
    state.status === 'ready' && state.settings?.radio_name ? state.settings.radio_name : null;

  return (
    <AppLayout radioName={radioName}>
      <HomePage settingsState={state} />
    </AppLayout>
  );
}

export default App;
