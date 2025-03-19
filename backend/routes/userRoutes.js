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