import { Card } from '../../dashboard/components/card'
import './Home.css'
import { Link } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
const Home = () => {
    const uData = [40, 3, 20, 27, 18, 23, 34, 18, 35, 68, 5, 12];
    const pData = [24, 13, 98, 39, 48, 38, 43, 7, 36, 14, 11, 52];
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    return (
        <div className="Inicio">
            <Breadcrumbs aria-label="breadcrumb"  className="LinkBread">
                <Link to="/Dashboard" color="inherit">
                    Dashboard
                </Link>
                <Typography color="text.primary">Inicio</Typography>
            </Breadcrumbs>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <Card titulo='Productos' porcentaje={-9.5} tipo={1} numeroTotal={350} numeroNuevos={12} clase={1} />
                </Grid>
                <Grid item xs={3}>
                    <Card titulo='Usuarios' porcentaje={3} tipo={1} numeroTotal={350} numeroNuevos={5} clase={1}/>
                </Grid>
                <Grid item xs={3}>
                    <Card titulo='Ventas' porcentaje={67} tipo={3} numeroTotal={1220} numeroNuevos={687} clase={1}/>
                </Grid>
                <Grid item xs={3}>
                    <Card titulo='Ingresos' porcentaje={9.5} tipo={4} numeroTotal={35000000} numeroNuevos={12000000} clase={1}/>
                </Grid>
            </Grid>
            <div className='Inicio-chart'>
                <Grid container spacing={2}>
                    <Grid item xs={9}>
                        <h4>Resumen de inscripciones</h4>
                        <div className='Inicio-chart-content'>
                            <LineChart
                                height={350}
                                series={[
                                    { data: pData, label: '2023' },
                                    { data: uData, label: '2024' },
                                ]}
                                xAxis={[{ scaleType: 'point', data: months }]}
                            />
                        </div>
                    </Grid>
                    <Grid item xs={3}>
                        <h4>Resumen de ingresos</h4>
                        <div className='Inicio-chart-content'>
                            <BarChart
                                series={[
                                    { data: [3500, 4400] }
                                ]}
                                height={350}
                                xAxis={[{ data: ['Enero', 'Febrero'], scaleType: 'band' }]}
                                margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
                            />
                        </div>
                    </Grid>

                </Grid>
            </div>
        </div>
    )
}

export default Home