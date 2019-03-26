var WxParse = require('../../wxParse/wxParse.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        html: '',
        id: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log(options)
        var html = `<p style="margin-top:0;margin-bottom:0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);">
    <strong><span style="font-family: 宋体;letter-spacing: 1px;font-size: 14px;"><span style="font-family:宋体;">重要须知</span></span></strong><span style="font-family: 宋体;letter-spacing: 1px;font-size: 14px;"><span style="font-family:宋体;">：杭州尚遇网络科技有限公司（下称</span>“尚遇”)依据本协议为拼团趣商家提供服务。尚遇在此特别提醒商家仔细阅读本协议，</span><strong><span style="font-family: 宋体;letter-spacing: 1px;font-size: 14px;"><span style="font-family:宋体;">在成为拼团趣用户前，请务必认真阅读本协议中各条款，特别是免除或者限制尚遇责任的免责条款以及对商家的权利排除或限制的条款，这些条款将以加粗字体标注。一经注册或使用拼团趣软件将视为对本协议的充分理解和接收，并同意接受本协议各项条款的约束。</span></span></strong>
</p>
<p>
    <br/>
</p>
<p style="margin-top:0;margin-bottom:0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);">
    <strong><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">1、定义</span></strong>
</p>
<p style="margin-top:0;margin-bottom:0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);">
    <span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">1.1 拼团趣</span><span style="font-family: 宋体;letter-spacing: 1px;font-size: 14px;"><span style="font-family:宋体;">：指尚遇研发的营销管理系统。</span></span>
</p>
<p style="margin-top:0;margin-bottom:0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);">
    <span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">1.2 商家：</span><span style="font-family: 宋体;letter-spacing: 1px;font-size: 14px;"><span style="font-family:宋体;">指在拼团趣上申请注册并符合中华人民共和国法律规定的具有完全民事权利能力和民事行为能力的自然人或组织。</span></span>
</p>
<p style="margin-top:0;margin-bottom:0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);">
    <span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">1.3 活动信息：通过拼团趣发布的商家的商品信息（如商品/服务描述、活动有效期、活动规则、门店信息等）。</span>
</p>
<p style="margin-top:0;margin-bottom:0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);">
    <span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">1.4 商家后台：指尚遇基于协议为商家提供的后台管理系统，包括手机端、PC端等。</span>
</p>
<p style="margin-top:0;margin-bottom:0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);">
    <span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">1.5 活动：通过拼团趣发布的商品或服务的营销行为。</span>
</p>
<p style="margin-top:0;margin-bottom:0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);">
    <span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">1.6 拼团趣系统服务：指尚遇通过拼团趣向商家提供的活动营销管理系统，具体服务内容以本协议约定为准。 </span>
</p>
<p>
    <br/>
</p>
<p style="margin-top:0;margin-bottom:0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);">
    <span style="font-family:宋体;color:rgb(51,51,51);letter-spacing:1px;font-weight:bold;font-size:14px;">2.&nbsp;</span><strong><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;"><span style="font-family:宋体;">协议组成及修改</span></span></strong>
</p>
<p style="margin-top:0;margin-bottom:0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);">
    <span style="font-family:宋体;color:rgb(51,51,51);letter-spacing:1px;font-size:14px;">2.1 本协议包括本协议正文条款及尚遇已经发布或将来不时发布的各类规则，所有条款和规则均为本协议不可分割的一部分，具有同等法律效力。本协议是商家经过仔细认真阅读、理解并选择接受全部内容后与尚遇自愿共同签订的，适用于商家在拼团趣平台的全部活动。</span>
</p>
<p style="margin-top:0;margin-bottom:0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);">
    <span style="font-family:宋体;color:rgb(51,51,51);letter-spacing:1px;font-size:14px;">2.2 </span><strong><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;"><span style="font-family:宋体;">尚遇有权根据需要修改本协议正文条款或制定、修改各类规则。尚遇将在公众号拼团趣小程序（拼团趣商家版）发布最新版本的拼团趣商家使用协议或各类规则，而无须另行向商家单独通知。商家承诺不时注意、阅读、理解本协议正文条款及各类规则的最新版本。如果商家继续使用拼团趣系统，则视为商家接受尚遇对本协议的修改；如果商家不同意尚遇对本协议的修改，则应立即停止使用拼团趣系统。</span></span></strong>
</p>
<p>
    <br/>
</p>
<p style="margin-top:0;margin-bottom:0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);">
    <span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-weight: bold;font-size: 14px;">3.&nbsp;</span><strong><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;"><span style="font-family:宋体;">拼团趣的服务内容</span></span></strong>
</p>
<p style="margin-top:0;margin-bottom:0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);">
    <span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;"><span style="font-family:宋体;">尚遇为商家提供的拼团趣活动营销管理系统服务，包括但不限于拼团趣软件技术服务，营销活动方案推荐等。</span></span>
</p>
<p>
    <br/>
</p>
<p style="margin-top:0;margin-bottom:0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);">
    <span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-weight: bold;font-size: 14px;">4.&nbsp;</span><strong><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;"><span style="font-family:宋体;">商家的权利与义务</span></span></strong>
</p>
<p style="margin-top:0;margin-bottom:0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);">
    <span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">4.1 商家对自己在拼团趣系统上的账户和密码负有妥善保管之义务，对以其账户名进行的所有活动承担责任。</span>
</p>
<p style="margin-top:0;margin-bottom:0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);">
    <span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">4.2 </span><strong><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;"><span style="font-family:宋体;">商家应依法发布产品或服务信息，在经营活动中自觉遵守《消费者权益保护法》、《产品质量法》、《广告法》等法规，并承诺自身具备提供本合同项下产品或服务必要的资质批文，具备提供所发布产品或服务的实际能力，保证拼团趣消费者购买的产品或服务安全可靠。</span></span></strong>
</p>
<p style="margin-top:0;margin-bottom:0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);">
    <span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">4.3 商家承诺对在拼团趣系统上发布的产品或服务拥有完整的权利，或已取得相应的授权。如果因所发布的产品或服务涉及侵犯第三人的权利的，包括但不限于知识产权，由商家自身承担所有责任。</span>
</p>
<p style="margin-top:0;margin-bottom:0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);">
    <span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">4.4 商家通过拼团趣营销系统发布活动后，如商户因产品问题无法提供已消费者服务的，商户应立即电话通知下单的消费者和拼团趣总部，并做好合理的安抚和妥善的处理。</span>
</p>
<p style="margin-top:0;margin-bottom:0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);">
    <span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">4.5商家承诺不在拼团趣系统上发布与产品或服务活动无关的信息，否则尚遇有权通知商家删除或者不经通知而直接删除的权利。</span>
</p>
<p style="margin-top:0;margin-bottom:0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);">
    <span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">4.6 </span><strong><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;"><span style="font-family:宋体;">商家对在拼团趣系统上获得购买订单负有完全履行的责任。如果消费者因消费商家所提供的商品或接受商家提供的服务而遭受身体或财产上的损失的，由商家向消费者承担所有责任。</span></span></strong>
</p>
<p style="margin-top:0;margin-bottom:0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);">
    <span style="font-family:宋体;color:rgb(51,51,51);letter-spacing:1px;font-size:14px;">4.7 软件使用费</span>
</p>
<p style="margin-top:0;margin-bottom:0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);">
    <strong><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;"><span style="font-family:宋体;">基础体验版</span></span></strong><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;"><span style="font-family:宋体;">，</span>600元/年费+交易流水的6%服务手续费。</span>
</p>
<p style="margin-top:0;margin-bottom:0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);">
    <span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;"><span style="font-family:宋体;">商户授权拼团趣自每笔销售款中可直接扣除相应的交易服务费，不予退还。</span></span>
</p>
<p style="margin-top:0;margin-bottom:0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);">
    <strong><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;"><span style="font-family:宋体;">基础正式版</span></span></strong><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;"><span style="font-family:宋体;">，</span>3000元/年费+所有交易流水的0.6%手续费（腾讯收取）。</span>
</p>
<p style="margin-top:0;margin-bottom:0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);">
    <span style="font-family:宋体;color:rgb(51,51,51);letter-spacing:1px;font-size:14px;">4.8按照拼团趣系统的提示，向尚遇支付拼团趣软件使用费，</span><strong><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;"><span style="font-family:宋体;">一经支付，不予退款</span></span></strong><span style="font-family:宋体;color:rgb(51,51,51);letter-spacing:1px;font-size:14px;"><span style="font-family:宋体;">。</span></span>
</p>
<p style="margin-top:0;margin-bottom:0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);">
    <span style="font-family:宋体;color:rgb(51,51,51);letter-spacing:1px;font-size:14px;">4.9</span><strong><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;"><span style="font-family:宋体;">商家如继续使用拼团趣系统的，则自动接受新的软件使用费标准</span></span></strong><span style="font-family:宋体;color:rgb(51,51,51);letter-spacing:1px;font-size:14px;"><span style="font-family:宋体;">。</span></span>
</p>
<p style="margin-top:0;margin-bottom:0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);">
    <span style="font-family:宋体;color:rgb(51,51,51);letter-spacing:1px;font-size:14px;"><span style="font-family:宋体;"><br/></span></span>
</p>
<p style="margin-top:0;margin-bottom:0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);">
    <strong><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;"><span style="font-family:宋体;">5<span style="color: rgb(51, 51, 51); font-family: 宋体; font-size: 14px; font-weight: 700; letter-spacing: 1px; text-align: justify; background-color: rgb(255, 255, 255);">.&nbsp;</span>商家信息及隐私保护</span></span></strong>
</p>
<p style="margin-top:0;margin-bottom:0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);">
    <span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">5.1 商家信息的提供及核实</span>
</p>
<p style="margin-top:0;margin-bottom:0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);">
    <strong><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;"><span style="font-family:宋体;">商家承诺并保证其向拼团趣提交的所有信息（包括但不限于商家的身份主体信息、负责人相关的信息、相关资质证明文件、发布的产品或服务相关的信息等）均准确、详细、真实、有效、完整，并承诺及时更新相关信息。对于因商家违反上述承诺和保证而引起的问题及所带来的后果，尚遇不承担任何责任。</span></span></strong>
</p>
<p style="margin-top:0;margin-bottom:0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);">
    <span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">5.2 商家信息的使用和披露</span>
</p>
<p style="margin-top:0;margin-bottom:0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);">
    <span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">5.2.1 尚遇以行业标准及惯例对商家的资料和信息进行保密。</span><strong><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;"><span style="font-family:宋体;">商家在此同意并授权，尚遇在以下情况下可以使用或向第三方提供商家的资料和信息而无需额外取得商家的同意或授权：</span></span></strong>
</p>
<p style="margin-top:0;margin-bottom:0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);">
    <strong><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">A. 进行商家身份识别、资料核查和验证，以确保通过拼团趣系统进行的交易的安全性和防范违法犯罪活动；</span></strong>
</p>
<p style="margin-top:0;margin-bottom:0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);">
    <strong><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">B. 进行内部归类、模型建设和分析等内部使用，以改进拼团趣系统提供的服务；</span></strong>
</p>
<p style="margin-top:0;margin-bottom:0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);">
    <strong><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">C. 根据有关法律法规或有权机构的要求进行披露；</span></strong>
</p>
<p style="margin-top:0;margin-bottom:0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);">
    <strong><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">D. 当商家违反本协议或商家通过拼团趣系统签署的法律文件之约定或任何法律法规时，尚遇有权根据自己的判断或有关法律文件的约定，披露商家的资料和信息以及商家的违法、违约行为而无需承担任何责任。</span></strong>
</p>
<p>
    <br/>
</p>
<p style="margin-top:0;margin-bottom:0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);">
    <span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-weight: bold;font-size: 14px;">6.&nbsp;</span><strong><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;"><span style="font-family:宋体;">风险提示</span></span></strong>
</p>
<p style="margin-top:0;margin-bottom:0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);">
    <strong><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;"><span style="font-family:宋体;">商家了解并确认其使用拼团趣进行交易存在的以下风险：</span></span></strong>
</p>
<p style="margin-top:0;margin-bottom:0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);">
    <span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-weight: bold;font-size: 14px;">A.&nbsp;</span><strong><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;"><span style="font-family:宋体;">违约风险：因其他交易方未完全履约而使商家遭受损失的风险；</span></span></strong>
</p>
<p style="margin-top:0;margin-bottom:0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);">
    <span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-weight: bold;font-size: 14px;">B.&nbsp;</span><strong><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;"><span style="font-family:宋体;">市场风险：因宏观经济形势等市场因素变化而使商家无法达到预期收益的风险；</span></span></strong>
</p>
<p style="margin-top:0;margin-bottom:0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);">
    <span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-weight: bold;font-size: 14px;">C.&nbsp;</span><strong><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;"><span style="font-family:宋体;">政策风险：因相关法律法规、相关政策及规则变化引起价格等方面波动而使商家遭受损失的风险；</span></span></strong>
</p>
<p style="margin-top:0;margin-bottom:0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);">
    <span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-weight: bold;font-size: 14px;">D.&nbsp;</span><strong><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;"><span style="font-family:宋体;">商家过错风险：因决策失误、操作不当或泄露等商家个人过错造成损失的风险；</span></span></strong>
</p>
<p style="margin-top:0;margin-bottom:0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);">
    <strong><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">E. 不可抗力风险：因网络故障、黑客攻击等不可抗力因素而使商家遭受损失的风险。</span></strong>
</p>
<p>
    <br/>
</p>
<p style="margin-top:0;margin-bottom:0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);">
    <span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-weight: bold;font-size: 14px;">7.&nbsp;</span><strong><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;"><span style="font-family:宋体;">责任限制</span></span></strong>
</p>
<p style="margin-top:0;margin-bottom:0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);">
    <strong><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">7.1根据《中华人民共和国合同法》第39条，尚遇提请商家注意并确认，尚遇不承担本协议第5条提示的风险以及以下损失或责任：</span></strong>
</p>
<p style="margin-top:0;margin-bottom:0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);">
    <strong><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">7.1.1 如果拼团趣出现因系统故障或其他原因导致的处理错误，无论是有利于拼团趣还是有利于商家，拼团趣系统都应当并有权通知商家以及纠正该等错误，双方权利义务应恢复至如果没有发生该等系统故障或处理错误双方应该享有或承担的权利义务。</span></strong>
</p>
<p style="margin-top:0;margin-bottom:0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);">
    <strong><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">7.1.2 尚遇有权在未经事前通知的情况下，基于法律法规、监管部门、司法机关的要求或依据对运行和交易安全等情况的独立判断，限制、改变、暂时停止或终止拼团趣系统服务，并相应移除或删除商家注册申请资料、单方解除本协议且不承担任何违约责任。商家继续使用拼团趣的行为，即表示接受拼团趣系统的变化以及因此带来的本协议的变更和调整并受其约束。</span></strong>
</p>
<p style="margin-top:0;margin-bottom:0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);">
    <strong><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">7.1.3 尚遇不保证商家的活动营销需求能够实际得到满足，商家因前述原因导致的损失由商家自行承担，尚遇不承担任何责任。</span></strong>
</p>
<p style="margin-top:0;margin-bottom:0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);">
    <strong><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">7.1.4 尚遇以公众号、拼团趣小程序推送形式发布的链接、PC客户端是商家获得拼团趣系统服务的有效渠道，尚遇不对商家通过其他渠道获得的服务承担任何责任。</span></strong>
</p>
<p style="margin-top:0;margin-bottom:0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);">
    <strong><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">7.1.5 尚遇有权对拼团趣营销系统进行升级或维护并中断服务，对于因该等互联网特性原因而使商家遭受的损失，尚遇不承担任何责任。</span></strong>
</p>
<p style="margin-top:0;margin-bottom:0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);">
    <strong><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">7.2 在法律允许的情况下，尚遇不对与本协议有关或由本协议引起的损失承担任何责任。</span></strong>
</p>
<p>
    <br/>
</p>
<p style="margin-top:0;margin-bottom:0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);">
    <span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-weight: bold;font-size: 14px;">8.&nbsp;</span><strong><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;"><span style="font-family:宋体;">通知和送达</span></span></strong>
</p>
<p style="margin-top:0;margin-bottom:0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);">
    <strong><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;"><span style="font-family:宋体;">对于本协议项下的通知，尚遇有权以向商家在拼团趣系统的账户推送的方式发送，或根据商家在拼团趣系统提交的信息，通过电子邮箱、短信、电话、快递、挂号信的方式发送。如向商家的拼团趣账户、电子邮箱或手机号码以电子信息形式发送的，一经成功发送即视为已经送达；以快递、挂号信的方式发送的，投递之日后第三日视为送达。商家承诺密切关注拼团趣系统、电子邮箱、邮件、短信，不得以未及时关注否认通知的送达。商家承诺及时在拼团趣系统更新其联系信息，因商家未能及时更新联系信息而造成的损失由商家自身承担。</span></span></strong>
</p>
<p>
    <br/>
</p>
<p style="margin-top:0;margin-bottom:0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);">
    <span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-weight: bold;font-size: 14px;">9.&nbsp;</span><strong><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;"><span style="font-family:宋体;">适用法律和管辖</span></span></strong>
</p>
<p style="margin-top:0;margin-bottom:0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);">
    <span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;"><span style="font-family:宋体;">因本协议的签署、履行产生的争议由杭州尚遇网络科技有限公司住所地的人民法院管辖，适用中华人民共和国法律。</span></span>
</p>
<p>
    <br/>
</p>
<p style="margin-top:0;margin-bottom:0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);">
    <span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-weight: bold;font-size: 14px;">10.&nbsp;</span><strong><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;"><span style="font-family:宋体;">电子合同</span></span></strong>
</p>
<p style="margin-top:0;margin-bottom:0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);">
    <span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">10.1 商家签署本协议，以及在拼团趣系统需订立的法律文件均采用电子方式订立。商家通过自身账户以点击确认或其他类似方式签署的电子合同具有法律效力。除特别列明外，尚遇不提供纸质合同。</span>
</p>
<p style="margin-top:0;margin-bottom:0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);">
    <span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">10.2 商家根据本协议以及电子方式签署法律文件后，非经法定或约定的方式和程序，不得擅自修改该法律文件。商家如果对该等法律文件的真伪或内容有任何疑问，可以通过拼团趣的相关系统板块查阅并进行核对。</span><strong><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;"><span style="font-family:宋体;">如商家经查询仍对该等法律文件的真伪、内容有任何争议，应以拼团趣系统或尚遇记录为准。</span></span></strong>
</p>
<p style="margin-top: 0px; margin-bottom: 0px; text-align: justify; background: rgb(255, 255, 255);">
    <span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">10.3 尚遇对本协议拥有最终的解释权。若本协议的部分条款被认定为无效或者无法实施时，本协议中的其他条款仍然有效并应继续履行。</span>
</p>`;

        var html1 = `<p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-indent:0;padding:0 0 0 0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);"><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;"><span style="font-family:宋体;">【首部及导言】</span></span>
</p>
<p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-indent:0;padding:0 0 0 0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);"><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;"><span style="font-family:宋体;">欢迎你使用拼团趣认证增值服务！</span></span>
</p>
<br/>
<p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-indent:0;padding:0 0 0 0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);"><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;"><span style="font-family:宋体;">为使用拼团趣认证增值服务（以下简称</span>“本服务”），你应当阅读并遵守《拼团趣认证增值服务协议》（以下简称“本协议”）。请你务必审慎阅读、充分理解各条款内容，特别是免除或限制责任的相应条款，以及开通或使用某项服务的单独协议，并选择接受或不接受。限制、免责条款可能以加粗形式提示你注意。</span>
</p>
<br/>
<p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-indent:0;padding:0 0 0 0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);"><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;"><span style="font-family:宋体;">除非你已阅读并接受本协议所有条款，否则你无权使用拼团趣认证增值服务。你对本服务的登录、查看、发布信息等行为即视为你已阅读并同意本协议的约束。</span></span>
</p>
<br/>
<p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-indent:0;padding:0 0 0 0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);"><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;"><span style="font-family:宋体;">如果你未满</span>18周岁，请在法定监护人的陪同下阅读本协议及其他上述协议，并特别注意未成年人使用条款。</span>
</p>
<br/>
<p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-indent:0;padding:0 0 0 0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);"><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;"><span style="font-family:宋体;">一、【协议的范围】</span></span>
</p>
<p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-indent:0;padding:0 0 0 0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);"><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">1.1【协议适用主体范围】</span></p>
<p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-indent:0;padding:0 0 0 0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);"><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;"><span style="font-family:宋体;">本协议是你与拼团趣之间关于你使用拼团趣认证增值服务所订立的协议。</span></span>
</p>
<p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-indent:0;padding:0 0 0 0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);"><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">“拼团趣”是指杭州尚遇网络科技有限公司。</span></p>
<p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-indent:0;padding:0 0 0 0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);"><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">“用户”是指申请拼团趣认证增值服务及</span><span style="font-family: Calibri;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">/</span><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;"><span style="font-family:宋体;">或已经认证增值服务的拼团趣用户，在本协议中更多地称为</span>“你”。</span>
</p>
<br/>
<p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-indent:0;padding:0 0 0 0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);"><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">1.2【协议关系及冲突条款】</span></p>
<p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-indent:0;padding:0 0 0 0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);"><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;"><span style="font-family:宋体;">本协议被视为《拼团趣商家使用协议》及其他拼团趣已经发布的规范的补充协议，是其不可分割的组成部分，与其构成统一整体。本协议与上述内容存在冲突的，以本协议为准。</span></span>
</p>
<p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-indent:0;padding:0 0 0 0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);"><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;"><span style="font-family:宋体;">拼团趣可能不断发布与本服务的相关协议、服务声明、业务规则及公告指引等内容（以下统称为</span>“专项规则”）。专项规则一经正式发布，即为本协议不可分割的组成部分，你应当遵守。</span>
</p>
<br/>
<p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-indent:0;padding:0 0 0 0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);"><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;"><span style="font-family:宋体;">二、【术语定义】</span></span>
</p>
<p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-indent:0;padding:0 0 0 0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);"><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">2.1&nbsp;拼团趣认证审核服务：是指符合一定条件的用户可以对其拼团趣用户帐号申请认证。拼团趣根据用户的申请及其提交的资料和信息进行审核，并根据审核情况确定认证结果和认证信息的服务。</span></p>
<br/>
<p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-indent:0;padding:0 0 0 0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);"><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">2.2&nbsp;认证审核：指用户向拼团趣提出申请，拼团趣根据法律规定及双方的约定和保证，基于用户提交的资料和信息，对用户的拼团趣帐号进行帐号资质审核和帐号名称审核。</span></p>
<br/>
<p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-indent:0;padding:0 0 0 0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);"><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">2.2.1&nbsp;帐号资质审核：指用户向拼团趣提出申请，拼团趣根据法律规定及双方的约定和保证，对用户提交的主体资质证明或其所拥有的权利证明资料和信息进行甄别及核实的过程。</span></p>
<br/>
<p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-indent:0;padding:0 0 0 0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);"><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">2.2.2&nbsp;帐号名称审核：指用户向拼团趣提出申请，拼团趣根据法律规定及双方的约定和保证，对用户帐号名称进行审查核定的过程。</span></p>
<br/>
<p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-indent:0;padding:0 0 0 0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);"><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">2.3&nbsp;订单：指用户向拼团趣发起的本服务申请，每发起一次申请为一个订单。</span></p>
<br/>
<p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-indent:0;padding:0 0 0 0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);"><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">2.4&nbsp;新订单：指用户以获得认证成功或年审认证成功的审核结果为目的发起的本服务申请，在新订单的审核过程中，用户自发补充或者根据拼团趣的要求所补充的资料作为同一订单的审核范围。</span></p>
<br/>
<p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-indent:0;padding:0 0 0 0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);"><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">2.5&nbsp;补充订单：指用户认证成功后，申请变更、修改用户信息所产生的订单</span><span style="font-family: Calibri;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">,</span><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;"><span style="font-family:宋体;">在补充订单审核过程中，用户自发补充或者根据拼团趣的要求所补充的资料同样作为同一订单的审核范围。</span></span>
</p>
<br/>
<p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-indent:0;padding:0 0 0 0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);"><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">2.6&nbsp;认证结果：是指拼团趣按照用户的申请进行认证审核后，拼团趣向用户输出的认证结果，结果只包括成功和失败两种情形。</span></p>
<br/>
<p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-indent:0;padding:0 0 0 0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);"><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">2.6.1&nbsp;帐号资质审核结果：指拼团趣根据用户的申请，基于用户提交的资料和信息，对用户进行帐号资质审核后，拼团趣向用户输出的结果。</span></p>
<br/>
<p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-indent:0;padding:0 0 0 0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);"><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">2.6.2&nbsp;帐号名称审核结果：指拼团趣根据用户的申请，对用户进行帐号名称审核后，拼团趣向用户输出的结果。</span></p>
<br/>
<p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-indent:0;padding:0 0 0 0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);"><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">2.7&nbsp;认证成功：指拼团趣对用户提交的资料和信息进行甄别及核实，在完成所有审核流程后，由拼团趣作出认证成功的判断。针对认证成功的用户，拼团趣将根据本协议确定用户的认证帐号名称，生成认证标识及认证信息，开通相应的高级功能及高级权限。未按期完成年审认证或者年审认证失败的用户不属于认证成功用户。</span></p>
<p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-indent:0;padding:0 0 0 0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);"><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">2.8&nbsp;系统通知用户调整申请内容：指用户在申请认证过程中，因不满足认证成功条件，而被拼团趣以系统通知的方式要求作调整或补充的情形。</span></p>
<br/>
<p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-indent:0;padding:0 0 0 0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);"><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">2.9&nbsp;认证失败：指拼团趣对用户的资料进行甄别及核实，在完成所有审核流程后，由拼团趣作出认证失败判断，包括但不限于以下任一情形：</span></p>
<br/>
<p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-indent:0;padding:0 0 0 0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);"><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">2.9.1&nbsp;由于用户原因，经拼团趣三次系统通知用户调整申请内容，用户仍未能满足帐号资质审核及帐号名称审核要求的；</span></p>
<br/>
<p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-indent:0;padding:0 0 0 0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);"><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">2.9.2&nbsp;由于用户原因：</span></p>
<p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-indent:0;padding:0 0 0 0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);"><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">2.9.2.1&nbsp;自用户付费之日起三十日，用户仍未能满足帐号资质审核要求之一的；</span></p>
<p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-indent:0;padding:0 0 0 0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);"><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">2.9.2.2&nbsp;自用户付费之日起九十日，用户仍未能满足帐号名称审核要求之一的；</span></p>
<p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-indent:0;padding:0 0 0 0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);"><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">2.9.3&nbsp;帐号资质审核结果或名称审核结果其中一种为失败的；</span></p>
<p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-indent:0;padding:0 0 0 0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);"><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">2.9.4&nbsp;因其他原因而不能认证成功的情形。</span></p>
<br/>
<p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-indent:0;padding:0 0 0 0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);"><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">2.10&nbsp;拼团趣认证审核服务费：指拼团趣根据用户的申请对用户所提交的资料和信息进行认证审核而产生的费用。</span></p>
<br/>
<p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-indent:0;padding:0 0 0 0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);"><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;"><span style="font-family:宋体;">三、【用户的权利义务】</span></span>
</p>
<p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-indent:0;padding:0 0 0 0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);"><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">3.1&nbsp;用户应保证其提供给拼团趣的所有资料和信息的真实性、合法性、准确性和有效性。如用户提供服务或内容需要取得相关法律法规规定的许可或进行备案的，用户应当主动进行明确说明并提交相应的许可或备案证明。否则，拼团趣有权拒绝或终止提供本服务，并依照本协议对违规帐号进行处罚。因此给拼团趣或第三方造成损害的，你应当依法予以赔偿。</span></p>
<br/>
<p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-indent:0;padding:0 0 0 0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);"><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">3.2&nbsp;用户不得通过非拼团趣授权的其他任何渠道使用本服务，如非因拼团趣原因导致的认证失败、认证流程过长等后果，拼团趣不承担责任。</span></p>
<br/>
<p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-indent:0;padding:0 0 0 0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);"><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">3.3&nbsp;用户理解并且同意，用户提交的资料和信息是作出认证结果的重要依据，任何资料和信息的变更将可能影响认证结果，用户应当在资料和信息变更时及时提出补充认证申请，否则拼团趣有权依照本协议约定对用户进行处罚。拼团趣因此遭受损失的，你应当赔偿拼团趣因此遭受的损失。</span></p>
<br/>
<p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-indent:0;padding:0 0 0 0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);"><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">3.4&nbsp;帐号资质审核成功后，用户可以申请为其开通高级功能，用户使用高级功能时应遵守法律、行政法规和本协议或相关服务条款的规定，否则，拼团趣有权不经通知随时视行为情节对违规用户的帐号采取包括但不限于限制、停止使用高级功能等措施。</span></p>
<br/>
<p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-indent:0;padding:0 0 0 0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);"><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">3.5&nbsp;认证成功后，用户有权以认证帐号名称和认证信息所公示的身份对外运营，并通过认证标识区别于其他非认证拼团趣用户。</span></p>
<br/>
<p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-indent:0;padding:0 0 0 0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);"><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">3.6在认证增值服务期限内，拼团趣将为认证用户开通高级功能，包括但不限于以下内容：</span></p>
<p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-indent:0;padding:0 0 0 0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);"><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;"><span style="font-family:宋体;">（</span>1）专属认证标志；</span>
</p>
<p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-indent:0;padding:0 0 0 0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);"><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;"><span style="font-family:宋体;">（</span>2）用户店铺中增加认证标记，分个人标记及店铺标记两种；</span>
</p>
<p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-indent:0;padding:0 0 0 0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);"><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;"><span style="font-family:宋体;">（</span>3）提现次数提升至</span><span style="font-family: Calibri;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">2</span><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;"><span style="font-family:宋体;">次</span></span><span style="font-family: Calibri;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">/</span><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;"><span style="font-family:宋体;">日；</span></span>
</p>
<p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-indent:0;padding:0 0 0 0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);"><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;"><span style="font-family:宋体;">（</span>4）</span><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">“逛逛”频道展示</span><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;"><span style="font-family:宋体;">；</span></span>
</p>
<p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-indent:0;padding:0 0 0 0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);"><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;"><span style="font-family:宋体;">（</span>5）</span><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;"><span style="font-family:宋体;">自主核销功能</span></span><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;"><span style="font-family:宋体;">；</span></span>
</p>
<p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-indent:0;padding:0 0 0 0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);"><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;"><span style="font-family:宋体;">（</span>6）</span><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;"><span style="font-family:宋体;">专享卡到账更快捷；</span></span>
</p>
<p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-indent:0;padding:0 0 0 0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);"><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;"><span style="font-family:宋体;">（</span>7）</span><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;"><span style="font-family:宋体;">参加平台活动</span></span><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;"><span style="font-family:宋体;">；</span></span>
</p>
<p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-indent:0;padding:0 0 0 0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);"><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;"><span style="font-family:宋体;">（</span></span><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">8</span><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;"><span style="font-family:宋体;">）更多</span></span><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;"><span style="font-family:宋体;">专享功能</span></span><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;"><span style="font-family:宋体;">；</span></span>
</p>
<br/>
<p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-indent:0;padding:0 0 0 0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);"><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;"><span style="font-family:宋体;">四、【拼团趣的权利义务】</span></span>
</p>
<p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-indent:0;padding:0 0 0 0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);"><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">4.1&nbsp;保护用户信息是拼团趣的一项基本原则，拼团趣将会采取合理的措施保护用户所提交的一切资料及信息。除法律法规规定的情形外，未经用户许可拼团趣不会向其他第三方公开、透露上述资料及信息。</span></p>
<br/>
<p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-indent:0;padding:0 0 0 0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);"><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">4.2&nbsp;为依法保障拼团趣认证增值服务的规范有序，拼团趣有权根据相关法律法规的规定及行业标准，针对用户的不同认证需求制定不同的认证审核标准及要求，并有权在必要时对相关标准及要求进行修改。</span></p>
<br/>
<p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-indent:0;padding:0 0 0 0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);"><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">4.3&nbsp;拼团趣有权根据用户提交的资料及信息，确定审核结果，并根据审核情况分阶段确定帐号资质审核结果以及用户的认证帐号名称，生成认证标识及认证信息，在增值服务期限内开通相应的高级功能及高级权限。</span></p>
<br/>
<p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-indent:0;padding:0 0 0 0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);"><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;"><span style="font-family:宋体;">五、【拼团趣认证增值服务期限及费用】</span></span>
</p>
<p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-indent:0;padding:0 0 0 0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);"><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">5.1&nbsp;拼团趣认证增值服务期限：自认证成功之日起</span><span style="font-family: Calibri;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">365</span><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;"><span style="font-family:宋体;">个自然日；</span></span>
</p>
<br/>
<p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-indent:0;padding:0 0 0 0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);"><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">5.2期限届满增值服务即告停止。用户需要进行年审认证并再次支付拼团趣认证增值服务费用后，方能继续使用认证增值服务提供的高级功能及权限。</span></p>
<br/>
<p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-indent:0;padding:0 0 0 0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);"><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">5.3认证增值服务费标准：每项订单收取一次费用，申请拼团趣认证增值服务因类别不同分为新订单与补充订单，费用为</span><span style="font-family: Calibri;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">300</span><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;"><span style="font-family:宋体;">元</span></span><span style="font-family: Calibri;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">/</span><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;"><span style="font-family:宋体;">次（拼团趣有权变更该费用的金额，具体费用标准以认证申请页面公示为准）。</span></span>
</p>
<br/>
<p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-indent:0;padding:0 0 0 0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);"><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">5.4用户理解并同意，用户申请拼团趣认证增值服务并享受增值服务、高级功能而需要向拼团趣支付的费用，相关费用不以认证成功为前提，且不受任何一种审核结果的任何情形及认证状态的影响。无论是否认证成功，一旦提交认证后，拼团趣将不退还拼团趣认证增值服务费用。</span></p>
<br/>
<p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-indent:0;padding:0 0 0 0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);"><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;"><span style="font-family:宋体;">六、【认证服务规范】</span></span>
</p>
<p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-indent:0;padding:0 0 0 0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);"><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">6.1&nbsp;【认证流程】</span></p>
<p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-indent:0;padding:0 0 0 0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);"><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">6.1.1&nbsp;用户申请本服务需要登录申请页面按照拼团趣提示提交有关资料及信息。你在申请本服务时应仔细阅读并同意本协议，你对本服务的接受、购买、提交资料和信息、付款等行为即视为你已阅读并同意受本协议的约束。</span></p>
<br/>
<p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-indent:0;padding:0 0 0 0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);"><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">6.1.2&nbsp;用户在完成在线申请及资料提交流程，并完成审核费用支付后，拼团趣会在</span><span style="font-family: Calibri;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">15</span><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;"><span style="font-family:宋体;">个工作日内展开认证审核工作，用户应积极配合拼团趣的审核需求，并有权随时了解、查询审核进度。</span></span>
</p>
<br/>
<p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-indent:0;padding:0 0 0 0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);"><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">6.1.3&nbsp;用户同意拼团趣对其提交的资料和信息进行甄别核实，并在完成所有审核流程后，由拼团趣独立作出帐号资质审核成功或者失败、帐号名称审核成功或者失败、认证成功或者认证失败的判断，并以前述判断为依据确定用户的认证帐号名称，生成认证标识及认证信息，开通相应的高级功能及高级权限等，用户应当予以配合。</span></p>
<br/>
<p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-indent:0;padding:0 0 0 0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);"><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">6.1.4&nbsp;审核完成后，拼团趣将反馈以下审核结果：</span></p>
<p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-indent:0;padding:0 0 0 0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);"><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">6.1.4.1&nbsp;审核成功，拼团趣将作出认证成功的判断，确定用户的认证帐号名称，生成认证标识及认证信息，开通相应的高级功能及高级权限；</span></p>
<p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-indent:0;padding:0 0 0 0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);"><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">6.1.4.2&nbsp;认证失败，拼团趣将告知用户认证失败的原因。</span></p>
<br/>
<p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-indent:0;padding:0 0 0 0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);"><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">6.1.5&nbsp;审核成功用户应根据以下条款申请年审认证：</span></p>
<p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-indent:0;padding:0 0 0 0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);"><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">6.1.5.1&nbsp;用户帐号资质审核成功后帐号审核成功状态将会被保留一年（起算日为帐号资质审核成功日）。用户如需持续保留帐号审核成功状态，保持高级功能的申请、使用权利，则应自帐号资质审核成功之日起一年内发起并完成年审认证，年审认证流程及认证审核标准与原认证审核一致。如用户未能及时完成年审认证或者帐号资质审核失败，其帐号审核成功状态终止，高级功能、高级权限的申请、使用权将被取消。</span></p>
<p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-indent:0;padding:0 0 0 0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);"><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">6.1.5.2&nbsp;用户认证成功后其认证帐号名称、认证标识及认证信息将会被保留一年（起算日为帐号资质审核成功日）。用户如需持续保留上述信息，则应自帐号资质审核成功之日起一年内发起并完成年审认证，年审认证流程及认证审核标准与原认证审核一致。如用户未能及时完成年审认证或者帐号资质审核失败，可继续使用认证帐号名称，但高级功能、高级权限的申请、使用权，帐号认证标识以及认证信息等将被取消；如用户帐号资质审核成功、帐号名称审核失败，可继续使用认证帐号名称，保留高级功能的申请、使用权，但开通的高级权限、帐号认证标识以及认证信息等将被取消。</span></p>
<br/>
<p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-indent:0;padding:0 0 0 0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);"><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">6.1.6&nbsp;用户向拼团趣提供的资料和信息如有变更的，应当及时采取以下措施：</span></p>
<p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-indent:0;padding:0 0 0 0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);"><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">6.1.6.1&nbsp;如处于认证审核过程中的资料和信息发生变更，</span><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;"><span style="font-family:宋体;">用户应及时申请补充订单变更有关资料及信息</span></span><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;"><span style="font-family:宋体;">重新提交认证申请</span></span><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;"><span style="font-family:宋体;">；</span></span>
</p>
<br/>
<p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-indent:0;padding:0 0 0 0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);"><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">6.2&nbsp;【认证规则】</span></p>
<p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-indent:0;padding:0 0 0 0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);"><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">6.2.1&nbsp;用户理解并同意：拼团趣认证增值服务内容仅限于对用户提交的资料及信息进行甄别与核实，拼团趣将对前述资料及信息进行合理、谨慎的形式审查，但在拼团趣的合法权限和合理能力范围内，拼团趣无法实质审查用户的实际经营、运营以及推广等行为，并不为此提供任何担保。</span></p>
<p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-indent:0;padding:0 0 0 0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);"><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">6.2.2&nbsp;拼团趣有权甄别核实包括但不限于以下内容：</span></p>
<p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-indent:0;padding:0 0 0 0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);"><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">6.2.2.1&nbsp;用户是否拥有合法主体资质，以及是否取得提供服务或内容相应的权利或授权；</span></p>
<p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-indent:0;padding:0 0 0 0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);"><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">6.2.2.2&nbsp;帐号运营者主体身份，以及是否经过用户明确授权；</span></p>
<p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-indent:0;padding:0 0 0 0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);"><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">6.2.2.3&nbsp;其他拼团趣认为需要审核的内容。用户应就上述内容提供相应的证明文件予以证明并承担真实性、合法性、准确性的瑕疵担保责任。</span></p>
<p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-indent:0;padding:0 0 0 0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);"><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">6.3&nbsp;认证帐号名称应当遵守拼团趣为此制定的命名规则。拼团趣有权根据命名规则审核用户提交的认证帐号名称申请，并提供建议名称。如用户申请名称不能符合命名规则要求的，拼团趣有权以建议名称作为用户认证帐号名称。</span></p>
<p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-indent:0;padding:0 0 0 0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);"><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">6.4&nbsp;认证信息内容由拼团趣根据审核情况进行确定，并在认证帐号名称审核成功后生成，主要包括用户主体资质和权利等可有效证明的信息。拼团趣有权根据规范运营的需要调整认证信息的内容及格式。</span></p>
<br/>
<p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-indent:0;padding:0 0 0 0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);"><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;"><span style="font-family:宋体;">七、【法律责任】</span></span>
</p>
<p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-indent:0;padding:0 0 0 0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);"><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">7.1&nbsp;如果拼团趣发现或收到他人举报或投诉用户违反本协议约定的，拼团趣有权不经通知随时视行为情节对违规用户的帐号处以包括但不限于终止本服务资质审核、责令用户补充资质审查资料、责令用户修改认证信息、责令用户再次申请认证，强制修改帐号名称及认证信息直至取消认证等措施。</span></p>
<br/>
<p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-indent:0;padding:0 0 0 0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);"><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">7.2&nbsp;用户理解并同意，因用户违反本协议或相关服务条款的规定，导致或产生第三方主张的任何索赔、要求或损失，用户应当独立承担责任；拼团趣因此遭受损失的，用户也应当一并赔偿。</span></p>
<br/>
<p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-indent:0;padding:0 0 0 0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);"><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;"><span style="font-family:宋体;">八、【其他】</span></span>
</p>
<p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-indent:0;padding:0 0 0 0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);"><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">8.1&nbsp;你使用本服务即视为你已阅读并同意受本协议的约束。拼团趣有权在必要时修改本协议条款及专项规则，该等修改一经拼团趣正式发布即生效。你可以在相关服务页面查阅最新版本的条款。本协议条款变更后，如果你继续使用拼团趣认证增值服务，即视为你已接受修改后的协议。如果你不接受修改后的协议，应当停止使用拼团趣认证增值服务。</span></p>
<br/>
<p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-indent:0;padding:0 0 0 0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);"><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">8.2&nbsp;本协议签订地为中华人民共和国浙江省杭州市西湖区。</span></p>
<br/>
<p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-indent:0;padding:0 0 0 0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);"><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">8.3&nbsp;本协议的成立、生效、履行、解释及纠纷解决，适用中华人民共和国大陆地区法律（不包括冲突法）。</span></p>
<br/>
<p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-indent:0;padding:0 0 0 0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);"><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">8.4&nbsp;若你和拼团趣之间发生任何纠纷或争议，首先应友好协商解决；协商不成的，你同意将纠纷或争议提交拼团趣住所地的人民法院管辖。</span></p>
<br/>
<p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-indent:0;padding:0 0 0 0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);"><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">8.5&nbsp;本协议所有条款的标题仅为阅读方便，本身并无实际涵义，不能作为本协议涵义解释的依据。</span></p>
<br/>
<p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-indent:0;padding:0 0 0 0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);"><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">8.6&nbsp;本协议条款无论因何种原因部分无效或不可执行，其余条款仍有效，对双方具有约束力。</span></p>
<br/>
<p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-indent:0;padding:0 0 0 0;text-align:justify;text-justify:inter-ideograph;background:rgb(255,255,255);"><span style="font-family: 宋体;color: rgb(51, 51, 51);letter-spacing: 1px;font-size: 14px;">8.7&nbsp;你在使用本服务过程中，如发现相关内容存在违反相关法律法规或者侵犯了你的权利，请及时向我们举报或反馈，我们将依法处理。</span></p>
<br/>
<p><span style="font-family:Calibri;font-size:14px;">&nbsp;</span></p>
<p>
    <br />
</p>`;       
        let notID = options.id || 1;

        if (notID == 1) {
            WxParse.wxParse('article', 'html', html, this, 0)
        } else {
            WxParse.wxParse('article', 'html', html1, this, 0)
        }
        this.setData({
            id:notID
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})