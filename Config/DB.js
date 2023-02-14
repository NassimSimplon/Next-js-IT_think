//Connect With The DATA_BASE
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
const db_connection = () => {
  mongoose
    .connect(
       "mongodb+srv://nassim:nassim@cluster0.q37nw.mongodb.net/e_commerce",{
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
    .then(() => {
      console.log("Data_base Connected");
    })
    .catch(() => {
     console.log("Cannot Connect to Data_base.")
        });
    };

module.exports = db_connection;