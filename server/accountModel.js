const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

accountSchema.statics.deleteById= function(id, cb){

    return this.deleteOne({_id: id}, cb);

};

const Data = mongoose.model("accounts", accountSchema);

module.exports = Data;
