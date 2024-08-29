import React, { createContext, useContext, useEffect, useState } from 'react';
import { persistLocalStorage, clearLocalStorage } from '../utilities';
import { Favoritos } from '../models/Productos';
import { api } from '../services';
import { useSelector } from 'react-redux';
import { AppStore } from '../redux/Store';

// Define la interfaz para el contexto de favoritos
interface FavoritesContextProps {
    favoriteProductIds: number[];
    addToFavorites: (productId: number) => void;
    removeFromFavorites: (productId: number) => void;
    clearFavorites: () => void;
    isFavorite: (productId: number) => boolean;
}

// Crea el contexto
const FavoritesContext = createContext<FavoritesContextProps | undefined>(undefined);

// Hook personalizado para utilizar el contexto
export const useFavoritesContext = () => {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error('useFavoritesContext debe ser utilizado dentro de un FavoritesProvider');
    }
    return context;
};

// Componente proveedor del contexto
export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Estado para almacenar los IDs de los productos favoritos
    const [favoriteProductIds, setFavoriteProductIds] = useState<number[]>([]);
    const usuario = useSelector((store: AppStore) => store.user);

    // Función para obtener los favoritos desde la API
    const fetchFavorites = async () => {
        try {
            const response = await api.get<Favoritos[]>('Producto/Get_Favoritos', {accion: 1, idUsuario: usuario.idUsuario  });
            
            if (response.data) {
                // Extraer solo los idProducto del response
                const productIds = response.data.map(favorito => favorito.idProducto);
                setFavoriteProductIds(productIds);
                localStorage.setItem('favoriteProductIds', JSON.stringify(productIds));
            }
        } catch (error) {
            console.error('Error al obtener los favoritos:', error);
        }
    };

    // Ejecutar fetchFavorites al montar el componente y cuando cambia el usuario
    useEffect(() => {
        if (usuario?.idUsuario) {
            fetchFavorites();
        }
    }, [usuario.idUsuario]);

    // Actualizar localStorage cada vez que cambien los favoritos
    useEffect(() => {
        if (favoriteProductIds.length > 0) {
            persistLocalStorage('favoriteProductIds', favoriteProductIds);
        } else {
            clearLocalStorage('favoriteProductIds');
        }
    }, [favoriteProductIds]);

    // Función para agregar un producto a los favoritos
    const addToFavorites = async (productId: number) => {
        if (!favoriteProductIds.includes(productId)) {
            const updatedFavorites = [...favoriteProductIds, productId];
            setFavoriteProductIds(updatedFavorites);
            const favoritos: Favoritos = {
                idDeseos: 0,
                idProducto: productId,
                idUsuario: usuario.idUsuario,
                fechaAgregado: new Date().toISOString()  // Fecha actual en formato ISO
            };
            await api.post<any>('Producto/Post_Agregar_Favoritos', favoritos);
            persistLocalStorage('favoriteProductIds', updatedFavorites);  // Actualiza el localStorage inmediatamente
        }
    };

    // Función para eliminar un producto de los favoritos
    const removeFromFavorites = async (productId: number) => {
        const updatedFavorites = favoriteProductIds.filter(id => id !== productId);
        setFavoriteProductIds(updatedFavorites);
        await api.delete<any>(`Producto/Delete_Eliminar_Favoritos?idProducto=${productId}&idUsuario=${usuario.idUsuario}`);
        persistLocalStorage('favoriteProductIds', updatedFavorites);  // Actualiza el localStorage inmediatamente
    };

    // Función para vaciar los favoritos
    const clearFavorites = () => {
        setFavoriteProductIds([]);
        clearLocalStorage('favoriteProductIds');
    };

    // Función para verificar si un producto es favorito
    const isFavorite = (productId: number) => {
        return favoriteProductIds.includes(productId);
    };

    // Objeto de contexto
    const contextValue: FavoritesContextProps = {
        favoriteProductIds,
        addToFavorites,
        removeFromFavorites,
        clearFavorites,
        isFavorite,
    };

    // Renderiza el proveedor del contexto con los hijos proporcionados
    return (
        <FavoritesContext.Provider value={contextValue}>
            {children}
        </FavoritesContext.Provider>
    );
};
