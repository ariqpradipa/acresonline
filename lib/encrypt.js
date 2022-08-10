const sha512 = require("js-sha512").sha512;

const rand = () => {

    return Math.random().toString(36).substring(2);

}

export const token = (data) => {

    return sha512(rand() + sha512(rand() + data) + rand()) + sha512(rand() + sha512(rand() + data) + rand()) + sha512(Date.now().toString());

}