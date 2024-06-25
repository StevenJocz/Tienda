import { IonIcon } from "@ionic/react";
import { TextField} from "@mui/material";
import { styled } from '@mui/material/styles';
import { ErrorMessage, Form, Formik, FormikValues } from "formik";
import { closeOutline } from "ionicons/icons";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { api } from "../../../services";
import { Base64 } from "js-base64";
import { BotonSubmit } from "../../boton";
import { createUser } from "../../../redux/states/User";

interface Props {
  mostrarRegistro: () => void;
  onClose: () => void;
}

const Iniciar: React.FC<Props> = (props) => {
  const [msg, setMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();


  const StyledTextField = styled(TextField)({
    width: '100%'
  });

  const handleIniciar = async (values: FormikValues) => {
    setIsLoading(true);
    const response = await api.post<any>('Usuario/Post_InicioSesion', { correo: values.correo, password: values.contraseña });
    if (response.data.result === false) {
      setMsg(response.data.message);
      setIsLoading(false);
    } else {

      localStorage.setItem('token', response.data.token);
      const token = response.data.token.split(".")[1];
      const decodedValue = Base64.decode(token);
      const obj = JSON.parse(decodedValue);
      dispatch(createUser({ ...obj }));
      setIsLoading(false);
      props.onClose();
      props.mostrarRegistro();
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
        <h3>Inicia sesión para comenzar</h3>
      </div>
      <div className="Login_content_body">
        <Formik
          enableReinitialize={true}
          initialValues={{
            correo: '',
            contraseña: '',
          }}
          validate={(valor) => {
            let errors: any = {};
            if (!valor.correo) {
              errors.correo = 'El correo electrónico es obligatorio';
            } else if (!/^\S+@\S+\.\S+$/.test(valor.correo)) {
              errors.correo = 'Introduce una dirección de correo electrónico válida';
            }

            if (!valor.contraseña) {
              errors.contraseña = 'La contraseña es obligatoria';
            }
            return errors;
          }}
          onSubmit={handleIniciar}
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
                <div className="Login_content_body-olvido">
                  <a href="http://" target="_blank">¿Olvidé mi contraseña?</a>
                </div>
              </>
              
              <BotonSubmit texto={'Iniciar'} isLoading={isLoading} isSubmitting={isSubmitting} onClick={() => handleIniciar} color="continuar" /> 
              <p className='Login_Respuesta'>{msg}</p>
            </Form>
          )}
        </Formik>
        <div className="Login_content_body-registro">
          <p>¿No tienes cuenta?</p>
          <button onClick={() => props.mostrarRegistro()}>
            Registrate
          </button>
        </div>
      </div>
    </>
  )
}

export default Iniciar;
