# youtube-preview App

## Overview
This project implements a YouTube-like video preview feature, built using React (TypeScript), Laravel, and Inertia.js. It displays videos in a grid format, supporting hover-to-play functionality, mute/unmute options, and video controls. This README will guide you through the setup, installation, and development process for the platform.


## Technologies Used
- **Frontend**: React.js (with TypeScript), Tailwind CSS.
- **Backend**: Laravel 12, Inertia.js.
- **Database**: SQLite (for video data).

## Prerequisites
Before running the project, make sure you have the following installed:
- **Node.js** (version 20.x or later)
- **PHP** (version 8.3 or later)
- **Composer** (for managing PHP dependencies)
- **SQLite** (for the database)

## Setting Up the Project

1. **Clone the repository**:
   ```bash
    git clone https://github.com/jmd92-arunkumar/youtube-preview.git
    ```
   ```bash
   cd youtube-video-preview
   ```

2. **Install Frontend Dependencies**:
   - Install dependencies for React and frontend:
     ```bash
     npm install
     ```

3. **Set Up the Backend**:
   - Install PHP dependencies with Composer:
     ```bash
     composer install
     ```
     
4. **Set Up Environment**:
   - Copy the `.env.example` file to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Set the database configuration to use SQLite:
     ```dotenv
     DB_CONNECTION=sqlite
     DB_DATABASE=database/database.sqlite
     ```

5. Generate Application Key 
    ```bash
        php artisan key:generate
    ```



## Development Setup
1. Create database/database.sqlite:
    - In Powershell
      ```bash
          New-Item -ItemType File -Path "database/database.sqlite"
      ```
    - In CMD
      ```bash
          type nul > database\database.sqlite
      ```
2. Run Migrations:
   - Ensure your database is up-to-date by running migrations:
      ```bash
      php artisan migrate
     ```


3. Run Seeders:
  - Run the seeder to populate the database with dummy data:
      ```bash
         php artisan db:seed --class=VideoDetailSeeder
     ```

4. Run Laravel Config Cache and Clear Cache:
   - Clear any existing configuration and cache:
     ```bash
        php artisan config:cache
     ```
     ```bash
        php artisan cache:clear
     ```

## Start the application
1. Run the composer command below to start the frontend and backend in dev mode
   ```bash
   composer run dev
   ```

  ## Sample Application

  Here is a preview of the application in action:

  ![YouTube Preview App](https://github.com/user-attachments/assets/9935a178-f8e7-4cff-8f09-1663f9edaae3)

  This image demonstrates the grid layout of videos with hover-to-play functionality. Each video can be muted/unmuted and controlled directly from the interface.


