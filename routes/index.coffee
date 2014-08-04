express = require 'express'
request = require 'request'
_ = require 'lodash'
request = request.defaults
  jar: true
  headers:
    # 'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.125 Safari/537.36'
{parseString} = require 'xml2js'
router = express.Router()

# GET home page.
router.get '/', (req, res) ->
  res.render 'index', { title: 'Express' }

router.get '/getanime', (req, res) ->
  request.get "http://myanimelist.net/malappinfo.php?u=#{req.query.name}&status=all&type=anime", (err, d, body) ->
    console.log body
    parseString body, (err, result) ->
      return res.json null unless result?
      anime = _.filter result["myanimelist"]["anime"], (item) ->
        return item["my_status"][0] is "6"
      return res.json _.sample(anime)

module.exports = router
