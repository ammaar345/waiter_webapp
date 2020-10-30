// const waiter = require("./waiter");

module.exports = function WaiterRoutes(waiterRoutes) {
    function home(req, res, next) {
        res.render('index');

    }
    async function getWaiter(req, res, next) {
        // res.render("index")
        const username = req.params.waiterName

        // const days = await waiterRoutes.days();
        // const id = await waiterRoutes.id()
        // // console.log(days)
        // console.log(id)
        res.render('employee',
            {
                // days,
                //id,
                // username

            }
        )


    }
    async function userCreate(req, res, next) {
        const user = req.body.waiterName;
        var weekday = req.body.chkDays;
        await waiterRoutes.addUser(user, weekday)
     
        //  await   waiterRoutes.waiterDaily(weekday)
        res.render('employee',
            {
                
                //id,
              

            }

        )//select waiters.name,weekdays.dayofweek from waiters left join weekdays on waiters.id=weekdays.id
        // // 
        /*waiters.name AS name,*/

        //         SELECT  weekdays.dayofweek AS weekday
        // FROM waiters
        // LEFT JOIN tblshift
        // ON waiters.id=tblshift.waiternameid
        // LEFT JOIN weekdays
        // ON weekdays.id=tblshift.weekdayid

        //         select dayofweek as weekday
        // from weekdays

        // left join waiters
        // on weekdays.dayofweek=waiters.name
    }


    async function admin(req, res, next) {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
    //    const workingWaiters=await waiterRoutes.waitersWorking()
       const days =  await waiterRoutes.dayNameList();
       //why is this returning empty strings
      console.log(days)
       
    //    console.log(workingWaiters)                                                                                                                                                                                                                          
       res.render('schedule',                                                               
            {
             days
            }
            )


    }


    return {
        getWaiter,
        userCreate,
        home,
        admin

    }
}