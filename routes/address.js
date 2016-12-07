var express = require('express');
var router = express.Router();
var address_dal = require('../model/address');


// View All addresss
router.get('/all', function(req, res) {
    address_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('address/addressViewAll', { 'result':result });
        }
    });

});

// View the address for the given id
router.get('/', function(req, res){
    if(req.query.address_id == null) {
        res.send('address_id is null');
    }
    else {
        address_dal.getById(req.query.address_id, function(err,result) {
           if (err) {
               res.send(err);
           }
           else {
               res.render('address/addressViewById', {'result': result});
           }
        });
    }
});

router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    res.render('address/addressAdd');

});


router.get('/insert', function(req, res){
    console.log(req.query);
    // simple validation
    if(req.query.address_name == null) {
        res.send('the address street name must be provided.');
    }
    if(req.query.address_zip == null) {
        res.send('the zip code of the address must be provided.');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        address_dal.insert(req.query, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/address/all');
            }
        });
    }
});


// Delete a address for the given address_id
router.get('/delete', function(req, res){
    if(req.query.address_id == null) {
        res.send('address_id is null');
    }
    else {
        address_dal.delete(
            req.query.address_id,
            function(err, result){
                if(err) {
                    res.send(err);
                }
                else {
                    //poor practice, but we will handle it differently once we start using Ajax
                    res.redirect(302, '/address/all');
                }
            }
        );
    }
});
module.exports = router;
