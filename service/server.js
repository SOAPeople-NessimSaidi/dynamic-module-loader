// Install node-fetch using: npm install node-fetch
// import nodeFetch from 'node-fetch';

// import fetch from 'node-fetch';
// import { promises as fsPromises } from 'fs';
// import { URL } from 'url';
import vm from 'vm';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function wrapCode(code) {
    // Wrap code in a CommonJS module format
    const wrappedCode = `
        (function (exports, require, module, __filename, __dirname) { 
            ${code} 
        })(exports, require, module, __filename, __dirname);
    `;

    // Create a new context for the module
    const module = { exports: {} };
    const context = {
        exports: module.exports,
        require: require,
        module: module,
        __filename: __filename,
        __dirname: __dirname
    };
    const script = new vm.Script(wrappedCode);
    const vmContext = vm.createContext(context);

    // Run the script in the context
    script.runInContext(vmContext);

    return module.exports;
}

async function loadModule(url) {
    try {
        const response = await fetch(url);
        const code = await response.text();

        // Create a new context for the module
            // const context = { exports: {} };
        // const context = { require };
        
            // vm.createContext(context);

        // Evaluate the module code in the context
        // const wrappedCode = `(function(exports, require, module, __filename, __dirname) { ${code} })(context.exports, require, context, __filename, __dirname);`;
        // const wrappedCode = `
        //     const module = { exports: {} };
        //     const exports = module.exports;
        //     (function (exports, require, module, __filename, __dirname) { ${code} })(exports, require, module, __filename, __dirname);
        //     return module.exports;
        // `;
        
        const moduleExports = wrapCode(code);
        return moduleExports;
            // const script = new vm.Script(wrappedCode);
            // // const script = new vm.Script(wrappedCode);
            // script.runInContext(context);

            // return context.exports;
    } catch (error) {
        console.error(`Error loading module from ${url}:`, error);
        throw error;
    }
}

async function loadModules(moduleUrls) {
    const modules = await Promise.all(moduleUrls.map(loadModule));
    modules.forEach((module, index) => {
        console.log(`Module ${index} loaded:`, module);
        if (module.hello) {
            module.hello();
        } else {
            console.log('No hello function found in module', index);
        }
    });
}

// Example: List of module URLs
// const moduleUrls = [
//     'http://localhost:3030/modules/module1.js',
//     'http://localhost:3030/modules/module2.js'
// ];

const moduleUrls = [
    'http://localhost:3030/modules/Chip.cjs.js',
    // 'http://localhost:3030/modules/Chip.esm.js'
];

loadModules(moduleUrls).catch(error => console.error('Error loading modules:', error));
