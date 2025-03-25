import './CompraExitosa.css'
import { Link, useNavigate, useParams } from "react-router-dom";
import { EstadoPago } from "../../../models/Pedido";
import { useEffect, useRef, useState } from "react";
import { api } from "../../../services";
import { useCartContext } from "../../../context/CartContext";

export const CompraCancelada = () => {

    const { referencia: ordenFromParams } = useParams<{ referencia: string | undefined }>();
    const referencia = ordenFromParams ?? '';
    const { clearCart } = useCartContext();
    const [pedido, setPedido] = useState<EstadoPago>();

    const hasFetched = useRef(false);

    const navigate = useNavigate();

    useEffect(() => {

        if (!isNaN(parseInt(referencia)) && !hasFetched.current) {
            hasFetched.current = true;
            hadleGetPedidos();
        }
    }, [referencia]);

    const hadleGetPedidos = async () => {
        try {
            const response = await api.get<[EstadoPago]>('Pedido/Get_Orden_Pedidos', { Orden: referencia });
            clearCart();
            setPedido(response.data[0]);
        } catch (error) {
            console.error("Error en la petición:", error);
        }
    }
    return (
        <div className="CompraExitosa">
            <div className="CompraExitosa_Content Cancelado">
                <Link to={'/'}>
                    <img src="https://www.unac.edu.co/wp-content/uploads/2023/06/Logo_UNAC_svg.svg" alt="" />
                </Link>

                {pedido ? (
                    <>
                        <h2>La transacción por un valor de ${pedido && pedido.valor.toLocaleString()} quedo en estado <span>{pedido && pedido.estado}</span></h2>
                        <p>Vuelve a la tienda para realizar otra compra.</p>
                        <h3><span>Fecha: </span>{pedido && pedido.fecha}</h3>
                        <h3><span>Referencia: </span>{referencia}</h3>
                        <h3><span>Valor: </span>${pedido && pedido.valor.toLocaleString()}</h3>
                        <h3><span>Medio de pago: </span>{pedido && pedido.formaPago}</h3>
                    </>
                ) : (
                    <>
                        <h2>La transacción  quedo en estado <span>Cancelado</span></h2>
                        <p>Vuelve a la tienda para realizar otra compra.</p>
                    </>
                )
                }

                <button onClick={() => navigate("/")}>Volver a la tienda</button>
            </div>
        </div>
    )
}
