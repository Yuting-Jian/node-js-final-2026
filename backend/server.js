const app = require('./app')
const dataSource = require('./db/dataSource')

const port = Number(process.env.PORT) || 3000;

const startServer = async () => {
    try{
        await dataSource.initialize()
        app.listen( port, ()=>{
            console.log(`Server listening on 0.0.0.0:${port}`);
        })
    }catch(err){
        console.error('Error starting server:', err)
    } 
}

startServer()
