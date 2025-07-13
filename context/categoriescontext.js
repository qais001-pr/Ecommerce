import React, { useEffect, useState, createContext, useContext } from "react";
import axios from "axios";
import { ip } from "../config";  // Named import

export const CategoriesContext = createContext();

export const CategoriesProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);
    const [loadingCategories, setLoadingCategories] = useState(true);

    useEffect(() => {
        // Helper to wait for ms milliseconds
        const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

        // Fetch with retry logic
        const fetchWithRetry = async (url, retries = 3, delayMs = 1500) => {
            for (let attempt = 1; attempt <= retries; attempt++) {
                try {
                    const response = await axios.get(url);
                    const data = response.data.data ?? response.data;
                    if (data && data.length > 0) {
                        return data; // Success
                    } else {
                        throw new Error("Empty data received");
                    }
                } catch (error) {
                    console.warn(`Attempt ${attempt} failed: ${error.message}`);
                    if (attempt < retries) {
                        await delay(delayMs); // Wait before retrying
                    } else {
                        throw error; // Rethrow after last attempt
                    }
                }
            }
        };

        const fetchCategories = async () => {
            try {
                const data = await fetchWithRetry(`${ip}/api/Category/getAllCategories`, 3, 1500);
                console.log("Fetched categories:", data);
                setCategories(data);
            } catch (error) {
                console.error("Failed to fetch categories after 3 attempts:", error.message);
            } finally {
                setLoadingCategories(false);
            }
        };

        fetchCategories();
    }, []); // Empty dependency array to run once on mount

    return (
        <CategoriesContext.Provider value={{ categories, loadingCategories }}>
            {children}
        </CategoriesContext.Provider>
    );
};

export const useCategories = () => useContext(CategoriesContext);
