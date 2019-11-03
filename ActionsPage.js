class ActionsPage {
    constructor(selenium,logger) {
        this.selenium = selenium
        this.logger = logger
    }
    //The function navigates the user to the actions page
    async navigateToActionsPage() {
        try {
            this.logger.info("navigateToActionsPage:")
            await this.selenium.getURL("https://lh-crm.herokuapp.com/actions")
        } catch (error) {
            console.error(`Error  with ${this.navigateToActionsPage} function`)
        }
    }

    //The function receives a first name, last name, state, owner name and email,
    //and adds a user to the system.
    // The system alerts you whether the operation was successful
    async addClient(firstNameStr, lastNameStr, countryStr, ownerStr, emailStr) {
        try {
            this.logger.info("addClient:")
            await this.selenium.write(firstNameStr, "id", "firstName")
            await this.selenium.write(lastNameStr, "id", "lastName")
            await this.selenium.write(countryStr, "id", "country")
            await this.selenium.write(ownerStr, "css", 'input[id="owner"]')
            await this.selenium.write(emailStr, "id", "email")
            await this.selenium.sleep(10000)
            await this.selenium.clickElement("className", "add-client-btn")
            await this.popUp()
        } catch (error) {
            console.error(`Error  with ${this.addClient} function`)
        }
    }

    //The function receives the name of the customer who made the sale and
    // alerts you whether the operation was successful
    async soldClient(clientNameStr) {
        try {
            this.logger.info("soldClient:")
            await this.selenium.write(clientNameStr, "css", "input[list='names']")
            await this.selenium.clickElement("css", "input[value='Sold']")
            this.popUp()
        } catch (error) {
            console.error(`Error  with ${this.soldClient} function`)

        }
    }

    //The function receives the client name and email type
    //and changes the email type to the customer.
    // The system alerts you whether the operation was successful
    async changeEmailType(clientNameStr, emailTypeChar) {
        try {
            this.logger.info("changeEmailType:")
            await this.selenium.write(clientNameStr, "css", "input[list='names']")
            await this.selenium.write(emailTypeChar, "css", "input[list='emailType']")
            await this.selenium.clickElement("css", "input[value='Send']")
            this.popUp()
        } catch (error) {
            console.error(`Error  with ${this.changeEmailType} function`)

        }
    }

    //The function receives the client's name and the new owmer,
    //and replaces the owner name 
    // The system alerts you whether the operation was successful
    async transferOwnershipTo(clientNameStr, ownerNameStr) {
        try {
            this.logger.info("transferOwnershipTo:")
            await this.selenium.write(clientNameStr, "css", "input[list='names']")
            await this.selenium.write(ownerNameStr, "css", "input[list='owner']")
            await this.selenium.clickElement("css", "input[value='Transfer']")
            this.popUp()
        } catch (error) {
            console.error(`Error  with ${this.transferOwnershipTo} function`)
        }

    }

    //The function gets the name of the button
    //and activates the relevant function
    //and sends the variables to it
    // The system alerts you whether the operation was successful
    async updateClient(clientNameStr, ownerNameStr = "Barton Ramirez", emailTypeChar = "A", button = "Sold") {
        try {
            this.logger.info("updateClient:")
            switch (button) {
                case "Sold":
                    this.soldClient(clientNameStr)
                    break;
                case "Send":
                    this.changeEmailType(clientNameStr, emailTypeChar)
                    break;
                case "Transfer":
                    this.transferOwnershipTo(clientNameStr, ownerNameStr)
                    break
                default:
                    this.logger.error("The button name you sent does not exist [Fail]")
                    console.log("The button name you sent does not exist")
            }
        } catch (error) {
            console.error(`Error  with ${this.updateClient} function`)
        }

    }

    //The function catch the note 
    // The system alerts you whether the operation was successful
    async popUp() {
        try {
            let popUP = await this.selenium.getTextFromElement("xpath", "//div[4]/div[4]/div")
            if (popUP == "SOME DETAILS ARE MISSING") {
                this.logger.error(` u cant add/update a client because ${popUP} [Fail]`)
                console.log(` u cant add/update a client because ${popUP}`)
            }
            else if (popUP == "UPDATE SUCCESSFUL") {
                this.logger.info(`u add/update a client because ${popUP} [Pass]`)
                console.log(`u add/update a client because ${popUP}`)
            }
        } catch (error) {
            console.error(`Error  with ${this.updateClient} function `)
        }
    }
}

module.exports = ActionsPage;
