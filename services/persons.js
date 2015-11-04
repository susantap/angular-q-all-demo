var _lodash = require('lodash');
var persons = [];

/**
 * Adds a new person to the in-memory persons array
 * @param person
 * @returns {*}
 */

function addPerson(person) {
    //generate a fake Id
    if (person.name) {
        var id = person.name.toLowerCase().trim().split('').join('-')+person.age;
        if (getPerson(id) < 0) {
            // we did not find the person hence add it to the array;
            return _lodash.clone(constructPersonObject(person, id));

        } else {
            return false;
        }

    }


}

/**
 * Adds address to an existing person
 * @param personId
 * @param addressObj
 * @returns {*}
 */
function addAddresses(personId, addressObj) {
    var index = _lodash.findIndex(persons, function (obj) {
        return obj.id === personId;
    });

    var person;
    if(index >= 0)
    {
         person = persons[index];
        var obj = {
            address:addressObj.state,
            city: addressObj.city
        }
        person.addresses.push(obj)

    }

    return person;

}

/**
 * Check if a person with an id exisits
 * @param id
 * @returns {*}
 */

function getPerson(id) {
    return _lodash.findIndex(persons, function (obj) {
        return obj.id === id;
    });
}
/**
 *
 * @param person structure is
 * {
 *   id:
 *   name:
 *   age:
 *   addresses:
 *
 * }
 */
function constructPersonObject(person, id) {
    //Just to make sure that u have a Person Model in place
    person ={
        id: id,
        age: person.age,
        name: person.name,
        addresses: []
    }
    persons.push(person);
    return person;
}

exports.persons = persons;
exports.addPerson = addPerson;
exports.addAddresses = addAddresses;




