const isAdmin = (req, res, next) => {
  try {
    if (!req.loggerUser) {
      return res.status(401).json({
        error: "Usuário não autenticado"
      });
    }

    if (req.loggerUser.role !== "admin") {
      return res.status(403).json({
        error: "Acesso negado. Somente administradores podem realizar esta ação"
      });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Erro interno ao validar permissão de administrador"
    });
  }
};

export default isAdmin;