import { Link } from "react-router-dom";
import { Pedido } from "../../../models/Pedido";
import { useSelector } from "react-redux";
import { AppStore } from "../../../redux/Store";
import { services } from "../../../models";

interface Props {
    data: Pedido;
    orden: number
}

const CompraExitosa: React.FC<Props> = (props) => {
    const usuario = useSelector((store: AppStore) => store.user);
    return (
        <div className="CompraExitosa">
            <div className="order-confirmation">
                <h2>¡Gracias por tu compra!</h2>
                <p> Tu pedido ha sido realizado con éxito. Te enviaremos un correo electrónico de confirmación con los detalles de tu pedido.</p>

                <p>Número de pedido: #{props.orden}</p>
                <p>Resumen de tu pedido: </p>
                <div className="ViewPedidos_Content_right_table">
                    <table>
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Color</th>
                                <th>Talla</th>
                                <th>Cantidad</th>
                                <th>Precio</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.data.registros.map((registro, index) => (
                                <tr key={index}>
                                    <td className="tdNombre">
                                        <div>
                                            <img src={`${services.url}/${registro.imagen}`} alt="" />
                                            <p> {registro.nombre}</p>
                                        </div>
                                    </td>
                                    <td>{registro.color}</td>
                                    <td>{registro.talla == '' ? 'No Aplica' : registro.talla}</td>
                                    <td>{registro.cantidad}</td>
                                    <td>${registro.ValorUnidad.toLocaleString()}</td>
                                    <td>${(registro.ValorUnidad * registro.cantidad).toLocaleString()}</td>
                                </tr>

                            ))}
                        </tbody>

                    </table>

                </div>
                <span>SubTotal: ${props.data.subTotal.toLocaleString()}</span>
                <span>Envío: ${props.data.valorEnvio.toLocaleString()}</span>
                <span>Descuento: ${props.data.valorDescuento.toLocaleString()}</span>
                <span>Total: ${props.data.valorTotal.toLocaleString()}</span>

                <p>Envío a: {props.data.direccion}</p>
                <p> Método de pago: Tarjeta de crédito (**** **** **** 1234)</p>

                <p>Tu pedido será entregado entre [Fecha estimada de entrega].</p>

                <p>Hemos enviado un correo electrónico a {usuario.correo} con los detalles de tu pedido.</p>

                <p>Puedes rastrear tu pedido o ver tu historial de compras en la sección "Mis Pedidos" en tu cuenta.
                    Si tienes alguna pregunta o inquietud, no dudes en contactarnos.</p>

                <p>¡Gracias por comprar con nosotros! Esperamos que disfrutes de tus productos y esperamos verte de nuevo pronto.</p>

                <Link to="/"> Volver a la Tienda</Link>
            </div>
        </div>
    )
}

export default CompraExitosa