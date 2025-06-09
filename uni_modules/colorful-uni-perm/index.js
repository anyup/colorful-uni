import { popup } from './popup.js'
import permissionUtil from './permission.js'

let permissionListener = null

const prefix = 'permissionStatus_'
const { uniPlatform, platform } = uni.getSystemInfoSync()

// 默认权限申请说明信息
const defaultPermissionExplainMap = {
  'android.permission.BLUETOOTH_SCAN': {
    title: '蓝牙扫描权限申请说明',
    content: '应用需要扫描附近的蓝牙设备，以便进行连接或数据传输。'
  },
  'android.permission.BLUETOOTH_CONNECT': {
    title: '蓝牙连接权限申请说明',
    content: '应用需要连接蓝牙设备，以便提供音频播放或数据通信功能。'
  },
  'android.permission.READ_MEDIA_IMAGE': {
    title: '读取图片权限申请说明',
    content: '应用需要访问您的图片库，以便加载和选择照片。'
  },
  'android.permission.READ_MEDIA_IMAGES': {
    title: '读取图片权限申请说明',
    content: '应用需要访问您的图片库，以便加载和选择照片。'
  },
  'android.permission.READ_MEDIA_VIDEO': {
    title: '读取视频权限申请说明',
    content: '应用需要访问您的视频库，以便播放和选择视频文件。'
  },
  'android.permission.READ_MEDIA_AUDIO': {
    title: '读取音频权限申请说明',
    content: '应用需要访问您的音频文件，以便播放音乐或录音。'
  },
  'android.permission.CALL_PHONE': {
    title: '拨打电话权限申请说明',
    content: '应用需要拨打电话权限，以便直接拨打联系人或客服热线。'
  },
  'android.permission.INTERNET': {
    title: '网络权限申请说明',
    content: '应用需要访问网络，以提供最新的内容和服务。'
  },
  'android.permission.READ_EXTERNAL_STORAGE': {
    title: '存储读取权限申请说明',
    content: '应用需要读取您的存储，以便加载图片、视频等多媒体文件。'
  },
  'android.permission.WRITE_EXTERNAL_STORAGE': {
    title: '存储写入权限申请说明',
    content: '应用需要写入您的存储，以便保存图片、视频等多媒体文件。'
  },
  'android.permission.READ_PHONE_STATE': {
    title: '设备信息权限申请说明',
    content: '应用需要访问设备信息，以便提供更好的用户体验。'
  },
  'android.permission.ACCESS_NETWORK_STATE': {
    title: '网络状态权限申请说明',
    content: '应用需要获取网络状态，以便优化网络请求。'
  },
  'android.permission.ACCESS_WIFI_STATE': {
    title: 'WiFi 状态权限申请说明',
    content: '应用需要获取 WiFi 状态，以便优化网络连接。'
  },
  'android.permission.CAMERA': {
    title: '相机权限申请说明',
    content: '应用需要访问您的相机，以便拍摄照片或扫描二维码。'
  },
  'android.permission.ACCESS_COARSE_LOCATION': {
    title: '定位权限申请说明',
    content: '应用需要获取您的大致位置信息，以便提供基于位置的服务。'
  },
  'android.permission.ACCESS_FINE_LOCATION': {
    title: '精确定位权限申请说明',
    content: '应用需要获取您的精确位置信息，以便提供导航等精准服务。'
  },
  'android.permission.ACCESS_LOCATION_EXTRA_COMMANDS': {
    title: '额外定位权限申请说明',
    content: '应用需要使用额外的定位功能，以提升定位精度。'
  },
  'android.permission.ACCESS_MOCK_LOCATION': {
    title: '模拟定位权限申请说明',
    content: '应用需要访问模拟位置，以便进行测试或特定功能。'
  },
  'android.permission.READ_CONTACTS': {
    title: '读取联系人权限申请说明',
    content: '应用需要读取您的联系人信息，以便提供通讯录相关功能。'
  },
  'android.permission.WRITE_CONTACTS': {
    title: '写入联系人权限申请说明',
    content: '应用需要写入您的联系人信息，以便管理通讯录。'
  },
  'android.permission.BLUETOOTH': {
    title: '蓝牙权限申请说明',
    content: '应用需要访问蓝牙功能，以便连接设备或传输数据。'
  },
  'android.permission.BLUETOOTH_ADMIN': {
    title: '蓝牙管理权限申请说明',
    content: '应用需要管理蓝牙功能，以便优化连接体验。'
  },
  'android.permission.RECEIVE_SMS': {
    title: '短信接收权限申请说明',
    content: '应用需要读取短信，以便自动填充验证码或提供相关功能。'
  },
  'android.permission.SEND_SMS': {
    title: '短信发送权限申请说明',
    content: '应用需要发送短信，以便提供短信验证等功能。'
  },
  'android.permission.WRITE_SMS': {
    title: '短信写入权限申请说明',
    content: '应用需要写入短信，以便存储和管理您的短信信息。'
  },
  'android.permission.READ_SMS': {
    title: '短信读取权限申请说明',
    content: '应用需要读取短信，以便自动填充验证码或提供相关功能。'
  },
  'android.permission.INSTALL_PACKAGES': {
    title: '安装应用权限申请说明',
    content: '应用需要安装其他应用，以便提供扩展功能。'
  },
  'android.permission.REQUEST_INSTALL_PACKAGES': {
    title: '安装包权限申请说明',
    content: '应用需要请求安装应用包权限，以便下载安装更新。'
  },
  'com.android.launcher.permission.INSTALL_SHORTCUT': {
    title: '创建快捷方式权限申请说明',
    content: '应用需要创建桌面快捷方式，以便您快速访问应用。'
  },
  'com.android.launcher.permission.UNINSTALL_SHORTCUT': {
    title: '删除快捷方式权限申请说明',
    content: '应用需要删除桌面快捷方式，以便管理您的快捷方式。'
  },
  'android.permission.RECORD_AUDIO': {
    title: '麦克风权限申请说明',
    content: '应用需要访问麦克风，以便进行语音输入或语音通话。'
  },
  'android.permission.MODIFY_AUDIO_SETTINGS': {
    title: '音频设置修改权限申请说明',
    content: '应用需要修改音频设置，以便优化音量或声音效果。'
  },
  'android.permission.GET_ACCOUNTS': {
    title: '账户权限申请说明',
    content: '应用需要访问您的账户信息，以便提供个性化服务。'
  },
  'android.permission.USE_FINGERPRINT': {
    title: '指纹识别权限申请说明',
    content: '应用需要使用指纹识别，以便进行身份验证。'
  },
  'android.permission.USE_BIOMETRIC': {
    title: '生物识别权限申请说明',
    content: '应用需要使用生物识别功能（如面部识别），以便进行身份验证。'
  },
  'android.permission.READ_CALENDAR': {
    title: '读取日历权限申请说明',
    content: '应用需要读取您的日历，以便提供日程管理功能。'
  },
  'android.permission.WRITE_CALENDAR': {
    title: '写入日历权限申请说明',
    content: '应用需要写入您的日历，以便添加或修改日程。'
  },
  'android.permission.READ_CALL_LOG': {
    title: '读取通话记录权限申请说明',
    content: '应用需要访问通话记录，以便提供通话管理或统计功能。'
  },
  'android.permission.WRITE_CALL_LOG': {
    title: '写入通话记录权限申请说明',
    content: '应用需要写入通话记录，以便管理通话历史。'
  },
  'android.permission.PROCESS_OUTGOING_CALLS': {
    title: '处理拨出电话权限申请说明',
    content: '应用需要访问拨出电话，以便提供通话拦截或号码识别功能。'
  },
  'android.permission.BODY_SENSORS': {
    title: '传感器权限申请说明',
    content: '应用需要访问您的传感器数据，以便提供健康或运动相关功能。'
  },
  'android.permission.ACTIVITY_RECOGNITION': {
    title: '活动识别权限申请说明',
    content: '应用需要访问您的活动状态，以便提供运动检测等功能。'
  },
  'android.permission.REQUEST_IGNORE_BATTERY_OPTIMIZATIONS': {
    title: '电池优化忽略权限申请说明',
    content: '应用需要忽略电池优化，以便在后台稳定运行。'
  },
  'android.permission.FOREGROUND_SERVICE': {
    title: '前台服务权限申请说明',
    content: '应用需要运行前台服务，以便提供持续运行的功能，如音乐播放、导航等。'
  },
  'android.permission.SYSTEM_ALERT_WINDOW': {
    title: '悬浮窗权限申请说明',
    content: '应用需要显示悬浮窗，以便提供浮动窗口功能，如聊天气泡、屏幕录制等。'
  },
  'android.permission.WRITE_SETTINGS': {
    title: '系统设置修改权限申请说明',
    content: '应用需要修改系统设置，以便调整亮度、铃声等个性化配置。'
  }
}

// 节流函数
let previous = 0
function throttle(func, wait = 500) {
  let now = Date.now()
  if (now - previous > wait) {
    typeof func === 'function' && func()
    previous = now
  }
}

/**
 * 创建请求权限的监听器
 * 该函数用于在特定平台上创建和管理权限请求的监听器，并根据权限请求的结果做出相应处理
 * @param {Object} permissionExplainMap - 包含权限名称和对应解释内容的映射对象，用于向用户展示权限请求的说明，默认为空对象
 */
const createRequestPermissionListener = (permissionExplainMap = {}) => {
  if (uniPlatform != 'app' || platform != 'android') return

  if (typeof permissionExplainMap != 'object') throw Error('permissionExplainMap 类型错误')

  permissionListener = permissionListener || uni.createRequestPermissionListener()

  permissionListener.onRequest(e => {
    console.log('onRequest', e)
  })

  permissionListener.onConfirm(e => {
    const [permissionName] = e

    const status = uni.getStorageSync(prefix + permissionName)
    console.log('onConfirm permissionName', permissionName, status)
    const content = permissionExplainMap[permissionName] || defaultPermissionExplainMap[permissionName]

    if (!status && content) {
      throttle(() => popup.show(content))
    }
  })

  permissionListener.onComplete(e => {
    const [permissionName] = e

    const status = uni.getStorageSync(prefix + permissionName)
    console.log('onComplete permissionName', permissionName, status)
    popup.close()
    
    const content = permissionExplainMap[permissionName] || defaultPermissionExplainMap[permissionName]

    if (status === -1 && content) {
      throttle(() => showModal(content.content))
    }
  })
}

function showModal(content) {
  uni.showModal({
    title: '权限申请已被拒绝',
    content: content + '请前往 APP 设置界面打开对应权限！',
    showCancel: false
  })
}

const stopRequestPermissionListener = () => {
  permissionListener && permissionListener.stop()
}

export { permissionUtil, createRequestPermissionListener, stopRequestPermissionListener }
