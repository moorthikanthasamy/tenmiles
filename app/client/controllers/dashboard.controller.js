(function () {
    "use strict";

    angular.module('myApp', ['ui.router'])
        .config(function ($stateProvider, $locationProvider) {
            var expensesState = {
                name: 'expenses',
                url: '/expenses',
                templateUrl: './views/expenses.html'
            }

            var statState = {
                name: 'stats',
                url: '/stats',
                controller: 'statCon',
                templateUrl: './views/statistics.html'
            }

            var homeSate = {
                name: '/',
                url: '/',
                templateUrl: './views/home.html'
            }
            $stateProvider.state(expensesState);
            $stateProvider.state(homeSate);
            $stateProvider.state(statState);

            $locationProvider.html5Mode(true);
        })
        .controller('xpenseCon', function ($scope, $http) {
            $scope.category = [{
                    id: "Health Care",
                    name: 'Health Care'
                },
                {
                    id: "Housing",
                    name: 'Housing'
                },
                {
                    id: "Entertainment",
                    name: 'Entertainment'
                },
                {
                    id: "Food and Groceries",
                    name: 'Food and Groceries'
                }
            ]
            $scope.xpensesList = [];
            $scope.xform = {};

            $scope.dateFormatChange = function (obj) {
                console.log(obj)
                return obj
            }
            $scope.xformSubmit = function () {
                $http.post('/exp/new', $scope.xform).then(function (data) {
                    $scope.xpensesList.push(data.data)
                    $scope.xform = {};
                }).catch(function (err) {
                    console.log(err)
                })

            }
            $scope.getxpensesList = function () {
                $http.get('/exp/getAll').then(function (data) {
                    $scope.xpensesList = data.data
                }).catch(function () {

                })
            };
            $scope.removeExpenses = function (id) {
                $http.delete('/exp/remove/' + id).then(function (data) {
                    console.log(data.data)
                }).catch(function () {

                })
            }
            $scope.editExpenseForm = {}
            $scope.editExpenese = function (expObj) {

                $scope.xform = angular.copy(expObj)
                $scope.xform.date = dateConversation(expObj.date)
                console.log($scope.xform)
            }

            function dateConversation(dateValue) {
                var d = new Date(dateValue);
                return new Date(d.toLocaleDateString().replace(/\//g, '-'));
            }
            $scope.getxpensesList()


        }).controller('statCon', function ($scope, $http) {
            Chart.defaults.global.defaultFontFamily = "Lato";
            Chart.defaults.global.defaultFontSize = 18;
            Chart.defaults.global.defaultFontColor = 'blue';
            var catArray = [],
                amtArray = [],
                catArrLength = 0;

            $http.get('/stats/getData').then(function (data) {
                $scope.reportList = [];
                catArray = [];
                amtArray = [];
                $scope.reportList = data.data
                for (let i = 0; i < $scope.reportList.length; i++) {
                    catArray.push($scope.reportList[i]._id)
                    amtArray.push($scope.reportList[i].amt)
                }
                catArrLength = catArray.length;
                $scope.chartJSUpdate()
            }).catch(function (err) {
                console.log(err)
            })


            function colorGen(arrLength) {
                var colorArry = [];
                for (let i = 0; i < arrLength; i++) {
                    colorArry.push("#" + ((1 << 24) * Math.random() | 0).toString(16))
                }
                return colorArry;
            }



            $scope.chartJSUpdate = function () {

                var chartConfig = {
                    type: 'pie',
                    data: {
                        labels: catArray,
                        datasets: [{
                            label: "Expense Tracker Chart",
                            backgroundColor: colorGen(catArrLength),
                            data: amtArray
                        }]
                    },
                    options: {

                        legend: {
                            display: true
                        },
                        title: {
                            display: true,
                            text: 'Expenses Tracker'
                        }
                    }
                }
                var myChart = new Chart(document.getElementById("pie-chart"), chartConfig);


            }

            barcharAjaxMethod()
            var dateArray = [];

            function barcharAjaxMethod() {
                $http.get(' /stats/getLineChartData').then(function (data) {
                    var reportList = [];

                    var amtArray = [];
                    reportList = data.data
                    for (let i = 0; i < reportList.length; i++) {

                        dateArray.push(reportList[i]._id)
                        amtArray.push(reportList[i].amt)
                    }
                    linechartData()
                }).catch(function (err) {
                    console.log(err)
                })
            }

            function linechartData() {


                new Chart(document.getElementById("bar-chart"), {
                    type: 'bar',
                    data: {
                        labels: dateArray,
                        datasets: [{
                            label: "Expense Tracker Chart",
                            backgroundColor: colorGen(dateArray.length),
                            data: amtArray
                        }]
                    },
                    options: {
                        legend: {
                            display: false
                        },
                        title: {
                            display: true,
                            text: 'Predicted world population (millions) in 2050'
                        }
                    }
                });
            }
        })
})();