const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Por favor, fonreça email e senha." });
    }

    //verifica existencia do usuario
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Usuário já existe" });
    }
    //Criptografa a senha
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      email,
      passowrd: hashedPassword,
    });
    await user.save();

    res.status(201).json({ message: "Usuário registrado com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor." });
  }
});

//rota de login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ mesage: "Por favor, forneça email e senha." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Credenciais inválidas." });
    }

    const isMatch = await brcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Credenciais inválidas" });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_PASSWORD,
      { expiresIn: "7d" },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ message: "Erro nos ervidor." });
  }
});

module.exports = router;
