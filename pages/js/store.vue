<template>
  <app-layout>
    <config-demo :list="list" align="left" tips="不会存储任何用户信息，只用来演示">
      <view class="is-pdt-10">昵称：{{ getter_user.userinfo.name }}</view>
      <view class="is-pdt-10">简介：{{ getter_user.nickname }}</view>
    </config-demo>
    <view class="is-pd-20">
      <u-form :model="form" ref="uForm" :label-width="115">
        <u-form-item label="昵称">
          <u-input v-model="form.name" placeholder="请输入姓名(持久化，刷新不丢失)" />
        </u-form-item>
        <u-form-item label="简介">
          <u-input v-model="form.nickname" placeholder="请输入昵称（未持久化，刷新丢失）" />
        </u-form-item>
      </u-form>
      <view class="is-mgtb-20 is-flex">
        <view class="is-flex-1">
          <app-button type="default" @click="reset">重置</app-button>
        </view>
        <view style="width: 100rpx"></view>
        <view class="is-flex-1">
          <app-button type="primary" @click="submit">提交</app-button>
        </view>
      </view>
    </view>
  </app-layout>
</template>

<script>
import { Store } from '@/uni_modules/colorful-uni'
const store = new Store()

export default {
  data() {
    return {
      form: {
        name: '',
        nickname: ''
      },
      list: [
        {
          title: '说明',
          tips: 'vuex store 状态管理，可设置是否持久化保存数据，刷新不清除'
        }
      ]
    }
  },
  onLoad() {
    console.log(this.getter_user)
    this.form = Object.assign({}, this.getter_user.userinfo || {})
  },
  methods: {
    submit() {
      new Store().set('userinfo', { name: this.form.name }, 'user').set('nickname', this.form.nickname, 'user')
      this.$_u.tips.success('保存成功，可刷新页面查看数据！')
      console.log(this.getter_user)
    },
    reset() {
      this.form = {
        name: '',
        nickname: ''
      }
      new Store().reset(['user']).reset()
    }
  }
}
</script>

<style></style>
