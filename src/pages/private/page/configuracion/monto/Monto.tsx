import { useEffect, useState } from 'react'
import { api } from '../../../../../services';
import { Table } from '../../../dashboard/components/table';
import AddMonto from './AddMonto';
import '../Configuracion.css'

const Monto = () => {
    const [registrarMonto, setRegistrarMonto] = useState(false);
    const [data, setData] = useState<any>(null);
    const [idMonto, setIdMonto] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (loading) {
            hadleGetMonto();
        }
    }, [loading]);


    const hadleGetMonto = async () => {
        // Solicitud GET
        api.get<any>('Generales/Get_Monto', { IdMonto: 1 }).then((response) => {
            
            const MontoFiltrados = response.data.map((monto: any) => ({
                id: monto.idMonto,
                valor: '$'+(monto.valorMonto).toLocaleString(),
                Actualizado:  new Date(monto.fechaActualizacion).toISOString().split('T')[0],
            }));

            setData(MontoFiltrados);
            setLoading(false);
            
        })
    };

    const hadleRegistroMonto = (id: number) => {
        setIdMonto(id);
        setRegistrarMonto(!registrarMonto);
    };

    return (
        <div className='Configuracion_Formulario'>
            <h4>Monto de envio gratis</h4>
            {data && (
                <Table
                    data={data}
                    mostrarRegistro={hadleRegistroMonto}
                    verBotonVer={true}
                    verBotonBuscador={true}
                />
            )}
            {registrarMonto && (
                <AddMonto
                    mostrarRegistro={() => setRegistrarMonto(false)}
                    idMonto={idMonto}
                    actualizarDatos={hadleGetMonto}
                />
            )}
        </div>);
}

export default Monto