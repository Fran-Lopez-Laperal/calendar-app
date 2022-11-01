const mongoose = require('mongoose');

const DB_CNN = process.env.DB_CNN || 'mongodb://localhost:27017/calendar_mern';

mongoose
  .connect(DB_CNN, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.info(`Successfully connected to the database ${DB_CNN}`))
  .catch((error) => {
    console.error(`An error ocurred trying to connect to de database ${DB_CNN}`, error);
    process.exit(0);
  });

process.on('SIGINT', function () {
  mongoose.connection.close(function () {
    console.log('Mongoose disconnected on app termination');
    process.exit(0);
  });
});

module.exports.connectionUrl = DB_CNN;
