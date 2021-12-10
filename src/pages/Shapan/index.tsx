import {useEffect, useState } from 'react';
import { GlobalOutlined, LeftOutlined, RightOutlined, TableOutlined } from '@ant-design/icons';
import { Layout, Menu, Space, message, Modal } from 'antd';
import SettingDrawer from './components/settingsDrawer';
import DataDrawer from "@/pages/Shapan/components/dataDrawer";
import { Map, Marker } from 'react-amap';
import ProCard from '@ant-design/pro-card';
import HikWebCtrl from "@/pages/Shapan/components/hikWebCtrl";
import {listPois, listMapSettings, partialUpdateMapSettings} from "@/services/xygs/api";
import getKmName, { valueEnumDirection } from './components/util';
import {useModel} from "umi";

let count = 0;
export default ()=>{
  const { initialState } = useModel('@@initialState');
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
  // 侧面版-数据源
  const [dataDrawerVisible, setDataDrawerVisible] = useState<boolean>(false);
  const showDataDrawer = () => { setDataDrawerVisible(true) }
  const closeDataDrawer = () => { setDataDrawerVisible(false) }

  // 地图
  const [centerPoint, setCenterPoint] = useState<[number , number ] >([114.143621,32.199812]);                          // [114.143621,32.199812]
  const [styleString, setStyleString] = useState<string>('amap://styles/5228dc9ed756d11492490a95ae04ea3f');             // 'amap://styles/5228dc9ed756d11492490a95ae04ea3f'
  const [zoomLevel, setZoomLevel] = useState<number>(10);                                                               // 10
  const [drawerZoom, setDrawerZoom] = useState<number>();
  const [drawerPoint, setDrawerPoint] = useState<[number , number ]>([0,0]);
  const [poiData, setPoiData] = useState<API.Poi[]>([]);
  // 地图关注点POI
  const [focusPoi, setFocusPoi] = useState<API.Poi[]>([]);
  useEffect(
    ()=>{
      count++;
      // 获取map默认参数
      listMapSettings().then(
        (li) => {
          if (li[0]) {
            const ss = li[0];
            if (ss.zoom) {
              console.log('setZoom',count);
              setZoomLevel(ss.zoom);
              setDrawerZoom(ss.zoom);
            }
            if (ss.centerLng && ss.centerLat) {
              console.log('setCenter',count);
              setCenterPoint([ss.centerLng, ss.centerLat]);
              setDrawerPoint([ss.centerLng, ss.centerLat]);
            }
            if (ss.mapStyle) {
              console.log('setMapStyle',count)
              setStyleString(ss.mapStyle);
            }
          }
        }
      ).catch(
        err => {
          message.error('获取地图参数出错: ' + err.message);
        }
      );
      listPois().then(
        (poi) => {
          console.log('setPoiData',count);
          setPoiData(poi);
        }
      ).catch(
        err => {
          message.error('获取poi数据出错: ' + err.meesage)
        }
      );
      return(()=>{console.log('effect return: ',count)})
    },
    []
  )

  // 点击数据列表的行-操作-定位并播放
  const locateAndPlay = (p: API.Poi[]) => {
    if (1 == p.length && p[0].lng && p[0].lat) {
      setZoomLevel(16);
      setCenterPoint([ p[0].lng, p[0].lat ]);
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

  // 保存地图默认样式
  const saveDefaultMapStyle = () => {
    partialUpdateMapSettings(
      {id:'1'},
      {mapStyle:styleString},
      {headers: {
          Authorization: initialState.backendToken
        }}
    ).then(
      (obj) => {
        message.success('设置成功!');
        console.log(obj);
      }
    ).catch(
      err => message.error('设置失败了!')
    )
  }

  // 当前地图中心点设为初始值
  const saveDefaultMapCenter = () => {
    if (!drawerPoint) {
      message.warning('没有获取到当前地图中心点');
      return
    }
    partialUpdateMapSettings(
      {id:'1'},
      {centerLng:drawerPoint[0],centerLat:drawerPoint[1]},
      {headers: {
          Authorization: initialState.backendToken
        }}
    ).then(
      (obj) => {
        message.success('设置成功!');
        console.log(obj);
      }
    ).catch(
      err => message.error('设置失败了!')
    )
  }

  // 保存地图默认缩放层级
  const saveDefaultMapZoom = () => {
    if (!drawerZoom) {
      message.warning('没有获取到当前地图缩放层级');
    }
    partialUpdateMapSettings(
      {id:'1'},
      {zoom:drawerZoom},
      {headers: {
        Authorization: initialState.backendToken
        }}
    ).then(
      (obj) => {
        message.success('设置成功!');
        console.log(obj);
      }
    ).catch(
      err => message.error('设置失败了!')
    )
  }

  return(
    <Layout>
      <Content id='container' style={{height: contentHeight}}>
        <Map
          amapkey='16f674831bb5523bd7369df3182af025'
          version='1.4.15'
          mapStyle={styleString}
          zoom={zoomLevel}
          center={centerPoint}
          events={{
            'created': (map) => {
              map.on(
                'moveend',
                () => {
                  setDrawerPoint([map.getCenter().getLng(), map.getCenter().getLat()]);
                  // console.log(map.getCenter().getLng(), map.getCenter().getLat());
                }
              )
              map.on(
                'zoomend',
                () => {
                  setDrawerZoom(map.getZoom());
                  // console.log(map.getZoom());
                }
              )
            },
          }}
        >
          {poiData.map(
            (poi, idx)=> (
              <Marker
                key={poi.id}
                position={{longitude: poi.lng, latitude: poi.lat}}
                events={markerEvents}
                extData={poi}
                label={{
                  content: (poi.place=='road' && poi.direction && poi.km ? getKmName(poi.km) + valueEnumDirection[poi.direction]['text'] : poi.name),
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
          onClose={()=> {
            setSettingDrawerVisible(false)
          }}
          onChange={(v: string)=> {
            setStyleString(v);
            message.success('切换地图样式')
          }}
          mapStyle={styleString}
          mapCenter={drawerPoint}
          mapZoom={drawerZoom}
          setDefaultStyle={()=>{
            saveDefaultMapStyle()
          }}
          setDefaultCenter={()=>{
            saveDefaultMapCenter()
          }}
          setDefaultZoom={()=>{
            saveDefaultMapZoom()
          }}
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

