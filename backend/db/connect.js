import { set, connect } from 'mongoose';

// Set strictQuery option globally
set('strictQuery', true);

const connectDB = (url) => {
    return connect(url);
};

export default connectDB;
