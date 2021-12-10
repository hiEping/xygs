declare namespace API {
  type Poi = {
    id?: number;
    name: string;
    ip?: string;
    port?: number;
    lng?: number;
    lat?: number;
    type?: string;
    km?: number;
    place?: string;
    manufacturer?: string;
    brand?: string;
    model?: string;
    username?: string;
    password?: string;
    direction?: string;
  };

  type MapSettings = {
    id?: number;
    mapStyle?: string;
    centerLng?: number;
    centerLat?: number;
    zoom?: number;
  };

  type retrievePoiParams = {
    /** A unique integer value identifying this poi. */
    id: string;
  };

  type updatePoiParams = {
    /** A unique integer value identifying this poi. */
    id: string;
  };

  type destroyPoiParams = {
    /** A unique integer value identifying this poi. */
    id: string;
  };

  type partialUpdatePoiParams = {
    /** A unique integer value identifying this poi. */
    id: string;
  };

  type retrieveMapSettingsParams = {
    /** A unique integer value identifying this map settings. */
    id: string;
  };

  type updateMapSettingsParams = {
    /** A unique integer value identifying this map settings. */
    id: string;
  };

  type destroyMapSettingsParams = {
    /** A unique integer value identifying this map settings. */
    id: string;
  };

  type partialUpdateMapSettingsParams = {
    /** A unique integer value identifying this map settings. */
    id: string;
  };
}
