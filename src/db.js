import mongoose from "mongoose";

const URL = process.env.DB_URL

const connect = () => {
    mongoose.connect(URL)
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((error) => {
      console.error('Error connecting to MongoDB:', error);
    });
};

export default connect;