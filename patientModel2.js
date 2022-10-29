const Mongoose=require("mongoose")
const patientModel2=Mongoose.model("patient2s",Mongoose.Schema({
    patientName:String,
    patientAge:String,
    patientPhonenumber:String,
    patientHistory:String,
    patientUsername:String,
    patientPassword:String
}))

module.exports={patientModel2}