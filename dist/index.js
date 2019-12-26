/** Returns new array of objects
 * @param {*} arrObj array of objects variable
 * @param {*} options object that may consist of 4 different transformations
 * transformFields - object
 * addFields - object
 * deleteFields - array
 * renameFields - object
 */
const transform = (
  arrObj,
  { transformFields = {}, addFields = {}, deleteFields = [], renameFields = {} }
) => {
  let arrObj2 = JSON.parse(JSON.stringify(arrObj));
  let newArr = arrObj2.map((record) => {
    const newObj = {};
    for (const i in record) {
      if (transformFields.hasOwnProperty(i)) {
        newObj[i] = transformFields[i](record);
      } else {
        newObj[i] = record[i];
      }
    }

    for (const i in addFields) {
      newObj[i] = addFields[i](record);
    }

    for (const i of deleteFields) {
      delete newObj[i];
    }

    for (const i in renameFields) {
      if (newObj.hasOwnProperty(i)) {
        let temp = JSON.parse(JSON.stringify(newObj[i]));
        newObj[renameFields[i]] = JSON.parse(JSON.stringify(temp));
        delete newObj[i];
      }
    }
    return newObj;
  });

  return newArr;
};

module.exports = transform;
