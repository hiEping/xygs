export const valueEnumDirection = {
  all: {text:'双向'},
  up: {text:'上行'},
  down: {text:'下行'},
}

export const valueEnumPlace = {
  all: {text:'全部'},
  road: {text:'道路'},
  square: {text:'广场'},
  outsideLane: {text:'车道亭外'},
  insideLane: {text:'车道亭内'},
}

export const valueEnumType = {
  all:{text:'全部'},
  camera:{text:'摄像机'},
}


// @ts-ignore
export const getKmName: string = (kmValue: number) => {
  const str = kmValue.toString();
  // @ts-ignore
  const [origin, kWord, mWord] = str.match(/(\d+)\.(\d{3})/);
  return 'K'+kWord+'+'+mWord;
}
