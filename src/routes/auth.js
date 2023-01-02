const express = require('express');

const route = express();

route.get('/', function(req,res){
    res.status(200).json({
        success: true,
        code: 200,
        message: 'You are here!',
        data: {}
    })
});

module.exports = route;