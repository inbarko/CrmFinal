const BasePage = require("./BasePage");
const HomePage = require("./HomePage")
const ClientPage = require("./ClientsPage")
const ActionsPage = require("./ActionsPage")

class ActionsPageTest {
    constructor(name) {
        this.testSelenium = new BasePage(name).selenium
        this.logger = this.testSelenium.logger
        this.homePage = new HomePage(this.testSelenium,this.logger)
        this.clientPage = new ClientPage(this.testSelenium,this.logger)
        this.actionsPage = new ActionsPage(this.testSelenium,this.logger)
    }

    //The function navigates the user to the actions page
    //and adds a user to the system.
    // The system alerts you whether the operation was successful
    async actionsTestAddClient() {
        try {
            await this.actionsPage.navigateToActionsPage()
            await this.actionsPage.addClient("israel", "israeli", "israel", "test", "israel@test.com")
            this.logger.info("bububub")
        } catch (error) {
            console.error(`Error  with ${this.actionsTestAddClient} function`)
        }
    }

    //The function navigates the user to the actions page
    //and update a user to the system.
    // The system alerts you whether the operation was successful
    async actionsTestUpdateClient() {
        try {
            await this.actionsPage.navigateToActionsPage()
            await this.actionsPage.updateClient("Lorena Joseph", "Jhon", "", "Send")
        } catch (error) {
            console.error(`Error  with ${this.actionsTestUpdateClient} function`)
        }
    }

    //The function navigates the user to the actions page
    //The function changes the color of the page (black / colored)
    async actionsTestChangeColor() {
        try {
            await this.actionsPage.navigateToActionsPage()
            await this.homePage.blackAndColor()
        } catch (error) {
            console.error(`Error  with ${this.actionsTestChangeColor} function`)
        }
    }
}



let a = new ActionsPageTest("ActionTestResults")
// a.actionsTestAddClient()
// a.actionsTestUpdateClient()
a.actionsTestChangeColor()

