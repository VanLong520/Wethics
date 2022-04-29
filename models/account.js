const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const AccountSchema = new Schema({
    email: String,
    password: String
}, {
    collection: "Users"
});

const AccountModel = mongoose.model("Users", AccountSchema)
module.exports = AccountModel