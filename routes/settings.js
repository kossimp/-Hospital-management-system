// GET /app/settings         -> go the settings

const express = require('express');
const router = express.Router();

var {scoreOfDisease, Disease} = require('./../server/models/diseases.js');

router.get('/app/admin/systemsettings', (req, res) => {
    res.status(200).render('admin/systemsettings', {pageTitle: "系统设置",username:req.user.username});
});

module.exports = router;
