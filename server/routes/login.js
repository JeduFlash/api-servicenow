const express = require('express');
const axios = require('axios');
const bycript = require('bcrypt');

const app = express();


const getInstance = instance => instance.indexOf(".") >= 0 ? instance : `${instance}.service-now.com`;

app.post('/login', (req, res) => {

    let body = req.body
    const user = body.user;
    const password = body.password;
    const instance = body.instance;

    const options = {
        url: `https://${getInstance(instance)}/api/now/v2/table/sys_user?user_name=${user}`,
        method: 'get',
        auth: {
            username: `${user}`,
            password: `${password}`
        }

    }


    axios(options).then((val) => {
        if (val.status == 200) {
            res.json({
                ok: true,
                options,
                response: val.status
            })
        }
    }, (rej) => {
        res.status(401).json({
            ok: false,
            options,
            response: rej.message
        })

    });
});


module.exports = app;