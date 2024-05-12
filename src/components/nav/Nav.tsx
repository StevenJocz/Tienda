import './Nav.css'
import { IonIcon } from '@ionic/react';
import { notificationsOutline, cartOutline, searchOutline, personOutline, heartOutline } from 'ionicons/icons';
import { useState } from 'react';
import ShoppingCart from '../cart/shoppingCart/ShoppingCart';
import { useCartContext } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import { Favoritos } from '../favoritos';
import { Login } from '../loginDos';


const Nav = () => {
    const [shoppingCart, setShoppingCart] = useState(false);
    const [favoritos, setFavoritos] = useState(false);
    const [isLogin, setLogin] = useState(false);
    const [isSesion, setSesion] = useState(false);
    const { cartItems } = useCartContext();

    const handleShoppingCart = () => {
        setShoppingCart(!shoppingCart);
    };

    const handleFavoritos = () => {
        setFavoritos(!favoritos);
    };

    return (
        <div className='Menu'>
            <div className='Menu_left'>
                <img src="http://tienda.unac.edu.co/wp-content/uploads/cropped-LOGO_UNAC-1.webp" alt="" />
                <ul>
                    <Link to={'/'}> <li className="">Home</li></Link>
                    <li className="">Shop</li>
                    <li className="">Nosotros</li>
                </ul>
            </div>
            <div className='Menu_right'>
                <p>¿NECESITAS AYUDA?</p>
                <IonIcon className='icono' icon={searchOutline} />
                <IonIcon className='icono' icon={notificationsOutline} />
                <IonIcon className='icono' icon={heartOutline} onClick={handleFavoritos}/>
                <div className='Menu_right--icono' onClick={handleShoppingCart} >
                    <IonIcon className='icono' icon={cartOutline} />
                    {cartItems.length > 0 && <div>
                        <p>{cartItems.length}</p>
                    </div>}
                </div>

                <button onClick={() => setSesion(!isSesion)}>
                    <IonIcon className='icono' icon={personOutline}  />
                    Iniciar
                </button>
            </div>
            {shoppingCart && <ShoppingCart onClose={() => setShoppingCart(false)} />}
            {favoritos && <Favoritos onClose={() => setFavoritos(false)} />}
            {isSesion && (
                <Login
                    onClose={() => setSesion(!isSesion)}
                    mostrarInicio={() => setLogin(true)}
                />
            )}
        </div>
    )
}

export default Nav