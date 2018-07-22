// .envを展開
dotenv = require('dotenv');
let options = {};
if (process.env.NODE_ENV === 'production') {
    options.path = '.env.production';
}
dotenv.config(options);

function middleware(value) {
    if (value === "true") return true;
    if (value === "false") return false;
    if (value === "0" || value === 0) return 0;
    return value || null;
}

exports.getEnvs = () => {
    let env = {};
    for (let key in process.env) {
        if (process.env[key]) {
            env['process.env.' + key] = JSON.stringify(middleware(process.env[key]));
        }
    }
    return env;
};