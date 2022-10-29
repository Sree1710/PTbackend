const Mongoose = require("mongoose")
const Bodyparser = require("body-parser")
const Cors = require("cors")
const Express = require("express")


const { patientModel } = require("./patientModel")
const { patientModel2 } = require("./patientModel2")
const { bookModel } = require("./bookModel")

const app = Express()

app.use(Cors())
app.use(Bodyparser.urlencoded({ extended: true }))
app.use(Bodyparser.json())

Mongoose.connect("mongodb+srv://Sree1710:kunju@cluster0.ougkge9.mongodb.net/PatientDB?retryWrites=true&w=majority")

app.post("/dr", async(req, res) => {
    const data = req.body
    const ob = new patientModel(data)
    ob.save((error, data) => {
        if (error) {
            res.send("error occured")
        } else {
            res.send(data)
        }
    })
})

app.post("/dlogin", async(req, res) => {
    const request = req.body
    patientModel.findOne({ doctorUsername: request.doctorUsername }, (err, data) => {
        if (data) {
            if (data.doctorPassword == request.doctorPassword) {
                res.send({ "success": true, data: data });

            } else {
                res.send({ "success": "Invalid username or password!" });
            }
        } else {
            res.send({ "success": "No User Found!" });
        }
    })
})

app.post("/plogin", async(req,res) => {
    const request=req.body
    patientModel2.findOne({ patientUsername: request.patientUsername }, (err, dataa) => {
        if(dataa) {
            if(dataa.patientPassword == request.patientPassword) {
                res.send({ "success": true, dataa: dataa});
            } else{
                res.send({ "success":"Invalid username or password!" });
            }
        } else {
            res.send({ "success": "No User Found!" });
        }
    })
})

app.post("/pr", async(req, res) => {
    const data2 = req.body
    const ob = new patientModel2(data2)
    ob.save(
        (error, data2) => {
            if (error) {
                res.send("error occured")
            } else {
                res.send(data2)
            }
        })

})

app.post("/bp", async(req, res) => {
    const data4 = req.body
    const ob = new bookModel(data4)
    ob.save(
        (error, data4) => {
            if (error) {
                res.send("error occured")
            } else {
                res.send(data4)
            }
        })
})

app.get("/viewApp", async(req, res) => {
    bookModel.find((error, data3) => {
        if (error) {
            res.send(error)
        } else {
            res.send(data3)
        }
    })
})

app.get("/docDetail", async(req, res) => {
    patientModel.find((error, data) => {
        if (error) {
            res.send(error)
        } else {
            res.send(data)
        }
    })
})

app.get("/patDetail", async(req, res) => {
    patientModel2.find((error, data2) => {
        if (error) {
            res.send(error)
        } else {
            res.send(data2)
        }
    })
})

app.post("/docviewApp", async(req, res) => {
    console.log(req.body.data)
    console.log(req.body.data.doctorName)
    bookModel.find( {bookdoc:req.body.data.doctorName},
        (error, data3) =>{
        if (error) {
            res.send(error)
        } else {
            console.log(req.body.data.doctorName)
            res.send(data3)
        }
    })
})












app.listen(3200, () => { console.log("Server running at http://localhost:3200") })