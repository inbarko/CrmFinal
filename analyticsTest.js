const BasePage = require("./BasePage");
const HomePage = require("./HomePage")
const ClientPage = require("./ClientsPage")
const ActionsPage = require("./ActionsPage")
const AnalyticsPage = require("./AnalyticsPage")

class AnalyticsPageTest {
    constructor(name) {
        this.testSelenium = new BasePage(name).selenium
        this.logger = this.testSelenium.logger
        this.homePage = new HomePage(this.testSelenium)
        this.clientPage = new ClientPage(this.testSelenium)
        this.actionsPage = new ActionsPage(this.testSelenium)
        this.analyticsPage = new AnalyticsPage(this.testSelenium)
    }


    //The function navigates the user to the analytics page
    //Finds the number of email
    //The function navigates the user to the clients page
    //Counts the number of emails per page. 
    //If there is another page, the system will also pass and count on this page
    //The system will check to see if the number of emails on analytics is equal
    //to the number of emails on clients and return a message
    async analyticsTestCounterEmailTest() {
        try {
            await this.analyticsPage.navigateToAnalyticsPage()
            let emailSentCounter = await this.analyticsPage.emailSent()
            await this.homePage.Navigation("Clients")
            let counter = await this.clientPage.count("Email-Type")
            let flag = await this.clientPage.pageNum()
            console.log(flag)
            console.log(counter)
            while (flag) {
                let anotherCounter = await this.clientPage.count("Email-Type")
                counter = counter + anotherCounter
                flag = await this.clientPage.pageNum()
                console.log(counter)
                console.log(anotherCounter)
                console.log(flag)
            }
            if (emailSentCounter == counter) {
                this.logger.info("The counters are the same")
                console.log("The counters are the same")
            }
            else {
                this.logger.error("Houston We have a problem, the counters are unequal")
                console.log("Houston We have a problem, the counters are unequal")
            }

        } catch (error) {
            console.error(`Error  with ${this.analyticsTestCounterEmailTest} function`)
        }
    }

    //The function navigates the user to the analytics page
    //Finds the number of OutstandingClients
    //The function navigates the user to the clients page
    //Counts the number of OutstandingClients per page. 
    //If there is another page, the system will also pass and count on this page
    //The system will check to see if the number of OutstandingClients on analytics is equal
    //to the number of OutstandingClients on clients and return a message

    async analyticsTestCounterOutstandingClients() {
        try {
            await this.analyticsPage.navigateToAnalyticsPage()
            let outstandingClientsNum = await this.analyticsPage.outstandingClients()
            await this.homePage.Navigation("Clients")
            let counter = 0
            counter = await this.clientPage.count("Sold")
            let flag = await this.clientPage.pageNum()
            console.log(flag)
            console.log(counter)

            while (flag) {
                let anotherCounter = await this.clientPage.count("Sold")
                counter = counter + anotherCounter
                flag = await this.clientPage.pageNum()
                console.log(counter)
                console.log(anotherCounter)
                console.log(flag)
            }
            if (outstandingClientsNum == counter) {
                this.logger.info("The counters are the same")
                console.log("The counters are the same")
            }
            else {
                this.logger.error("Houston We have a problem, the counters are unequal")
                console.log("Houston We have a problem, the counters are unequal")
            }
        } catch (error) {
            console.error(`Error  with ${this.analyticsTestCounterOutstandingClients} function`)
        }
    }


    //The function navigates the user to the analytics page
    //Finds the country that appears the most timed
    //The function navigates the user to the clients page
    //Adds the countries on the page to the array
    //If there is another page, the system will also pass and add to array to
    //The system will check to see if the name of the country on analytics is equal
    //to the the name of the country on clients and return a message

    async analyticsTestCountercountryTest() {
        try {
            await this.analyticsPage.navigateToAnalyticsPage()
            let topCountryCounter = await this.analyticsPage.topCountryAnalytics()
            await this.homePage.Navigation("Clients")
            let countryArr = await this.clientPage.count("Country")
            let flag = await this.clientPage.pageNum()
            console.log(flag)
            while (flag) {
                let country = []
                country = await this.clientPage.count("Country")
                for (let i = 0; i < country.length; i++) {
                    countryArr.push(country[i])
                }
                flag = await this.clientPage.pageNum()
                console.log(flag)
                console.log(countryArr)
            }
            console.log(countryArr)
            let maxcountry = await this.clientPage.maxCountry(countryArr)
            if (topCountryCounter == maxcountry) {
                this.logger.info("The countries are the same")
                console.log("The countries are the same")
            }
            else {
                this.logger.error("Houston We have a problem, the countries are unequal")
                console.log("Houston We have a problem, the countries are unequal")
            }
        } catch (error) {
            console.error(`Error  with ${this.analyticsTestCountercountryTest} function`)

        }
    }
}

let a = new AnalyticsPageTest("AnalyticsTestResults")
// a.analyticsTestCounterEmailTest()
// a.analyticsTestCounterOutstandingClients()
a.analyticsTestCountercountryTest()
