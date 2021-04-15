require('dotenv').config()
import facebookRegstrationPage from '../models/pages/registration_page.js'
import facebookLoginPage from '../models/pages/login_page.js'
import facebookHomePage from '../models/pages/home_page.js'
const facebook_credentials = require('../test-helpers/test-data/facebookCredentials.js').users
const facebook_credentials_dataset = JSON.parse(JSON.stringify(facebook_credentials))
const facebook_regstration_page = new facebookRegstrationPage()
const facebook_login_page = new facebookLoginPage()
const facebook_homepage= new facebookHomePage()

fixture`Register And Login to Facebook`
    .page`${process.env.facebookUrl}`

facebook_credentials_dataset.forEach(credential => {
    test(' -----  Register to facebook with multi users -----', async t => {
       const device_type= await facebook_regstration_page.RegisterToFacebook(credential)
       console.log("------ Registered from " + device_type + " ------")
        await t.expect(await facebook_homepage.ValidateUserLoggedin(device_type)).eql(true)
        console.log("---- Regsiter user completed with name " + credential.firstname + " -----")
       
    });
});

facebook_credentials_dataset.forEach(credential => {
    test(' -----  Login to facebook with multi users -----', async t => {
       const device_type= await facebook_login_page.LoginToFacebook(credential.email, credential.password)
       console.log("------ Logged in from " + device_type +" -------")
        await t.expect(await facebook_homepage.ValidateUserLoggedin(device_type)).eql(true)
        console.log("---- User " + credential.firstname + credential.secondname + " logged in successfully -------")
        
    });
});