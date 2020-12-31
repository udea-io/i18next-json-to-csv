# Purpose
- 將 i18next 語系 Json 檔轉為 CSV 格式，方便編輯
- 將 CSV 轉回 i18next 支援的 Json 格式

# Instruction
## Locale Files to CSV

```
src/
  Locale/
    - en.json
    - zh_TW.json
    - jp.json
```

```
npm run tocsv -- [JSON_LOCALE_FOLDER_PATH] [OUTPUT_FILE_PATH]
```

e.g.
```
npm run tocsv -- src/Locales locale.csv
```

## CSV to Locale Files

```
npm run tojson -- [CSV_FILE_PATH] [OUTPUT_PATH]
```

e.g.
```
npm run tojson -- ./locale.csv .
```
