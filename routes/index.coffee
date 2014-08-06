express = require 'express'
# request = require 'request'
_ = require 'lodash'
spawn = require("child_process").spawn
# request = request.defaults
#   jar: true
#   headers:
#     # 'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
#     'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.125 Safari/537.36'
{parseString} = require 'xml2js'

getXML = (url, cb) ->
  child = spawn('phantomjs', ["page.js", url]);

  stdout = ""
  child.stdout.on 'data', (buf) ->
      # console.log('[STR] stdout "%s"', String(buf));
      stdout += buf;
  child.on "close", ->
    cb(stdout)

router = express.Router()

# GET home page.
router.get '/', (req, res) ->
  res.render 'index', { title: 'WHAT THE FUCK SHOULD I WATCH' }

router.get '/getanime', (req, res) ->
  getXML "http://myanimelist.net/malappinfo.php?u=#{req.query.name}&status=all&type=anime", (body) ->
    parseString body, (err, result) ->
      return res.json(if result? then result else null)
      
  # request.get "http://myanimelist.net/malappinfo.php?u=#{req.query.name}&status=all&type=anime", (err, d, body) ->
  #   console.log body
  #   parseString body, (err, result) ->
  #     return res.json null unless result?
  #     anime = _.filter result["myanimelist"]["anime"], (item) ->
  #       return item["my_status"][0] is "6"
  #     return res.json _.sample(anime)

module.exports = router
