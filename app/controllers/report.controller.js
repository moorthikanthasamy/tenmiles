const expModel = require("../models/expenses");

module.exports = {

    getReports: function (req, res) {
        expModel.aggregate([{
            $group: {
                _id: '$category',
                amt: {
                    $sum: '$amount'
                }
            }
        }], function (err, result) {
            console.log(result)
            res.send(result)
        })
    },
    getLineChartReport: function (req, res) {
        expModel.aggregate([{
            $group: {
                _id: {
                    $dateToString: {
                        format: "%m-%d-%Y",
                        date: "$date"
                    }


                },
                amt: {
                    $sum: '$amount'
                }
            }
        }], function (err, result) {
            res.send(result)
        })


    }
}