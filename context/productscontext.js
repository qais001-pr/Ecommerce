/* eslint-disable quotes */
import React, { useEffect, useState, createContext, useContext } from "react";
import axios from "axios";
import { ip } from "../config";

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(true);

    useEffect(() => {
        // Helper function to wait for given milliseconds
        const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

        const fetchWithRetry = async (url, retries = 3, delayMs = 1000) => {
            for (let attempt = 1; attempt <= retries; attempt++) {
                try {
                    const response = await axios.get(url);
                    const data = response.data.result ?? response.data;
                    if (data && data.length > 0) {
                        return data; // Success
                    } else {
                        throw new Error("Empty data received");
                    }
                } catch (error) {
                    if (attempt < retries) {
                        await delay(delayMs);
                    } else {
                        throw error; // Rethrow after last attempt
                    }
                }
            }
        };

        const fetchProducts = async () => {
            try {
                const data = await fetchWithRetry(`${ip}/api/Product/GetAllProducts`, 3, 1500);
                setProducts(data);
            } catch (error) {
            } finally {
                setLoadingProducts(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <ProductsContext.Provider value={{ products, setProducts, loadingProducts }}>
            {children}
        </ProductsContext.Provider>
    );
};

export const useProducts = () => useContext(ProductsContext);
