import { Button } from "@mui/material";
import { IonIcon } from "@ionic/react";
import { arrowBackOutline } from 'ionicons/icons';
import './Usuarios.css'
import { api } from "../../../../services";
import { useEffect, useState } from "react";
import { Table } from "../../dashboard/components/table";
import img from '../../../../assets/img/usuario.png'
import { UsuarioInformacion } from "../../../../models";

interface Props {
    mostrarRegistro: () => void;
    actualizarDatos?: () => void;
    idUsuario: number;
}

const ViewUsuarios: React.FC<Props> = (props) => {
    const [dataPedidos, setDataPedidos] = useState<any>(null);
    const [dataFavoritos, setDataFavoritos] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [datosUsuarios, setDatosUsuarios] = useState<UsuarioInformacion>();

    useEffect(() => {
        if (loading) {
            hadleGetPedido();
            hadleGetFavoritos();
            hadleGetUsuarios();
        }
    }, [loading])




    const hadleGetUsuarios = async () => {

        const response = await api.get<UsuarioInformacion[]>('Usuario/Get_Informacion_Usuario', { IdUsuario: props.idUsuario });
        if (response.data.length > 0) {
            setDatosUsuarios({
                idUsuario: response.data[0].idUsuario,
                tipoUsuario: response.data[0].tipoUsuario,
                nombre: response.data[0].nombre,
                apellido: response.data[0].apellido,
                tipoDocumento: response.data[0].tipoDocumento,
                documento: response.data[0].documento,
                fechaNacimiento: new Date(response.data[0].fechaNacimiento).toISOString().split('T')[0],
                celular: response.data[0].celular,
                ubicacion: response.data[0].ubicacion,
                direccion: response.data[0].direccion,
                correo: response.data[0].correo,
                fechaRegistro: new Date(response.data[0].fechaRegistro).toISOString().split('T')[0],
            });
        }
    }

    const hadleGetPedido = async () => {
        // Solicitud GET
        api.get<any>('Pedido/Get_Pedidos', { accion: 2, idUsuario: props.idUsuario }).then((response) => {

            const PedidoFiltrados = response.data.map((pedido: any) => ({
                id: pedido.id,
                Orden: '#' +pedido.orden,
                Total: '$' + (pedido.total).toLocaleString(),
                "Estado pago": pedido.estadoPedido,
                "Estado envio": pedido.estadoEnvio,
                "Tipo Entrega": pedido.tipoEntrega,
                Fecha: pedido.fecha,
            }));

            setDataPedidos(PedidoFiltrados);
            setLoading(false);

        })
    };

    const hadleGetFavoritos= async () => {
        // Solicitud GET
        api.get<any>('Producto/Get_Favoritos_Usuario', {idUsuario: props.idUsuario }).then((response) => {

            console.log(response.data);
            const FavoritosFiltrados = response.data.map((producto: any) => ({
                id: producto.idProducto,
                foto: producto.imagen,
                nombre: producto.nombre,
                categoria: producto.categoria,
                
            }));

            setDataFavoritos(FavoritosFiltrados);
            setLoading(false);

        })
    };

    return (
        <div className="ViewUsuarios">
            <div className='AddProductos_Encabezado'>
                <h3>Usuario</h3>
                <div>
                    <Button
                        onClick={props.mostrarRegistro}
                        variant="outlined"
                        size="small"
                        startIcon={<IonIcon className='' icon={arrowBackOutline} />}
                    >
                        Volver a la lista
                    </Button>
                </div>
            </div>
            <div className="ViewUsuarios_Content">
                <div className="ViewUsuarios_Content_right">
                    <div className="ViewUsuarios_Content-content">
                        <h2>Datos del cliente</h2>
                        <img src={img} alt="" />
                        <h3>{datosUsuarios?.nombre + ' '+ datosUsuarios?.apellido}</h3>
                        <h3>{datosUsuarios?.tipoDocumento}</h3>
                        <h3>{datosUsuarios?.documento}</h3>
                        <h3>Celúlar: {datosUsuarios?.celular}</h3>
                        <h3>Fecha nacimiento: {datosUsuarios?.fechaNacimiento}</h3>

                    </div>
                    <div className="ViewUsuarios_Content-content">
                        <h2>Dirección predeterminada</h2>
                        <h3>{datosUsuarios?.ubicacion}</h3>
                        <h3>{datosUsuarios?.direccion}</h3>
                        <h3>{datosUsuarios?.correo}</h3>

                    </div>
                    <div className="ViewUsuarios_Content-content">
                        <h2>Datos de registro</h2>
                        <h3>{datosUsuarios?.fechaRegistro}</h3>
                        <h3>{datosUsuarios?.tipoUsuario}</h3>
                    </div>
                </div>
                <div className="ViewUsuarios_Content_left">
                    <h3>Historial de pedidos</h3>
                    {dataPedidos && (

                        <Table
                            data={dataPedidos}
                        />
                    )}
                    <h3>Lista de deseos</h3>
                    {dataFavoritos && (

                        <Table
                            data={dataFavoritos}
                        />
                    )}
                </div>

            </div>
        </div>
    )
}

export default ViewUsuarios