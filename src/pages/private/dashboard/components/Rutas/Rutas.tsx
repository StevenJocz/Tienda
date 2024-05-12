
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import RoutesWithNotFound from '../../../../../utilities/RoutesWithNotFound';
import { AppStore } from '../../../../../redux/Store';

const Rutas = () => {
    const usuario = useSelector((store: AppStore) => store.user);

    return (
        <RoutesWithNotFound>
            {usuario.tipoUsuario == 1 ? (
                <>
                    <Route path="/" element={<div>Home</div>} />
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