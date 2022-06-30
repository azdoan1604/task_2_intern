const XLSX = require('xlsx');
const fs = require('fs')
const { parse } = require('csv-parse')
const toJSON = csv => {
    const lines = csv.split('\r\n')
    const result = []
    const headers = lines[0].split(',')

    lines.map(l => {
        const obj = {}
        const line = l.split(',')

        headers.map((h, i) => {
            obj[h] = line[i]
        })

        result.push(obj)
    })
    result.splice(0, 1)
    return result
}
function xlstojson(xls) {
    const workBook = XLSX.readFile(xls)
    XLSX.writeFile(workBook, "./csv.csv", { bookType: "csv" });
    let csv = fs.readFileSync("./csv.csv", 'utf8')
    let rs = toJSON(csv)
    // fs.unlinkSync("./csv.csv")
    return rs;
}

module.exports = xlstojson