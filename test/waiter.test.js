const assert = require("assert");
const Waiter = require("../waiter");
const pg = require("pg");
const Pool = pg.Pool;
const connectionString = process.env.DATABASE_URL || 'postgresql://sneakygoblin:codex123@localhost:5432/waiters';
const pool = new Pool({
  connectionString
});
beforeEach(async function () {
  await pool.query('drop table if EXISTS shifts,waiters');
  await pool.query(`create table waiters
     (id serial not null primary key,
         name text not null
      )`)


  await pool.query(`create table shifts
    (
        id serial not null primary key,
        waiternameid int not null,
        weekdayid int not null,
        FOREIGN key (waiternameid) REFERENCES waiters(id),
        FOREIGN key (weekdayid) REFERENCES weekdays(id)
    )`)
})
describe("Should test the functions in Waiters that are returning values", async function () {
  it("Should add the day ID of Monday , Tuesday and Wednesday as well as the waiter ID into the database.", async function () {
    let waiter = Waiter(pool);
    await waiter.addUser('Ammaar', ['Monday', 'Tuesday', 'Wednesday']);
    assert.deepStrictEqual(await waiter.daysNames(), [
      {
        waiternameid: 1,
        weekdayid: 1
      },
      {
        waiternameid: 1,
        weekdayid: 2
      },
      {
        waiternameid: 1,
        weekdayid: 3
      }
    ])

  })
  it("Should add the day ID of Wednesday , Thursday and Friday as well as the waiter ID into the database.", async function () {
    let waiter = Waiter(pool);
    await waiter.addUser('Thomas', ['Wednesday', 'Thursday', 'Friday',]);
    assert.deepStrictEqual(await waiter.daysNames(), [
      {
        waiternameid: 1,
        weekdayid: 3
      },
      {
        waiternameid: 1,
        weekdayid: 4
      },
      {
        waiternameid: 1,
        weekdayid: 5
      }
    ]

    )

  })
  it("Should add the day ID of Friday , Monday and Tuesday as well as the waiter ID into the database.", async function () {
    let waiter = Waiter(pool);
    await waiter.addUser('Joe', ['Friday', 'Monday', 'Tuesday', 'Wednesday']);
    assert.deepStrictEqual(await waiter.daysNames(), [
      {
        waiternameid: 1,
        weekdayid: 5
      },
      {
        waiternameid: 1,
        weekdayid: 1
      },
      {
        waiternameid: 1,
        weekdayid: 2
      },
      {
        waiternameid: 1,
        weekdayid: 3
      }
    ])

  })
  it("tests if the database clears two datasets.", async function () {
    let waiter = Waiter(pool);
    await waiter.addUser('Ammaar', ['Friday', 'Monday', 'Tuesday', 'Wednesday']);
    await waiter.addUser('Joe', ['Tuesday', 'Monday', 'Tuesday', 'Wednesday']);
    await waiter.clearDataBase();
    assert.deepStrictEqual(await waiter.daysNames(), [])
  })
  it("tests if the database clears three datasets.", async function () {
    let waiter = Waiter(pool);
    await waiter.addUser('Ammaar', ['Friday', 'Monday', 'Tuesday', 'Wednesday']);
    await waiter.addUser('Joe', ['Tuesday', 'Monday', 'Friday']);
    await waiter.addUser('Henry', ['Monday', 'Friday']);
    await waiter.clearDataBase();
    assert.deepStrictEqual(await waiter.daysNames(), [])
  })
  it("tests if the database clears one dataset.", async function () {
    let waiter = Waiter(pool);
    await waiter.addUser('Jenna', ['Friday', 'Monday', 'Tuesday', 'Wednesday']);
    await waiter.clearDataBase();
    assert.deepStrictEqual(await waiter.daysNames(), []);
  })




  it("should count 1 worker for Friday.", async function () {
    let waiter = Waiter(pool);
    await waiter.addUser('Timothy', ['Friday']);
    const waiterCount = await waiter.waitersWorking(5)
    assert.deepStrictEqual(await waiterCount.length, 1)

  })
  it("should count 6 workers for monday.", async function () {
    let waiter = Waiter(pool);
    await waiter.addUser('Ammaar', ['Monday']);
    await waiter.addUser('Joe', ['Monday',]);
    await waiter.addUser('Thomas', ['Monday',]);
    await waiter.addUser('Jen', ['Monday',]);
    await waiter.addUser('Low', ['Monday',]);
    await waiter.addUser('Lee', ['Monday',]);
    const waiterCount = await waiter.waitersWorking(1)
    assert.deepStrictEqual(await waiterCount.length, 6)

  })
  it("should count 2 workers for Tuesday.", async function () {
    let waiter = Waiter(pool);
    await waiter.addUser('Ammaar', ['Tuesday']);
    await waiter.addUser('Joe', ['Tuesday']);
    const waiterCount = await waiter.waitersWorking(2)
    assert.deepStrictEqual(await waiterCount.length, 2)

  })
  it("should count 3 workers for Wednesday.", async function () {
    let waiter = Waiter(pool);
    await waiter.addUser('Jody', ['Wednesday']);
    await waiter.addUser('Ester', ['Wednesday']);
    const waiterCount = await waiter.waitersWorking(3)
    assert.deepStrictEqual(await waiterCount.length, 2)

  })
  it("should return object with success color for wednesday , and danger color  for the rest of the week as well as ,names and count for each day of the week.", async function () {
    let waiter = Waiter(pool);
    await waiter.addUser('Joy', ['Wednesday']);
    await waiter.addUser('Yugi', ['Wednesday']);
    await waiter.addUser('Jube', ['Wednesday']);
    await waiter.addUser('Taybah', ['Thursday']);
    await waiter.addUser('Naruto', ['Thursday']);
    await waiter.addUser('Tom', ['Monday']);
    const waiterCount = await waiter.countWaiters()
    assert.deepStrictEqual(waiterCount,
      [
        {
          color: 'bg-danger',
          count: 1,
          dayname: 'Monday',
          id: 1,
          waiters: [ { name: 'Tom' }]
        },
        {
          color: 'bg-danger',
          count: 0,
          dayname: 'Tuesday',
          id: 2,
          waiters: []
        },
        {
          color: 'bg-success',
          count: 3,
          dayname: 'Wednesday',
          id: 3,
          waiters: [{ name: 'Joy' }, { name: 'Yugi' }, { name: 'Jube' }]
        },
        {
          color: 'bg-danger',
          count: 2,
          dayname: 'Thursday',
          id: 4,
          waiters: [{ name: 'Taybah' }, { name: 'Naruto' }]
        },
        {
          color: 'bg-danger',
          count: 0,
          dayname: 'Friday',
          id: 5,
          waiters: []
        }




      ]

    )


  })
  it("should return object with warning color for wednesday , and danger color  for the rest of the week as well as ,names and count for each day of the week.", async function () {
    let waiter = Waiter(pool);
    await waiter.addUser('Joy', ['Monday', 'Tuesday', 'Wednesday']);
    await waiter.addUser('Yugi', ['Monday']);
    await waiter.addUser('Jube', ['Monday']);
    await waiter.addUser('Taybah', ['Monday']);
    await waiter.addUser('Naruto', ['Tuesday', 'Wednesday']);
    const waiterCount = await waiter.countWaiters()
    assert.deepStrictEqual(waiterCount,
      [
        {
          color: 'bg-warning',
          count: 4,
          dayname: 'Monday',
          id: 1,
          waiters: [{ name: 'Joy' }, { name: 'Yugi' }, { name: 'Jube' }, { name: 'Taybah' }]
        },
        {
          color: 'bg-danger',
          count: 2,
          dayname: 'Tuesday',
          id: 2,
          waiters: [{ name: 'Joy' }, { name: 'Naruto' }]
        },
        {
          color: 'bg-danger',
          count: 2,
          dayname: 'Wednesday',
          id: 3,
          waiters: [{ name: 'Joy' }, { name: 'Naruto' }]
        },
        {
          color: 'bg-danger',
          count: 0,
          dayname: 'Thursday',
          id: 4,
          waiters: []
        },
        {
          color: 'bg-danger',
          count: 0,
          dayname: 'Friday',
          id: 5,
          waiters: []
        }




      ]

    )


  })
  it("should return object with success color for Friday , and danger color  for the rest of the week as well as ,names and count for each day of the week.", async function () {
    let waiter = Waiter(pool);
    await waiter.addUser('Lucy', ['Wednesday', 'Friday']);
    await waiter.addUser('Johnny', ['Monday', 'Friday']);
    await waiter.addUser('Connor', ['Tuesday', 'Friday']);
    const waiterCount = await waiter.countWaiters();
    assert.deepStrictEqual(waiterCount,
      [
        {
          color: 'bg-danger',
          count: 1,
          dayname: 'Monday',
          id: 1,
          waiters: [{ name: 'Johnny' }]
        },
        {
          color: 'bg-danger',
          count: 1,
          dayname: 'Tuesday',
          id: 2,
          waiters: [{ name: 'Connor' }]
        },
        {
          color: 'bg-danger',
          count: 1,
          dayname: 'Wednesday',
          id: 3,
          waiters: [{ name: 'Lucy' }]
        },
        {
          color: 'bg-danger',
          count: 0,
          dayname: 'Thursday',
          id: 4,
          waiters: []
        },
        {
          color: 'bg-success',
          count: 3,
          dayname: 'Friday',
          id: 5,
          waiters: [{ name: 'Lucy' }, { name: 'Johnny' }, { name: 'Connor' }]
        }




      ]

    )


  })

})
after(function () {
  pool.end();
})



