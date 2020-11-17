import mongoose from 'mongoose';

export const uri = "mongodb://localhost:27017/parcelexp";

const options = {};

export const connectToDb = () => {
    mongoose.connect(uri, options,(err) => {
        if(err) {
            console.error(err);
        }
        else {
            console.log("database connection established");
        }
    })
}
