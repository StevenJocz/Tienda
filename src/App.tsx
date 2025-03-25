import { Suspense, useEffect, useState, lazy } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import Store from './redux/Store';
import { BrowserRouter, Navigate, Route } from 'react-router-dom';
import RoutesWithNotFound from './utilities/RoutesWithNotFound';
import { PrivateRoutes, PublicRoutes } from './models';
import AuthGuard from './guards/AuthGuard';
import RoleGuard from './guards/RoleGuard';
import { Loader } from './components/loader';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/Favoritos';
import { MisPedidos } from './pages/public/misPedidos';
import { Home } from './pages/public/home';
import { CompraCancelada } from './pages/public/checkout/CompraCancelada';
import { Preguntas } from './pages/public/Preguntas';

// Lazy-loaded components
const Dashboard = lazy(() => import('./pages/private/dashboard/Dashboard'));
const ViewProducto = lazy(() => import('./pages/public/product/ViewProducto'));
const Shop = lazy(() => import('./pages/public/shop/Shop'));
const CheckoutDos = lazy(() => import('./pages/public/checkout/checkout/Checkout'));
const CompraExitosa = lazy(() => import('./pages/public/checkout/CompraExitosa'));

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simula un tiempo de carga inicial de 3 segundos
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Suspense fallback={<Loader />}>
        {isLoading ? (
          <Loader />
        ) : (
          <CartProvider>
            <Provider store={Store}>
              <FavoritesProvider>
                <BrowserRouter>
                  <RoutesWithNotFound>
                    <Route path="/Private" element={<Navigate to={PrivateRoutes.private} />} />
                    <Route path={`${PublicRoutes.public}`} element={<Home />} />
                    <Route path={`${PublicRoutes.public}/Producto/:idProducto/*`} element={<ViewProducto />} />
                    <Route path={`${PublicRoutes.public}/PedidoExitoso/:referencia/*`} element={<CompraExitosa />} />
                    <Route path={`${PublicRoutes.public}/PedidoCancelado/:referencia/*`} element={<CompraCancelada />} />
                    <Route path={`${PublicRoutes.public}/Shop/:view/*`} element={<Shop />} />
                    <Route path={`${PublicRoutes.public}/Shop/Checkout`} element={<CheckoutDos />} />
                    <Route path={`${PublicRoutes.public}/PreguntasFrecuentes`} element={<Preguntas />} />
                    <Route element={<AuthGuard privateValidation={true} />}>
                      <Route path={`${PublicRoutes.Mispedidos}/:idPedido?`} element={<MisPedidos />} />
                      <Route element={<RoleGuard />}>
                        <Route path={`${PrivateRoutes.private}/*`} element={<Dashboard />} />
                      </Route>
                    </Route>
                  </RoutesWithNotFound>
                </BrowserRouter>
              </FavoritesProvider>
            </Provider>
          </CartProvider>
        )}
      </Suspense>
    </>
  );
}

export default App;
