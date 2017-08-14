const Discord = require("discord.js");
const YTDL = require("ytdl-core");
const TOKEN = "tokenhere" //replace tokenhere with your bots token
const PREFIX = "+";
var bot = new Discord.Client();
var servers = {};
var fortunes = [
    "Yes",
    "No",
    "Maybe"
];
function generateHex(connection, message) {
    var server = servers[message.guild.id];

}

    return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

function play() {
    var server = servers[message.guild.id];
    server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly"}));
    server.queue.shift();
    server.dispatcher.on("end",function() {
        if (server.queue[0]) play(connection, message);
        else connection.disconnect();
  });

bot.on("ready", function(){
  console.log("---------------");
  console.log("Bot is online!");
  console.log("---------------");
});

bot.on("guildMemberAdd",function(member) {
    member.guild.channels.find("name","general").sendMessage(member.toString() + " Welcome to the server!");
    member.addRole(member.guild.roles.find("name","Member"));
  //  member.guild.createRole({
      //name: member.user.name,
      //color: generateHex(),
      //permissions: []
  //}).then(function(role) {
      //member.addRole(role);
  //});


});

bot.on("message", function(message) {
    if (message.author.equals(bot.user)) return;

    if (!message.content.startsWith(PREFIX)) return;

    var args = message.content.substring(PREFIX.length).split(" ");

    switch (args[0].toLowerCase()) {
        case "ping":
            message.channel.sendMessage("Pong!");
            break;

        case "help":
            message.channel.sendMessage("Sorry, but there is currently not a help command at this moment");
            break;

        case "8ball": //8ball command
            if (args[1]) message.channel.sendMessage(fortunes[Math.floor(Math.random() * fortunes.length)]);
            else message.channel.sendMessage("Sorry, I cannot read that");
            break;

        //case "removerole":
            //message.member.removeRole(member.member.guild.roles.find("name","Member"));
            //break;
        //case "deleterole":
            //message.member.removeRole(member.member.guild.roles.find("name","Member"));
            //break;


        case "info":
            var embed = new Discord.RichEmbed()
                .addField("About This Bot!","I am a Discord Bot coded in node.js! My Owner and Developer is <@211098424655740929>") //for inline .addField("Test embed Title","Test description",true) x2 in one line
                .setColor(0x00FFFF)
                .setFooter("Peanut has no friends lol")
                .setThumbnail(message.author.avatarURL)

            message.channel.sendEmbed(embed);
            break;

        case "myavatar":
            var embed = new Discord.RichEmbed()
                .addField("Here is your avatar!")
                .setColor(0x00FFFF)
                .setThumbnail(message.author.avatarURL)

            message.channel.sendEmbed(embed);
            break;

        //MUSIOC

        case "play":
            if (!args[1]) {
                message.channel.sendMessage("Please provide a YouTube link for me to play");
                return;

            }

            if (!message.member.voiceChannel) {
                message.channel.sendMessage("You must be in a voice channel");

            }

            if (!servers[message.guild.id]) servers[message.guild.id] = {
                queue: []

            };

            var server = servers[message.guild.id];
            if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
                play(connection, message);
            });

            break;
        case "skip":
            var server = servers [message.guild.id];
            break;
        default:
            message.channel.sendMessage("Sorry, that is an invalid command!");


    }
});

bot.login(TOKEN);
