const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csv = require('csv-parser');
const fs = require('fs');

//define input and output file locations
const inputFilePath = "../assets/csv/Ookla/download_Q1_fixed.csv";
const outputFilePath = "./download_Q1_fixed.csv";


// set the headers you want for the output file..
const csvWriter = createCsvWriter({
    path: outputFilePath,
    header: [
        { id: 'x', title: 'x' },
        { id: 'y', title: 'y' },
        { id: 'mbps', title: 'mbps' },
    ]
});

let i = 0;
const output = []; //our output array that we will use to write to csv
fs.createReadStream(inputFilePath)
    //.pipe(csv({ separator: ';' })) // for ; separated values use this line
    .pipe(csv()) // for , separated values use this line
    .on('data', (row) => {

        // output row header : input row value
        output.push({
            "x": parseFloat(parseFloat(row.X).toFixed(3)), 
            "y": parseFloat(parseFloat(row.Y).toFixed(3)),
            "mbps": Math.trunc(row.avg_d_kbps/1000),
        })

        // using geostat grid ids
        //OBJECTID;ID;Cnt_ID;Ave_Total_Trav
        //example ID CRS3035RES1000mN1000000E1967000
        //get x and y from grid ID using slice()
        // output.push({
        //     "x": parseInt(row.GRD_ID.slice(24, 31))/1000, //Easting
        //     "y": parseInt(row.GRD_ID.slice(16, 23))/1000, //Northing
        //     "total": Math.floor(parseInt(row.total) || '0'),
        //     "p_res": Math.floor(parseInt(row.p_res) || '0'),
        //     "p_agri": Math.floor(parseInt(row.p_agri) || '0'),
        //     "p_comm_serv": Math.floor(parseInt(row.p_comm_serv) || '0'),
        //     "p_indus": Math.floor(parseInt(row.p_indus) || '0')
        // })

        i++; // counter
        if (i % 10000 == 0) {console.info(i);} // log row count
    })
    .on('end', () => {
        console.log('CSV file successfully processed');
        console.log('Writing new data to file...');
        console.log(output);
        csvWriter
            .writeRecords(output)
            .then(() => console.log('The CSV file was written successfully'));
    });



