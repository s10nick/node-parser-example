var 
  request = require("request"),
	cheerio = require("cheerio"),
  url = "https://www.google.com/search?q=програмирование"
  

request(url, function (error, response, body) {
	if (error) {
		console.log('Couldn’t get page because of error: ' + error)
		return
  }

  var
  $ = cheerio.load(body),
  links = $("a"),
  body = $('body')

  console.log('-_-_-_-_-_-_-_-_-_-_-_-_-body_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_')
  console.log(body)
  console.log('-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_')

  links.each(function (i, link) {
    var 
    href = $(link).attr("href"),
    text = $(link).text()

    href = href.replace("/url?q=", "").split("&")[0]

    console.log(i)
    console.log('-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_')
    console.log(href)
    console.log('-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_')
    console.log(text)

  })
  
  // var 
  //   $page = cheerio.load(body),
  //   text = $page("body").text();

  // console.log(text);
});

