import config from './../config'
import service from './../service'
export default {
  getUserAndGroup (props) {
    return service.post(config.userAndGroup, props)
  }
}
