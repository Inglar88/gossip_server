export default async function () {
  let { botsLongPollParams } = this;
  if(!botsLongPollParams) {
    await this.loadParams()
    return this.listen();
  } else {
    try {
      const { key,server,ts } = this.botsLongPollParams;
      const { data } = await axios.get(server, {
        params: {
          key,
          ts,
          act: 'a_check',
          wait: 25
        }
      })
      if (data.failed) {
        if (data.ts) {
          this.botsLongPollParams.ts = data.ts
        } else {
          this.botsLongPollParams = null
        }
        return this.listen()
      }

      if (data.ts) {
        this.botsLongPollParams.ts = data.ts
      }

      if (data.updates && data.updates.length) {
        await Promise.all(data.updates.map(update => this.dispatcher(update)));
      }
      return this.listen();
    } catch (e) {
      this.botsLongPollParams = null;
      console.log(`Listen error ${e}`)
      return this.listen()
    }
  }
}
