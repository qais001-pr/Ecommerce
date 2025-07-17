/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable quotes */
import React, { useEffect, useState, createContext, useContext } from "react";
import axios from "axios";
import { ip } from "../config";  // Named import

export const CategoriesContext = createContext();

export const CategoriesProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);
    const [loadingCategories, setLoadingCategories] = useState(true);
    console.log(categories);
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
            setCategories(data);
        } catch (error) {
        } finally {
            setLoadingCategories(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <CategoriesContext.Provider value={{ categories, loadingCategories, fetchCategories }}>
            {children}
        </CategoriesContext.Provider>
    );
};

export const useCategories = () => useContext(CategoriesContext);
