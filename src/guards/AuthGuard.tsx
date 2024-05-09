import { Navigate, Outlet } from 'react-router-dom';
import { PrivateRoutes, PublicRoutes } from '../models/Router';
import { useSelector } from 'react-redux';
import { AppStore } from '../redux/Store';

interface Props {
    privateValidation: boolean;
}
const AuthGuard: React.FC<Props> = (props) => {

    const PrivateValidationFragment = <Outlet />;
    const PublicValidationFragment = <Navigate replace to={PrivateRoutes.private} />;
    const userState = useSelector((store: AppStore) => store.user);
    return userState.idUsuario ? (
        props.privateValidation ? (
            PrivateValidationFragment
        ) : (
            PublicValidationFragment
        )
    ) : (
        <Navigate replace to={PublicRoutes.public} />

    );
}

export default AuthGuard