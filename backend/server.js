import express from 'express';
import authRouter from './Routes/auth.router.js'
import movieRouter from './Routes/movie.router.js'
import tvRouter from './Routes/tv.router.js'
import searchRouter from './Routes/search.router.js'
import { ENV_VARS } from './Config/envVars.js'
import { dbConnect } from './Config/dbConnect.js';
import { protectRoute } from './Middlewares/protectRoute.js';
import cookieParser from 'cookie-parser';
import path from 'path';

const app = express();

const PORT = ENV_VARS.PORT;
const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/auth', authRouter);

app.use('/api/v1/movie', protectRoute , movieRouter);

app.use('/api/v1/tv', protectRoute , tvRouter);

app.use('/api/v1/search', protectRoute , searchRouter);

if(ENV_VARS.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, 'frontend/dist')));
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname, 'frontend/dist/index.html'));
    })
}
app.listen(PORT,()=>{
    console.log(`Server started at http://localhost:${PORT}.`);
    dbConnect();
})