(function () {
    /**
    * @description:构造函数
    * @param {type}  selector 选择器字符串 或者DOM 对象
    * @return: 伪数组对象
    */
    // 构造函数
    function heroFN(selector) {
        if (this instanceof heroFN) {
            if (selector instanceof Node) {
                this[0] = selector;
                this.length = 1;
            } else {
                let list = document.querySelectorAll(selector);
                for (let i = 0; i < list.length; i++) {
                    this[i] = list[i]
                }
                this.length = list.length;
            }
        } else {
            return new heroFN(selector)
        }
    }


    // 原型

})();