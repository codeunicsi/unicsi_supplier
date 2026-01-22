import api from "../../api";
import axios from "axios";
import { getToken } from "../../utils/auth";

export const addProduct = async (productData) => {
    try {
        const response = await axios.post("http://localhost:3000/api/v1/suppliers/stores/products", 
            productData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    authorization: "Bearer " + getToken(),
                }
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getProducts = async () => {
    try {
        const response = await axios.get("http://localhost:3000/api/v1/suppliers/stores/products", {
            headers: {
                "Content-Type": "application/json",
                authorization: "Bearer " + getToken(),
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}


// get single product
export const getSingleProduct = async (productId) => {
    try {
        const response = await axios.get(`http://localhost:3000/api/v1/suppliers/stores/products/${productId}`, {
            headers: {
                "Content-Type": "application/json",
                authorization: "Bearer " + getToken(),
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}


// update product
export const updateProduct = async (productId, productData) => {
    try {
        const response = await axios.put(`http://localhost:3000/api/v1/suppliers/stores/products/${productId}`, 
            productData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    authorization: "Bearer " + getToken(),
                }
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
}

// update inventory
export const updateInventory = async (sku, inventoryData) => {
    console.log("inventoryData", inventoryData);
    try {
        const response = await axios.put(`http://localhost:3000/api/v1/suppliers/stores/inventory/${sku}`, 
            inventoryData,
            {
                headers: {
                    "Content-Type": "application/json",
                    authorization: "Bearer " + getToken(),
                }
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
}
    

    