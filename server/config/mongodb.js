import mongoose from "mongoose";

const connectDB = async()=>{

   // this is an event in mongoose which wheneve we will be connected will execute the function
   mongoose.connection.on('connected', ()=>
      console.log("Database connected")
   );
   await mongoose.connect(`${process.env.MONGODB_URI}/mern-auth`);
}

export default connectDB;