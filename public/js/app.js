angular.module('MyApp', ['ui.grid', 'MyApp.personService'])
    .controller('QAllAppCtrl', function ($scope, $q, $http, PersonService) {

        $scope.personData = [];
        $scope.isError = false;
        $scope.errors = [];

        // Name, age and the array of addresses at the controller scop
        $scope.name = " ";
        $scope.age = " ";
        $scope.addresses = [];


        $scope.gridOptions = {
            data: 'personData',
            columnDefs: [
                {field: 'name'},
                {field: 'age'}

            ]
        };

        /**
         * A simple init method to load the grid
         */

        function init() {
            PersonService.getPersons().then(function (result) {

                $scope.personData = result;

            })
        }

        init();
        /**
         * function to add a new addresses to the form
         */
        $scope.addNewAddress = function () {

            var newItemNo = $scope.addresses.length + 1;
            $scope.addresses.push(constructAddress(newItemNo, "", ""));
        };

        $scope.clearForm = function () {
            $scope.name = " ";
            $scope.age = " ";
            $scope.addresses = [];
            $scope.isError = false;
            $scope.errors = [];

        };


        /**
         * Model function construct the object to save Address
         * @param id
         * @param state
         * @param city
         * @returns {{id: *, state: *, city: *}}
         */
        function constructAddress(id, state, city) {
            return {
                id: id,
                state: state,
                city: city
            }
        }


        /**
         * Function call on Form submission
         */
        $scope.submitForm = function () {
            //First clear the errors
            $scope.isError = false;
            $scope.errors = [];
            var formObj = {
                name: $scope.name,
                age: $scope.age
            };

            PersonService.postInfo(formObj).then(function (response) {

                // check if there are errors
                if (response.data.error) {
                    $scope.errors = $scope.errors.concat(response.data.error);
                    $scope.isError = true;
                }

                if (!$scope.isError) {

                    // Fetch the form Id and add it construct address promises
                    var formId = response.data.result.id
                    //Now make the all the measurement calls
                    var addressPromises = [];
                    for (var i = 0; i < $scope.addresses.length; i++) {
                        addressPromises.push(PersonService.postAddressPromise($scope.addresses[i], formId))
                    }

                    $q.all(addressPromises).then(function (resultArray) {

                        //Check if there are any errors
                        for (var i = 0; i < resultArray.length; i++) {
                            var retVal = resultArray[i];
                            if (retVal.data.error) {
                                $scope.errors = $scope.errors.concat(retVal.data.error)
                            }

                        }
                        if ($scope.errors.length > 0) {
                            $scope.isError = true;
                        }

                        //update the Grid
                        PersonService.getPersons().then(function (result) {

                            $scope.personData = result;

                        })

                    })

                }

            })
        }
    })