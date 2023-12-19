const FacilitiesEntity = require('./facilitiesEntity');

const { DataTypes } = require('sequelize');

const dbConfig = require('sequelize');
const { Sequelize } = require('../models');

class FacilitiesEntity {
    /** @type {import ('sequelize').Model} */

    facilitiesModel = {};

    constructor() {
        /** @type {import ('sequelize').Model} */

        const Facilities = dbConfig.define('Facitlities')
    }
}