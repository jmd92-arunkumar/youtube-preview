# youtube-preview App

## Overview
This project implements a YouTube-like video preview feature, built using React (TypeScript), Laravel, and Inertia.js. It displays videos in a grid format, supporting hover-to-play functionality, mute/unmute options, and video controls. This README will guide you through the setup, installation, and development process for the platform.


## Technologies Used
- **Frontend**: React.js (with TypeScript), Shadcn UI, Tailwind CSS.
- **Backend**: Laravel 12, Inertia.js.
- **Database**: SQLite (for video data).
- **Video Player**: React Player for embedded video playback.

## Prerequisites
Before running the project, make sure you have the following installed:
- **Node.js** (version 14.x or later)
- **PHP** (version 7.4 or later)
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
   - Navigate to the `backend` folder:
     ```bash
     cd backend
     ```
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

5. **Run Migrations**:
   - Run the migrations to set up the database:
     ```bash
       php artisan migrate
     ```

6. **Start the Development Server**:
   - Start the Laravel server:
     ```bash
       php artisan serve
     ```
   - Start the React development server:
     ```bash
       npm run dev
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
3. Run Migrations:
   - Ensure your database is up-to-date by running migrations:
      ```bash
      php artisan migrate
     ```
4. Run Seeders (Optional, to Seed Dummy Data):
   - If you want to populate your database with some dummy data, run:
       ```bash
       php artisan db:seed
      ```
5. For this project to seed the dummy video files please run below command:
    ```bash
       php artisan db:seed --class=VideoSeeder
    ```

## Start the application
1. Run the composer command below to start the frontend and backend in dev mode
   ```bash
   composer run dev
   ```
2.  To run the application in prod mode for
  - Frontend run the below
    ```bash
    npm run prod
    ```
  - Backend needs to be setup with the apache server or by running
    ```bash
      php artisan serve
    ```


![image](https://github.com/user-attachments/assets/9935a178-f8e7-4cff-8f09-1663f9edaae3)

