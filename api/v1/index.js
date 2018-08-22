import { Router } from 'express';
import cors from "cors"
import bodyParser from "body-parser"

import signupcontroller from "./controllers/signup";
import loginController from "./controllers/signin";

const v1app = Router();

// Use cors for cross origin request for api
v1app.use(cors());

// use body parser so we can get info from POST and/or URL parameters
v1app.use(bodyParser.urlencoded({ extended: false }));
v1app.use(bodyParser.json());

// Test
v1app.get("/", (req, res) => {
    res.status(200).send("v1 app initiated")
})


/**
 * Authentication Endpoints
 */

 //Signup Endpoint
 v1app.post("/auth/signup", signupcontroller);

 //Login Endpoint
 v1app.post("/auth/login", loginController);


 /**
  * Questions CRUD endpoints
  */

//Fetch all questions Endpoint
v1app.get("/questions", () => {});

// Fetch a question Endpoint
v1app.get("/questions/:questionId", () => {});

// Add a question Endpoint
v1app.post("/questions", () => {});

// delete a question Endpoint
v1app.delete("/questions/:questionId", () => {});

// Post an answer to a question Endpoint
v1app.post("/questions/:questionId/answers", () => {});

// Mark an answer to a question as Preferred Endpoint
v1app.put("/questions/:questionId/answers/:answerId", () => {});

export default v1app;