import { useEffect, useState } from "react";
import { api } from "../../../../services";
import { Breadcrumbs, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Table } from "../../dashboard/components/table";
import ViewUsuarios from "./ViewUsuarios";

const Usuarios = () => {
    const [data, setData] = useState<any>(null);
    const [verUsuario, setVerUsuario] = useState(false);
    const [idUsuario, setIdUsuario] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (loading) {
            hadleGetUsuario();
        }
    }, [loading]);


    const handleVerUsuario = (id: number) => {
        setIdUsuario(id);
        setVerUsuario(true);
    }

    const hadleGetUsuario = () => {
        api.get<any>('Usuario/Get_Usuario').then((response) => {
            const productos = response.data.map((producto: any) => ({
                id: producto.idUsuario,
                nombre: producto.nombre + ' ' + producto.apellido,
                documento: producto.documento,
                celular: producto.celular,
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
                {verUsuario == true && (
                    <Link to="/Dashboard/Usuarios" onClick={() => setVerUsuario(false)} color="inherit">
                        Lista de usuarios
                    </Link>
                )}
                <Typography color="text.primary">{verUsuario == true ? ('Usuario') : ('Lista usuarios')}</Typography>
            </Breadcrumbs>
            {verUsuario == true ? (
                <ViewUsuarios mostrarRegistro={() => setVerUsuario(false)} idUsuario={idUsuario} actualizarDatos={hadleGetUsuario} />
            ) : (
                <>
                    <h2>Lista de usuarios</h2>
                    <div className="Layout_contenedor">
                        {data && (
                            <Table
                                data={data}
                                mostrarRegistro={handleVerUsuario}
                                verBotonBuscador={true}
                                verBotonExportar={true}
                                verBotonEditar={true}
                            />
                        )}
                    </div>
                </>
            )}

        </div>
    )
}

export default Usuarios