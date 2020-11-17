module.exports = function WaiterFunc(pool) {
    async function addUser(user, week) {
        const SELECT_QUERY = 'SELECT id FROM waiters where name=($1)';

        let waiter = await pool.query(SELECT_QUERY, [user])
        const INSERT_QUERY = 'INSERT into waiters (name)values ($1) '
        const DELETE_QUERY = 'delete from shifts where waiternameid=$1'
        if (waiter.rows.length === 0) {

            await pool.query(INSERT_QUERY, [user])
            waiter = await pool.query('select id from waiters where name=($1)', [user]);
        }
        await pool.query(DELETE_QUERY, [waiter.rows[0].id])

        for (const day of week) {
            const INSERT_QUERY2 = 'insert into shifts (weekdayid,waiternameid) values ($1,$2)'
            const weekdayID = await pool.query('SELECT id from weekdays where dayname=($1)', [day]);
            await pool.query(INSERT_QUERY2, [weekdayID.rows[0].id, waiter.rows[0].id])
        }

    }
    async function daysNames() {
        const dayNames = await pool.query('SELECT waiternameid,weekdayid from shifts')
        return dayNames.rows
    }
    async function clearDataBase() {
        const clearDb = 'DELETE FROM shifts';
        const DELETE_QUERY = 'DELETE FROM waiters ';
        await pool.query(clearDb);
        await pool.query(DELETE_QUERY);

    }
    async function waitersWorking(day) {
        const waiterNames = await pool.query(`SELECT  waiters.name AS name
    FROM waiters
    LEFT JOIN shifts
    ON waiters.id=shifts.waiternameid
    LEFT JOIN weekdays
    ON weekdays.id=shifts.weekdayid
    where weekdays.id=$1` , [day])
        return waiterNames.rows;
    }
    async function countWaiters() {
        const dayObjs = await pool.query('select * from weekdays');
        const days = dayObjs.rows;
        for (let i = 0; i < days.length; i++) {
            const day = days[i];
            const waiters = await waitersWorking(day.id)
            day.waiters = waiters;
            day.count = waiters.length;
            if (day.count < 3) {
                day.color = 'bg-danger'
            }
            else if (day.count > 3) {
                day.color = 'bg-warning'
            }
            else if (day.count == 3) {
                day.color = 'bg-success'
            }


        }
        return days
    }
    async function getAllDays() {
        const daysOfWeek = await pool.query('SELECT dayname FROM Weekdays')
        return daysOfWeek.rows;
    }

    async function checkedDays(waiter) {
        var waiterSelected = await pool.query('Select name from waiters where name=$1', [waiter])
        const allWaiters = await pool.query('Select name from waiters');
        var waitersWorkingDays = await pool.query(`  SELECT  weekdays.dayname AS Weekday
        FROM weekdays
        LEFT JOIN shifts
        ON weekdays.id= shifts.weekdayid 
        left join waiters
        on waiters.id=shifts.waiternameid
        where waiters.name=$1
        
        `, [waiter]);
        const allDays = await getAllDays()

        const days = waitersWorkingDays.rows;
        // console.log(waiterName)
        if (days.rowCount === 0) {
            return allDays;
        }
        else {
            for (day of allDays) {
                waitersWorkingDays
                for (waiterSelected of days) {

                    if (waiterSelected.weekday == day.dayname) {
                        day.checked = "checked";
                    }
                }
            }
            return allDays;
        }
    }
    return {
        clearDataBase,
        addUser,
        waitersWorking,
        daysNames,
        countWaiters,
        getAllDays,
        checkedDays

    }

}