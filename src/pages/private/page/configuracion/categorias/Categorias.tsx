import '../Configuracion.css'
import { useEffect, useState } from 'react';
import { api } from '../../../../../services';
import { Table } from '../../../dashboard/components/table';
import AddCategoria from './AddCategoria';

const Categorias = () => {
    const [registrarCategorias, setRegistrarCategorias] = useState(false);
    const [data, setData] = useState<any>(null);
    const [idCategorias, setIdCategorias] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (loading) {
            hadleGetCategorias();
        }
    }, [loading]);

    const hadleGetCategorias = async () => {
        // Solicitud GET
        api.get<any>('Categoria/Get_Categoria', { accion: 1 }).then((response) => {
            const categoriasFiltradas = response.data.map((categoria: any) => ({
                id: categoria.idCategoria,
                foto: categoria.imagen,
                nombre: categoria.nombre,
                activo: categoria.activo
            }));
            setData(categoriasFiltradas);
            setLoading(false);
        })
    };

    const hadleRegistroCategorias = (id: number) => {
        setIdCategorias(id);
        setRegistrarCategorias(!registrarCategorias);
    };
    return (
        <div className='Configuracion_Formulario'>
            <h4>Categorías</h4>
            {data && (
                <Table
                    data={data}
                    mostrarRegistro={hadleRegistroCategorias}
                    verBotonVer={true}
                    verBotonBuscador={true}
                    verBotonRegistro={true}
                />
            )}
            {registrarCategorias && (
                <AddCategoria
                    mostrarRegistro={() => setRegistrarCategorias(false)}
                    idCategoria={idCategorias}
                    actualizarDatos={hadleGetCategorias}
                />
            )}
        </div>
    )
}

export default Categorias
