const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    'produtos',             // Base de dados
    'avaliacao_fullstack',  // Usuário BD
    'avaliacao_fullstack',  // Senha BD
    {
        host: 'localhost',
        dialect: 'mysql'
    }
);


 // APÓS O TESTE DE CONEXÃO COM O BANCO DE DADOS, DEVE COMENTAR ESTAS LINHAS PARA NÃO FICAR SINCRONIZANDO CONSTANTEMENTE COM O BANCO DE DADOS, BD.
 // CONEXÃO COM O BANCO DE DADOS
 sequelize.authenticate().then(() => {
    console.log('Conexão com banco de dados estabelecida com sucesso.');
 }).catch((error) => {
    console.error('Erro ao se conectar ao banco de dados: ', error);
 });

module.exports = sequelize;