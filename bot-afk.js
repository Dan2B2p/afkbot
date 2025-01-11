const mineflayer = require('mineflayer');

// Configurações do bot
const bot = mineflayer.createBot({
  host: 'survival_b1p.aternos.me', // IP ou hostname do servidor
  port: 14892, // Porta
  username: 'AFK_B1p', // Nome do bot
});

// Eventos do bot
bot.on('login', () => {
  console.log(`Bot conectado como ${bot.username}`);
  bot.chat('Olá, estou apenas testando um bot!');
});

bot.once('spawn', () => {
  console.log('Bot spawnado no servidor!');
  manterAFK();
});

function manterAFK() {
  setInterval(() => {
    bot.setControlState('jump', true);
    setTimeout(() => bot.setControlState('jump', false), 1000);
    bot.look(Math.random() * Math.PI * 2, Math.random() * Math.PI); // Olha em direções aleatórias
  }, 30000); // A cada 30 segundos
}

// Reconexão automática
bot.on('end', () => {
  console.log('Bot foi desconectado. Tentando reconectar...');
  setTimeout(() => {
    bot.connect();
  }, 5000);
});

// Tratamento de erros
bot.on('kicked', (reason) => console.log(`Fui expulso! Motivo: ${reason}`));
bot.on('error', (err) => console.log(`Erro: ${err}`));
