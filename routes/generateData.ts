import express = require('express')
import {_RequestUser} from "./interfaces";
import Vacancy from "../models/vacancy";
import Resume from "../models/resume";





const count = 20;
function generateDataResumes(__: _RequestUser, _: express.Response, next: express.NextFunction) {
    for (let i = 0; i < count; i++)
        Resume.create({
            name: 'Resume' + Math.floor(Math.random() * 20),
            surname: 'surname',
            age: Math.floor(Math.random() * 100),
            type: 'Full',
            position: 'Director',
            location_id: 1,
            sub_category_id: 1,
            description: 'Some descriptions Some descriptions Some descriptions Some descriptions Some descriptions Some descriptions',
            is_public: 1,
            creator_id: i
        });
    next();
}

function generateDataVacancys(__: _RequestUser, _: express.Response, next: express.NextFunction) {
    for (let i = 0; i < count; i++)
        Vacancy.create({
            company: 'Vacancy' + Math.floor(Math.random() * 20),
            type: 'Full',
            logo: '*Some Logo',
            url: 'google.com',
            position: 'Director',
            location_id: 1,
            sub_category_id: 1,
            description: 'Some descriptions Some descriptions Some descriptions Some descriptions Some descriptions Some descriptions',
            is_public: 1,
            creator_id: 1
        });
    next();
}

module.exports = {generateDataVacancys, generateDataResumes};
