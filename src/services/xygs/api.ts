// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/pois/ */
export async function listPois(options?: { [key: string]: any }) {
  return request<API.Poi[]>('/api/pois/', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/pois/${param0}/ */
export async function retrievePoi(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.retrievePoiParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Poi>(`/api/pois/${param0}/`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/mapSettings/ */
export async function listMapSettings(options?: { [key: string]: any }) {
  return request<API.MapSettings[]>('/api/mapSettings/', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/mapSettings/${param0}/ */
export async function retrieveMapSettings(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.retrieveMapSettingsParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.MapSettings>(`/api/mapSettings/${param0}/`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}
