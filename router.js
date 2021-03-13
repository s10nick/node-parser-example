const 
  express = require('express'),
  parcer = require('./app/controllers/parcer.js'),
  test = require('./app/controllers/test.js')

module.exports = function (app) {
  const 
    testRoutes = express.Router()

  testRoutes.get('/', (req, res) => res.send({ content: 'The test route is functional!' }))
  testRoutes.get('/dota2ruforum', parcer.getBody, test.testGetBody)
  testRoutes.get(
    '/lastpage', 
    parcer.getLastPage, 
    test.testGetLastPage
  )
  testRoutes.get(
    '/list', 
    parcer.getDiscussionListItems, 
    test.testGetDiscussionListItems
  )
  testRoutes.get(
    '/listsave', 
    parcer.getDiscussionListItems, 
    parcer.readJSONData,
    parcer.saveJSONData,
    test.testGetDiscussionListItems
  )
  testRoutes.get(
    '/listread',  
    parcer.readJSONData,
    test.testReadLocalJSONData
  )

  app.use('/test', testRoutes)
}
