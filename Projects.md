# Ambrosia - 2021
Introduction
Ambrosia is an Android calories tracker app providing users with an easy-to-use, food tracking and recording mobile application to monitor its users' food intake. It aims to simplify the often long and annoying process of monitoring nutritional intake by allowing users to quickly add it to the user's records either through QR code scanning or manual recording.

Ambrosia is built with the side functionality of allowing food vendors, particularly those who cater towards healthy eating, to take advantage of the QR code scanning feature. Vendors can create their Ambrosia vendor accounts and register their restaurants and food items' nutritional information in Ambrosia. The food items will then have a QR code that Ambrosia users can quickly scan and add it to their nutritional records.

Ambrosia utilises Google's Firebase to handle authentication and Firestore to hold user's nutritional intake history. This app was developed for a project assignment that I had as a student.
https://github.com/Kzeezee/AmbrosiaApp

# MyCelsius - 2022
MyCelsius is a temperature submission and tracking automation application for organisations. It seeks to allow for a quicker and more simplified way for staff members or visitors to submit their temperature for their organisation without sacrificing the lack of verification from the submission and ease of use during the COVID-19 pandemic.

MyCelsius is a JavaFX application integrated with Firebase using Firebase Admin SDK that I developed as a school project. An Internet connection is required for the application to work.

Goals of MyCelsius
The project's goals included two major aspects:

JavaFX user application where users manage and view temperature submission records
Telegram Bot that facilitate the temperature recording process with the recording and verification of the submission records
This repository combines both the Telegram Bot and the user application. Therefore, running the program will start both the JavaFX user application and the Telegram Bot server. The project integrates with Firebase using the Firebase Admin SDK. The merging of the functionalities is mainly to achieve a minimum viable product (MVP) without complicating the software stack, but mainly to satisfy the project submission requirements.

https://github.com/Kzeezee/MyCelsius

# Pomodoko - 2025
Pomodoko
Pomodoko is your typical Pomodoro counter application with a task system built-in. It is a cross-platform desktop application and is built using Tauri and Svelte. The project was started as a way to experiment and develop something light in Tauri to get used to cross-platform app development with web frameworks on the frontend.

Features
The full list of features include:

Pomodoro counter (Pomodoro, Short Rest, Long Rest)
Settings to customize preferred duration for the above 3 states using Svelte Stores
Task system to allow you to keep track of tasks for the session
Tasks are dynamically saved on the local SQLite database for persistence
Notification alerts when there is a change of state (e.g. from Pomodoro to rest)
Autostart application on boot to get right back to work

https://github.com/Kzeezee/Pomodoko

# TARIFF - 2025
TARIFF
Overview
TARIFF is an application designed to help international traders navigate current tariff conditions in the global market. This can be used for simulating the costs incurred by tariffs, finding optimal routes to minimise those costs and give real-time updated information on trade tariffs at present. Collaboration with UBS Bank.

Features
User Authentication: Secure login system for users and admins
Tariff Calculation: Calculate the costs incurred for different products across countries
Tariff Calculation History: Save your calculations for future reference
Trade Route Optimization: Find the most cost-effective shipping routes to minimize expenses incurred
Real-time Updates: Live tariff and trade policy news
Admin Dashboard: Admin interface for tariff rule and product category management
Settings: Change the theme of the website from light to dark mode based on user's preference
Modern UI: Built with Svelte, TailwindCSS, and daisyUI for responsive design
Robust Backend: Scalable Spring Boot REST API
Secure Database: PostgreSQL database with proper data modeling
Tech Stack
Frontend
Framework: SvelteKit 2.22
Language: TypeScript 5.0
Styling: TailwindCSS 4.1 + daisyUI 5.1
Testing: Vitest 3.2 (unit), Playwright 1.49 (E2E)
Build Tool: Vite 7.0
Code Quality: ESLint, Prettier
Backend
Framework: Spring Boot 3.5.5
Language: Java 17
Database: PostgreSQL 16
ORM: Spring Data JPA (Hibernate)
Build Tool: Gradle 8.14
Testing: JUnit 5, Spring Boot Test, JaCoCo
Security: Spring Security + OAuth2 + JWT (Nimbus JOSE)
API Documentation: SpringDoc OpenAPI 2.8 + SwaggerUI
Object Mapping: MapStruct 1.6
AI Integration: Spring AI 1.0 (OpenAI)
Code Quality: SonarQube/SonarCloud
DevOps & Tools
Containerization: Docker
CI/CD: GitHub Actions
Code Analysis: SonarCloud
Issue Tracking: JIRA
PR Reviews: CodeRabbit
https://github.com/TheMajoris/TARIFF

# GooseDB - 2026
A single-threaded, specialised query processor for TPC-H Query 19, written in Rust.

goosedb exploits domain-specific knowledge about Q19's data access patterns to outperform DuckDB on this query. The core techniques are aggressive predicate pushdown (both scans filtered before the join) and Parquet dictionary encoding preservation (string columns read as compact integer keys instead of multi-byte strings).
https://github.com/Kzeezee/goose-db

# Servo - 2026

## Project Overview

Servo is an LLM routing and cost optimization platform. It classifies user prompts by complexity and routes them to the cheapest appropriate model tier, targeting up to 80% inference cost savings. Built as a CS206 (SPM) university project.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router), React 19 |
| Language | TypeScript 5 (strict mode) |
| Styling | Tailwind CSS 4 + shadcn/ui (Radix UI) |
| Auth | Clerk (`middleware.ts`) |
| Database | Supabase (PostgreSQL) |
| Graph UI | @xyflow/react (routing diagram) |
| Charts | Recharts |
| SDKs | JS/TS SDK (`SDK/NPM SDK/`), Python SDK (`SDK/Python SDK/`) |
| Validation | Zod + React Hook Form |
https://github.com/itsnotkx/Servo