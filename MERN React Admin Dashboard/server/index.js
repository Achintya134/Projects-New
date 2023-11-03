import express from "express";
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';

import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";


import Product from "./model/Products.js";
import ProductStat from "./model/ProductStat.js";
//data imports 
import User from "./model/User.js"


import Transaction from "./model/Transactions.js"
import AffiliateStat from "./model/AffiliateStat.js";
import {dataUser, dataProduct, dataProductStat,dataTransaction,dataOverallStat, dataAffiliateStat } from "./data/index.js";
import OverallStat from "./model/OverStat.js"
//Configuration
dotenv.config();
const app=express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cors());

/* ROUTES */

app.use("/client",clientRoutes);
app.use("/general",generalRoutes);
app.use("/management",managementRoutes);
app.use("/sales",salesRoutes);

//MONGOOSE SETUP
const PORT= process.env.PORT || 9000;
mongoose
    .connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    })
    .then(() => {
        app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
        //Only add data once
        //Transaction.insertMany(dataTransaction)

        //User.insertMany(dataUser)
        // Product.insertMany(dataProduct);
        //OverallStat.insertMany(dataOverallStat);
        //ProductStat.insertMany(dataProductStat)
        //AffiliateStat.insertMany(dataAffiliateStat)
    })
    .catch((error)=> console.log(`${error} did not connect`));
