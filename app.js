const mdb = require('./mongodb'),
    parseXlsx = require('excel'),
    express = require('express');

var app = express();

//Excel 을 Mongo DB에 넣는 함수
// parseXlsx('TRANSLATION_20171215.xlsx', function(err, data) {
//     if(err) throw err;
//     console.log(data);
//     mdb.insertArray(data);
// });

//가져와서 뿌려주는 함수
mdb.getAll();