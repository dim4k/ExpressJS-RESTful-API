const mongoose = require( 'mongoose' );

const apidocSchema = new mongoose.Schema({
    uri: {
        type: String,
        required: true
    },
    method: {
        type: String,
        required: true
    },
    detail: {
        shortDescription: String,
        description: String
    }
});

apidocSchema.index({uri:1,method:1},{unique:true});

apidocSchema.methods.setDetail = function (shortDesc, Desc){
    this.detail.shortDescription = shortDesc;
    this.detail.description = Desc;
};

mongoose.model('Apidoc', apidocSchema);