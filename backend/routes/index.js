const userRouter = require('./user')
const authRouter = require('./auth')

const {notFound,errHandle} = require('../middleware/errorHanle')
const initRoutes = (app) => {
    app.use('/', authRouter)
    
    app.use('/user', userRouter)


    app.use(notFound);
    app.use(errHandle);
}

module.exports = initRoutes;
