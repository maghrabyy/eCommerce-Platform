import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { NavigationRoutesProvider } from './context/NavigationRoutesContext';
import { AuthProvider } from './context/AuthContext';
import { SidebarTogglerProvider } from './context/SidebarTogglerContext';
import { ProductsProvider } from './context/ProductsContext';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
        <AuthProvider>
            <ProductsProvider>
                <SidebarTogglerProvider>
                    <NavigationRoutesProvider>
                        <App />
                    </NavigationRoutesProvider>
                </SidebarTogglerProvider>
            </ProductsProvider>
        </AuthProvider>
);
