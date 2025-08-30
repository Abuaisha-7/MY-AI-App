import concurrently from 'concurrently';

concurrently([
    { command: 'cd packages/client && npm run dev', 
        name: 'client', 
        prefixColor: 'blue'
     },
    { command: 'cd packages/server && npm run dev', 
        name: 'server', 
        prefixColor: 'green' 
    }
]);