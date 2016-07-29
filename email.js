var nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
// change {gmail address} and {password} to a gmail address
// you also have to allow access to low security applications
// see: https://nodemailer.com/using-gmail/
var transporter = nodemailer.createTransport('smtps://{gmail address}:{password}@smtp.gmail.com');

module.exports = {
    alertTrainers: function (trainers, pokemon) {
        // setup e-mail data with unicode symbols
        var trainersString = trainers.join(', ');
        console.log(trainersString);

        var title = "[POKEMON ALERT] ";
        var body = "There are rare pokemon around!\n";

        pokemon.forEach(function(spawn) {
            title += spawn.name + " ";
            body += spawn.name + '\n' +
                    "disappears in: " + spawn.despawns_in + "s\n" +
                    "distance: " + spawn.distance_str + '\n' +
                    "map: " + spawn.map + '\n';
        });

        console.log(title);
        console.log(body);

        var mailOptions = {
            from: '"The Pokemon Oracle" <phuuuy@gmail.com>',
            to: trainersString,
            subject: title,
            text: body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                return console.log(error);
            }
            console.log('Message sent: ' + info.response);
        });
    }
};
