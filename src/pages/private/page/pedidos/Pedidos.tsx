import { useEffect, useState } from "react";
import { api } from "../../../../services";
import { Table } from "../../dashboard/components/table";
import { Breadcrumbs, Button, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import ViewPedidos from "./ViewPedidos";
import { IonIcon } from "@ionic/react";
import { addOutline, reloadOutline } from 'ionicons/icons';
import AddPedido from "./AddPedido";


const Pedidos = () => {
    const [verPedido, setVerPedido] = useState(false);
    const [addPedido, setAddPedido] = useState(false);
    const [data, setData] = useState<any>(null);
    const [idPedido, setIdPedido] = useState(0);
    const [loading, setLoading] = useState(true);
    const { idPedido: idPedidoParam } = useParams<{ idPedido?: string }>();

    useEffect(() => {
        if (loading) {
            hadleGetPedido();
        }
        // Si existe un idPedido en la ruta, llama a hadleVerPedido con el id
        if (idPedidoParam) {
            hadleVerPedido(parseInt(idPedidoParam));
        }
    }, [loading, idPedidoParam]);

    const hadleGetPedido = async () => {
        // Solicitud GET
        api.get<any>('Pedido/Get_Pedidos', { accion: 1, idUsuario: 0 }).then((response) => {

            const PedidoFiltrados = response.data.map((pedido: any) => ({
                id: pedido.id,
                Orden: '#' + pedido.orden,
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
        setVerPedido(true);
        setAddPedido(false);
    };

    return (
        <div className='Productos'>
            <Breadcrumbs aria-label="breadcrumb" className="LinkBread">
                <Link to="/Dashboard" color="inherit">
                    Dashboard
                </Link>
                {
                    (verPedido || addPedido) && (
                        <Link to="/Dashboard/Pedidos" onClick={() => {
                            setVerPedido(false);
                            setAddPedido(false);
                        }} color="inherit">
                            Pedidos
                        </Link>
                    )
                }
                <Typography color="text.primary">
                    {verPedido ? ('Pedido # ' + idPedido) : addPedido ? ('Agregar pedido') : ('Pedidos')}
                </Typography>
            </Breadcrumbs>
            {verPedido == true ? (
                <ViewPedidos
                    mostrarRegistro={() => setVerPedido(false)}
                    idPedido={idPedido}
                    actualizarDatos={hadleGetPedido}
                    esAdmin={true}
                />

            ) : addPedido == true ? (
                <AddPedido  
                    mostrarRegistro={() => setAddPedido(false)}
                />
            ): (
                <>
                    <h2>Pedidos</h2>
                    <div className="Productos_botones">
                        <Button
                            variant="outlined"
                            size="small"
                            color="secondary"
                            startIcon={<IonIcon className='' icon={reloadOutline} />}
                            onClick={() => hadleGetPedido()}
                        >
                            Recargar
                        </Button>
                        <div>
                            <Button
                                variant="outlined"
                                size="small"
                                startIcon={<IonIcon className='' icon={addOutline} />}
                                onClick={() => setAddPedido(true)}
                            >
                                Registrar
                            </Button>
                        </div>
                    </div>

                    <div className="Layout_contenedor">

                        {data && (
                            <Table
                                data={data}
                                mostrarRegistro={hadleVerPedido}
                                verBotonEditar={true}
                                verBotonBuscador={true}
                                verBotonExportar={true}
                            //verBotonRegistro={true}
                            />
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

export default Pedidos