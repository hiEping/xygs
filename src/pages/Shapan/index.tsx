import { useState } from 'react';
import { GlobalOutlined, LeftOutlined, RightOutlined, TableOutlined } from '@ant-design/icons';
import { Layout, Menu, Space, message, Modal } from 'antd';
import SettingDrawer from './components/settingsDrawer';
import DataDrawer from "@/pages/Shapan/components/dataDrawer";
import { Map, Marker } from 'react-amap';
import ProCard from '@ant-design/pro-card';
import HikWebCtrl from "@/pages/Shapan/components/hikWebCtrl";
import {listPois, listMapSettings} from "@/services/xygs/api";
import { getKmName, valueEnumDirection } from './components/util';


export default ()=>{
  const { Sider, Content } = Layout;
  // 布局内容高度值
  const [contentHeight, setContentHeight] = useState<number>(window.innerHeight-48);
  //窗口改变大小后地图适应
  window.onresize = () =>{
    setContentHeight(window.innerHeight-48);
  }
  // 侧菜单收缩状态
  const [manuCollapsed, setManuCollapsed] = useState<boolean>(true);
  // 模式框(播放视频)visible属性
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  // 侧面版-地图设置
  const [settingDrawerVisible, setSettingDrawerVisible] = useState<boolean>(false);
  const showSettingDrawer = () => { setSettingDrawerVisible(true) }
  const closeSettingDrawer = () => { setSettingDrawerVisible(false) }
  // 侧面版-数据源
  const [dataDrawerVisible, setDataDrawerVisible] = useState<boolean>(false);
  const showDataDrawer = () => { setDataDrawerVisible(true) }
  const closeDataDrawer = () => { setDataDrawerVisible(false) }

  // 地图
  const [centerPoint, setCenterPoint] = useState<[number , number ] >();                            // [114.143621,32.199812]
  const [styleString, setStyleString] = useState<string>('normal');             // 'amap://styles/5228dc9ed756d11492490a95ae04ea3f'
  const [zoomLevel, setZoomLevel] = useState<number>();                                                               // 10
  const [drawerPoint, setDrawerPoint] = useState<[number , number ]>();
  const [drawerZoom, setDrawerZoom] = useState<number>();
  const [poiData, setPoiData] = useState<API.Poi[]>([]);
  const poiChanged = (data: API.Poi[]) => {
    console.log(data);
    setPoiData(data);
  }
  // 地图关注点POI
  const [focusPoi, setFocusPoi] = useState<API.Poi[]>([]);
  // 地图样式切换
  const onStyleChange = (v: string) => {
    setStyleString(v);
    message.success('切换地图样式')
  }

  // 点击数据列表的行-操作-定位并播放
  const locateAndPlay = (p: API.Poi[]) => {
    if (1 == p.length) {
      setZoomLevel(16);
      setCenterPoint([p[0].lng, p[0].lat]);
    };
    setFocusPoi(p);
    setModalVisible(true);
  }

  // 地图覆盖物Marker事件设置
  const markerEvents = {
    created: (ins: Marker) => {  },
    click: (e: any) => {
      setFocusPoi([e.target.De.extData]);
      setModalVisible(true);
    },
  }

  //  地图事件
  const mapEvents = {
    created: (map) => {
      map.on(
        'moveend',() => {
          setDrawerPoint([map.getCenter().getLng(), map.getCenter().getLat()]);
          console.log(map.getCenter().getLng(), map.getCenter().getLat());
        }
      );
      map.on(
        'zoomend', () => {
          setDrawerZoom(map.getZoom());
          console.log(map.getZoom());
        }
      );
      listMapSettings().then(
        (s) => {
          setZoomLevel(s[0].zoom);
          setCenterPoint([s[0].centerLng, s[0].centerLat]);
          setDrawerZoom(s[0].zoom);
          setDrawerPoint([s[0].centerLng, s[0].centerLat]);
          setStyleString(s[0].mapStyle);
        }
      )
    },
    complete: () => {
      // 获取poi
      listPois().then(
        (data) => {
          if (data.length > 0 ) {
            setPoiData(data);
            message.success('获取POI数据成功');
          }
        }
      ).catch(
        (err) => {
          message.error('获取POI数据出错: '+ err.message);
        }
      );
    },
  }

  // 保存地图默认样式
  const saveDefaultMapStyle = (styleName: string) => {

  }

  // 保存地图默认中心点
  const saveDefaultMapCenter = (lng: number, lat: number) => {

  }

  // 保存地图默认缩放层级
  const saveDefaultMapZoom = (zoom: number) => {

  }

  // 获取地图默认参数
  const getMapSettings = async () => {
    return await listMapSettings();
  }

  return(
    <Layout>
      <Content id='container' style={{height: contentHeight}}>
        <Map
          amapkey='16f674831bb5523bd7369df3182af025'
          mapStyle={styleString}
          center={centerPoint}
          zoom={zoomLevel}
          events={mapEvents}
        >
          {poiData.map(
            (poi, idx)=> (
              <Marker
                key={poi.id}
                position={{longitude: poi.lng, latitude: poi.lat}}
                events={markerEvents}
                extData={poi}
                label={{
                  content: (poi.place=='road' ? getKmName(poi.km) + valueEnumDirection[poi.direction]['text'] : poi.name),
                  offset: {x:25,y:5},
                }}
              />
            )
          )}
        </Map>
      </Content>
      <Sider
        theme='dark'
        collapsible
        defaultCollapsed={manuCollapsed}
        collapsedWidth={48}
        trigger={ manuCollapsed ? <LeftOutlined /> : <RightOutlined /> }
        onCollapse={(_)=>{setManuCollapsed(_)}}
      >
        <Menu mode='vertical' theme='dark'>
          <Menu.Item key='settings'>
            <Space size='large'>
              <a onClick={showSettingDrawer}>
                <GlobalOutlined style={{ fontSize: 20, color: '#e1e1e1'}}/>
              </a>
              设置
            </Space>
          </Menu.Item>
          <Menu.Item key='layers'>
            <Space size='large'>
              <a><img src='/layers.svg' width={20} height={20}/></a>
              图层
            </Space>
          </Menu.Item>
          <Menu.Item key='table'>
            <Space size='large'>
              <a onClick={showDataDrawer}>
                <TableOutlined style={{ fontSize: 20, color: '#e1e1e1'}}/>
              </a>
              数据
            </Space>
          </Menu.Item>
        </Menu>
        <SettingDrawer
          visible={settingDrawerVisible}
          onClose={closeSettingDrawer}
          onChange={onStyleChange}
          mapStyle={styleString}
          mapCenter={drawerPoint}
          mapZoom={drawerZoom}
        />
        <DataDrawer
          opacity={modalVisible ? 0.1 : 0.95}
          visible={dataDrawerVisible}
          onClose={closeDataDrawer}
          onLocateAndPlay={locateAndPlay}
          onDataChange={setPoiData}
        />
        <Modal
          visible={modalVisible}
          onCancel={()=>{setModalVisible(false)}}
          centered
          destroyOnClose
          footer={false}
          width={ focusPoi.length>1 ? '90%' : '50%' }
        >
          {
            focusPoi.length==1 &&
            <ProCard
              bordered
              title={focusPoi[0].type}
              subTitle={focusPoi[0].name}
              actions={[<a>play</a>, <a>picture</a>]}
            >
              <HikWebCtrl cam={focusPoi[0]}/>
            </ProCard>
          }
          {
            focusPoi.length>=2 &&
            focusPoi.length<=9 &&
            <ProCard
              ghost wrap gutter={8}
            >
              {focusPoi.map((p, idx) => (
                <ProCard
                  bordered
                  style={{marginTop:8}}
                  key={idx}
                  colSpan={focusPoi.length<5 ? 12 : 8}
                  title={p.type}
                  subTitle={p.name}
                  actions={[<a>play</a>, <a>picture</a>]}
                >
                  <HikWebCtrl cam={p}/>
                </ProCard>
              ))}
            </ProCard>
          }
        </Modal>
      </Sider>
    </Layout>
  )
}

