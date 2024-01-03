import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { NavigationRoutesProvider } from './context/NavigationRoutesContext';
import { AuthProvider } from './context/AuthContext';
import { SidebarTogglerProvider } from './context/SidebarTogglerContext';
  

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
        <AuthProvider>
            <SidebarTogglerProvider>
                <NavigationRoutesProvider>
                    <App />
                </NavigationRoutesProvider>
            </SidebarTogglerProvider>
        </AuthProvider>
);
