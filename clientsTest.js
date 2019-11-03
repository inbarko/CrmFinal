const BasePage = require("./BasePage");
const HomePage = require("./HomePage")
const ClientPage=require("./ClientsPage")

class ClientPageTest {
    constructor(name) {
        this.testSelenium = new BasePage(name).selenium
        this.logger = this.testSelenium.logger
        this.homePage = new HomePage(this.testSelenium,this.logger)
        this.clientPage=new ClientPage(this.testSelenium,this.logger)
    }
   

    //The function navigates the user to the clients page
    //A function that receives an Input and attritube
    //and print whether all received answers match the search
    async clientTestSearchEmail(){
        // try{
            await this.clientPage.navigateToClientsPage()
            await this.clientPage.search("inbar@test.com","Email")
        // }catch(error){
        //     console.error( `Error  with ${this.clientTestSearch} function`)
        // }
    }
    
    //The function navigates the user to the clients page
    //A function that receives an Input and attritube
    //and print whether all received answers match the search
    async clientTestSearchOwner(){
        try{
            await this.clientPage.navigateToClientsPage()
            await this.clientPage.search("israeli","owner")
        }catch(error){
            console.error( `Error  with ${this.clientTestSearch} function`)
        }
    }   

    //The function navigates the user to the clients page
    //A function that receives an Input and attritube
    //and print whether all received answers match the search
    //and delete the client
    async clientTestDeleteClient(){
        try{
            await this.clientPage.navigateToClientsPage()
            await this.clientPage.search("inbar@test.com","Email")
            await this.clientPage.deleteClient()
        }catch(error){
            console.error( `Error  with ${this.clientTestDeleteClient} function`)
        }
    } 
}   

let c=new ClientPageTest("TestResults")
c.clientTestSearchEmail()
// c.clientTestSearchOwner()
// c.clientTestDeleteClient()