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
   git clone https://github.com/your-username/your-repository-name.git
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

##Development Setup
1. Run Laravel Config Cache and Clear Cache:
   - Clear any existing configuration and cache:
     ```bash
        php artisan config:cache
     ```
     ```bash
        php artisan cache:clear
     ```
2. Run Migrations:
   - Ensure your database is up-to-date by running migrations:
      ```bash
      php artisan migrate
     ```
4. Run Seeders (Optional, to Seed Dummy Data):
   - If you want to populate your database with some dummy data, run:
       ```bash
       php artisan db:seed
      ```

## Start the application
1. Run the composer command below to start the frontend and backend in dev mode
   ```bash
   composer run dev
   ```


![image](https://github.com/user-attachments/assets/9935a178-f8e7-4cff-8f09-1663f9edaae3)

