<template>
  <view
    class="col-toast"
    :class="[
      visible ? 'col-toast-show' : '',
      content ? 'col-toast-padding' : '',
      isShowIcon() ? '' : 'col-unicon-padding',
      `col-toast-${position}`
    ]"
    :style="{ width: getWidth() }"
  >
    <text
      v-if="isShowIcon()"
      class="col-toast-icon auicon-iconfont"
      :class="[icon ? `auicon-iconfont-${icon}-circle` : '']"
    ></text>
    <view class="col-toast-text is-line-3" :class="[isShowIcon() ? '' : 'col-unicon']">{{ title }}</view>
    <view class="col-toast-text col-toast-text2" v-if="content && isShowIcon()">{{ content }}</view>
  </view>
</template>

<script>
export default {
  name: 'col-toast',
  props: {
    toast: {
      type: Object,
      default() {
        return { title: 'Success', icon: 'none', content: '' }
      }
    },
    duration: {
      type: Number,
      default: 2000
    },
    position: {
      type: String,
      default: 'center'
    }
  },
  data() {
    return {
      timer: null,
      //是否显示
      visible: false,
      //显示标题
      title: '操作成功',
      //显示内容
      content: '',
      //显示icon
      icon: 'none'
    }
  },
  watch: {
    toast: {
      deep: true,
      handler: function (newValue) {
        if (newValue && newValue.title) {
          let { title, icon, content = '' } = newValue
          this.show({ title, icon, content })
        }
      }
    }
  },
  methods: {
    show(options) {
      let icon = options.icon || 'none'
      clearTimeout(this.timer)
      this.visible = true
      this.title = options.title || ''
      this.content = options.content || ''
      this.icon = icon
      this.timer = setTimeout(() => {
        this.visible = false
        clearTimeout(this.timer)
        this.timer = null
        this.$_u.tips && this.$_u.tips.toast()
        this.$emit('cancel')
      }, this.duration)
    },
    getWidth() {
      let width = 'auto'
      if (this.isShowIcon()) {
        width = this.content ? '400rpx' : '360rpx'
      }
      return width
    },
    isShowIcon() {
      if (!this.icon) {
        return false
      }
      let icons = ['success', 'info', 'fail']
      return icons.findIndex(item => this.icon === item) >= 0
    }
  }
}
</script>

<style lang="scss">
@import '../../css/iconfont.css';

.col-toast {
  background: rgba(0, 0, 0, 0.75);
  border-radius: 10rpx;
  position: fixed;
  visibility: hidden;
  opacity: 0;
  left: 50%;
  top: 48%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  transition: 0.3s ease-in-out;
  transition-property: opacity, visibility;
  z-index: 999999;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 50rpx 20rpx 50rpx 20rpx;
  box-sizing: border-box;

  &.col-toast-bottom {
    top: 80%;
  }

  &.col-toast-top {
    top: 20%;
  }
}

.col-toast-padding {
  padding-top: 50rpx !important;
  padding-bottom: 50rpx !important;
}

.col-unicon-padding {
  padding: 24rpx 40rpx !important;
  word-break: break-all;
}

.col-toast-show {
  visibility: visible;
  opacity: 1;
}

.col-toast-icon {
  color: white;
  font-size: 100rpx;
  display: block;
  margin-bottom: 30rpx;
}

.col-toast-text {
  word-break: break-all;
  font-size: 30rpx;
  font-weight: 500;
  color: #fff;
  text-align: center;
}

.col-toast-text2 {
  padding-top: 20rpx;
  font-size: 26rpx;
}

.col-unicon {
  line-height: 40rpx !important;
  font-size: 32rpx !important;
}

.is-line-3 {
  overflow: hidden;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box; // 弹性伸缩盒
  -webkit-box-orient: vertical; // 设置伸缩盒子元素排列方式
  -webkit-line-clamp: 3;
}
</style>
