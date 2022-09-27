<template>
  <div class="register-container">
    <div class="register">
      <h3>
        注册新用户
        <span class="go">我有账号，去 <a href="login.html" target="_blank">登陆</a> </span>
      </h3>
      <el-form :model="ruleForm" ref="ruleFormRef" :rules="rules">
        <div class="content">
          <el-form-item label="手机号:" label-width="96px" prop="phone">
            <el-input v-model="ruleForm.phone" placeholder="请输入你的手机号" />
          </el-form-item>
        </div>
        <div class="content">
          <el-form-item label="验证码:" label-width="96px" prop="code">
            <el-input v-model="ruleForm.code" placeholder="请输入验证码" />
            <button style="height: 38px; width: 100px" @click="getCode(ruleFormRef)" type="button">获取验证码</button>
          </el-form-item>
        </div>
        <div class="content">
          <el-form-item label="登录密码:" label-width="96px" prop="password">
            <el-input v-model="ruleForm.password" placeholder="请输入你的登录密码" type="password" />
          </el-form-item>
        </div>
        <div class="content">
          <el-form-item label="确认密码:" label-width="96px" prop="re_password">
            <el-input v-model="ruleForm.re_password" placeholder="请输入确认密码" type="password" />
          </el-form-item>
        </div>
        <div class="controls">
          <input type="checkbox" v-model="ruleForm.agree" />
          <span>同意协议并注册《尚品汇用户协议》</span>
        </div>
        <div class="btn">
          <button @click="userRegister(ruleFormRef)" type="button">完成注册</button>
        </div>
      </el-form>
    </div>
    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ElMessage } from 'element-plus'
  import type { FormInstance, FormRules } from 'element-plus'

  import { useUserStore } from '@/stores/user'
  const userStore = useUserStore()
  const router = useRouter()

  const ruleFormRef = ref<FormInstance>()

  const ruleForm = reactive({
    phone: '',
    code: '',
    password: '',
    re_password: '',
    agree: false,
  })

  // 确认密码|自定义验证规则
  const validatePass = (rule: any, value: any, callback: any) => {
    if (value === '') {
      callback(new Error('请输入确认密码'))
    } else {
      if (ruleForm.password !== ruleForm.re_password) {
        callback(new Error('密码与确认密码不一致'))
      }
      // 这个放行非常重要！！！,先执行部分的字段验证，再走全部的验证，所以这里不放行就会堵塞住
      callback()
    }
  }

  // 验证规则
  const rules = reactive<FormRules>({
    phone: [
      { required: true, message: '请输入手机号', trigger: 'blur' },
      { pattern: /^1[3-9]\d{9}$/, message: '手机号格式无效', trigger: 'blur' },
    ],
    code: [
      { required: true, message: '请输入验证码', trigger: 'change' },
      { required: true, message: '请输入验证码', trigger: 'blur' },
      { pattern: /^\d{6}$/, message: '验证码格式无效', trigger: 'blur' },
    ],
    password: [
      { required: true, message: '请输入登录密码', trigger: 'blur' },
      { pattern: /^[0-9A-Za-z]{8,20}$/, message: '密码格式无效', trigger: 'blur' },
    ],
    re_password: [{ required: true, validator: validatePass, trigger: 'blur' }],
  })

  // 获取验证码
  const getCode = async (formEl: FormInstance | undefined) => {
    try {
      if (!formEl) return
      if (ruleForm.phone !== '') {
        let res = await formEl!.validateField('phone', (res, msg) => {
          if (!res) ElMessage(msg!.phone[0].message)
          return res
        })
        if (res) {
          ruleForm.phone && (await userStore.getCode(ruleForm.phone))
          ruleForm.code = userStore.code
        }
      } else {
        ElMessage('请输入手机号')
      }
    } catch (e: any) {
      ElMessage('获取验证码失败')
    }
  }

  // 用户注册
  const userRegister = (formEl: FormInstance | undefined) => {
    try {
      if (!formEl) return
      if (!ruleForm.agree) {
        return ElMessage('请勾选协议')
      }
      formEl.validate(async (res) => {
        if (res) {
          await userStore.userRegister({ phone: ruleForm.phone, code: ruleForm.code, password: ruleForm.password })
          router.push({ name: 'login' })
        } else {
          ElMessage('请正确填写注册内容')
          return false
        }
      })
    } catch (e: any) {
      return ElMessage('账号已被注册')
    }
  }
</script>

<style lang="scss" scoped>
  .register-container {
    .register {
      width: 1200px;
      height: 445px;
      border: 1px solid rgb(223, 223, 223);
      margin: 0 auto;

      h3 {
        background: #ececec;
        margin: 0;
        padding: 6px 15px;
        color: #333;
        border-bottom: 1px solid #dfdfdf;
        font-size: 20.04px;
        line-height: 30.06px;

        span {
          font-size: 14px;
          float: right;

          a {
            color: #e1251b;
          }
        }
      }

      div:nth-of-type(1) {
        margin-top: 40px;
      }

      .content {
        padding-left: 390px;
        margin-bottom: 18px;
        position: relative;

        label {
          font-size: 14px;
          width: 96px;
          text-align: right;
          display: inline-block;
        }

        input {
          width: 270px;
          height: 38px;
          padding-left: 8px;
          box-sizing: border-box;
          margin-left: 5px;
          outline: none;
          border: 1px solid #999;
        }

        /**  原因新的vue3.0 单文件规范::v-deep写法已经被废弃了 
          ::v-deep .demo 
            替换成
          :deep(.demo)
        */
        :deep(.el-form-item) {
          margin: 0;
          --font-size: 12px;
        }

        :deep(.el-input) {
          width: 270px;
          height: 38px;
          margin-top: 0;
          font-size: 12px;
        }

        :deep(.el-input__inner::-webkit-input-placeholder) {
          color: #666;
        }

        :deep(.el-input__wrapper) {
          outline: none;
          border: 1px solid #999;
          border-radius: 0;
        }

        img {
          vertical-align: sub;
        }

        .error-msg {
          position: absolute;
          top: 100%;
          left: 495px;
          color: red;
        }
      }

      .controls {
        text-align: center;
        position: relative;

        input {
          vertical-align: middle;
        }

        .error-msg {
          position: absolute;
          top: 100%;
          left: 495px;
          color: red;
        }
      }

      .btn {
        text-align: center;
        line-height: 36px;
        margin: 17px 0 0 55px;

        button {
          outline: none;
          width: 270px;
          height: 36px;
          background: #e1251b;
          color: #fff !important;
          display: inline-block;
          font-size: 16px;
        }
      }
    }

    .copyright {
      width: 1200px;
      margin: 0 auto;
      text-align: center;
      line-height: 24px;

      ul {
        li {
          display: inline-block;
          border-right: 1px solid #e4e4e4;
          padding: 0 20px;
          margin: 15px 0;
        }
      }
    }
  }
</style>
