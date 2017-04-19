const conf = {};

conf.__pages__={
    'Page_Fee'              :   'URL_FYCX',         /*费用查询*/
    'Page_Progress'         :   'URL_JDCX',         /*进度查询*/
    'Page_HotNews'          :   'URL_UU_TOUTIAO',   /*UU头条*/
    'Page_SingleLoan'       :   'URL_DQ_BORROW',    /*贷贷看-借款*/
    'Page_InstallmentLoan'  :   'URL_FQ_BORROW',    /*分期贷-借款*/
    'Page_SingleRepay'      :   'URL_DQ_REPAY',     /*贷贷看-还款*/
    'Page_InstallmentRepay' :   'URL_FQ_REPAY',     /*分期贷-还款*/
    'Page_UService'         :   'URL_UFU',          /*U服*/
    'Page_SchoolInfo'       :   'URL_WDZL_XJ',      /*学籍信息*/
    'Page_ContactInfo'      :   'URL_WDZL_LXR',     /*联系人信息*/
    'Page_IdentifyInfo'     :   'URL_WDZL_SFZ',     /*身份信息*/
    'Page_AlipayInfo'       :   'URL_WDZL_ZMRZ',    /*芝麻认证*/
    'Page_Bankcard'         :   'URL_WDYHK',        /*我的银行卡*/
    'Page_Coupon'           :   'URL_WDUQ',         /*我的U券*/
    'Page_CouponUseage'     :   'URL_SYSM',         /*我的U券-使用说明*/
    'Page_ActivityCenter'   :   'URL_ACTIVITY',     /*活动中心*/
    'Page_LoanGuide'        :   'URL_UFU_JKLC',         /*借款流程*/
    'Page_RepayGuide'       :   'URL_UFU_HKZN',         /*还款指南*/
    'Page_MyBorrow'         :   'URL_WDJKLS',       /*我的借款*/
    'Page_repayStyle'       :   'URL_HKFS',          /*还款方式*/
    'Page_ConsignAuthorize' :   'URL_WTKKSQS',
    'Page_threeSidesAgreement': 'URL_SFJKXY',
    'Page_privatePolicy'    :   'URL_YSZC',
    'Page_uServiceAgreement':   'URL_FWXY',

    'Page_yijianRepay'      :    'URL_HKFS_YJ',        /*一键还款*/
    'Page_yibaoRepay'       :    'URL_HKFS_YB',       /*易宝支付还款*/
    'Page_YijianSucc'       :    'URL_HKFS_YJ_SUCCESS',
    'Page_yibao_newCard'    :    'URL_HKFS_YB_XKZF',
    'Page_InstallmentBills' :    'URL_FQ_FQZD',

    'Page_threeSidesAgreement': 'URL_SFJKXY',       /*三方借款协议*/
    'Page_ConsignAuthorize' :   'URL_WTKKSQS',      /*委托扣款授权*/
    'Page_privatePolicy'    :   'URL_YSZC',         /*隐私政策*/
    'Page_uServiceAgreement':   'URL_FWXY',         /*U族服务借款协议*/
    'Page_GetAmount_Simple' :   'URL_WDZL_HQED',
    'Page_UU_Detail'      :   'URL_UU_TOUTIAO_DETAIL',
    'Page_uLoanPartServiceAgreement': 'URL_FQFWXY',
    'Page_noPay':'URL_ZWHK'

};

conf.__ee__={
    /*"点击"、"输入"、"跳转"、"进入"、"滑动"*/
    'action':{'click':'CLICK','input':'INPUT','goin':'GOIN','slide':'SLIDE'}
};

conf.__cardMap__ = {
    "深圳发展银行":"szdb",
    "工商银行":"icbc",
    "农业银行":"abc",
    "中国银行":"boc",
    "建设银行":"ccb",
    "交通银行":"bocomm",
    "中国邮政储蓄银行":"psboc",
    "招商银行":"cmb",
    "中信银行":"ccb2",
    "中国光大银行":"cebb",
    "中国民生银行":"cmsb",
    "兴业银行":"ibc",
    "平安银行":"pab",
    "上海浦东发展银行":"spdb",
    "北京银行":"bobj",
    "上海银行":"shb",
    //以下卡为兼容以前版本
    "中国平安银行":"pab",
    "民生银行":"cmsb"
};

conf.__reg__ = {
    'name':/^[\u4E00-\u9FA5]+(·[\u4E00-\u9FA5]+)*$/,
    'phone':/^1[34578]\d{9}$/
};

export default conf;
