const cron = require('cron');;

const { cronJobAction, cronJobData } = require('../controllers/organizations');

module.exports.AssignmentJob = () =>{
    return new cron.CronJob({
        cronTime: '0 */15 * * * *',
        onTick: () =>{
            console.log('CRONJOB')
            cronJobAction()
        },
        start:false,
        timeZone: 'Europe/Tallinn'
    });
}