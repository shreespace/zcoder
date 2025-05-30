const mongoose=require('mongoose')
const connect = async ()=>{
    try {
        console.log('Connecting to database')
        await mongoose.connect("mongodb+srv://testing_node:test1234@cluster0.jriry7x.mongodb.net/Zcoder?retryWrites=true&w=majority&appName=Cluster0"
        ).then(()=>{
            console.log('Database connected');
        }).catch((err)=>{
            console.log('Database connection error');
            console.log(err);
        });
    } catch (error) {
        console.log(error);
    }
}
module.exports = connect;