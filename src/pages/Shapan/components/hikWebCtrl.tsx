import { useState, useEffect } from 'react';

const HikWebCtrl = (props: any) => {
  const [pluginInstallErr, setPluginInstallErr] = useState<boolean>(false);
  const [pluginIsOld, setPluginIsOld] = useState<boolean>(false);
  // const [loginError, setLoginError] = useState<{code: string, msg: string}>();
  useEffect(
    ()=>{
      // @ts-ignore
      const webCtrl = window.WebVideoCtrl;
      // 插件状态 -1:未安装
      if ( webCtrl.I_CheckPluginInstall() == -1) {
        setPluginInstallErr(true);
        return
      }
      // 浏览器支持无插件  true:支持  false:不支持
      console.log(webCtrl.I_SupportNoPlugin() ? '浏览器支持无插件' : '浏览器不支持无插件')
      // 插件初始化
      webCtrl.I_InitPlugin('100%', '100%', {
        // 1:1x1 2:2x2 3:3x3 4:4x4
        iWndowType: 1,
        // 初始化完成
        cbInitPluginComplete: ()=>{
          // 嵌入播放插件
          // webCtrl.I_InsertOBJECTPlugin(props.cam.ip);
          webCtrl.I_WriteOBJECT_XHTML();
          // 检查插件是否最新
          if (-1 == webCtrl.I_CheckPluginVersion()) {
            setPluginIsOld(true);
            return;
          }
          // 登录摄像机
          webCtrl.I_Login(props.cam.ip, 1, '80', props.cam.username, props.cam.password, {
            success: ()=>{
              console.log('登录成功:'+props.cam.ip+':80');
              // 已经在放就先stop
              if (webCtrl.I_GetWindowStatus(0))
                webCtrl.I_Stop({iWndIndex:0})
              // 播放
              webCtrl.I_StartRealPlay(props.cam.ip+'_80',{
                iWndIndex:0
              })
            },
            error: (code: any, msg: any)=>{
              console.log('登录失败:'+props.cam.ip,code,msg);
            }
          })
        }
      })
      return(
        ()=>{
          console.log('登出设备:'+props.cam.ip+':80');
          webCtrl.I_Logout(props.cam.ip+'_80');
        }
      )
    },
    [props.cam.ip, props.cam.username, props.cam.password]
  )
  return(
    <div id={props.cam.ip} style={{
        width:'100%',
        height:'100%',
      }}>
      {pluginInstallErr && <div>需要的播放插件未安装</div>}
      {pluginIsOld && <div>插件版本需要更新</div>}
    </div>
  )
}

export default HikWebCtrl;
