import React, { createContext, useContext, useEffect, useState } from 'react';
import { ShoppingCart } from '../models/Cart';
import { clearLocalStorage, persistLocalStorage } from '../utilities';

// Define la interfaz para el contexto del carrito
interface CartContextProps {
    cartItems: ShoppingCart[];
    addToCart: (item: ShoppingCart) => void;
    getLastSavedId: () => number;
    removeFromCart: (itemId: number) => void;
    clearCart: () => void;
    getTotalCartValue: () => number;
    getTotalIva: () => number;
    updateCartItemQuantity: (productId: number, newQuantity: number) => void;
    getCartItemQuantity: (productId: number) => number;
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


    // Cargar datos del carrito desde localStorage al cargar el componente
    useEffect(() => {
        const savedCart = localStorage.getItem('cartItems');
        if (savedCart) {
            setCartItems(JSON.parse(savedCart));
        }
    }, []);

    // Actualizar localStorage cada vez que cambie el carrito
    useEffect(() => {
        if (cartItems.length > 0) {
            persistLocalStorage('cartItems', cartItems);
        } else {
            clearLocalStorage('cartItems');
        }
    }, [cartItems]);

    // Función para obtener el último ID guardado en el carrito
    const getLastSavedId = () => {
        if (cartItems.length === 0) {
            return 0;
        } else {
            return cartItems.reduce((maxId, item) => (item.id > maxId ? item.id : maxId), 0);
        }
    };

    const getCartItemQuantity = (idProducto: number): number => {
        const item = cartItems.find(existingItem =>
            existingItem.idProducto === idProducto
        );
        return item ? item.cantidad : 0;
    };

    // Función para agregar un elemento al carrito o actualizar la cantidad si ya existe
    const addToCart = (item: ShoppingCart) => {
        const existingItemIndex = cartItems.findIndex(existingItem =>
            existingItem.idProducto === item.idProducto &&
            existingItem.color === item.color &&
            existingItem.talla === item.talla
        );

        let message = '';

        if (existingItemIndex !== -1) {
            // Si el producto ya existe en el carrito, actualiza la cantidad
            setCartItems(prevItems => {
                const updatedCartItems = [...prevItems];
                updatedCartItems[existingItemIndex].cantidad += item.cantidad;
                // Redondear el valor total del producto actualizado
                updatedCartItems[existingItemIndex].valor = Math.round(updatedCartItems[existingItemIndex].valor);
                return updatedCartItems;
            });
            message = 'La cantidad del producto se ha actualizado en el carrito.';
        } else {
            // Si el producto no existe en el carrito, agrégalo
            setCartItems(prevItems => [
                ...prevItems,
                { ...item, valor: Math.round(item.valor) } // Redondear el valor del producto al agregarlo
            ]);
            message = 'El producto se ha añadido al carrito.';
        }

        return message;
    };

    // Función para actualizar la cantidad de un producto en el carrito
    const updateCartItemQuantity = (productId: number, newQuantity: number) => {
        setCartItems(prevItems => {
            return prevItems.map(item => {
                if (item.id === productId) {
                    // Si encontramos el producto, actualizamos su cantidad
                    return { ...item, cantidad: newQuantity };
                }
                return item;
            });
        });
    };

    // Función para eliminar un elemento del carrito
    const removeFromCart = (itemId: number) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
    };

    // Función para vaciar el carrito
    const clearCart = () => {
        setCartItems([]);
    };

    // Función para obtener el valor total de todos los productos en el carrito sin decimales
    const getTotalCartValue = () => {
        return Math.round(
            cartItems.reduce((total, item) => total + item.valor * item.cantidad, 0)
        );
    };

    // Función para obtener el total del IVA sin decimales
    const getTotalIva = () => {
        return Math.round(
            cartItems.reduce((totalIva, item) => {
                const ivaProducto = (item.valor * item.cantidad * item.iva) / 100;
                return totalIva + ivaProducto;
            }, 0)
        );
    };

    // Objeto de contexto
    const contextValue: CartContextProps = {
        cartItems,
        addToCart,
        getLastSavedId,
        removeFromCart,
        clearCart,
        getTotalCartValue,
        updateCartItemQuantity,
        getCartItemQuantity,
        getTotalIva
    };

    // Renderiza el proveedor del contexto con los hijos proporcionados
    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
};
