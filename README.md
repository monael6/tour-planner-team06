# Tour Planner Frontend

This is the Angular frontend for the Tour Planner semester project.

The application allows users to view tours, search tours, open tour details and create new tours.
The frontend is connected to a Spring Boot backend through a REST API.

## Technologies

- Angular
- TypeScript
- Bootstrap
- HTML
- CSS
- REST API
- HTTP / JSON communication

## Features

- Tour overview page
- Tour detail page
- Create tour form
- Search tours
- Navigation bar
- Angular routing
- Bootstrap layout
- Connection to Spring Boot backend

## Backend Connection

The frontend communicates with the Spring Boot backend.

Backend base URL:

http://localhost:8080

Used API endpoints:

- GET http://localhost:8080/api/tours
- GET http://localhost:8080/api/tours/{id}
- POST http://localhost:8080/api/tours

The backend must be running before starting the frontend.

## How to Start the Frontend

Open a terminal in the frontend project folder:

cd ~/Desktop/tour-planner-frontend

Install dependencies:

npm install

Start the Angular development server:

ng serve

Open the application in the browser:

http://localhost:4200

Tour overview:

http://localhost:4200/tours

## Project Status

All planned features for the final submission have been implemented:

- Angular frontend with Bootstrap styling
- UI components and forms for full CRUD (tours and logs)
- Leaflet map integration to display routes
- JWT authentication (login, register, and automatic header interceptor)
- PDF report downloads (single tour and summary)
- JSON backup import and export for tours
- Unit tests (Jasmine & Karma)