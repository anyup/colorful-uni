<template>
  <app-layout>
    <config-demo v-model="value" :list="list" content-height="100rpx">
      <col-loader :show="value.show" :mode="value.mode" :color="value.color" :size="value.size" :width="value.width" />
    </config-demo>
  </app-layout>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          type: 'mode',
          title: '动画的类型: mode',
          tips: '垂直方向或水平方向显示',
          layout: 'radio',
          list: ['circle', 'flower']
        },
        {
          type: 'color',
          title: '动画的颜色: color',
          tips: '只对 mode = circle 模式有效，默认#8f8d8e',
          layout: 'radio',
          list: ['#8f8d8e', '#027aff', '#16a98c']
        },
        {
          type: 'size',
          title: '图标的大小: size',
          tips: '单位rpx，默认34',
          layout: 'radio',
          list: [34, 50, 80]
        },
        {
          type: 'width',
          title: '宽度: 宽度',
          tips: '只对 mode = circle 模式有效，默认2px',
          layout: 'radio',
          list: ['1px', '2px', '3px']
        }
      ],
      value: {
        show: true,
        mode: 'circle',
        color: '#8f8d8e',
        size: '34',
        width: '1px'
      }
    }
  }
}
</script>
