class AnalyticsPage {
    constructor(selenium,logger) {
        this.selenium = selenium
        this.logger = logger
    }
             
    //The function navigates the user to the analytics page
    async navigateToAnalyticsPage() {
        try{
            this.logger.info("navigateToAnalyticsPage:")
            await this.selenium.getURL("https://lh-crm.herokuapp.com/analytics")
        } catch(error){
            console.error( `Error  with ${this.navigateToAnalyticsPage} function`)
        }
    }

    //The function prints and returns emailSentNum
    async emailSent(){
        try{
            this.logger.info("emailSent:")
            await this.selenium.sleep(5000)
            let emailSentNum=await this.selenium.getTextFromElement("xpath","/html/body/div/div/div[4]/div[1]/div[2]/div[1]")
            this.logger.info(emailSentNum)
            console.log(emailSentNum)
            return emailSentNum
        }catch(error){
            console.error( `Error  with ${this.emailSent} function`)
        }
    }
    
    //The function prints and returns outstandingClientsNum
    async outstandingClients(){
        try{
            this.logger.info("outstandingClients:")
            await this.selenium.sleep(5000)
            let outstandingClientsNum=await this.selenium.getTextFromElement("xpath","/html/body/div/div/div[4]/div[1]/div[3]/div[1]")
            this.logger.info(outstandingClientsNum)
            console.log(outstandingClientsNum)
            return outstandingClientsNum
        }catch(error){
            console.error( `Error  with ${this.outstandingClients} function`)
        }
    }

    //The function prints and returns topCountryNum

    async topCountryAnalytics(){
        try{
            this.logger.info("topCountryAnalytics:")
            await this.selenium.sleep(5000)
            let topCountryNum=await this.selenium.getTextFromElement("xpath","/html/body/div/div/div[4]/div[1]/div[4]/div[1]")
            this.logger.info(topCountryNum)
            console.log(topCountryNum)
            return topCountryNum
        }catch(error){
            console.error( `Error  with ${this.topCountryAnalytics} function`)
        }
    }  

}
    module.exports = AnalyticsPage;
