# Student Recruitment Dashboard

This project is a simple and clean student recruitment dashboard built using HTML, CSS, and JavaScript. It is designed to manage student leads without any backend, using the browser’s localStorage for data persistence.

## Overview

The application works as a single-page dashboard where users can add student details, view them in a structured table, and filter or search through the data. The interface follows a CRM-style layout with a sidebar, navigation, and organized sections.

## Features

### Add Student

Users can add a new student by filling out a form with:

* Name
* Email
* Course Interest
* Status (New, Contacted, Enrolled)

The form includes validation and provides feedback after submission. Data is stored in localStorage and the form resets automatically.

### View Students

All stored students are displayed in a table showing:

* Name (with avatar initials)
* Email
* Course Interest
* Status

Users can also delete students from the list.

### Search and Filter

* Search students by name or course
* Filter students by course interest
* Table updates dynamically without page reload

### Data Persistence

All data is stored in localStorage, so it remains available after refreshing the page.

## User Interface

The dashboard includes:

* A top navigation bar
* A fixed sidebar with section switching
* A main content area with dynamic rendering

The UI is styled using Bootstrap with additional custom CSS for spacing, layout, and improved visuals.

## Tech Stack

* HTML
* CSS and Bootstrap
* JavaScript
* localStorage

## Project Structure

project/
│
├── index.html
├── styles.css
└── script.js

## AI Tools Used

* Antigravity (main development tool)
* Gemini (used for generating structured prompts and refining logic)
* Claude Sonnet 4.6 (used for improving UI and code structure)

These tools were used to speed up development, generate base layouts, and refine functionality.

## Example Prompt Used

Build a modern, clean web dashboard for managing student recruitment using:

HTML
CSS / Bootstrap
JavaScript
localStorage

No backend or server required.

Core Concept:

This project is a mini CRM dashboard where users can:

* Add student details
* View all students
* Filter/search students

Application Type:

* Single Page Application (SPA)
* Uses dynamic UI switching without page reload

## Manual Changes and Fixes

* Improved the UI design of the Add Student form for better spacing and alignment
* Fixed a border visibility issue in the filter dropdown section on the View Students page


## Challenges and Solutions

### Managing localStorage Data

Challenge: Handling data storage and retrieval properly using JSON.
Solution: Used JSON.stringify and JSON.parse consistently and maintained a structured array of student objects.


## How to Run

1. Download or copy the project files
2. Open index.html in a browser
3. Start adding and managing students

No server or installation is required.

## Conclusion

This project demonstrates how to build a structured and functional dashboard using only frontend technologies. It focuses on clean UI design, modular JavaScript logic, and effective use of localStorage for persistent data handling.
