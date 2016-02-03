///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/>
var User = (function () {
    function User(name, email) {
        this.name = name;
        this.email = email;
    }
    User.prototype.getName = function () {
        return this.name;
    };
    User.prototype.getEmail = function () {
        return this.email;
    };
    return User;
})();
var Router = (function () {
    function Router() {
        var express = require('express');
        var router = express.Router();
        /* GET home page. */
        router.get('/', function (req, res, next) {
            res.render('index', { title: 'Express' });
        });
        /* GET Hello World page. */
        router.get('/helloworld', function (req, res) {
            res.render('helloworld', { title: 'Hello, World!' });
        });
        /* GET Userlist page. */
        router.get('/userlist', function (req, res) {
            var db = req.db;
            var collection = db.get('usercollection');
            collection.find({}, {}, function (e, docs) {
                res.render('userlist', {
                    "userlist": docs
                });
            });
        });
        /* GET New User page. */
        router.get('/newuser', function (req, res) {
            res.render('newuser', { title: 'Add New User' });
        });
        /* POST to Add User Service */
        router.post('/adduser', function (req, res) {
            // Set our internal DB variable
            var db = req.db;
            // Get our form values. These rely on the "name" attributes
            var newUser = new User(req.body.username, req.body.useremail);
            // Set our collection
            var collection = db.get('usercollection');
            // Submit to the DB
            collection.insert({
                "username": newUser.getName(),
                "email": newUser.getEmail()
            }, function (err, doc) {
                if (err) {
                    // If it failed, return error
                    res.send("There was a problem adding the information to the database.");
                }
                else {
                    // And forward to success page
                    res.redirect("userlist");
                }
            });
        });
        /* Get Comic page. */
        router.get('/comic_page', function (req, res) {
            res.render('comic_page', { title: 'comic_page' });
        });
        /* Get Manage Comics page. */
        router.get('/edit_comic', function (req, res) {
            res.render('edit_comic', { title: 'edit_comic' });
        });
        /* Get Edit Comic page. */
        router.get('/manage_comics', function (req, res) {
            res.render('manage_comics', { title: 'manage_comics' });
        });
        /* Save image to database*/
        router.get('/upload', function (req, res) {
            //TODO
        });
        this.router = router;
    }
    return Router;
})();
var router = new Router();
module.exports = router.router;
//# sourceMappingURL=index.js.map