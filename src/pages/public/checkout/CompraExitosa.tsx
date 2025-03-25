import './CompraExitosa.css'
import { Link, useNavigate, useParams } from "react-router-dom";
import { EstadoPago } from "../../../models/Pedido";
import { useEffect, useRef, useState } from "react";
import { api } from "../../../services";
import { useCartContext } from "../../../context/CartContext";

const CompraExitosa = () => {
    const { referencia: ordenFromParams } = useParams<{ referencia: string | undefined }>();
    const referencia = ordenFromParams ?? '';
    const { clearCart } = useCartContext();
    const [pedido, setPedido] = useState<EstadoPago>();

    const navigate = useNavigate();

    const hasFetched = useRef(false);

    useEffect(() => {
        if (!isNaN(parseInt(referencia)) && !hasFetched.current) {
            hasFetched.current = true;
            hadleGetPedidos();
        }
    }, [referencia]);

    const hadleGetPedidos = async () => {
        try {
            const response = await api.get<[EstadoPago]>('Pedido/Get_Orden_Pedidos', { referencia: referencia });
            clearCart();
            setPedido(response.data[0]);

        } catch (error) {
            console.error("Error en la petición:", error);
        }
    }

    return (
        <div className="CompraExitosa">
            <div className="CompraExitosa_Content">
                <Link to={'/'}>
                    <img src="https://www.unac.edu.co/wp-content/uploads/2023/06/Logo_UNAC_svg.svg" alt="" />
                </Link>

                {pedido?.estado == "Pendiente" || pedido?.estado == "Aprobada" ? (
                    <>
                        <h1>¡Gracias por tu compra!</h1>
                        <h2>La transacción por el valor de ${pedido && pedido.valor.toLocaleString()} {pedido && pedido.moneda} esta</h2>
                        <h2><span className={pedido?.estado}>{pedido && pedido.estado}</span></h2>
                    </>

                ) : (
                    <>
                        <h2>La transacción  quedo en estado <span className={pedido?.estado}>Cancelada</span></h2>
                        <p>Vuelve a la tienda para realizar otra compra.</p>
                    </>
                )}
                {pedido ? (
                    <>
                        <h3><span>Fecha: </span>{pedido && pedido.fecha}</h3>
                        <h3><span>Referencia: </span>{referencia}</h3>
                        <h3><span>Valor: </span>${pedido && pedido.valor.toLocaleString()} {pedido && pedido.moneda}</h3>
                        <h3><span>Descripción: </span>{pedido?.estado == "Pendiente" || pedido?.estado == "Aprobada" ? "Compra realizada desde la Tienda UNAC" : ""}</h3>
                        <h3><span>Medio de pago: </span>{pedido && pedido.formaPago}</h3>
                    </>
                ) : (
                    <>
                    </>
                )}
                {pedido?.estado == "Pendiente" || pedido?.estado == "Aprobada" ? (
                    pedido?.estado == "Pendiente" ? (
                        <p className='TextPendiente'>Tu pedido ha sido registrado, pero aún estamos esperando la confirmación del pago. Te enviaremos un correo electrónico de confirmación a <b>{pedido?.correo}</b> con los detalles de tu pedido</p>
                    ) : (
                        <p className='TextPendiente'> Tu pedido ha sido realizado con éxito. Te enviaremos un correo electrónico de confirmación a <b>{pedido?.correo}</b> con los detalles de tu pedido.</p>
                    )
                ) : (
                    <></>
                )}
                <button onClick={() => navigate("/")}>Volver a la tienda</button>
            </div>
        </div>
    )
}

export default CompraExitosa