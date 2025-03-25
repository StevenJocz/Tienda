import { lazy } from 'react';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import RoutesWithNotFound from '../../../../../utilities/RoutesWithNotFound';
import { AppStore } from '../../../../../redux/Store';

// Lazy-loaded components
const Home = lazy(() => import('../../../page/home/Home'));
const Productos = lazy(() => import('../../../page/productos/Productos'));
const Configuracion = lazy(() => import('../../../page/configuracion/Configuracion'));
const Usuarios = lazy(() => import('../../../page/usuarios/Usuarios'));
const Pedidos = lazy(() => import('../../../page/pedidos/Pedidos'));
const TodasNotificaciones = lazy(() => import('../../../page/notificaciones/TodasNotificaciones'));
const TodosComentarios = lazy(() => import('../../../page/comentarios/TodosComentarios'));


const Rutas = () => {
    const usuario = useSelector((store: AppStore) => store.user);

    return (
        <RoutesWithNotFound>
            {usuario.tipoUsuario == 1 ? (
                <>
                    <Route path="/" element={<Home/>} />
                    <Route path="/Productos" element={<Productos/>} />
                    <Route path="/Configuracion/*" element={<Configuracion/>} />
                    <Route path="/Usuarios/*" element={<Usuarios/>} />
                    <Route path="/Pedidos/:idPedido?" element={<Pedidos/>} />
                    <Route path="/Notificaciones" element={<TodasNotificaciones />} />
                    <Route path="/Comentarios" element={<TodosComentarios />} />
                </>
            ) : (
                <>
                    <Route path="/" element={<div>Otro Usuario</div>} />
                </>
            )}

        </RoutesWithNotFound>
    )
}

export default Rutas