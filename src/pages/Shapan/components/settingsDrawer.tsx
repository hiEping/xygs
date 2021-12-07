import { Drawer, Collapse, Radio, Space, Button, InputNumber } from 'antd';

const SettingDrawer = ( props: any ) => {
  return(
    <Drawer
      title="设置"
      visible={props.visible}
      onClose={props.onClose}
      style={{opacity:0.95}}
    >
      <Collapse collapsible='header' ghost defaultActiveKey={['mapStyle', 'defaultZoom', 'defaultCenter']}>
        <Collapse.Panel header='地图样式' key='mapStyle' >
          <Space direction='vertical'>
            <Radio.Group onChange={(obj)=>props.onChange(obj.target.value)} defaultValue={props.mapStyle ? props.mapStyle : 'amap://styles/5228dc9ed756d11492490a95ae04ea3f'}>
              <Radio key='5228dc9ed756d11492490a95ae04ea3f' value='amap://styles/5228dc9ed756d11492490a95ae04ea3f'>极夜蓝</Radio>
              <Radio key='911b42ea783ae0387f4062f9bb805f06' value='dark'>幻夜黑</Radio>
              <Radio key='ae3e75b1e26eaedc8e09ae379e2932da' value='amap://styles/ae3e75b1e26eaedc8e09ae379e2932da'>马卡龙</Radio>
              {/*<Radio key='24302bfe6bc8dc88a395ef5fd0c8c99a' value='blue_night'>blue night</Radio>*/}
              {/*<Radio key='7672d1fcd5ba6c615a56fe2091c8bcc2' value='amap://styles/7672d1fcd5ba6c615a56fe2091c8bcc2'>酱籽红</Radio>*/}
            </Radio.Group>
            <Button block>设为默认</Button>
          </Space>
        </Collapse.Panel>
        <Collapse.Panel header='初始缩放层级' key='defaultZoom' >
          <Space direction='vertical'>
            <InputNumber addonBefore="缩放层级" value={props.mapZoom} disabled/>
            <Button block>设为默认</Button>
          </Space>
        </Collapse.Panel>
        <Collapse.Panel header='初始坐标' key='defaultCenter' >
          <Space direction='vertical'>
            <InputNumber addonBefore="经度" step="0.0000000001" disabled value={props.mapCenter ? props.mapCenter[0] : 0}/>
            <InputNumber addonBefore="纬度" step="0.0000000001" disabled value={props.mapCenter ? props.mapCenter[1] : 0}/>
            <Button block>设为默认</Button>
          </Space>
        </Collapse.Panel>
      </Collapse>
    </Drawer>
  )
}

export default SettingDrawer;
