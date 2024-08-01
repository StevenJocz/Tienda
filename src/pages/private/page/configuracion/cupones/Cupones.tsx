import { useEffect, useState } from 'react';
import '../Configuracion.css'
import { api } from '../../../../../services';
import { Table } from '../../../dashboard/components/table';
import AddCupones from './AddCupones';

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
        api.get<any>('Generales/Get_Cupones').then((response) => {
            const CuponFiltradas = response.data.map((cupones: any) => ({
                id: cupones.idCupon,
                cupon: cupones.textoCupon,
                valor: cupones.valorCupon ,
                Fecha_Limite: cupones.fechaLimite,
                activo: cupones.activo,
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
            <h4>Cupones</h4>
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
                <AddCupones
                    mostrarRegistro={() => setRegistrarCupon(false)}
                    idCupon={idCupon}
                    actualizarDatos={hadleGetCupon}
                />
            )}
        </div>);
}

export default Cupones;
