'use strict';
const { createLogger, format, transports } = require('winston');


class Logger {
    constructor(testName) {
        this.date = new Date()
        this.logger = createLogger({
            level: 'debug',
            format: format.combine(
                format.colorize(),
                format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss'
                }),
                format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
            ),
            transports: [new transports.Console(),
                        new transports.File({filename: '../allTheTests/'+this.date.getDay() +"."+ this.date.getMonth()+ "."+this.date.getFullYear()+'/'+testName+'.log' })]
        });
    }
}
module.exports = Logger