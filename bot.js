/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
          ______     ______     ______   __  __     __     ______
          /\  == \   /\  __ \   /\__  _\ /\ \/ /    /\ \   /\__  _\
          \ \  __<   \ \ \/\ \  \/_/\ \/ \ \  _"-.  \ \ \  \/_/\ \/
          \ \_____\  \ \_____\    \ \_\  \ \_\ \_\  \ \_\    \ \_\
           \/_____/   \/_____/     \/_/   \/_/\/_/   \/_/     \/_/


This is a sample Slack bot built with Botkit.

This bot demonstrates many of the core features of Botkit:

* Connect to Slack using the real time API
* Receive messages based on "spoken" patterns
* Reply to messages
* Use the conversation system to ask questions
* Use the built in storage system to store and retrieve information
  for a user.

# RUN THE BOT:

  Get a Bot token from Slack:

    -> http://my.slack.com/services/new/bot

  Run your bot from the command line:

    token=<MY TOKEN> node bot.js

# USE THE BOT:

  Find your bot inside Slack to send it a direct message.

  Say: "Hello"

  The bot will reply "Hello!"

  Say: "who are you?"

  The bot will tell you its name, where it running, and for how long.

  Say: "Call me <nickname>"

  Tell the bot your nickname. Now you are friends.

  Say: "who am I?"

  The bot will tell you your nickname, if it knows one for you.

  Say: "shutdown"

  The bot will ask if you are sure, and then shut itself down.

  Make sure to invite your bot into other channels using /invite @<my bot>!

# EXTEND THE BOT:

  Botkit is has many features for building cool and useful bots!

  Read all about it here:

    -> http://howdy.ai/botkit

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/


// if (!process.env.token) {
//     console.log('Error: Specify token in environment');
//     process.exit(1);
// }


var Botkit = require('./lib/Botkit.js');
var os = require('os');

var controller = Botkit.slackbot({
    debug: true,
});

controller.config.port = process.env.PORT;

var bot = controller.spawn({
  token: process.env.SLACK_TOKEN,
  port: process.env.PORT //heroku assings port randomly we will get it using env variable
  
}).startRTM();


controller.hears(['hello','hi'],'direct_message,direct_mention,mention',function(bot, message) {

    bot.api.reactions.add({
        timestamp: message.ts,
        channel: message.channel,
        name: 'robot_face',
    },function(err, res) {
        if (err) {
            bot.botkit.log('Failed to add emoji reaction :(',err);
        }
    });


    controller.storage.users.get(message.user,function(err, user) {
        if (user && user.name) {
            bot.reply(message,'Hello ' + user.name + '!!');
        } else {
            bot.reply(message,'Hello.');
        }
    });
});


//main logic
var urx = require('./lib/urx');

function airBnbReact(bot, message, keywords) {
   urx.setApiKey("XuxoT370mZZQq86+dVrV7WuLk16nR0x6hC8dLvcew079lcCPXLQBnpsHQ9nhrv6NiVJLYAC+VHwsxRXNA8v/QQ==|GMi0uG4zDp0kGy3d7YfpS4N8CtOkO3lp");
    
    urx.search(keywords, function(response) {
      var searchResult = response.results[0];
      //var image_url =  searchResult.imageUrl,
      var text = searchResult.entityData.url + "\n" + searchResult.descriptionText
      bot.reply(message, text);
            
   }, function(req, errorMessage) {
          // SEARCH FAILURE HANDLER
          console.log(errorMessage);
          // res.json({text: "oops, could not find it"});
   });
}

controller.hears(['(.*)'],'direct_message,direct_mention,mention',function(bot, message) {
  var keywords = message.match[0] + " domain:airbnb.com";

  airBnbReact(bot, message, keywords)
});


controller.hears(['uptime','identify yourself','who are you','what is your name'],'direct_message,direct_mention,mention',function(bot, message) {

    var hostname = os.hostname();
    var uptime = formatUptime(process.uptime());

    bot.reply(message,':robot_face: I am a bot named <@' + bot.identity.name + '>. I have been running for ' + uptime + ' on ' + hostname + '.');

});

function formatUptime(uptime) {
    var unit = 'second';
    if (uptime > 60) {
        uptime = uptime / 60;
        unit = 'minute';
    }
    if (uptime > 60) {
        uptime = uptime / 60;
        unit = 'hour';
    }
    if (uptime != 1) {
        unit = unit + 's';
    }

    uptime = uptime + ' ' + unit;
    return uptime;
}

var http = require('http'); // To keep Heroku's free dyno awake 
http.createServer(function(request, response) {     
  response.writeHead(200, {'Content-Type': 'text/plain'});     
  response.end('Ok, dyno is awake.'); 
}).listen(process.env.PORT || 5000);
