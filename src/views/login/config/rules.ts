//账号登录校验
export const accountRules = {
  account: [
    {
      required: true,
      message: '请输入账号。',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '请输入密码。',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{8,}$/,
      message: '密码不可少于8位。',
      trigger: 'blur'
    }
  ]
};

//手机号登录校验
export const phoneRules = {
  phone: [
    {
      required: true,
      message: '请输入手机号。',
      trigger: 'blur'
    },
    {
      pattern: /^[1]([3-9])[0-9]{9}$/,
      message: '手机号格式不正确。',
      trigger: 'blur'
    }
  ],
  verifyCode: [
    {
      required: true,
      message: '请输入验证码。',
      trigger: 'blur'
    }
  ]
};
