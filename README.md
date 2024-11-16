# Deployment Guide for Local Development
> If you want to run using local backend, see disclaimer on bottom. Will fix later, sorry
## Quick Start (node.js installed)
```bash
git clone https://github.com/brandonchui/csci201.git
cd csci201
npm install
npm run dev
```

## Important Updates ⚠️

### Always Update Your Local Repository
```bash
git pull origin main
npm install
```

---
# Running the Frontend

## Prerequisites

1. **Node.js** (latest)
    - [Download Node.js](https://nodejs.org/)

Make sure your `npm` command works and `node -v` works:
```bash
node -v
v23.2.0
```


## How to run frontend locally

### 1. Clone the Repository
```bash
git clone https://github.com/brandonchui/csci201.git
cd csci201
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start localhost Server
```bash
npm run dev
```

You should see output similar to this:
```bash
brandchui@brandchui-linux: /Desktop/csci201$ npm run dev
> dev
> remix vite:dev
    -> Local: http://localhost:5173/
    -> Network: use --host to expose
    - press h + enter to show help
```

### 4. Access the Application
- Open any browser
- Navigate to [http://localhost:5173](http://localhost:5173)
  - or whatever you have on your thing
- You should now see the application running locally though things might look odd since it's loading things

### 5. Stopping the Server
- Press `Ctrl + C` in the terminal where the server is running

---
## Important Note About API Endpoints

⚠️ **DISCLAIMER**: The api fetching is currently pointed to an online sample for testing purposes, so you need to point it to the local machine if you want the front end to work

### How to Change API Endpoints to Localhost

1. **Find API Endpoints**
    - Open your code editor's search tool (usually Ctrl+Shift+F or Cmd+Shift+F)
    - Search for common API patterns like:
        - `fetch(`
        - `axios.get(`
        - `https://`
        - `.api.`

2. **Replace URLs (on routes.tsx files)**
    - Change URLs from:
   ```javascript
   // currently
   fetch('https://api.example.com/data')
   // or
   axios.get('https://api.example.com/data')
   ```
    - To localhost:
   ```javascript
   // if you want to point to local
   fetch('http://localhost:3000/data')
   // or
   axios.get('http://localhost:3000/data')
   ```
