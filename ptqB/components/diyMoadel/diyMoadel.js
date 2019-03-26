Component({
    /**
     * 组件的属性列表
     * 用于组件自定义设置
     */
    properties: {
        // 弹窗标题
        title: { // 属性名
            type: String, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
            value: '温馨提示' // 属性初始值（可选），如果未指定则会根据类型选择一个
        },
        // 标题颜色
        titleColor: { // 属性名
            type: String,
            value: '#999999' 
        },
        // 弹窗内容
        content: {
            type: String,
            value: '弹窗内容'
        },
        // 弹窗取消按钮文字
        cancelText: {
            type: String,
            value: '取消'
        },
        // 弹窗确认按钮文字
        confirmText: {
            type: String,
            value: '确定'
        },
        // 文字的对齐方式
        txtAlign: {
            type: String,
            value: 'center'
        },
        // 是否出现头部
        titleHide: {
            type: Boolean,
            value: true
        },
        // 是否只有确定键
        onceConfirm: {
            type: Boolean,
            value: false
        },
        // 中间区域展示形态 1正常 2 列表展示 3富文本展示 4.富文本+按钮
        zstype: {
            type: String,
            value: '1'
        },
        // 列表展示传入的数组
        showList: {
            type: Array,
            value: []
        },
        // 富文本的字符串
        nodesStr: {
            type: String,
            value: ''
        },
        // 红色提示文字
        redTxt: {
            type: String,
            value: ''
        },
        // 按钮的数组
        btnArr: {
            type: Array,
            value: [{
                    fill:false,//是否红色填充
                    txt: '', //按钮内的文字
                    btn: '' //需要绑定的事件
                }
            ]
        }
    },

    /**
     * 私有数据,组件的初始数据
     * 可用于模版渲染
     */
    data: {
        // 弹窗显示控制
        isShow: false
    },

    /**
     * 组件的方法列表
     * 更新属性和数据的方法与更新页面数据的方法类似
     */
    methods: {
        /*
         * 公有方法
         */

        //隐藏弹框
        hideDialog() {
            this.setData({
                isShow: false
            })
        },
        //展示弹框
        showDialog() {
            this.setData({
                isShow: true
            })
        },
        // 点击赋值点击事件
        navOtherBtn(e) {
            let btn = e.currentTarget.dataset.btn
            // this.triggerEvent(btn, e)
            this.triggerEvent("touchBtn", btn)
        },
        /*
         * 内部私有方法建议以下划线开头
         * triggerEvent 用于触发事件
         */
        _cancelEvent() {
            //触发取消回调
            this.triggerEvent("cancelEvent")
        },
        _confirmEvent() {
            //触发成功回调
            this.triggerEvent("confirmEvent");
        }
    }
})