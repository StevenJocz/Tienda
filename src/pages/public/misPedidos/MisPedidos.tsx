import { useEffect, useState } from "react";
import { Footer } from "../../../components/footer"
import { Nav } from "../../../components/nav"
import './MisPedidos.css'
import { api } from "../../../services";
import { Table } from "../../private/dashboard/components/table";
import { useSelector } from "react-redux";
import { AppStore } from "../../../redux/Store";
import img from '../../../assets/img/SinComentarios.png'
import { ViewPedidos } from "../../private/page/pedidos";

const MisPedidos = () => {
    const [verPedido, setVerPedido] = useState(false);
    const [data, setData] = useState<any>(null);
    const [idPedido, setIdPedido] = useState(0);
    const [loading, setLoading] = useState(true);
    const usuario = useSelector((store: AppStore) => store.user);

    useEffect(() => {
        if (loading) {
            hadleGetPedido();
        }
    }, [loading]);

    const hadleGetPedido = async () => {
        // Solicitud GET
        api.get<any>('Pedido/Get_Pedidos', { accion: 2, idUsuario: usuario.idUsuario }).then((response) => {

            const PedidoFiltrados = response.data.map((pedido: any) => ({
                id: pedido.id,
                Orden: '#' + pedido.orden,
                Total: '$' + (pedido.total).toLocaleString(),
                "Estado pago": pedido.estadoPedido,
                "Estado envio": pedido.estadoEnvio,
                "Tipo Entrega": pedido.tipoEntrega,
                Fecha: pedido.fecha,
            }));

            setData(PedidoFiltrados);
            setLoading(false);

        })
    };

    const hadleVerPedido = (id: number) => {
        setIdPedido(id);
        setVerPedido(!verPedido);
    };

    return (
        <div className='Home' >
            <div className='Home_nav'>
                <Nav />
            </div>
            <div className='Home_main' id='Home_main'>
                <div className="MisPedidos">
                    <div className="MisPedidos_Encabezado">
                        <h2>Mis Pedidos</h2>
                        {data ? (
                            <p>En esta sección, podrás visualizar todos los pedidos que has realizado. Aquí también podrás consultar el estado actual de cada pedido y el progreso del envío, para que estés siempre al tanto del estado de tu compra.</p>
                        ) : (
                            <p>Actualmente no tienes pedidos en tu historial. ¡Explora nuestra tienda y realiza tu primera compra para comenzar!</p>
                        )}

                    </div>
                    {verPedido == true ? (
                        <ViewPedidos
                            mostrarRegistro={() => setVerPedido(false)}
                            idPedido={idPedido}
                            actualizarDatos={hadleGetPedido}
                            esAdmin={false}
                        />

                    ) : (
                        <>
                            {data ? (
                                <Table
                                    data={data}
                                    mostrarRegistro={hadleVerPedido}
                                    verBotonEditar={true}
                                />
                            ) : (
                                <div className="MisPedidos_SinPedidos">
                                    <img src={img} alt="" />
                                </div>
                            )}
                        </>
                    )}

                </div>
                <Footer />
            </div>
        </div>
    )
}

export default MisPedidos