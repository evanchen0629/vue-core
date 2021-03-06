import Compile from './compile'
import Observe from './observer'

export default class Vue{
  constructor(options = {}){
    this.$el = options.el
    this.$data = options.data
    this.$methods = options.methods
    // 如果指定了el参数，对el进行解析
    new Observe(this.$data)
    if (this.$el) {
      // compile负责解析模板的内容
      // 需要：模板和数据
      new Compile(this, this.$el)
    }
  }
}
