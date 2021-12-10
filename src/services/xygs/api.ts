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

/** 此处后端没有提供注释 POST /api/pois/ */
export async function createPoi(body: API.Poi, options?: { [key: string]: any }) {
  return request<any>('/api/pois/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
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

/** 此处后端没有提供注释 PUT /api/pois/${param0}/ */
export async function updatePoi(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updatePoiParams,
  body: API.Poi,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Poi>(`/api/pois/${param0}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 DELETE /api/pois/${param0}/ */
export async function destroyPoi(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.destroyPoiParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/pois/${param0}/`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PATCH /api/pois/${param0}/ */
export async function partialUpdatePoi(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.partialUpdatePoiParams,
  body: API.Poi,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Poi>(`/api/pois/${param0}/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
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

/** 此处后端没有提供注释 POST /api/mapSettings/ */
export async function createMapSettings(body: API.MapSettings, options?: { [key: string]: any }) {
  return request<any>('/api/mapSettings/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
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

/** 此处后端没有提供注释 PUT /api/mapSettings/${param0}/ */
export async function updateMapSettings(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateMapSettingsParams,
  body: API.MapSettings,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.MapSettings>(`/api/mapSettings/${param0}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 DELETE /api/mapSettings/${param0}/ */
export async function destroyMapSettings(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.destroyMapSettingsParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/mapSettings/${param0}/`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PATCH /api/mapSettings/${param0}/ */
export async function partialUpdateMapSettings(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.partialUpdateMapSettingsParams,
  body: API.MapSettings,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.MapSettings>(`/api/mapSettings/${param0}/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}
