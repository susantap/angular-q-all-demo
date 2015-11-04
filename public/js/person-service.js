angular.module('MyApp.personService', [])


    .service('PersonService', function ($q, $http) {

        var personService = this;


        /**
         * Create a new person
         * @param data
         * @returns {*}
         */
        personService.postInfo = function (data) {
            return $http({
                method: 'POST',
                url: '/create',
                data: data,
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(function (response) {

                return response

            });

        };


        /**
         * Add address
         * @param obj
         * @param formId
         * @returns {*}
         */
        personService.postAddressPromise = function (obj, formId) {
            return $http({
                method: 'POST',
                url: '/addaddress',
                data: {
                    formId: formId,
                    address: obj
                },
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(function (response) {

                return response

            });

        };

        personService.getPersons = function(){

            return $http({
                method: 'GET',
                url: '/person',
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(function (response) {

                //Just return the result
                return response.data.result

            });

        };


    })