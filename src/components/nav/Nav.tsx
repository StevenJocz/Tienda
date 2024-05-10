import './Nav.css'
import { IonIcon } from '@ionic/react';
import { notificationsOutline, cartOutline, searchOutline, personOutline } from 'ionicons/icons';
import { useState } from 'react';
import ShoppingCart from '../cart/shoppingCart/ShoppingCart';


const Nav = () => {
    const [shoppingCart, setShoppingCart] = useState(false);

    
    const handleShoppingCart = () => {
        setShoppingCart(!shoppingCart);
    };
    return (
        <div className='Menu'>
            <div className='Menu_left'>
                <img src="http://tienda.unac.edu.co/wp-content/uploads/cropped-LOGO_UNAC-1.webp" alt="" />
                <ul>
                    <li className="">Home</li>
                    <li className="">Shop</li>
                    <li className="">Nosotros</li>
                </ul>
            </div>
            <div className='Menu_right'>
                <p>¿NECESITAS AYUDA?</p>
                <IonIcon className='icono' icon={searchOutline} />
                <IonIcon className='icono' icon={notificationsOutline} />
                <IonIcon className='icono' icon={cartOutline} onClick={handleShoppingCart}/>
                <button>
                    <IonIcon className='icono' icon={personOutline} />
                    Iniciar
                </button>
            </div>
            {shoppingCart && <ShoppingCart  onClose={() =>setShoppingCart(false)}/>}
        </div>
    )
}

export default Nav