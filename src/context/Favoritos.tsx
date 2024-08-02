import React, { createContext, useContext, useEffect, useState } from 'react';
import { persistLocalStorage, clearLocalStorage } from '../utilities';

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

    // Cargar datos de favoritos desde localStorage al cargar el componente
    useEffect(() => {
        const savedFavorites = localStorage.getItem('favoriteProductIds');
        if (savedFavorites) {
            setFavoriteProductIds(JSON.parse(savedFavorites));
        }
    }, []);

    // Actualizar localStorage cada vez que cambien los favoritos
    useEffect(() => {
        if (favoriteProductIds.length > 0) {
            persistLocalStorage('favoriteProductIds', favoriteProductIds);
        } else {
            clearLocalStorage('favoriteProductIds'); 
        }
    }, [favoriteProductIds]);

    // Función para agregar un producto a los favoritos
    const addToFavorites = (productId: number) => {
        if (!favoriteProductIds.includes(productId)) {
            setFavoriteProductIds([...favoriteProductIds, productId]);
        }
    };

    // Función para eliminar un producto de los favoritos
    const removeFromFavorites = (productId: number) => {
        setFavoriteProductIds(favoriteProductIds.filter(id => id !== productId));
    };

    // Función para vaciar los favoritos
    const clearFavorites = () => {
        setFavoriteProductIds([]);
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
