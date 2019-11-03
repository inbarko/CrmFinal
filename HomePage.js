class HomePage {
    constructor(selenium,logger) {
        this.selenium = selenium
        this.logger = logger
    }
        //The function navigates the user to the home page
        async navigateToHomePage() {
            try{
                this.logger.info("navigateToHomePage:")
                await this.selenium.getURL("https://lh-crm.herokuapp.com/")
            }catch(error){
                console.error( `Error  with ${this.navigateToHomePage} function`)
            }
            
        }

        //The function changes the color of the page (black / colored)
        async blackAndColor(){
            try{
                this.logger.info("blackAndColor:")
                let value= await this.selenium.isElementExists("className","color-btn")
                if(value==true){
                    value=await this.selenium.findElementBy("className","color-btn")
                    let color= await this.selenium.getTextFromElement("","",value)
                    await this.selenium.clickElement("","",value)
                    let colorBack=await this.selenium.isElementExists("tagName","a[href=App-bw.css]")
                    if(colorBack==false){
                        this.logger.info(` the color change to ${color} [Pass]`)
                    console.log(` the color change to ${color} `)
                    }
                    else{
                        this.logger.error(` Page background did not change[Fail]`)
                        console.log(` Page background did not change`)

                    }
                }
                else{
                    this.logger.error(" u dont have a color button[Fail]")
                    console.log(" u dont have a color button")
                }
            } catch(error){
                console.error( `Error  with ${this.blackAndColor} function`)
            }
        }
        //The function gets the page name we want to navigate to, and checks to see if it exists
        async Navigation(movePagesStr){
            try{
                this.logger.info("Navigation:")
                let buttonName=await this.selenium.isElementExists("css",`.nav-btn[value="${movePagesStr}"]`)
                if(buttonName){
                    buttonName=await this.selenium.findElementBy("css",`.nav-btn[value="${movePagesStr}"]`)
                    await this.selenium.clickElement("","",buttonName)
                    movePagesStr=movePagesStr.toLowerCase()
                    this.logger.info(movePagesStr)
                    console.log(movePagesStr)
                    movePagesStr=movePagesStr.substring(0,movePagesStr-1) 
                    let flag= await this.selenium.validURL(movePagesStr)
                    this.logger.info(`You've moved to ${movePagesStr} page and the validation is ${flag}`)
                    console.log(`You've moved to ${movePagesStr} page and the validation is ${flag}`)
                }
                else{
                    this.logger.error(`You do not have a page with the name ${movePagesStr}`)
                    console.log(`You do not have a page with the name ${movePagesStr}`)
                }
            }catch(error){
                console.error( `Error  with ${this.Navigation} function`)

            }   
        }
    }

    module.exports = HomePage;
