
// import the discord.js module

var config = require('./config');
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

var yearUserBase = {
    test: 0
};

var programUserBase = {
    test: 0
};

var banNamUserBase = {
    test: 0
};

// the ready event is vital, it means that your bot will only start reacting to information
// from Discord _after_ ready is emitted.
bot.on('ready', () => {
    console.log('I am ready!');
});

// Greet new users to the Discord server
bot.on('guildMemberAdd',(user) => {
    bot.channels.get(config.GENERAL).sendMessage("\\ <:ce_ono:" + config.ONOWELCOMEEMOTE + "> / Welcome to UBC <@" + user.id + "> ! \\ <:ce_ono:" + config.ONOWELCOMEEMOTE + "> /");
});

// Let everyone know who left
bot.on('guildMemberRemove', (user) => {
    if (user.id === config.NAMTSUA) {
    bot.channels.get(config.GENERAL).sendMessage("Goodnight sweet prince ");

}
    bot.channels.get(config.GENERAL).sendMessage("Have fun at SFU <@" + user.id + "> <:ce_ono:" + config.ONOYEDEMOTE + "> <:ce_ono:" + config.ONOYEDEMOTE + "> <:ce_ono:" + config.ONOYEDEMOTE + "> ");
});
// create an event listener for messages
bot.on('message', message => {
// filter for user response
    const filter = message => message.content.match(/^\d+$/);
if (message.content[0] === '!' && (message.author.id === config.NAMTSUA || message.channel.id === config.BOTCOMMANDSCHANNEL || message.channel.id === config.GENERAL)) {
     if (message.author.id === config.BAUSMANGO){
        message.reply("Congrats! You have been successfully transferred to Sprott Shaw Community College.");
         return;
     } else if (message.author.id === config.BURROWL){
         message.reply("Talk to me when your taste in music improves.");
         return;
     }
    var parsedMessage = message.content.split(" ");
    switch (parsedMessage[0]) {
        case '!year': {
            // Check if user can set role
            message.reply("OK, let's give you a role! What year are you in? \n(Type 0 for Alumni or a number from 1 to 7 corresponding to your standing.)");
            bot.channels.get(config.BOTCOMMANDSCHANNEL).awaitMessages(filter, {max: 1, time: 60000, errors: ['time']})
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
            bot.channels.get(config.BOTCOMMANDSCHANNEL).awaitMessages(filter, {max: 1, time: 60000, errors: ['time']})
                .then(collected => assignProgram(collected.first().toString(), message))
        .catch(collected => message.reply(`You didn't respond, did you end up going to Langara? \nIn any case, I'm returning to standby.`));
            break;
        }
        case '!help':
            message.reply("Currently only the !year, !program, !ams and !youtube commands are supported, bug Namtsua if you want another feature to be added.");
            break;
        case '!ams':
            message.reply("http://streamable.com/gbqjv");
            break;
        case "!youtube":
            message.reply("Check out my Youtube channel! https://www.youtube.com/channel/UC8KGT0uZ19f6XJPUwxlvzPQ");
            break;
        default:
            message.reply("Sorry, I don't recognize that command. Please use !help to view all valid commands.")
    }
} else {
    var random = Math.random();
    if (message.author.id == config.VYSO) {
        if (random <= 0.05) {
            message.reply("Hey /u/childishgambetti! How goes the quest for the perfect areolas?");
            return;
        }
    }

    if (message.author.id == config.MADIMON && message.content.toLowerCase().indexOf("nanaimo") >= 0) {
        message.reply("The picture speaks for itself. https://cdn-webimages.wimages.net/0513079ffdb4c44563243e325100af2a57ac95-wm.jpg?v=3");
    }
    //
    // if (message.author.id == config.TRYHARDCHIMP && message.content.toLowerCase().indexOf("helen") >= 0) {
    //     if (random <= 0.69) {
    //         message.reply("How does it feel knowing that I'm a product of Computer Science, unlike Helen?");
    //     }
    // }

    if (message.author.id == config.SNOWPENGUIN ) {
        if ((config.WEEBREGEX.test(message.content) && message.channel.id === config.GENERAL) || message.content.toLowerCase().indexOf("hiss") >= 0 || message.content.toLowerCase().indexOf("sauder") >= 0) {
            if (random <= 0.8) {
                message.reply("Hiss hiss! It's the snake queen of the weebs! Don't involve me with any of your startups or I'll reject your LinkedIn request <:ce_ono:" + config.ONOYEDEMOTE + ">");
                return;
            }
        }
    }

    if (message.author.id == config.BURROWL) {
        if (message.content.toLowerCase().indexOf("i want to di") >= 0) {
            message.reply("Good. The school raised its ranking the moment you graduated! " + config.ONOYEDEMOTE + ">")
        }
    }

    if (config.WEEBREGEX.test(message.content) && message.channel.id === config.GENERAL)
    {
        if (random <= 0.40) {
            message.reply("It smells like weebs in here! Please visit <#" + config.WEEBCHANNEL + "> for all future impulses.");
            return;
        }
    }

    if (message.author.id == config.NAMTSUA) {
        if (random <= 0.02) {
            message.reply("Please get me out of this Discord. The degenerates are running rampant and I think one of them gave me mOno.");
        }
    }

    if (message.content.toLowerCase().indexOf("weeb") >= 0){
        console.log(message.content);
       if (message.content.toLowerCase().indexOf("nam") >= 0 || message.content.toLowerCase().indexOf("namtsua") >= 0) {
           message.reply(" <@" + config.NAMTSUA + "> is not a weeb!");
       }
    }
    // if (message.content.toLowerCase().indexOf("ban nam") >= 0) {
    //     if (!banNamUserBase.hasOwnProperty(message.author.id)) {
    //       banNamUserBase[message.author.id] = 0;
    //     } else {
    //         banNamUserBase[message.author.id] += 1;
    //     }
    //
    //     console.log(banNamUserBase[message.author.id]);
    //     message.reply("Keep it up, nerd! <:ce_ono:" + config.ONOYEDEMOTE + ">  You have " + (21 - banNamUserBase[message.author.id]) + " chances remaining until I kick your all the way up Burnaby Mountain to SFU. Apologize to Namtsua or face the consequences!");
    // }
}
});

function assignYear(year, message){
   // if (checkYearLimit(message.author.id, message))
     //   return;
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
        case '8':
            message.reply("OK");
            message.member.addRole('282308075438866433');
            break;
        default:
            message.reply("Sorry, please input a value from 0 to 7");
            break;
    }
    message.reply("If you want your program/faculty added to your user, please user the !program command.")
}

function assignProgram(program, message){
  //  if (checkProgramLimit(message.author.id, message))
   //     return;
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
            message.reply("Clearly your faculty/program isn't good enough. Kidding aside, I'll let <@" + config.NAMTSUA + "> know and it'll eventually get added.");
            break;
        default:
            message.reply("Sorry, please input a value from 1 to 13.");
    }
}

function checkYearLimit(userID, message){
    var currentDate = Date.now();
    console.log(yearUserBase[userID]);
    if (yearUserBase.hasOwnProperty(userID) && (currentDate - yearUserBase[userID]  <= 600000)){
        var timeLeft = Math.floor((600000 - (currentDate - yearUserBase[userID]))/60000);
        message.reply("Sorry, you've hit your limit. Hope you're Santasfied! \n Please try again in " + timeLeft + " minutes.");
        yearUserBase[userID] = timeLeft;
        return true;
    }else
        yearUserBase[userID] = currentDate;
    return false;
}


function checkProgramLimit(userID, message){
    var currentDate = Date.now();
    if (programUserBase.hasOwnProperty(userID) && (currentDate - programUserBase[userID]  <= 600000)){
        var timeLeft = Math.floor((600000 - (currentDate - yearUserBase[userID]))/60000);
        message.reply("Sorry, you've hit your limit. Hope you're Santasfied! \n Please try again in " + timeLeft + " minutes.");
        programUserBase[userID] = timeLeft;
        return true;
    }else
        programUserBase[userID] = currentDate;
    return false;
}
// log our bot in
bot.login(token);