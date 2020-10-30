const assert = require("assert");
const waiter = require("../waiter");

const pg = require("pg");
const Pool = pg.Pool;
const connectionString = process.env.DATABASE_URL || 'postgresql://sneakygoblin:codex123@localhost:5432/waiters';
const pool = new Pool({
    connectionString
});
beforeEach(async function () {
    await pool.query('delete from tblshift');
    await pool.query('delete from waiters');
    // await pool.query("delete from towns");
})
describe("Should test that the registrations are being inserted into the database.", async function () {
    it("Should show  3 registrations in the database.", async function () {
       

    })
    it("Should return  2 registrations in the database.", async function () {
          })
    it("Should show  3 registrations in the database , since one registration is a duplicate.", async function () {
     
    })

})



