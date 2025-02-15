import React, { useState, useEffect } from "react";
import { fetchActions, addAction, updateAction, deleteAction } from "./api"; // Add deleteAction for DELETE requests
import "./App.css";

const App = () => {
  const [actions, setActions] = useState([]); // Holds the table data
  const [message, setMessage] = useState(""); // API response message
  const [showModal, setShowModal] = useState(false); // Controls popup modal visibility
  const [status, setStatus] = useState("get"); // Tracks current view ("get", "new", "edit", "delete")
  const [formData, setFormData] = useState({ action: "", date: "", points: "" }); // Form input values
  const [selectedAction, setSelectedAction] = useState(null); // Stores the action being edited or deleted

  // Fetch actions on page load or when status changes to "get"
  useEffect(() => {
    if (status === "get") {
      const getData = async () => {
        const response = await fetchActions();
        setMessage(response.message);

        if (response.message === "Success") {
          setActions(response.data || []);
        } else {
          setShowModal(true); // Show modal for errors
        }
      };

      getData();
    }
  }, [status]);

  // Handle form submission for adding or updating an action
  const handleSubmitAction = async () => {
    const { action, date, points } = formData;

    // Validate form inputs
    if (!action || !date || !points) {
      setMessage("All fields are required.");
      setShowModal(true);
      return;
    }

    if (new Date(date) >= new Date()) {
      setMessage("Date must be before today.");
      setShowModal(true);
      return;
    }

    if (points <= 0) {
      setMessage("Points must be a positive number.");
      setShowModal(true);
      return;
    }

    // If editing an action, make a PUT request
    if (status === "edit") {
      const response = await updateAction(selectedAction.id, { action, date, points });

      // Handle response and show in modal
      if (response.message) {
        setMessage(response.message);
      } else {
        setMessage("Unknown error occurred.");
      }
      setShowModal(true);

      // Reset status to "get" to reload the table
      setStatus("get");
      return;
    }

    // If adding a new action, make a POST request
    const response = await addAction({ action, date, points });

    // Handle response and show in modal
    if (response.message) {
      if (response.data && response.data.id) {
        setMessage(`${response.message}. New Action ID: ${response.data.id}`);
      } else {
        setMessage(response.message);
      }
    } else {
      setMessage("Unknown error occurred.");
    }
    setShowModal(true);

    // Reset status to "get" to reload the table
    setStatus("get");
  };

  // Handle the "Edit" button click
  const handleEdit = (action) => {
    setSelectedAction(action); // Store the selected action
    setFormData({ action: action.action, date: action.date, points: action.points }); // Pre-fill the form
    setStatus("edit"); // Switch to "edit" mode
  };

  // Handle the "Delete" button click
  const handleDelete = (action) => {
    setSelectedAction(action); // Store the selected action for deletion confirmation
    setStatus("delete"); // Switch to "delete" mode
  };

  // Confirm deletion
  const confirmDelete = async () => {
    const response = await deleteAction(selectedAction.id); // Make DELETE API call

    // Handle response and show in modal
    if (response.message) {
      setMessage(response.message);
    } else {
      setMessage("Unknown error occurred.");
    }
    setShowModal(true);

    // Reset status to "get" to reload the table
    setStatus("get");
  };

  return (
    <div className="container">
      {/* Header */}
      <div className="header">
        <h1>Sustainability Tracker</h1>
        <button className="new-action-button" onClick={() => setStatus("new")}>
          + New Action
        </button>
      </div>

      {/* Modal for displaying messages */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>{message}</p>
            <button onClick={() => setShowModal(false)}>OK</button>
          </div>
        </div>
      )}

      {/* Main Body */}
      {status === "get" ? (
        // Table View
        message === "Success" && actions.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Action</th>
                <th>Date</th>
                <th>Points</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {actions.map((action) => (
                <tr key={action.id}>
                  <td>{action.id}</td>
                  <td>{action.action}</td>
                  <td>{action.date}</td>
                  <td>{action.points}</td>
                  <td>
                    <button onClick={() => handleEdit(action)}>Edit</button>
                  </td>
                  <td>
                    <button onClick={() => handleDelete(action)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          message === "Success" && <p>Data not found</p>
        )
      ) : status === "delete" && selectedAction ? (
        // Delete Confirmation View
        <div className="confirmation-container">
          <h2>Confirmation</h2>
          <p>Are you sure you want to delete this action?</p>
          <ul>
            <li>
              <strong>ID:</strong> {selectedAction.id}
            </li>
            <li>
              <strong>Action:</strong> {selectedAction.action}
            </li>
            <li>
              <strong>Date:</strong> {selectedAction.date}
            </li>
            <li>
              <strong>Points:</strong> {selectedAction.points}
            </li>
          </ul>
          <div className="form-buttons">
            <button onClick={confirmDelete}>Delete</button>
            <button onClick={() => setStatus("get")}>Keep</button>
          </div>
        </div>
      ) : (
        // New or Edit Action Form
        <div className="form-container">
          <h2>{status === "new" ? "Add New Action" : "Edit Action"}</h2>
          <form>
            <label>
              Action:
              <input
                type="text"
                value={formData.action}
                onChange={(e) =>
                  setFormData({ ...formData, action: e.target.value })
                }
              />
            </label>
            <label>
              Date:
              <input
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
              />
            </label>
            <label>
              Points:
              <input
                type="number"
                value={formData.points}
                onChange={(e) =>
                  setFormData({ ...formData, points: e.target.value })
                }
              />
            </label>
            <div className="form-buttons">
              <button type="button" onClick={handleSubmitAction}>
                {status === "new" ? "Add" : "Update"}
              </button>
              <button type="button" onClick={() => setStatus("get")}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default App;