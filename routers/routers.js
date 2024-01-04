const express= require('express')
const routes=express.Router()
const link=require('../controllers/controllers')
routes.route("/").get(link.reactPage)
routes.route("/reg").post(link.reg)
routes.route("/view").get(link.view)
routes.route("/view/:id").get(link.singleview)
routes.route("/update/:id").patch(link.updateReg)
routes.route("/delete/:id").delete(link.deleteReg)

module.exports=routes