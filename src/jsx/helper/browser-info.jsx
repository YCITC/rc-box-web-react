const getBrowserInfo = ()=>{
  let bowserInfo = {
    'name': '',
    'version': '',
  }
  if (navigator.userAgentData !== undefined) {
    bowserInfo.name = 'Chrome';
    navigator.userAgentData.brands.every((info) => {
      if (info.brand == 'Google Chrome') {
        bowserInfo.version = info.version;
        return;
      }
      return true;
    });
    return bowserInfo;
  }

  const infoList = navigator.userAgent.split(' ');
  infoList.every((info)=>{
    if (info.indexOf('Safari') > -1) {
      bowserInfo.name = 'Safari';
      bowserInfo.version = info.split('/')[1];
    }
    if (info.indexOf('Firefox') > -1) {
      bowserInfo.name = 'Firefox'
      bowserInfo.version = info.split('/')[1]
      return;
    }
    return true;
  })
  return bowserInfo;
};

export const useBroserInfo = () => getBrowserInfo();
