export default async function (update) {
  let ctx = {};
  _.extend(ctx,update);

  const { events } = this.actions;
  let _events = events.filter(event => event.type === ctx.type)
  if (_events && _events.length) {
    _events.forEach(_event => {
     _event.callback(ctx);
    })
  }

}
