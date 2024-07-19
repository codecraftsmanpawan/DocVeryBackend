const express = require("express");
const router = express.Router();

const { register, sendOTP, resendOTP, verifyOTP } = require("../Controllers/Register");
const { login, finalLogin } = require("../Controllers/Login");
const { isAuth } = require("../middlewares/isAuth");
const { createRequest } = require("../Controllers/CreateRequest");
const { history } = require("../Controllers/History");
const { updateRequest,updateUser } = require("../Controllers/Update");
const {adminLogin}=require("../Controllers/AdminControllers/adminLogin");
const {adminSignup}=require("../Controllers/AdminControllers/AdminSignup");
const {setStatusRequest}=require("../Controllers/AdminControllers/setStatusrequest");
const {intiatedRequests} =require("../Controllers/AdminControllers/getRequest");
const {progressiveRequests} =require("../Controllers/AdminControllers/getRequest");
const {completedRequests} =require("../Controllers/AdminControllers/getRequest");
const {getAllRequests} =require("../Controllers/AdminControllers/getRequest");
const {viewRequest} =require("../Controllers/AdminControllers/getRequest");
const {getAllUsers} =require("../Controllers/AdminControllers/getRequest");
const {viewSpecificUser} =require("../Controllers/AdminControllers/getRequest");

const {updateRequestAdmin}= require("../Controllers/AdminControllers/UpdateRequest");
const {updateUserAdmin}= require("../Controllers/AdminControllers/UpdateRequest");

const {deleteRequest}=require("../Controllers/AdminControllers/delete");
const {deleteUser}=require("../Controllers/AdminControllers/delete");

const upload = require("../middlewares/upload");


router.post("/register", register);
router.post("/sendOTP", sendOTP);
router.post("/resendOTP", resendOTP);
router.post("/verifyOTP", verifyOTP);

router.post("/login", login);
router.post("/finalLogin", finalLogin);


// Create request route with file upload and authentication middleware

router.post("/createRequest", isAuth, upload.array('images', 10), createRequest);

// History route with parameter
router.get("/history",isAuth, history);

// Update request route with parameter
router.put("/updateRequest/:id", updateRequest);

router.put("/updateUser",isAuth, updateUser);

// admin routes
router.post("/adminLogin",adminLogin);
router.post("/adminSignup",adminSignup);
router.put("/setStatusrequest/:id",setStatusRequest);

router.get("/initiated",  intiatedRequests);
router.get("/progressive",  progressiveRequests);
router.get("/completed",  completedRequests);
router.get("/getAllRequests",  getAllRequests);
router.get("/viewRequest/:id",  viewRequest);
router.get("/getAllUsers",  getAllUsers);
router.get("/viewSpecificUser/:id",  viewSpecificUser);

router.put("/updateRequestAdmin/:id", updateRequestAdmin);
router.put("/updateUserAdmin/:id", updateUserAdmin);

router.delete("/deleteRequest/:id",deleteRequest);
router.delete("/deleteUser/:id",deleteUser);

module.exports = router;