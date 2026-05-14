# ☁️ CC — Cloud-Based To-Do List Manager (Full Stack MERN Application)

A cloud-deployed task management application that allows users to **create, update, and delete** to-do items. Data is persisted in a **MongoDB Atlas** cloud database. The React frontend is served directly by the Express backend for zero-hassle single-port deployment.

---

## 📋 What It Does

- **Create** to-do items with title, description, and priority (Low / Medium / High)
- **Read** all to-dos with filter tabs (All, Pending, Completed) and live stats
- **Update** any to-do — edit text, change priority, or toggle status (Pending ↔ Done)
- **Delete** to-dos with one click

---

## 🛠️ Tech Stack

| Layer      | Technology            |
|------------|-----------------------|
| Frontend   | React 18, Vite        |
| Backend    | Node.js, Express.js   |
| Database   | MongoDB Atlas (Cloud)  |
| Styling    | Vanilla CSS (Dark UI) |
| Icons      | Lucide React          |
| Deployment | AWS EC2 (Ubuntu)      |

---

## 🚀 AWS EC2 Deployment (Copy Step-by-Step)

### 1. Connect to EC2
```bash
ssh -i your-key.pem ubuntu@your-public-ip
```

### 2. Update system
```bash
sudo apt update -y
```

### 3. Install Node.js
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs git
```

### 4. Verify
```bash
node -v
npm -v
```

### 5. Go to home directory
```bash
cd ~
```

### 6. Clone your project
```bash
git clone https://github.com/AbhiDevOps369/Todo-List.git
cd Todo-List
```

### 7. Install dependencies
```bash
npm install
```

### 8. Set environment variable (VERY IMPORTANT)
```bash
nano .env
```
Paste:
```
MONGO_URI=mongodb+srv://abhirampict_db_user:12345@cluster0.mcde3lm.mongodb.net/tododb?retryWrites=true&w=majority
PORT=3000
```
Save: `CTRL + X` → `Y` → `ENTER`

### 9. Build frontend & Run app (single command)
```bash
npm start
```

### 10. Open in browser
```
http://YOUR_PUBLIC_IP:3000
```

---

## 📁 Project Structure

```
14.Todo-List/
├── server.js            # Express backend (serves API + React build)
├── package.json         # Root dependencies & scripts
├── .env                 # MongoDB URI + Port (create on server)
├── .env.example         # Template for .env
├── models/
│   └── Todo.js          # Mongoose schema (title, description, priority, status)
├── routes/
│   └── todos.js         # REST API — GET, POST, PUT, DELETE /api/todos
└── client/              # React + Vite frontend
    ├── src/
    │   ├── App.jsx      # Main app with stats, filters, CRUD
    │   ├── index.css    # Global dark theme styles
    │   └── components/
    │       ├── TodoForm.jsx   # Add new to-do form
    │       └── TodoList.jsx   # List, edit, delete, toggle todos
    └── vite.config.js   # Vite config with API proxy
```

---

## 🔗 API Endpoints

| Method | Endpoint          | Description         |
|--------|-------------------|---------------------|
| GET    | `/api/todos`      | Get all to-dos      |
| POST   | `/api/todos`      | Create a new to-do  |
| PUT    | `/api/todos/:id`  | Update a to-do      |
| DELETE | `/api/todos/:id`  | Delete a to-do      |
