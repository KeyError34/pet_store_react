import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Categories from './pages/categories';
import AllProducts from './pages/allProducts';
import Basket from './pages/basket';
import ErrorPage from './pages/errorPage';
import Discounts from './pages/discounts';
import CategoryProducts from './pages/categoryProducts';
import ProductDetails from './pages/productDetails';
import Header from './components/header';
import Footer from './components/footer';

function App() {
  return (
    <div style={{ width: '100%', maxWidth: ' 1440px', margin: '0 auto' }}>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/category/:id" element={<CategoryProducts />} />
        <Route
          path="category/product/:productId"
          element={<ProductDetails />}
        />
        <Route path="/all_products" element={<AllProducts />} />

        <Route path="/basket" element={<Basket />} />
        <Route path="/discounts" element={<Discounts />} />
      </Routes>
      <Footer />
      <Routes>
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
