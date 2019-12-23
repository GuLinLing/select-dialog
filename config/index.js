import {dev} from './dev'
import {prod} from './prod'
const env = process.env.NODE_ENV
function getConfig (env) {
  let config = null
  switch (env) {
    case 'development':
      config = dev
      break
    case 'production':
      config = prod
      break
    default:
      config = dev
  }
  return config
}
export default {
  ...getConfig(env)
}
