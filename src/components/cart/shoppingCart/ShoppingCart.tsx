import './ShoppingCart.css'
import { IonIcon } from '@ionic/react';
import { Tooltip } from '@mui/material';
import { closeOutline, rocketOutline, addOutline, removeOutline, trashOutline, cartOutline } from "ionicons/icons";
import { useCartContext } from '../../../context/CartContext';
import { Link } from 'react-router-dom';
import { services } from '../../../models';
import { api } from '../../../services';
import { useEffect, useState } from 'react';

interface Props {
    onClose: () => void;
    mostrarInicio?: () => void;
}

const ShoppingCart: React.FC<Props> = (props) => {
    const { cartItems, removeFromCart, getTotalCartValue, updateCartItemQuantity } = useCartContext();

    const [monto, setMonto] = useState(0);

    useEffect(() => {
        hadleGetMonto();
    }, [monto]);

    const hadleGetMonto = async () => {
        // Solicitud GET
        const response = await api.get<[any]>('Generales/Get_Monto', { IdMonto: 1 });
        setMonto(response.data[0].valorMonto)
    };
    const handleSelectCantidad = (accion: number, id: number, Cantidad: number) => {

        if (accion == 1) {
            Cantidad = Cantidad + 1;
        } else {
            if (Cantidad > 1) {
                Cantidad = Cantidad - 1;
            }
        }
        updateCartItemQuantity(id, Cantidad);
    };

    const calcularPorcentaje = () => {
        const valorMinimoEnvio = monto;
        const totalCarrito = getTotalCartValue();
        const porcentajeDecimal = (totalCarrito / valorMinimoEnvio) * 100;
        const porcentajeEntero = Math.floor(porcentajeDecimal);
        return porcentajeEntero > 100 ? 100 : porcentajeEntero;
    };


    const haddleMensaje = () => {
        const valorMinimoEnvio = monto;
        const diferencia = valorMinimoEnvio - getTotalCartValue();
        if (calcularPorcentaje() === 100) {
            return (<p><span>¡Felicidades!</span> ¡Tienes envío gratis!</p>);
        } else {
            return (
                <p>
                    ¡Ya casi está, agregue
                    <span style={{ color: calcularColor() }}>
                        ${diferencia.toLocaleString()}
                    </span>
                    más para obtener <strong>ENVÍO GRATIS</strong>!
                </p>
            );
        }
    }

    const calcularColor = () => {
        const porcentaje = calcularPorcentaje();
        if (porcentaje < 30) {
            return '#b59677';
        } else if (porcentaje >= 30 && porcentaje < 100) {
            return '#23b2c7';
        } else {
            return 'green';
        }
    };



    return (
        <div className='ShoppingCart'>
            <div className='ShoppingCart--cerrar' onClick={props.onClose}></div>
            <div className='ShoppingCart_Content'>
                <div className='ShoppingCart_Content--Encabezado'>
                    <h4>CARRITO</h4>
                    <IonIcon
                        className="icono"
                        onClick={props.onClose}
                        icon={closeOutline}
                    />
                </div>
                <div className='ShoppingCart_Content--body'>
                    <div className='ShoppingCart_Content--body--indicador'>
                        {haddleMensaje()}
                        <div className='indicador'>
                            <div style={{
                                width: `${calcularPorcentaje()}%`,
                                backgroundColor: calcularColor()
                            }}></div>
                            <IonIcon className="icono" icon={rocketOutline}
                                style={{
                                    color: calcularColor()
                                }} />
                        </div>
                    </div>
                    {cartItems.length != 0 ? (
                        <>
                            <div className='ShoppingCart_Producto'>
                                {cartItems.map((producto, index) => (
                                    <div className='ShoppingCart_Producto--Content' key={index}>
                                        <div className='ShoppingCart_Producto--Content--imagen'>
                                            <img src={`${services.url}/${producto.src}`} alt={producto.nombre} />
                                        </div>
                                        <div className='ShoppingCart_Producto--Content--Info'>
                                            <Link to={`/Producto/${producto.idProducto}/${encodeURIComponent(producto.nombre.toLowerCase().replace(/ /g, '-'))}`}>
                                                <h3>{producto.nombre}</h3>
                                            </Link>
                                            <h4>${producto.valor.toLocaleString()}</h4>
                                            {producto.talla != '' &&
                                                <h3><span>Talla:</span> {producto.talla}</h3>
                                            }
                                            <h3><span>Color:</span> {producto.nombreColor}</h3>
                                            <div className='ShoppingCart_Producto--Content--Info-Cantidad'>
                                                {producto.cantidad == 1 ? (
                                                    <Tooltip title='Remover producto' placement="top" disableInteractive >
                                                        <IonIcon className='iconoRemove' icon={trashOutline} onClick={() => removeFromCart(producto.id)} />
                                                    </Tooltip>
                                                ) : (
                                                    <IonIcon className='icono' icon={removeOutline} onClick={() => handleSelectCantidad(0, producto.id, producto.cantidad)} />
                                                )}
                                                <p>{producto.cantidad}</p>
                                                <IonIcon className='icono' icon={addOutline} onClick={() => handleSelectCantidad(1, producto.id, producto.cantidad)} />
                                            </div>
                                        </div>
                                        <Tooltip title='Remover producto' placement="top" disableInteractive >
                                            <IonIcon className='iconoRemove' icon={trashOutline} onClick={() => removeFromCart(producto.id)} />
                                        </Tooltip>
                                    </div>
                                ))}
                            </div>
                            <div className='ShoppingCart_Footer'>
                                <div className='ShoppingCart_Encabezado'>
                                    <h4>Subtotal:</h4>
                                    <h3>${getTotalCartValue().toLocaleString()} COP</h3>
                                </div>

                                <div className='ShoppingCart_Botones'>
                                    <Link to={"/Shop/Checkout"}>
                                        FINALIZAR
                                    </Link>
                                    <button onClick={props.onClose}>SEGUIR COMPRANDO</button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className='ShoppingCart_Producto-null'>
                            <IonIcon className='icono' icon={cartOutline} />
                            <h2>Su carrito está vacío.</h2>
                            <p>Parece que aún no has encontrado lo que buscas. ¡No te preocupes! Explora nuestros productos y descubre algo que te encantará.</p>
                            <button onClick={props.onClose}>Volver a la tienda</button>
                        </div>

                    )}

                </div>
            </div>
        </div>
    )
}

export default ShoppingCart