const SeleniumInfra = require("./SeleniumInfra");
const Logger=require("./logger")
class BasePage {
constructor(name) {
    this.logger=new Logger(name).logger
    this.selenium = new SeleniumInfra(this.logger);
  }
}
module.exports = BasePage;
