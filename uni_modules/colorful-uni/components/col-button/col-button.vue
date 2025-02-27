<template>
  <button
    id="col-wave-btn"
    class="col-btn is-line-1 col-fix-ios-appearance"
    :class="[
      'col-size-' + size,
      plain ? 'col-btn--' + type + '--plain' : '',
      hollow ? 'col-btn--' + type + '--hollow' : '',
      loading ? 'col-loading' : '',
      shape == 'circle' ? 'col-round-circle' : '',
      hairLine ? showHairLineBorder : 'col-btn--bold-border',
      'col-btn--' + type,
      disabled ? `col-btn--${type}--disabled` : ''
    ]"
    :hover-start-time="Number(hoverStartTime)"
    :hover-stay-time="Number(hoverStayTime)"
    :disabled="disabled"
    :form-type="formType"
    :open-type="openType"
    :app-parameter="appParameter"
    :hover-stop-propagation="hoverStopPropagation"
    :send-message-title="sendMessageTitle"
    send-message-path="sendMessagePath"
    :lang="lang"
    :data-name="dataName"
    :session-from="sessionFrom"
    :send-message-img="sendMessageImg"
    :show-message-card="showMessageCard"
    @getphonenumber="getphonenumber"
    @getuserinfo="getuserinfo"
    @error="error"
    @opensetting="opensetting"
    @launchapp="launchapp"
    :style="[
      customStyle,
      {
        overflow: ripple ? 'hidden' : 'visible'
      }
    ]"
    @tap.stop="click($event)"
    :hover-class="getHoverClass"
    :loading="loading"
  >
    <slot></slot>
    <view
      v-if="ripple"
      class="col-wave-ripple"
      :class="[waveActive ? 'col-wave-active' : '']"
      :style="{
        top: rippleTop + 'px',
        left: rippleLeft + 'px',
        width: fields.targetWidth + 'px',
        height: fields.targetWidth + 'px',
        'background-color': rippleBgColor || 'rgba(0, 0, 0, 0.15)'
      }"
    ></view>
  </button>
</template>

<script>
/**
 * button 按钮
 * @description Button 按钮
 * @property {String} size 按钮的大小
 * @property {Boolean} ripple 是否开启点击水波纹效果
 * @property {String} ripple-bg-color 水波纹的背景色，ripple为true时有效
 * @property {String} type 按钮的样式类型
 * @property {Boolean} plain 按钮是否镂空，背景色透明
 * @property {Boolean} hollow 按钮是否镂空，背景色透明
 * @property {Boolean} disabled 是否禁用
 * @property {Boolean} hair-line 是否显示按钮的细边框(默认true)
 * @property {Boolean} shape 按钮外观形状，见文档说明
 * @property {Boolean} loading 按钮名称前是否带 loading 图标(App-nvue 平台，在 ios 上为雪花，Android上为圆圈)
 * @property {String} form-type 用于 <form> 组件，点击分别会触发 <form> 组件的 submit/reset 事件
 * @property {String} open-type 开放能力
 * @property {String} data-name 额外传参参数，用于小程序的data-xxx属性，通过target.dataset.name获取
 * @property {String} hover-class 指定按钮按下去的样式类。当 hover-class="none" 时，没有点击态效果(App-nvue 平台暂不支持)
 * @property {Number} hover-start-time 按住后多久出现点击态，单位毫秒
 * @property {Number} hover-stay-time 手指松开后点击态保留时间，单位毫秒
 * @property {Object} custom-style 对按钮的自定义样式，对象形式，见文档说明
 * @event {Function} click 按钮点击
 * @event {Function} getphonenumber open-type="getPhoneNumber"时有效
 * @event {Function} getuserinfo 用户点击该按钮时，会返回获取到的用户信息，从返回参数的detail中获取到的值同uni.getUserInfo
 * @event {Function} error 当使用开放能力时，发生错误的回调
 * @event {Function} opensetting 在打开授权设置页并关闭后回调
 * @event {Function} launchapp 打开 APP 成功的回调
 * @example <col-button>月落</col-button>
 */

import { Optimize } from '../../core/class/Optimize'

export default {
  name: 'col-button',
  props: {
    // 是否细边框
    hairLine: {
      type: Boolean,
      default: true
    },
    // 按钮的预置样式，default，primary，error，warning，success
    type: {
      type: String,
      default: 'default'
    },
    // 按钮尺寸，default，medium，mini
    size: {
      type: String,
      default: 'default'
    },
    // 按钮形状，circle（两边为半圆），square（带圆角）
    shape: {
      type: String,
      default: 'square'
    },
    // 按钮是否镂空
    plain: {
      type: Boolean,
      default: false
    },
    // 按钮是否镂空
    hollow: {
      type: Boolean,
      default: false
    },
    // 是否禁止状态
    disabled: {
      type: Boolean,
      default: false
    },
    // 是否加载中
    loading: {
      type: Boolean,
      default: false
    },
    // 开放能力，具体请看uniapp稳定关于button组件部分说明
    // https://uniapp.dcloud.io/component/button
    openType: {
      type: String,
      default: ''
    },
    // 用于 <form> 组件，点击分别会触发 <form> 组件的 submit/reset 事件
    // 取值为submit（提交表单），reset（重置表单）
    formType: {
      type: String,
      default: ''
    },
    // 打开 APP 时，向 APP 传递的参数，open-type=launchApp时有效
    // 只微信小程序、QQ小程序有效
    appParameter: {
      type: String,
      default: ''
    },
    // 指定是否阻止本节点的祖先节点出现点击态，微信小程序有效
    hoverStopPropagation: {
      type: Boolean,
      default: false
    },
    // 指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文。只微信小程序有效
    lang: {
      type: String,
      default: 'en'
    },
    // 会话来源，open-type="contact"时有效。只微信小程序有效
    sessionFrom: {
      type: String,
      default: ''
    },
    // 会话内消息卡片标题，open-type="contact"时有效
    // 默认当前标题，只微信小程序有效
    sendMessageTitle: {
      type: String,
      default: ''
    },
    // 会话内消息卡片点击跳转小程序路径，open-type="contact"时有效
    // 默认当前分享路径，只微信小程序有效
    sendMessagePath: {
      type: String,
      default: ''
    },
    // 会话内消息卡片图片，open-type="contact"时有效
    // 默认当前页面截图，只微信小程序有效
    sendMessageImg: {
      type: String,
      default: ''
    },
    // 是否显示会话内消息卡片，设置此参数为 true，用户进入客服会话会在右下角显示"可能要发送的小程序"提示，
    // 用户点击后可以快速发送小程序消息，open-type="contact"时有效
    showMessageCard: {
      type: Boolean,
      default: false
    },
    // 手指按（触摸）按钮时按钮时的背景颜色
    hoverBgColor: {
      type: String,
      default: ''
    },
    // 水波纹的背景颜色
    rippleBgColor: {
      type: String,
      default: ''
    },
    // 是否开启水波纹效果
    ripple: {
      type: Boolean,
      default: false
    },
    // 按下的类名
    hoverClass: {
      type: String,
      default: ''
    },
    // 自定义样式，对象形式
    customStyle: {
      type: Object,
      default() {
        return {}
      }
    },
    // 额外传参参数，用于小程序的data-xxx属性，通过target.dataset.name获取
    dataName: {
      type: String,
      default: ''
    },
    // 节流，一定时间内只能触发一次
    throttleTime: {
      type: [String, Number],
      default: 1000
    },
    // 按住后多久出现点击态，单位毫秒
    hoverStartTime: {
      type: [String, Number],
      default: 20
    },
    // 手指松开后点击态保留时间，单位毫秒
    hoverStayTime: {
      type: [String, Number],
      default: 150
    },
    customTypes: {
      type: Array,
      default() {
        return []
      }
    }
  },
  computed: {
    // 所有类型
    allTypes() {
      return [...['primary', 'success', 'error', 'warning'], ...this.customTypes]
    },
    // 当没有传bgColor变量时，按钮按下去的颜色类名
    getHoverClass() {
      // 如果开启水波纹效果，则不启用hover-class效果
      if (this.loading || this.disabled || this.ripple || this.hoverClass) return ''
      let hoverClass = ''
      hoverClass = this.plain || this.hollow ? 'col-' + this.type + '-plain-hover' : 'col-' + this.type + '-hover'
      return hoverClass
    },
    // 在'primary', 'success', 'error', 'warning'类型下，不显示边框，否则会造成四角有毛刺现象
    showHairLineBorder() {
      if (this.allTypes.indexOf(this.type) >= 0 && !this.plain && !this.hollow) {
        return ''
      } else {
        return 'col-hairline-border'
      }
    },
    optimize() {
      return new Optimize.Builder(this.throttleTime)
    }
  },
  data() {
    return {
      rippleTop: 0, // 水波纹的起点Y坐标到按钮上边界的距离
      rippleLeft: 0, // 水波纹起点X坐标到按钮左边界的距离
      fields: {}, // 波纹按钮节点信息
      waveActive: false // 激活水波纹
    }
  },
  methods: {
    // 按钮点击
    click(e) {
      this.optimize.throttle(() => {
        // 如果按钮时disabled和loading状态，不触发水波纹效果
        if (this.loading === true || this.disabled === true) return
        // 是否开启水波纹效果
        if (this.ripple) {
          // 每次点击时，移除上一次的类，再次添加，才能触发动画效果
          this.waveActive = false
          this.$nextTick(function () {
            this.getWaveQuery(e)
          })
        }
        this.$emit('click', e)
      })
    },
    // 查询按钮的节点信息
    getWaveQuery(e) {
      this.getElQuery().then(res => {
        // 查询返回的是一个数组节点
        let data = res[0]
        // 查询不到节点信息，不操作
        if (!data.width) return
        // 水波纹的最终形态是一个正方形(通过border-radius让其变为一个圆形)，这里要保证正方形的边长等于按钮的最长边
        // 最终的方形（变换后的圆形）才能覆盖整个按钮
        data.targetWidth = data.height > data.width ? data.height : data.width
        if (!data.targetWidth) return
        this.fields = data
        let touchesX = '',
          touchesY = ''
        // #ifdef MP-BAIDU
        touchesX = e.changedTouches[0].clientX
        touchesY = e.changedTouches[0].clientY
        // #endif
        // #ifdef MP-ALIPAY
        touchesX = e.detail.clientX
        touchesY = e.detail.clientY
        // #endif
        // #ifndef MP-BAIDU || MP-ALIPAY
        touchesX = e.touches[0].clientX
        touchesY = e.touches[0].clientY
        // #endif
        // 获取触摸点相对于按钮上边和左边的x和y坐标，原理是通过屏幕的触摸点（touchesY），减去按钮的上边界data.top
        // 但是由于`transform-origin`默认是center，所以这里再减去半径才是水波纹view应该的位置
        // 总的来说，就是把水波纹的矩形（变换后的圆形）的中心点，移动到我们的触摸点位置
        this.rippleTop = touchesY - data.top - data.targetWidth / 2
        this.rippleLeft = touchesX - data.left - data.targetWidth / 2
        this.$nextTick(() => {
          this.waveActive = true
        })
      })
    },
    // 获取节点信息
    getElQuery() {
      return new Promise(resolve => {
        let queryInfo = ''
        // 获取元素节点信息，请查看uniapp相关文档
        // https://uniapp.dcloud.io/api/ui/nodes-info?id=nodesrefboundingclientrect
        queryInfo = uni.createSelectorQuery().in(this)
        //#ifdef MP-ALIPAY
        queryInfo = uni.createSelectorQuery()
        //#endif
        queryInfo.select('.col-btn').boundingClientRect()
        queryInfo.exec(data => {
          resolve(data)
        })
      })
    },
    // 下面为对接uniapp官方按钮开放能力事件回调的对接
    getphonenumber(res) {
      this.$emit('getphonenumber', res)
    },
    getuserinfo(res) {
      this.$emit('getuserinfo', res)
    },
    error(res) {
      this.$emit('error', res)
    },
    opensetting(res) {
      this.$emit('opensetting', res)
    },
    launchapp(res) {
      this.$emit('launchapp', res)
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../css/mixin.scss';

.col-btn::after {
  border: none;
}

.col-btn {
  position: relative;
  border: 0;
  //border-radius: 10rpx;
  /* #ifndef APP-NVUE */
  display: inline-flex;
  /* #endif */
  // 避免边框某些场景可能被“裁剪”，不能设置为hidden
  overflow: visible;
  line-height: 1;
  @include vue-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0 40rpx;
  z-index: 1;
  box-sizing: border-box;
  transition: all 0.15s;

  $type: default, primary, success, warning, error;
  $color: $is-content-color, #ffffff, #ffffff, #ffffff, #ffffff;
  $main: #ffffff, $is-type-primary, $is-type-success, $is-type-warning, $is-type-error;
  $light: #ffffff, $is-type-primary-light, $is-type-success-light, $is-type-warning-light, $is-type-error-light;
  $disabled: #ffffff, $is-type-primary-disabled, $is-type-success-disabled, $is-type-warning-disabled,
    $is-type-error-disabled;
  $dark: rgba(0, 0, 0, 0.03), $is-type-primary-dark, $is-type-success-dark, $is-type-warning-dark, $is-type-error-dark;

  &--bold-border {
    border: 1px solid #ffffff;
  }

  @for $i from 1 through length($type) {
    @include add-btn-theme(
      nth($type, $i),
      nth($color, $i),
      nth($main, $i),
      nth($light, $i),
      nth($disabled, $i),
      nth($dark, $i)
    );
  }
}

.col-hairline-border:after {
  content: ' ';
  position: absolute;
  pointer-events: none;
  // 设置为border-box，意味着下面的scale缩小为0.5，实际上缩小的是伪元素的内容（border-box意味着内容不含border）
  box-sizing: border-box;
  // 中心点作为变形(scale())的原点
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  left: 0;
  top: 0;
  width: 199.8%;
  height: 199.7%;
  -webkit-transform: scale(0.5, 0.5);
  transform: scale(0.5, 0.5);
  border: 1px solid currentColor;
  z-index: 1;
}

.col-wave-ripple {
  z-index: 0;
  position: absolute;
  border-radius: 100%;
  background-clip: padding-box;
  pointer-events: none;
  user-select: none;
  transform: scale(0);
  opacity: 1;
  transform-origin: center;
}

.col-wave-ripple.col-wave-active {
  opacity: 0;
  transform: scale(2);
  transition: opacity 1s linear, transform 0.4s linear;
}

.col-round-circle {
  border-radius: 100rpx;
}

.col-round-circle::after {
  border-radius: 100rpx;
}

.col-loading::after {
  background-color: hsla(0, 0%, 100%, 0.35);
}

.col-size-default {
  font-size: 30rpx;
  height: 80rpx;
  line-height: 80rpx;
}

.col-size-medium {
  /* #ifndef APP-NVUE */
  display: inline-flex;
  /* #endif */
  width: auto;
  font-size: 28rpx;
  height: 70rpx;
  line-height: 70rpx;
  // padding: 0 80rpx;
}

.col-size-mini {
  /* #ifndef APP-NVUE */
  display: inline-flex;
  /* #endif */
  width: auto;
  font-size: 25rpx;
  padding-top: 1px;
  height: 50rpx;
  line-height: 50rpx;
  padding: 0 20rpx;
}

/* start--去除webkit的默认样式--start */
.col-fix-ios-appearance {
  -webkit-appearance: none;
}
/* end--去除webkit的默认样式--end */

.is-line-1 {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
