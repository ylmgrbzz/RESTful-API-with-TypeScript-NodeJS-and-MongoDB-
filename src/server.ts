import express from "express";
import http from "http";
import mongoose from "mongoose";
import { config } from "./config/config";
import Logging from "./library/Logging";

const router = express();
mongoose
  .connect(config.mongo.url, { retryWrites: true, w: "majority" })
  .then(() => {
    // console.log("Mongo connected successfully.");
    Logging.info("Mongo connected successfully.");
    // StartServer();
  })
  .catch((error) => {
    Logging.error(error);
    Logging.error("Mongo connection failed.");
    // console.log(error)
  });
