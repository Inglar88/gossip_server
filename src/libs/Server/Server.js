const bodyParser = require('body-parser')
const express = require('express')
const mongoose = require('mongoose')
import db from './models/db';
import Bot from '../Bot/Bot';



class Server {
  constructor(settings) {
    this.settings = {...settings}
    this.app = express()
    this.mongoose = mongoose
  }

  runBot() {
    return new Promise((resolve,reject) => {
      this.bot = new Bot();
      this.subscribe();
      try {
        this.bot.listen();
      } catch (e) {
        reject(e)
      }
    });
  }


   runIO() {
    return new Promise((resolve,reject) => {
      // Если что-то не так, то реджектим
      setTimeout(()=>{console.log('ioRunning');resolve()},5000)
    })
  }

  runServer() {
    let { app, settings } = this;
    return new Promise((resolve,reject) => {
      app.use(bodyParser.json())
      //napp.post('/', bot.listen)
      try {

        app.listen(settings.port, () => {
          console.log(`The server was running at ${settings.port} port.`);
          resolve();
        })
      } catch (e) {
        reject(e);
      }
    })
  }

  run() {
    /**
     * Подключаем базу данных
     */
    this.connectDB()
    /**
     * Запускаем сервер IO
     */
      .then(() => {
        return this.runIO()
      })
      .then(()=> {
        /**
         * Запускам http сервер
         */
        return this.runServer()
      })
      .then(() => {
        /**
         * В последнюю очередь запускаем
         */
        return this.runBot()
    })
      .catch(err => {
        console.log(err)
      })
  }

  subscribe() {
    this.bot.event(['wall_post_new'],function (ctx) {
      console.dir(ctx)
    });

  }

  connectDB() {
    return new Promise((resolve,reject) => {
       this.mongoose = db(this.settings,resolve,reject);
    })
  }
}

export default Server
