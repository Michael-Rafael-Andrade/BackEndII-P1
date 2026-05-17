const { DataTypes, Model } = require('sequelize');
const sequelize = require('./server.js');

class Categoria extends Model { }
Categoria.init({
    id: {
        type:
            DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nome: {
        type:
            DataTypes.STRING,
        allowNull: false
    }
}, { sequelize, freezeTableName: true, timestamps: false });

class Usuario extends Model { }
Usuario.init({
    id: {
        type:
            DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type:
            DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    senha_hash: {
        type:
            DataTypes.STRING,
        allowNull: false
    },
    perfil: {
        type:
            DataTypes.ENUM('usuario', 'admin', 'lojista'),
        allowNull: false
    }
},
    {
        sequelize,
        freezeTableName: true,
        timestamps: false
    });

class Produto extends Model { }
Produto.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nome: {
        type:
            DataTypes.STRING,
        allowNull: false
    },
    preco: {
        type:
            DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    descricao: {
        type:
            DataTypes.TEXT,
        allowNull: false
    },
    quantidade: {
        type:
            DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type:
            DataTypes.ENUM('ativo', 'inativo'),
        allowNull: false
    }
},
    {   // Configurações adicionais do modelo
        sequelize, // para estabelecer conexão com o BD
        freezeTableName: true, // nome da tabela igual ao nome da classe
        createdAt: 'criada_em', // mapeia o atributo 'createdAt' padrão para 'criada_em'
        updatedAt: 'atualizada_em', // mapeia o atributo 'updatedAt' padrão para 'atualizada_em'
    },
);

// Relacionamentos obrigatórios (Foreign Keys)
// Uma Categoria tem vários Produtos
Categoria.hasMany(Produto, { foreignKey: 'categoria_id' });
// Um Produto pertence a uma Categoria (apelido 'categoria')
Produto.belongsTo(Categoria, { foreignKey: 'categoria_id', as: 'categoria' });

// Um Usuário tem vários Produtos
Usuario.hasMany(Produto, { foreignKey: 'usuario_id' });
// Um Produto pertence a um Usuário (apelido 'usuario')
Produto.belongsTo(Usuario, { foreignKey: 'usuario_id', as: 'usuario' });



// // APÓS CRIAR OS ELEMENTOS DA TABELA DEVE COMENTAR TODO O CÓDIGO DE CRIAÇÃO DOS ELEMENTOS DENTRO DA TABELA 
// // Criar o banco de dados dentro da tabela 'demandas_ti' que está dentro do mysql 
sequelize.sync({ alter: true }).then(() => {
    console.log('Modelos ElectroStore sincronizados com sucesso.');
}).catch((error) => {
    console.error('Falha na sincronização dos modelos:', error);
});


module.exports = { Categoria, Usuario, Produto };