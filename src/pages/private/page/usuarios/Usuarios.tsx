import { useEffect, useState } from "react";
import { api } from "../../../../services";
import { Breadcrumbs, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Table } from "../../dashboard/components/table";

const Usuarios = () => {
    const [data, setData] = useState<any>(null);
    const [verAddUsuario, setVerAddUsuario] = useState(false);
   //const [idUsuario, setIdUsuario] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (loading) {
            hadleGetUsuario();
        }
    }, [loading]);


    // const handleAddUsuario = (id: number) => {
    //     setIdUsuario(id);
    //     setVerAddUsuario(true);
    // }

    const hadleGetUsuario = () => {
        api.get<any>('Usuario/Get_Usuario').then((response) => {
            const productos = response.data.map((producto: any) => ({
                id: producto.idUsuario,
                nombre: producto.nombre + ' ' + producto.apellido, 
                docuemento: producto.tipoDocumento + ' ' + producto.documento, 
                celular:producto.celular,
                fechaRegistro: new Date(producto.fechaRegistro).toISOString().split('T')[0],
                rol: producto.tipoUsuario,
            }));
            setData(productos);
            setLoading(false);
        })
    };



    return (
        <div className='Productos'>
            <Breadcrumbs aria-label="breadcrumb" className="LinkBread">
                <Link to="/Dashboard" color="inherit">
                    Dashboard
                </Link>
                {verAddUsuario == true && (
                    <Link to="/Dashboard/Usuarios" onClick={() => setVerAddUsuario(false)} color="inherit">
                        Usuarios
                    </Link>
                )}
                <Typography color="text.primary">{verAddUsuario == true ? ('Crear Usuario') : ('Usuarios')}</Typography>
            </Breadcrumbs>
            {verAddUsuario == true ? (
                // <AddProductos mostrarRegistro={() => setVerAddProducto(false)} idProducto={idProducto} actualizarDatos={hadleGetCProdcutos} />
                <div></div>
            ) : (
                <>
                    <h2>Usuarios</h2>
                    <div className="Layout_contenedor">
                        {data && (
                            <Table
                                data={data}
                                verBotonBuscador={true}
                                verBotonExportar={true}
                            />
                        )}
                    </div>
                </>
            )}

        </div>
    )
}

export default Usuarios