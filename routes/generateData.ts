import express = require('express')
import {_Resume, Resume} from "../models/resume";
import {_RequestUser} from "./interfaces";
import {_Vacancy, Vacancy} from "../models/vacancy";

const count = 20;
function generateDataResumes(__: _RequestUser, _: express.Response, next: express.NextFunction) {
    for (let i = 0; i < count; i++)
        Resume.create({
            name: 'Resume' + Math.floor(Math.random() * 20),
            age: Math.floor(Math.random() * 100),
            type: 'Full',
            position: 'Director',
            location: 'Simferopol',
            category: '' + Math.floor(Math.random() * 5),
            description: 'Some descriptions Some descriptions Some descriptions Some descriptions Some descriptions Some descriptions',
            isPublic: true,
            email: 'example@gmail.com',
            creatorId: '5bdeaa40af53920428a569ff'
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
            location: 'Simferopol',
            category: '' + Math.floor(Math.random() * 5),
            description: 'Some descriptions Some descriptions Some descriptions Some descriptions Some descriptions Some descriptions',
            isPublic: true,
            email: 'example@gmail.com',
            phone: '+7(978)123-45-67',
            creatorId: '5bdeaa40af53920428a569ff',
            state: 'Actual'
        });
    next();
}

module.exports = {generateDataVacancys, generateDataResumes};