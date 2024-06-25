import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { PrivateRoutes } from '../models';
import { AppStore } from '../redux/Store';


function RoleGuard() {
    const userState = useSelector((store: AppStore) => store.user);
    return userState.tipoUsuario == 1 ? <Outlet /> : <Navigate replace to={PrivateRoutes.private} />;
}
export default RoleGuard;
