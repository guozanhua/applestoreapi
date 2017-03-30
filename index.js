/*
App structure
|-controller
|--dataquery.js
|-node_modules
|-public
|--css
|---master.css
|-views
|--layouts
|---main.hbs
|--index.hbs
|-index.js
|-package.json
*/
var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var sessions = require('express-session')
var hbs = require('express-handlebars')
var astore = require('app-store-scraper')
var app = express()
var router = express.Router()
    // view engine setup
app.engine('hbs', hbs({
    extname: '.hbs'
    , defaultLayout: 'main'
    , layoutDir: path.join(__dirname, '/views/layouts')
}))
app.set('views', path.join(__dirname, '/views'))
app.set('view engine', '.hbs')
var session
    // static folder setup
app.use(express.static(path.join(__dirname, '/views')))
app.use('/styles', express.static(path.join(__dirname, '/public/css/')))
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var port = process.env.PORT || 3000
app.listen(port, function (req, res) {
    console.log('Listening at port 3000')
})
// all routes goes here
app.get('/', function (req, res) {
    // Do Something...
    res.render('index', {
        title: 'App Store API', 
        baseurl: 'https://applestoreapi.herokuapp.com/'
    })
})
app.get('/app/:id/:appid', function (req, res) {
    // Retrieves the full detail of an application. Options:
    // - appId: the Google Play id of the application (the ?id= parameter on the url).
    // - lang (optional, defaults to 'en'): the two letter language code in which to fetch the app page.
    // - country (optional, defaults to 'us'): the two letter country code used to retrieve the applications. Needed when the app is available only in some countries.
    var appid = req.params.appid
    var id = req.params.id
    astore.app({
        id: id
        , appId: appid
    }).then(function (resolve, reject) {
        res.json(resolve)
    }).catch(function (reject) {
        res.json({
            err: true
            , msg: appid + ' is not a valid application id'
        })
    })
})
app.get('/list/:collection?/:category?/:country?/:num?', function (req, res) {
    // Retrieve a list of applications from one of the collections at Google Play. Options:
    // - collection (optional, defaults to collection.TOP_FREE): the Google Play collection that will be retrieved. Available options can bee found here.
    // - category (optional, defaults to no category): the app category to filter by. Available options can bee found here.
    // - age (optional, defaults to no age filter): the age range to filter the apps (only for FAMILY and its subcategories). Available options are age.FIVE_UNDER, age.SIX_EIGHT, age.NINE_UP.
    // - num (optional, defaults to 60, max is 120): the amount of apps to retrieve.
    // - start (optional, defaults to 0, max is 500): the starting index of the retrieved list.
    // - lang (optional, defaults to 'en'): the two letter language code used to retrieve the applications.
    // - country (optional, defaults to 'us'): the two letter country code used to retrieve the applications.
    var collection = req.params.collection || astore.category.TOP_FREE_IOS
    var category = req.params.category || 'no_category'
    var country = req.params.country || 'us'
    var num = parseInt(req.params.num) || 50
    console.log(num)
        //console.log(start)
    switch (collection) {
    case 'top_free_ios':
        collection = astore.collection.TOP_FREE_IOS
        break
    case 'top_free_ipad':
        collection = astore.collection.TOP_FREE_IPAD
        break
    case 'top_grossing_ios':
        collection = astore.collection.TOP_GROSSING_IOS
        break
    case 'top_grossing_ipad':
        collection = astore.collection.TOP_GROSSING_IPAD
        break
    case 'top_paid_ios':
        collection = astore.collection.TOP_PAID_IOS
        break
    case 'top_paid_ipad':
        collection = astore.collection.TOP_PAID_IPAD
        break
    case 'new_free_ios':
        collection = astore.collection.NEW_FREE_IOS
        break
    case 'new_paid_ios':
        collection = astore.collection.NEW_PAID_IOS
        break
    case 'top_free_mac':
        collection = astore.collection.TOP_FREE_MAC
        break
    case 'top_grossing_mac':
        collection = astore.collection.TOP_GROSSING_MAC
        break
    case 'top_paid_mac':
        collection = astore.collection.TOP_PAID_MAC
        break
    case 'new_ios':
        collection = astore.collection.NEW_IOS
        break
    case 'top_mac':
        collection = astore.collection.TOP_MAC
        break
    default:
        collection = astore.collection.TOP_FREE_IOS
    }
    switch (category) {
    case 'no_category':
        category = false
        break
    case 'books':
        category = astore.category.BOOKS
        break
    case 'business':
        category = astore.category.BUSINESS
        break
    case 'catalogs':
        category = astore.category.CATALOGS
        break
    case 'education':
        category = astore.category.EDUCATION
        break
    case 'entertainment':
        category = astore.category.ENTERTAINMENT
        break
    case 'finance':
        category = astore.category.FINANCE
        break
    case 'food_and_drink':
        category = astore.category.FOOD_AND_DRINK
        break
    case 'games':
        category = astore.category.GAMES
        break
    case 'games_action':
        category = astore.category.GAMES_ACTION
        break
    case 'games_adventure':
        category = astore.category.GAMES_ADVENTURE
        break
    case 'games_arcade':
        category = astore.category.GAMES_ARCADE
        break
    case 'games_board':
        category = astore.category.GAMES_BOARD
        break
    case 'games_card':
        category = astore.category.GAMES_CARD
        break
    case 'games_casino':
        category = astore.category.GAMES_CASINO
        break
    case 'games_dice':
        category = astore.category.GAMES_DICE
        break
    case 'games_educational':
        category = astore.category.GAMES_EDUCATIONAL
        break
    case 'games_family':
        category = astore.category.GAMES_FAMILY
        break
    case 'games_music':
        category = astore.category.GAMES_MUSIC
        break
    case 'games_puzzle':
        category = astore.category.GAMES_PUZZLE
        break
    case 'games_racing':
        category = astore.category.GAMES_RACING
        break
    case 'games_role_playing':
        category = astore.category.GAMES_ROLE_PLAYING
        break
    case 'games_simulation':
        category = astore.category.GAMES_SIMULATION
        break
    case 'games_sports':
        category = astore.category.GAMES_SPORTS
        break
    case 'games_strategy':
        category = astore.category.GAMES_STRATEGY
        break
    case 'games_trivia':
        category = astore.category.GAMES_TRIVIA
        break
    case 'games_word':
        category = astore.category.GAMES_WORD
        break
    case 'health_and_fitness':
        category = astore.category.HEALTH_AND_FITNESS
        break
    case 'lifestyle':
        category = astore.category.LIFESTYLE
        break
    case 'magazines_and_newspapers':
        category = astore.category.MAGAZINES_AND_NEWSPAPERS
        break
    case 'magazines_arts':
        category = astore.category.MAGAZINES_ARTS
        break
    case 'magazines_automotive':
        category = astore.category.MAGAZINES_AUTOMOTIVE
        break
    case 'magazines_weddings':
        category = astore.category.MAGAZINES_WEDDINGS
        break
    case 'magazines_business':
        category = astore.category.MAGAZINES_BUSINESS
        break
    case 'magazines_children':
        category = astore.category.MAGAZINES_CHILDREN
        break
    case 'magazines_computer':
        category = astore.category.MAGAZINES_COMPUTER
        break
    case 'magazines_food':
        category = astore.category.MAGAZINES_FOOD
        break
    case 'magazines_crafts':
        category = astore.category.MAGAZINES_CRAFTS
        break
    case 'magazines_electronics':
        category = astore.category.MAGAZINES_ELECTRONICS
        break
    case 'magazines_entertainment':
        category = astore.category.MAGAZINES_ENTERTAINMENT
        break
    case 'magazines_fashion':
        category = astore.category.MAGAZINES_FASHION
        break
    case 'magazines_health':
        category = astore.category.MAGAZINES_HEALTH
        break
    case 'magazines_history':
        category = astore.category.MAGAZINES_HISTORY
        break
    case 'magazines_home':
        category = astore.category.MAGAZINES_HOME
        break
    case 'magazines_literary':
        category = astore.category.MAGAZINES_LITERARY
        break
    case 'magazines_men':
        category = astore.category.MAGAZINES_MEN
        break
    case 'magazines_movies_and_music':
        category = astore.category.MAGAZINES_MOVIES_AND_MUSIC
        break
    case 'magazines_politics':
        category = astore.category.MAGAZINES_POLITICS
        break
    case 'magazines_outdoors':
        category = astore.category.MAGAZINES_OUTDOORS
        break
    case 'magazines_family':
        category = astore.category.MAGAZINES_FAMILY
        break
    case 'magazines_pets':
        category = astore.category.MAGAZINES_PETS
        break
    case 'magazines_professional':
        category = astore.category.MAGAZINES_PROFESSIONAL
        break
    case 'magazines_regional':
        category = astore.category.MAGAZINES_REGIONAL
        break
    case 'magazines_science':
        category = astore.category.MAGAZINES_SCIENCE
        break
    case 'magazines_sports':
        category = astore.category.MAGAZINES_SPORTS
        break
    case 'magazines_teens':
        category = astore.category.MAGAZINES_TEENS
        break
    case 'magazines_travel':
        category = astore.category.MAGAZINES_TRAVEL
        break
    case 'magazines_women':
        category = astore.category.MAGAZINES_WOMEN
        break
    case 'medical':
        category = astore.category.MEDICAL
        break
    case 'music':
        category = astore.category.MUSIC
        break
    case 'navigation':
        category = astore.category.NAVIGATION
        break
    case 'news':
        category = astore.category.NEWS
        break
    case 'photo_and_video':
        category = astore.category.PHOTO_AND_VIDEO
        break
    case 'productivity':
        category = astore.category.PRODUCTIVITY
        break
    case 'reference':
        category = astore.category.REFERENCE
        break
    case 'shopping':
        category = astore.category.SHOPPING
        break
    case 'social_networking':
        category = astore.category.SOCIAL_NETWORKING
        break
    case 'sports':
        category = astore.category.SPORTS
        break
    case 'travel':
        category = astore.category.TRAVEL
        break
    case 'utilities':
        category = astore.category.UTILITIES
        break
    case 'weather':
        category = astore.category.WEATHER
        break
    default:
        category = false
    }
    astore.list({
            collection: collection
            , category: category
            , num: num
            , country: country
        , }).then(function (resolve) {
            res.json(resolve)
        }).catch(function (reject) {
            res.json({
                err: true
                , msg: '404 not found'
            })
        })
    })
app.get('/search/:term?/:device?/:country?/:num?', function (req, res) {
    // Retrieves a list of apps that results of searching by the given term. Options:
    // - term: the term to search by.
    // - lang (optional, defaults to 'en'): the two letter language code used to retrieve the applications.
    // - country (optional, defaults to 'us'): the two letter country code used to retrieve the applications.
    // - price (optional, defaults to all): allows to control if the results apps are free, paid or both.
    // - + all: Free and paid
    // - + free: Free apps only
    // - + paid: Paid apps only
    // - num (optional, defaults to 20, max is 250): the amount of apps to retrieve.
    var term = decodeURIComponent(req.params.term)
    var device = req.params.device
    var country = req.params.country
    var num = parseInt(req.params.num)
    switch (device) {
    case 'no_device':
        device = false
        break
    case 'all_device':
        device = gplay.store.device.ALL
        break
    case 'mac_device':
        device = gplay.store.device.MAC
        break
    case 'ios_device':
        device = gplay.store.device.IOS
        break
    default:
        device = false
    }
    astore.search({
        term: term || "angry bird"
        , country: country || 'us'
        , device: device || 'store.device.ALL'
        , num: num || 50
    }).then(function (resolve) {
        res.json(resolve)
    }).catch(function (reject) {
        res.json({
            err: true
            , msg: term + ' not available on Google Play'
        })
    })
})