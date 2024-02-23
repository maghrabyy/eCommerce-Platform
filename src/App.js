import './App.css';
import { useContext } from 'react';
import AuthContext from './context/AuthContext';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import { routes, categoriesRoutes, brandsRoutes } from './data/navigationPaths';

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
  const productCategories = [
    {path:categoriesRoutes.all,title:"All"},
    {path:categoriesRoutes.hoodiesNSweatshirt,title:"Hoodies and Sweatshirts"},
    {path:categoriesRoutes.coatsNJackets,title:"Coats and Jackets"},
    {path:categoriesRoutes.denims,title:"Denims"},
    {path:categoriesRoutes.trousers,title:"Trousers"}
  ]
  const renderedCategoryRoutes = productCategories.map(category =>
    <Route key={category.path} path={category.path} element={<ProductsPage category={category}/>}>
        <Route path=':prod'
          element={<ProductDetails category={category}/>}>
            <Route path='edit-product' element={<ProductEditPage />} />
            <Route path='sell-product' element={<SellProductPage />} />
        </Route>
      </Route>
    );
    const productBrands = [
      {path:brandsRoutes.pullNBear,title:"Pull & Bear"},
      {path:brandsRoutes.bershka,title:"Bershka"},
      {path:brandsRoutes.americanEagle,title:"American Eagle"},
      {path:brandsRoutes.zara,title:"Zara"},
      {path:brandsRoutes.defacto,title:"Defacto"},
      {path:brandsRoutes.hollister,title:"Hollister"}
    ]
    const renderedBrandRoutes = productBrands.map(brand =>
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
