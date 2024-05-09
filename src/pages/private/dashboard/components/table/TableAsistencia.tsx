import React, { useState } from 'react';
import { IonIcon } from '@ionic/react';
import { eyeOutline, thumbsUpOutline, searchOutline } from 'ionicons/icons';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, styled, tableCellClasses, Tooltip, InputAdornment, TextField } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

interface Usuario {
    foto: string;
    nombre: string;
    correo: string;
}

interface Asistencia {
    clase: string;
    fecha: string;
}

interface Curso {
    id: number;
    Usuario: Usuario[];
    fechaInicio: string;
    estado: string;
    asistencia: Asistencia[];
}

interface Props {
    data: Curso[];
    mostrarRegistro?: (id: number) => void;
}

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

const StyledTextField = styled(TextField)({
    width: '50%',
    background: '#fff'
});

const ContactInfoCell: React.FC<Usuario> = ({ foto, nombre, correo }) => (
    <div className='divTableImagen divTableImagenAsis'>
        <img className='imgTable' src={foto} alt="Foto de perfil" />
        <div>
            <h4>{nombre}</h4>
            <p>{correo}</p>
        </div>
    </div>
);

const TableAsistencia: React.FC<Props> = ({ data, mostrarRegistro }) => {
    const fechasAsistencia: string[] = Array.from(new Set(data.flatMap(curso => curso.asistencia.map(asistencia => asistencia.clase))));
    const [searchTerm, setSearchTerm] = useState('');

    

    const VerRegistro = (id: number) => {
        if (mostrarRegistro) {
            mostrarRegistro(id);
        }
    };

    const filteredData = data.filter(curso =>
        curso.Usuario[0].nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        curso.Usuario[0].correo.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='TableAsistencia'>
            <div className='DynamicTable_acciones'>
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
            </div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Nombre del Estudiante</StyledTableCell>
                            {fechasAsistencia.map((clase, index) => (
                                <StyledTableCell key={index} align="center">{clase.toUpperCase()}</StyledTableCell>
                            ))}
                            <StyledTableCell align="center" style={{ width: 150 }}>ACCION</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredData.map((curso, index) => (
                            <StyledTableRow key={index}>
                                <StyledTableCell>
                                    <ContactInfoCell {...curso.Usuario[0]} />
                                </StyledTableCell>
                                {fechasAsistencia.map((fecha, index) => {
                                    const asistencia = curso.asistencia.find(a => a.fecha === fecha);
                                    return (
                                        <StyledTableCell key={index} align="center">

                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DemoContainer components={['DatePicker']}>
                                                    <DatePicker
                                                        className='Pickers'
                                                        label="FECHA ASISTENCIA"
                                                        value={asistencia?.fecha}
                                                    />
                                                </DemoContainer>
                                            </LocalizationProvider>
                                        </StyledTableCell>
                                    );
                                })}
                                <StyledTableCell align="center">
                                    <Tooltip title="Ver" disableInteractive>
                                        <IonIcon className='icono iconoVer' icon={eyeOutline} onClick={() => VerRegistro(curso.id)} />
                                    </Tooltip>
                                    <Tooltip title="Aprobar/No aprobar" disableInteractive>
                                        <IonIcon className='icono iconoAprobar' icon={thumbsUpOutline} onClick={() => VerRegistro(curso.id)} />
                                    </Tooltip>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default TableAsistencia;
