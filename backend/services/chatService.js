import mongoose from "mongoose";
import Match from "../models/Match.js";
import Message from "../models/Message.js";
import { getIo } from "../socket.js";

const createMatch = async ({
  ownerId,
  interestedUserId,
  ownerClothingId,
  interestedClothingId,
}) => {
  if (
    !ownerId ||
    !interestedUserId ||
    !ownerClothingId ||
    !interestedClothingId
  ) {
    throw new Error(
      "ownerId, interestedUserId, ownerClothingId e interestedClothingId são obrigatórios",
    );
  }

  if (String(ownerId) === String(interestedUserId)) {
    throw new Error("Não é permitido criar match com o próprio usuário");
  }

  const existingMatch = await Match.findOne({
    ownerId,
    interestedUserId,
    ownerClothingId,
    interestedClothingId,
    status: "MATCHED",
  });

  if (existingMatch) {
    return existingMatch;
  }

  const match = await Match.create({
    ownerId,
    interestedUserId,
    ownerClothingId,
    interestedClothingId,
    status: "MATCHED",
  });

  return match;
};

const sendMessage = async ({ matchId, senderId, content }) => {
  if (!matchId || !senderId || !content) {
    throw new Error("matchId, senderId e content são obrigatórios");
  }

  const match = await Match.findById(matchId);

  if (!match) {
    throw new Error("Match não encontrado");
  }

  const isOwner = String(match.ownerId) === String(senderId);
  const isInterested = String(match.interestedUserId) === String(senderId);

  if (!isOwner && !isInterested) {
    throw new Error("Usuário não pertence a este match");
  }

  if (match.status !== "MATCHED") {
    throw new Error("Este match não está ativo");
  }

  const receiverId = isOwner ? match.interestedUserId : match.ownerId;

  const message = await Message.create({
    matchId: new mongoose.Types.ObjectId(matchId),
    senderId: new mongoose.Types.ObjectId(senderId),
    receiverId: new mongoose.Types.ObjectId(receiverId),
    content: content.trim(),
    read: false,
  });

  const io = getIo();

  io.to(`match-${matchId}`).emit("new-message", {
    _id: message._id,
    matchId: message.matchId,
    senderId: message.senderId,
    receiverId: message.receiverId,
    content: message.content,
    read: message.read,
    createdAt: message.createdAt,
  });

  return message;
};

const getMessagesByMatch = async ({ matchId, userId }) => {
  if (!matchId || !userId) {
    throw new Error("matchId e userId são obrigatórios");
  }

  const match = await Match.findById(matchId);

  if (!match) {
    throw new Error("Match não encontrado");
  }

  const isOwner = String(match.ownerId) === String(userId);
  const isInterested = String(match.interestedUserId) === String(userId);

  if (!isOwner && !isInterested) {
    throw new Error("Usuário não pertence a este match");
  }

  const messages = await Message.find({ matchId })
    .sort({ createdAt: 1 })
    .populate("senderId", "name email")
    .populate("receiverId", "name email");

  return messages;
};

const getMatchesByUser = async (userId) => {
  if (!userId) {
    throw new Error("userId é obrigatório");
  }

  const matches = await Match.find({
    $or: [{ ownerId: userId }, { interestedUserId: userId }],
    status: "MATCHED",
  })
    .populate("ownerId", "name email")
    .populate("interestedUserId", "name email")
    .populate("ownerClothingId")
    .populate("interestedClothingId")
    .sort({ createdAt: -1 });

  return matches;
};

export {
  createMatch,
  sendMessage,
  getMessagesByMatch,
  getMatchesByUser,
};