// components/cipherSix.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        price: { // 属性名
            type: String, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
            value: '0.00' // 属性初始值（可选），如果未指定则会根据类型选择一个
        },
        titleTxt:{
            type: String,
            value: '提现到'
        },
        txImg:{
            type: String,
            value: '/images/payType2.png'
        },
        txTest:{
            type: String,
            value: '微信钱包'
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        isShow: false,
        passTxt:'',
        fouce:false
    },

    /**
     * 组件的方法列表
     */
    methods: {
        passInput(e) {
            this.setData({
                passTxt: e.detail.value
            })
            this.triggerEvent("passInput",e.detail)
        },
        hide(){
            this.setData({
                isShow:false,
                passTxt:''
            })
        },
        show(){
            this.setData({
                isShow:true,
                fouce:true
            })
        },
        clearPass(){
            this.setData({
                passTxt: ''
            })
        }
    }
})