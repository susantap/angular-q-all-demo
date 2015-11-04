var express = require('express');
var person = require('../services/persons');
var validator = require('../services/validator.js')
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.sendfile('./public/index.html')
});

/**
 * returns the created persons
 */
router.get('/person',function(req,res,next){

   var returnData = constructSuccess(person.persons);

    res.send(returnData);

});
router.post('/create', function (req, res, next) {

    var data = req.body;
    var returnData;
    var error = [];
    //check for duplicate person
    var index = validator.checkForDuplicatePerson(data.name, data.age);
    if(index >= 0)
    {
        error.push("Person with name: "+data.name+" and age: "+data.age+" already exist in the system.");

    }
    if(!validator.isInteger(data.age))
    {
        error.push("Person with name: "+data.name+" and age: "+data.age+" age should be a number, not a string.");
    }

    if(error.length == 0)
    {
        var per = person.addPerson(data);
        if (per) {
            // if it send true construct the response object and send it to the UI
            returnData = constructSuccess(per);


        } else {
            returnData = constructFailure(error);
        }
    }else{

        returnData = constructFailure(error);
    }


    res.send(returnData)

});

router.post('/addaddress',function(req, res,next){

    var reqObj = req.body;
    /**
     * To simulate the error just check whether the state or City is a String, if not construct an error message
     * and send the reply
     */
    var error = [];
    var returnData;
    /*
    *  NOTE: This is not the best way to create error objects in the production quality code.
    *  The best way to do it is creating validator utility objects with an ability to construct error strings through localization.
    */
    if(validator.isInteger(reqObj.address.city))
    {
        error.push("City: "+reqObj.address.city+" is not a valid City.Please provide a valid String for City");
    }
    if(validator.isInteger(reqObj.address.city))
    {
        error.push("State: "+reqObj.address.state+" is not a valid state. Please provide a valid String for State");
    }

    if(error.length == 0)
    {
        var per = person.addAddresses(reqObj.formId,reqObj.address);

        //return the addresses
        returnData = constructSuccess(per);

    }else{
        returnData = constructFailure(error);
    }

    res.send(returnData)


});

function constructSuccess(result) {
    return {
        status: "SUCCESS",
        result: result
    }
}

function constructFailure(error) {
    return {
        status: "FAILURE",
        error: error,
        result: ""
    }
}

module.exports = router;
