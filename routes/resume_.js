var express = require('express');
var router = express.Router();
var resume_dal = require('../model/resume');
var account_dal = require('../model/account');
var skill_dal = require('../model/skill');
var company_dal = require('../model/company');
var school_dal = require('../model/school_dal');

// View All resumes
router.get('/all', function(req, res) {
    resume_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('resume/resumeViewAll', { 'result':result });
        }
    });

});

// View the resume for the given id
router.get('/', function(req, res){
    if(req.query.resume_id == null) {
        res.send('resume_id is null');
    }
    else {
        resume_dal.getById(req.query.resume_id, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('resume/resumeViewById', {'result': result});
            }
        });
    }
});



router.get('/add', function(req, res){
        // passing all the query parameters (req.query) to the insert function instead of each individually

    school_dal.getAll(function (err4, result4){
        if (err4) {
            res.send(err4);
        }
        else {
            company_dal.getAll(function (err3, result3) {
                if (err3) {
                    res.send(err3);
                }
                else {
                    skill_dal.getAll(function (err2, result2) {
                        if (err2) {
                            res.send(err2);
                        }
                        else {
                            account_dal.getAll(function (err, result) {
                                if (err) {
                                    res.send(err);
                                }
                                else {
                                    res.render('resume/resumeAdd', {
                                        'account': result,
                                        'skill': result2,
                                        'company': result3,
                                        'school': result4
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
});
});

router.get('/insert', function(req, res){
    console.log(req.query);
    // simple validation
    if(req.query.resume_name == null) {
        res.send('Resume name must be provided.');
    }
    else if(req.query.user_account_id == null) {
        res.send('An account must be selected');
    }
    else if(req.query.date_shared_year == null) {
        res.send('Resume year must be provided.');
    }
    else if(req.query.date_shared_month == null) {
        res.send('Resume month must be provided.');
    }
    else if(req.query.date_shared_day == null) {
        res.send('Resume day must be provided.');
    }
    else if(req.query.skill_id == null) {
        res.send('skill must be provided.');
    }
    else if(req.query.company_id == null) {
        res.send('company must be provided.');
    }
    else if(req.query.school_id == null) {
        res.send('school must be provided.');
    }
    else if(req.query.was_hired == null) {
        res.send('hiring status must be provided.');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        resume_dal.insert(req.query, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/resume/all');
            }
        });
    }
});


// Delete a resume for the given resume_id
router.get('/delete', function(req, res){
    if(req.query.resume_id == null) {
        res.send('resume_id is null');
    }
    else {
        resume_dal.delete(
            req.query.resume_id,
            function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/resume/all');
            }
        }
        );
    }
});

router.get('/edit', function(req, res){
    if(req.query.resume_id == null) {
        res.send('resume_id is null');
    }
    else {
        resume_dal.getById(req.query.resume_id, function(err,result5) {
            if (err) {
                res.send(err);
            }
            else {
                school_dal.getAll(function (err4, result4) {
                    if (err4) {
                        res.send(err4);
                    }
                    else {
                        company_dal.getAll(function (err3, result3) {
                            if (err3) {
                                res.send(err3);
                            }
                            else {
                                skill_dal.getAll(function (err2, result2) {
                                    if (err2) {
                                        res.send(err2);
                                    }
                                    else {
                                        account_dal.getAll(function (err, result) {
                                            if (err) {
                                                res.send(err);
                                            }
                                            else {
                                                res.render('resume/resumeUpdate', {
                                                    'account': result,
                                                    'skill': result2,
                                                    'company': result3,
                                                    'school': result4,
                                                    'resume': result5
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    }
});
router.get('/update', function(req, res){
    if(req.query.resume_name == null) {
        res.send('Resume name must be provided.');
    }
    else if(req.query.user_account_id == null) {
        res.send('An account must be selected');
    }
    else if(req.query.date_shared_year == null) {
        res.send('Resume year must be provided.');
    }
    else if(req.query.date_shared_month == null) {
        res.send('Resume month must be provided.');
    }
    else if(req.query.date_shared_day == null) {
        res.send('Resume day must be provided.');
    }
    else if(req.query.skill_id == null) {
        res.send('skill must be provided.');
    }
    else if(req.query.company_id == null) {
        res.send('company must be provided.');
    }
    else if(req.query.school_id == null) {
        res.send('school must be provided.');
    }
    else if(req.query.was_hired == null) {
        res.send('hiring status must be provided.');
    }
    else {
        resume_dal.edit(req.query, function (err, result) {
            res.redirect(302, '/resume/all');
        });
    }
});

module.exports = router;
