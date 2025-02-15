import React, { useState } from "react";
import { fetchActions, addAction, updateAction, deleteAction } from "./api";

const ApiTester = () => {
    const [actions, setActions] = useState([]);

    const testGet = async () => {
        try {
            const data = await fetchActions();
            console.log("GET Response:", data);
            setActions(data.data); // Assuming the API returns a "data" key
        } catch (error) {
            console.error("GET Error:", error);
        }
    };

    const testPost = async () => {
        try {
            const newAction = {
                action: "Test Action",
                date: "2025-01-01",
                points: 10,
            };
            const response = await addAction(newAction);
            console.log("POST Response:", response);
        } catch (error) {
            console.error("POST Error:", error);
        }
    };

    const testPut = async () => {
        try {
            const updatedAction = {
                action: "Updated Action",
                date: "2025-01-02",
                points: 20,
            };
            const response = await updateAction(1, updatedAction); // Assuming ID = 1 exists
            console.log("PUT Response:", response);
        } catch (error) {
            console.error("PUT Error:", error);
        }
    };

    const testDelete = async () => {
        try {
            const response = await deleteAction(1); // Assuming ID = 1 exists
            console.log("DELETE Response:", response);
        } catch (error) {
            console.error("DELETE Error:", error);
        }
    };

    return (
        <div>
            <h1>API Tester</h1>
            <button onClick={testGet}>Test GET</button>
            <button onClick={testPost}>Test POST</button>
            <button onClick={testPut}>Test PUT</button>
            <button onClick={testDelete}>Test DELETE</button>

            <h2>Fetched Actions:</h2>
            <ul>
                {actions.map((action) => (
                    <li key={action.id}>
                        {action.action} on {action.date} for {action.points} points
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ApiTester;
