DROP TABLE  IF EXISTS HistoryVacancy;
DROP TABLE  IF EXISTS HistoryResume;
DROP TABLE  IF EXISTS Resume;
DROP TABLE  IF EXISTS Vacancy;
DROP TABLE  IF EXISTS SubCategory;
DROP TABLE  IF EXISTS Category;
DROP TABLE  IF EXISTS User1;
DROP TABLE  IF EXISTS Location;
DROP TABLE  IF EXISTS City;
DROP TABLE  IF EXISTS Country;










CREATE TABLE IF NOT EXISTS Country(
    id SERIAL PRIMARY KEY,
    name varchar(100)
);
CREATE TABLE IF NOT EXISTS City(
    id SERIAL PRIMARY KEY,
    name varchar(100),
    id_country bigint,
    FOREIGN KEY(id_country) REFERENCES Country(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS Location(
    id SERIAL PRIMARY KEY,
    name varchar(100),
    id_city bigint,
    FOREIGN KEY(id_city) REFERENCES City(id) ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS Client (
    id SERIAL PRIMARY KEY,
    nick varchar(20) NOT NULL,
    email varchar(40) NOT NULL,
    hashedPassword varchar(50) NOT NULL,

    locationId bigint,
    FOREIGN KEY(locationId) REFERENCES Location(id),

    role varchar(10),

    created timestamp DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Category(
    id SERIAL PRIMARY KEY,
    name varchar(50)  NOT NULL
);
CREATE TABLE IF NOT EXISTS SubCategory(
    id SERIAL PRIMARY KEY,
    name varchar(50)  NOT NULL,
    id_category bigint  NOT NULL,
    FOREIGN KEY(id_category) REFERENCES Category(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Vacancy(
    id SERIAL PRIMARY KEY,
    company varchar(50),
    type varchar(30),
    logo varchar(1000),
    url varchar(1000),
    position varchar(100),
    description text,
    isPublic BIT,

    phone varchar(100),
    token varchar(50),

    created timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,

    creatorId bigint  NOT NULL,
    FOREIGN KEY(creatorId) REFERENCES Client(id) ON DELETE CASCADE,

    subCategoryId bigint,
    FOREIGN KEY(subCategoryId) REFERENCES SubCategory(id),

    locationId bigint,
    FOREIGN KEY(locationId) REFERENCES Location(id)
);
CREATE TABLE IF NOT EXISTS Resume(
    id SERIAL PRIMARY KEY,
    name varchar(50),
    surname varchar(50),
    age smallint,
    type varchar(50),
    position varchar(100),
    description text,
    isPublic BIT,

    locationId bigint,
    FOREIGN KEY(locationId) REFERENCES Location(id),

    subCategoryId bigint,
    FOREIGN KEY(subCategoryId) REFERENCES SubCategory(id),

    FOREIGN KEY(id) REFERENCES Client(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS HistoryVacancy(
    id SERIAL PRIMARY KEY,
    isFavorite BIT  NOT NULL,
    id_user bigint  NOT NULL,
    FOREIGN KEY(id_user) REFERENCES Client(id) ON DELETE CASCADE,
    id_vacancy bigint  NOT NULL,
    FOREIGN KEY(id_vacancy) REFERENCES Vacancy(id)
);
CREATE TABLE IF NOT EXISTS HistoryResume(
    id SERIAL PRIMARY KEY,
    isFavorite BIT  NOT NULL,
    id_user bigint unsigned  NOT NULL,
    FOREIGN KEY(id_user) REFERENCES Client(id) ON DELETE CASCADE,
    id_resume bigint unsigned  NOT NULL,
    FOREIGN KEY(id_resume) REFERENCES Resume(id)
);




