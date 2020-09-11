const express = require('express');
const sn = require('servicenow-rest-api');
const app = express();

const user = "e03854";
const pass = "Pacifico062020";
ServiceNow = new sn('smgpacificoseguros', user, pass);
ServiceNow.Authenticate();

const fields = [
    'number',
    'short_description',
    'assignment_group',
    'sys_created_on',
    'incident_state',
    'u_fecha_de_escalamiento',
    'u_tipo_de_escalamiento',
    'u_motivo_de_escalamiento',
    'impact',
    'priority',
    'urgency',
    'description',
    'u_usuario_afectado',
    'u_subcategoria_1',
    'assigned_to',
    'u_subcategoria_2',
    'u_subcategoria_3',
    'u_categoria'
];

const filters_gw = [
    'u_servicio=1901',
    'active=true',
    'assignment_group=b9d56471db47360066dc3c00ad96193f',
    'u_tipo_de_escalamiento!=null',
    'incident_state!=6'

];

const filters_ax = [
    'u_servicio=1901',
    'active=true',
    'assignment_group=7dd56471db47360066dc3c00ad96193e',
    'u_tipo_de_escalamiento!=null',
    'incident_state!=6'

];

app.get('/p_guidewire', (req, res) => {

    //  let body = req.body
    //  ServiceNow = new sn(body.instance, body.user, body.password);

    ServiceNow.getTableData(fields, filters_gw, 'incident', async rest => {
        const data = await rest
        res.send(data)
    })
})

app.get('/p_legados', (req, res) => {

    // let body = req.body
    // ServiceNow = new sn(body.instance, body.user, body.password);

    ServiceNow.getTableData(fields, filters_ax, 'incident', async rest => {
        const data = await rest
        res.send(data)
    })
})

module.exports = app;