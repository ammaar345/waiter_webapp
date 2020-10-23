module.exports = function WaiterFunc(pool) {

    async function addUser(user, week) {
        const SELECT_QUERY = 'SELECT id FROM waiters where name=($1)';
        let waiter = await pool.query(SELECT_QUERY, [user])
        const INSERT_QUERY = 'INSERT into waiters (name)values ($1) '
        // const UPDATE_QUERY="UPDATE tblshift set weekdayid=$2 where waiternameid=$3" //$3 = id parameter
        const DELETE_QUERY = 'delete from tblshift where waiternameid=$1'
        if (waiter.rows.length === 0) {


            await pool.query(INSERT_QUERY, [user])
            waiter = await pool.query('select id from waiters where name=($1)', [user]);
        }
        await pool.query(DELETE_QUERY, [waiter.rows[0].id])
        for (const day of week) {
            const INSERT_QUERY2 = 'insert into tblshift (weekdayid,waiternameid) values ($1,$2)'
            //  const SELECT_QUERY2 = 'SELECT dayofweek from weekdays where id=($1)';
            const weekdayID = await pool.query('SELECT id from weekdays where dayofweek=($1)', [day]);
            // const weekdayID=await pool.query('SELECT dayofweek from weekdays where id=($1)',[day])
            await pool.query(INSERT_QUERY2, [weekdayID.rows[0].id, waiter.rows[0].id])
            // console.log(weekdayID.rows)
            console.log(weekdayID.rows)
            console.log(waiter.rows[0].id)
        }

    }
 async function dayObjToArray(){
const days=await pool.query(`  SELECT  weekdays.dayofweek AS weekday
FROM waiters
LEFT JOIN tblshift
ON waiters.id=tblshift.waiternameid
LEFT JOIN weekdays
ON weekdays.id=tblshift.weekdayid`  ) //convert to array with obj(values)

 }
  async function waitersWorking(){
    const waiterNames=await pool.query(`  SELECT  waiters.name AS names
    FROM waiters
    LEFT JOIN tblshift
    ON waiters.id=tblshift.waiternameid
    LEFT JOIN weekdays
    ON weekdays.id=tblshift.weekdayid`  )//no structure to really show which day he /she is working
  }
    async function clearDataBase() {
        const DELETE_QUERY = 'DELETE FROM waiters '
        const clearDb = 'DELETE FROM tblshift'
        await pool.query(DELETE_QUERY)
        await pool.query(clearDb)
    }
    async function days() {
        const selectQ = 'SELECT dayofweek from weekdays';
        const days = await pool.query(selectQ);
        return days.rows
    }
    async function id() {
        const selectQuery = 'SELECT id from weekdays'
        const id = await pool.query(selectQuery);
        return id.rows
    }
    return {
        clearDataBase,
        addUser,
        days,
        id,
        dayObjToArray
    }

}