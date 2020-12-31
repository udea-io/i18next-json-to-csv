const fs = require('fs')
const converter = require('json-2-csv')

function initializeLocalesArray(localeCount) {
    const locales = []
    for (let index = 0; index < localeCount; index++) {
        locales.push('')
    }

    return locales
}

function writeJson(localeName, data) {
    const path = process.argv[3] || '.'

    try {
        fs.writeFileSync(`${path}/${localeName}.json`, data)
    } catch (error) {
        throw 'Error occurred when writing to JSON: ' + error
    }
}

function transposeCsv(csv) {
    const lines = csv.split('\n')
    const localeCount = lines[0].split(',').length
    let locales = initializeLocalesArray(localeCount)

    for (const [lineIndex, line] of lines.entries()) {
        const lineSegments = line.split(',')
        for (let localeIndex = 0; localeIndex < lineSegments.length; localeIndex++) {
            locales[localeIndex] += lineSegments[localeIndex]

            if (lineIndex !== lines.length - 1) {
                locales[localeIndex] += ','
            }
        }        
    }

    return locales.join('\n')
}

if (process.argv.length < 4) {
    return console.log('Format: node csv2json.js [SOURCE_CSV_PATH] [OUTPUT_PATH]')
}

const file = fs.readFileSync(process.argv[2]).toString()

converter.csv2jsonAsync(transposeCsv(file))
    .then(jsons => {
        for (const json of jsons) {
            writeJson(json['language'], JSON.stringify(json))
        }
    })
    .catch(err => {
        console.log(err)
    })