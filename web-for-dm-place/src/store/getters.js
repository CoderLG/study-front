export default {
  menus: state => state.user.menus,
  token: state => state.user.token,
  userInfo: state => state.user.info,
  markCollect: state => state.user.markcollect,
  cameracollect: state => state.user.cameracollect,
  settings: state => state.setting,
  isInLoaing: state => state.user.isInLoaing,
  baseImageObj: state => state.user.baseImageObj,
  fileType: state => state.user.fileType,
};

