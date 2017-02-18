// var Discord = require('discord.io');
// var bot = new Discord.Client({
//     autorun: true,
//     token: "MjgyMDE0NDEyMTU4Nzk1Nzg2.C4kROQ.p6nFyT7rpc5QFEvz3c53ULFrMaw"
// });
//

//
// bot.on('ready', function(event) {
//     console.log('Logged in as %s - %s\n', bot.username, bot.id);
//     bot.sendMessage({
//         to: "282277372609429504",
//         message: "Hello everyone"
//     });
// });
//
// bot.on('message', function(user, userID, channelID, message, event) {
//     var parsedMessage = message.split(" ");
//     if (parsedMessage[0] === "!ping") {
//         bot.sendMessage({
//             to: channelID,
//             message: parsedMessage[1]
//         });
//     }
//     if (parsedMessage[0] === "!role") {
//         bot.addToRole({"serverID":channelID,"userID":userID,"roleID":roleIDs[parsedMessage[1]]},function(err,response) {
//             if (err) console.error(err); /* Failed to apply role */
//             /* some code */
//         });
//         bot.sendMessage({
//             to: channelID,
//             message: "role Added "
//         });
//     }
// });
/*
 A ping pong bot, whenever you send "ping", it replies "pong".
 */

var yearIDs = {
    test: "282302608524443658",
    please: "282308075438866433",
    alumni: "282361501715791872",
    first: "282361260417351680",
    second: "282361312804339722",
    third: "282361318546210817",
    fourth: "282361321775824896",
    fifth: "282361323545821184",
    sixth: "282361471898353664",
    seventh: "282361488424042498"
};

var programIDs = {
    sauder: "282382735882977290",
    science: "282382712642338817"
};

var currentUserID;
// import the discord.js module
const Discord = require('discord.js');

// create an instance of a Discord Client, and call it bot
const bot = new Discord.Client();

// the token of your bot - https://discordapp.com/developers/applications/me
const token = 'MjgyMDE0NDEyMTU4Nzk1Nzg2.C4kROQ.p6nFyT7rpc5QFEvz3c53ULFrMaw';




// the ready event is vital, it means that your bot will only start reacting to information
// from Discord _after_ ready is emitted.
bot.on('ready', () => {
    console.log('I am ready!');
});
// create an event listener for messages
bot.on('message', message => {
// filter for user response
    const filter = message => message.content.match(/^\d+$/);

if (message.content[0] === '!') {
    var parsedMessage = message.content.split(" ");
    switch (parsedMessage[0]) {
        case '!year': {
            // Check if user can set role
            message.reply("OK, let's give you a role! What year are you in? \n(Type 0 for Alumni or a number from 1 to 7 corresponding to your standing.)");
            //  var channel = bot.channels.get("282277372609429504");
            //  console.log(channel);
            bot.channels.get("282277372609429504").awaitMessages(filter, {max: 1, time: 30000, errors: ['time']})
                .then(collected => {
                assignYear(collected.first().toString(), message);
            message.reply("If you want your program/faculty added to your user, please user the !program command.")})
        .catch(collected => message.reply(`You didn't respond, did you end up going to SFU? \nIn any case, I'm returning to standby.`));
            break;
        }
        case '!program':{
            message.reply("Now that we know what year you're in, which faculty/program are you in?" +
                "\n You can choose from the following, simply type the correspond number: " +
                "\n 1) Arts \n 2) Architecture \n 3) Biopsychology \n 4) Computer Science \n 5) Engineering \n 6) Kinesiology \n 7) LFS \n 8) Music" +
                "\n 9) Pharmacy \n 10) Political Science \n 11) Sauder \n 12) Science \n 13) My faculty/program isn't listed");
            bot.channels.get("282277372609429504").awaitMessages(filter, {max: 1, time: 30000, errors: ['time']})
                .then(collected => assignProgram(collected.first().toString(), message))
        .catch(collected => message.reply(`You didn't respond, did you end up going to Langara? \nIn any case, I'm returning to standby.`));
            break;
        }
        case '!help':
            message.reply("Currently only the !year and !program commands are supported, bug Namtsua if you want another feature to be added.");
            break;
        default:
            message.reply("Sorry, I don't recognize that command. Please use !help to view all valid commands.")
    }
}});

function assignYear(year, message){
    switch(year){
        case '0':
            message.reply("What are you doing here? Just kidding, anyone UBC-related is welcome.");
            message.member.addRole(yearIDs['alumni']);
            break;
        case '1':
            message.reply("Welcome to UBC! I hpe you are enjoying your first year.");
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
}

function assignProgram(program, message){
    console.log('hi');
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

// log our bot in
bot.login(token);