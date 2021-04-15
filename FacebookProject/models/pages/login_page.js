require('dotenv').config()
import { t, Selector } from 'testcafe'
import * as common_functions from '../../test-helpers/utils/common-functions'
import Selectors from '../../test-helpers/selectors/login_page_selectors.json'


class LoginPage {

  constructor() {
    // login to facebook 
    this.username_txtbox = Selector(Selectors.username)
    this.password_txtbox = Selector(Selectors.password)
    this.submit_button = Selector(Selectors.login)
    this.browser_indicator = Selector(Selectors.browserTest)
    this.login_page = Selector(Selectors.loginPageLink)
    this.device_type="mobile"
  


  }
  async  LoginToFacebook(username_val, password_val) {
    if (await this.browser_indicator.exists) {
      // refresh when find old facebook UI
      await t.eval(() => location.reload(true));
       this.device_type="web"
    }
    await common_functions.typeText(this.username_txtbox, username_val)
    await common_functions.typeText(this.password_txtbox, password_val)
    await t.click(this.submit_button)

    return this.device_type
  }

}

export default LoginPage


