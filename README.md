<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## About Laravel

Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable and creative experience to be truly fulfilling. Laravel takes the pain out of development by easing common tasks used in many web projects, such as:

- [Simple, fast routing engine](https://laravel.com/docs/routing).
- [Powerful dependency injection container](https://laravel.com/docs/container).
- Multiple back-ends for [session](https://laravel.com/docs/session) and [cache](https://laravel.com/docs/cache) storage.
- Expressive, intuitive [database ORM](https://laravel.com/docs/eloquent).
- Database agnostic [schema migrations](https://laravel.com/docs/migrations).
- [Robust background job processing](https://laravel.com/docs/queues).
- [Real-time event broadcasting](https://laravel.com/docs/broadcasting).

Laravel is accessible, powerful, and provides tools required for large, robust applications.

## Learning Laravel

Laravel has the most extensive and thorough [documentation](https://laravel.com/docs) and video tutorial library of all modern web application frameworks, making it a breeze to get started with the framework.

In addition, [Laracasts](https://laracasts.com) contains thousands of video tutorials on a range of topics including Laravel, modern PHP, unit testing, and JavaScript. Boost your skills by digging into our comprehensive video library.

You can also watch bite-sized lessons with real-world projects on [Laravel Learn](https://laravel.com/learn), where you will be guided through building a Laravel application from scratch while learning PHP fundamentals.

## Agentic Development

Laravel's predictable structure and conventions make it ideal for AI coding agents like Claude Code, Cursor, and GitHub Copilot. Install [Laravel Boost](https://laravel.com/docs/ai) to supercharge your AI workflow:

```bash
composer require laravel/boost --dev

php artisan boost:install
```

Boost provides your agent 15+ tools and skills that help agents build Laravel applications while following best practices.

## Contributing

Thank you for considering contributing to the Laravel framework! The contribution guide can be found in the [Laravel documentation](https://laravel.com/docs/contributions).

## Code of Conduct

In order to ensure that the Laravel community is welcoming to all, please review and abide by the [Code of Conduct](https://laravel.com/docs/contributions#code-of-conduct).

## Security Vulnerabilities

If you discover a security vulnerability within Laravel, please send an e-mail to Taylor Otwell via [taylor@laravel.com](mailto:taylor@laravel.com). All security vulnerabilities will be promptly addressed.

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).





# Laravel + React Exam Boilerplate

A reusable full-stack boilerplate using Laravel, React (JavaScript JSX), Vite, and MySQL. Designed for CRUD systems and timed programming exams.

## Tech Stack

- **Backend:** Laravel 13
- **Frontend:** React (JavaScript JSX) + Vite
- **API Requests:** Axios
- **Database:** MySQL
- **Development Tools:** Composer, Node.js, npm, Git, and VS Code

## Prerequisites

Install the following before setting up the project:

- PHP compatible with the Laravel version
- Composer
- Node.js and npm
- MySQL through XAMPP or Laragon
- Git
- Visual Studio Code (recommended)

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/jhnyz/boilerplate.git
cd boilerplate
```

### 2. Install Dependencies

Install the Laravel dependencies:

```bash
composer install
```

Install the frontend dependencies:

```bash
npm install
```

### 3. Configure the Environment

Create your local environment file:

**Windows PowerShell:**

```powershell
Copy-Item .env.example .env
```

Generate the Laravel application key:

```bash
php artisan key:generate
```

### 4. Create the MySQL Database

Start MySQL through XAMPP or Laragon.

Open phpMyAdmin and create a database named:

```text
exam_db
```

### 5. Configure Database Credentials

Open the `.env` file and configure your database settings according to your local MySQL setup:

```dotenv
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=exam_db
DB_USERNAME=root
DB_PASSWORD=
```

Update the username and password if your MySQL configuration is different.

### 6. Run Database Migrations

```bash
php artisan migrate
```

This creates the database tables required by the application.

## Running the Application

You need two terminal windows.

### Terminal 1: Start the Laravel Backend

```bash
php artisan serve
```

Backend URL: `http://127.0.0.1:8000`

### Terminal 2: Start the React Frontend Build Server

```bash
npm run dev
```

Open the application in your browser:

`http://127.0.0.1:8000`

Keep both terminal processes running while using the application.

## Features

- Product CRUD (Create, Read, Update, Delete)
- Laravel API endpoints
- React dashboard
- Search and product management interface
- MySQL database integration
- Responsive user interface

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/products` | Retrieve all products |
| POST | `/api/products` | Create a product |
| GET | `/api/products/{id}` | Retrieve a specific product |
| PUT/PATCH | `/api/products/{id}` | Update a product |
| DELETE | `/api/products/{id}` | Delete a product |

## Troubleshooting

**Database connection error**

- Ensure MySQL is running.
- Check the database name and credentials in `.env`.
- Confirm that the `exam_db` database exists.

**Missing dependencies**

```bash
composer install
npm install
```

**Application key missing**

```bash
php artisan key:generate
```

**Database tables missing**

```bash
php artisan migrate
```

## Security Notes

- Never commit the `.env` file.
- Do not upload passwords, API keys, or other secrets to GitHub.
- Keep `.env.example` free of real credentials.

## License

For educational and personal project use.
