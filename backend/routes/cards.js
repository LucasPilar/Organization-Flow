const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Card = require("../models/Card");

router.get("/", auth, async (req, res) => {
  try {
    const cards = (await Card.find({ user: req.user.id })).sort({
      createdAt: -1,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erro no Servidor");
  }
});

router.post("/", auth, async (req, res) => {
  const { title, tasks } = req.body;
  try {
    const newCard = new Card({
      title,
      tasks: tasks || [],
      user: req.user.id,
    });
    const card = await newCard.save();
    res.json(card);
  } catch (err) {
    console.err(err.message);
    res.status(500).send("Erro no Servidor");
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    let card = await Card.findById(req.params.id);
    if (!card) {
      return res.status(404).json({ msg: "Não autorizado" });
    }
    await Card.findByIdAndDelete(re.params.id);
    res.json({ msg: "Card removido" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erro no Servidor");
  }
});

// -- Rotas para tarefas --

router.post("/:cardId/tasks", auth, async (req, res) => {
  if (!req.body.text || req.body.text.trim() === "") {
    return res.status(400).json({ msg: "O texto da tarefa é obrigatório" });
  }

  try {
    const card = await Card.findById(req.params.cardId);
    if (!card) {
      return res.status(404).json({
        msg: "Card não encontrado.",
      });
    }

    const newTask = {
      text: req.body.text,
      isChecked: false,
    };

    card.tasks.push(newTask);
    await card.save();

    res.status(201).json(card.tasks[card.tasks.length - 1]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erro no Servidor");
  }
});

router.delete("/:cardId/tasks/:taskId", auth, async (req, res) => {
  try {
    const card = await Card.findById(req.params.cardId);
    if (!card) {
      return res.status(404).json({ msg: "Não autorizado." });
    }
    const removeIndex = card.tasks
      .map((task) => task.id)
      .indexOf(req.params.taskId);

    if (removeIndex === -1) {
      return res.status(404).json({ msg: "Tarefa não encontrada." });
    }

    card.tasks.splice(removeIndex, 1); 
    await card.save();

    res.json({ msg: "Tarefa removida com sucesso." });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erro no Servidor");
  }
});

router.put("/:cardId/tasks/:taskId", auth, async (req, res) => {
  const { text, isChecked } = req.body;

  try {
    const card = await Card.findById(req.params.cardId);
    if (!card) return res.status(404).json({ msg: "Card não encontrado." });

    if (card.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Não autorizado." });
    }

   
    const task = card.tasks.id(req.params.taskId);
    if (!task) return res.status(404).json({ msg: "Tarefa não encontrada." });

    
    if (text !== undefined) task.text = text;
    if (isChecked !== undefined) task.isChecked = isChecked;

    await card.save();
    res.json(task); 

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erro no Servidor");
  }
});

module.exports = router;
