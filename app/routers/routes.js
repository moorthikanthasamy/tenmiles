const express = require("express");
const expController = require("../controllers/expenses.controller")
const repController = require("../controllers/report.controller")
const router = express.Router();



router.get('/exp/getAll', expController.GetAllExp)
router.post('/exp/new', expController.InsertExp)
router.delete('/exp/remove/:id', expController.DeleteExp)

router.get('/stats/getData', repController.getReports)
router.get('/stats/getLineChartData', repController.getLineChartReport)
module.exports = router;