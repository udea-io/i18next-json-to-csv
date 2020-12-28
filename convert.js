const fs = require('fs')
const converter = require('json-2-csv')

function getLocaleFiles(path) {
    const allFiles = fs.readdirSync(path)
    return allFiles
        .filter(file => file.endsWith('.json'))
        .map(file => `${path}/${file}`)
}

function getJson(path) {
    return JSON.parse(fs.readFileSync(path).toString())
}

if (process.argv.length < 4) {
    return console.log('Format: node convert.js [SOURCE_FOLDER_PATH] [OUT_DIR_PATH]')
}

const sourcePath = process.argv[2]
const outputPath = process.argv[3] || './locale.csv'
const targetFiles = getLocaleFiles(sourcePath).map(file => getJson(file))

converter.json2csv(targetFiles, (err, csv) => {
    if (err) {
        return console.log(err)
    }
    
    const rows = csv.split('\n').map(row => row.split(','))
    const keyCount = rows[0].length
    let data = ''
    for (let index = 0; index < keyCount; index++) {
        for (const row of rows) {
            data += row[index] + ','
        }

        data += '\n'
    }

    fs.writeFileSync(outputPath, data)
})