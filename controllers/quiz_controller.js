var models = require('../models/models.js');

//Autoload - factoriza el codigo si ruta incluye :quizId
exports.load = function(req, res, next, quizId) {
	models.Quiz.find(quizId).then(
		function(quiz) {
			if (quiz) {
				req.quiz = quiz;
				next();
			} else {
				next(new Error('No existe quizId='+quizId));
			}
		}
	).catch(function(error){next(error);})	
};

//GET /quizes
exports.index = function(req, res) {
	models.Quiz.findAll().then(
		function(quizes) {
			res.render('quizes/index',{quizes: quizes});
		}
	).catch(function(error){next(error);})	
};

//GET /quizes/:id
exports.show = function(req, res) {
	res.render('quizes/show',{quiz: req.quiz});	
};

//GET /quizes/:id/answer
exports.answer = function(req, res) {
	var resultado ='Incorrecto';
	if(req.query.respuesta.toUpperCase() === req.quiz.respuesta.toUpperCase()) {
		resultado = 'Correcto';
	} 
	res.render('quizes/answer',	{quiz : req.quiz, respuesta: resultado});		
};

//GET /quizes/authors
exports.authors = function(req, res) {
	res.render('quizes/authors',{autor: 'Eduardo Merchan Velasco'});
};

//OLD
//GET /quizes
/*exports.index = function(req, res) {
	models.Quiz.findAll().then(function(quizes) {
		res.render('quizes/index.ejs',{quizes: quizes});
	})	
};*/

//GET /quizes/question
exports.question = function(req, res) {
	models.Quiz.findAll().success(function(quiz) {
		res.render('quizes/question',{pregunta: quiz[0].pregunta});
	})	
};