require('dotenv').config();

const Agenda = require('agenda');
const moment = require('moment');

const { TwitterAPI, OlympicsAPI } = require('./api');

const agenda = new Agenda({
    db: {
        address: process.env.MONGO_URI, 
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    },
});

// Agenda todos os tweets dos jogos do dia
agenda.define('SCHEDULE_ALL_TWEETS', async () => {
    const games = await OlympicsAPI.getFutureGames();

    // Para cada jogo do dia, agendar os tweets
    games.forEach(async game => {
        if(!game) {
            return;
        }

        // Um jogo começou
        agenda.schedule(new Date(moment(game.starts_at).format('YYYY-MM-DD HH:mm:ss')), 'TWEET_CURRENT_EVENT', game);
    });
});

agenda.define('TWEET_CURRENT_EVENT', job => {
    const game = job.attrs.data;

    var tweet = null;

    if(game.participants) {
        if(game.participants.type === 'ATHLETES') {
            tweet = `🔥 COMEÇOU! VAI BRASIL! 🇧🇷\n\n${game.sport} ${game.modality} ${game.category} (${game.stage}) \n\n${game.participants.entities[0].emoji_flag} ${game.participants.entities[0].name} (${game.participants.entities[0].origin.name})\nvs\n${game.participants.entities[1].emoji_flag} ${game.participants.entities[1].name} (${game.participants.entities[1].origin.name})\n\n📺 TV Globo/Globoplay/SporTV`;
        }
        else if(game.participants.type === 'COUNTRIES') {
            tweet = `🔥 COMEÇOU! VAI BRASIL! 🇧🇷\n\n${game.sport} ${game.modality} ${game.category} (${game.stage}) \n\n${game.participants.entities[0].emoji_flag} ${game.participants.entities[0].name} vs ${game.participants.entities[1].emoji_flag} ${game.participants.entities[1].name}\n\n📺 TV Globo/Globoplay/SporTV`;
        }
    } else {
        tweet = `🔥 COMEÇOU! VAI BRASIL! 🇧🇷\n\n${game.sport} ${game.modality} ${game.category} (${game.stage}) \n\n📺 TV Globo/Globoplay/SporTV`;
    }
    
    TwitterAPI.post('statuses/update', { status: tweet })
    .catch(err => {
        console.log('Erro ao tweetar!', err);
    });
});

agenda.define('TWEET_SOON_EVENT', job => {
    const game = job.attrs.data;

    var tweet = null;

    if(game.participants) {
        if(game.participants.type === 'ATHLETES') {
            tweet = `🔔 ANOTA AÍ! Hoje (${moment(game.starts_at).format('DD/MM')}) às ${moment(game.starts_at).format('HH:mm')} \n\n${game.sport} ${game.modality} ${game.category} (${game.stage}) \n\n${game.participants.entities[0].emoji_flag} ${game.participants.entities[0].name} (${game.participants.entities[0].origin.name})\nvs\n${game.participants.entities[1].emoji_flag} ${game.participants.entities[1].name} (${game.participants.entities[1].origin.name})\n\n📺 TV Globo/Globoplay/SporTV`;
        }
        else if(game.participants.type === 'COUNTRIES') {
            tweet = `🔔 ANOTA AÍ! Hoje (${moment(game.starts_at).format('DD/MM')}) às ${moment(game.starts_at).format('HH:mm')} \n\n ${game.sport} ${game.modality} ${game.category} (${game.stage}) \n\n${game.participants.entities[0].emoji_flag} ${game.participants.entities[0].name} vs ${game.participants.entities[1].emoji_flag} ${game.participants.entities[1].name}\n\n📺 TV Globo/Globoplay/SporTV`;
        }
    } else {
        tweet = `🔔 ANOTA AÍ! Hoje (${moment(game.starts_at).format('DD/MM')}) às ${moment(game.starts_at).format('HH:mm')} \n\n${game.sport} ${game.modality} ${game.category} (${game.stage}) \n\n📺 TV Globo/Globoplay/SporTV`;
    }

    TwitterAPI.post('statuses/update', { status: tweet })
    .catch(err => {
        console.log('Erro ao tweetar!', err);
    });
});

(async function () {
    await agenda.start();
  
    // Todos os dias - meia noite
    await agenda.every('00 00 * * *', 'SCHEDULE_ALL_TWEETS');

    //await agenda.now('SCHEDULE_ALL_TWEETS');
})();

