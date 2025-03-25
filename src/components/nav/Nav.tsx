import { useEffect, useState } from 'react';
import { IonIcon } from '@ionic/react';
import { notificationsOutline, cartOutline, searchOutline, personOutline, heartOutline, menuOutline } from 'ionicons/icons';
import { Link } from 'react-router-dom';
import { useCartContext } from '../../context/CartContext';
import { useDispatch, useSelector } from 'react-redux';
import { AppStore } from '../../redux/Store';
import { clearLocalStorage } from '../../utilities';
import { TokenKey, UserKey, resetUser } from '../../redux/states/User';
import { PrivateRoutes, PublicRoutes } from '../../models';
import './Nav.css';
import { api } from '../../services';
import ShoppingCart from '../cart/shoppingCart/ShoppingCart';
import { Favoritos } from '../favoritos';
import { MiCuenta } from '../miCuenta';
import { Login } from '../loginDos';
import { Notification } from '../../pages/private/dashboard/components/notification';




const Nav = () => {
    const [shoppingCart, setShoppingCart] = useState(false);
    const [favoritos, setFavoritos] = useState(false);
    const [isLogin, setLogin] = useState(false);
    const [isSesion, setSesion] = useState(false);
    const [verMiCuenta, setVerMiCuenta] = useState(false);
    const { cartItems } = useCartContext();
    const [verMenuPerfil, setVerMenuPerfil] = useState(false);
    const usuario = useSelector((store: AppStore) => store.user);
    const dispatch = useDispatch();
    const [notification, setNotification] = useState(false);
    const [tieneNotificacion, setTieneNotificacion] = useState(0);
    const [menu, setMenu] = useState(false);

    useEffect(() => {
        // Verificar si el usuario tiene un token en localStorage
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        if (token && user) {
            setLogin(true);
        }
    }, []);

    const handleShoppingCart = () => {
        setShoppingCart(!shoppingCart);
        setNotification(false);
        setMenu(false);
    };

    const handleFavoritos = () => {
        setFavoritos(!favoritos);
        setNotification(false);
        setMenu(false);
    };

    const handleMenuPerfil = () => {
        setVerMenuPerfil(!verMenuPerfil);
        setNotification(false);
        setMenu(false);
    };

    const handleMiCuenta = () => {
        setVerMiCuenta(!verMiCuenta);
        setNotification(false);
        setMenu(false);
    };

    const handleNotification = () => {
        setNotification(!notification);
        setTieneNotificacion(0);
        setMenu(false);
        setVerMiCuenta(false);
    };

    const handleMenu = () => {
        setMenu(!menu);
        setShoppingCart(false);
        setNotification(false);
    }


    useEffect(() => {
        hadleGetTieneNotificacion();
        const intervalId = setInterval(hadleGetTieneNotificacion, 40000);
        return () => {
            clearInterval(intervalId);
        };
    }, [])

    const hadleGetTieneNotificacion = async () => {
        // Solicitud GET
        api.get<any>('Notificacion/Get_CantidadNotifiaciones', { idUsuario: usuario.idUsuario }).then((response) => {
            setTieneNotificacion(response.data);

        })
    };

    const logOut = () => {
        clearLocalStorage(UserKey);
        clearLocalStorage(TokenKey);
        clearLocalStorage('favoriteProductIds');
        clearLocalStorage('cartItems');
        dispatch(resetUser());
        setLogin(false);
        window.location.reload();
    };

    return (
        <div className='Menu'>
            <div className='Menu_left'>
                <Link to={'/'}>
                    <img src="https://www.unac.edu.co/wp-content/uploads/2023/06/Logo_UNAC_svg.svg" alt="" />
                </Link>
                <ul>
                    <Link to={'/'}> <li className="">Home</li></Link>
                    <Link to={'/Shop/0/TodasCategorias'}> <li className="">Shop</li></Link>
                </ul>
            </div>
            <div className='Menu_right'>
                <p className='Menu_right_ayuda'>¿NECESITAS AYUDA?</p>
                <Link to={'/Shop/0/TodasCategorias'}> <IonIcon className='icono Menu_right_buscar' icon={searchOutline} /></Link>
                <div className='iconoMenu'>
                    <IonIcon className='icono' icon={menuOutline} onClick={handleMenu} />
                </div>

                <div className='Menu_right--icono' onClick={handleNotification} >
                    <IonIcon className='icono' icon={notificationsOutline} />
                    {tieneNotificacion > 0 &&
                        <div>
                            <p>{tieneNotificacion}</p>
                        </div>
                    }
                </div>
                <div className='Menu_right--icono'  >
                    <IonIcon className='icono' icon={heartOutline} onClick={handleFavoritos} />
                </div>

                <div className='Menu_right--icono' onClick={handleShoppingCart} >
                    <IonIcon className='icono' icon={cartOutline} />
                    {cartItems.length > 0 && <div>
                        <p>{cartItems.length}</p>
                    </div>}
                </div>
                {isLogin &&
                    <div className='Menu_right--icono'  >
                        <IonIcon className='icono iconoUsuario' onClick={handleMenuPerfil} icon={personOutline} />
                    </div>
                }
                {isLogin ? (
                    <>
                        <div className='Menu_right_Perfil'>
                            <h4 onClick={handleMenuPerfil}>Hola, <span>{usuario.nombre}</span></h4>
                            {verMenuPerfil &&
                                <div className='Menu_right_Perfil_Content'>
                                    <ul>
                                        <li
                                            className=""
                                            onClick={() => {
                                                handleMiCuenta();
                                                handleMenuPerfil();
                                            }}
                                        >
                                            Mi cuenta
                                        </li>
                                        <Link
                                            to={`/${PublicRoutes.Mispedidos}`}>
                                            <li className="">Mis pedidos</li>
                                        </Link>
                                        {usuario.tipoUsuario == 1 &&
                                            <>

                                                <Link
                                                    to={`/${PrivateRoutes.private}`}>
                                                    <li className="">Panel Administrador</li>
                                                </Link>
                                            </>
                                        }
                                        <li className="" onClick={logOut}>Salir</li>
                                    </ul>
                                </div>
                            }
                        </div>

                    </>
                ) : (
                    <button onClick={() => setSesion(!isSesion)}>
                        <IonIcon className='icono' icon={personOutline} />
                        Iniciar
                    </button>
                )}
            </div>
            {menu &&
                <div className='Menu_right_Menu_Content Menu_right_Perfil_Content'>
                    <ul>
                        <Link to={'/'}> <li className="">Home</li></Link>
                        <Link to={'/Shop/0/TodasCategorias'}> <li className="">Shop</li></Link>
                    </ul>
                </div>

            }

            {shoppingCart && <ShoppingCart onClose={() => setShoppingCart(false)} mostrarInicio={() => setSesion(true)} />}
            {favoritos && <Favoritos onClose={() => setFavoritos(false)} filtros={{}} />}
            {verMiCuenta && <MiCuenta onClose={() => setVerMiCuenta(false)} />}
            {notification && <Notification esAdmin={false} mostrarRegistro={() => setNotification(false)} />}
            {isSesion && (
                <Login
                    onClose={() => setSesion(!isSesion)}
                    mostrarInicio={() => setLogin(true)}
                    IniciosSesion={() => setLogin(true)}
                />
            )
            }
        </div >
    )
}

export default Nav