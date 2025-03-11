import express from "express";
import User from "../models/User.js";
import { hashPassword, comparePassword } from "../utils/bcrypt.js";
import jwt from "jsonwebtoken";
import passport from "passport";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// Registro de usuario
router.post("/register", async (req, res) => {
  const { first_name, last_name, email, age, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ error: "El usuario ya existe" });

    const hashedPassword = hashPassword(password);
    const newUser = new User({ first_name, last_name, email, age, password: hashedPassword });

    await newUser.save();
    res.status(201).json({ message: "Usuario registrado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error en el registro" });
  }
});

// Login de usuario
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !comparePassword(password, user.password)) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.cookie("token", token, { httpOnly: true, secure: false });
    res.json({ message: "Login exitoso", token });
  } catch (error) {
    res.status(500).json({ error: "Error en el login" });
  }
});

// Ruta para obtener el usuario actual desde el token
router.get("/current", passport.authenticate("jwt", { session: false }), (req, res) => {
  res.json(req.user);
});

// Logout
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logout exitoso" });
});

export default router;
