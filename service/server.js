// Install node-fetch using: npm install node-fetch
// import nodeFetch from 'node-fetch';

async function loadModules(moduleUrls) {
    const modules = await Promise.all(moduleUrls.map(url => import(url)));
    modules.forEach((module, index) => {
        console.log(`Module ${index} loaded:`, module);
        // You can now use the module's exports
        if(module.init) {
            module.init();
        }
    });
}

// Example: List of module URLs
const moduleUrls = [
    'http://localhost:3030/modules/module1.js',
    'http://localhost:3030/modules/module2.js'
];

loadModules(moduleUrls).catch(error => console.error('Error loading modules:', error));
