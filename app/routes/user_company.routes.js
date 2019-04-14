const express = require("express");

let userCompanyCtrl = require("../controllers/user_company.controller");
let authCtrl = require("../controllers/auth.controller");
let router = express.Router();

// A user adds his company
router
    .route("/add_company_for_user")
    .post(authCtrl.tokenValidator, userCompanyCtrl.addOneCompanyForOneUser);

// Get some specific fields from all the companies whose companyIds are given in an array 
router
    .route("/get_all_user_admin_company")
    .post(authCtrl.tokenValidator, userCompanyCtrl.getAllUserAdminCompany);

// Get all companies for a user where he is employee
router
    .route("/get_empcompanies_oneuser")
    .post(authCtrl.tokenValidator, userCompanyCtrl.getAllCompanyOneUser);

// Get one workspace
router
    .route("/get_one_workspace")
    .post(authCtrl.tokenValidator, userCompanyCtrl.getOneWorkSpace);

// Get all employees of a particular workspace
router
    .route("/getAllEmpsOneWorkSpace")
    .post(authCtrl.tokenValidator, userCompanyCtrl.getAllEmpsOneWorkSpace);

// Adds one employee to a company workspace using their 'userId' field
router
    .route("/add_one_emp_to_one_company")
    .post(authCtrl.tokenValidator, userCompanyCtrl.addOneEmpToOneCompany);

// removes an employee from a specified company workspace
router
    .route("/remove_emp_from_one_company")
    .post(authCtrl.tokenValidator, userCompanyCtrl.removeEmpFromCompany);

router
    .route("/getWorkSpaceAdmin")
    .post(userCompanyCtrl.getWorkSpaceAdmin);

module.exports = router;