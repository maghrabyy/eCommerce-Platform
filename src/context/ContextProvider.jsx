import { AuthProvider } from './AuthContext';
import { SidebarTogglerProvider } from './SidebarTogglerContext';
import { AlertProvider } from './AlertContext';
import { BusinessProvider } from './BusinessContext';
import { CustomersProvider } from './CustomersContext';
import { EmployeesProvider } from './EmployeesContext';
import { OrdersProvider } from './OrdersContext'; 
import { SectionsProvider } from './SectionsContext'; 
import { ProductsProvider } from './ProductsContext';

export const ContextProvider = ({children})=>{
    return         <AuthProvider>
    <AlertProvider>
        <SidebarTogglerProvider>
            <BusinessProvider>
                <CustomersProvider>
                    <EmployeesProvider>
                        <ProductsProvider>
                            <SectionsProvider>
                                <OrdersProvider>
                                    {children}
                                </OrdersProvider>
                            </SectionsProvider>
                        </ProductsProvider>
                    </EmployeesProvider>
                </CustomersProvider>
            </BusinessProvider>
        </SidebarTogglerProvider>
    </AlertProvider>
</AuthProvider>
}