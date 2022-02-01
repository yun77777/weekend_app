const jwt = require('jsonwebtoken');

const authMiddleware  = async (req, res, next) => {
    const accessToken = req.header('Autorization');
    // const accessToken = req.cookies.accessToken;
    res.cookie('testCookie','cookie!');
    console.log('req.cookies: ', req.cookies);
    console.log('req.cookies: ', req.cookies.testCookie);
    
    if(!accessToken) {
        res.status(403).json({error: true, message: 'failed to authenticate'})
    } else {
        try {
            const token = await new Promise((resolve, reject) => {
                jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET,
                    (err, decoded) => {
                        if(err) reject(err);
                        else resolve(decoded);
                    });
            });
            req.token = token;
            next();
        } catch(err) {
            console.log(err);
            res.status(403).json({error: true, message: 'failed to authenticate'})
        }
        
    }
}

module.exports = authMiddleware;