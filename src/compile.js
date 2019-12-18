export default class Compile{
  constructor(vm, el){
    this.vm = vm
    this.el = document.querySelector(el)
    // 编译模板
    if (this.el) {
      //1. 把el中所有的子节点都放入到内存中， fragment
      let fragment = this.node2fragment(this.el)      
      // 2. 在内存中编译fragment
      this.compile(fragment)
      // 3. 把fragment一次性的添加到页面
      this.el.appendChild(fragment)
    }
  }
  /* 核心方法 */
  node2fragment(node) {
    let fragment = document.createDocumentFragment()
    // 把el中所有的子节点挨个添加到文档碎片中
    let childNodes = node.childNodes
    this.toArray(childNodes).forEach(node => {
      // 把所有的子节点都添加到frament中
      fragment.appendChild(node)
    })
    return fragment
  }
  /* 内存编译模板 */
  compile(fragment) {
    let childNodes = fragment.childNodes
    this.toArray(childNodes).forEach(node => {
      // 编译子节点
      if (this.isElementNode(node)) {
        // 如果是元素， 需要解析指令
        this.compileElement(node)
      }
      // 如果是文本节点
      if (this.isTextNode(node)) {
        // 如果是文本节点， 需要解析插值表达式
        this.compileText(node)
      }
      // 如果当前节点还有子节点，需要递归的解析
      if (node.childNodes && node.childNodes.length > 0) {
        this.compile(node)
      }
    })
  }
  /* 解析标签节点 */
  compileElement(node) {
    // 1. 获取到当前节点下所有的属性
    let attributes = node.attributes
    this.toArray(attributes).forEach(attr => {
      // 2. 解析vue的指令（所以以v-开头的属性）
      let attrName = attr.name
      if (this.isDirective(attrName)) {
        let type = attrName.slice(2)
        let expr = attr.value
        // 3. 根据指令进行相应的操作
        // 如果是on指令
        if (this.isEventDirective(type)) {
          CompileUtil["eventHandler"](node, this.vm, type, expr)
        } else {
          CompileUtil[type] && CompileUtil[type](node, this.vm, expr)
        }
      }
    })
  }
  // 解析文本节点
  compileText(node) {
    CompileUtil.mustache(node, this.vm)
  }
  /* 工具方法 */
  toArray(likeArray) {
    return [].slice.call(likeArray)
  }
  isElementNode(node) {
    //nodeType: 节点的类型  1：元素节点  3：文本节点
    return node.nodeType === 1
  }
  isTextNode(node) {
    return node.nodeType === 3
  }
  isDirective(attrName) {
    return attrName.startsWith("v-")
  }
  isEventDirective(type) {
    return type.split(":")[0] === "on"
  }

}
let CompileUtil = {
  mustache(node, vm) {
    let txt = node.textContent
    let reg = /\{\{(.+)\}\}/
    if (reg.test(txt)) {
      let expr = RegExp.$1.trim()
      node.textContent = txt.replace(reg, this.getVMValue(vm, expr))
    }
  },
  eventHandler(node, vm, type, expr) {
    // 给当前元素注册事件即可
    let eventType = type.split(":")[1]
    let fn = vm.$methods && vm.$methods[expr]
    if (eventType && fn) {
      // bind为了改变fn中this指向vm实例
      node.addEventListener(eventType, fn.bind(vm))
    }
  },
  // v-html
  html(node, vm, expr) {
    // 为什么不直接写vm.$data[expr],因为如果数据是复杂类型,那么就会拿不到数据
    node.innerHTML = this.getVMValue(vm, expr)
  },
  // v-text
  text(node, vm, expr) {
    node.textContent = this.getVMValue(vm, expr)
  },
  // 这个方法用于获取VM中的数据, 
  getVMValue(vm, expr) {
    // 获取到data中的数据
    let data = vm.$data
    expr.split(".").forEach(key => {
      data = data[key]
    })
    return data
  }
}