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

function parseContent(content) {
    if (content.startsWith('"')) {
        content = content.slice(1)
    }

    if (content.endsWith('"')) {
        content = content.slice(0, -1)
    }

    return content
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
    for (let keyIndex = 0; keyIndex < keyCount; keyIndex++) {
        for (const [rowIndex, row] of rows.entries()) {
            data += parseContent(row[keyIndex])

            if (rowIndex !== rows.length - 1) {
                data += ','
            }
        }

        data += '\n'
    }

    fs.writeFileSync(outputPath, data)
})