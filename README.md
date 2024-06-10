# Dynamic Module Loading Project

This project demonstrates dynamic module loading in both browser and Node.js environments. The project is divided into three parts:
1. **Browser Client** (Folder: `client`)
2. **Module Server** (Folder: `moduleserver`)
3. **Node.js Client** (Folder: `service`)

## Project Structure

.\
├── client\
│ ├── index.html\
│ └── ... (other static assets)\
├── moduleserver\
│ ├── server.js\
│ └── modules\
│ ├── module1.js\
│ └── module2.js\
└── service\
├── service.js\


## Setup

### Prerequisites

- Node.js installed
- A code editor (Visual Studio Code recommended) (optional)
- Live Server extension for Visual Studio Code (for serving the client folder) (optional)

### Module Server

1. Navigate to the `moduleserver` folder:
```bash
   cd moduleserver
```
#### Install the dependencies:

```bash
    npm install
```

#### Start the module server:

```bash
node server.js
```

The server will run at http://localhost:3000 and serve the modules from the modules directory.

### Browser Client
1. Open the client folder in Visual Studio Code.

2. Start Live Server:

    - Right-click on index.html and select "Open with Live Server".
    - The client will be served, usually at http://127.0.0.1:5500.
3. Open the browser console (F12 or right-click and select "Inspect") to see the logs and confirm that the modules are loaded correctly.

### Node.js Client (NOT WORKING YET)
1. Navigate to the service folder:

```bash
cd service
```
2. Install the dependencies:

```bash
npm install
```

3. Start the Node.js client:

```bash
node service.js
```
The service will dynamically load the modules and log the results to the console.

## Example Module (module1.js)
All modules in this example have an init() function that is being called by the module loader. This would be required most likely in a real-world scenario as well in order to properly load the module. Also, the unified module should ideally implement a standardized interface that yet has to be defined.

Here's an example module (modules/module1.js) to be placed in the modules directory:

```javascript
// module1.js
export function init() {
    console.log('Module 1 initialized');
}
// additional module functionality that is exposed
export function hello() {
    console.log('Hello from module1!');
}
```