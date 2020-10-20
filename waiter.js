module.exports = function WaiterFunc(pool) {

    async function addUser(user) {
        INSERT_QUERY = "INSERT into "


    }

    async function clearDataBase() {
        const DELETE_QUERY = 'DELETE FROM waiters '

    }
    async function days() {
        const selectQ = "SELECT dayofweek from weekdays";
        const days = await pool.query(selectQ);
        console.log(days.rows)
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
         id

    }

}