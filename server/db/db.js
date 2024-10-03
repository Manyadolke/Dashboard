import mongoose from 'mongoose';


const connectToDatabase = async () => {
    try {
        if (!process.env.MONGODB_URL) {
            throw new Error("MONGODB_URL is not defined in the environment variables");
        }
        await mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connection successful');
    } catch (error) {
        console.log('Database connection error:', error);
    }
};


// add

export default connectToDatabase

// if(!DB){
//     console.log(`Mongo db url is not defined`);
// }

// mongoose.connect(DB)
// .then(()=>{
//     console.log("connection successful")

// })
// .catch((error) =>{
//     console.error("error connecting to Mongodb", error);
//     process.exit(1);
// })