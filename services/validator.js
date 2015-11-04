var _lodash = require('lodash');
var person = require('../services/persons');

/**
 * A demosnstration function to simulate the errors for this project
 * @param data
 * @returns {boolean}
 */
function isInteger(data)
{
    if(data == parseInt(data, 10))
    {
        return true;
    }else{

        return false;
    }
}

/**
 * Check for duplicate person with the same name and age.
 * @param name
 * @param age
 * @returns {*}
 */
function checkForDuplicatePerson(name,age)
{
    var index = _lodash.findIndex(person.persons, function (obj) {
        return (obj.name === name && obj.age === age);
    });

    return index;
}

exports.isInteger = isInteger;
exports.checkForDuplicatePerson = checkForDuplicatePerson;