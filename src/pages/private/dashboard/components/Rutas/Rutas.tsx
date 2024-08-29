
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import RoutesWithNotFound from '../../../../../utilities/RoutesWithNotFound';
import { AppStore } from '../../../../../redux/Store';
import { Home } from '../../../page/home';
import { Productos } from '../../../page/productos';
import { Configuracion } from '../../../page/configuracion';
import { Usuarios } from '../../../page/usuarios';
import { Pedidos } from '../../../page/pedidos';
import { TodasNotificaciones } from '../../../page/notificaciones';
import { TodosComentarios } from '../../../page/comentarios';

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