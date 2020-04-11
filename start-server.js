const path = require('path');
const cp = require('child_process')
const args = [ '--watch',  path.join("db", "db.json"), "--port", "3001"];
const opts = { stdio: 'inherit', shell: true };
cp.spawn('json-server', args, opts);