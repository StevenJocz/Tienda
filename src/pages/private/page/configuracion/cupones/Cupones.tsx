import { useEffect, useState } from 'react';
import '../Configuracion.css'
import { api } from '../../../../../services';
import { Table } from '../../../dashboard/components/table';

const Cupones = () => {
    const [registrarCupon, setRegistrarCupon] = useState(false);
    const [data, setData] = useState<any>(null);
    const [idCupon, setIdCupon] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (loading) {
            hadleGetCupon();
        }
    }, [loading]);


    const hadleGetCupon = async () => {
        // Solicitud GET
        api.get<any>('Tag/Get_Tag', { accion: 1 }).then((response) => {
            const CuponFiltradas = response.data.map((tag: any) => ({
                id: tag.idTag,
                tag: tag.tag,
                activo: tag.activo,
            }));
            setData(CuponFiltradas);
            setLoading(false);
        })
    };

    const hadleRegistroCupon = (id: number) => {
        setIdCupon(id);
        setRegistrarCupon(!registrarCupon);
    };

    return (
        <div className='Configuracion_Formulario'>
            <h4>Tags</h4>
            {data && (
                <Table
                    data={data}
                    mostrarRegistro={hadleRegistroCupon}
                    verBotonVer={true}
                    verBotonBuscador={true}
                    verBotonRegistro={true}
                />
            )}
            {registrarCupon && (
                <AddCupon
                    mostrarRegistro={() => setRegistrarCupon(false)}
                    idTag={idCupon}
                    actualizarDatos={hadleGetCupon}
                />
            )}
        </div>);
}

export default Cupones;
