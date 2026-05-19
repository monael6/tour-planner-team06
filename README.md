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

Current status for the intermediate submission:

- Angular frontend is implemented
- Bootstrap styling is included
- Routing is implemented
- Tour overview is available
- Tour detail page is available
- Create tour form is available
- Frontend loads tour data from the Spring Boot backend
- New tours can be created through the frontend and sent to the backend

## Next Steps

Planned features for the final submission:

- PostgreSQL database
- JPA / Hibernate persistence
- Full CRUD functionality
- Tour logs connected to backend
- Map integration
- Import and export functionality
- Unit tests
- Logging