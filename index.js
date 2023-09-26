import { locale } from './tr.js'


//with this you can check is there any missing properties, excel file row number and property number should be equal 
function countProperties(ob) {
    let count = 0;

    for (const key in ob) {
        if (typeof ob[key] === "object" && !Array.isArray(ob[key])) {
            count += countProperties(ob[key]); // Recursively count properties in nested objects
        } else {
            count++; // Increment count for each property encountered
        }
    }

    return count;
}


const totalPropertyCount = countProperties(locale);
console.log(`Total properties counted: ${totalPropertyCount}`);



function flattenObject(ob, parentKey = "") {
    let result = {};
    let count = 0;
    for (const key in ob) {
        const fullKey = parentKey ? `${parentKey}.${key}` : key;

        if (typeof ob[key] === "object" && !Array.isArray(ob[key])) {
            const temp = flattenObject(ob[key], fullKey);
            result = { ...result, ...temp };
        } else {
            result[fullKey] = ob[key];
        }

    }
    console.log(`Total keys counted: ${count}`);
    return result;
}

const convertButton = document.getElementById('convertButton');
convertButton.addEventListener('click', () => {


    // Flatten the object
    const flattenedObject = flattenObject(locale);

    const dataArray = Object.keys(flattenedObject).map((key) => ({
        Key: key,
        Value:flattenedObject[key],
      }));

    // Create a worksheet
    const ws = XLSX.utils.json_to_sheet(dataArray);


    // Create a workbook and add the worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'RC Türkçe');


    // Export to Excel file
    XLSX.writeFile(wb, 'output.xlsx');


})