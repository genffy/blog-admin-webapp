import React, { useState } from 'react';
import classnames from 'classnames';
import { Input, Form, Button, Checkbox } from 'antd';
import { SafetyOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginProps, UserForgot, UserLogin } from './types';
import './style.scss'

import { useAppDispatch, useAppSelector } from 'store/hooks';
import {
  userLogin,
  userFogot,
  userReset,
  selectLoading,
} from './store.slice';

const LoginForm = (props: LoginProps) => {
  const [forgot, setForgot] = useState(false);
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectLoading);
  const getTwoFactorAuth = ():JSX.Element | null => {
    if (window.SysConfig.options.two_factor_auth) {
      return (
        <Form onFinish={handleForgotSubmit} className="login-form">
          <Form.Item name="two_factor_auth" rules={
            [{ len: 6, message: '长度为6个字符' }, {
              required: true,
              message: '请填写二步验证码'
            }]
          }>
            <Input prefix={<SafetyOutlined />} type="text" placeholder="二步验证码" />
          </Form.Item>
        </Form>
      );
    }
    return null;
  }
  // 登录
  const handleSubmit = (values: UserLogin) => {
    dispatch(userLogin(values))
  }
  // 重置密码
  const handleForgotSubmit = (values: UserForgot) => {
    dispatch(userFogot(values))
  }

  const handleResetSubmit = (values: UserLogin) => {
    const search = props.location.search;
    const token = new URLSearchParams(search).get('token');
    dispatch(userReset({ password: values.password, token: token }))
  }

  const toggleForgot = () => {
    setForgot(!forgot)
  }

  const renderReset = () => {
    return (
      <div className="container">
        <div className="row forgot">
          <h1 className="text-center">
            <a href="/">{window.SysConfig.options.title}</a>
          </h1>
          <Form onFinish={handleResetSubmit} className="login-form">
            <Form.Item name="password" rules={
              [{ min: 8, max: 20, message: '密码长度为8到30个字符' }, {
                required: true,
                message: '请填写密码!'
              }]
            }>
              <Input prefix={<LockOutlined />} type="text" placeholder="请输入新密码" />
            </Form.Item>
            <Form.Item>
              <Button
                style={{ width: '100%' }}
                type="primary"
                htmlType="submit"
                className="login-form-button"
                loading={loading}
                size="large"
              >
                设置新密码
                </Button>
            </Form.Item>
          </Form>
          <div className="form-footer">
            <div className="left back-site">
              <a href="/">← 回到{window.SysConfig.options.title}</a>
            </div>
            <div className="right forgot-password">
              <a href="/admin">重新登录</a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const renderForgot = () => {
    return (
      <div className="container">
        <div className="row forgot">
          <h1 className="text-center">
            <a href="/">{window.SysConfig.options.title}</a>
          </h1>
          <Form onFinish={handleForgotSubmit} className="login-form">
            <Form.Item
              extra="您会收到一封包含创建新密码链接的电子邮件。"
              name="user"
              rules={
                [{
                  required: true,
                  message: '请输入您的用户名或电子邮箱地址!'
                }]
              }
            >
              <Input prefix={<UserOutlined />} type="text" placeholder="用户名或电子邮箱地址" />
            </Form.Item>
            <Form.Item>
              <Button
                style={{ width: '100%' }}
                type="primary"
                htmlType="submit"
                className="login-form-button"
                loading={loading}
                size="large"
              >
                获取新密码
                </Button>
            </Form.Item>
          </Form>
          <div className="form-footer">
            <div className="left back-site">
              <a href="/">← 回到{window.SysConfig.options.title}</a>
            </div>
            <div className="right forgot-password">
              <Button type="link" onClick={toggleForgot}>重新登录</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const search = props.location.search;
  const reset = new URLSearchParams(search).get('reset');
  if (reset) {
    return renderReset();
  }

  if (forgot) {
    return renderForgot();
  }

  return (
    <div className="container">
      <div className="row">
        <div className="login">
          <h1 className="text-center">
            <a href="/">{window.SysConfig.options.title}</a>
          </h1>
          <Form name="login" onFinish={handleSubmit} initialValues={{ remember: true }} className="login-form">
            <Form.Item name="username" rules={
              [{ min: 4, max: 20, message: '长度为4到20个字符' }, {
                required: true,
                message: '请输入用户名!'
              }]
            }>
              <Input prefix={<UserOutlined />} type="text" placeholder="用户名" />
            </Form.Item>
            <Form.Item name="password" rules={
              [{ required: true, message: '请输入密码!' }]
            } >
              <Input prefix={<LockOutlined />} type="password" placeholder="密码" />
            </Form.Item>
            {getTwoFactorAuth()}
            <Form.Item name="remember" valuePropName="checked" rules={
              [{ required: true }]
            }>
              <Checkbox style={{ fontWeight: 'normal' }}>自动登录</Checkbox>
            </Form.Item>
            <Form.Item>
              <div className={classnames('right', 'forgot-password', {
                hidden: true || window.SysConfig.options.ldap_on === '1'
              })}>
                {!window.SysConfig.options.intranet ? null : <a href="/admin/user/intranet">域账号登录</a>}
                {!window.SysConfig.options.intranet ? null : <Button type="link"> | </Button>}
                <Button type="link" onClick={toggleForgot}>找回密码</Button>
              </div>
              <Button
                style={{ width: '100%' }}
                type="primary"
                htmlType="submit"
                className="login-form-button"
                loading={loading}
              >
                登录
                </Button>
            </Form.Item>
          </Form>
          <div className="form-footer">
            <div className="left back-site">
              <a href="/">← 回到{window.SysConfig.options.title}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;