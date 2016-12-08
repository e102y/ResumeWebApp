var express = require('express');
var router = express.Router();
var account_dal = require('../model/account');


// View All accounts
router.get('/all', function(req, res) {
    account_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('account/accountViewAll', { 'result':result });
        }
    });

});

// View the account for the given id
router.get('/', function(req, res){
    if(req.query.account_id == null) {
        res.send('account_id is null');
    }
    else {
        account_dal.getById(req.query.account_id, function(err,result) {
           if (err) {
               res.send(err);
           }
           else {
               res.render('account/accountViewById', {'result': result});
           }
        });
    }
});

router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually

            res.render('account/accountAdd');

});


router.get('/insert', function(req, res){
    console.log(req.query);
    // simple validation
    if(req.query.account_fname == null) {
        res.send('a first name must be provided.');
    }
    else if(req.query.account_lname == null) {
        res.send('A last name must be provided');
    }
    if(req.query.account_email == null) {
        res.send('an e-mail must be provided.');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        account_dal.insert(req.query, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/account/all');
            }
        });
    }
});


// Delete a account for the given account_id
router.get('/delete', function(req, res){
    if(req.query.account_id == null) {
        res.send('account_id is null');
    }
    else {
        account_dal.delete(
            req.query.account_id,
            function(err, result){
                if(err) {
                    res.send(err);
                }
                else {
                    //poor practice, but we will handle it differently once we start using Ajax
                    res.redirect(302, '/account/all');
                }
            }
        );
    }
});

router.get('/edit', function(req, res){
    if(req.query.account_id == null) {
        res.send('An account id is required');
    }
    else {
        account_dal.edit(req.query.account_id, function(err, result){
            res.render('account/accountUpdate', {account: result[0][0], address: result[1]});
        });
    }

});

router.get('/update', function(req, res){
    account_dal.update(req.query, function(err, result){
        res.redirect(302, '/account/all');
    });
});

module.exports = router;
