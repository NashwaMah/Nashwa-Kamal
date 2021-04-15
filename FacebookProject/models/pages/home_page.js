require('dotenv').config()
import { t, Selector } from 'testcafe'
import Selectors from '../../test-helpers/selectors/homepage_selectors.json'


class HomePage {
    constructor() {
        this.homepage_icon = Selector(Selectors.homeIcon)
        this.mobile_homepage = Selector(Selectors.mobileHomePage),
            this.not_now_button = Selector(Selectors.span).withText(Selectors.notNow)
    }
    async  ValidateUserLoggedin(device_type) {
        if (device_type == "mobile") {
            if (await this.not_now_button.visible) {
                await t.click(this.not_now_button)
                
            }
            if (await this.mobile_homepage.exists) {
                return true
            }
        }
        await this.homepage_icon.with({ visibilityCheck: true })()
        if (await this.homepage_icon.exists) {
            return true
        }
        return false
    }
}
export default HomePage


