const mongoose = require("mongoose");

const photoSchema = mongoose.Schema({
    name: {
        type: String,
    },
    base64:{
        type: String
    }
},{
    timestamps:true,
});
module.exports = mongoose.model("photo",photoSchema)