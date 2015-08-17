var models = require('../models/models.js');
var Sequelize = require('sequelize');

var statData = [];

// GET /quizes/statistics
exports.show = function(req, res, next) {

  Sequelize.Promise.all([
    models.Quiz.count(),
    models.Comment.count(),
    models.Quiz.count({distinct: true, include: [{ model: models.Comment, required: true}]})
  ]).then(function(conta) {
      statData = [];
      statData[0] = ["Número de preguntas", conta[0]];
      statData[1] = ["Número de comentarios totales", conta[1]];
      statData[2] = ["Número medio de comentarios por pregunta", conta[0]?(conta[1] / conta[0]).toFixed(1):0];
      statData[3] = ["Número de preguntas sin comentarios", conta[0]-conta[2]];
      statData[4] = ["Número de preguntas con comentarios", conta[2]];
      res.render('statistics/show.ejs', {datos: statData, errors: []});
    }
  ).catch(function(error) { next(error); });

};