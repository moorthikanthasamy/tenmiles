const expModel = require("../models/expenses")

module.exports = {
    InsertExp: function (req, res) {
        var exp = new expModel(req.body);
        exp.save(function (err, data) {
            if (err)
                console.log(err)
            res.send(data)
        });
    },
    GetAllExp: function (req, res) {
        expModel.find({}).then(list => res.send(list)).catch(err => console.log('err in getting expenses list'))
    },
    DeleteExp: function (req, res) {
        expModel.findByIdAndRemove({
            _id: req.params.id
        }).then(resData => {
            res.send(resData._id)
        }).catch(err => console.log('err'))
    }
}