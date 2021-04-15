require('dotenv').config()
import { t, Selector } from 'testcafe'
import * as common_functions from '../../test-helpers/utils/common-functions'
import Selectors from '../../test-helpers/selectors/registration_page_selectors.json'
import Login_Selectors from '../../test-helpers/selectors/login_page_selectors.json'


class RegistrationPage {

  constructor() {
    // login to facebook 
    this.create_account = Selector(Selectors.createNewAccount)
    this.first_name = Selector(Selectors.firstName)
    this.last_name = Selector(Selectors.lastName)
    this.registration_email = Selector(Selectors.registrationEmail)
    this.email_confirmation = Selector(Selectors.emailConfirmation)
    this.password = Selector(Selectors.password)
    this.birthday_date = Selector(Selectors.day)
    this.birthday_month = Selector(Selectors.month)
    this.birthday_year = Selector(Selectors.year)
    this.submit_signup = Selector(Selectors.submitSignup)
    this.female_gender = Selector("Label").withText(Selectors.female)
    this.male_gender = Selector("Label").withText(Selectors.male)
    this.custom_gender = Selector("Label").withText(Selectors.custom)
    this.custom_pronoun = Selector(Selectors.customPronoun)
    //
    this.browser_indicator = Selector(Login_Selectors.browserTest)
    this.login_page = Selector(Login_Selectors.loginPageLink)

    ///// mobile Selectors
    this.create_account_mobile = Selector(Selectors.mobileSelectors.createAccount)
    this.firstname_mobile = Selector(Selectors.mobileSelectors.firstNameMobile)
    this.lastname_mobile = Selector(Selectors.mobileSelectors.lastNameMobile)
    this.next_button = Selector(Selectors.mobileSelectors.nextButton)
    this.submit_account_mobile = Selector(Selectors.mobileSelectors.submitMobile)
    this.contract_info_mobile = Selector(Selectors.mobileSelectors.contactInfoMobile)
    this.female_gender_mobile = Selector(Selectors.mobileSelectors.female_mobile)
    this.male_gender_mobile = Selector(Selectors.mobileSelectors.male_mobile)
    this.custom_gender_mobile = Selector(Selectors.mobileSelectors.custome_mobile)

  }
  async  RegisterToFacebook(user_details) {
    
    if (await this.browser_indicator.exists) {
      await this.RegisterForFacebookWeb(user_details)
      return "web"
    }
    else {
      await this.RegisterForFacebookMobile(user_details)
      return "mobile"
    }

  }

  async  RegisterForFacebookWeb(user_details) {
    // refresh when find old facebook UI
    await t.eval(() => location.reload(true));
    ////// Start Regsitration 
    await t.click(this.create_account)
    await common_functions.typeText(this.first_name, user_details.firstname)
    await common_functions.typeText(this.last_name, user_details.secondname)
    await common_functions.typeText(this.registration_email, user_details.email)
    await common_functions.typeText(this.email_confirmation, user_details.email)
    await common_functions.typeText(this.password, user_details.password)
    await this.SetUserBirthday(user_details)
    await this.SetUserGender(user_details)
    await t.click(this.submit_signup)
  }


  async  RegisterForFacebookMobile(user_details) {

    await t.click(this.create_account_mobile)
    await common_functions.typeText(this.firstname_mobile, user_details.firstname)
    await common_functions.typeText(this.lastname_mobile, user_details.secondname)
    await t.click(this.next_button)
    await this.SetUserBirthday(user_details)
    await t.click(this.next_button)
    await common_functions.typeText(this.contract_info_mobile, user_details.email)
    await t.click(this.next_button)
    await this.SetUserGender(user_details)
    await t.click(this.next_button)
    await common_functions.typeText(this.password, user_details.password)
    await t.click(this.submit_account_mobile)
  }

  async SetUserBirthday(user_details) {
    await t.click(this.birthday_month)
    await t.click(Selector("option").withText(user_details.birthdayMonth))
    await t.click(this.birthday_date)
    await t.click(Selector("option").withText(user_details.birthdayDate))
    await t.click(this.birthday_year)
    await t.click(Selector("option").withText(user_details.birthdayYear))
  }

  async SetUserGender(user_details) {
    switch (user_details.gender) {
      case "Female":
        if (await this.female_gender_mobile.exists) {
          await t.click(this.female_gender_mobile)
        }
        else {
          await t.click(this.female_gender)
        }
        break;

      case "Male":
        if (await this.male_gender_mobile.exists) {
          await t.click(this.male_gender_mobile)
        }
        else {
          await t.click(this.male_gender)
        }
        break;

      case "Custom":
        if (await this.custom_gender_mobile.exists) {
          await t.click(this.custom_gender_mobile)
        }
        else {
          await t.click(this.custom_gender)
        }
        await t.click(this.custom_pronoun)
        await t.click(Selector("option").withText(user_details.pronoun))
        break;
    }
  }

}

export default RegistrationPage
