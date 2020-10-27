import mongoose from 'mongoose';

const uri = "mongodb://localhost:27017/parcelexp";

const options = {};

const connectToDb = () => {
    mongoose.connect(uri, options,(err) => {
        if(err) {
            console.error(err);
        }
        else {
            console.log("database connection established");
        }
    })
}

export default connectToDb;