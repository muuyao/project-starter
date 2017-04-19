import conf from '@/config/conf';

const CARD_REG = /^(\d{4})(\d)+(\d{4})$/g;

// 获取银行卡图标的class
// @param {string} name 银行名
// @returns {string}
export const getBankcardIcon = name => {
  let cardIcon = 'default';

  if(name in conf.__cardMap__){
    cardIcon = conf.__cardMap__[name];
  }

  return cardIcon;
}

// 获取当前已选择银行卡在银行卡列表中的下标
// @param {string} 例：6225****8808
// @param {array} 银行卡列表[{cardNum: 6225444433338888}, {cardNum: 6225224433338888}]
// @returs {number}
export const getCurrentBankcard = (card, cardlist) => {
  const list = cardlist.map(obj => obj.cardNum.replace(CARD_REG, '$1****$3'));
  const index = list.indexOf(card);

  return index >= 0? index: 0;
}

// 格式化并存储当前银行卡号，返回格式化后的卡号
// @param {string} 6225667788994444
// @returns {string} 6225****4444
export const storeCurrentBankcard = cardNum => {
  cardNum = cardNum.replace(/^(\d{4})(\d)+(\d{4})$/g, '$1****$3');
  localStorage.currentBankcard = cardNum;

  return cardNum;
}
