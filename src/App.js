import './App.css';
import {faChartLine, faShirt, faCirclePlus, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import AuthContext from './context/AuthContext';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import NavigationsRoutesContext from './context/NavigationRoutesContext';
import { DashboardContent } from './components/dashboard/Dashcontent';

//Pages
import { MainDashboard } from "./pages/Dashboard/Dashboard Main/MainDashboardPage";
import { SalesPage } from "./pages/Dashboard/Sales/SalesPage";
import { ActivityLogPage } from "./pages/Dashboard/Activity Log/ActivityLogPage";
import { DataEntryPage } from './pages/Dashboard/Data Entry/DataEntryPage';
import { AddProductPage } from "./pages/Dashboard/Data Entry/Add Product/AddProductPage";
import { AddCategoryPage } from "./pages/Dashboard/Data Entry/Add Category/AddCategoryPage";
import { BrandsCategoryPage } from './pages/Dashboard/Products/BrandsCategoryPage';
import { BrandsPage } from './pages/Dashboard/Products/BrandsPage';
import { CategoriesPage } from './pages/Dashboard/Products/CategoryPage';
import { ProductsPage } from "./pages/Dashboard/Products/ProductsPage";
import { Dashboard } from './components/dashboard/Dashboard';
import { LoginPage } from './pages/Auth/LoginPage';
import { PageNotFound } from './pages/PageNotFound';

function App() {
  const {authUser} = useContext(AuthContext);
  const { routes, categoriesRoutes, brandsRoutes } = useContext(NavigationsRoutesContext);
  const productCategories = [
    {path:categoriesRoutes.all,title:"All"},
    {path:categoriesRoutes.hoodiesNSweatshirt,title:"Hoodies and Sweatshirts"},
    {path:categoriesRoutes.coatsNJackets,title:"Coats and Jackets"},
    {path:categoriesRoutes.denims,title:"Denims"},
    {path:categoriesRoutes.trousers,title:"Trousers"}
  ]
  const renderedCategoryRoutes = productCategories.map(category =>
    <Route path={category.path} element={
      <DashboardContent title='Clothes' icon={faShirt} showSearchInput>
        <ProductsPage catTitle={category.title}/>
      </DashboardContent>} />
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
      <Route path={brand.path} element={
        <DashboardContent title='Clothes' icon={faShirt} showSearchInput>
          <ProductsPage brandTitle={brand.title}/>
        </DashboardContent>} />
      );
  const router = createBrowserRouter(createRoutesFromElements(
      <Route path={routes.homePage} element={authUser? <Dashboard /> : <LoginPage/>} >
        <Route path={routes.homePage} element={
          <DashboardContent title='Dashboard' >
            <MainDashboard/>
          </DashboardContent>} />
        <Route path={routes.sales} element={
          <DashboardContent title='Sales' icon={faChartLine}>
            <SalesPage/>
          </DashboardContent>} />
        <Route path='products' element={ <BrandsCategoryPage/>} />
        <Route path='products/brands' element={<BrandsPage/>} / >
        <Route path='products/categories' element={<CategoriesPage/>} / >
        {renderedCategoryRoutes}
        {renderedBrandRoutes}
        <Route path='dataEntry' element={<DataEntryPage/>} / >
        <Route path={routes.dataEntry.addProduct} element={
            <DashboardContent title='Add Product' icon={faCirclePlus}>
              <AddProductPage/>
            </DashboardContent>} />
        <Route path={routes.dataEntry.addCategory} element={
          <DashboardContent title='Add Category' icon={faCirclePlus}>
            <AddCategoryPage/>
          </DashboardContent>} />
        <Route path={routes.activityLog} element={
          <DashboardContent title='ActivityLog' icon={faClipboardList}>
            <ActivityLogPage/>
          </DashboardContent>} />
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
