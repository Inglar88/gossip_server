import { vk } from '../../config/index';
import methods from '../methods/index';

class Bot {

  // Передаем контекст методам бота
  static setMethodsContext(methods,context) {
    for (let funName in methods) {
      let _method = methods[funName];
      methods[funName] = _.bind(_method,context);
    }
    return methods
  }


  constructor(settings={}) {

    /**
     * Дефолтные настройки бота
     * @type {{}}
     */
    let default_data = {
      ...vk,
      botsLongPollParams : false
    }

    /**
     * Объект с экшенами где эвенту соответствует коллбек
     */
    this.actions= {
      // Задается методом inst.event(event || [event],callback)
      events: []
    }

    /**
     * Обновляем настройки
     */
    this.settings = _.extend(default_data,settings)

    /**
     * Добавляем методы из methods/index в инстанс бота и передает им контекст
     */
    _.extend(this,Bot.setMethodsContext(methods,this))


  }
}

export default Bot
