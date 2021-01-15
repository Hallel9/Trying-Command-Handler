const Discord = require("discord.js"),
	client = new Discord.Client({ ws: { properties: { $browser: "Discord Android" } } }),
	fs = require("fs");
//Command Handler
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.events = new Discord.Collection();
const keepalive = require('./server.js');

fs.readdir("./commands/", (err, files) => {
	if (err) return console.log(err);
	files.forEach(file => {
		if (!file.endsWith(".js")) return;
		let props = require(`./commands/${file}`);
		console.log("Successfully loaded " + file)
		let commandName = file.split(".")[0];
		client.commands.set(commandName, props);
	});
});
//Create events
for (const file of fs.readdirSync('./events/')) {
    if (!file.endsWith(".js")) return;
    var fileName = file.substring(0, file.length - 3);
    var fileContents = require(`./events/${file}`);
    client.on(fileName, fileContents.bind(null, client));
    delete require.cache[require.resolve(`./events/${file}`)];
}

client.on("ready", () => console.log("Online!"));
keepalive();
client.login(process.env.TOKEN)