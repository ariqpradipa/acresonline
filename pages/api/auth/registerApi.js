import db from '../../../middleware/database'

const sha512 = require("js-sha512").sha512;

const scrambleCatalyst = 'TheAcresOnlineWorld';

export default function loginApi(req, res) {
    return new Promise((resolve, reject) => {

        const userRaw = req.body.username;
        const emailRaw = req.body.email;
        const passRaw = req.body.password;

        const username = sha512(scrambleCatalyst + userRaw.toLowerCase() + scrambleCatalyst) + sha512(userRaw.toLowerCase() + scrambleCatalyst);
        const password = sha512(scrambleCatalyst + passRaw + scrambleCatalyst) + sha512(passRaw + scrambleCatalyst);
        const email = sha512(scrambleCatalyst + emailRaw.toLowerCase() + scrambleCatalyst);

        const accountData = {
            username: username,
            email: email,
            password: password,
            createdAt: new Date(),
        };

        db
            .collection("accounts")
            .find({ username })
            .toArray(function (err, result) {
                if (err) {

                    res.status(400).end("Error fetching listings!");
                    resolve();

                } else {
                    if (result.length === 0 || result === null) {

                        db
                            .collection("accounts")
                            .insertOne(accountData, function (err, result) {
                                if (err) {

                                    res.status(400).end("Error creating account!");
                                    resolve();

                                } else {
                                    console.log("account created with id: " + result.insertedId);
                                    res.end("3301");
                                    resolve();
                                }
                            });

                    } else {
                        res.end("4402");
                        resolve();
                    }
                }
            });

    });
};
