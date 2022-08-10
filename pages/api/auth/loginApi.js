import db from '../../../middleware/database'
import { token } from '../../../lib/encrypt'

const sha512 = require("js-sha512").sha512;

const scrambleCatalyst = 'TheAcresOnlineWorld';

export default function loginApi(req, res) {
    return new Promise((resolve, reject) => {

        const userRaw = req.body.username;
        const passRaw = req.body.password;

        const username = sha512(scrambleCatalyst + userRaw.toLowerCase() + scrambleCatalyst) + sha512(userRaw.toLowerCase() + scrambleCatalyst);

        db
            .collection("accounts")
            .find({ username })
            .toArray(function (err, result) {
                if (err) {

                    res.status(400).end("Error fetching listings!");
                    resolve();
                } else {

                    if (result.length === 0 || result === null) {

                        res.end('4401');
                        resolve();

                    } else {
                        const password = sha512(scrambleCatalyst + passRaw + scrambleCatalyst) + sha512(passRaw + scrambleCatalyst);

                        if (password === result[0].password) {

                            const scramble = sha512(password + username + password);
                            const useToken = token(scramble);
                            db
                                .collection("accounts")
                                .updateOne({ username }, { $set: { "currToken": useToken } }, function (err, result) {
                                    if (err) {

                                        console.log(err);
                                        resolve();

                                    } else {

                                        res.end(useToken);
                                        resolve();

                                    }
                                });
                        }
                    }
                }
            });

    });
};
