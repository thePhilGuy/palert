var pokegoScan = require('pokego-scan');
var email = require('./email.js');

var coords = {
    // set your gps coordinates here
    latitude: 37.884327,
    longitude: -122.302053
};

var trainers = [
    // you can use this server to email your friends
    "example@email.com",
    "example2@email.com",
];

var highPriority = [
    "Lickitung",
    "Charizard",
    "Venusaur",
    "Blastoise",
    "Dragonite",
    "Gyarados",
    "Alakazam",
    "Nidoking",
    "Nidoqueen",
    "Gengar",
    "Ninetails",
    "Machamp",
    "Golem",
    "Rapidash",
    "Dewgong",
    "Rhydon",
    "Chansey",
    "Omastar",
    "Kabutops",
    "Snorlax",
    "Arcanine",
    "Lapras",
    "Porygon",
    "Aerodactyl",
    "Kadabra" ];

var lowPriority = [
    "Growlithe",
    "Ponyta",
    "Gastly",
    "Eevee",
    "Dratini",
    "Dragonair",
    "Squirtle",
    "Wartortle",
    "Charmander",
    "Charmeleon",
    "Bulbasaur",
    "Ivysaur",
    "Haunter",
    "Rhyhorn"];

var spawnSet = new Set();

var pokepoll = function() {
    console.log("\n*** Polling for high priority pokemon...");
    console.log("Set size: " + spawnSet.size);
    pokegoScan(coords, {filter: highPriority, distance: 800}, function(err, pokemon) {
        if (err) {
            console.log(err);
            return;
        }
        var newPokemon = [];

        // log found pokemon
        pokemon.forEach(function(spawn) {
            console.log(spawn.name);
            console.log(spawn.id);
            console.log("disappears in: " + spawn.despawns_in + "s");
            console.log("distance: " + spawn.distance_str);
            console.log('===');
            if (!spawnSet.has(spawn.id)) {
                newPokemon.push(spawn);
                spawnSet.add(spawn.id);
                setTimeout(function(){spawnSet.delete(spawn.id)}, spawn.despawns_in * 1000);
            }
        });

        // alert us about found pokemon
        if (newPokemon.length > 0) {
            email.alertTrainers(trainers, pokemon);
        }
    });
};

var lowpokepoll = function () {
    console.log("\n*** Polling for low priority pokemon...");
    console.log("Set size: " + spawnSet.size);
    pokegoScan(coords, {filter: lowPriority, distance: 500}, function(err, pokemon) {
        if (err) {
            console.log(err);
            return;
        }
        var newPokemon = [];

        // log found pokemon
        pokemon.forEach(function(spawn) {
            console.log(spawn.name);
            console.log(spawn.id);
            console.log("disappears in: " + spawn.despawns_in + "s");
            console.log("distance: " + spawn.distance_str);
            console.log('===');
            if (!spawnSet.has(spawn.id)) {
                newPokemon.push(spawn);
                spawnSet.add(spawn.id);
                setTimeout(function(){spawnSet.delete(spawn.id)}, spawn.despawns_in * 1000);
            }
        });

        // alert us about found pokemon
        if (newPokemon.length > 0 && pokemon.length > 2) {
            email.alertTrainers(trainers, pokemon);
        }
    });
}

pokepoll();
setInterval(pokepoll, 30 * 1000);
setInterval(lowpokepoll, 45 * 1000);
