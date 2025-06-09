/**
 * @description: 创建一个原生弹窗
 * @param {*} options
 * @return {*}
 */
export class NativePopup {
  constructor(options = {}) {
    this.sysInfo = uni.getSystemInfoSync();

    const { bgColor = '#fff', titleColor = '#000', contentColor = '#272727' } = options;

    this.bgColor = bgColor;
    this.titleColor = titleColor;
    this.contentColor = contentColor;
  }

  createPopup = () => {
    const { statusBarHeight, screenWidth } = this.sysInfo;

    const popupView = new plus.nativeObj.View('popupView', {
      top: 0,
      left: 0,
      width: screenWidth,
      height: 110 + statusBarHeight + 'px',
      // backgroundColor: 'blue' // debug
    });

    popupView.addEventListener('click', this.close);

    const bgPadding = 15;

    popupView.drawRect(
      {
        color: 'rgba(0, 0, 0, 0.1)',
        radius: '10px',
      },
      {
        top: statusBarHeight + 7 + 'px',
        left: bgPadding - 2 + 'px',
        width: screenWidth - bgPadding * 2 + 4 + 'px',
        height: '100px',
      },
    );

    popupView.drawRect(
      {
        color: this.bgColor,
        radius: '10px',
      },
      {
        top: statusBarHeight + 5 + 'px',
        left: bgPadding + 'px',
        width: screenWidth - bgPadding * 2 + 'px',
        height: '100px',
      },
    );

    const padding = 10;

    popupView.drawText(
      this.title,
      {
        top: statusBarHeight + 10 + 'px',
        left: padding + bgPadding + 'px',
        height: '30px',
        width: screenWidth - bgPadding * 2 - padding * 2 + 'px',
      },
      {
        size: '16px',
        weight: 'bold',
        align: 'left',
        color: this.titleColor,
      },
      {
        onClick: function (e) {
          console.log(e);
        },
      },
    );

    popupView.drawText(
      this.content,
      {
        top: statusBarHeight + 40 + 'px',
        height: '60px',
        left: padding + bgPadding + 'px',
        width: screenWidth - bgPadding * 2 - padding * 2 + 'px',
      },
      {
        size: '14px',
        align: 'left',
        color: this.contentColor,
        whiteSpace: 'normal',
      },
    );

    this.popupView = popupView;

    return popupView;
  };

  show = (options = {}) => {
    this.close();

    const { title = '权限申请说明', content = '' } = options;
    this.title = title;
    this.content = content;

    this.createPopup();

    this.popupView.show();
  };

  close = () => {
    this.popupView && this.popupView.close();
  };
}

export const popup = new NativePopup();
