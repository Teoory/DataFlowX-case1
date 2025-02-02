import { BrowserRouter, useRoutes } from 'react-router-dom';
import { TeamProvider } from './hooks/TeamContext';
import routes from './routes';
import './App.css';

function AppRoutes() {
  return useRoutes(routes);
}

function App() {
  return (
    <BrowserRouter>
      <TeamProvider>
        <AppRoutes />
      </TeamProvider>
    </BrowserRouter>
  );
}

export default App;