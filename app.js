var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('hbs'); // importar o hbs para usar o partials

const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { Usuario } = require('./model/modelos'); // Importa os modelo para consultar o banco
var rotasProduto = require('./routes/rotasProduto');


var rotasIndex = require('./routes/rotasIndex');
var rotasUsuario = require('./routes/rotasUsuario');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Partials
// Registra partials do handlebars (view/partials)
hbs.registerPartials(path.join(__dirname, 'views', 'partials'));


// HELPER DO HANDLEBARS PARA COMPARAÇÕES NO HTML (IGUALDADE)
hbs.registerHelper('eq', function (a, b) {
  return a === b;
});
// Partials


// Configuração do middleware de sessão, utilizando express-session
app.use(session({
  // Chave usada para assinar o cookie de sessão e evitar adulteração.
  secret: 'CHAVE_SECRETA_DE_DESENVOLVIMENTO',
  // Evita salvar a sessão novamente se nada foi alterado durante a requisição.
  resave: false,
  // Não cria sessão para visitantes que ainda não autenticaram/interagiram com sessão.
  saveUninitialized: false,
  cookie: {
    // Impede acesso ao cookie via javasScript do navegador (mitiga XSS).
    httpOnly: true,
    // Em produção com HTTPS deve ser true; em ambiente local HTTP fica false.
    secure: false,
    // Duração da sessão no navegador: 24 horas em milissegundos.
    maxAge: 30 * 60 * 1000, // Sessão expira em 30 minutos
  },
}));

passport.use(new LocalStrategy(
  {
    usernameField: 'email', // O formulário usa 'email' como login
    passwordField: 'senha'  // O formulário usa 'senha'
  },
  async function (email, senha, done) {
    try {
      // Procura o usuário pelo e-mail
      const usuario = await Usuario.findOne({ where: { email: email } });

      if (!usuario) {
        return done(null, false, { message: 'Usuário não encontrado.' });
      }

      // Compara a senha digitada com a senha criptografada (hash) do banco
      const senhaValida = await bcrypt.compare(senha, usuario.senha_hash);

      if (!senhaValida) {
        return done(null, false, { message: 'Senha incorreta.' });
      }

      // Tudo certo! Retorna o usuário
      return done(null, usuario);
    } catch (error) {
      return done(error);
    }
  }
));

// Guarda apenas o ID do usuário na gaveta da sessão
passport.serializeUser(function (usuario, done) {
  done(null, usuario.id);
});

// Recupera os dados completos do usuário através do ID salvo
passport.deserializeUser(async function (id, done) {
  try {
    const usuario = await Usuario.findByPk(id);
    done(null, usuario);
  } catch (error) {
    done(error, null);
  }
});


// Configuração do Passport para autenticação, deve ser após configuração de sessão
app.use(passport.initialize());
// Middleware para persistir login do usuário entre requisições, utilizando sessões
app.use(passport.session());
// Middleware para disponibiliza informações do usuário autenticado em todas as views
app.use(function (req, res, next) {
  res.locals.user = req.user || null;
  next();
});

// Fim dos Middlers de session


app.use('/', rotasIndex);
app.use('/usuarios', rotasUsuario);
app.use('/produtos', rotasProduto);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
