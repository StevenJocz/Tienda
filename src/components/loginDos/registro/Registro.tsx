import { IonIcon } from "@ionic/react";
import { closeOutline, eyeOutline, eyeOffOutline } from "ionicons/icons";
import { ErrorMessage, Form, Formik, FormikValues } from "formik";
import { BotonSubmit } from "../../boton";
import { MenuItem, TextField, styled } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { useEffect, useState } from "react";
import { api } from "../../../services";
import { Generos, Ubicacion, tipoDocumento } from "../../../models";
import { capitalizeFirstLetter } from "../../../utilities/Generales";


interface Props {
  mostrarInicio: () => void;
  onClose: () => void;
}

const Registro: React.FC<Props> = (props) => {
  const [paso, SetPaso] = useState(3);
  const [botonTexto, SetBotonTexto] = useState('Continuar');
  const [msg, setMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [verContraseña, setVerContraseña] = useState(false);
  const [verConfirmarContraseña, setVerConfirmarContraseña] = useState(false);
  const [tipoDocumentos, setTipoDocumentos] = useState<tipoDocumento[]>();
  const [genero, setGenero] = useState<Generos[]>();
  const [pais, setPais] = useState<Ubicacion[]>();
  const [departamento, setDepartamento] = useState<Ubicacion[]>();
  const [municipio, setMunicipio] = useState<Ubicacion[]>();

  const StyledTextField = styled(TextField)({
    width: '100%'
  });

  useEffect(() => {
    hadleGetTipoDocumentos();
    hadleGetGeneros();
    hadleGetUbicacion(1, 0);

  }, []);

  const hadleGetTipoDocumentos = async () => {
    const response = await api.get<tipoDocumento[]>('Generales/Get_TipoDocumento');
    if (response.data) {
      await setTipoDocumentos(response.data);
    };
  }

  const hadleGetGeneros = async () => {
    const response = await api.get<Generos[]>('Generales/Get_Generos');
    if (response.data) {
      await setGenero(response.data);
    };
  }

  const hadleGetUbicacion = async (accion: number, parametro: number) => {
    const response = await api.get<Ubicacion[]>('Generales/Get_Ubicacion', { Accion: accion, parametro: parametro });
    if (response.data) {
      if (accion == 1) {
        await setPais(response.data);
      } else if (accion == 2) {
        await setDepartamento(response.data);
      } else {
        await setMunicipio(response.data);
      }
    };
  }

  const handleRegistrar = async (values: FormikValues) => {
    setIsLoading(true);
    if (paso < 4) {
      SetPaso(paso + 1);
      SetBotonTexto('Continuar');
      setIsLoading(false);
      return;
    }

    if (paso == 3) {
      SetBotonTexto('Registrarme');
      setIsLoading(false);
      return;
    }

    if (paso == 4) {
      console.log(values);
      setMsg('Registrando')
    }


  };


  return (
    <>
      <div className="Login_content_header">
        <IonIcon
          className="icono"
          onClick={props.onClose}
          icon={closeOutline}
        />
      </div>
      <div className="Login_content_titulo">
        <h2>TIENDA UNAC</h2>
        <h3>Crear una cuenta</h3>
      </div>
      <div className="Login_content_body">
        <Formik
          enableReinitialize={true}
          initialValues={{
            correo: '',
            nombres: '',
            apellidos: '',
            tipoDocumento: '',
            documento: '',
            fechaNacimiento: null,
            celular: '',
            genero: '',
            pais: '',
            departamento: '',
            ciudad: '',
            direccion: '',
            contraseña: '',
            Confirmarcontraseña: '',
          }}
          validate={(valor) => {
            let errors: any = {};

            if (paso == 1) {

              if (!valor.correo) {
                errors.correo = 'Campo obligatorio';
                return errors;
              } else if (!/^\S+@\S+\.\S+$/.test(valor.correo)) {
                errors.correo = 'Introduce una dirección de correo electrónico válida';
                return errors;
              }

              if (!valor.tipoDocumento) {
                errors.tipoDocumento = 'Campo obligatorio';
                return errors;
              }

              if (!valor.documento) {
                errors.documento = 'Campo obligatorio';
                return errors;
              }

              if (!valor.nombres) {
                errors.nombres = 'Campo obligatorio';
                return errors;
              }

              if (!valor.apellidos) {
                errors.apellidos = 'Campo obligatorio';
                return errors;
              }

              return errors;

            } else if (paso == 2) {
              if (!valor.fechaNacimiento) {
                errors.fechaNacimiento = 'Campo obligatorio';
                return errors;
              }

              if (!valor.celular) {
                errors.celular = 'Campo obligatorio';
                return errors;
              }

              if (!valor.genero) {
                errors.genero = 'Campo obligatorio';
                return errors;
              }


            } else if (paso == 3) {
              if (!valor.direccion) {
                errors.direccion = 'Campo obligatorio';
                return errors;
              }

              if (!valor.pais) {
                errors.pais = 'Campo obligatorio';
                return errors;
              }

              if (!valor.departamento) {
                errors.departamento = 'Campo obligatorio';
                return errors;
              }

              if (!valor.ciudad) {
                errors.ciudad = 'Campo obligatorio';
                return errors;
              }

            } else if (paso == 4) {

              if (!valor.contraseña) {
                errors.contraseña = 'Campo obligatorio';
                return errors;
              }

              if (!valor.Confirmarcontraseña) {
                errors.Confirmarcontraseña = 'Campo obligatorio';
                return errors;
              }

              if (valor.contraseña.length < 8) {
                errors.contraseña = 'La contraseña debe contener al menos 8 caracteres';
                return errors;
              }

              if (!/(?=.*[A-Z])/.test(valor.contraseña)) {
                errors.contraseña = 'La contraseña debe contener al menos una mayúscula';
                return errors;
              }

              if (!/(?=.*\d)/.test(valor.contraseña)) {
                errors.contraseña = 'La contraseña debe contener al menos un número';
                return errors;
              }

              if (valor.contraseña !== valor.Confirmarcontraseña) {
                errors.Confirmarcontraseña = 'Las contraseñas no coinciden ';
                return errors;
              }
            }
          }}
          onSubmit={handleRegistrar}
        >
          {({ errors, values, setFieldValue, isSubmitting }) => (
            <Form>
              <>
                {paso === 1 && (
                  <>
                    <div className="Login_content_body-msg">
                      <p>Información personal</p>
                      <p>Paso {paso} de 4 </p>
                    </div>
                    <div className={`Login_content_body-input ${errors.correo ? 'Input_Error' : ''}`}>
                      <StyledTextField
                        name='correo'
                        label="Correo electrónico"
                        variant="outlined"
                        size="small"
                        placeholder='Introduce tu correo electrónico'
                        value={values.correo}
                        onChange={(e) => setFieldValue('correo', e.target.value)}
                      />
                      <ErrorMessage name='correo' component={() => <p className='Error'>{errors.correo}</p>} />
                    </div>
                    <div className={`Login_content_body-input ${errors.tipoDocumento ? 'Input_Error' : ''}`}>
                      <StyledTextField
                        id="outlined-select-currency"
                        select
                        label="Tipo de documento"
                        size="small"
                        variant="outlined"
                        value={values.tipoDocumento}
                        onChange={(e) => setFieldValue('tipoDocumento', e.target.value)}
                      >
                        {tipoDocumentos && tipoDocumentos.map((option) => (
                          <MenuItem key={option.idDocumento} value={option.idDocumento}>
                            {option.documento}
                          </MenuItem>
                        ))}

                        <MenuItem value={'0'}>
                          CC - Cedula
                        </MenuItem>
                      </StyledTextField>
                      <ErrorMessage name='tipoDocumento' component={() => <p className='Error'>{errors.tipoDocumento}</p>} />
                    </div>
                    <div className={`Login_content_body-input ${errors.documento ? 'Input_Error' : ''}`}>
                      <StyledTextField
                        name='documento'
                        label="Número de documento"
                        variant="outlined"
                        size="small"
                        placeholder='Introduce número de documento'
                        value={values.documento}
                        onChange={(e) => setFieldValue('documento', e.target.value)}
                      />
                      <ErrorMessage name='documento' component={() => <p className='Error'>{errors.documento}</p>} />
                    </div>
                    <div className={`Login_content_body-input ${errors.nombres ? 'Input_Error' : ''}`}>
                      <StyledTextField
                        name='nombres'
                        label="Nombres completos"
                        variant="outlined"
                        size="small"
                        placeholder='Introduce nombres completos'
                        value={values.nombres}
                        onChange={(e) => setFieldValue('nombres', e.target.value)}
                      />
                      <ErrorMessage name='nombres' component={() => <p className='Error'>{errors.nombres}</p>} />
                    </div>
                    <div className={`Login_content_body-input ${errors.apellidos ? 'Input_Error' : ''}`}>
                      <StyledTextField
                        name='apellidos'
                        label="Apellidos completos"
                        variant="outlined"
                        size="small"
                        placeholder='Introduce apellidos completos'
                        value={values.apellidos}
                        onChange={(e) => setFieldValue('apellidos', e.target.value)}
                      />
                      <ErrorMessage name='apellidos' component={() => <p className='Error'>{errors.apellidos}</p>} />
                    </div>
                  </>
                )}

                {paso === 2 && (
                  <>
                    <div className="Login_content_body-msg">
                      <p>Información personal</p>
                      <p>Paso {paso} de 4 </p>
                    </div>
                    <div className={`Login_content_body-input input_fecha_login ${errors.fechaNacimiento ? 'Input_Error' : ''}`}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                          <DatePicker
                            className='Pickers'
                            label="Fecha de nacimiento"
                            value={values.fechaNacimiento}
                            onChange={(date) => setFieldValue('fechaNacimiento', date)}
                          />
                        </DemoContainer>
                      </LocalizationProvider>
                      <ErrorMessage name='fechaNacimiento' component={() => <p className='Error'>{errors.fechaNacimiento}</p>} />
                    </div>
                    <div className={`Login_content_body-input ${errors.celular ? 'Input_Error' : ''}`}>
                      <StyledTextField
                        name='celular'
                        label="Número de celular"
                        variant="outlined"
                        size="small"
                        placeholder='Introduce número de celular'
                        value={values.celular}
                        onChange={(e) => setFieldValue('celular', e.target.value)}
                      />
                      <ErrorMessage name='celular' component={() => <p className='Error'>{errors.celular}</p>} />
                    </div>
                    <div className={`Login_content_body-input ${errors.genero ? 'Input_Error' : ''}`}>
                      <StyledTextField
                        id="outlined-select-currency"
                        select
                        label="Genero"
                        size="small"
                        variant="outlined"
                        value={values.genero}
                        onChange={(e) => setFieldValue('genero', e.target.value)}
                      >
                        {genero && genero.map((option) => (
                          <MenuItem key={option.idGenero} value={option.idGenero}>
                            {capitalizeFirstLetter(option.genero)}
                          </MenuItem>
                        ))}
                      </StyledTextField>
                      <ErrorMessage name='genero' component={() => <p className='Error'>{errors.genero}</p>} />
                    </div>
                  </>
                )}

                {paso === 3 && (
                  <>
                    <div className="Login_content_body-msg">
                      <p>Información de residencia</p>
                      <p>Paso {paso} de 4 </p>
                    </div>
                    <div className={`Login_content_body-input ${errors.pais ? 'Input_Error' : ''}`}>
                      <StyledTextField
                        id="outlined-select-currency"
                        select
                        label="Pais"
                        size="small"
                        variant="outlined"
                        value={values.pais}
                        onChange={(e) => {
                          setFieldValue('pais', e.target.value)
                          hadleGetUbicacion(2, parseInt(e.target.value))
                        }}
                      >
                        {pais && pais.map((option) => (
                          <MenuItem key={option.id} value={option.id}>
                            {capitalizeFirstLetter(option.nombre)}
                          </MenuItem>
                        ))}

                      </StyledTextField>
                      <ErrorMessage name='pais' component={() => <p className='Error'>{errors.pais}</p>} />
                    </div>
                    <div className={`Login_content_body-input ${errors.departamento ? 'Input_Error' : ''}`}>
                      <StyledTextField
                        id="outlined-select-currency"
                        select
                        label="Departamento"
                        size="small"
                        variant="outlined"
                        value={values.departamento}
                        onChange={(e) => {
                          setFieldValue('departamento', e.target.value)
                          hadleGetUbicacion(3, parseInt(e.target.value))
                        }}
                      >
                        {departamento && departamento.map((option) => (
                          <MenuItem key={option.id} value={option.id}>
                            {capitalizeFirstLetter(option.nombre)}
                          </MenuItem>
                        ))}
                      </StyledTextField>
                      <ErrorMessage name='departamento' component={() => <p className='Error'>{errors.departamento}</p>} />
                    </div>
                    <div className={`Login_content_body-input ${errors.ciudad ? 'Input_Error' : ''}`}>
                      <StyledTextField
                        id="outlined-select-currency"
                        select
                        label="Ciudad"
                        size="small"
                        variant="outlined"
                        value={values.ciudad}
                        onChange={(e) => setFieldValue('ciudad', e.target.value)}
                      >
                        {municipio && municipio.map((option) => (
                          <MenuItem key={option.id} value={option.id}>
                            {capitalizeFirstLetter(option.nombre)}
                          </MenuItem>
                        ))}
                      </StyledTextField>
                      <ErrorMessage name='ciudad' component={() => <p className='Error'>{errors.ciudad}</p>} />
                    </div>
                    <div className={`Login_content_body-input ${errors.direccion ? 'Input_Error' : ''}`}>
                      <StyledTextField
                        name='direccion'
                        label="Dirección"
                        variant="outlined"
                        size="small"
                        placeholder='Introduce tu dirección'
                        value={values.direccion}
                        onChange={(e) => setFieldValue('direccion', e.target.value)}
                      />
                      <ErrorMessage name='direccion' component={() => <p className='Error'>{errors.direccion}</p>} />
                    </div>
                  </>
                )}
                {paso === 4 && (
                  <>
                    <div className="Login_content_body-msg">
                      <p>Contaseña</p>
                      <p>Paso {paso} de 4 </p>
                    </div>
                    <div className={`Login_content_body-input ${errors.contraseña ? 'Input_Error' : ''}`}>
                      <StyledTextField
                        type={verContraseña ? 'text' : 'password'}
                        name='contraseña'
                        label="Contraseña"
                        variant="outlined"
                        size="small"
                        placeholder='Introduce tu contraseña'
                        value={values.contraseña}
                        onChange={(e) => setFieldValue('contraseña', e.target.value)}
                      />
                      <span
                        className="VerContraseña"
                        onClick={() => setVerContraseña(!verContraseña)}
                      >
                        {verContraseña ? <IonIcon className='eye-iconS' icon={eyeOffOutline} /> : <IonIcon className='eye-iconS' icon={eyeOutline} />}
                      </span>
                      <ErrorMessage name='contraseña' component={() => <p className='Error'>{errors.contraseña}</p>} />
                    </div>
                    <div className={`Login_content_body-input ${errors.Confirmarcontraseña ? 'Input_Error' : ''}`}>
                      <StyledTextField
                        type={verConfirmarContraseña ? 'text' : 'password'}
                        name='Confirmarcontraseña'
                        label="Confirmar contraseña"
                        variant="outlined"
                        size="small"
                        placeholder='Confirmar contraseña'
                        value={values.Confirmarcontraseña}
                        onChange={(e) => setFieldValue('Confirmarcontraseña', e.target.value)}
                      />
                      <span
                        className="VerContraseña"
                        onClick={() => setVerConfirmarContraseña(!verConfirmarContraseña)}
                      >
                        {verConfirmarContraseña ? <IonIcon className='eye-iconS' icon={eyeOffOutline} /> : <IonIcon className='eye-iconS' icon={eyeOutline} />}
                      </span>
                      <ErrorMessage name='Confirmarcontraseña' component={() => <p className='Error'>{errors.Confirmarcontraseña}</p>} />
                    </div>
                  </>
                )}
              </>

              <BotonSubmit texto={botonTexto} isLoading={isLoading} isSubmitting={isSubmitting} onClick={() => handleRegistrar} color="Continuar" />
              <p className='Login_Respuesta'>{msg}</p>
            </Form>
          )}
        </Formik>
      </div>
    </>
  )
}

export default Registro