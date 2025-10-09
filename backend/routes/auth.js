const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

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
// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     //verifica existencia do usuario
//     let user = await User.findOne({ email });
//     if (user) {
//       return res.status(400).json({ message: "Usuário já existe" });
//     }
//     //Criptografa a senha
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     user = new User({
//       email,
//       passowrd: hashedPassword,
//     });
//     await user.save();

//     res.status(201).json({ message: "Usuário registrado com sucesso" });
//   } catch (error) {
//     res.status(500).json({ message: "Erro no servidor." });
//   }
// });


module.exports = router;
