const moongoseDb = require("mongoose");

// const connectMongoDatabase = () => {
//   moongoseDb.connect(process.env.MOONGOSEDB_URL).then((con) => {
//     console.log(
//       `Mongo db connected successfully to host: ${con.connection.host}`
//     );
//   });
// };

const connectMongoDatabase = () => {
  moongoseDb
    .connect(process.env.MOONGOSEDB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((con) => {
      console.log(
        `Mongo db connected successfully to host: ${con.connection.host}`
      );
    });
  // .catch((err) => {
  //   console.log(err);
  // }); // this is commented to handle this uncaughtrejection exception globally in server.js
};

module.exports = connectMongoDatabase;
