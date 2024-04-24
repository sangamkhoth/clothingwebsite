//Amisha123 atlas
const mongoose=require('mongoose');
mongoose.connect("mongodb+srv://amisha1:vG1xN3Lq0SEhAmHc@cluster0.5b8ttzk.mongodb.net/",{
    dbName: "clo",
})
.then(()=>{
    console.log("connection successful");
})
.catch((err)=>{
    console.log(`No connection ${err}`);
})

const logInSchema = new mongoose.Schema({
    
    email: { type: String, required: true, unique: true },
    pass: { type: String, required: true },
    cpass: { type: String, required: true },
  });
const LogInCollection=new mongoose.model('UserData',logInSchema);
module.exports=LogInCollection;