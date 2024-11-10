const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

// Configuração do adaptador do lowdb
const adapter = new FileSync('db.json');
const db = low(adapter);

// Inicializa o banco de dados com um array vazio de estudantes, se ainda não existir
db.defaults({ students: [] }).write();

module.exports = db;
