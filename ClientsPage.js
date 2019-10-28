class ClientsPage {
    constructor(selenium,logger) {
        this.selenium = selenium
        this.logger = logger
    }
    
    //The function navigates the user to the clients page
    async navigateToClientsPage() {
        try{
            this.logger.info("navigateToClientsPage:")
            await this.selenium.getURL("https://lh-crm.herokuapp.com/client")
        }catch(error){
            console.error( `Error  with ${this.navigateToClientsPage} function`)
        }
    }

    //A function that receives an Input and attritube
    //and print whether all received answers match the search
     async search(inputStr,attritubeStr){
         try{
            this.logger.info("search:")
            await this.selenium.write(inputStr,"css","[type='text']")
            await this.selenium.write(attritubeStr,"className","select-css",)
            let tableArrValue=await this.selenium.findElementListBy("className","clientDetails")
            let tableArrHeader=await this.selenium.findElementListBy("className","table-header-th")
            let num
            for(let z=0;z<tableArrHeader.length;z++){
                tableArrHeader[z]=await this.selenium.getTextFromElement("","",tableArrHeader[z])
                if(tableArrHeader[z]==attritubeStr){
                    num=z
                }
            }
            let flag=true
            for(let i=0;i<tableArrValue.length;i++){
                tableArrValue[i]= await this.selenium.getTextFromElement("","",tableArrValue[i])
                if(num==i){        
                    if(tableArrValue[i].includes(inputStr)==true){
                    flag==true
                    }
                     else{
                    flag==false
                    i=tableArrValue.length
                    }
                }
            }
            console.log(flag)
            if(flag){
            this.logger.info(`all the records contain ${inputStr}:${flag}`)
            console.log(`all the records contain ${inputStr}:${flag}`)
            }
            else{
                this.logger.error(`all the records contain ${inputStr}:${flag}`)
            }
        }catch(error){
            console.error( `Error  with ${this.search} function`)
        }
    }


    //The function checks which page the user is on,
    //if there is another page the system will move to the next page
    async pageNum(){
        try{
            this.logger.info("pageNum:")
            let arrNumPage=await this.selenium.findElementListBy("className","page")
            for(let i=0;i<arrNumPage.length;i++){
                arrNumPage[i]=await this.selenium.getTextFromElement("","",arrNumPage[i])
                console.log(arrNumPage[i])
            }
            let currentPage=arrNumPage[0]
            let lastPage=arrNumPage[2]
            let flag=true
            this.logger.info(currentPage,lastPage)  
            console.log(currentPage,lastPage) 
            if(currentPage==lastPage){
                console.log("you are in the last page, u cant click on the right arrow")
                this.logger.error("you are in the last page, u cant click on the right arrow")
                flag=false
                return flag
            }           
            else{
                await this.selenium.clickElement("css","[name='next']")
                flag=true
                this.logger.info("your move to the next page")
                console.log("your move to the next page")
                return flag
            }
        }catch(error){
            console.error( `Error  with ${this.pageNum} function`)
        }
    }


    //The function deletes the user and checks whether it is deleted
    async deleteClient(){
        try{
            this.logger.info("delete:")
            let clientToDelete= await this.selenium.isElementExists("className","clientDetails")
            if(clientToDelete){
                clientToDelete= await this.selenium.findElementBy("className","clientDetails")
                await this.selenium.clickElement("","",clientToDelete)
                await this.selenium.clickElement("className","delete-client-popup-btn")
                await this.selenium.sleep(20000)
                
                let isDeleted= await this.selenium.isElementExists("className","clientDetails")
                this.logger.info(isDeleted)
                console.log(isDeleted)
                
                if(isDeleted==false){
                    this.logger.info(`the client was deleted`)
                    console.log(`the client was deleted`)
                }
                else{
                    this.logger.error("The customer still exists in the system")
                    console.log("The customer still exists in the system")
                } 
            }
        }catch(error){
            console.error( `Error  with ${this.deleteClient} function`)
        }
    }

    
    //A function that receives an attritube
    //and counts how many times the condition appears on the current page
    //and prints and returns the number / names
    async count(attritubeStr){
        try{
            this.logger.info("count:")
            let tableArrValue=await this.selenium.findElementListBy("className","clientDetails")
            let tableArrHeader=await this.selenium.findElementListBy("className","table-header-th")
            let counter=0
            let countryArr=[]
            let num= 0
            for(let z=0;z<tableArrHeader.length;z++){
                tableArrHeader[z]=await this.selenium.getTextFromElement("","",tableArrHeader[z])
                if(tableArrHeader[z]==attritubeStr){
                    num=z
                }
            }
            console.log(num)
            let table2=[]
            for(let t=0;t<tableArrValue.length;t++){    
                table2=await this.selenium.findElementListBy("css","th",tableArrValue[t])
                let elm= await this.selenium.getTextFromElement("","",table2[num])
                console.log(elm)      
                    if(attritubeStr=="Email-Type"){
                        if(elm!="-"){
                            counter=counter+1
                            this.logger.info("Adding to Counter 1")
                            this.logger.info(`counter:${counter}`)
                            console.log("Adding to Counter 1")
                            console.log(`counter:${counter}`)   
                        }
                    }
                    else if(attritubeStr=="Sold"){
                        if(elm=="NO"){
                            counter=counter+1
                            this.logger.info("Adding to Counter 1")
                            this.logger.info(`counter:${counter}`)
                            console.log("Adding to Counter 1")
                            console.log(`counter:${counter}`)
                        }
                    }
                    else if (attritubeStr=="Country"){
                        countryArr.push(elm)
                    }
                    else{
                        this.logger.error(`${attritubeStr} is Empty`)
                        console.log(`${attritubeStr} is Empty`)
                    }  
            }      
            if(countryArr.length==0) {
                return counter
            }
            else{
                return countryArr
            }
       }catch(error){
        console.error( `Error  with ${this.count} function`)
       }
    }

    //The function receives an array of countries and checks, prints and returns
    //the countries that appeared the most times
    async maxCountry(countryArr){
        try{
            this.logger.info("maxCountry:")
            let max = 1;
            let counter = 0;
            let item;
            for (let i = 0; i < countryArr.length; i++) {
                for (let j = i; j < countryArr.length; j++) {
                    if (countryArr[i] == countryArr[j])
                        counter++;
                        if (max < counter) {
                            max = counter;
                            item = countryArr[i];
                        }
                    }
                counter = 0;
            }
            this.logger.info(item + "(" + max + "times)")
            console.log(item + "(" + max + "times)");
            return item
            }catch(error){
                console.error( `Error  with ${this.coumaxCountrynt} function`)
            }
        }      
    }
    module.exports = ClientsPage;
