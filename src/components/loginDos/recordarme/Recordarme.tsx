import { IonIcon } from "@ionic/react";
import { ErrorMessage, Form, Formik, FormikValues } from "formik";
import { closeOutline } from "ionicons/icons";
import { StyledTextField } from "../../../utilities/SelectProps";
import { BotonSubmit } from "../../boton";
import { useState } from "react";
import { api } from "../../../services";

interface Props {
  mostrarInicio: () => void;
  onClose: () => void;
}

const Recordarme: React.FC<Props> = (props) => {
  const [msg, setMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [paso, setPaso] = useState(1);
  const [correo, setCorreo] = useState('');



  const handleRecordarme = async (values: FormikValues) => {
    setIsLoading(true);
    setCorreo(values.correo);
    const response = await api.get<any>('Usuario/Get_Usuario_Correo', { correo: values.correo });
    if (response.data.resultado === false) {
      setMsg(response.data.mensaje);

    } else {
      setIsLoading(false);
      setPaso(2);
    }

  };

  const handleCodigo = async (values: FormikValues) => {
    setIsLoading(true);
    const response = await api.get<any>('Usuario/Get_Codigo', { correo: correo, codigo: values.codigo });
    if (response.data.resultado === false) {
      setMsg(response.data.mensaje);

    } else {
      setIsLoading(false);
      setPaso(3);
    }

  };

  const handleCambiar = async (values: FormikValues) => {
    setIsLoading(true);
    const objecto =
    {
      accion: 2,
      idUsuario: 0,
      correo: correo,
      password: values.contraseña
    };
    // Solicitud POST
    const response = await api.put<any>('Usuario/Put_Actualizar_contrasena', objecto);
    if (response.data.resultado === false) {
      setMsg(response.data.mensaje);

    } else {
      setIsLoading(false);
      setPaso(4);
    }

  }

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
        <h3>¿Olvidé mi contraseña?</h3>
        {paso == 1 ? (
          <p>Para empezar, ingresa tu correo electrónico. Se enviarán instrucciones a la dirección proporcionada.</p>
        ) : paso == 2 ? (
          <p>¡Las instrucciones se han enviado correctamente. Por favor, revisa tu bandeja de entrada.!</p>
        ) : paso == 3 ? (
          <p>Ingresa tu nueva contraseña para continuar con el proceso de cambio.</p>
        ) : (
          <p>Contraseña cambiada correctamente.</p>
        )}

      </div>
      {paso == 1 ? (
        <div className="Login_content_body">
          <Formik
            enableReinitialize={true}
            initialValues={{
              correo: ''
            }}
            validate={(valor) => {
              let errors: any = {};
              if (!valor.correo) {
                errors.correo = 'El correo electrónico es obligatorio';
              } else if (!/^\S+@\S+\.\S+$/.test(valor.correo)) {
                errors.correo = 'Introduce una dirección de correo electrónico válida';
              }

              return errors;
            }}
            onSubmit={handleRecordarme}
          >
            {({ errors, values, setFieldValue, isSubmitting }) => (
              <Form>
                <>
                  <div className={`Login_content_body-input ${errors.correo ? 'Input_Error' : ''}`}>
                    <StyledTextField
                      name='titulo'
                      label="Correo electrónico"
                      variant="outlined"
                      size="small"
                      placeholder='Introduce tu correo electrónico'
                      value={values.correo}
                      onChange={(e) => setFieldValue('correo', e.target.value)}
                    />
                    <ErrorMessage name='correo' component={() => <p className='Error'>{errors.correo}</p>} />
                  </div>

                </>
                <BotonSubmit texto={'Recordarme'} isLoading={isLoading} isSubmitting={isSubmitting} onClick={() => handleRecordarme} color="continuar" />
                <p className='Login_Respuesta'>{msg}</p>
              </Form>
            )}
          </Formik>
          <div className="Login_content_body-registro">
            <p>Volver al Iniciar sesión</p>
            <button onClick={() => props.mostrarInicio()}>
              Volver al Iniciar sesión
            </button>
          </div>
        </div>
      ) : paso == 2 ? (
        <div className="Login_content_body">
          <Formik
            enableReinitialize={true}
            initialValues={{
              codigo: ''
            }}
            validate={(valor) => {
              let errors: any = {};
              if (!valor.codigo) {
                errors.codigo = 'Código obligatorio';
              }

              return errors;
            }}
            onSubmit={handleCodigo}
          >
            {({ errors, values, setFieldValue, isSubmitting }) => (
              <Form>
                <>
                  <div className={`Login_content_body-input ${errors.codigo ? 'Input_Error' : ''}`}>
                    <StyledTextField
                      name='titulo'
                      label="Código"
                      variant="outlined"
                      size="small"
                      placeholder='Introduce el código'
                      value={values.codigo}
                      onChange={(e) => setFieldValue('codigo', e.target.value)}
                    />
                    <ErrorMessage name='codigo' component={() => <p className='Error'>{errors.codigo}</p>} />
                  </div>

                </>
                <BotonSubmit texto={'Enviar'} isLoading={isLoading} isSubmitting={isSubmitting} onClick={() => handleCodigo} color="continuar" />
                <p className='Login_Respuesta'>{msg}</p>
              </Form>
            )}
          </Formik>
        </div>
      ) : paso == 3 ? (
        <div className="Login_content_body">
          <Formik
            enableReinitialize={true}
            initialValues={{
              contraseña: '',
              contraseñados: '',
            }}
            validate={(values) => {
              let errors: any = {};

              if (!values.contraseña) {
                errors.contraseña = '* Nueva contraseña requerida';
              } else {
                if (!/(?=.*[A-Z])/.test(values.contraseña)) {
                  errors.contraseña = '* Debe contener al menos una mayúscula';
                }
                if (!/(?=.*\d)/.test(values.contraseña)) {
                  errors.contraseña = '* Debe contener al menos un número';
                }
                if (values.contraseña.length < 8) {
                  errors.contraseña = '* Debe tener una longitud mayor a 7 caracteres';
                }

                if (
                  !/(?=.*[A-Z])(?=.*\d).{8,}/.test(values.contraseña) &&
                  !errors.contraseña // Verificar si no hay errores individuales ya establecidos
                ) {
                  errors.contraseña = '* La contraseña debe contener al menos una mayúscula, un número y tener una longitud mayor a 7 caracteres';
                }
              }

              if (values.contraseñados !== values.contraseña) {
                errors.contraseñados = '* Las contraseñas no coinciden';
              } else if (!values.contraseñados) {
                errors.contraseñados = '  * Confirme la nueva contraseña';
              }
              return errors;
            }}
            onSubmit={handleCambiar}
          >
            {({ errors, values, setFieldValue, isSubmitting }) => (
              <Form>
                <>
                  <div className={`Login_content_body-input ${errors.contraseña ? 'Input_Error' : ''}`}>
                    <StyledTextField
                      type='password'
                      name='contraseña'
                      label="Contraseña"
                      variant="outlined"
                      size="small"
                      placeholder='Introduce tu contraseña'
                      value={values.contraseña}
                      onChange={(e) => setFieldValue('contraseña', e.target.value)}
                    />
                    <ErrorMessage name='contraseña' component={() => <p className='Error'>{errors.contraseña}</p>} />
                  </div>
                  <div className={`Login_content_body-input ${errors.contraseña ? 'Input_Error' : ''}`}>
                    <StyledTextField
                      type='password'
                      name='contraseñados'
                      label="Confirmar contraseña"
                      variant="outlined"
                      size="small"
                      placeholder='Introduce tu contraseña'
                      value={values.contraseñados}
                      onChange={(e) => setFieldValue('contraseñados', e.target.value)}
                    />
                    <ErrorMessage name='contraseñados' component={() => <p className='Error'>{errors.contraseñados}</p>} />
                  </div>
                </>

                <BotonSubmit texto={'Cambiar contraseña'} isLoading={isLoading} isSubmitting={isSubmitting} onClick={() => handleCambiar} color="continuar" />
                <p className='Login_Respuesta'>{msg}</p>
              </Form>
            )}
          </Formik>
        </div>
      ) : (
        <div className="Login_content_body">
          <p>Tu contraseña ha sido cambiada correctamente. Ya puedes iniciar sesión con tu nueva clave.</p>
          <div className="Login_content_body-registro">
            <p>Volver al Iniciar sesión</p>
            <button onClick={() => props.mostrarInicio()}>
              Volver al Iniciar sesión
            </button>
          </div>

        </div>
      )
      }

    </>
  )
}

export default Recordarme