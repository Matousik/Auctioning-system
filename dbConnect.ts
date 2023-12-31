import mongoose from 'mongoose';

interface Connection {
  isConnected: number | undefined;
}

const connection: Connection = {
  isConnected: undefined,
};

async function dbConnect() {
  if (connection.isConnected) {
    return;
  }

  const db = await mongoose.connect(process.env.MONGO_URI as string);

  connection.isConnected = db.connections[0].readyState;
}

export default dbConnect;
