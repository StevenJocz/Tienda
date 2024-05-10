import './ShoppingCart.css'
import { IonIcon } from '@ionic/react';
import { Tooltip } from '@mui/material';
import { closeOutline, cartSharp, addOutline, removeOutline, trashOutline } from "ionicons/icons";

interface Props {
    onClose: () => void;
}


const ShoppingCart: React.FC<Props> = (props) => {

    const data = [
        {
            "id": 1,
            "cantidad": 1,
            "valor": 8250,
            "nombre": "Cable del controlador de la consola de juegos",
            "src": "https://tennis.vtexassets.com/arquivos/ids/2414705-800-auto?v=638496787580270000&width=800&height=auto&aspect=true",
            "color": "#ff0000",
            "nombreColor": "Rojo",
            "talla": "XS"
        },
        {
            "id": 2,
            "cantidad": 2,
            "valor": 35050,
            "nombre": "Chaleco con detalles de brillo negro para mujer",
            "src": "https://tennis.vtexassets.com/arquivos/ids/2414989-500-auto?v=638496788126130000&width=500&height=auto&aspect=true",
            "color": "#ffff00",
            "nombreColor": "Amarillo",
            "talla": "L"
        }
        ,
        {
            "id": 3,
            "cantidad": 2,
            "valor": 35050,
            "nombre": "Chaleco con detalles de brillo negro para mujer",
            "src": "https://tennis.vtexassets.com/arquivos/ids/2414989-500-auto?v=638496788126130000&width=500&height=auto&aspect=true",
            "color": "#ffff00",
            "nombreColor": "Amarillo",
            "talla": "L"
        }
    ]


    return (
        <div className='ShoppingCart'>
            <div className='ShoppingCart--cerrar' onClick={props.onClose}></div>
            <div className='ShoppingCart_Content'>
                <div className='ShoppingCart_Content--Encabezado'>
                    <h4>SHOPPING CART</h4>
                    <IonIcon
                        className="icono"
                        onClick={props.onClose}
                        icon={closeOutline}
                    />
                </div>
                <div className='ShoppingCart_Content--body'>
                    <div className='ShoppingCart_Content--body--indicador'>
                        <p>¡Ya casi está, agregue <span> $ 50.000</span> más para obtener <strong>ENVÍO GRATIS</strong>!</p>
                        <div className='indicador'>
                            <div></div>
                            <IonIcon className="icono" icon={cartSharp} />
                        </div>
                    </div>
                    <div className='ShoppingCart_Producto'>
                        {data.map((producto, index) => (
                            <div className='ShoppingCart_Producto--Content' key={index}>
                                <div className='ShoppingCart_Producto--Content--imagen'>
                                    <img src={producto.src} alt={producto.nombre} />
                                </div>
                                <div className='ShoppingCart_Producto--Content--Info'>
                                    <h3>{producto.nombre}</h3>
                                    <h4>${producto.valor}</h4>
                                    <div className='ShoppingCart_Producto--Content--Info-Cantidad'>
                                        <IonIcon className='icono' icon={removeOutline} />
                                        <p>{producto.cantidad}</p>
                                        <IonIcon className='icono' icon={addOutline} />
                                    </div>
                                    <h3><span>Talla:</span> {producto.talla}</h3>
                                    <h3><span>Color:</span> {producto.nombreColor}</h3>
                                </div>
                                <Tooltip title='Remover producto' placement="top" disableInteractive >
                                    <IonIcon className='iconoRemove' icon={trashOutline} />
                                </Tooltip>
                            </div>
                        ))}
                    </div>
                    <div className='ShoppingCart_Subtotal'>
                        <div className='ShoppingCart_Subtotal--Encabezado'>
                            <h4>Subtotal:</h4>
                            <h3>$100000 COP</h3>
                        </div>
                        <div>
                            <input type="text" placeholder='Cupon' />
                        </div>
                        <div className='ShoppingCart_Subtotal--body'>
                            <button>FINALIZAR COMPRA</button>
                            <button>SEGUIR COMPRANDO</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShoppingCart