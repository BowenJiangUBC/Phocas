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
        var multer = require('multer');
        var upload = multer({ dest: './public/uploads' });
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
        /* Get New Sign in Page */
        router.get('/sign_in', function (req, res) {
            res.render('sign_in', { title: 'Sign In' });
        });

        router.post('/sign_in', function (req, res) {
            var db = req.db;
            var collection = db.get('usercollection');

            collection.findOne({ username: req.body.username}, function(err, user) {
                if (!user) {
                    res.send( 'Invalid username or password');
                }   else {
                    if (req.body.password === user.password) {
                        res.redirect('/comic_page');
                    } else {
                        res.render('Invalid username or password');
                    }
                }
                });
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
        /* Get Edit Comics page. */
        router.get('/edit_comic', function (req, res) {
            var db = req.db;
            var collection = db.get('uploadedImages');
            collection.find({}, {}, function (e, docs) {
                res.render('edit_comic', {
                    "imageList": docs
                });
            });
        });
        /* Get Manage Comics page. */
        router.get('/manage_comics', function (req, res) {
            res.render('manage_comics', { title: 'manage_comics' });
        });
        /* Save image to database*/
        router.post('/upload', upload.single("image"), function (req, res) {
            var fs = require("fs");
            var oldPath = req.file.path;
            var newPath = oldPath + '.jpg';
            fs.rename(oldPath, newPath, function () {
                var db = req.db;
                // Set our collection
                var collection = db.get('uploadedImages');
                collection.insert({
                    "comicSetTitle": "",
                    "imageUrl": newPath.slice(7, newPath.length)
                }, function (err, doc) {
                    if (err) {
                        // If it failed, return error
                        res.send("There was a problem adding the information to the database.");
                    }
                    else {
                        res.redirect('edit_comic');
                    }
                });
            });
        });
        this.router = router;
    }
    return Router;
})();
var router = new Router();
module.exports = router.router;
//# sourceMappingURL=index.js.map