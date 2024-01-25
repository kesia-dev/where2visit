CREATE TABLE users (
 id SERIAL PRIMARY KEY NOT NULL,
 username  VARCHAR(50) NOT NULL,
 email VARCHAR(150) NOT NULL
 );

CREATE TABLE Categories (
    id SERIAL PRIMARY KEY NOT NULL,
    title VARCHAR(50) NOT NULL,
    catDescription VARCHAR(250),
    dateCreated TIMESTAMP NOT NULL,
    dateUpdated TIMESTAMP NOT NULL,
    is_active BOOLEAN
);

CREATE TABLE Events (
    id SERIAL PRIMARY KEY NOT NULL,
    planName VARCHAR(50) NOT NULL,
    hostName VARCHAR(50),
    dateTimeOfEvent TIMESTAMP NOT NULL,
    dateCreated TIMESTAMP NOT NULL,
    categoryId INT NOT NULL,
    eventLocation  VARCHAR(250),
    FOREIGN KEY (categoryId) REFERENCES Categories(id)
);

CREATE TABLE RestaurantPref (
    id SERIAL PRIMARY KEY NOT NULL,
    eventId INT NOT NULL,
    cuisine VARCHAR(50),
    dietaryRestriction VARCHAR(250),
    priceRange VARCHAR(250),
    rating INT,
    FOREIGN KEY (eventId) REFERENCES Events(id)
);

CREATE TABLE Results (
    id SERIAL PRIMARY KEY NOT NULL,
    noOfResults INT NOT NULL,
    noOfRestaurants INT NOT NULL,
    evantsId INT NOT NULL,
    FOREIGN KEY (evantsId) REFERENCES Events(id)
);