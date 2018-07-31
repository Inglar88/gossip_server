const mongoose = require('mongoose');

export default function (settings,resolve,reject) {
  const {url,host,port,db_name} = settings.db;

  mongoose.connection.on('error', (err) => {
    console.error(`MongoDB connection error: ${err}`);
    reject(err);
  });
  mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection open to ' + `${host}:${port} port`);
    resolve();
  });
  mongoose.connection.on('disconnected', function (err) {
    console.log('Mongoose default connection disconnected');
    reject(new Error('Mongoose default connection disconnected'));
  });
// If the Node process ends, close the Mongoose connection
  process.on('SIGINT', function() {
    mongoose.connection.close(function () {
      console.log('Mongoose default connection disconnected through app termination');
      reject(new Error('Mongoose default connection disconnected through app termination'));
      process.exit(0);
    });
})
  mongoose.connect(`${url}${host}:${port}/${db_name}`);
  return mongoose
}
