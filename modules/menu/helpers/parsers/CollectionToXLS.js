'use strict';
const QueryObject = require('../../../../../database/QueryObject.js');

const path = require('path');
const XLSX = require('xlsx-js-style');
const workbook = XLSX.utils.book_new();

const CollectionToXLS = async (jsonData, fileName, outDir, urlPath) => {


    fileName = fileName || 'dados';
    outDir = outDir || path.join(__dirname, "..", 'public', 'spreadsheets', fileName + '.xlsx');
    urlPath = urlPath || `/spreadsheets/${fileName}` + ".xlsx";
    let result;

    QueryObject.UserModel.operations.find({}).toArray((err, docs) => {
        if (err) {
            console.log(err);
        } else {
            jsonData = jsonData || docs;
            if (jsonData.length > 0) {
                const worksheet = XLSX.utils.json_to_sheet(jsonData);

                const keys = Object.keys(jsonData[0]);
                let keysLength = [];

                keys.forEach((key) => {
                    keysLength = [...keysLength, key.length];
                });

                let greaterLength = keysLength;

                jsonData.forEach((value) => {
                    if (!isNaN(value)) {
                        value = value.toString();
                    }
                    let index = 0;
                    for (let prop in value) {
                        if (value[prop].length > greaterLength[index]) {
                            greaterLength[index] = value[prop].length;
                        }
                        index++;
                    }
                });

                let columnWidths = [];

                greaterLength.forEach((length) => {
                    columnWidths = [...columnWidths, { wch: length + 3 }]
                });

                worksheet['!cols'] = columnWidths;

                const range = XLSX.utils.decode_range(worksheet['!ref']);
                for (let rowNum = range.s.r; rowNum <= range.e.r; rowNum++) {
                    const isHeaderRow = rowNum === range.s.r;
                    const isEvenRow = rowNum % 2 === 0;
                    for (let colNum = range.s.c; colNum <= range.e.c; colNum++) {
                        const cellAddress = XLSX.utils.encode_cell({ r: rowNum, c: colNum });
                        const cell = worksheet[cellAddress];
                        if (cell && cell.v !== undefined) {
                            cell.s = {
                                font: { bold: isHeaderRow },
                                border: {
                                    top: { style: 'thin' },
                                    bottom: { style: 'thin' },
                                    left: { style: 'thin' },
                                    right: { style: 'thin' },
                                },
                                fill: isHeaderRow
                                    ? { type: 'pattern', patternType: 'solid', fgColor: { rgb: 'FFFFCC' } }
                                    : isEvenRow
                                        ? { type: 'pattern', patternType: 'solid', fgColor: { rgb: 'FFFFFF' } }
                                        : { type: 'pattern', patternType: 'solid', fgColor: { rgb: 'DDDDDD' } },
                                color: isHeaderRow ? { rgb: 'FFFFFF' } : undefined
                            };
                        }
                    }
                }

                XLSX.utils.book_append_sheet(workbook, worksheet, outDir);

                XLSX.writeFile(workbook, fileName);
                console.log(`File ${fileName} written successfully!`);
                result = {
                    response: urlPath,
                    path: true
                };
            } else {
                result = {
                    response: 'Sem dados salvos.',
                    path: false
                };
            }
            return result;
        }
    }).catch((err) => { console.log(err); });
};

module.exports = CollectionToXLS;

