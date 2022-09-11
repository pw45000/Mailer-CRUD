# Mailer-CRUD
A full-stack CRUD built to simulate a mailing list, built in with an admin panel, built in NodeJS Express, Leafletjs, Mapbox Pug,  Bootstrap 5, and MongoDB. 

## Features

 - A login system built in with salting
 - Integration with MongoDB
 - CRUD Operations
 - Geocoding with Leaflet JS and Mapbox, including tooltips and jumping to a contact's location on the map
 - Responsive, professional looking CSS with Bootstrap 5 
 - HTML templating with Pug
 - Server built with Express JS with url routing

## Running
Start up a local MongoDB session on port 27017. You can learn more about it [here](https://www.mongodb.com/basics/create-database#:~:text=In%20MongoDB%20Compass,%20you%20create,Click%20Create%20Database). 

Download and extract the release folder. In your NodeJS command prompt, change your directory to the project's installation. This is done using 
```cd [Your Project Download Directory]```

Afterward, you need to install the modules, simply type ```npm-install.```

Then, type in ```node ./bin/www```, which will start your web server.

Finally, go to ```localhost:3000``` in the web browser of your choice, and you're all set! You should see something similar to the following: ![A picture of the index page.](https://github.com/pw45000/Mailer-CRUD/blob/main/images/sample_page.png?raw=true)
 
## Navigating to the Admin Panel
When going to ```localhost:3000/contacts``` in your browser's URL, you should see the following: ![A picture of the login page.](https://github.com/pw45000/Mailer-CRUD/blob/main/images/login.png?raw=true)

While this being an insecure practice, this is mostly for the use of demonstration, the username and password is: 
```cmps-369```
```finalproject```

If used logged in correctly, you should see the following: 
![A picture of the contact list admin panel, the main source of the CRUD.](https://github.com/pw45000/Mailer-CRUD/blob/main/images/contact_list.png?raw=true)
This is where the majority of the CRUD operations are, and you're feel to explore from here!
