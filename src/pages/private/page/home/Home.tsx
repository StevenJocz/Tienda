import { Card } from '../../dashboard/components/card';
import './Home.css';
import { Link } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { LineChart } from '@mui/x-charts/LineChart';
import { api } from '../../../../services';
import { useEffect, useState } from 'react';
import { items } from '../../../../models/Estados';

interface ChartData {
    series: Array<{
        data: number[];
        label: string;
    }>;
    months: string[];
}

const Home = () => {
    const [items, setItems] = useState<items[]>([]);
    const [pData, setPData] = useState<number[]>([]);
    const [uData, setUData] = useState<number[]>([]);
    const [months, setMonths] = useState<string[]>([]);

    useEffect(() => {
        hadleGetItems();
        hadleGetChart(); // Llama a la función para obtener los datos del gráfico
    }, []);

    const hadleGetItems = async () => {
        const response = await api.get<items[]>('Generales/Get_ItemDashboard');
        if (response.data) {
            setItems(response.data);
        }
    };

    const hadleGetChart = async () => {
        try {
            const response = await api.get<ChartData>('Generales/Get_VentasPorMesYAnio');
            const data = response.data;

            if (data) {
                setPData(data.series.find(serie => serie.label === '2023')?.data || []);
                setUData(data.series.find(serie => serie.label === '2024')?.data || []);
                setMonths(data.months);
            }
        } catch (error) {
            console.error('Error fetching chart data:', error);
        }
    };

    return (
        <div className="Inicio">
            <Breadcrumbs aria-label="breadcrumb" className="LinkBread">
                <Link to="/Dashboard" color="inherit">
                    Dashboard
                </Link>
                <Typography color="text.primary">Inicio</Typography>
            </Breadcrumbs>
            <Grid container spacing={2}>
                {items && items.map((item, index) => (
                    <Grid item xs={3} key={index}>
                        <Card
                            titulo={item.titulo}
                            porcentaje={item.porcentaje}
                            tipo={item.tipo}
                            numeroTotal={item.numeroTotal}
                            numeroNuevos={item.numeroNuevos}
                            clase={item.clase}
                        />
                    </Grid>
                ))}
            </Grid>
            <div className='Inicio-chart'>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <h4>Resumen de pedidos</h4>
                        <div className='Inicio-chart-content'>
                            <LineChart
                                height={400}
                                series={[
                                    { data: pData, label: '2023' },
                                    { data: uData, label: '2024' },
                                ]}
                                xAxis={[{ scaleType: 'point', data: months }]}
                            />
                        </div>
                    </Grid>
                  
                </Grid>
            </div>
        </div>
    );
};

export default Home;
