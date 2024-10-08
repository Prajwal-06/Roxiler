# Roxiler

Roxiler project based on fetching and creating own APIs

## Installation

### Backend setup


Clone this repo using

```bash
git clone https://github.com/Prajwal-06/Roxiler.git
```
In backend Directory Install all packages

```bash
cd backend 
npm install
```
Seed data to your Database

But makesure you need to give your mongo server url
```bash
Create database in mongo
```
In .env
```bash
Replace my .env Mongo url with yours with database name
```

Create Database named "Roxiler"

then

```bash
cd init
node index.js
```
After initializing your data in backend directory Start server using

```bash
nodemon app.js
```

### Frontend(using react) Setup

In front-end Directory install all packages

```bash
cd Frontend
npm run dev
```

your project is setup successfully!!

## Have a look

Created Home page which shows transcation with navbar , search handler and pagination 
![Screenshot 2024-10-09 024239](https://github.com/user-attachments/assets/5cddae55-3813-408b-a2d7-d47cf8920099)

Created another page for Statistics at "/statistics" and can be filter by month
![Screenshot 2024-10-09 024252](https://github.com/user-attachments/assets/190cb5ff-060f-4617-9f44-78632f56dd33)

Created another page for rendering Pie Chart at "/pie-chart" and can be filter by month
![Screenshot 2024-10-09 024341](https://github.com/user-attachments/assets/02af9a2f-eaeb-4328-8479-88ab7d49abb6)

Created another page for rendering Bar Graph at "/bar-chart" and can be filter by month
![Screenshot 2024-10-09 024310](https://github.com/user-attachments/assets/36051b6d-ed8e-4baa-848d-bbce7c4c0cec)


