import mongoose from 'mongoose';

const Dburl = async () => {
  try {
    const conn = await mongoose.connect(process.env.URL_Mongoo, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, 
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); 
  }
};

export default Dburl;