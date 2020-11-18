const _ = require('lodash');
module.exports = function WaiterRoutes(waiterRoutes) {
    function home(req, res, next) {
        res.redirect('/waiters/');

    }
    async function getWaiter(req, res, next) {
        
        const username = _.capitalize(req.params.username);
        const allDays = await waiterRoutes.checkedDays(username);
        // const username = user.charAt(0).toUpperCase() + user.slice(1)

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
        const username = _.capitalize(req.params.username);
        // const username=user.charAt(0).toUpperCase() + user.slice(1);                                                                                                                                            
        let weekday =Array.isArray(req.body.chkDays) ? req.body.chkDays : [req.body.chkDays];
        console.log(weekday+'//'+'weekday');
        console.log(username+'user')
        if (weekday[1] === undefined ) {
            req.flash('inv', 'Please select days to work.');
            // return
        }
        else if (username !== '' && weekday !== [undefined]) {

            await waiterRoutes.countWaiters()

            await waiterRoutes.addUser(username, weekday);
          
            req.flash('succ', 'Shifts successfully updated.')
        }
        // else if (username === "" && weekday === [undefined]) {
        //     req.flash('inv', 'Please enter your name and select days to work.')
        //     return 
        // }
        const allDays = await waiterRoutes.checkedDays(username)
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
        const days =await waiterRoutes.countWaiters()
        res.render('schedule',
            {
                days
            }
        )


    }
    async function adminUpdate(req,res){
       
        const username =_.capitalize( req.body.waiter);
        const weekday = Array.isArray(req.body.daysAdmin) ? req.body.daysAdmin : [req.body.daysAdmin]
        console.log(username)
        if (username === "" && weekday[1] === undefined) {
            req.flash('inv', 'Please enter your name and select the days that you wish to work.')
            // return 
        }
        else if (weekday[1] === undefined) {
            req.flash('inv', 'Please select days to work.')
        }
      
        else if (username !== '' && weekday !== undefined) {

            await waiterRoutes.countWaiters()

            await waiterRoutes.addUser(username, weekday);
          
            req.flash('succ', 'Shifts successfully updated.')
        }
       
        const days =await waiterRoutes.countWaiters()
        res.render('schedule',{
days

        })
    }

    async function waiterHome(req, res) {
const allDays=await waiterRoutes.getAllDays()
        res.render('employee', {
// weekday:allDays
        })
    }
async function reset (req,res){
   await waiterRoutes.clearDataBase()
   const days =await waiterRoutes.countWaiters()
   req.flash('clear','Shifts Have successfully been cleared for the week.')
    res.render  ('schedule',{
days
    })
}
    return {
        getWaiter,
        userCreate,
        home,
        admin,
        waiterHome,
        reset,
        adminUpdate
    }
}