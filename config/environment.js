const development = {
    name: 'development',
    asset_path: './assets',
    session_cookie_key: 'blahsomething',
    db: 'codeial_development',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'suyashmankar9@gmail.com',
            pass: 'tmmfqznubxldnnpk' // get this from google account
        }
    },
    google_client_id: "555662117399-hpj435qat8reu1t626l6umqm4eusnui7.apps.googleusercontent.com",
    google_client_secret: "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",
    google_callback_url: "http://localhost:8000/users/auth/google/callback",
    jwt_secret: 'codeial',
    
}

const production = {
    name: 'production'
}


module.exports = development;