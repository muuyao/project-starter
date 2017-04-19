import {proxy} from './prototype';

var driver=function(){
    this.name="android";
};

proxy.install(new driver());

driver.prototype.doPost=function(api,param,cb){
    var name=proxy.registCB(cb);
    window.android.call(api,JSON.stringify(param),name);
};

driver.prototype.log=function(type,msg){
    window.android.plugin("log",JSON.stringify({type:type,content:msg}));
};

driver.prototype.dialog=function(title, desc, type, cb){
    var name=proxy.registCB(cb);
    window.android.plugin("dialog",JSON.stringify({"class":type,"title":title,"desc":desc,"callback":name}));
};

driver.prototype.navigate=function(pageId, title, param,cb){
    // var obj = {"url":location.origin+param};
    var name=proxy.registCB(cb);
    window.android.plugin("navigate",JSON.stringify({"pageId":pageId,"title":title,"param":param,"callback":name}));
};

driver.prototype.popup=function(pageId, title, param){
    window.android.plugin("popup",JSON.stringify({"pageId":pageId,"title":title,"param":param}));
};

driver.prototype.personIdValid=function(cb){
    var name=proxy.registCB(cb);
    window.android.plugin("personIdValid",JSON.stringify({"callback":name}));
};

driver.prototype.chooseContact=function(cb){
    var name=proxy.registCB(cb);
    window.android.plugin("contact",JSON.stringify({"callback":name}));
};

driver.prototype.addCard=function(param,title,cb){
    var name=proxy.registCB(cb);
    window.android.plugin("addCard",JSON.stringify({"param":param,"title":title,"callback":name}));
};

driver.prototype.chooseCard=function(param,title,cb){
    var name=proxy.registCB(cb);
    window.android.plugin("chooseCard",JSON.stringify({"param":param,"title":title,"callback":name}));
};

driver.prototype.chooseSchool=function(param,title,cb){
    var name=proxy.registCB(cb);
    window.android.plugin("chooseSchool",JSON.stringify({"param":param,"title":title,"callback":name}));
};

driver.prototype.endPage=function(param,pageIdentifier){
    window.android.plugin("endPage",JSON.stringify({"param":param}));
};


driver.prototype.eeLogBiz=function(type,event,identity,properties){
    window.android.plugin("eeLogBiz",JSON.stringify({"type":type,"event":event,"identity":identity,"properties":properties}));

};

driver.prototype.eeLogError=function(message){
    window.android.plugin("eeLogError",JSON.stringify({"message":message}));
};

driver.prototype.eeLogUBT=function(action,event,properties){
    window.android.plugin("eeLogUBT",JSON.stringify({"action":action,"event":event,"properties":properties}));
};

driver.prototype.setBackBehavior=function(target){
    window.android.plugin("setBackBehavior",JSON.stringify({"target":target}));
};

driver.prototype.getUrl=function(pageId,func){
    var name=proxy.registCB(func);
    window.android.plugin("getUrl",JSON.stringify({"pageId":pageId,"callback":name}));
}

driver.prototype.copyPaste =function(text){
    window.android.plugin("copyPaste",JSON.stringify({text:text}));
};

driver.prototype.grantAuth=function(type,func){
    var name=proxy.registCB(func);
    window.android.plugin("grantAuth",JSON.stringify({"type":type,"callback":name}));
};
driver.prototype.openApp=function(appId){
    window.android.plugin("openApp",JSON.stringify({"appId":appId}));
};
driver.prototype.share=function(title,linkurl,content){
    window.android.plugin("share",JSON.stringify({"title":title,"linkurl":linkurl,"content":content}));
};

//在native导航栏添加按钮
driver.prototype.showBarButton=function(pageId,title,position,func,url,cb,param){
    var name=proxy.registCB(cb);
    window.android.plugin("showBarButton",JSON.stringify({
        "pageId": pageId,
        "title": title,
        "position": position,
        "function": func,
        "targetUrl": url,
        "callback": name,
        "param": param
    }));
};
driver.prototype.hideBarButton=function(pageId,param){
    window.android.plugin("hideBarButton",JSON.stringify({
        "pageId": pageId,
        "param": param
    }));
};
//隐藏/显示native导航栏
driver.prototype.setNavigationBar=function(pageId,display,param){
    window.android.plugin("setNavigationBar",JSON.stringify({
        "pageId": pageId,
        "display": display,
        "param": param
    }));
};

driver.prototype.openAlbum=function(pageId, title, param){
  window.android.plugin("openAlbum",JSON.stringify({"pageId": pageId, "title":title,"param":param}));
};

export default driver;
