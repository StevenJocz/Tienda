import { useState } from "react";
import { api } from "../../services/pasarelaPagp.service";
import { ApiResponse } from "../../models/PasarelaPago";

// Declaración para que TypeScript sepa que window.P existe
declare global {
    interface Window {
        P: any;
    }
}

const Pago = () => {

    const [notificacion, setNotificacion] = useState<any>(null);

    const handleSubmitPayment = async () => {

        const body = {
            buyer: {
                document: "123456789",
                documentType: "CC",
                name: "Hamilton",
                surname: "Espinal",
                email: "johndoe@example.com",
                mobile: "+573043461586",
            },

            payment: {
                reference: "TEST_1234623",
                description: "Descripción de la compra",
                amount: {
                    currency: "COP",
                    total: 12000,
                },
            },
            returnUrl: "http://localhost:5173/Pago",
            cancelUrl: "http://localhost:5173/Pago"
        };

        try {
            const response = await api.post<ApiResponse>('sesion/post_sesion', body);

            if (response.data.resultado == true) {
                if (window.P) {
                    window.P.init(response.data.data.processUrl);
                    window.P.on("close", function () {
                        alert("El usuario cerró el Lightbox");
                    });

                    window.P.on("response", function (response: any) {
                        console.log("Respuesta de PlaceToPay:", response);
                    });
                } else {
                    window.location.href = response.data.data.processUrl;
                }
            }

        } catch (error) {
            console.error("Error en la solicitud de pago: ", error);
            alert("Error al procesar el pago.");
        }
    };

    const handleAnotherRequest = async () => {

        try {
            const response = await api.get<ApiResponse>('states/get_states_sesion', {requestId: 45887, Reference: "TEST_123457"});

            if (response) {
                setNotificacion(response.data);
            }

        } catch (error) {
            console.error("Error en la solicitud de pago: ", error);
            alert("Error al procesar el pago.");
        }
    };

    return (
        <div className="pago">
            <div>
                <h1>PlaceToPay Integration</h1>
                <div>
                    <button id="open" onClick={handleSubmitPayment}>
                        Enviar Pago
                    </button>
                    <button id="additional" onClick={handleAnotherRequest}>
                        Ejecutar Otra Solicitud
                    </button>
                </div>
            </div>
            <div>
                {notificacion && <pre>{JSON.stringify(notificacion, null, 2)}</pre>}
            </div>
        </div>
    );
};

export default Pago;
