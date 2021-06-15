const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("successfully connected to db")
}).catch((err)=>{
    console.log('err>>',err.message)
    console.log("Error connecting db")
});