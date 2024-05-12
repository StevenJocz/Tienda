import { createContext, useContext, useEffect, useState } from "react";
import { Producto } from "../models/Productos";

// Define la interfaz del contexto
interface ProductosContextType {
    productos: Producto[];
}

// Crea el contexto
const ProductosContext = createContext<ProductosContextType | undefined>(undefined);

// Hook personalizado para acceder al contexto
export const useProductos = () => {
    const context = useContext(ProductosContext);
    if (!context) {
        throw new Error('useProductos debe ser utilizado dentro de un proveedor de ProductosContext');
    }
    return context;
};

// Proveedor del contexto
export const ProductosProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [productos, setProductos] = useState<Producto[]>([]);


    useEffect(() => {
        
    }, []);



    // Objeto de contexto
    const contextValue: ProductosContextType = {

        productos
    };

    return (
        <ProductosContext.Provider value={contextValue}>
            {children}
        </ProductosContext.Provider>
    );
};