module.exports = function handler(req, res) {
  res.status(200).json({ status: 'up', service: 'roninvolt-portfolio', time: new Date().toISOString() });
};
