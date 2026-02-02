const financesService = require("../services/financesService");

async function getMonthlySummary(req, res) {
  try {
    const {month, year} = req.query;
    const summary = await financesService.getMonthlySummary(req.userId, month, year);
    res.status(200).json(summary);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar dados financeiros" });
  }
};

module.exports = { getMonthlySummary }