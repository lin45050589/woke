(function (w) {
    /**
     * @description: 1. HM构造函数
     * @param {type} selector : 选择器字符串 或者  DOM对象
         选择器字符串： 查询页面元素
        DOM对象 ： 转换成HM 实例对象
     * @return: 伪数组对象
    */
    function HM(selector) {
        /* 
        如果使用了new调用 ： this指向HM构造函数原型
        如果没有使用new调用 : this指向window
         */
        if (this instanceof HM) {
            if (selector instanceof Node) {//参数是一个DOM对象
                //转成HM实例对象
                this[0] = selector;
                this.length = 1;
            } else {//参数是选择器字符串
                //1.先获取页面DOM元素列表
                var list = document.querySelectorAll(selector);
                //2.遍历列表，添加给this
                for (var i = 0; i < list.length; i++) {
                    this[i] = list[i];
                };
                //3.手动添加length属性
                this.length = list.length;
            };
        } else {
            //没有使用new调用HM，则手动添加new关键字 且 递归调用
            return new HM(selector);
        };
    };

    //2.原型：注册点击事件 (支持多个同名事件)
    HM.prototype.click = function (fn) {
        //this : 调用这个方法的实例对象
        for (var i = 0; i < this.length; i++) {
            this[i].addEventListener('click', fn);
        };
    };

    //3.原型： 获取自身的索引
    HM.prototype.index = function (fn) {
        //this : 调用这个方法的实例对象  HM对象
        // this[0] : HM对象里面 属性名为0 的DOM元素 

        // 先获取父元素所有的子元素列表
        var list = this[0].parentNode.children;
        /* 调用数组的indexOf()方法返回某一个元素下标
            由于list是一个伪数组，不能直接调用数组原型中的方法
            所以这里需要上下文方式来调用
        */
        return Array.prototype.indexOf.call(list, this[0]);
    };

    //4.原型：获取除我之外的兄弟元素
    HM.prototype.siblings = function () {
        //this : 调用这个方法的实例对象  HM对象
        // this[0] : HM对象里面 属性名为0 的DOM元素
        /* 核心思路：删除数组指定元素 */
        // （1）先获取父元素所有的子元素列表 (list是一个伪数组)
        var list = this[0].parentNode.children;
        // （2）将伪数组转成真数组 （方便调用数组api）
        var arr = Array.prototype.slice.call(list);
        // （3）删除arr指定下标元素
        arr.splice(this.index(), 1);
        //  （4）将数组转成HM对象
        for (var i = 0; i < arr.length; i++) {
            this[i] = arr[i];
        };
        this.length = arr.length;
        return this;
    };

    //5.原型：添加类名
    HM.prototype.addClass = function (clsName) {
        //this : 调用这个方法的HM对象
        for (var i = 0; i < this.length; i++) {
            //如果已经有了就不重复添加(css重复类名只有第一个生效)
            if (this[i].className.indexOf(clsName) == -1) {
                this[i].className += ' ' + clsName;//多个类名以空格隔开
            };
        };
    };

    //5.原型：移除类名
    HM.prototype.removeClass = function (clsName) {
        //this : 调用这个方法的HM对象
        for (var i = 0; i < this.length; i++) {
            //替换空字符串, 替换后的结果需要重新赋值
            this[i].className = this[i].className.replace(clsName, '');
        };
    };

    //6.原型：切换类名  有则移除，无则添加
    HM.prototype.toggleClass = function (clsName) {
        //this : 调用这个方法的HM对象
        for (var i = 0; i < this.length; i++) {
            if (this[i].className.indexOf(clsName) != -1) {//有
                this[i].className = this[i].className.replace(clsName, '');
            } else {
                this[i].className += ' ' + clsName;
            };
        };
    };

    //7.原型：根据类名获取指定元素
    HM.prototype.filterClass = function (clsName) {
        //this : 调用这个方法的HM对象
        /* 思路：箩筐思想求和 */
        //(1)声明一个空的HM对象
        var hm = new HM();
        //(2)遍历this中的每一个DOM元素，判断是否有该类名
        for (var i = 0; i < this.length; i++) {
            if (this[i].className.indexOf(clsName) != -1) {//有该类名
                hm[hm.length] = this[i];
                hm.length++;
            };
        };
        //(3)返回hm， 就是包含该clsName类名的 HM实例对象
        return hm;
    };

    //暴露接口
    w.HM = HM;
})(window);