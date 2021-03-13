const 
  request = require('request'), 
  cheerio = require('cheerio'),
  jsonfile = require('jsonfile')
  fs = require('fs'),
  defaultParams = '?type=topic&sort_by=date_created',
  // currentProtocol = 'https://',
  // currentHost = 'dota2.ru',
  // searchPath = '/forum/search',
  // currentPath = `${searchPath}`,
  url = 'https://dota2.ru/forum/search'
  
exports.getBody = (req, res, next) => {
  request(
    ` ${url}
      ${defaultParams}
      &keywords=${encodeURIComponent(req.query.keywords)}
      &page=${encodeURIComponent(req.query.page || 1)}`, 
    (err, res, body) => {
    req.document = err ? err : body
    next()
  })
}

exports.getLastPage = (req, res, next) => 
  request(`${url}${defaultParams}&keywords=${encodeURIComponent(req.query.keywords)}`, (err, res, body) => {
    let
      $ = cheerio.load(body), 
      lastPage = $('[data-pages]').attr('data-pages')
    req.lastPage = err ? err : lastPage
    next()
})

exports.getDiscussionListItems = (req, res, next) => { 

  request(`${url}${defaultParams}&keywords=${encodeURIComponent(req.query.keywords)}`, (err, res, body) => {
    
    let
      $ = cheerio.load(body),
      listItems = $('.discussionListItem'),
      loadedLink = `${url}${defaultParams}&keywords=${encodeURIComponent(req.query.keywords)}`,
      loadedData = {}

    listItems.each((i, item) => { 
      loadedData[i] = {
        text: $(item).text().replace(/\s+/g, ' '),
        threadTitle: $(item).find('.title').text().replace(/\s+/g, ' '),
        threadLink: $(item).find('.title a').attr('href'),
        posterDate: $(item).find('.posterDate .date-time').text().replace(/\s+/g, ' '),
        posterDateSec: $(item).find('.posterDate .date-time').attr('data-time'),
        lastPostDate: $(item).find('.lastPost .date-time').text().replace(/\s+/g, ' '),
        lastPostDateSec: $(item).find('.lastPost .date-time').attr('data-time'),
        lastPostLink: $(item).find('.lastPost .muted a').attr('href'),
        lastPostUser: $(item).find('.lastPost .username').text(),
        lastPostUserLink: $(item).find('.lastPost .username').attr('href'),
        messageCount: $(item).find('.pairsJustified .major dd').text(),
        viewierCount: $(item).find('.pairsJustified .minor dd').text()
      }
    })

    req.loadedLink = err ? err : loadedLink
    req.loadedData = err ? err : loadedData
    next()
  })
}

exports.readJSONData = (req, res, next) => {
  jsonfile.readFile('./public/data.json')
    .then(fileObj => {
      req.readeableFile = fileObj
      next()
    })
    .catch(err => {
      req.readeableFile = null
      next() 
    })
}

exports.saveJSONData = (req, res, next) => {
  let
    readeableFile = req.readeableFile,
    loadedData = req.loadedData,
    mergedData = readeableFile ? Object.assign(readeableFile, loadedData) : loadedData

  jsonfile.writeFile('./public/data.json', mergedData)
    .then(fileObj => {
      next()
    })
    .catch(error => console.error(error))
}
