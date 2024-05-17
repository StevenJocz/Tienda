
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import RoutesWithNotFound from '../../../../../utilities/RoutesWithNotFound';
import { AppStore } from '../../../../../redux/Store';
import { Home } from '../../../page/home';
import { Productos } from '../../../page/productos';

const Rutas = () => {
    const usuario = useSelector((store: AppStore) => store.user);

    return (
        <RoutesWithNotFound>
            {usuario.tipoUsuario == 0 ? (
                <>
                    <Route path="/" element={<Home/>} />
                    <Route path="/Productos" element={<Productos/>} />
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