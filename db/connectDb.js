import mongoose from "mongoose";

const DbSetup = (url) => {
  return mongoose.connect(url).then(() => console.log("connected to database"));
};

export default DbSetup;
