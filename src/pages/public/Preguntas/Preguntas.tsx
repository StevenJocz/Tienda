import { Footer } from '../../../components/footer'
import { Nav } from '../../../components/nav'
import svg from '../../../assets/img/faq.svg'
import './Preguntas.css'

const Preguntas = () => {
    return (
        <div className='Home'>
            <div className='Home_nav'>
                <Nav />
            </div>
            <div className='Home_main' id='Home_main_Pruduct'>
                <div className='Preguntas'>
                    <div className='Preguntas_Texto'>
                        <h2>¿Qué es GUO Pagos?</h2>
                        <p>GUO PAGOS es la plataforma de pagos electrónicos que usa <span>CORPORACIÓN UNIVERSITARIA ADVENTISTA - UNAC</span> para procesar en línea las transacciones generadas en la tienda virtual con
                            las formas de pago habilitadas para tal fin. </p>
                        <h2>¿Cómo puedo pagar?</h2>
                        <p>En la tienda virtual de la <span>CORPORACIÓN UNIVERSITARIA ADVENTISTA - UNAC</span> usted podrá realizar su pago
                            con los medios habilitados para tal fin. Usted, de acuerdo a las opciones de pago
                            escogidas por el comercio, podrá pagar a través de tarjetas de crédito Visa, y
                            MasterCard y Cuentas debito ahorro y corriente PSE.</p>
                        <h2>¿Es seguro ingresar mis datos bancarios en este sitio web? </h2>
                        <p>Para proteger tus datos la <span>CORPORACIÓN UNIVERSITARIA ADVENTISTA - UNAC</span> delega en GOU pagos la
                            captura de la información sensible. Nuestra plataforma de pagos cumple con los más
                            altos estándares exigidos por la norma internacional PCI DSS de seguridad en
                            transacciones con tarjeta de crédito. Además, tiene certificado de seguridad SSL
                            expedido por GeoTrust una compañía Verisign, el cual garantiza comunicaciones
                            seguras mediante la encriptación de todos los datos hacia y desde el sitio; de esta
                            manera te podrás sentir seguro a la hora de ingresar la información de su tarjeta.</p>
                        <p>Durante el proceso de pago, en el navegador se muestra el nombre de la organización
                            autenticada, la autoridad que lo certifica y la barra de dirección cambia a color verde.
                            Estas características son visibles de inmediato y dan garantía y confianza para
                            completar la transacción en GOU Pagos</p>
                        <p><span>GOU Pagos </span> también cuenta con el monitoreo constante de McAfee Secure y la firma de
                            mensajes electrónicos con Certicámara.</p>
                        <h2>¿Puedo realizar el pago cualquier día y a cualquier hora?</h2>
                        <p>Sí, en la <span>CORPORACIÓN UNIVERSITARIA ADVENTISTA - UNAC</span> podrás realizar tus compras en línea los 7 días
                            de la semana, las 24 horas del día a sólo un clic de distancia.</p>
                        <h2>¿Puedo cambiar la forma de pago? </h2>
                        <p>Si aún no has finalizado tu pago, podrás volver al paso inicial y elegir la forma de pago
                            que prefieras. Una vez finalizada la compra no es posible cambiar la forma de pago. <span>ESTABLECIMIENTO DE COMERCIO: el punto anterior aplica a la forma de pago, pero
                                deberán mencionar las políticas de devolución que tenga la tienda para dar
                                cumplimiento al artículo 51 de la Ley del Estatuto del Consumidor</span> </p>
                        <h2>¿Pagar electrónicamente tiene algún valor para mí como comprador?</h2>
                        <p>No, los pagos electrónicos realizados a través de GOU Pagos no generan costos
                            adicionales para el comprador.</p>
                        <h2>¿Qué debo hacer si mi transacción no concluyó?</h2>
                        <p>En primera instancia, revisar si llegó un email de confirmación de la transacción a la
                            cuenta de correo electrónico inscrita en el momento de realizar el pago, en caso de no
                            haberlo recibido, deberás contactar a (PERSONA RESPONSABLE AL INTERIOR DEL
                            COMERCIO) para confirmar el estado de la transacción.</p>
                        <h2>¿Qué debo hacer si no recibí el comprobante de pago? </h2>
                        <p>Por cada transacción aprobada a través de GOU Pagos, recibirás un comprobante del
                            pago con la referencia de compra en la dirección de correo electrónico que indicaste al
                            momento de pagar.
                            Si no lo recibes, podrás contactar a (PERSONA RESPONSABLE AL INTERIOR DEL
                            COMERCIO) o a la línea (teléfono del comercio) o al correo electrónico
                            comercio@comercio.com, para solicitar el reenvío del comprobante a la misma dirección de correo
                            electrónico registrada al momento de pagar.</p>
                    </div>
                    <div className='Preguntas_Imagen'>
                        <img src={svg} alt="" />
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default Preguntas