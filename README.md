# Sustainability Tracker

This is a full-stack application designed to manage and track sustainability actions. The backend is built with Django and Django REST Framework (DRF) using PostgreSQL as the database, while the frontend is built with React. This guide provides clear instructions to set up and run the application.

---

## **Features**
- Manage sustainability actions: Add, update, and delete actions.
- Backend API built with Django and PostgreSQL.
- Frontend React application to interact with the API.
- Data backup and restore functionality using JSON files.

---

## **File Structure**

### Project Root:
- `sustainability-backend`: Contains the Django backend files.
- `sustainability-frontend`: Contains the React frontend files.

### Backend Structure:
- `actions`: Contains the API app logic.
- `sustainability_tracker`: Django project settings and configurations.
- `backup.json`: Stores the JSON backup for sustainability actions.
- `manage.py`: Entry point for the Django application.
- `requirements.txt`: Lists the Python dependencies for the backend.

### Frontend Structure:
- `node_modules`: Node.js dependencies.
- `public`: Static files for the React application.
- `src`: Source code for the React application.
- `package.json`: Node.js dependencies and scripts.

---

## **Setup Instructions**

### 1. **Clone the Repository**
```bash
git clone https://github.com/kirthanps/sustainability_tracker.git
cd sustainability_tracker
```

### 2. **Setting Up PostgreSQL**

1. **Install PostgreSQL**:
   - Install PostgreSQL on your machine using the package manager for your operating system.

2. **Create a New Database**:
   ```sql
   CREATE DATABASE sustainability_tracker;
   ```
3. **Create a New User**:
   ```sql
   CREATE USER sustainability_user WITH PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE sustainability_tracker TO sustainability_user;
   ```

4. **Update Backend Configuration**:
   - Open `sustainability-backend/sustainability_tracker/settings.py`.
   - Update the `DATABASES` section with the credentials:
     ```python
     DATABASES = {
         'default': {
             'ENGINE': 'django.db.backends.postgresql',
             'NAME': 'sustainability_tracker',  # Database name
             'USER': 'sustainability_user',     # PostgreSQL username
             'PASSWORD': 'your_password',      # Password you set
             'HOST': 'localhost',              # Default host
             'PORT': '5432',                   # Default PostgreSQL port
         }
     }
     ```

---

### 3. **Backend Setup**
1. **Navigate to the backend folder**:
   ```bash
   cd sustainability-backend
   ```
2. **Install Python dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Apply database migrations**:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

4. **Srart the Django server**:
   ```bash
   python manage.py runserver
   ```

**Note**: Ensure the Django server runs on port `8000` (default) unless changed.

---

### 4. **Frontend Setup**
1. **Navigate to the frontend folder**:
   ```bash
   cd sustainability-frontend
   ```
2. **Install Node.js dependencies**:
   ```bash
   npm install
   ```
3. **Start the React development server:**
   ```bash
   npm start
   ```
**Note**: React typically runs on port `3000` by default. Ensure no other service is using this port.

---

### 5. **Port Checks**
* **PostgreSQL**: Ensure it runs on port `5432` (default).
* **Django Backend**: Ensure the server runs on port `8000` (default).
* **React Frontend**: Ensure the development server runs on port `3000` (default).

---

### **How to Use**
1. Open your browser and navigate to:
   * React Frontend: `http://localhost:3000`
   * Django API (for testing): `http://localhost:8000/api/actions/`
2. Use the frontend to manage sustainability actions:
   * Add new actions.
   * Edit or delete existing actions.
   * View all actions in a tabular format.

---

## **API Endpoints**

### 1. GET `/api/actions/`
- Retrieve all sustainability actions.

### 2. POST `/api/actions/`
- Add a new action.
- Payload format:
  ```json
  {
    "action": "Recycling",
    "date": "2025-01-08",
    "points": 25
  }
  ```

### 3. PUT `/api/actions/<id>`
  * Update an action by ID.

### 4. DELETE `/api/actions/<id>`
  * Delete an action by ID.

---

## **Common Issues**

1. **Database Connection Errors**:
   - Ensure PostgreSQL is running on port `5432`.
   - Verify the database name, username, and password in `settings.py`.

2. **Port Conflicts**:
   - Check if other applications are using ports `3000` (React) or `8000` (Django). Stop them or change the port.

3. **Dependencies Not Installed**:
   - Run the appropriate installation commands:
     - Backend: `pip install -r requirements.txt`
     - Frontend: `npm install`

---

## **Contributing**

Feel free to submit issues or create pull requests to improve the application.

