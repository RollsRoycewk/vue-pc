<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>
        注册新用户
        <span class="go"
          >我有账号，去 <a href="login.html" target="_blank">登陆</a>
        </span>
      </h3>
      <ValidationProvider rules="required|length|phone" v-slot="v">
        <div class="content">
          <label>手机号:</label>
          <input
            type="text"
            placeholder="请输入你的手机号"
            v-model="user.phone"
          />
          <span class="error-msg">{{ v.errors[0] }}</span>
        </div>
      </ValidationProvider>
      <div class="content">
        <label>验证码:</label>
        <input type="text" placeholder="请输入验证码" v-model="user.code" />
        <img
          ref="code"
          src="http://182.92.128.115/api/user/passport/code"
          alt="code"
          @click="renovateCode"
        />
        <!-- <span class="error-msg">错误提示信息</span> -->
      </div>
      <div class="content">
        <label>登录密码:</label>
        <input
          type="text"
          placeholder="请输入你的登录密码"
          v-model="user.password"
        />
        <!-- <span class="error-msg">错误提示信息</span> -->
      </div>
      <div class="content">
        <label>确认密码:</label>
        <input
          type="text"
          placeholder="请输入确认密码"
          v-model="user.repassword"
        />
        <!-- <span class="error-msg">错误提示信息</span> -->
      </div>
      <div class="controls">
        <input name="m1" type="checkbox" v-model="user.isAgree" />
        <span>同意协议并注册《尚品汇用户协议》</span>
        <!-- <span class="error-msg">错误提示信息</span> -->
      </div>
      <div class="btn">
        <button @click="handleRegister">完成注册</button>
      </div>
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

<script>
import { ValidationProvider, extend } from "vee-validate";
import { required } from "vee-validate/dist/rules";
import { mapActions } from "vuex";

// 必填
extend("required", {
  ...required,
  message: "客官,留下您的联系方式",
});

// 长度
extend("length", {
  validate(value) {
    return value.length === 11;
  },
  message: "客官,长度不对哦",
});

// 手机号
extend("phone", {
  validate(value) {
    return /^1(3\d|4[5-8]|5[0-35-9]|6[567]|7[01345-8]|8\d|9[025-9])\d{8}$/.test(
      value
    );
  },
  message: "客官,手机号码格式有误",
});
export default {
  name: "Register",
  data() {
    return {
      user: {
        phone: "",
        password: "",
        repassword: "",
        code: "",
        isAgree: false,
      },
    };
  },
  components: {
    ValidationProvider,
  },
  methods: {
    ...mapActions(["registerAsync"]),
    // 点击提交按钮
    async handleRegister() {
      try {
        // 点击提前按钮,收集表单数据,进行数据效验,发送请求
        let { phone, password, repassword, code, isAgree } = this.user;

        // 登录按钮
        if (!isAgree) {
          this.$message("客官,请同意我们的霸王条约");
          return;
        }
        // 密码是否一致
        if (password !== repassword) {
          this.$message("两次密码输入不一致");
          return;
        }

        // 跳转,进行登录
        await this.registerAsync({ phone, password, code });
        this.$router.push("/login");

        // console.log(phone, password, repassword, code, isAgree);
      } catch {
        this.user.password = "";
        this.user.repassword = "";
        // 更新二维码
        this.renovateCode();
      }
    },
    // 切换验证码
    renovateCode() {
      this.$refs.code.src = "http://182.92.128.115/api/user/passport/code";
    },
  },
};
</script>

<style lang="less" scoped>
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