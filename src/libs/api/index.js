import config from '../../config/index';

export default async function (method, options = {}) {
  if(!options.v) {
    options.v = this.settings.api.v;
  }
  try {
    const { data } = await axios.get(`https://api.vk.com/method/${method}`, {
      params: {
        ...options
      }
    })
    const { error } = data
    if(data.error) {
      throw data
    } else {
      return data
    }
  } catch (e) {
    throw (e)
  }
}
