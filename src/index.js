import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { NavigationProvider } from './context/NavigationContext';
import { AuthProvider } from './context/AuthContext';
import { SidebarTogglerProvider } from './context/SidebarTogglerContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthProvider>
        <SidebarTogglerProvider>
            <NavigationProvider>
                <App />
            </NavigationProvider>
        </SidebarTogglerProvider>
    </AuthProvider>
);
