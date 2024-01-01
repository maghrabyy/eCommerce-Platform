import './App.css';
import { Dashboard } from './components/dashboard/Dashboard';
import { LoginPage } from './pages/Auth/LoginPage';
import { useContext } from 'react';
import AuthContext from './context/AuthContext';

function App() {
  const {authUser} = useContext(AuthContext);
  return (
      <div className="App bg-gradient-to-l from-gray-900 to-gray-800">
        {authUser?
        <Dashboard />
        : <LoginPage / >
        }
      </div>
  );
}

export default App;
