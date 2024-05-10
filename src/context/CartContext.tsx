import React, { createContext, useContext, useState } from 'react';
import { ShoppingCart } from '../models/Cart';


interface CartContextProps {
    cartItems: ShoppingCart[];
    addToCart: (item: ShoppingCart) => void;
    removeFromCart: (itemId: number) => void;
    clearCart: () => void;
}

// Crea el contexto
const CartContext = createContext<CartContextProps | undefined>(undefined);

// Hook personalizado para utilizar el contexto
export const useCartContext = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCartContext debe ser utilizado dentro de un CartProvider');
    }
    return context;
};

// Componente proveedor del contexto
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Estado para almacenar los elementos del carrito
    const [cartItems, setCartItems] = useState<ShoppingCart[]>([]);

    // Función para agregar un elemento al carrito
    const addToCart = (item: ShoppingCart) => {
        setCartItems(prevItems => [...prevItems, item]);
    };

    // Función para eliminar un elemento del carrito
    const removeFromCart = (itemId: number) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
    };

    // Función para vaciar el carrito
    const clearCart = () => {
        setCartItems([]);
    };

    // Objeto de contexto
    const contextValue: CartContextProps = {
        cartItems,
        addToCart,
        removeFromCart,
        clearCart
    };

    // Renderiza el proveedor del contexto con los hijos proporcionados
    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
};
