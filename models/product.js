const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
    name :{
        type: String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    richDescription : {
        type : String,
        default : ''
    },
    image : {
        type : String,
        required : true,
        default : ''
    },
    images : [{
        type : String
    }],
    brand : {
        type : String,
    },
    price : {
        type : Number,
        defaul : 0
    },
    category : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Category',
        required : true 
    },
    countInStock : {
        type : Number,
        max : 255,
        min : 0,
        required : true
    },
    rating : {
        type : Number
    },
    isFeatured : {
        type : Boolean,
        default: false
    },
    dateCreated : {
        type: Date,
        default : Date.now()
    }

})

productSchema.virtual('id').get(function () {
    return this._id.toHexString();
})

productSchema.set('toJSON' , {
    virtuals : true
})


exports.Product = mongoose.model('Product', productSchema);
