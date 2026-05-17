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
    {
        sequelize,
        freezeTableName: true,
        createdAt: 'criado_em',
        updatedAt: 'atualizado_em'
    });

// Relacionamentos obrigatórios (Foreign Keys)
Categoria.hasMany(Produto, { foreignKey: { name: 'categoria_id', allowNull: false } });
Produto.belongsTo(Categoria, { foreignKey: { name: 'categoria_id', allowNull: false } });

Usuario.hasMany(Produto, { foreignKey: { name: 'usuario_id', allowNull: false } });
Produto.belongsTo(Usuario, { foreignKey: { name: 'usuario_id', allowNull: false } });

// Sincronização estrutural com o Banco de Dados
sequelize.sync({ alter: true }).then(() => {
    console.log('Modelos ElectroStore sincronizados com sucesso.');
}).catch((error) => {
    console.error('Falha na sincronização dos modelos:', error);
});

module.exports = { Categoria, Usuario, Produto };