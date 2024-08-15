import { useEffect, useState } from "react";
import { api } from "../../../../services";
import { Table } from "../../dashboard/components/table";
import { Breadcrumbs, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ViewPedidos from "./ViewPedidos";


const Pedidos = () => {
    const [verPedido, setVerPedido] = useState(false);
    const [data, setData] = useState<any>(null);
    const [idPedido, setIdPedido] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (loading) {
            hadleGetPedido();
        }
    }, [loading]);

    const hadleGetPedido = async () => {
        // Solicitud GET
        api.get<any>('Pedido/Get_Pedidos', { accion: 1, idUsuario: 0 }).then((response) => {

            const PedidoFiltrados = response.data.map((pedido: any) => ({
                id: pedido.id,
                Orden: '#' +pedido.orden,
                Total: '$' + (pedido.total).toLocaleString(),
                Cliente: pedido.cliente,
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
        <div className='Productos'>
            <Breadcrumbs aria-label="breadcrumb" className="LinkBread">
                <Link to="/Dashboard" color="inherit">
                    Dashboard
                </Link>
                {verPedido == true && (
                    <Link to="/Dashboard/Pedidos" onClick={() => setVerPedido(false)} color="inherit">
                        Pedidos
                    </Link>
                )}
                <Typography color="text.primary">{verPedido == true ? ('Pedido # '+idPedido) : ('Pedidos')}</Typography>
            </Breadcrumbs>
            {verPedido == true ? (
                <ViewPedidos mostrarRegistro={() => setVerPedido(false)} idPedido={idPedido}  actualizarDatos={hadleGetPedido}/>

            ) : (
                <>
                    <h2>Pedidos</h2>
                    <div className="Layout_contenedor">
                        {data && (
                            <Table
                                data={data}
                                mostrarRegistro={hadleVerPedido}
                                verBotonEditar={true}
                                verBotonBuscador={true}
                                verBotonExportar={true}
                            />
                        )}
                    </div>
                </>
            )}

        </div>
    );
}

export default Pedidos