const financesService = require("../services/financesService");

async function getMonthlySummary(req, res) {
  try {
    const {month, year} = req.query;
    const userId = parseInt(req.userId);

    if(!month || !year){
      res.status(400).json({error: "Os parâmetros mês e ano são obrigatórios!"})
    }

    const summary = await financesService.getMonthlySummary(userId, month, year);
    
    res.status(200).json(summary);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar dados financeiros" });
  }
};

module.exports = { getMonthlySummary }