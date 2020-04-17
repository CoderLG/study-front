const config = {
  /**
   * 发布相关
   */
  publish: {
    /**
     * 允许的类型
     */
    types: {
      images: ['tif', 'tiff', 'img', 'grd', 'gz'],
      vector: ['shp', 'zip'],
    },
    isCan: (ext) => {
      const values = Object.values(config.publish.types);
      let isCan = false;
      for (let i = 0; i < values.length; i += 1) {
        if (values[i].indexOf(ext) > -1) {
          isCan = true;
          break;
        }
      }
      return isCan;
    },
    getType(ext) {
      const keyValues = Object.entries(config.publish.types);
      let type = null;
      for (let i = 0; i < keyValues.length; i += 1) {
        if (keyValues[i][1].indexOf(ext) > -1) {
          type = keyValues[i][0];
          break;
        }
      }
      return type;
    },
  },
  isNeedAuth: true,
  language: 'cn',
};
export default config;
