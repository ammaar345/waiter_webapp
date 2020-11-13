module.exports = function WaiterRoutes(waiterRoutes) {
    function home(req, res, next) {
        res.render('index');

    }
    async function getWaiter(req, res, next) {
        // res.render("index")
        const user = req.params.username;
        const allDays = await waiterRoutes.checkedDays(user);
        const username = user.charAt(0).toUpperCase() + user.slice(1)

        // console.log(user);
        res.render('employee',
            {
                user: [{
                    'name': username
                }],
                weekday: allDays
            }
        )
    }
    async function userCreate(req, res, next) {
        const username = req.params.username;
        const weekday = req.body.chkDays;
        const allDays = await waiterRoutes.checkedDays(username)
        // console.log(weekday)
        //  if (username===''){
        //      req.flash('inv','Enter a username.')
        //  }
        //  else 
        if (weekday === undefined && username !== '') {
            req.flash('inv', 'Please select days to work.')
        }
        else if (username !== '' && weekday !== undefined) {

            await waiterRoutes.countWaiters()

            await waiterRoutes.addUser(username, weekday);

            req.flash('succ', 'Shifts successfully updated.')
        }
        else if (username === "" && weekday === undefined) {
            req.flash('inv', 'Please enter your name and select days to work.')
            return 
        }


        // console.log(username)
        // else 
        // req.flash('inv','PP')

        res.render('employee',
            {
                user: [{
                    'name': username
                }],
                weekday: allDays

            }

        )
    }


    async function admin(req, res, next) {
 
        // const waiterCount = waiterRoutes.waiterCountFunc()
        const days =await waiterRoutes.countWaiters() //await waiterRoutes.dayNameList();
    // console.log(await waiterRoutes.countWaiters())
    //    const countColor=waiterRoutes.dayColor(waiterCount)
    //     //   console.log(waiterCount)
    //   console.log(waiterCount)
        // const count = await waiterRoutes.dayColor(waiterCount);
        // console.log(await waiterRoutes.waiterCounting())

        res.render('schedule',
            {
                days,
            
                // waiterCount:[{
                //     'color' :countColor
                // }]
                // days: [{
                //     'color':
                //         count
                // }]
            }
        )


    }
    async function waiterHome(req, res) {
const allDays=await waiterRoutes.getAllDays()
        res.render('employee', {
weekday:allDays
        })
    }
async function reset (req,res){
    waiterRoutes.clearDataBase()
    res.render  ('index',{

    })
}
    return {
        getWaiter,
        userCreate,
        home,
        admin,
        waiterHome,
        reset
    }
}