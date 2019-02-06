const duequeue = require('./index.js')
let q = duequeue.create(async(payload, task) => {
  const delta = Date.now() - task.due
  console.log(`delta: ${delta} payload: ${payload}`)
})

q.add(new Date(2020,1,1), "should not trigger before 2020")
q.add(Date.now() + 10000, "after 10s")
q.add(Date.now() , "instant")
q.add(Date.now() + 2000, "after 2s")
q.add(Date.now() + 3001, "after 3001ms")
q.add(Date.now() + 7001, "after 7001ms")

setTimeout(() => {
  q.add(Date.now() + 123, "after (1234 + 123)ms")
}, 1234)

q.add(new Date(1999,1,1), "1991")
