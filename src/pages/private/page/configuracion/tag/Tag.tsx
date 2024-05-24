import { useEffect, useState } from 'react';
import '../Configuracion.css'
import { api } from '../../../../../services';
import { Table } from '../../../dashboard/components/table';
import AddTag from './AddTag';

const Tag = () => {
    const [registrarTag, setRegistrarTag] = useState(false);
    const [data, setData] = useState<any>(null);
    const [idTag, setIdTag] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (loading) {
            hadleGetTag();
        }
    }, [loading]);


    const hadleGetTag = async () => {
        // Solicitud GET
        api.get<any>('Tag/Get_Tag', { accion: 1 }).then((response) => {
            const categoriasFiltradas = response.data.map((tag: any) => ({
                id: tag.idTag,
                tag: tag.tag,
                activo: tag.activo,
            }));
            setData(categoriasFiltradas);
            setLoading(false);
        })
    };

    const hadleRegistroTag = (id: number) => {
        setIdTag(id);
        setRegistrarTag(!registrarTag);
    };
    return (
        <div className='Configuracion_Formulario'>
            <h4>Tags</h4>
            {data && (
                <Table
                    data={data}
                    mostrarRegistro={hadleRegistroTag}
                    verBotonVer={true}
                    verBotonBuscador={true}
                    verBotonRegistro={true}
                />
            )}
            {registrarTag && (
                <AddTag
                    mostrarRegistro={() => setRegistrarTag(false)}
                    idTag={idTag}
                    actualizarDatos={hadleGetTag}
                />
            )}
        </div>
    )
}

export default Tag