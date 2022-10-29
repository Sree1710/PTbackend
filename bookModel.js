const Mongoose=require("mongoose")
const bookModel=Mongoose.model("books",Mongoose.Schema({
    bookname:String,
    bookage:String,
    bookdate:String,
    bookdoc:String
}))
module.exports={bookModel}