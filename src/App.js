import './App.css';
import { Dashboard } from './components/dashboard/Dashboard';
import { LoginPage } from './pages/Auth/LoginPage';

function App() {
  return (
    <div className="App bg-gradient-to-l from-gray-900 to-gray-800">
      <LoginPage / >
      <Dashboard />
    </div>
  );
}

export default App;
