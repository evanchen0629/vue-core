export default class Vue{
  constructor(options = {}){
    this.$el = options.el
    this.$data = options.data
    this.$methods = options.methods
  }
}
