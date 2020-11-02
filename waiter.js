module.exports = function WaiterFunc(pool) {
    async function addUser(user, week) {
        const SELECT_QUERY = 'SELECT id FROM waiters where name=($1)';

        let waiter = await pool.query(SELECT_QUERY, [user])
        const INSERT_QUERY = 'INSERT into waiters (name)values ($1) '
        const DELETE_QUERY = 'delete from tblshift where waiternameid=$1'
        if (waiter.rows.length === 0) {


            await pool.query(INSERT_QUERY, [user])
            waiter = await pool.query('select id from waiters where name=($1)', [user]);
        }
        await pool.query(DELETE_QUERY, [waiter.rows[0].id])
        for (const day of week) {
            const INSERT_QUERY2 = 'insert into tblshift (weekdayid,waiternameid) values ($1,$2)'
            //  const SELECT_QUERY2 = 'SELECT dayname from weekdays where id=($1)';
            const weekdayID = await pool.query('SELECT id from weekdays where dayname=($1)', [day]);
            // const weekdayID=await pool.query('SELECT dayname from weekdays where id=($1)',[day])
            await pool.query(INSERT_QUERY2, [weekdayID.rows[0].id, waiter.rows[0].id])
            // console.log(weekdayID.rows)
            // console.log(weekdayID.rows)
            // console.log(waiter.rows[0].id)
        }

    }
    async function waiters(){
    const waiters= await pool.query('select name from waiters');
    return waiters.rows
    }
    async function daysOfWeek() {
        const days = await pool.query('Select dayname from weekdays');
        return days.rows
    }
    //     async function dayObjToArray() {
    //         const days = await pool.query(`  SELECT  weekdays.dayname AS weekday
    // FROM waiters
    // LEFT JOIN tblshift
    // ON waiters.id=tblshift.waiternameid
    // LEFT JOIN weekdays
    // ON weekdays.id=tblshift.weekdayid`  )
    // //         // console.log(typeof days)   
    // //         // return days.rows;
    // //         const arrDays = Object.values(days.rows);
    // //         console.log(arrDays)
    // //         const arrCount = [];
    // //         // console.log(arrDays)
    // //         //console.log( arrDays);
    // //         for (let i = 0; i < arrDays.length; i++) {
    // //             console.log(arrDays[i].weekday)
    // //             arrDayCount.push(arrDays[i].weekday)
    // //         }
    // //         for (let i = 0; i < arrDayCount.length; i++) {
    // //             var week = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    // //             var day = arrDayCount[i];
    // //             if (day === week[i]) {
    // //                 arrCount.push(day)

    // //             }

    // //         }
    // //         console.log(arrCount)

    // //         //convert to array with obj(values)

    //     }
    async function waitersWorking(day) {
        const waiterNames = await pool.query(`SELECT  waiters.name AS name
    FROM waiters
    LEFT JOIN tblshift
    ON waiters.id=tblshift.waiternameid
    LEFT JOIN weekdays
    ON weekdays.id=tblshift.weekdayid
    where weekdays.id=$1` , [day])
        return waiterNames.rows//no structure to really show which day he /she is working
    }
    async function clearDataBase() {
        const DELETE_QUERY = 'DELETE FROM waiters ';
        const clearDb = 'DELETE FROM tblshift';
        await pool.query(DELETE_QUERY);
        await pool.query(clearDb);
    }
    async function days() {
        const selectQ = 'SELECT dayname from weekdays';
        const days = await pool.query(selectQ);
        return days.rows
    }
    async function id() {
        const selectQuery = 'SELECT id from weekdays'
        const id = await pool.query(selectQuery);
        return id.rows
    }
    function dayColor(waiterCount) {
        if (waiterCount = 3) {
            return "green"
        }
        if (waiterCount > 3) {
            return "orange"
        }
        else if (waiterCount < 3) {
            return "red"

        }

    }

    // function dayMsg(waiterCnt){

    // }
    async function dayNameList() {
        const dayObjs = await pool.query('select * from weekdays');
        const days = dayObjs.rows;
        for (let i = 0; i < days.length; i++) {
            const day = days[i];
            const waiters = await waitersWorking(day.id)

            day.waiters = waiters;

        }
        // console.log(waiters);
        console.log(days)
        return dayObjs.rows
    }
    return {
        dayColor,
        clearDataBase,
        addUser,
        days,
        id,
        dayNameList,
        // dayObjToArray,
        waitersWorking,
        daysOfWeek,
        waiters
    }

}