import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useState } from 'react';
import { Button, InputAdornment, Pagination, TextField, Tooltip } from '@mui/material';
import { IonIcon } from '@ionic/react';
import { trashOutline, createOutline, searchOutline, downloadOutline,constructOutline, addOutline, peopleOutline, eyeOutline, thumbsUpOutline, checkmarkDoneOutline } from 'ionicons/icons';
import './Table.css';
import { services } from '../../../../models';


interface Contacto {
    foto: string;
    nombre: string;
    correo: string;
}

const RightAlignedContainer = styled('div')({
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
});

const StyledPagination = styled(Pagination)({
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
});

const StyledTextField = styled(TextField)({
    width: '50%',
    background: '#fff'
});

const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#f2f2f2',
        border: '1px solid rgb(240, 240, 240)',
        borderBottom: '2px solid rgb(240, 240, 240)',
        color: '#000',
        fontWeight: 600,
        fontSize: 13,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(() => ({
    '&': {
        backgroundColor: '#fff', // Color de fondo
        borderTop: '1px solid rgb(240, 240, 240)', // Borde superior
        borderBottom: '2px solid rgb(240, 240, 240)', // Borde inferior
        color: '#000', // Color del texto
    },
}));

interface Props {
    data: Array<{ [key: string]: any }>;
    mostrarRegistro?: (id: number) => void;
    mostrarLista?: (id: number) => void;
    mostrarConfiguracion?: (id: number) => void;
    verBotonBuscador?: boolean;
    verBotonRegistro?: boolean;
    verBotonVer?: boolean;
    verBotonEditar?: boolean;
    verBotonEliminar?: boolean;
    verBotonExportar?: boolean;
    verListaEstudiantes?: boolean;
    verAsistencias?: boolean;
    botonEstado?: boolean;
    verBotonConfigurar?: boolean;

}

const DynamicTable: React.FC<Props> = ({ data, mostrarRegistro, verBotonRegistro, mostrarConfiguracion, verBotonConfigurar,verBotonVer, verBotonEliminar, verBotonEditar, verBotonBuscador, verBotonExportar, mostrarLista, verListaEstudiantes, botonEstado, verAsistencias }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(0);
    const rowsPerPage = 10;

    // Obtener los nombres de las columnas basados en las propiedades del primer objeto en los datos
    const columns = data.length > 0 ? Object.keys(data[0]).filter(column => column !== 'id') : [];

    // Filtrar los datos basados en el término de búsqueda y ordenar por ID descendente
    const filteredData = data.filter((row) =>
        Object.values(row).some(
            (value) => typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
        )
    ).sort((a, b) => b.id - a.id);

    // Calcular el índice de inicio y fin de los datos a mostrar en la página actual
    const startIndex = page * rowsPerPage;
    const endIndex = Math.min(startIndex + rowsPerPage, filteredData.length);
    const visibleRows = filteredData.slice(startIndex, endIndex);

    // Calcular el número total de páginas
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);

    // Manejar el cambio de página
    const handleChangePage = (
        event: React.ChangeEvent<unknown> | null,
        newPage: number,
    ) => {
        if (event) {
            setPage(newPage - 1);
        }
    };

    const VerRegistro = (id: number) => {
        if (mostrarRegistro) {
            mostrarRegistro(id);
        }
    };

    const VerConfiguracion = (id: number) => {
        if (mostrarConfiguracion) {
            mostrarConfiguracion(id);
        }
    };

    const Verlista = (id: number) => {
        if (mostrarLista) {
            mostrarLista(id);
        }
    };


    const renderActive = (isActive: boolean) => {
        if (isActive) {
            return (
                <div style={{
                    color: '#52c41a',
                    backgroundColor: '#bbf77f3d',
                    borderColor: 'rgb(149, 222, 100)',
                    width: '100%',
                    padding: '0 20px'
                }}>
                    Activo
                </div>
            );
        } else {
            return (
                <div style={{
                    color: 'rgb(255, 77, 79)',
                    backgroundColor: 'rgb(255, 241, 240)',
                    borderColor: 'rgb(255, 163, 158)',
                    width: '100%',
                    padding: '0 20px'
                }}>
                    Inactivo
                </div>
            );
        }
    };

    const renderEstado = (Estado: string) => {
        if (Estado == 'Aprobado' || Estado == 'Pagado') {
            return (
                <div style={{
                    color: '#52c41a',
                    backgroundColor: '#bbf77f3d',
                    borderColor: 'rgb(149, 222, 100)',
                    width: '100%',
                    padding: '0 20px'
                }}>
                    {Estado}
                </div>
            );
        } else if (Estado == 'En curso' || Estado == 'Pendiente') {
            return (
                <div style={{
                    color: '#053e74',
                    backgroundColor: '#106bb53d',
                    borderColor: '#052e74',
                    width: '100%',
                    padding: '0 20px'
                }}>
                    {Estado}
                </div>
            );
        } else {
            return (
                <div style={{
                    color: 'rgb(255, 77, 79)',
                    backgroundColor: 'rgb(255, 241, 240)',
                    borderColor: 'rgb(255, 163, 158)',
                    width: '100%',
                    padding: '0 20px'
                }}>
                    {Estado}
                </div>
            );
        }
    };

    const renderRol = (rol: string) => {
        if (rol == 'Administrador') {
            return (
                <div style={{
                    color: '#c4971a',
                    backgroundColor: '#f6f6b4ea',
                    borderColor: 'rgb(149, 222, 100)',
                    width: '100%',
                    padding: '0 20px'
                }}>
                    {rol}
                </div>
            );
        } else if (rol == 'Profesor') {
            return (
                <div style={{
                    color: '#053e74',
                    backgroundColor: '#106bb53d',
                    borderColor: '#052e74',
                    width: '100%',
                    padding: '0 20px'
                }}>
                    {rol}
                </div>
            );
        } else {
            return (
                <div style={{
                    color: '#52c41a',
                    backgroundColor: '#bbf77f96',
                    borderColor: 'rgb(255, 163, 158)',
                    width: '100%',
                    padding: '0 20px'
                }}>
                    {rol}
                </div>
            );
        }
    };


    const ContactInfoCell: React.FC<Contacto> = ({ foto, nombre, correo }) => (
        <div className='divTableImagen'>
            <img className='imgTable' src={`${services.url}/${foto}`} alt="Foto de perfil" />
            <div>
                <h4>{nombre}</h4>
                <p>{correo}</p>
            </div>
        </div>
    );

    return (
        <div className='DynamicTable'>
            {/* Campo de búsqueda */}
            <div className='DynamicTable_acciones'>
                {verBotonBuscador && (
                    <StyledTextField
                        label="Buscar"
                        variant="outlined"
                        size="small"
                        color="secondary"
                        value={searchTerm}
                        placeholder='Buscar...'
                        onChange={(e) => setSearchTerm(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <IonIcon className='icono' icon={searchOutline} />
                                </InputAdornment>
                            ),
                        }}
                    />
                )}
                <div className='DynamicTable_acciones-botones'>
                    {verBotonRegistro && (
                        <Button variant="outlined" size="small" startIcon={<IonIcon className='' icon={addOutline} />} onClick={() => VerRegistro(0)}>Registrar</Button>
                    )}
                    {verBotonExportar && (
                        <Tooltip title="Exportar xml" disableInteractive >
                            <IonIcon className='iconos' icon={downloadOutline} />
                        </Tooltip>
                    )}
                </div>
            </div>
            <p className='TotalRegistros'><span>Total registros:</span>{data.length}</p>

            {/* Contenedor de la tabla */}
            <TableContainer >
                <Table aria-label="customized table">
                    {/* Encabezado de la tabla */}
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">#</StyledTableCell>
                            {/* Renderizar las columnas existentes */}
                            {columns.map((column, index) => (
                                <StyledTableCell key={index} align="center">
                                    {column.toUpperCase()}
                                </StyledTableCell>
                            ))}
                            {/* Renderizar la columna de acciones */}
                            {(verBotonEditar || verBotonEliminar || verListaEstudiantes || verBotonVer) && (
                                <StyledTableCell align="center" style={{ width: 150 }}>ACCIONES</StyledTableCell>
                            )}
                        </TableRow>
                    </TableHead>
                    {/* Cuerpo de la tabla */}
                    <TableBody>
                        {visibleRows.map((row, index) => (
                            <StyledTableRow key={index}>
                                <StyledTableCell align="center">{startIndex + index + 1}</StyledTableCell>
                                {/* Renderizar las celdas de la fila */}
                                {columns.map((column, index) => {
                                    // Definimos una variable para almacenar el contenido de la celda
                                    let cellContent = null;

                                    // Dependiendo del nombre de la columna, asignamos contenido a la variable cellContent
                                    if (column === 'foto') {
                                        cellContent = <img className='imgTable' src={`${services.url}/${row[column]}`} alt="Foto de perfil" />;
                                    } else if (column === 'Usuario') {
                                        cellContent = (
                                            <div>
                                                {(row[column] as { foto: string; nombre: string; correo: string }[]).map((contacto, idx) => (
                                                    <ContactInfoCell key={idx} {...contacto} />
                                                ))}
                                            </div>
                                        );
                                    } else if (column === 'estado') {
                                        cellContent = renderEstado(row[column]);
                                    } else if (column === 'rol') {
                                        cellContent = renderRol(row[column]);
                                    } else if (column === 'activo') {
                                        cellContent = renderActive(row[column]);
                                    } else {
                                        cellContent = row[column];
                                    }
                                    return (
                                        <StyledTableCell key={index} align="center">
                                            {cellContent}
                                        </StyledTableCell>
                                    );
                                })}
                                {/* Celda de los botones */}
                                <StyledTableCell align="center">
                                    {verBotonVer && (
                                        <Tooltip title="Ver" disableInteractive>
                                            <IonIcon className='icono iconoVer' icon={eyeOutline} onClick={() => VerRegistro(row.id)} />
                                        </Tooltip>
                                    )}
                                    {verBotonEditar && (
                                        <Tooltip title="Editar o ver información" disableInteractive>
                                            <IonIcon className='icono iconoEdit' icon={createOutline} onClick={() => VerRegistro(row.id)} />
                                        </Tooltip>
                                    )}
                                    {verBotonConfigurar && (
                                        <Tooltip title="Configurar curso" disableInteractive>
                                            <IonIcon className='icono iconoConfig' icon={constructOutline} onClick={() => VerConfiguracion(row.id)} />
                                        </Tooltip>
                                    )}
                                    {verListaEstudiantes && (
                                        <Tooltip title="Ver lista de Estudiantes" disableInteractive>
                                            <IonIcon className='icono iconoLista' icon={peopleOutline} onClick={() => Verlista(row.id)} />
                                        </Tooltip>
                                    )}
                                    {verBotonEliminar && (
                                        <Tooltip title="Eliminar" disableInteractive>
                                            <IonIcon className='icono iconoTrash' icon={trashOutline} />
                                        </Tooltip>
                                    )}
                                    {verAsistencias && (
                                        <Tooltip title="Asistencias" disableInteractive>
                                            <IonIcon className='icono iconoLista' icon={checkmarkDoneOutline} onClick={() => VerRegistro(row.id)} />
                                        </Tooltip>
                                    )}
                                    {botonEstado && (
                                        <Tooltip title="Aprobar/No aprobar" disableInteractive>
                                            <IonIcon className='icono iconoAprobar' icon={thumbsUpOutline} onClick={() => VerRegistro(row.id)} />
                                        </Tooltip>
                                    )}
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* Paginación de la tabla */}
            <RightAlignedContainer>
                <StyledPagination
                    color='primary'
                    count={totalPages}
                    page={page + 1}
                    onChange={(event, newPage) => handleChangePage(event, newPage)}
                />
            </RightAlignedContainer>
        </div>
    );
}

export default DynamicTable;
