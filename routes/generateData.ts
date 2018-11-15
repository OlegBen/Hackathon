import express = require('express')
import Vacancy from "../models/vacancy";
import Resume from "../models/resume";
import Location from "../models/location";
import Category from "../models/category";
import {DB} from "../models/base";


const count = 20;

function generateDataResumes() {
    for (let i = 1; i <= count; i++)
        Resume.create({
            name: 'Resume' + Math.floor(Math.random() * 20),
            surname: 'surname',
            age: Math.floor(Math.random() * 100),
            type: 'Full',
            position: 'Director',
            city_id: Math.floor(Math.random() * 4) + 1,
            category_id: Math.floor(Math.random() * (6 - 3 + 1)) + 3,
            description: 'Some descriptions Some descriptions Some descriptions Some descriptions Some descriptions Some descriptions',
            is_public: 1,
            creator_id: i
        });
}

function generateDataVacancys() {
    for (let i = 1; i <= count; i++)
        Vacancy.create({
            company: 'Vacancy' + Math.floor(Math.random() * 20),
            type: 'Full',
            logo: '*Some Logo',
            url: 'google.com',
            position: 'Director',
            city_id: Math.floor(Math.random() * 4) + 1,
            category_id: Math.floor(Math.random() * (6 - 3 + 1)) + 3,
            description: 'Some descriptions Some descriptions Some descriptions Some descriptions Some descriptions Some descriptions',
            is_public: 1,
            creator_id: 1
        });
}

function generateCountrys() {
    Location.createCountry('Russia');
    Location.createCountry('USA');
}

function generateCitys() {
    Location.createCity(`Simferopol`, 1);
    Location.createCity(`Moscow`, 1);
    Location.createCity(`New York`, 2);
    Location.createCity(`Californi`, 2);
}


function generateCategorys() {
    Category.create('Programming');
    Category.create('Teacher');
}

function generateSubCategorys() {
    Category.createSub('Java', 1);
    Category.createSub('C++', 1);
    Category.createSub('Math', 2);
    Category.createSub('Chem', 2);
}


function generateData(req: express.Request, res: express.Response, _: express.NextFunction) {
    switch (req.query.step) {
        case '0':
            DB.createAllTables();
            break;
        case '1':
            generateCountrys();
            generateCategorys();
            console.log(1);
            break;
        case '2':
            generateCitys();
            generateSubCategorys();
            console.log(2);
            break;
        case '3':
            generateDataVacancys();
            generateDataResumes();
            console.log(3);
            break;
    }
    res.redirect('/')
}

module.exports = {generateData};
