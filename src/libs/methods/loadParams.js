export default async function () {
  const {access_token,group_id,v} = this.settings.api;
  try {
    const body = await this.api('groups.getLongPollServer',{
      group_id,
      access_token,
      v
    })

    if(!body.response){
      throw new Error(body)
    }
    this.botsLongPollParams =  body.response;
  }
  catch (e) {
    this.botsLongPollParams = false;
    throw(e)
  }
}
