import './App.css';
import {Login} from './components/Login/Login';
import {Header} from './components/Login/Header';
import { Dashboard } from './components/dashboard/Dashboard';

function App() {
  const headerHeight = 166;
  return (
    <div className="App bg-gradient-to-l from-gray-900 to-gray-800">
      <Header headerHeight={headerHeight}/>
      <Login headerHeight = {headerHeight}/>
      <Dashboard />
    </div>
  );
}

export default App;
