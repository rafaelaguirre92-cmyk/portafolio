const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');
code = code.replace(/<!--/g, '{/*').replace(/-->/g, '*/}');
fs.writeFileSync('src/App.tsx', code, 'utf8');
console.log('Fixed comments');
