import axios from "axios";

// Base URL for the Django backend
const BASE_URL = "http://127.0.0.1:8000/api";

// Helper function for consistent error messages
const handleError = (error) => {
    console.error("API Error:", error);
    return { message: error.response?.data?.message || error.message || "Unknown error occurred" };
};

// GET all actions
export const fetchActions = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/actions/`);
        return response.data; // Return the data from the response
    } catch (error) {
        return handleError(error);
    }
};

// POST a new action
export const addAction = async (action) => {
    try {
        const response = await axios.post(`${BASE_URL}/actions/`, action);
        return response.data;
    } catch (error) {
        return handleError(error);
    }
};

// PUT (update) an action
export const updateAction = async (id, updatedAction) => {
    try {
        const response = await axios.put(`${BASE_URL}/actions/${id}/`, updatedAction);
        return response.data;
    } catch (error) {
        return handleError(error);
    }
};

// DELETE an action
export const deleteAction = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/actions/${id}/`);
        return response.data;
    } catch (error) {
        return handleError(error);
    }
};
