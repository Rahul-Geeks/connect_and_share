const express = require("express");

let userCompanyCtrl = require("../controllers/user_company.controller");
let router = express.Router();

// // updated the "isCompany" status in "user_profile" document
// router
//     .route("/update_company_status")
//     .post(userCompanyCtrl.updateIsCompanyStatus);

// A user adds his company
router
    .route("/add_company_for_user")
    .post(userCompanyCtrl.addOneCompanyForOneUser);

// Get some specific fields from all the companies whose companyIds are given in an array 
router
    .route("/get_all_user_admin_company")
    .post(userCompanyCtrl.getAllUserAdminCompany);

// Get all companies for a user where he is employee
router
    .route("/get_empcompanies_oneuser")
    .post(userCompanyCtrl.getAllCompanyOneUser);

// Get one workspace
router
    .route("/get_one_workspace")
    .post(userCompanyCtrl.getOneWorkSpace);

// Get all employees of a particular workspace
router
    .route("/getAllEmpsOneWorkSpace")
    .post(userCompanyCtrl.getAllEmpsOneWorkSpace);

// Adds one employee to a company workspace using their 'userId' field
router
    .route("/add_one_emp_to_one_company")
    .post(userCompanyCtrl.addOneEmpToOneCompany);

// removes an employee from a specified company workspace
router
    .route("/remove_emp_from_one_company")
    .post(userCompanyCtrl.removeEmpFromCompany);

module.exports = router;