# SUPABASE Backend Setup Guide (Windows)

## Prerequisites

Ensure you have the following installed on your Windows machine:

- Node.js (LTS version recommended)
- npm (comes with Node.js)
- A Supabase account

Inside backend folder:

## Steps

Open a terminal and run the following commands to set up the backend:

"C:\Program Files\nodejs\npm.ps1" init -y

```
npm init -y
```

### Install Required Dependencies

Run the following command to install necessary packages:

```
npm install express dotenv cors @supabase/supabase-js
```

### Set Up Supabase Client

Create a folder named config and inside it, create a file called supabaseClient.js:

```
mkdir config
cd config
```

Create supabaseClient.js and add the following code:

```
require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
```

### Configure Environment Variables

Create a .env file in the backend directory and add your Supabase credentials (without (URL) and (Project API Keys)):

```
SUPABASE_URL=https://YOUR_PROJECT.supabase.co (URL)
SUPABASE_KEY=YOUR_SUPABASE_SECRET_KEY (Project API Keys)
```

Replace YOUR_PROJECT and YOUR_SUPABASE_SECRET_KEY with your actual Supabase credentials. 
Proyect Setting -> Data API

### Create API Routes

Create a folder routes and inside it, create userRoutes.js:

```
const express = require("express");
const supabase = require("../config/supabaseClient");

const router = express.Router();

// Get all users
router.get("/", async (req, res) => {
  const { data, error } = await supabase.from("usuario").select("*");
  if (error) return res.status(400).json(error);
  res.json(data);
});

// Get a user by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from("usuario").select("*").eq("id", id).single();
  if (error) return res.status(400).json(error);
  res.json(data);
});

// Create a new user
router.post("/", async (req, res) => {
  const { name, id_number, code, disabled, role } = req.body;
  const { data, error } = await supabase.from("usuario").insert([
    { name, id_number, code, disabled, role }
  ]);
  if (error) return res.status(400).json(error);
  res.json(data);
});

// Delete a user by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from("usuario").delete().eq("id", id);
  if (error) return res.status(400).json(error);
  res.json(data);
});

module.exports = router;
```

### Create the Main Server File

Create server.js in the backend directory:

```
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/usuarios", userRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
```

### Start the Server

Run the following command to start your backend server:

```
node server.js
```

If you want the server to restart automatically when you make changes, install nodemon:

```
npm install -g nodemon
nodemon server.js
```

### Test API Endpoints

Now you can test the API using Postman, Insomnia, or directly from your browser.

Example API Calls:

#### Get all users:

GET "http://localhost:3001/api/usuarios"

#### Get a user by ID:

GET "http://localhost:3001/api/usuarios/1"

#### Create a new user:

POST http://localhost:3001/api/usuarios
Content-Type: application/json
{
  "name": "John Doe",
  "id_number": "12345678",
  "code": "U1234",
  "disabled": false,
  "role": "trabajador"
}

#### Delete a user by ID:

DELETE "http://localhost:3001/api/usuarios/1"

Now you have a fully functional backend that connects to Supabase and exposes API endpoints to manage User records. 