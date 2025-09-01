

import TodoPage from './pages/todoPage';
import { PopupProvider } from './contexts/popupContext';
import ErrorBoundary from './components/ErrorBoundary';


function App() {
  return (
    <ErrorBoundary>
      <PopupProvider>
        <TodoPage />
      </PopupProvider>
    </ErrorBoundary>
  );
}

export default App;

