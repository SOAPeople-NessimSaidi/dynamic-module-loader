// import vm from 'vm';
const vm = require('vm');

async function myCustomLoader(url, moduleName) {
    try {
        // 1. Fetch the module code from the URL
        const response = await fetch(url);
        const code = await response.text();

        // 2. Create a secure sandbox environment (crucial for security)
        const sandbox = { exports: {} };
        //   const context = new vm.ScriptContext(sandbox);
        const context = vm.createContext(sandbox);

        // 3. Execute the fetched code in the sandbox
        const script = new vm.Script(code, { filename: url })
        script.runInContext(context);

        // 4. Return the module exports
        return sandbox.exports;

    } catch (error) {
        console.error(`Error loading module from ${url}:`, error);
        throw error;
    }
}

// Usage example:
const myModule = myCustomLoader('http://localhost:3030/modules/Chip.cjs.js', 'myChip')
    .then( resModule =>
        console.log(resModule.helloWord()) // Assuming the module exports a function
    )
    .catch(error => console.error('Error loading module:', error));
