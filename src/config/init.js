import mongoose from 'mongoose';
import config from './config';

// Bootstrap db connection
const db = mongoose.connect(config.db, { useMongoClient: true });

export default db;
