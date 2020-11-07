module.exports = function WaiterRoutes(waiterRoutes) {
    function home(req, res, next) {
        res.render('index');

    }
    async function getWaiter(req, res, next) {
        // res.render("index")
        const user = req.params.username;
        // console.log(user);
        res.render('employee',
            {
                user: [{
                    'name': user
                }]
            }
        )


    }
    async function userCreate(req, res, next) {
        const username = req.params.username;
        const weekday = req.body.chkDays;

        // console.log(weekday)
    //    for (let i = 0; i < array.length; i++) {
    //        const element = array[i];
           
    //    }
    // await waiterRoutes.waiterCount()
    await waiterRoutes.countWaiters()
        // console.log(await waiterRoutes.waiterCount())
        await waiterRoutes.addUser(username, weekday);

        res.render('employee',
            {
                user: [{
                    'name': username
                }]


            }

        )
    }


    async function admin(req, res, next) {
        const days = await waiterRoutes.dayNameList();
      const waiterCount=await waiterRoutes.countWaiters()
    //   console.log(waiterCount)
    // console.log(waiterCount)
        const count= await waiterRoutes.dayColor(waiterCount)
        // console.log(await waiterRoutes.waiterCounting())
        res.render('schedule',
            {
                days,
                // counter: [{
                //     'color': 
                //     count
                // }]
            }
        )


    }
    async function waiterHome(req, res) {
        res.render('employee', {

        })
    }

    return {
        getWaiter,
        userCreate,
        home,
        admin,
        waiterHome

    }
}