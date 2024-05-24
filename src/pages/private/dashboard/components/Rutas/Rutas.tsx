
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import RoutesWithNotFound from '../../../../../utilities/RoutesWithNotFound';
import { AppStore } from '../../../../../redux/Store';
import { Home } from '../../../page/home';
import { Productos } from '../../../page/productos';
import { Configuracion } from '../../../page/configuracion';

const Rutas = () => {
    const usuario = useSelector((store: AppStore) => store.user);

    return (
        <RoutesWithNotFound>
            {usuario.tipoUsuario == 1 ? (
                <>
                    <Route path="/" element={<Home/>} />
                    <Route path="/Productos" element={<Productos/>} />
                    <Route path="/Configuracion/*" element={<Configuracion/>} />
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