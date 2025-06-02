import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import Home from './pages/Home';
import ProductPage from './pages/product/ProductPage';
import Cart from './pages/cart/Cart';
import Register from './pages/auth/Register';
import NotFound from './pages/NotFound';
import Layout from './components/layout/Layout';
import AuthLayout from './components/layout/AuthLayout';
import Contact from './pages/Contact';
import CategoryProducts from './pages/category/CategoryProducts';
import Favorites from './pages/favorites/Favorites';
import CheckOut from './pages/CheckOut';
import Login from './pages/auth/Login';
import ForgetPassword from './pages/auth/ForgetPassword';
import ScrollToTop from './components/ScrollToTop';
import { AuthProvider } from './context/authContext';

const App = () => {
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <div className={darkMode ? 'dark bg-[#1A1A1A] text-[#F5F2F4] min-h-screen' : 'bg-white text-[#465542] min-h-screen'}>
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={true}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme={darkMode ? 'dark' : 'light'}
          />

          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/category/:categoryName" element={<CategoryProducts />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/checkout" element={<CheckOut />} />
              <Route path="/favorites" element={<Favorites />} />
            </Route>

            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgetPassword />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
};

export default App;
