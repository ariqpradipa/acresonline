import db from '../../middleware/database'

const sha512 = require("js-sha512").sha512;

const scrambleCatalyst = 'TheAcresOnlineWorld';

export default function loginApi(req, res) {
    return new Promise((resolve, reject) => {

        const userRaw = req.body.username;
        const useToken = req.body.token;

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

                        res.end('4404');
                        resolve();

                    } else {
                        if (result[0].currToken === useToken) {

                            res.end("3302");
                            resolve();

                        } else {

                            res.end("4403");
                            resolve();

                        }
                    }
                }
            });

    });
};
