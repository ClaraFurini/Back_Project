// Carregar variáveis de ambiente do arquivo .env
require('dotenv').config();

// Importar bibliotecas
const express = require('express');
const mongoose = require('mongoose');

// Criar aplicação Express
const app = express();

// Middleware para ler JSON do body das requisições
app.use(express.json());

// Conectar ao MongoDB
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/streaming_videos';
console.log('🔗 URI do Mongo:', mongoUri);

mongoose.connect(mongoUri)
  .then(() => console.log('✅ Conectado ao MongoDB!'))
  .catch(err => console.error('❌ Erro ao conectar no MongoDB:', err.message));

// Importar rotas
app.use('/users', require('./routes/userRoutes'));
app.use('/profiles', require('./routes/profileRoutes'));
app.use('/categories', require('./routes/categoryRoutes'));
app.use('/contents', require('./routes/contentRoutes'));
app.use('/movies', require('./routes/movieRoutes'));
app.use('/series', require('./routes/seriesRoutes'));
app.use('/episodes', require('./routes/episodesRoutes'));
app.use('/ratings', require('./routes/ratingsRoutes'));

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
const errorHandler = require('./middlewares/errorHandler');
app.use(errorHandler);