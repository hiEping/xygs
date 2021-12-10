import { Drawer, Space, Table, message } from 'antd';
import ProTable from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';
import {listPois} from "@/services/xygs/api";
import {default as getKmName, valueEnumDirection, valueEnumPlace, valueEnumType } from './util';


const DataDrawer = (props: any) => {
  const columns: ProColumns<API.Poi>[] = [
    {
      title: '名称',
      dataIndex: 'name',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '桩号',
      dataIndex: 'km',
      valueType: 'digit',
      hideInSearch: true,
      render: (a,b) => {return b.place=='road' ? getKmName(b.km) : ''}
    },
    {
      title: '分类',
      dataIndex: 'type',
      valueType: 'text',
      valueEnum: valueEnumType,
      initialValue:'all',
    },
    {
      title: '用途',
      dataIndex: 'place',
      valueType: 'text',
      valueEnum: valueEnumPlace,
      initialValue:'all',
    },
    {
      title: '方向',
      dataIndex: 'direction',
      valueType: 'text',
      valueEnum: valueEnumDirection,
      initialValue:'all',
    },
    {
      title: '用户名',
      dataIndex: 'username',
      hideInTable: true,
      hideInSearch: true,
    },
    {
      title: '密码',
      dataIndex: 'password',
      hideInTable: true,
      hideInSearch: true,
    },
    {
      title: 'IP',
      dataIndex: 'ip',
      hideInTable: true,
      hideInSearch: true,
    },
    {
      title: '操作',
      key: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          onClick={()=>props.onLocateAndPlay([record])}
          key="locate_play"
          style={
            record.type !== 'camera'
              ? {
                color: 'rgba(0,0,0,.25)',
                cursor: 'not-allowed',
              }
              : {}
          }
        >
          定位并播放
        </a>,
      ],
    },
  ]

  return (
    <Drawer
      title="数据"
      visible={props.visible}
      onClose={props.onClose}
      style={{opacity: props.opacity}}
      size='large'
    >
      <ProTable<API.Poi>
        request={ (params, sorter, filter) =>
          listPois({params:params, s:sorter, f:filter}).then(
            data => {
              message.success('查询数据成功');
              props.onDataChange(data);
              return {
                success:true,
                data:data,
                total:data.length
              }
            }
          ).catch(
            err => {
              message.error('查询数据出错: '+err.message);
              return {
                success: false,
                message: '查询数据失败'
              }
            }
          )
        }
        columns={columns}
        rowKey='id'
        pagination={{
          pageSize: 10,
        }}
        rowSelection={{
          // 自定义选择项参考: https://ant.design/components/table-cn/#components-table-demo-row-selection-custom
          // 注释该行则默认不显示下拉选项
          selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
        }}
        tableAlertRender={({ selectedRowKeys, onCleanSelected }) => (
          <Space size={24}>
          <span>
            已选 {selectedRowKeys.length} 项
            <a style={{ marginLeft: 8 }} onClick={onCleanSelected}>
              取消选择
            </a>
          </span>
          </Space>
        )}
        tableAlertOptionRender={({selectedRows}) => {
          return (
            selectedRows.length > 9 ?
              <Space size={16}>
                <a style={{color:'#ff0000'}}>太多了,选 9 个就够了!</a>
              </Space>
              :
              <Space size={16}>
                <a onClick={()=>{props.onLocateAndPlay(selectedRows)}}>同时播放</a>
              </Space>
          );
        }}
      />
    </Drawer>
  )
}
export default DataDrawer;
