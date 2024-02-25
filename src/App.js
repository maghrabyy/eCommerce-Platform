import './App.css';
import { useContext } from 'react';
import AuthContext from './context/AuthContext';
import SectionsContext from './context/SectionsContext';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import { routes } from './data/navigationPaths';

//Pages
import { MainDashboard } from "./pages/Dashboard/Dashboard Main/MainDashboardPage";
import { OrdersPage } from "./pages/Dashboard/Orders/OrdersPage";
import { BusinessDetailsPage } from './pages/Dashboard/Business Details/BusinessDetailsPage';
import { OrderDetails } from './components/dashboard/Orders/OrderDetails';
import { CustomersPage } from './pages/Dashboard/Customers/CustomersPage';
import { CustomerDetails } from './components/dashboard/Customers/CustomerDetails';
import { SalesReportPage } from './pages/Dashboard/Sales Reports/SalesReportsPage';
import { ActivityLogPage } from "./pages/Dashboard/Activity Log/ActivityLogPage";
import { AddProductPage } from "./pages/Dashboard/Add Product/AddProductPage";
import { BrandsCategoryPage } from './pages/Dashboard/Products/BrandsCategoryPage';
import { BrandsPage } from './pages/Dashboard/Products/BrandsPage';
import { CategoriesPage } from './pages/Dashboard/Products/CategoryPage';
import { ProductsPage } from "./pages/Dashboard/Products/ProductsPage";
import { ProductDetails } from './pages/Dashboard/Products/ProductDetails';
import { ProductEditPage } from './pages/Dashboard/Products/ProductEditPage';
import { SellProductPage } from './pages/Dashboard/Products/SellProductPage';
import { Dashboard } from './components/dashboard/Dashboard';
import { LoginPage } from './pages/Auth/LoginPage';
import { PageNotFound } from './pages/PageNotFound';

function App() {
  const {authUser} = useContext(AuthContext);
  const { categorySection,brandsSection } = useContext(SectionsContext);

  const renderedCategoryRoutes = categorySection.map(category =>
    <Route key={category.path} path={category.path} element={<ProductsPage category={category}/>}>
        <Route path=':prod'
          element={<ProductDetails category={category}/>}>
            <Route path='edit-product' element={<ProductEditPage />} />
            <Route path='sell-product' element={<SellProductPage />} />
        </Route>
      </Route>
    );
    const renderedBrandRoutes = brandsSection.map(brand =>
      <Route key={brand.path} path={brand.path} element={<ProductsPage brand={brand}/>} >
        <Route path=':prod'
          element={<ProductDetails brand={brand}/>}>
            <Route path='edit-product' element={<ProductEditPage />} />
            <Route path='sell-product' element={<SellProductPage />} />
        </Route>
      </Route>
      );

  const router = createBrowserRouter(createRoutesFromElements(
      <Route path={routes.homePage.path} element={authUser? <Dashboard /> : <LoginPage/>} >
        <Route index element={<MainDashboard/>} />
        <Route path={routes.orders.path} element={<OrdersPage/>}>
            <Route path=':ordersId' element={<OrderDetails/>} />
        </Route>
        <Route path={routes.customers.path} element={<CustomersPage/>}>
          <Route path=':cstId' element={<CustomerDetails/>} />
        </Route>
        <Route path={routes.salesReport.path} element={<SalesReportPage/>} />
        <Route path={routes.business_details.path} element={<BusinessDetailsPage/>} />
        <Route path='products' element={ <BrandsCategoryPage/>} >
          <Route path=':prod' element={ <ProductDetails /> }>
              <Route path='edit-product' element={<ProductEditPage />} />
              <Route path='sell-product' element={<SellProductPage />} />
          </Route>
          <Route path='brands' element={<BrandsPage/>}  >
            {renderedBrandRoutes}
          </Route>
          <Route path='categories' element={<CategoriesPage/>} >
            {renderedCategoryRoutes}
          </Route>
        </Route>
        <Route path={routes.addProduct.path} element={<AddProductPage/>} />
        <Route path={routes.activityLog.path} element={<ActivityLogPage/>} />
          <Route path='*' element={<PageNotFound />}/>
      </Route>
  ));

  return (
      <div className="App bg-gradient-to-l from-gray-900 to-gray-800">
        <RouterProvider router={router} />
      </div>
  );
}

export default App;
