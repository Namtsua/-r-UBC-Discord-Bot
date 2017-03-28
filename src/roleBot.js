
// import the discord.js module
const Discord = require('discord.js');

// create an instance of a Discord Client, and call it bot
const bot = new Discord.Client();

// the token of your bot - https://discordapp.com/developers/applications/me
const token = 'MjgyMDE0NDEyMTU4Nzk1Nzg2.C4kROQ.p6nFyT7rpc5QFEvz3c53ULFrMaw';


var yearIDs = {
    alumni: "280085913382551554",
    first: "275881487738601475",
    second: "275881588137525248",
    third: "275881602154758144",
    fourth: "275881611680153600",
    fifth: "275881621507538945",
    sixth: "275881638771294208",
    seventh: "275881649294671872"
};

var programIDs = {
    arts: "275877649199661056",
    architecture: "276145995782422528",
    biospsychology: "280104705932394496",
    computerscience: "275897810564415488",
    engineering: "275877766753288192",
    kinesiology: "275878916693164032",
    lfs: "275881139170836481",
    music: "275881225967632385",
    pharmacy: "276241227102289920",
    poliscience: "279147501892796416",
    sauder: "275877687594057729",
    science: "275877745052090370"
};

var yearUserBase = {
    test: 0
};

var programUserBase = {
    test: 0
};

// the ready event is vital, it means that your bot will only start reacting to information
// from Discord _after_ ready is emitted.
bot.on('ready', () => {
    console.log('I am ready!');
});
// create an event listener for messages
bot.on('message', message => {
// filter for user response
    const filter = message => message.content.match(/^\d+$/);
// 282277372609429504 <- mine
//  282389811275497473 <- ubc
if (message.content[0] === '!' && (message.author.id === "275874563198287873" || message.channel.id === "278002373803114496")) {
     if (message.author.id === "228349219700736001"){
        message.reply("Congrats! You have been successfully transferred to Sprott Shaw Community College.");
         return;
     } else if (message.author.id === "191819447919443968"){
         message.reply("Talk to me when your taste in music improves.");
     }
    var parsedMessage = message.content.split(" ");
    switch (parsedMessage[0]) {
        case '!year': {
            // Check if user can set role
            message.reply("OK, let's give you a role! What year are you in? \n(Type 0 for Alumni or a number from 1 to 7 corresponding to your standing.)");
            bot.channels.get("278002373803114496").awaitMessages(filter, {max: 1, time: 60000, errors: ['time']})
                .then(collected => {
                assignYear(collected.first().toString(), message);})
        .catch(collected => message.reply(`You didn't respond, did you end up going to SFU? \nIn any case, I'm returning to standby.`));
            break;
        }
        case '!program':{
            message.reply("Now that we know what year you're in, which faculty/program are you in?" +
                "\n You can choose from the following, simply type the correspond number: " +
                "\n 1) Arts \n 2) Architecture \n 3) Biopsychology \n 4) Computer Science \n 5) Engineering \n 6) Kinesiology \n 7) LFS \n 8) Music" +
                "\n 9) Pharmacy \n 10) Political Science \n 11) Sauder \n 12) Science \n 13) My faculty/program isn't listed");
            bot.channels.get("278002373803114496").awaitMessages(filter, {max: 1, time: 60000, errors: ['time']})
                .then(collected => assignProgram(collected.first().toString(), message))
        .catch(collected => message.reply(`You didn't respond, did you end up going to Langara? \nIn any case, I'm returning to standby.`));
            break;
        }
        case '!help':
            message.reply("Currently only the !year, !program and !ams commands are supported, bug Namtsua if you want another feature to be added.");
            break;
        case '!ams':
            message.reply("http://streamable.com/gbqjv");
            break;
        default:
            message.reply("Sorry, I don't recognize that command. Please use !help to view all valid commands.")
    }
}});

function assignYear(year, message){
    if (checkYearLimit(message.author.id, message))
        return;
    switch(year){
        case '0':
            message.reply("What are you doing here? Just kidding, anyone UBC-related is welcome.");
            message.member.addRole(yearIDs['alumni']);
            break;
        case '1':
            message.reply("Welcome to UBC! I hope you are enjoying your first year.");
            message.member.addRole(yearIDs['first']);
            break;
        case '2':
            message.reply("Thanks. How about them late registration dates, eh?");
            message.member.addRole(yearIDs['second']);
            break;
        case '3':
            message.reply("Thanks. Congratulations on surviving your first two years!");
            message.member.addRole(yearIDs['third']);
            break;
        case '4':
            message.reply("Thanks. I hope you're enjoying those sweet early registration dates.");
            message.member.addRole(yearIDs['fourth']);
            break;
        case '5':
            message.reply("Thanks. I hope your half decade at UBC has been great!");
            message.member.addRole(yearIDs['fifth']);
            break;
        case '6':
            message.reply("Thanks. Going for the long haul, eh?");
            message.member.addRole(yearIDs['sixth']);
            break;
        case '7':
            message.reply("Thanks. I see you can't get enough of UBC, but you can't stay forever!");
            message.member.addRole(yearIDs['seventh']);
            break;
        default:
            message.reply("Sorry, please input a value from 0 to 7");
            break;
    }
    message.reply("If you want your program/faculty added to your user, please user the !program command.")
}

function assignProgram(program, message){
    if (checkProgramLimit(message.author.id, message))
        return;
    switch(program){
        case '1':
            message.reply("Arts, eh? Tired of writing essays yet?");
            message.member.addRole(programIDs['arts']);
            break;
        case '2':
            message.reply("Architecture, eh? Planning on becoming the next Indiana Jones?");
            message.member.addRole(programIDs['architecture']);
            break;
        case '3':
            message.reply("Biopsychology, eh? That's oddly specific.");
            message.member.addRole(programIDs['biopsychology']);
            break;
        case '4':
            message.reply("Computer Science, eh? Remember to trust the natural recursion!");
            message.member.addRole(programIDs['computerscience']);
            break;
        case '5':
            message.reply("Engineering, eh? We get it. You think your program is hard.");
            message.member.addRole(programIDs['engineering']);
            break;
        case '6':
            message.reply("Kinesiology, eh? I'm down for some massages anytime.");
            message.member.addRole(programIDs['kinesiology']);
            break;
        case '7':
            message.reply("LFS, eh? Is that actually a faculty?");
            message.member.addRole(programIDs['lfs']);
            break;
        case '8':
            message.reply("Music, eh? Are you the type to play Wonderwall at a house party?");
            message.member.addRole(programIDs['music']);
            break;
        case '9':
            message.reply("Pharmacy, eh? If you need anyone to test some hallucinogenics, let me know!");
            message.member.addRole(programIDs['pharmacy']);
            break;
        case '10':
            message.reply("Political Science, eh? Is this just a stepping stone towards law school?");
            message.member.addRole(programIDs['poliscience']);
            break;
        case '11':
            message.reply("Sauder, eh? Something something snakesssssssssssssssssssss");
            message.member.addRole(programIDs['sauder']);
            break;
        case '12':
            message.reply("Science, eh? Sorry there's no pre-med option!");
            message.member.addRole(programIDs['science']);
            break;
        case '13':
            message.reply("Clearly your faculty/program isn't good enough. Kidding aside, just let one of the mods know and it'll eventually get added.");
            break;
        default:
            message.reply("Sorry, please input a value from 1 to 13.");
    }
}

function checkYearLimit(userID, message){
    var currentDate = Date.now();
    if (yearUserBase.hasOwnProperty(userID) && (currentDate - yearUserBase[userID]  <= 3600000)){
        message.reply("Sorry, you've hit your limit. Hope you're Santasfied! \n Please try again in " + Math.floor((3600000 - (currentDate - yearUserBase[userID]))/60000) + " minutes.");
        return true;
    }else
        yearUserBase[userID] = currentDate;
    return false;
}


function checkProgramLimit(userID, message){
    var currentDate = Date.now();
    if (programUserBase.hasOwnProperty(userID) && (currentDate - programUserBase[userID]  <= 3600000)){
        message.reply("Sorry, you've hit your limit. Hope you're Santasfied! \n Please try again in " + Math.floor((3600000 - (currentDate - programUserBase[userID]))/60000) + " minutes.");
        return true;
    }else
        programUserBase[userID] = currentDate;
    return false;
}
// log our bot in
bot.login(token);