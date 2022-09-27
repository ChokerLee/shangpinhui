<template>
  <div class="pay-main">
    <div class="pay-container">
      <div class="checkout-tit">
        <h4 class="tit-txt">
          <span class="success-icon"></span>
          <span class="success-info">订单提交成功，请您及时付款，以便尽快为您发货~~</span>
        </h4>
        <div class="paymark">
          <span class="fl"
            >请您在提交订单<em class="orange time">4小时</em>之内完成支付，超时订单会自动取消。订单号：<em>{{
              orderId
            }}</em></span
          >
          <span class="fr"
            ><em class="lead">应付金额：</em><em class="orange money">￥{{ payInfo?.totalFee }}</em></span
          >
        </div>
      </div>
      <div class="checkout-info">
        <h4>重要说明：</h4>
        <ol>
          <li>尚品汇商城支付平台目前支持<span class="zfb">支付宝</span>支付方式。</li>
          <li>其它支付渠道正在调试中，敬请期待。</li>
          <li>为了保证您的购物支付流程顺利完成，请保存以下支付宝信息。</li>
        </ol>
        <h4>支付宝账户信息：（很重要，<span class="save">请保存！！！</span>）</h4>
        <ul>
          <li>支付帐号：11111111</li>
          <li>密码：111111</li>
          <li>支付密码：111111</li>
        </ul>
      </div>
      <div class="checkout-steps">
        <div class="step-tit">
          <h5>支付平台</h5>
        </div>
        <div class="step-cont">
          <ul class="payType">
            <li><img src="./images/pay2.jpg" /></li>
            <li><img src="./images/pay3.jpg" /></li>
          </ul>
        </div>
        <div class="hr"></div>

        <div class="payshipInfo">
          <div class="step-tit">
            <h5>支付网银</h5>
          </div>
          <div class="step-cont">
            <ul class="payType">
              <li><img src="./images/pay10.jpg" /></li>
              <li><img src="./images/pay11.jpg" /></li>
              <li><img src="./images/pay12.jpg" /></li>
              <li><img src="./images/pay13.jpg" /></li>
              <li><img src="./images/pay14.jpg" /></li>
              <li><img src="./images/pay15.jpg" /></li>
              <li><img src="./images/pay16.jpg" /></li>
              <li><img src="./images/pay17.jpg" /></li>
              <li><img src="./images/pay18.jpg" /></li>
              <li><img src="./images/pay19.jpg" /></li>
              <li><img src="./images/pay20.jpg" /></li>
              <li><img src="./images/pay21.jpg" /></li>
              <li><img src="./images/pay22.jpg" /></li>
            </ul>
          </div>
        </div>
        <div class="hr"></div>

        <div class="submit">
          <!-- <router-link class="btn" to="/paysuccess">立即支付</router-link> -->
          <a class="btn" @click="open">立即支付</a>
        </div>
        <div class="otherpay">
          <div class="step-tit">
            <h5>其他支付方式</h5>
          </div>
          <div class="step-cont">
            <span><a href="weixinpay.html" target="_blank">微信支付</a></span>
            <span>中国银联</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import router from '@/router'
  import { api_inject } from '@/utils/inject'
  // 这里不能用自动引入，会导致用到这个api的页面强制刷新，从而导致路由失败
  import { ElMessageBox } from 'element-plus'
  import QRCode from 'qrcode'

  interface payInfo_type {
    codeUrl: string
    orderId: number
    totalFee: number
    resultCode: string
  }

  const API = inject(api_inject)
  const route = useRoute()

  // 支付定时器
  const timer = ref()
  // 支付的状态码
  // 存储状态码的意义在于防止用户没有扫码支付就点击已支付
  const code = ref()

  //订单信息
  const payInfo = ref<payInfo_type>()

  // 订单号
  const orderId = computed(() => {
    return route.query.orderId
  })

  // 支付按钮
  const open = async () => {
    try {
      const url = await generateQR(payInfo.value?.codeUrl)
      // 因为ElMessageBox这个api返回的是promise，而try.catch本身是捕获同步错误的，所以捕获不到错误
      // 但是由于async/await这个语法糖，所以在promise实例前加上await关键字，try.catch也能捕获到错误
      // 但是由于这里不想等待弹出框promise的状态的变化，而去操作点什么（即上来就开启定时器，而不是看promise脸色），
      // 所以这里只能promise自己捕获错误了（不加await关键字，自己写catch）
      ElMessageBox({
        title: '请你微信支付',
        showClose: false,
        // 居中布局
        center: true,
        // 确定文本
        confirmButtonText: '已支付成功',
        // 是否显示取消按钮
        showCancelButton: true,
        // 取消按钮文本
        cancelButtonText: '支付遇见问题',
        message: h('img', { src: `${url}`, alt: 'qrcode' }, ''),
        // 关闭弹出框的配置
        beforeClose: (action, instance, done) => {
          // function(action, instance, done)，action的值为'confirm','cancel'或'close'；
          // instance为 MessageBox 实例，
          // 可以通过它访问实例上的属性和方法；done用于关闭 MessageBox
          clearInterval(timer.value)
          timer.value = null
          done()
          // 点击支付成功，确实是支付成功才跳转路由
          if (action == 'confirm') {
            //&& code.value == 200 // 真实环境，就补上
            // 跳转到支付成功路由
            router.push('./paysuccess')
          } else {
            alert('请联系管理员豪哥，tel:13700000000')
          }
        },
      }).catch((e: any) => {
        console.log('取消支付')
      }) // 自己写catch
      // 你需要知道支付是成功还是失败
      // 支付成功，跳转路由
      // 支付失败，提示信息
      if (!timer.value) {
        timer.value = setInterval(async () => {
          // 发请求获取用户支付订单状态
          let result = await API?.reqPayStatus(payInfo.value!.orderId)
          // 支付成功，停止确认订单支付的请求，取消定时器
          if (result.code == 200) {
            // 第一步：清除定时器
            clearInterval(timer.value)
            timer.value = null
            // 保存支付成功返回的code
            code.value = result.code
            // 关闭，弹出框|遮罩层
            ElMessageBox.close()
            // 跳转到支付成功路由
            router.push('./paysuccess')
          }
        }, 2000)
      }
    } catch (e: any) {
      ElMessageBox.alert(e.message)
    }
  }

  // 生成二维码
  const generateQR = async (text: any) => {
    try {
      return await QRCode.toDataURL(text)
    } catch (err) {
      console.error(err)
    }
  }

  // payInfo
  const getPayInfo = async () => {
    let result = await API?.reqPayInfo(orderId.value as string)
    // 如果请求成功，要在组件中存储支付信息
    if (result.code == 200) {
      payInfo.value = result.data
    }
  }

  watchEffect(async () => {
    await getPayInfo()
  })
</script>

<style lang="scss" scoped>
  .pay-main {
    margin-bottom: 20px;

    .pay-container {
      margin: 0 auto;
      width: 1200px;

      a:hover {
        color: #4cb9fc;
      }

      .orange {
        color: #e1251b;
      }

      .money {
        font-size: 18px;
      }

      .zfb {
        color: #e1251b;
        font-weight: 700;
      }

      .checkout-tit {
        padding: 10px;

        .tit-txt {
          font-size: 14px;
          line-height: 21px;

          .success-icon {
            width: 30px;
            height: 30px;
            display: inline-block;
            background: url(./images/icon.png) no-repeat 0 0;
          }

          .success-info {
            padding: 0 8px;
            line-height: 30px;
            vertical-align: top;
          }
        }

        .paymark {
          overflow: hidden;
          line-height: 26px;
          text-indent: 38px;

          .fl {
            float: left;
          }

          .fr {
            float: right;

            .lead {
              margin-bottom: 18px;
              font-size: 15px;
              font-weight: 400;
              line-height: 22.5px;
            }
          }
        }
      }

      .checkout-info {
        padding-left: 25px;
        padding-bottom: 15px;
        margin-bottom: 10px;
        border: 2px solid #e1251b;

        h4 {
          margin: 9px 0;
          font-size: 14px;
          line-height: 21px;
          color: #e1251b;
        }

        ol {
          padding-left: 25px;
          list-style-type: decimal;
          line-height: 24px;
          font-size: 14px;
        }

        ul {
          padding-left: 25px;
          list-style-type: disc;
          line-height: 24px;
          font-size: 14px;
        }
      }

      .checkout-steps {
        border: 1px solid #ddd;
        padding: 25px;

        .hr {
          height: 1px;
          background-color: #ddd;
        }

        .step-tit {
          line-height: 36px;
          margin: 15px 0;
        }

        .step-cont {
          margin: 0 10px 12px 20px;

          ul {
            font-size: 0;

            li {
              margin: 2px;
              display: inline-block;
              padding: 5px 20px;
              border: 1px solid #ddd;
              cursor: pointer;
              line-height: 18px;
            }
          }
        }
      }

      .submit {
        text-align: center;

        .btn {
          display: inline-block;
          padding: 15px 45px;
          margin: 15px 0 10px;
          font: 18px '微软雅黑';
          font-weight: 700;
          border-radius: 0;
          background-color: #e1251b;
          border: 1px solid #e1251b;
          color: #fff;
          text-align: center;
          vertical-align: middle;
          cursor: pointer;
          user-select: none;
          text-decoration: none;
        }
      }
    }
  }
</style>
