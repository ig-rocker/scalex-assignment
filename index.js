import express from "express";
import csv from  'csv-parser';
import fs from 'fs';
import bodyParser from "body-parser";
import Route from "./router/Route.js";

const app = express();

const PORT =3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Define route to read CSV file
app.get('/read-csv', (req, res) => {
    const results = [];

    fs.createReadStream('./csv-files/adminUser.csv')
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            res.json(results);
        });
});
app.use("/", Route);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
