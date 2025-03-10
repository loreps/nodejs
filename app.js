const express = require('express');
const path = require('path');
const indexRouter = require('./routes/index');

const app = express();
const PORT = 3000;

const { Client, GatewayIntentBits } = require('discord.js');
const express = require('express');

const TOKEN = 'MTM0ODYyMjMzNjg5ODYyOTY2Mg.GUPcmW.OO4iPjQAbA99ZNa_Vmlb3G3yy5S-Cd2NdngJgE';
const VERIFICATION_URL = 'https://humanproof.netlify.app//verify';

const bot = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

bot.on('ready', () => {
    console.log(`Bot logged in as ${bot.user.tag}`);
});

bot.on('messageCreate', async (message) => {
    if (message.content === '!verify') {
        const link = `${VERIFICATION_URL}?user=${message.author.id}`;
        await message.author.send(`Привіт! Перевір себе за цим посиланням: ${link}`);
    }
});

// Отримання результатів перевірки
const app = express();
app.use(express.json());

app.post('/verification-result', async (req, res) => {
    const { userId, isHuman, reason } = req.body;

    try {
        const user = await bot.users.fetch(userId);
        if (isHuman) {
            await user.send('✅ Верифікація пройдена! Ти справжня людина.');
        } else {
            await user.send(`❌ Верифікація не пройдена: ${reason}`);
        }
        res.status(200).send('OK');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
});

app.listen(3001, () => console.log('Server listening on port 3001'));

bot.login(TOKEN);

