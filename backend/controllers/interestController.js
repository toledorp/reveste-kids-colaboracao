import interestService from "../services/interestService.js";

const like = async (req, res) => {
  try {
    const userId = req.loggerUser.id;
    const { clothingId } = req.params;

    const result = await interestService.like(userId, clothingId);

    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Erro ao curtir peça" });
  }
};

const unlike = async (req, res) => {
  try {
    const userId = req.loggerUser.id;
    const { clothingId } = req.params;

    await interestService.unlike(userId, clothingId);

    return res.status(200).json({ message: "Removido dos likes" });
  } catch (error) {
    return res.status(500).json({ error: "Erro ao descurtir" });
  }
};

const getMatches = async (req, res) => {
  try {
    const userId = req.loggerUser.id;
    const matches = await interestService.getMatches(userId);

    return res.status(200).json(matches);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Erro ao buscar matches" });
  }

  
};

const getMyLikes = async (req, res) => {
  try {
    const userId = req.loggerUser.id;
    const likes = await interestService.getUserLikes(userId);

    return res.status(200).json(likes);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Erro ao buscar likes do usuário" });
  }
};

export default { like, unlike, getMatches, getMyLikes };