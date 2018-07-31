/**
 * Функция добавляет в массив инстанса, actions.events, объект с именем ивента и соответствующий ему коллбек
 * @param _eventsNames || [_eventsName]
 * @param callback
 */
export default function (_eventsNames,callback) {
  let {events} = this.actions;
  if(!events && !events.length) {
    this.actions.events = [];
  }
  if(!_.isArray(_eventsNames)) {
    _eventsNames = [_eventsNames]
  }
  _eventsNames.forEach(eventName => {
    events.push({
      type: eventName,
      callback
    });
  })
}
