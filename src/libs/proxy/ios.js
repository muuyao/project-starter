/**
 * Created by dongruixi on 2016/10/9.
 */

import {proxy} from './prototype';

var driver=function(){
    this.name="ios";
};

proxy.install(new driver());

var __ios_call__=function(url){
    var seed=Math.random();
    var iframe = document.createElement('iframe');
    iframe.src = url+"&seed="+seed;
    iframe.style.display = 'none';
    document.documentElement.appendChild(iframe);
}

driver.prototype.doPost=function(api,param,cb){
    var name = proxy.registCB(cb);
    var seed = Math.random();
    param = JSON.stringify(param);
    var url = "CALL://" + encodeURIComponent(api) + "?param=" + encodeURIComponent(param) + "&cb=" + encodeURIComponent(name);
    __ios_call__(url);
};

driver.prototype.log=function(type,msg){
    var seed=Math.random();
    var url="plugin://log?type="+encodeURIComponent(type)+"&content="+encodeURIComponent(msg);
    __ios_call__(url);
};

driver.prototype.dialog=function(title, desc, type, cb){
    var name=proxy.registCB(cb);
    var seed=Math.random();
    var url="plugin://dialog?class="+encodeURIComponent(type)+"&title="+encodeURIComponent(title)+"&desc="+encodeURIComponent(desc)+"&callback="+encodeURIComponent(name);
    __ios_call__(url);
};

driver.prototype.navigate=function(pageId, title, param, cb){
    if(!cb){
        cb=function(){}
    }
    var name=proxy.registCB(cb);
    var seed=Math.random();
    var url="plugin://navigate?page="+encodeURIComponent(pageId)+"&title="+encodeURIComponent(title)+"&param="+encodeURIComponent(JSON.stringify(param))+"&callback="+encodeURIComponent(name);
    __ios_call__(url);
};

driver.prototype.popup=function(pageId, title, param){
    var seed=Math.random();
    var url="plugin://popup?page="+encodeURIComponent(pageId)+"&title="+encodeURIComponent(title)+"&param="+encodeURIComponent(param);
    __ios_call__(url);
};

driver.prototype.personIdValid=function(cb){
    var name=proxy.registCB(cb);
    var seed=Math.random();
    var url="plugin://personIdValid?callback="+encodeURIComponent(name);
    __ios_call__(url);
};

driver.prototype.chooseContact=function(cb){
    var name=proxy.registCB(cb);
    var seed=Math.random();
    var url="plugin://contact?callback="+encodeURIComponent(name);
    __ios_call__(url);
};

driver.prototype.addCard=function(param,title,cb){
    var name=proxy.registCB(cb);
    var seed=Math.random();
    var url="plugin://addCard?callback="+encodeURIComponent(name)+"&seed="+seed+"&title="+encodeURIComponent(title)+"&param="+encodeURIComponent(JSON.stringify(param));
    __ios_call__(url);
};

driver.prototype.chooseCard=function(param,title,cb){
    var name=proxy.registCB(cb);
    var seed=Math.random();
    var url="plugin://chooseCard?callback="+encodeURIComponent(name)+"&seed="+seed+"&title="+encodeURIComponent(title)+"&param="+encodeURIComponent(JSON.stringify(param));
    __ios_call__(url);
};

driver.prototype.chooseSchool=function(param,title,cb){
    var name=proxy.registCB(cb);
    var seed=Math.random();
    var url="plugin://chooseSchool?callback="+encodeURIComponent(name)+"&seed="+seed+"&title="+encodeURIComponent(title)+"&param="+encodeURIComponent(JSON.stringify(param));
    __ios_call__(url);
};

driver.prototype.endPage=function(param,pageIdentifier){
    var seed=Math.random();
    var url="plugin://endPage?seed="+seed+"&param="+encodeURIComponent(JSON.stringify(param))+"&pageIdentifier="+pageIdentifier;
    __ios_call__(url);
};

driver.prototype.eeLogBiz=function(type,event,identity,properties){
    var seed=Math.random();
    var url="plugin://eeLogBiz?type="+type+"&event="+event+"&identity="+identity+"&properties="+encodeURIComponent(JSON.stringify(properties));
    __ios_call__(url);
};

driver.prototype.eeLogError=function(message){
    var seed=Math.random();
    var url="plugin://eeLogError?message="+message+"&seed="+seed;
    __ios_call__(url);
};

driver.prototype.eeLogUBT=function(action,event,properties){
    var seed=Math.random();
    var url="plugin://eeLogUBT?action="+action+"&event="+event+"&properties="+encodeURIComponent(JSON.stringify(properties));
    __ios_call__(url);
};

driver.prototype.setBackBehavior=function(target){
    var seed=Math.random();
    var url="plugin://setBackBehavior?target="+target;
    __ios_call__(url);
};


driver.prototype.getUrl=function(pageId,func){
    var name=proxy.registCB(func);
    var seed=Math.random();
    var url="plugin://getUrl?pageId="+encodeURIComponent(pageId)+"&callback="+encodeURIComponent(name);
    __ios_call__(url);
};

driver.prototype.copyPaste=function(text){
    var seed=Math.random();
    var url="plugin://copyPaste?text="+encodeURIComponent(text);
    __ios_call__(url);
};

driver.prototype.grantAuth=function(text,func){
    var name=proxy.registCB(func);
    var seed=Math.random();
    var url="plugin://grantAuth?type="+encodeURIComponent(type)+"&callback="+encodeURIComponent(name);
    __ios_call__(url);
};
driver.prototype.openApp=function(appId){
    var seed=Math.random();
    var url="plugin://openApp?appId="+encodeURIComponent(appId);
    __ios_call__(url);
};
driver.prototype.share=function(title,linkurl,content){
    var seed=Math.random();
    var url="plugin://share?title="+encodeURIComponent(title)+"&linkurl="+encodeURIComponent(linkurl)+"&content="+encodeURIComponent(content);
    __ios_call__(url);
};

//在native导航栏添加按钮
driver.prototype.showBarButton=function(pageId,title,position,func,targetUrl,cb,param){
    var name=proxy.registCB(cb);
    var url="plugin://showBarButton?page="+encodeURIComponent(pageId)+"&title="+encodeURIComponent(title)+"&position="+encodeURIComponent(position)+"&function="+encodeURIComponent(func)+"&targetUrl="+encodeURIComponent(targetUrl)+"&callback="+encodeURIComponent(name)+"&param="+encodeURIComponent(param);
    __ios_call__(url);
};
driver.prototype.hideBarButton=function(pageId,param){
    var url="plugin://hideBarButton?page="+encodeURIComponent(pageId)+"&param="+encodeURIComponent(param);
    __ios_call__(url);
};
//隐藏/显示native导航栏
driver.prototype.setNavigationBar=function(pageId,display,param){
    var url="plugin://setNavigationBar?page="+encodeURIComponent(pageId)+"&display="+encodeURIComponent(display)+"&param="+encodeURIComponent(param);
    __ios_call__(url);
};

driver.prototype.openAlbum=function(pageId, title, param){
  var seed=Math.random();
    var url="plugin://openAlbum?pageId="+encodeURIComponent(pageId)+"&title="+encodeURIComponent(title)+"&param="+encodeURIComponent(JSON.stringify(param));
    __ios_call__(url);
};

export default driver;
