if (process.env.NODE_ENV != "production") {
    require("dotenv").config();
  }
  const mongoose = require("mongoose");
  const initData = require("./data.js");
  const Listing = require("../models/listing.js");
  
  // const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
  const DB_URL = process.env.ATLASDB_URL
  main()
    .then(() => {
      console.log("connected to DB");
    })
    .catch((err) => console.log(err));
  
  async function main() {
    //   await mongoose.connect(MONGO_URL);
    await mongoose.connect("mongodb+srv://siddharthbobade9195:4AoyKoboo8BKsigz@cluster0.5tpgzxt.mongodb.net/?retryWrites=true&w=majority");
  }
  
  const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({
      ...obj,
      owner: "65842bc961b65a4c022801b0",
    }));
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
  };
  initDB();
  