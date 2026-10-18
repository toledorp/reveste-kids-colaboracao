import express from 'express';
import * as chatController from '../controllers/chatController.js';
import Match from '../models/Match.js';

const router = express.Router();

// Criação de match
router.post('/matches', chatController.createMatch);

// Enviar mensagem
router.post('/messages', chatController.sendMessage);

// Buscar mensagens de um match
router.get('/matches/:matchId/messages', chatController.getMessagesByMatch);

// Buscar matches de um usuário
router.get("/users/:userId/matches", chatController.getMatchesByUser);

// ================================
// PATCH para ativar/desativar match
// ================================
router.patch('/matches/:matchId', async (req, res) => {
  try {
    const { active } = req.body; // true ou false

    const match = await Match.findByIdAndUpdate(
      req.params.matchId,
      { active },
      { new: true }
    );

    if (!match) return res.status(404).json({ error: "Match não encontrado" });

    res.json(match);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao atualizar match" });
  }
});

export default router;