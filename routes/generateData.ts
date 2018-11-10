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
            country_id: 1,
            city_id: null,
            location_id: null,
            category_id: 1,
            sub_category_id: null,
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
            country_id: 1,
            city_id: null,
            location_id: null,
            category_id: 1,
            sub_category_id: null,
            description: 'Some descriptions Some descriptions Some descriptions Some descriptions Some descriptions Some descriptions',
            is_public: 1,
            creator_id: 1
        });
}

function generateCountrys() {
    for (let i = 1; i <= 4; i++)
        Location.createCountry('Country' + i);
}

function generateCitys() {
    for (let i = 1; i <= 4; i++)
        for (let j = 1; j <= 4; j++)
            Location.createCity(`City_${i}_${j}`, i);
}

function generateLocation() {
        for (let i = 1; i <= 16; i++)
            for (let j = 1; j <= 4; j++)
                Location.createLocation(`Location_${i}_${j}`, j);
}

function generateCategorys() {
    for (let i = 1; i <= 4; i++)
        Category.create('Category' + i);
}

function generateSubCategorys() {
    for (let i = 1; i <= 4; i++)
        for (let j = 1; j <= 4; j++)
            Category.createSub(`SubC_${i}_${j}`, i);
}


function generateData(req:express.Request, res:express.Response, _:express.NextFunction){
    switch (req.query.step){
        case '0':
            DB.createAllTables(()=>{

            });
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
            generateLocation();
            console.log(3);
            break;
        case '4':
            generateDataVacancys();
            generateDataResumes();
            console.log(4);
            break;
    }
    res.redirect('/')
}

module.exports = {generateData};
