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
    StartServer();
  })
  .catch((error) => {
    Logging.error(error);
    Logging.error("Mongo connection failed.");
    // console.log(error)
  });

const StartServer = () => {
  router.use((req, res, next) => {
    Logging.info(
      `Incomming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`
    );

    res.on("finish", () => {
      /** Log the res */
      Logging.info(
        `Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`
      );
    });
  });

  router.use(express.urlencoded({ extended: true }));
  router.use(express.json());

  router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    next();
  });

  router.get('/ping', (req, res,next) => {
    res.status(200).json({
        message: 'Pong'
    });
  });

  router.use((req, res, next) => {
    const error = new Error("Not found");
Logging.error(error);
return res.status(404).json({ error: error.message });
  });
};
