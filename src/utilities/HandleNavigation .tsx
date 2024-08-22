import { useLocation, useNavigate } from 'react-router-dom';

const useHandleNavigation = (mostrarRegistro: () => void) => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleNavigation = () => {
        const pathSegments = location.pathname.split('/');
        const lastSegment = pathSegments[pathSegments.length - 1];
        const isIdInUrl = !isNaN(Number(lastSegment));

        if (isIdInUrl) {
            // Si la URL contiene un ID, elimina el segmento
            pathSegments.pop();
            const newPath = pathSegments.join('/');
            navigate(newPath, { replace: true }); // Reemplaza la URL sin ID
            mostrarRegistro();
        } else {
            // Si la URL no contiene un ID, ejecuta mostrarRegistro
            mostrarRegistro();
        }
    };

    return handleNavigation;
};

export default useHandleNavigation;
