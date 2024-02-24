import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { SidebarTogglerProvider } from './context/SidebarTogglerContext';
import { AlertProvider } from './context/AlertContext';
import { BusinessProvider } from './context/BusinessContext';
import { CustomersProvider } from './context/CustomersContext';
import { EmployeesProvider } from './context/EmployeesContext';
import { OrdersProvider } from './context/OrdersContext'; 
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
        <AuthProvider>
            <AlertProvider>
                <SidebarTogglerProvider>
                    <BusinessProvider>
                        <CustomersProvider>
                            <EmployeesProvider>
                                <OrdersProvider>
                                    <App />
                                </OrdersProvider>
                            </EmployeesProvider>
                        </CustomersProvider>
                    </BusinessProvider>
                </SidebarTogglerProvider>
            </AlertProvider>
        </AuthProvider>
);
