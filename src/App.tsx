
import { Suspense, useEffect, useState } from 'react';
import './App.css'
import { Provider } from 'react-redux';
import Store from './redux/Store';
import { BrowserRouter, Navigate, Route } from 'react-router-dom';
import RoutesWithNotFound from './utilities/RoutesWithNotFound';
import { PrivateRoutes, PublicRoutes } from './models';
import AuthGuard from './guards/AuthGuard';
import RoleGuard from './guards/RoleGuard';
import { Loader } from './components/loader';
import Dashboard from './pages/private/dashboard/Dashboard';
import { Home } from './pages/public/home';
import { ViewProducto } from './pages/public/product';
import { CartProvider } from './context/CartContext';
import { Shop } from './pages/public/shop';
import Checkout from './pages/public/checkout/Checkout';
import { FavoritesProvider } from './context/Favoritos';

function App() {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Establecer un temporizador para 3 segundos
    const timer = setTimeout(() => {
      // Actualizar el estado para indicar que se ha completado el tiempo de espera
      setIsLoading(false);
    }, 3000);

    // Limpiar el temporizador cuando el componente se desmonte
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Suspense>
        {isLoading ? (
          <Loader />
        ) : (
          <CartProvider>
            <FavoritesProvider>
          <Provider store={Store}>
            <BrowserRouter>
              <RoutesWithNotFound>
                <Route path="/Private" element={<Navigate to={PrivateRoutes.private} />} />
                <Route path={`${PublicRoutes.public}`} element={<Home />} />
                <Route path={`${PublicRoutes.public}/Producto/:idProducto/*`} element={<ViewProducto />} />
                <Route path={`${PublicRoutes.public}/Shop/:view/*`} element={<Shop />} />
                <Route path={`${PublicRoutes.public}/Shop/Checkout`} element={<Checkout />} />
                <Route element={<AuthGuard privateValidation={true} />}>
                  <Route element={<RoleGuard />}>
                    <Route path={`${PrivateRoutes.private}/*`} element={<Dashboard />} />
                  </Route>
                </Route>
              </RoutesWithNotFound>
            </BrowserRouter>
          </Provider>
          </FavoritesProvider>
          </CartProvider>
        )}
      </Suspense>
    </>
  )
}

export default App
