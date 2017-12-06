
// import the discord.js module

var config = require('./config');
var messages = require('./messages');
const Discord = require('discord.js');

// create an instance of a Discord Client, and call it bot
const bot = new Discord.Client();

// the token of your bot - https://discordapp.com/developers/applications/me
const token = config.TOKEN;


var yearIDs = {
    alumni: config.ALUMNI,
    first: config.FIRSTYEAR,
    second: config.SECONDYEAR,
    third: config.THIRDYEAR,
    fourth: config.FOURTHYEAR,
    fifth: config.FIFTHYEAR,
    sixth: config.SIXTHYEAR,
    seventh: config.SEVENTHYEAR
};

var programIDs = {
    arts: config.ARTS,
    architecture: config.ARCHITECTURE,
    biopsychology: config.BIOPSYCHOLOGY,
    computerscience: config.COMPUTERSCIENCE,
    engineering: config.ENGINEERING,
    kinesiology: config.KINESIOLOGY,
    lfs: config.LFS,
    music: config.MUSIC,
    pharmacy: config.PHARMACY,
    poliscience: config.POLISCIENCE,
    sauder: config.SAUDER,
    science: config.SCIENCE
};

var yearUserBase = {};
var programUserBase = {};
var banNamUserBase = {};


// from Discord _after_ ready is emitted.
bot.on('ready', () => {
    console.log('I am ready!');
});

// Greet new users to the Discord server
bot.on('guildMemberAdd',(user) => {
    bot.channels.get(config.GENERAL).sendMessage(messages.WELCOME_MESSAGE.replace('welcomeemote',config.ONOWELCOMEEMOTE).replace('user',user.id));
});

// Let everyone know who left
bot.on('guildMemberRemove', (user) => {
    if (user.id === config.NAMTSUA) {
        bot.channels.get(config.GENERAL).sendMessage(messages.OWNER_LEFT);
    }
    else {
        bot.channels.get(config.GENERAL).sendMessage(messages.GOODBYE_MESSAGE.replace('user', user.id).replace('onoyed', config.ONOYEDEMOTE));
    }
});

// create an event listener for messages
bot.on('message', message => {
    // filter for user response
    const filter = message => message.content.match(/^\d+$/);
    if (message.content[0] !== '1') return;

    if ((message.author.id === config.NAMTSUA || message.channel.id === config.BOTCOMMANDSCHANNEL || message.channel.id === config.GENERAL)) {
        if (message.author.id === config.BAUSMANGO){
            message.reply(messages.BAUSMANGO);
            return;
        } else if (message.author.id === config.BURROWL){
            message.reply(messages.BURROWL);
            return;
        }

        var parsedMessage = message.content.split(" ");
        switch (parsedMessage[0]) {
            case '!year': {
                // Check if user can set role
                message.reply(messages.YEAR_INFO);
                bot.channels.get(config.BOTCOMMANDSCHANNEL).awaitMessages(filter, {max: 1, time: 60000, errors: ['time']})
                    .then(collected => {
                    assignYear(collected.first().toString(), message);})
            .catch(collected => message.reply(messages.TIMEOUT));
                break;
            }
            case '!program':{
                message.reply(messages.PROGRAM_INFO);
                bot.channels.get(config.BOTCOMMANDSCHANNEL).awaitMessages(filter, {max: 1, time: 60000, errors: ['time']})
                    .then(collected => assignProgram(collected.first().toString(), message))
            .catch(collected => message.reply(messages.TIMEOUT));
                break;
            }
            case '!help':
                message.reply(messages.HELP);
                break;
            case '!ams':
                message.reply(messages.AMS);
                break;
            case "!youtube":
                message.reply(messages.YOUTUBE);
                break;
            default:
                message.reply(messages.UNKNOWN)
        }
    } else {
        var random = Math.random();
        if (message.author.id == config.VYSO) {
            if (random <= 0.05) {
                message.reply(messages.VYSO);
                return;
            }
        }

        if (message.author.id == config.SNOWPENGUIN ) {
            if ((config.WEEBREGEX.test(message.content) && message.channel.id === config.GENERAL) || message.content.toLowerCase().indexOf("hiss") >= 0 || message.content.toLowerCase().indexOf("sauder") >= 0) {
                if (random <= 0.8) {
                    message.reply(messages.SNOWPENGUIN.replace('onoyed,',config.ONOYEDEMOTE));
                    return;
                }
            }
        }

        if (message.author.id == config.BURROWL) {
            if (message.content.toLowerCase().indexOf("i want to di") >= 0) {
                message.reply(messages.BURROWL_ON_MESSAGE.replace('onoyed', config.ONOYEDEMOTE));
            }
        }

        if (config.WEEBREGEX.test(message.content) && message.channel.id === config.GENERAL)
        {
            if (random <= 0.40) {
                message.reply(MessageMentions.WEEB.replace('channel', config.WEEBCHANNEL));
                return;
            }
        }

        if (message.author.id == config.NAMTSUA) {
            if (random <= 0.02) {
                message.reply(messages.NAMTSUA_ON_MESSAGE);
            }
        }

        if (message.content.toLowerCase().indexOf("weeb") >= 0){
        if (message.content.toLowerCase().indexOf("nam") >= 0 || message.content.toLowerCase().indexOf("namtsua") >= 0) {
            message.reply(messages.NAMTSUA_PROPAGANDA.replace('namtsua', config.NAMTSUA));
        }
        }
    }
});

function assignYear(year, message){
    switch(year){
        case '0':
            message.reply(messages.ALUMNI);
            message.member.addRole(yearIDs['alumni']);
            break;
        case '1':
            message.reply(messages.FIRST);
            message.member.addRole(yearIDs['first']);
            break;
        case '2':
            message.reply(messages.SECOND);
            message.member.addRole(yearIDs['second']);
            break;
        case '3':
            message.reply(messages.THIRD);
            message.member.addRole(yearIDs['third']);
            break;
        case '4':
            message.reply(messages.FOURTH);
            message.member.addRole(yearIDs['fourth']);
            break;
        case '5':
            message.reply(messages.FIFTH);
            message.member.addRole(yearIDs['fifth']);
            break;
        case '6':
            message.reply(messages.SIXTH);
            message.member.addRole(yearIDs['sixth']);
            break;
        case '7':
            message.reply(messages.SEVENTH);
            message.member.addRole(yearIDs['seventh']);
            break;
        default:
            message.reply(messages.YEAR_WRONG_FORMAT);
            break;
    }
    message.reply(messages.YEAR_FOLLOWUP);
}

function assignProgram(program, message){
    switch(program){
        case '1':
            message.reply(messages.ARTS);
            message.member.addRole(programIDs['arts']);
            break;
        case '2':
            message.reply(messages.ARCHITECTURE);
            message.member.addRole(programIDs['architecture']);
            break;
        case '3':
            message.reply(messages.BIOPSYCHOLOGY);
            message.member.addRole(programIDs['biopsychology']);
            break;
        case '4':
            message.reply(messages.COMPUTER_SCIENCE);
            message.member.addRole(programIDs['computerscience']);
            break;
        case '5':
            message.reply(messages.ENGINEERING);
            message.member.addRole(programIDs['engineering']);
            break;
        case '6':
            message.reply(messages.KINESIOLOGY);
            message.member.addRole(programIDs['kinesiology']);
            break;
        case '7':
            message.reply(messages.LFS);
            message.member.addRole(programIDs['lfs']);
            break;
        case '8':
            message.reply(messages.MUSIC);
            message.member.addRole(programIDs['music']);
            break;
        case '9':
            message.reply(messages.PHARMACY);
            message.member.addRole(programIDs['pharmacy']);
            break;
        case '10':
            message.reply(messages.POLITICAL_SCIENCE);
            message.member.addRole(programIDs['poliscience']);
            break;
        case '11':
            message.reply(messages.SAUDER);
            message.member.addRole(programIDs['sauder']);
            break;
        case '12':
            message.reply(messages.SCIENCE);
            message.member.addRole(programIDs['science']);
            break;
        case '13':
            message.reply(messages.PROGRAM_MISSING.replace('namtsua',config.NAMTSUA));
            break;
        default:
            message.reply(messages.PROGRAM_WRONG_FORMAT);
    }
}

function checkYearLimit(userID, message){
    var currentDate = Date.now();
    if (yearUserBase.hasOwnProperty(userID) && (currentDate - yearUserBase[userID]  <= 600000)){
        var timeLeft = Math.floor((600000 - (currentDate - yearUserBase[userID]))/60000);
        message.reply(messages.MESSAGE_LIMIT.replace("timeleft",timeLeft));
        yearUserBase[userID] = timeLeft;
        return true;
    }
    else {
        yearUserBase[userID] = currentDate;
    }
    return false;
}


function checkProgramLimit(userID, message){
    var currentDate = Date.now();
    if (programUserBase.hasOwnProperty(userID) && (currentDate - programUserBase[userID]  <= 600000)){
        var timeLeft = Math.floor((600000 - (currentDate - yearUserBase[userID]))/60000);
        message.reply(messages.MESSAGE_LIMIT.replace("timeleft",timeLeft));
        programUserBase[userID] = timeLeft;
        return true;
    }
    else {
        programUserBase[userID] = currentDate;
    }
    return false;
}

// log our bot in
bot.login(token);