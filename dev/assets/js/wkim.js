!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define)define([],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.WKim=e()}}(function(){var e;return function t(e,n,r){function i(s,a){if(!n[s]){if(!e[s]){var u="function"==typeof require&&require;if(!a&&u)return u(s,!0);if(o)return o(s,!0);var c=new Error("Cannot find module '"+s+"'");throw c.code="MODULE_NOT_FOUND",c}var l=n[s]={exports:{}};e[s][0].call(l.exports,function(t){var n=e[s][1][t];return i(n?n:t)},l,l.exports,t,e,n,r)}return n[s].exports}for(var o="function"==typeof require&&require,s=0;s<r.length;s++)i(r[s]);return i}({1:[function(e,t,n){t.exports=e("./interface/interface")},{"./interface/interface":4}],2:[function(e,t,n){"use strict";var r=e("promise"),i=e("../libs/config/config"),o=e("../libs/auth/auth"),s=(e("../libs/io/mainWS"),e("../libs/listener/authEvent")),a=e("../libs/auth/loginStatusManager"),u=e("../libs/error/error"),c=e("../libs/error/errorFactory"),l=e("../libs/storage/storage"),f=e("../libs/reg/regStatus"),d=e("../libs/reg/reg");t.exports=u({login:[["Object"],function(e){return f.isReged?e.appSecret?o.slogin(e):e.deviceId?o.dlogin(e):o.login(e):new r(function(t,n){if(!e.appKey){var r=l.session.getItem(l.KEYS.APPKEY);r?e.appKey=r:n(c.noAppKey("login"))}d(e).then(function(){return e.appSecret?o.slogin(e):e.deviceId?void t(o.dlogin(e)):void t(o.login(e))},function(e){n(e)})})}],loginWithToken:[["Object"],function(e){return f.isReged?e.accessToken?o._toSubscribe(e):o.loginWithToken(e):r.reject(c.notReg("loginWithToken"))}],logout:function(){return s.emit(s.EVENTNAME.LOGOUT),o.logout()},kickout:function(e,t){var n=this,o=msgFactory.genSysBaseMsgModel({text:t||i.loginKickout});return new r(function(t,r){OAuthI.kick(e,o,function(e){200===e.code?(t(e),a.state="NOT_LOGIN",s.emit(s.EVENTNAME.KICKOUT),n.logout()):r(e)})})},getOpenId:function(){return parseInt(l.session.getItem(l.KEYS.OPENID))},lastestAuthInfo:function(){var e={};return e.openId=parseInt(l.session.getItem(l.KEYS.OPENID)),e.appKey=l.session.getItem(l.KEYS.APPKEY),e.nick=l.session.getItem(l.KEYS.NICK),e},setNickName:function(e){i.nickName=e},coldLogin:function(e){return o.coldLogin(e)}})},{"../libs/auth/auth":8,"../libs/auth/loginStatusManager":9,"../libs/config/config":10,"../libs/error/error":16,"../libs/error/errorFactory":17,"../libs/io/mainWS":24,"../libs/listener/authEvent":26,"../libs/reg/reg":41,"../libs/reg/regStatus":42,"../libs/storage/storage":43,promise:144}],3:[function(e,t,n){"use strict";var r=e("promise"),i=e("../libs/conversation/convManager"),o=(e("../libs/auth/loginStatusManager"),e("../libs/error/error")),s=e("../libs/access/access"),a={get:[["String"],function(e){return i.get(e)}],getConvByCache:function(e){return i.getConvSync(e)},list:[["Number","Number"],function(e,t){return new r(function(n,r){i.list(e,t).then(function(e){n(e)})})}],listByTags:[["Array"],function(e){return i.listGroupByTags(e)}],listOwnGroup:[["Number"],function(e){return i.listOwnGroup(e)}],create:[["Object"],function(e,t){return new r(function(n,r){i.create(e,t).then(function(e){n(e)})})}],remove:[["String"],function(e){return i.remove(e)}],removeConversations:[["Array"],function(e){var t=e.map(function(e){return i.remove(e)});return r.all(t)}],getTotalUnreadCount:function(){return i.getTotalUnreadCount()},_deleteConv:[["String"],function(e){return i.deleteConv(e)}],_getConvListObj:function(e){return i.getConvListObj(e)},_setConvToFirst:function(e){return i.setConvToFirst(e)}};t.exports=s(o(a))},{"../libs/access/access":6,"../libs/auth/loginStatusManager":9,"../libs/conversation/convManager":13,"../libs/error/error":16,promise:144}],4:[function(e,t,n){t.exports={version:e("../libs/version"),config:e("../libs/config/config"),conversationListener:e("../libs/listener/convEvent"),authListener:e("../libs/listener/authEvent"),followListener:e("../libs/listener/followEvent"),messageListener:e("../libs/listener/msgEvent"),userListener:e("../libs/listener/userEvent"),conversation:e("./im"),auth:e("./auth"),user:e("./user"),follow:e("../libs/follow/follow"),ws:e("../libs/io/mainWS"),reg:e("../libs/reg/reg"),upload:e("../libs/upload/upload")}},{"../libs/config/config":10,"../libs/follow/follow":18,"../libs/io/mainWS":24,"../libs/listener/authEvent":26,"../libs/listener/convEvent":27,"../libs/listener/followEvent":28,"../libs/listener/msgEvent":29,"../libs/listener/userEvent":30,"../libs/reg/reg":41,"../libs/upload/upload":55,"../libs/version":61,"./auth":2,"./im":3,"./user":5}],5:[function(e,t,n){"use strict";var r=e("promise"),i=e("../libs/user/userManager"),o=e("../libs/error/error"),s=e("../libs/access/access"),n={getProfile:function(e){return i.getProfile(e)},getProfiles:[["Array"],function(e){return new r(function(t,n){i.getUsers(e).then(function(e){t(e.map(function(e){return e?e.userProfileModel:void 0}))})})}],updateProfile:[["Object"],function(e){return i.updateProfile(e)}],updateRemark:[["Object"],function(e){return i.updateRemark(e)}],remarkListAll:function(){return i.pullUserRemark()}};t.exports=s(o(n))},{"../libs/access/access":6,"../libs/error/error":16,"../libs/user/userManager":59,promise:144}],6:[function(e,t,n){var r=e("promise"),i=e("../auth/loginStatusManager"),o=e("../error/errorFactory");t.exports=function(e){var t={};for(var n in e)t[n]=function(t){return function(){return"LOGIN_SUCCESS"!==i.getStatus()?r.reject(o.noLogin(t)):e[t].apply(this,arguments)}}(n);return t}},{"../auth/loginStatusManager":9,"../error/errorFactory":17,promise:144}],7:[function(e,t,n){var r=e("promise"),i=e("../config/config"),o=e("../tools/jsonp"),s=e("../tools/log");t.exports=function(e){return new r(function(t,n){o("https://vip.laiwang.com/alfa?sdkver=3&os=web&net=wifi&appkey="+e+"&env="+i.env,{},function(e,n){n.domainList&&n.domainList[0]&&n.domainList[0].ipList&&n.domainList[0].ipList[0]?t(n.domainList[0].ipList[0]):(s.info("aladin error"),t("wss://wkweb.laiwang.com/lwp"))})})}},{"../config/config":10,"../tools/jsonp":51,"../tools/log":52,promise:144}],8:[function(e,t,n){var r,i=e("promise"),o=e("../idl/idl"),s=o["interface"].OAuthI,a=o["interface"].DAuthI,u=o["interface"].ColdBootI,c=e("../../libs/tools/deviceId"),l=e("../io/mainWS"),f=e("../sync/syncState"),d=e("../storage/storage"),p=e("./loginStatusManager"),h=(e("../listener/authEvent"),e("../reg/regStatus")),g=null,v=null;t.exports={_readyForRefreshToken:function(e){var t=this,n=e.expertIn-(new Date).getTime()-72e5;5e3>n&&(n=5e3),n>72e6&&(n=72e6),clearTimeout(r),r=setTimeout(function(){t._refreshToken({refreshToken:e.refreshToken,appKey:d.session.getItem(d.KEYS.APPKEY),deviceId:c.getDid()}).then(function(e){t._subscribe(e.body)})},n)},_subscribe:function(e){var t=this;if("isReconnect"===e)var e=v;else v=e;var n=f.getSyncInfo(),r="/subscribe",o={sync:n.pts+","+n.highPts+";"+n.seq+";"+n.timestamp};return e.deviceId?(r="/reg/init",o.dtoken=e.accessToken):o.token=e.accessToken,new i(function(n,i){l.getWS().sendMsg(r,o,null,!1,function(r){200===r.code?(g=setTimeout(function(){t._subscribe(e)},828e5),n(r)):i(r)})})},_toSubscribe:function(e){var t=this;return new i(function(n,r){d.session.setItem(d.KEYS.OPENID,e.openId),t._subscribe(e).then(function(t){n(e),p.setStatus("LOGIN_SUCCESS",e)},function(e){p.setStatus("LOGIN_FAIL",e),r(e)})})},login:function(e){if(e.accessToken)return this._toSubscribe(e);var t=this;return new i(function(n,r){d.session.setItem(d.KEYS.APPKEY,e.appKey),p.setStatus("LOGINING",e),s.alogin(e,function(i){200===i.code?(i.body.openId=e.openId,n(t._toSubscribe(i.body))):(r(i),p.setStatus("LOGIN_FAIL",i.body))})})},dlogin:function(e){if(e.accessToken)return this._toSubscribe(e);var t=this;return new i(function(n,r){d.session.setItem(d.KEYS.APPKEY,e.appKey),p.setStatus("LOGINING",e),a.login(e,function(e){200===e.code?n(t._toSubscribe(e.body)):(r(e),p.setStatus("LOGIN_FAIL",e.body))})})},slogin:function(e){if(e.accessToken)return this._toSubscribe(e);var t=this;return new i(function(n,r){d.session.setItem(d.KEYS.APPKEY,e.appKey),p.setStatus("LOGINING",e),s.login(e,function(e){200===e.code?n(t._toSubscribe(e.body)):(r(e),p.setStatus("LOGIN_FAIL",e.body))})})},loginWithToken:function(e){var t=this;return new i(function(n,r){d.session.setItem(d.KEYS.APPKEY,e.appKey),p.setStatus("LOGINING",e),s.loginWithToken({domain:e.domain,appKey:e.appKey,deviceId:e.deviceId||c.getDid(),secretToken:e.secretToken},function(e){200===e.code?n(t._toSubscribe(e.body)):(r(e),p.setStatus("LOGIN_FAIL",e.body))})})},_refreshToken:function(e,t){return new i(function(t,n){s.refreshToken(e,function(e){200===e.code?t(e):n(e)})})},coldLogin:function(e){return new i(function(t,n){u.login(e.domian,e.openId,e.conversationId,e.sign,function(){200===res.code?(t(res),p.setStatus("LOGIN_SUCCESS",res.body)):n(res)})})},logout:function(){if("NOT_LOGIN"!==p.state)return p.state="NOT_LOGIN",d.session.removeItem(d.KEYS.APPKEY),d.session.removeItem(d.KEYS.OPENID),l.getWS().forceClose(),h.isReged=!1,v=null,!0}}},{"../../libs/tools/deviceId":50,"../idl/idl":20,"../io/mainWS":24,"../listener/authEvent":26,"../reg/regStatus":42,"../storage/storage":43,"../sync/syncState":49,"./loginStatusManager":9,promise:144}],9:[function(e,t,n){"use strict";var r=e("../listener/authEvent");t.exports={state:"NOT_LOGIN",getStatus:function(){return this.state},setStatus:function(e,t){this.state!==e&&(this.state=e,r.emit(r.EVENTNAME[e],t))}}},{"../listener/authEvent":26}],10:[function(e,t,n){"use strict";t.exports={messageTpl:{createGroupText:"发起了群聊",createChatText:"",quitGroup:"已经退出群聊",inviteJoin:"邀请 $whos$ 加入群聊",convKickout:"将 $whos$ 移出了群聊",editGroupName:'把群 "$original$" 修改为 "$now$" ',editGroupIcon:"修改了群头像",loginKickout:"您的账户在其他设备登录",groupOwner:"成为群主"},nickName:"",ua:window.navigator.userAgent,env:"online"}},{}],11:[function(e,t,n){"use strict";function r(e,t){return""===e?"":e||t}function i(e){if(this.baseConversation=N.assign({memberCount:0,title:"",icon:"",isQuit:0,isDisband:0,isKicked:0,createAt:0,memberExtension:0,notificationOff:0,tag:0,sort:0,status:1,authority:0,ownerId:0,memberLimit:0,superGroup:0,unreadPoint:0},e.baseConversation),this.cid=e.baseConversation.conversationId,this.isSingleChat=!1,this.isToMySelf=!1,this.nextPullOver=!1,this.msgIds=[],this.draft=null,this.draftTime=0,this._showSize=0,this.members=null,this._realMsgIds=[],this.lastMessages=[],e.lastMessages=e.lastMessages||[],this.lastMessages=e.lastMessages.map(function(e){return e.sendStatus=1,new c(e)}),1===this.baseConversation.type){this.isSingleChat=!0;var t=this.baseConversation.conversationId.split(":");this.isToMySelf=t[0]===t[1]}else this.isSingleChat=!1;this.listener=m}var o=e("promise"),s=e("../message/msgCache"),a=e("../message/msgFactory"),u=e("../message/msgSendStatus"),c=e("../message/msg"),l=e("../message/msgType"),f=e("../idl/idl"),d=f["interface"].IDLConversation,p=f["interface"].IDLMessage,h=f["interface"].ColdBootI,g=f["interface"].Typing,v=e("./groupRole"),m=(e("../config/config"),e("../listener/convEvent")),y=e("../listener/msgEvent"),b=e("../storage/storage"),E=e("../error/error"),M=e("../error/errorFactory"),w=e("../access/access"),x=e("../config/config"),C=e("../upload/upload"),I=20,T=1500,S=2e12,N=e("../tools/method");i.prototype={_pullData:function(e,t){var n=this;return new o(function(r,i){p.listMessages(n.cid,!1,e,t||I,function(e){if(200===e.code){var t=[];if(e.body&&e.body.length>0){var o=e.body.map(function(e){return e.sendStatus=1,t.push(e.baseMessage.messageId),e});n._showSize+=n._updateMsgList(o,!0),t.reverse(),n._addToRealMsgIds(t)}r(t)}else i(e)})})},_addToRealMsgIds:function(e){var t=this;t._realMsgIds=e.concat(t._realMsgIds),t._realMsgIds=N.uniq(t._realMsgIds)},_getSectionFromRealMsgIds:function(e,t,n){var r=this._realMsgIds.indexOf(t);if(e){if(0>=r)return[];for(var i=[],o=0;r>o;o++)i.push(this._realMsgIds[o]);return i}return this._realMsgIds.slice(r+1,n+1)},_getData:function(e,t,n){var r=this,i=N.get(t,"baseMessage.messageId");if(!i)return o.reject("msg must be have messageId");var a=s.getMsg(this.cid,i);if(a){var u=a.baseMessage.createdAt,c=this._getSectionFromRealMsgIds(e,i,n);if(e){if(c.length>=n)return o.resolve(r._returnCatchMsg(c));if(r.nextPullOver)return o.resolve(r._returnCatchMsg(c));var l=c[0];return u=l&&N.get(s.getMsg(r.cid,l.messageId),"baseMessage.createdAt")||u,new o(function(t,o){r._pullData(u,n+1).then(function(o){o.length<n+1&&(r.nextPullOver=!0),c=r._getSectionFromRealMsgIds(e,i,n),t(r._returnCatchMsg(c))})})}return o.resolve(r._returnCatchMsg(c))}return o.reject("pull messageList fail beacuse need msg object")},_returnCatchMsg:function(e){var t=this;return e.map(function(e){return s.getMsg(t.cid,e)})},_calcNewMsg:function(e){return 2===e.baseMessage.creatorType?0:e.baseMessage.openIdEx&&e.getOpenId()!==String(b.session.getItem(b.KEYS.OPENID))?e.receiverMessageStatus&&2===e.receiverMessageStatus.readStatus?0:e.baseMessage&&e.baseMessage.content&&3===e.baseMessage.content.contentType&&e.audioMsgHaveSeen?0:e.baseMessage.type===l.SILENCE?0:1:0},_updateMsgList:function(e){var t=this,e=e.map(function(e){return e instanceof c?e:new c(e)}),n=0;return e.forEach(function(e){var r=e.getId();-1===t.msgIds.indexOf(r)&&(t.msgIds.push(r),n++,s.cacheMsg(t.cid,e))}),t.msgIds.sort(function(e,n){var r=s.getMsg(t.cid,e),i=s.getMsg(t.cid,n);return r&&i?r.baseMessage.createdAt-i.baseMessage.createdAt:!1}),n},_genLastMsg:function(){var e=this.msgIds[this.msgIds.length-1],t=s.getMsg(this.cid,e);this.lastMessages=[t],m.emit(m.EVENTNAME.CONV_LATEST_MESSAGE_CHANGE,this,t)},_baseConvChangeEmit:function(e,t){if(void 0!==t&&("hide"===e&&(e="status",1===t&&(t=0)),("extension"!==e||JSON.stringify(t)!==JSON.stringify(this.baseConversation[e]))&&this.baseConversation[e]!==t)){switch(this.baseConversation[e]=t,e){case"memberCount":m.emit(m.EVENTNAME.CONV_MEMBER_COUNT_CHANGE,this,t,e);break;case"title":m.emit(m.EVENTNAME.CONV_TITLE_CHANGE,this,t,e);break;case"icon":m.emit(m.EVENTNAME.CONV_ICON_CHANGE,this,t,e);break;case"sort":m.emit(m.EVENTNAME.CONV_SETTOP,this,t,e);break;case"isKicked":m.emit(m.EVENTNAME.CONV_KICKED,this,t,e);break;case"tag":m.emit(m.EVENTNAME.CONV_TAG_CHANGE,this,t,e);break;case"memberExtension":m.emit(m.EVENTNAME.CONV_MEMBER_EXTENSION_CHANGE,this,t,e);break;case"extension":m.emit(m.EVENTNAME.CONV_EXTENSION_CHANGE,this,t,e);break;case"status":console.log(t),m.emit(m.EVENTNAME.CONV_STATUS_CHANGE,this,t,e);break;case"isQuit":m.emit(m.EVENTNAME.CONV_QUIT,this,t,e);break;case"isDisband":m.emit(m.EVENTNAME.CONV_DISBAND,this,t,e);break;case"authority":m.emit(m.EVENTNAME.CONV_AUTHORITY_CHANGE,this,t,e);break;case"memberLimit":m.emit(m.EVENTNAME.CONV_MEMBER_LIMIT_CHANGE,this,t,e);break;case"notificationOff":m.emit(m.EVENTNAME.CONV_NOTIFICATION_CHANGE,this,t,e);break;case"notificationSound":m.emit(m.EVENTNAME.CONV_NOTIFICATION_SOUND_CHANGE,this,t,e);break;case"ownerId":m.emit(m.EVENTNAME.CONV_OWNER_CHANGE,this,t,e);break;case"superGroup":m.emit(m.EVENTNAME.CONV_GROUP_LEVEL_CHANGE,this,t,e);break;case"unreadPoint":m.emit(m.EVENTNAME.CONV_UNREAD_POINT_CHANGE,this,t,e)}m.emit(m.EVENTNAME.CONV_BASE_CHANGE,this,t)}},_updateBaseConv:function(e){var t=this;Object.keys(e).forEach(function(t){""===e[t]&&delete e[t]});for(var n in e)t._baseConvChangeEmit(n,e[n])},_updateMsgStatus:function(e){var t=e.messageId,n=s.getMsg(this.cid,t);n&&(n.updateStatus(e.status),y.emit(y.EVENTNAME.MSG_STATUS_CHANGE,n,e))},_receiveNewMsg:function(e){var t=this,n=a.genReceiveMsg(e);this._showSize+=t._updateMsgList([n]);var r=s.getMsg(t.cid,n.baseMessage.messageId),i=this._calcNewMsg(r);if(i>0){var o=this.baseConversation.unreadPoint+i;t._baseConvChangeEmit("unreadPoint",o)}t._genLastMsg(),y.emit(y.EVENTNAME.MSG_RECEIVE,r)}};var _={listPreviousMessages:[["All","Number"],function(e,t){return e?this._getData(!1,e,t):o.resolve([])}],listNextMessages:[["All","Number"],function(e,t){var n=this;return e?this._getData(!0,e,t):new o(function(e,r){n._pullData(S,t).then(function(r){r.length<t&&(n.nextPullOver=!0),e(n._returnCatchMsg(r))})})}],sendText:[["String"],function(e){return this.sendMsg({content:{contentType:1,textContent:{text:e}}})}],sendImg:[["All"],function(e,t){var n=this;return new o(function(r,i){C.uploadImgByFile(e,"img").then(function(i){var o=N.assign({},{content:{contentType:2,photoContent:{mediaId:i.mediaId,picSize:e.size}}},t);r(n.sendMsg(o))},function(e){i(e)})})}],sendFile:[["All"],function(e,t){var n=this;return new o(function(r,i){C.uploadByFile(e,"other").then(function(i){var o=N.assign({},{content:{contentType:4,fileContent:{mediaId:i.mediaId,fileName:e.fileName,fileType:e.type,fileSize:e.size}}},t);r(n.sendMsg(o))},function(e){i(e)})})}],sendAttachments:[["Array","Number"],function(e,t){return 100>=t?o.reject("attachments message contentType must > 100"):this.sendMsg({content:{contentType:t,attachments:e}})}],sendMsg:[["Object"],function(e){var t=this;if(this.draft=null,!e.content)return o.reject(M.noContent("sendMsg"));var n=e.uuid||a.genUUID(),r=this.lastMessage?this.lastMessage.baseMessage.createdAt:0,i=s.getMsg(t.cid,n)||a.genSendingMsg(t.cid,n,r,e);return t.send(i)}],send:[["Object"],function(e){var t=this;return this._showSize+=t._updateMsgList([e]),new o(function(n,r){var i=s.getMsg(t.cid,e.baseMessage.uuid);i.send(function(e){if(200===e.code){i.sendStatus=u.SENDED,s.cacheMsg(t.cid,i);var o=t.msgIds.indexOf(i.baseMessage.uuid);o>-1&&(t.msgIds[o]=i.getId()),m.emit(m.EVENTNAME._CONV_TO_FIRST,t.cid),y.emit(y.EVENTNAME.SEND_SUCCESS,i),n(i)}else y.emit(y.EVENTNAME.SEND_FAIL,i),r(e)})})}],preSend:function(e){this._showSize+=this._updateMsgList([e]);var e=s.getMsg(this.cid,e.baseMessage.uuid);return e.sendStatus=u.SENDING,s.getMsg(this.cid,e.baseMessage.uuid)},reSend:[["String"],function(e){var t=s.getMsg(this.cid,e);return this._sendMsg(t.baseMessage.content)}],getTitle:function(){if(!this.isSingleChat)return this.baseConversation.title;var e=this.baseConversation.conversationId.split(":"),t=b.session.getItem(b.KEYS.OPENID)===String(e[0])?String(e[1]):String(e[0]);return t},getIcon:function(){return this.baseConversation.icon},updateTitle:[["String"],function(e,t){if(e){if(this.isSingleChat)return o.reject(M.isSingleChat("updateTitle"));var n=this,i=this.baseConversation.title,s=x.messageTpl.editGroupName.replace("$original$",i).replace("$now$",e),u=a.genSysBaseMsgModel({cid:n.cid,text:r(t,s)});return new o(function(t,r){d.updateTitle(n.cid,e,u,function(i){200===i.code?(t(e),n._baseConvChangeEmit("title",e)):r(i)})})}}],updateIcon:[["String"],function(e,t){var n=this;if(this.isSingleChat)return o.reject(M.isSingleChat("updateIcon"));var i=x.messageTpl.editGroupIcon,s=a.genSysBaseMsgModel({cid:n.cid,text:r(t,i)});return new o(function(t,r){d.updateIcon(n.cid,e,s,function(i){200===i.code?(t(i),n._baseConvChangeEmit("icon",e)):r(i)})})}],getMembers:function(e,t,n){var r=this;if(this.isSingleChat)return r.members=r.cid.split(":").map(function(e){return{openIdEx:{openId:String(e),tag:-1},role:v.MEMBER}}),r.isToMySelf&&(r.members=r.members.splice(0,1)),o.resolve(this.members);if(this.members&&!n){if(void 0!==e&&t){var i=this.members.slice(e,e+t);return o.resolve(i)}return o.resolve(this.members)}return new o(function(n,i){d.listMembers(r.cid,0,T,function(s){if(200===s.code){if(r.members=s.body,void 0!==e&&t){var a=this.members.slice(e,e+t);return o.resolve(a)}n(r.members)}else i(s)})})},addMembers:[["Array"],function(e,t){var n=this;if(this.isSingleChat)return o.reject(M.isSingleChat("addMembers"));if(e=e.map(function(e){return Number(e)}),n.members&&n.members.forEach(function(t){var n=t.openIdEx.openId;-1!==e.indexOf(n)&&e.splice(e.indexOf(n),1)}),0===e.length)return o.reject(M.empty("addMembers",1));var i=x.messageTpl.inviteJoin.replace("$whos$",e.join(",")),s=a.genSysBaseMsgModel({cid:n.cid,text:r(t,i)});return new o(function(t,r){d.addMembers(n.cid,e,s,function(i){if(200===i.code){var o=e.map(function(e){return{openIdEx:{openId:e},role:v.MEMBER}});n.members&&(n.members=n.members.concat(o),n._baseConvChangeEmit("memberCount",n.members.length)),t(o)}else r(i)})})}],removeMembers:[["Array"],function(e,t,n){var i=this,s=x.messageTpl.convKickout.replace("$whos$",e.join(",")),u=a.genSysBaseMsgModel({cid:i.cid,text:r(n,s)});return t&&(u.receivers=t),new o(function(t,n){d.removeMembers(i.cid,e,!0,u,function(r){200===r.code?(i.members&&i.members[0]&&(e.forEach(function(e){var t=i.members.indexOf(e);i.members.splice(t,1)}),i._baseConvChangeEmit("memberCount",i.members.length)),t(r.body)):n(r)})})}],saveDraft:[["String"],function(e){this.draft=""==e.trim()?"":e,this.draftTime=new Date-0,m.emit(m.EVENTNAME.CONV_DRAFT_CHANGE,this,e)}],setTop:[["Boolean"],function(e){var t=this;return new o(function(n,r){d.setTop(t.cid,e,function(e){200===e.code?(n(e.body),t._baseConvChangeEmit("sort",e.body)):r(e)})})}],disband:function(){var e=this;return new o(function(t,n){d.disband(e.cid,function(r){200===r.code?(e._baseConvChangeEmit("isDisband",!0),t(!0)):n(r)})})},quitSilent:function(e){return this._quit(e,"quitSilent")},quit:function(e){return this._quit(e,"quit")},_quit:function(e,t){var n=this;if(n.isSingleChat)return o.reject(M.isSingleChat(t));var i=x.messageTpl.quitGroup,s=a.genSysBaseMsgModel({cid:n.cid,text:r(e,i)});return new o(function(e,r){d[t](n.cid,!0,s,function(t){200===t.code?(e(!0),n._baseConvChangeEmit("isQuit",!0)):r(t)})})},hide:function(){var e=this;return e._baseConvChangeEmit("status",0),new o(function(t,n){d.hide(e.cid,function(e){200===e.code?t(!0):n(e)})})},clearMsg:function(){var e=this;return new o(function(t,n){d.clear(e.cid,function(r){200===r.code?(t(!0),e.msgIds=[],e.lastMessage=null,e.baseConversation.unreadPoint=0,m.emit(m.EVENTNAME.CONV_CLEAR_MESSAGE_CHANGE,this)):n(r)})})},updateNotification:[["Number"],function(e){var t=this;return new o(function(n,r){d.updateNotificationOff(t.cid,e,function(i){200===i.code?(t._baseConvChangeEmit("notificationOff",e),n(e)):r(i)})})}],updateNotificationSound:[["String"],function(e){var t=this;return new o(function(n,r){d.updateNotificationSound(t.cid,e,function(i){200===i.code?(t._baseConvChangeEmit("notificationSound",e),n(e)):r(i)})})}],updateAuthority:[["Number"],function(e){var t=this;return new o(function(n,r){d.updateAuthority(t.cid,e,function(i){200===i.code?(t._baseConvChangeEmit("authority",e),n(e)):r(i)})})}],updateMemberLimit:[["Number"],function(e){var t=this;return new o(function(n,r){d.updateMemberLimit(t.cid,e,function(i){200===i.code?(t._baseConvChangeEmit("memberLimit",e),n(e)):r(i)})})}],updateSuperGroup:[["Number"],function(e){var t=this;return new o(function(n,r){d.updateSuperGroup(t.cid,e,function(i){200===i.code?(t._baseConvChangeEmit("superGroup",e),n(e)):r(i)})})}],updateStatus:[["Number"],function(e){var t=this;return new o(function(n,r){d.updateStatus([t.cid],e,function(i){200===i.code?(t._baseConvChangeEmit("status",e),n(e)):r(i,"updateStatus fail")})})}],getCode:function(){var e=this;return new o(function(t,n){d.getCode(e.cid,function(e){200===e.code?t(e.body):n(e)})})},updateTag:[["Number"],function(e){var t=this;return new o(function(n,r){d.updateTag(t.cid,e,function(i){200===i.code?(t._baseConvChangeEmit("tag",e),n(e)):r(i)})})}],updateExtension:[["Object"],function(e){var t=this;return new o(function(n,r){d.updateExtension(t.cid,e,function(i){200===i.code?(t._baseConvChangeEmit("extension",e),n(e)):r(i)})})}],updateExtByKeys:[["Object"],function(e){var t=this;return new o(function(n,r){d.updateExtByKeys(t.cid,e,function(i){200===i.code?(t._baseConvChangeEmit("extension",e),n(e)):r(i)})})}],updateMemberExtension:[["Array","Object"],function(e,t){var n=this;return new o(function(r,i){d.updateMemberExtension(n.cid,e,t,function(e){200===e.code?(n._baseConvChangeEmit("memberExtension",t),r(t)):i(e)})})}],updateOwner:[["Number"],function(e,t){var n=this,i=a.genSysBaseMsgModel({cid:n.cid,text:r(t,x.messageTpl.groupOwner)});return new o(function(t,r){d.updateOwner(n.cid,e,i,function(i){200===i.code?(n._baseConvChangeEmit("ownerId",e),t(i)):r(i)})})}],updateInfo:[["Object"],function(e){var t=this,n=N.assign({tag:0,extension:{}},e,{conversationId:this.cid});return new o(function(r,i){d.updateInfo(n,function(n){200===n.code?(t._baseConvChangeEmit("info",e),r(e)):i(n)})})}],getMsgById:[["Number"],function(e){return s.getMsg(this.cid,e)}],read:[["Array"],function(e){var t=this;e.forEach(function(e){var n=s.getMsg(t.cid,e);n&&n.updateToRead()})}],clearUnreadPoint:function(){var e=this;return new o(function(t,n){d.clearUnreadPoint(e.cid,function(r){200===r.code?(e._baseConvChangeEmit("unreadPoint",0),t(0)):n(r)})})},sendTyping:[["Number"],function(e,t){var n=this;if(this.isSingleChat&&!this.isToMySelf){var r={conversationId:n.cid,type:t||0,command:e};return new o(function(t,n){g.send(r,function(r){200===r.code?t(e):n(r)})})}return o.reject(M.onlySingleChat("sendTyping"))}],_sendSysMsg:[["String"],function(e){var t=this;return new o(function(n,r){var i=t.lastMessage?t.lastMessage.baseMessage.createdAt:0,o=a.genSysMsg({cid:t.cid,lastTime:i,text:e});t._showSize+=t._updateMsgList([o]),n()})}],peerId:function(){if(this.isSingleChat){var e=this.baseConversation.conversationId.split(":"),t=String(b.session.getItem(b.KEYS.OPENID))===String(e[0])?String(e[1]):String(e[0]);return t}},sendColdBootNotice:function(e,t,n){var r=this;return new o(function(i,o){h.sendColdBootNotice(e,t,r.cid,1,n,function(e){200===e.code?i(e.body):o(e)})})}};N.assign(i.prototype,w(E(_))),t.exports=i},{"../access/access":6,"../config/config":10,"../error/error":16,"../error/errorFactory":17,"../idl/idl":20,"../listener/convEvent":27,"../listener/msgEvent":29,"../message/msg":31,"../message/msgCache":32,"../message/msgFactory":34,"../message/msgSendStatus":36,"../message/msgType":38,"../storage/storage":43,"../tools/method":53,"../upload/upload":55,"./groupRole":15,promise:144}],12:[function(e,t,n){"use strict";var r=e("../idl/idl"),i=r["interface"].IDLConversation,o=e("./conv"),s=/\d+:\d+/;t.exports={genConv:function(e,t){i.getByIdUnlimited(e,function(n){if(200===n.code)if(n.body&&n.body.baseConversation){var r=new o(n.body);t&&t(r)}else if(s.test(e)){var i={conversationId:e,type:1,memberCount:2,title:"",icon:"",createAt:new Date-0},r=new o({baseConversation:i});t(r)}else t(!1)})}}},{"../idl/idl":20,"./conv":11}],13:[function(e,t,n){"use strict";function r(e){return e.sort(function(e,t){return parseInt(e)-parseInt(t)}).join(":")}function i(e){var t=A.order.indexOf(e),n=A.pinOrder.indexOf(e);0!==t&&0!==n&&(-1!==t&&A.order.splice(t,1),-1!==n&&A.pinOrder.splice(n,1),I.get(O[e],"baseConversation.sort")>0?A.pinOrder.unshift(e):A.order.unshift(e),S.emit(S.EVENTNAME.CONV_TO_FIRST,e))}function o(e){var t=A.pinOrder.indexOf(e),n=A.order.indexOf(e);-1!==t&&A.pinOrder.splice(t,1),-1!==n&&A.order.splice(n,1)}function s(e){var t=A.pinOrder.indexOf(e),n=A.order.indexOf(e);conv.baseConversation.sort>0?-1===t&&A.pinOrder.unshift(conv):-1===n&&A.order.unshift(conv)}function a(e,t){var n=A.pinOrder.indexOf(e.cid),r=A.order.indexOf(e.cid);0===t?-1!=n&&(A.pinOrder.splice(n,1),-1==r&&A.order.unshift(e.cid)):-1!=r&&(A.order.splice(r,1),-1==n&&A.pinOrder.unshift(e.cid))}function u(e){var t=I.get(e,"lastMessages[0].baseMessage.createdAt"),n=I.get(e,"baseConversation.createAt");return t?t:n}function c(e,t){return e||(e=[0,k]),e[1]>k?b.reject({reason:"最多能拉"+k+"个会话"}):t||!A.promises?(A.promise=new b(function(t,n){C.listNewest(k,function(r){if(200===r.code){var i=r.body.filter(function(e){return e.baseConversation.sort>0}).sort(function(e,t){return t.baseConversation.sort-e.baseConversation.sort}),o=r.body.filter(function(e){return 0===e.baseConversation.sort}).sort(function(e,t){return u(t)-u(e)}),s=i.concat(o);l(A.order,o.map(function(e){return e.baseConversation.conversationId})),l(A.pinOrder,i.map(function(e){return e.baseConversation.conversationId}));var a=s.slice(e[0],e[1]);a=a.map(function(e){var t=new w(e);return O[t.cid]=t,t}),t(a)}else n(r)})}),A.promise):new b(function(t,n){A.promise.then(function(){var n=A.pinOrder.concat(A.order).map(function(e){return O[e]});t(n.slice(e[0],e[1]).map(function(e){return e instanceof w?e:new w(e)}))},function(e){n(e)})})}function l(e,t){for(;0!==e.length;)e.pop();for(;0!==t.length;)e.push(t.shift())}function f(e){return new b(function(t,n){O[e]?t(O[e]):E.genConv(e,function(r){return r?void(O[e]?t(O[e]):(O[e]=r,t(r))):void n("can not find conversation by cid:"+e)})})}function d(e){return O[e]}function p(e){S.emit(S.EVENTNAME.CONV_TO_FIRST,e)}function h(e){return new b(function(t,n){f(e).then(function(n){n.hide().then(function(){var r=A.pinOrder.indexOf(e),i=A.order.indexOf(e);0==n.baseConversation.sort?-1!=r&&A.pinOrder.splice(r,1):-1!=i&&A.order.splice(i,1),t(!0)})})})}function g(e,t){if(!e.openIds)return b.reject(_.empty("create",1));var n=e.openIds,i=N.session.getItem(N.KEYS.OPENID);n.unshift(i);var o=2;n=I.uniq(n),1===n.length&&n[0]==i&&(n=[i,i]);for(var s=0;s<n.length;s++){var a=n[s];if(!String(a).match(/^[\d]+$/))return b.reject("openId must be number")}var u=r(n);if(2===n.length)return o=1,new b(function(e,t){f(u).then(function(t){S.emit(S.EVENTNAME.CONV_ADD,t),e(t)})});if(n.length>4)var u=n.slice(0,4).join(":");var c=I.assign({openIds:n,title:e.title||"uids:"+u,icon:e.icon||"uids:"+u,type:o,tag:0},e),l=M.genCreateConvMsg(t);return new b(function(e,t){C.create(c,l,function(n){200===n.code?f(n.body).then(function(t){e(t),S.emit(S.EVENTNAME.CONV_ADD,t)}):t(n)})})}function v(e,t){return c([e,t])}function m(e){return new b(function(t,n){v(e).then(function(e){t({convList:e,order:A.order,pinOrder:A.pinOrder})},n)})}function y(){var e=this,t=0;return new b(function(n,r){e.list().then(function(e){e.forEach(function(e){t+=e.baseConversation.unreadPoint}),n(t)})})}var b=e("promise"),E=e("./convFactory"),M=e("../message/msgFactory"),w=e("./conv"),x=e("../idl/idl"),C=x["interface"].IDLConversation,I=e("../tools/method"),T=e("../tools/log"),S=e("../listener/convEvent"),N=e("../storage/storage"),_=e("../error/errorFactory"),O={},A={order:[],pinOrder:[]},k=1e3;S.on(S.EVENTNAME._CONV_TO_FIRST,function(e){e&&f(e).then(function(){i(e)})["catch"](function(e){T.log("找不到相应的会话")})}),S.on(S.EVENTNAME.CONV_SETTOP,function(e,t){e&&a(e,t)}),S.on(S.EVENTNAME.CONV_STATUS_CHANGE,function(e,t){e&&(0===t?o(e.cid):s(e.cid))}),S.on(S.EVENTNAME.CONV_DISBAND,function(e,t){o(e.cid)}),S.on(S.EVENTNAME.CONV_QUIT,function(e,t){o(e.cid)}),t.exports={remove:h,get:f,getConvSync:d,_getConvList:c,list:v,listGroupByTags:function(e){return new b(function(t,n){C.listGroupByTags(e,function(e){200===e.code?t(e.body):n(e)})})},listOwnGroup:function(e){return new b(function(t,n){C.listOwnGroup(e,function(e){200===e.code?t(e.body):n(e)})})},getConvListObj:m,create:g,getTotalUnreadCount:y,setConvToFirst:p,deleteConv:o}},{"../error/errorFactory":17,"../idl/idl":20,"../listener/convEvent":27,"../message/msgFactory":34,"../storage/storage":43,"../tools/log":52,"../tools/method":53,"./conv":11,"./convFactory":12,promise:144}],14:[function(e,t,n){"use strict";function r(){o.register([{objectType:a.IM_CONVERSATION,onSyncMsg:function(e){return i.resolve()},onNeedPullData:function(){return s._getConvList([0,1e3],!0)}}])}var i=e("promise"),o=e("../sync/syncManager"),s=e("./convManager"),a=e("../sync/syncObjectType");t.exports={init:r}},{"../sync/syncManager":47,"../sync/syncObjectType":48,"./convManager":13,promise:144}],15:[function(e,t,n){"use strict";t.exports={BOSS:1,MEMBER:3}},{}],16:[function(e,t,n){function r(e,t,n){return function(){if(arguments.length<t.length)return Promise.reject(i.paramsCount(e,t.length));for(var r=0;r<arguments.length;r++){var a=s[t[r]];if(a&&!(typeof arguments[r]===t[r].toLowerCase()||arguments[r]instanceof a))return Promise.reject(i.paramsFormat(e,r+1,t[r]))}var u=n.apply(this,arguments);return u&&u["catch"]&&u["catch"](function(t,n){var r=[];t&&r.push(t),n&&r.push(n),o.warn(e+" reject",r)}),u}}var i=e("./errorFactory"),o=e("../tools/log"),s={String:String,Number:Number,Array:Array,Object:Object,Boolean:Boolean,
All:null};t.exports=function(e){var t={};for(var n in e)e[n]instanceof Array&&e[n][1]&&"function"==typeof e[n][1]?t[n]=r(n,e[n][0],e[n][1]):t[n]=e[n];return t}},{"../tools/log":52,"./errorFactory":17}],17:[function(e,t,n){t.exports={isSingleChat:function(e){return{code:"JS1000",body:e+" fail because it is single chat"}},onlySingleChat:function(e){return{code:"JS1001",body:e+" fail because it only be used in single chat and not toMySelf"}},paramsFormat:function(e,t,n){return{code:"JS1010",body:e+" params "+t+" format error , must be "+n}},paramsCount:function(e,t){return{code:"JS1011",body:e+" params count must >= "+t}},isNotInstanceOf:function(e,t,n){return{code:"JS1020",body:e+" params "+t+" not instanceOf "+n}},notReg:function(e){return{code:"JS1030",body:e+" fail because not reg"}},noAppKey:function(e){return{code:"JS1040",body:e+" fail need appKey"}},noLogin:function(e){return{code:"JS1050",body:e+" fail because not login"}},empty:function(e,t){return{code:"JS1060",body:e+" fail because params "+t+" is empty"}},noContent:function(e){return{code:"JS1070",body:e+" fail because undefined content"}}}},{}],18:[function(e,t,n){var r=e("promise"),i=e("../idl/idl"),o=i["interface"].FollowI,s=e("../user/userManager");t.exports={followers:function(e,t){return t=t||1e3,e=e||0,new r(function(n,r){o.listFollowers(0,e,t,function(e){200===e.code?n(e.body):r(e)})})},followings:function(e,t){return t=t||1e3,e=e||0,new r(function(n,r){o.listAll(0,e,t,function(e){200===e.code?(e.body&&e.body.models&&e.body.models.forEach(function(e){s.getUsers([e.openId]).then(function(t){t[0]&&t[0].updateFollow(e)})}),n(e.body)):n({models:[]})})})},follow:function(e){return new r(function(t,n){o.follow(0,e,function(r){200===r.code?(s.getUsers([e]).then(function(e){e[0]&&e[0].updateFollow(r.body)}),t(r.body)):n(r)})})},unfollow:function(e){return new r(function(t,n){o.unfollow(0,e,function(r){200===r.code?(s.getUsers([e]).then(function(e){e[0]&&e[0].updateFollow(r.body)}),t(r.body)):n(r)})})},followStatusByOpenId:function(e){return new r(function(t,n){o.getStatus(0,e,function(e){200===e.code?t(e.body):n(e)})})}}},{"../idl/idl":20,"../user/userManager":59,promise:144}],19:[function(e,t,n){"use strict";function r(){o.register([{objectType:a.RELATION_FOLLOW,onSyncMsg:function(e){return new i(function(t,n){u.getUsers([e.openId]).then(function(n){t(n[0].updateFollow(e))})})},onNeedPullData:function(){return s.followings(0,0,1e3)}}])}var i=e("promise"),o=e("../sync/syncManager"),s=e("./follow"),a=e("../sync/syncObjectType"),u=e("../user/userManager");t.exports={init:r}},{"../sync/syncManager":47,"../sync/syncObjectType":48,"../user/userManager":59,"./follow":18,promise:144}],20:[function(e,t,n){var r=e("@ali/wkidl"),i=e("../io/mainWS");t.exports=r(i)},{"../io/mainWS":24,"@ali/wkidl":79}],21:[function(e,t,n){var r=e("./syncInit");t.exports=function(){r()}},{"./syncInit":22}],22:[function(e,t,n){"use strict";var r=e("../conversation/convSync"),i=e("../message/msgSync"),o=e("../user/remarkSync"),s=e("../follow/followSync"),a=e("../pushReceiver/pushSync"),u=e("../message/msgNoticeSync"),c=e("../message/msgDeleteSync");t.exports=function(){r.init(),i.init(),o.init(),s.init(),a.init(),c.init(),u.init()}},{"../conversation/convSync":14,"../follow/followSync":19,"../message/msgDeleteSync":33,"../message/msgNoticeSync":35,"../message/msgSync":37,"../pushReceiver/pushSync":40,"../user/remarkSync":56}],23:[function(e,t,n){"use strict";t.exports=window.WebSocket},{}],24:[function(e,t,n){"use strict";function r(e){return new u(function(t,n){d(e).then(function(e){f.customUrl=e,t(e)})})}function i(e,t,n){c=new l(e,{appKey:t.appKey,did:t.did,WSURL:n,ua:f.ua},{onReged:function(){t.onReged&&t.onReged()},onStateChange:function(e){t.onStateChange&&t.onStateChange(e)},onDownMsg:function(e,n){t.onDownMsg&&t.onDownMsg(e,n)}}),c.connect()}function o(e,t){f.customUrl?i(e,t,f.customUrl):r(t.appKey).then(function(n){i(e,t,n)})}function s(){return c}function a(e,t,n,r,i){c?c.sendMsg(e,t,n,r,i):p.log("ws为空")}var u=e("promise"),c=null,l=e("./ws"),f=e("../config/config"),d=e("../aladin/aladin"),p=e("../tools/log");t.exports={init:o,getWS:s,sendMsg:a}},{"../aladin/aladin":7,"../config/config":10,"../tools/log":52,"./ws":25,promise:144}],25:[function(e,t,n){"use strict";function r(e,t,n){this.name=e;var n=n||{};if(a.assign(this,c,n),!t||!t.appKey)return void s.warn("*请设置 appKey ");this.appKey=t.appKey,this.userForceClose=!1,this._loginStateChecker=null,this.offlineTime=0,this._timeoutTimer=0,this._pingCheckTimer=0,this._regTimeout=0,this._isReconnecting=!1,this._reconnInterval=0,this.msgCallbacks={},this.msgQueue=[],this.state="CLOSED",this.conf=t;var r=this;l&&(window.addEventListener("offline",function(e){r.forceReconnect(),s.info("network offline")}),window.addEventListener("online",function(e){r.offlineTime=0,r.forceReconnect(),s.info("network online")}))}var i=(e("promise"),e("./WebSocket")),o=e("../tools/deviceId"),s=e("../tools/log"),a=e("../tools/method"),u=0,c={onDownMsg:function(){},onReged:function(){},onStateChange:function(){}},l=!1;window.navigator.hasOwnProperty("onLine")&&(l=!0),r.prototype={_setState:function(e){this.state!==e&&(this.state=e,this.onStateChange(this.state))},_onOpen:function(){var e=this;e.offlineTime=0,clearInterval(e._reconnInterval),this._isReconnecting=!1,e._setState("OPEN"),s.info("websocket open"),this._reg(function(t){t===!0?(e.onReged(),e._setState("REGED")):e.forceReconnect()})},_onMessage:function(e){var t=this;clearTimeout(this._timeoutTimer),clearTimeout(this._pingCheckTimer),this._timeoutTimer=setTimeout(function(){t._pingCheckTimer=setTimeout(function(){t.forceReconnect(),s.info(t.name+": 20s 未收到消息，强制ping检查10s无返回，强制断线")},1e4),t._ping(function(e){clearTimeout(t._pingCheckTimer)})},2e4);try{var n=JSON.parse(e.data)}catch(r){return void s.log("parse json error :"+e.data)}s.log("receive :"+e.data);var i=n.headers.mid.split(" ")[0];if(n.lwp)this.onDownMsg(n,function(e,r){t.responseMsg(e,n.headers.mid,r)});else if(i&&this.msgCallbacks[i]){var o=this.msgCallbacks[i][0];delete this.msgCallbacks[i],o&&o(n)}},_onClose:function(){var e=this;this._setState("CLOSED"),this.offlineTime++,this.reconnect();var t={headers:{},code:408,body:{reason:"timeout"}};Object.keys(this.msgCallbacks).forEach(function(n){var r=e.msgCallbacks[n]&&e.msgCallbacks[n][0]&&e.msgCallbacks[n][0];delete e.msgCallbacks[n],r&&r(t)}),this._unbindHandle()},_reg:function(e){var t=this,n=o.getDid();clearTimeout(t._regTimeout);var r=this.sendMsg("/reg",{"cache-header":"token app-key did ua vhost wv",vhost:"WK",ua:t.conf.ua,did:t.conf.did||n,"app-key":t.appKey,wv:"im:3,au:3,sy:1"},null,!1,function(n){clearTimeout(t._regTimeout),200===n.code?(s.info("reg success"),e&&e(!0)):(s.info("reg fail"),e&&e(!1,n))}),i=r[2]||-1;this._regTimeout=setTimeout(function(){delete t.msgCallbacks[i],e&&e(!1,{body:{reason:"timeout"},code:408})},1e4)},connect:function(){this.userForceClose=!1,this._connect()},reconnect:function(){var e=!0;if(this.userForceClose)return!1;if(this._isReconnecting!==!0){this._isReconnecting=!0;var t=this,n=0;this._reconnInterval=setInterval(function(){n>3&&(t.forceReconnect(),n=0),t._connect(e)||(n+=1)},5e3)}},forceReconnect:function(){var e=this.ws;if(this.ws=null,e){var t=e.onclose;this._unbindHandle(e),t&&t(),e.close()}},_connect:function(e){return this.userForceClose?!1:this.ws&&this.ws.readyState<2?!1:(this.ws=new i(this.conf.WSURL||WSURL),e&&(this.isReconnect=!0),this._setState("CONNECTING"),this._bindHandle(),!0)},_bindHandle:function(){var e=this;this.ws?(this.ws.onopen=function(){e._onOpen.call(e)},this.ws.onmessage=function(t){e._onMessage.call(e,t)},this.ws.onclose=function(t){e._onClose.call(e,t)}):s.info("ws is null when bind handle")},_unbindHandle:function(e){var e=e||this.ws;e&&(e.onopen=function(){},e.onmessage=function(){},e.onclose=function(){})},_ping:function(e){this.sendMsg("/ping",{},null,!1,function(t){e&&e(t)})},sendMsg:function(e,t,n,r,i){var r=r||!1,o=u++,t=t||{};t.mid=o+" 0",t["x-event-id"]=a.getUUID();var s={lwp:e,headers:t,body:n};return this._send(s,r,i)},responseMsg:function(e,t,n,r){var r=r||{};r.mid=t;var n=n||200,i={code:n,headers:r,body:e};return this._send(i,!0,null)},_send:function(e,t,n){if(!this.ws||1!==this.ws.readyState)return t?(this.msgQueue.push([e,t,n]),[!1,"cached"]):[!1,"uncache"];try{if(window.debug===!0&&console.log("send: "+JSON.stringify(e)),this.ws.send(JSON.stringify(e)),n){var r=e.headers.mid.split(" ")[0];this.msgCallbacks[r]=[n]}return[!0,null,r]}catch(i){return[!1,i]}},forceClose:function(){this.userForceClose=!0,this._setState("CLOSING"),this.ws&&this.ws.close(),this.ws=null,clearTimeout(this._timeoutTimer),clearTimeout(this._pingCheckTimer),clearTimeout(this._loginStateChecker),clearTimeout(this._regTimeout)},flushMsgs:function(){for(;this.msgQueue.length>0;){var e=this.msgQueue.shift();this._send.apply(this,e)}}},t.exports=r},{"../tools/deviceId":50,"../tools/log":52,"../tools/method":53,"./WebSocket":23,promise:144}],26:[function(e,t,n){var r=e("wolfy87-eventemitter"),i=new r;i.EVENTNAME={LOGINING:"logining",LOGIN_FAIL:"loginFail",LOGIN_SUCCESS:"loginSuccess",LOGOUT:"logout",KICKOUT:"kickout",DEVSTS:"devSts",STATE_CHANGE:"stateChange"},t.exports=i},{"wolfy87-eventemitter":156}],27:[function(e,t,n){"use strict";var r=e("wolfy87-eventemitter"),i=new r;i.EVENTNAME={CONV_ADD:"convAdd",CONV_REMOVE:"convRemove",CONV_BASE_CHANGE:"convBaseChange",CONV_UNREAD_POINT_CHANGE:"convUnreadPointChange",CONV_TITLE_CHANGE:"convTitleChange",CONV_ICON_CHANGE:"convIconChange",CONV_STATUS_CHANGE:"convStatusChange",CONV_LATEST_MESSAGE_CHANGE:"convLastMessageChange",CONV_DRAFT_CHANGE:"convDraftChange",CONV_TAG_CHANGE:"convTagChange",CONV_EXTENSION_CHANGE:"convExtensionChange",CONV_AT_ME_STATUS_CHANGE:"convAtMeStatusChange",CONV_NOTIFICATION_CHANGE:"convNotificationChange",CONV_MEMBER_COUNT_CHANGE:"convMemberCountChange",CONV_NOTIFICATION_SOUND_CHANGE:"convNotificationSoundChange",CONV_AUTHORITY_CHANGE:"convAuthorityChange",CONV_OWNER_CHANGE:"convOwnerChange",CONV_TYPING_EVENT:"convTyping",CONV_MEMBER_LIMIT_CHANGE:"convMemberLimitChange",CONV_GROUP_LEVEL_CHANGE:"convGroupLevelChange",CONV_CLEAR_MESSAGE_CHANGE:"convClearMessage",CONV_QUIT:"convQuit",CONV_KICKED:"convKicked",CONV_DISBAND:"convDisband",CONV_SETTOP:"convSetTop",CONV_TO_FIRST:"convToFirst",_CONV_TO_FIRST:"_convToFirst"},t.exports=i},{"wolfy87-eventemitter":156}],28:[function(e,t,n){var r=e("wolfy87-eventemitter"),i=new r;i.EVENTNAME={FOLLOW_CHANGE:"followChange"},t.exports=i},{"wolfy87-eventemitter":156}],29:[function(e,t,n){var r=e("wolfy87-eventemitter"),i=new r;i.EVENTNAME={MSG_STATUS_CHANGE:"msgStatusChange",MSG_INFO_CHANGE:"msgInfoChange",MSG_RECEIVE:"msgReceive",MSG_REMOVE:"msgRemove",SEND_SUCCESS:"sendSuccess",SEND_FAIL:"sendFail",PUSH_RECEIVE:"pushReceive",CUSTOM:"custom"},t.exports=i},{"wolfy87-eventemitter":156}],30:[function(e,t,n){var r=e("wolfy87-eventemitter"),i=new r;i.EVENTNAME={REMARK_CHANGE:"remarkChange"},t.exports=i},{"wolfy87-eventemitter":156}],31:[function(e,t,n){function r(e){p.push(e),0===d&&(d=1,setTimeout(function(){c.updateToRead(p),d=0,p=[]},1e3))}function i(e){if(l.assign(this,e),this.isPhoto()){var t=this.baseMessage.content.photoContent.mediaId;try{var n=m.mid2Url(t),r=n.match(/[\d]+_[\d]+/)[0].split("_");this.baseMessage.content.photoContent.imageUrl=n,this.baseMessage.content.photoContent.width=r[0],this.baseMessage.content.photoContent.height=r[1]}catch(i){console.info("mediaId parse error "+t)}}if(this.isSound()){var t=this.baseMessage.content.audioContent.mediaId;try{this.baseMessage.content.audioContent.mediaIdUrl=m.mid2Url(t)}catch(i){console.info("mediaId parse error "+t)}}if(this.isFile()){var t=this.baseMessage.content.fileContent.mediaId;try{this.baseMessage.content.fileContent.mediaIdUrl=m.mid2Url(t)}catch(i){console.info("mediaId parse error "+t)}}}var o=e("promise"),s=e("../idl/idl"),a=s["interface"].IDLSend,u=s["interface"].IDLMessage,c=s["interface"].IDLMessageStatus,l=e("../tools/method"),f=e("./msgSendStatus"),d=0,p=[],h=e("../storage/storage"),g=e("../listener/msgEvent"),v=e("./msgCache"),m=e("@ali/ding-mediaid");i.prototype={getId:function(){return this.sendStatus===f.SENDING||this.sendStatus===f.SENDFAIL?Number(this.baseMessage.uuid):Number(this.baseMessage.messageId||this.baseMessage.uuid)},getOpenId:function(){return String(this.baseMessage.openIdEx.openId)},getConvId:function(){return String(this.baseMessage.conversationId)},unReadCount:function(){return l.get(this,"senderMessageStatus.unReadCount")},unreadMembers:function(){var e=this;return new o(function(t,n){u.listUnreadMembers(e.getId(),function(e){200===e.code?t(e.body):n(e)})})},send:function(e){var t=this;return new o(function(n,r){a.send(t.baseMessage,function(i){200===i.code?(l.assign(t.senderMessageStatus,i.body.model),t.baseMessage.messageId=i.body.messageId,t.baseMessage.createdAt=i.body.createdAt,t.sendStatus=1,v.cacheMsg(t.baseMessage.conversationId,t),e&&e(i),n(i)):(t.sendStatus=-1,e&&e(i),r(i))})})},updateStatus:function(e){l.get(e,"unReadCount")<l.get(this,"senderMessageStatus.unReadCount")&&(this.senderMessageStatus=e)},updateReadStatus:function(e){l.get(e,"readStatus")>l.get(this,"receiverMessageStatus.readStatus")&&(this.receiverMessageStatus=e)},updateToRead:function(){this.isMe()||this.isMeRead()||this.isSys()||this.isSound()||this._updateToRead()},updateAudioMsgToRead:function(){this._updateToRead()},_updateToRead:function(){r(this.getId());var e={readStatus:2};this.receiverMessageStatus=e},updateFromClonedMsg:function(e){this.updateStatus(e.senderMessageStatus),this.updateReadStatus(e.receiverMessageStatus)},isToMySelf:function(){var e=this.getConvId().split(":");return e[0]===e[1]},isMe:function(){return this.getOpenId()===h.session.getItem(h.KEYS.OPENID)},isSys:function(){return 2===l.get(this,"baseMessage.creatorType")},isSound:function(){return 3===l.get(this,"baseMessage.content.contentType")},isFile:function(){return 4===l.get(this,"baseMessage.content.contentType")},isPhoto:function(){return 2===l.get(this,"baseMessage.content.contentType")},isMedia:function(){return 1!==l.get(this,"baseMessage.content.contentType")},isMeRead:function(){return this.isMe()?!0:2===l.get(this,"receiverMessageStatus.readStatus")},isAllRead:function(){return 0===l.get(this,"senderMessageStatus.unReadCount")},recallMessage:function(){var e=this;return new o(function(t,n){u.recallMessage(e.getId(),function(e){200===e.code?t(e):n(e)})})},remove:function(){var e=this;return new o(function(t,n){u.remove(e.getId(),function(r){200===r.code?(t(!0),g.emit(g.EVENTNAME.MSG_REMOVE,e)):n(r)})})}},t.exports=i},{"../idl/idl":20,"../listener/msgEvent":29,"../storage/storage":43,"../tools/method":53,"./msgCache":32,"./msgSendStatus":36,"@ali/ding-mediaid":63,promise:144}],32:[function(e,t,n){var r={},i=function(e,t){var n=e+"__"+t.getId(),i="";if(1===t.sendStatus){i=t.baseMessage.uuid;var o=e+"__"+i;delete r[o]}return r[n]&&r[n].uuid&&(i=r[n].uuid),r[n]?r[n].updateFromClonedMsg(t):r[n]=t,i&&(r[n].uuid=i,r[n].baseMessage.uuid=i),t},o=function(e,t){var n=e+"__"+t;delete r[n]},s=function(e,t){var n=e+"__"+t;return r[n]};t.exports={cacheMsg:i,delMsgCache:o,getMsg:s}},{}],33:[function(e,t,n){"use strict";function r(){o.register([{objectType:s.MESSAGE_DELETE_MODEL_TYPE,onSyncMsg:function(e){return c.info(e,"删除 sync"),u.get(e.conversationId).then(function(t){var n=t.getMsgById(e.messageId);a.emit(a.EVENTNAME.MSG_REMOVE,n)}),i.resolve()},onNeedPullData:function(){return i.resolve()}}])}var i=e("promise"),o=e("../sync/syncManager"),s=e("../sync/syncObjectType"),a=(e("../tools/method"),e("../listener/msgEvent")),u=e("../conversation/convManager"),c=e("../tools/log");t.exports={init:r}},{"../conversation/convManager":13,"../listener/msgEvent":29,"../sync/syncManager":47,"../sync/syncObjectType":48,"../tools/log":52,"../tools/method":53,promise:144}],34:[function(e,t,n){var r=(e("promise"),e("./msgSendStatus")),i=e("./senderExtFactory"),o=e("../tools/method"),s=e("../config/config");t.exports={genUUID:function(){return(new Date).getTime().toString()+parseInt(1e3*Math.random())},genSysBaseMsgModel:function(e){var t=this.genUUID(),n=new Date-0,r=null;return e.text&&(r={uuid:t,conversationId:e.cid,type:1,creatorType:2,content:{contentType:1,textContent:{text:e.text}},tag:0,createdAt:n,nickName:s.nickName,memberTag:0}),r},genCreateConvMsg:function(e){var t=this.genUUID(),n=new Date-0,r={uuid:t,type:1,creatorType:2,content:{contentType:1,textContent:{text:e||s.messageTpl.createGroupText}},tag:0,createdAt:n,nickName:s.nickName,memberTag:0};return r},genSendingMsg:function(e,t,n,a){var u=new Date-0,c=u-n>0?u:n+1,l={uuid:t,conversationId:e,type:1,creatorType:1,tag:0,createdAt:c,memberTag:0,openIdEx:i.genOpenIdEx(),nickName:s.nickName};o.assign(l,a);var f={baseMessage:l,senderMessageStatus:{},sendStatus:r.SENDING};return f},genReceiveMsg:function(e){var t={};e.baseMessage?t=e:t.baseMessage=e;var n=o.assign({receiverMessageStatus:{readStatus:1}},t);return n.sendStatus=r.SENDED,n},genSendingImgMsgContent:function(e,t){var n={mediaId:null,picSize:fileSize,type:1,orientation:1},r={contentType:2,photoContent:n};$fileHelper.readFile(e,function(){r.dataURI=e.dataURI,r.fileType=fileType,r.photoContent.mediaId=e.dataURI,"jpg"!==fileType&&"jpeg"!==fileType||!e.orientation||(r.photoContent.orientation=e.orientation),t(r)})},genSysMsg:function(e){var t=this,n=new Date-0,r=n-e.lastTime>0?n:e.lastTime+1,o={baseMessage:{content:{contentType:1,textContent:{text:e.text}},nickName:s.nickName,conversationId:e.cid,createdAt:r,creatorType:2,memberTag:0,messageId:e.mid||t.genUUID(),openIdEx:i.genOpenIdEx()},senderMessageStatus:{totalCount:0,unReadCount:0},receiverMessageStatus:{readStatus:1}};return o}}},{"../config/config":10,"../tools/method":53,"./msgSendStatus":36,"./senderExtFactory":39,promise:144}],35:[function(e,t,n){"use strict";function r(){o.register([{objectType:s.MESSAGE_NOTICE_MODEL_TYPE,onSyncMsg:function(e){return u.info(e,"撤回 sync"),a.emit(a.EVENTNAME.MSG_INFO_CHANGE,e),i.resolve()},onNeedPullData:function(){return i.resolve()}}])}var i=e("promise"),o=e("../sync/syncManager"),s=e("../sync/syncObjectType"),a=(e("../tools/method"),e("../listener/msgEvent")),u=e("../tools/log");t.exports={init:r}},{"../listener/msgEvent":29,"../sync/syncManager":47,"../sync/syncObjectType":48,"../tools/log":52,"../tools/method":53,promise:144}],36:[function(e,t,n){"use strict";t.exports={SENDING:0,SENDED:1,SENDFAIL:-1,WAITING_SEND:2}},{}],37:[function(e,t,n){"use strict";function r(){o.register([{objectType:a.IM_MSG,onSyncMsg:function(e){var t=u.get(e,"baseMessage.conversationId");return t?new i(function(n,r){s.get(t).then(function(t){t._receiveNewMsg(e),n()})}):i.reject()},onNeedPullData:function(){return i.resolve()}}])}var i=e("promise"),o=e("../sync/syncManager"),s=e("../conversation/convManager"),a=e("../sync/syncObjectType"),u=e("../tools/method");t.exports={init:r}},{"../conversation/convManager":13,"../sync/syncManager":47,"../sync/syncObjectType":48,"../tools/method":53,promise:144}],38:[function(e,t,n){"use strict";t.exports={NORMAL:1,SILENCE:3}},{}],39:[function(e,t,n){"use strict";var r=e("../storage/storage");t.exports={genOpenIdEx:function(){return{openId:r.session.getItem(r.KEYS.OPENID),tag:0}}}},{"../storage/storage":43}],40:[function(e,t,n){"use strict";function r(){o.register([{objectType:a.PUSH_RECEIVE,onSyncMsg:function(e){return s.emit(s.EVENTNAME.PUSH_RECEIVE,e),i.resolve()},onNeedPullData:function(){}}])}var i=e("promise"),o=e("../sync/syncManager"),s=e("../listener/msgEvent"),a=(e("../conversation/convManager"),e("../sync/syncObjectType"));t.exports={init:r}},{"../conversation/convManager":13,"../listener/msgEvent":29,"../sync/syncManager":47,"../sync/syncObjectType":48,promise:144}],41:[function(e,t,n){var r=e("promise"),i=e("../init/initManager"),o=e("../subscribe/subscribe"),s=e("../subscribe/subscribeManage"),a=e("../listener/authEvent"),u=e("../auth/auth"),c=e("../io/mainWS"),l=e("./regStatus"),f=e("../error/error"),d=e("../error/errorFactory"),n={reg:[["Object"],function(e){if(i(),!e.appKey)return r.reject(d.noAppKey("reg"));return new r(function(t,n){c.init("im",{appKey:e.appKey,did:e.deviceId,onReged:function(){return e.onReged&&e.onReged(),s(),c.getWS().isReconnect?void t(u._subscribe("isReconnect")):(t(),void(l.isReged=!0))},onDownMsg:function(t,n){e.onDownMsg&&e.onDownMsg(t,n),o.broadcast(t,n)},onStateChange:function(t){e.onStateChange&&e.onStateChange(t),"CLOSED"===t&&(l.isReged=!1),a.emit(a.EVENTNAME.STATE_CHANGE,t)}})})},!1]};t.exports=f(n).reg},{"../auth/auth":8,"../error/error":16,"../error/errorFactory":17,"../init/initManager":21,"../io/mainWS":24,"../listener/authEvent":26,"../subscribe/subscribe":44,"../subscribe/subscribeManage":45,"./regStatus":42,promise:144}],42:[function(e,t,n){t.exports={isReged:!1}},{}],43:[function(e,t,n){var r={TOKEN:"token_storage",APPKEY:"appkey_storage",OPENID:"openId_storage",NICK:"nick_storage"},i={getItem:function(e){return window.sessionStorage.getItem(e)},setItem:function(e,t){return window.sessionStorage.setItem(e,t)},removeItem:function(e){return window.sessionStorage.removeItem(e)}},o={getItem:function(e){return window.localStorage.getItem(e)},setItem:function(e,t){return window.localStorage.setItem(e,t)},removeItem:function(e){return window.localStorage.removeItem(e)}};t.exports={KEYS:r,session:i,local:o}},{}],44:[function(e,t,n){var r={};t.exports={broadcast:function(e,t){var n=e.lwp,i=r[n];i?i.forEach(function(n){n&&n(e,t)}):(i=r.custom,i.forEach(function(n){n&&n(e,t)}))},on:function(e,t){r[e]||(r[e]=[]);var n=r[e].push(t);return function(){r[e][n-1]=null}},off:function(e){delete r[e]}}},{}],45:[function(e,t,n){function r(){i.on("/s/msg",function(e,t){t({updateStatus:!1});var n=e.body.conversationId;o.get(n).then(function(t){t._receiveNewMsg(e.body)})}),i.on("/s/convex",function(e,t){t({});var n=e.body.conversationId;o.get(n).then(function(t){t._updateBaseConv(e.body)})}),i.on("/s/conp",function(e,t){t({});var n=e.body.conversationId;o.get(n).then(function(t){t._updateBaseConv(e.body)})}),i.on("/s/status",function(e,t){t({});var n=e.body.conversationId;o.get(n).then(function(t){t._updateMsgStatus(e.body)})}),i.on("/s/readstatus",function(e,t){t({}),e&&e.body&&Array.isArray(e.body.readStatusList)&&e.body.readStatusList.forEach(function(t){var n=t.conversationId;o.get(n).then(function(t){t._updateMsgStatus(e.body)})})}),i.on("/s/typing",function(e,t){t({}),e&&e.body&&Array.isArray(e.body.typingModels)&&e.body.typingModels.forEach(function(e){var t=e.conversationId;o.get(t).then(function(t){l.emit(l.EVENTNAME.CONV_TYPING_EVENT,t,e)})})}),i.on("/s/msgInfo",function(e,t){t({});var n=e.body.conversationId;o.get(n).then(function(t){var n=t.getMsgById(e.body.messageId);n&&c.emit(c.EVENTNAME.MSG_INFO_CHANGE,n,e.body)})}),i.on("/s/devSts",function(e,t){t({}),a.logout(),u.emit(u.EVENTNAME.DEVSTS,e.body)}),i.on("/push/kickout",function(e,t){t({}),a.logout(),u.emit(u.EVENTNAME.KICKOUT,e.body)}),i.on("custom",function(e,t){t({}),c.emit(c.EVENTNAME.CUSTOM,e)}),s.init()}var i=e("./subscribe"),o=e("../conversation/convManager"),s=e("../sync/syncManager"),a=e("../auth/auth"),u=e("../listener/authEvent"),c=e("../listener/msgEvent"),l=e("../listener/convEvent");t.exports=r},{"../auth/auth":8,"../conversation/convManager":13,"../listener/authEvent":26,"../listener/convEvent":27,"../listener/msgEvent":29,"../sync/syncManager":47,"./subscribe":44}],46:[function(e,t,n){"use strict";function r(){this.affairs={}}var i=e("@ali/msgpack"),o=e("../idl/idl"),s=o.model.user,a=o.model.relation,u=o.model.im,c=o.model.push,l=e("./syncObjectType"),f={};f[l.RELATION_ALIAS]=s.paddings.AliasModel,f[l.RELATION_FOLLOW]=a.paddings.FollowModel,f[l.IM_MSG]=u.paddings.MessageModel,f[l.PUSH_RECEIVE]=c.paddings.PayloadModel,f[l.MESSAGE_NOTICE_MODEL_TYPE]=u.paddings.MessageNoticeModel,f[l.MESSAGE_DELETE_MODEL_TYPE]=u.paddings.MessageDeleteModel,r.prototype.register=function(e){var t=this;e.forEach(function(e){e&&(t.affairs[e.objectType]={onSyncMsg:e.onSyncMsg||function(){return Promise.resolve()},onNeedPullData:e.onNeedPullData||function(){return Promise.resolve()}})})},r.prototype.unregister=function(e){var t=this;delete t.affairs[e]},r.prototype.pullData=function(){var e=this,t=[];for(var n in e.affairs)t.push(this.affairs[n].onNeedPullData());return Promise.all(t)},r.prototype.dispatchMsg=function(e){var t=this,n=e.map(function(e){var n=e.objectType;try{var r=i.decodeFromB64(e.data);f[n]&&(r=f[n](r))}catch(o){return Promise.reject("dispatchMsg fail")}return t.affairs[n]?t.affairs[n].onSyncMsg(r):Promise.resolve()});return Promise.all(n)},t.exports=r},{"../idl/idl":20,"./syncObjectType":48,"@ali/msgpack":64}],47:[function(e,t,n){"use strict";function r(){m.off("/s/sync"),m.off("/s/syncDev")}function i(){r(),m.on("/s/sync",function(e,t){E.log(e);var n=g.paddings.SyncPushModel(e.body);n.syncExtraType&&2===n.syncExtraType.type&&(t({}),s()),n.syncPushPackage&&n.syncPushPackage.data&&l(n.syncPushPackage.startSeq).then(function(){y.dispatchMsg(n.syncPushPackage.data).then(function(){t({})},function(){t({})})},function(e){t({},500),u(e)})["catch"](function(e){E.log(e)})}),m.on("/s/syncDev",function(e,t){E.log(e);var n=g.paddings.SyncPushModel(e.body);n.syncExtraType&&2===n.syncExtraType.type&&(t({}),s()),n.syncPushPackage&&n.syncPushPackage.data&&l(n.syncPushPackage.startSeq).then(function(){y.dispatchMsg(n.syncPushPackage.data).then(function(){t({})},function(){t({})})},function(e){t({},500),u(e)})["catch"](function(e){E.log(e)})})}function o(e){y.register(e)}function s(){var e=null;return new f(function(t,n){a().then(function(t){return e=t,y.pullData()}).then(function(){p.setSyncInfo(e),u(p.getSyncInfo()),t()})["catch"](function(e){E.log(e),n(e)})})}function a(){return new f(function(e,t){var n=p.getSyncInfo();b.getState(n,function(n){200===n.code?e(n.body):t("_getState fail",n)})})}function u(e){b.getDiff(e,function(t){200===t.code?(w=0,l(t.body.startSeq).then(function(){p.setSyncInfo({pts:t.body.maxPts,highPts:t.body.maxHighPts,seq:t.body.endSeq,timestamp:t.body.timestamp}),t.body.data&&Array.isArray(t.body.data)&&y.dispatchMsg(t.body.data),t.body.hasMore?u(p.getSyncInfo()):c()},function(){u(e)})):(w++,w>M?ackDiff():u(e))})}function c(){var e=p.getSyncInfo();b.ackDiff(e,function(e){E.log("sync ackDiff result: "+JSON.stringify(e))})}function l(e){return void 0!==v?x>=e-v?(v=e,f.resolve()):f.reject(p.getSyncInfo()):(v=e,f.resolve())}var f=e("promise"),d=e("./SyncModel"),p=e("./syncState"),h=(e("./syncObjectType"),e("../idl/idl")),g=h.model.sync,v=void 0,m=e("../subscribe/subscribe"),y=(e("wolfy87-eventemitter"),e("../listener/msgEvent"),new d),b=h["interface"].Sync,E=e("../tools/log"),M=5,w=0,x=1;t.exports={init:i,register:o}},{"../idl/idl":20,"../listener/msgEvent":29,"../subscribe/subscribe":44,"../tools/log":52,"./SyncModel":46,"./syncObjectType":48,"./syncState":49,promise:144,"wolfy87-eventemitter":156}],48:[function(e,t,n){"use strict";t.exports={RELATION_ALIAS:2501,RELATION_FOLLOW:2503,IM_MSG:1e3,IM_CONVERSATION:1e4,PUSH_RECEIVE:3501,MESSAGE_NOTICE_MODEL_TYPE:1001,MESSAGE_DELETE_MODEL_TYPE:1002}},{}],49:[function(e,t,n){"use strict";var r=e("../tools/method"),i={pts:0,highPts:0,seq:0,timestamp:0};n.getSyncInfo=function(){return i},n.setSyncInfo=function(e){return r.assign(i,e),i}},{"../tools/method":53}],50:[function(e,t,n){"use strict";var r=e("uuid");n.getDid=function(){var e=sessionStorage.getItem("wk_device_id");if(e)return e;var e=r.v4().replace(/\-/g,"");return sessionStorage.setItem("wk_device_id",e),e}},{uuid:155}],51:[function(e,t,n){function r(){}function i(e,t,n){function i(){a.parentNode&&a.parentNode.removeChild(a),window[l]=r,u&&clearTimeout(u)}function s(){window[l]&&i()}"function"==typeof t&&(n=t,t={}),t||(t={});var a,u,c=t.prefix||"__jp",l=t.name||c+o++,f=t.param||"callback",d=null!=t.timeout?t.timeout:6e4,p=encodeURIComponent,h=document.getElementsByTagName("script")[0]||document.head;return d&&(u=setTimeout(function(){i(),n&&n(new Error("Timeout"))},d)),window[l]=function(e){i(),n&&n(null,e)},e+=(~e.indexOf("?")?"&":"?")+f+"="+p(l),e=e.replace("?&","?"),a=document.createElement("script"),a.src=e,h.parentNode.insertBefore(a,h),s}t.exports=i;var o=0},{}],52:[function(e,t,n){"use strict";function r(e,t){if(window.debug&&console[e](t),window.aliwukongCollectLogUrl){var n="did:"+i.getDid()+" type:"+e+" log:"+t;o(window.aliwukongCollectLogUrl+"?log="+n,{})}}var i=e("./deviceId"),o=e("./jsonp");({did:i.getDid()});t.exports={log:function(){r("log",arguments)},info:function(){var e=JSON.stringify(arguments);r("info",e)},error:function(){var e=JSON.stringify(arguments);r("error",e)},warn:function(){var e=JSON.stringify(arguments);r("warn",e)}}},{"./deviceId":50,"./jsonp":51}],53:[function(e,t,n){t.exports={get:e("lodash/object/get"),uniq:e("lodash/array/uniq"),assign:e("lodash/object/assign"),getUUID:function(e){var t,n="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""),r=[],e=e||16;for(t=0;e>t;t++)r[t]=n[0|Math.random()*e];return r.join("")}}},{"lodash/array/uniq":87,"lodash/object/assign":135,"lodash/object/get":136}],54:[function(e,t,n){t.exports={img:["gif","bmp","png","jpg","jpeg","ico","tiff","tif","tga"],other:["rar","json","zip","ppt","pptx","doc","docx","xls","xlsx","pdf","txt","java","js","py","pl","pm","c","cpp","xml","php","ini"]}},{}],55:[function(e,t,n){function r(e){return e.split("/")[1]}function i(e,t){var n=d[e],r=n.indexOf(t);return-1!==r}function o(){}var s=e("promise"),a=e("../tools/deviceId"),u=e("../io/ws"),c=e("@ali/ding-mediaid"),l=e("../storage/storage"),f=e("../config/config"),d=e("./allowType"),p=(e("path"),e("@ali/ding-filetypes")),h=function(e){return{pre:function(t,n){n=n||function(){},e.sendMsg("/up/pre",{did:a.getDid(),dt:"j","up-req":"-1;-1;"+t.type+";flag=mi;","net-type":"wifi"},"",!1,function(t){200==t.code?n({code:t.code,upId:t.headers["up-resp"],upUid:t.headers.uip}):(n(t),e.forceClose())})},ci:function(t,n,r){r=r||function(){},e.sendMsg("/up/ci",{did:a.getDid(),dt:"b","up-req":t.upId.split("&")[0]+";0;0;flag=mi;","net-type":"wifi",uip:t.upUid},n,!1,function(t){r(t),e.forceClose()})},trans:function(t,n){e.sendMsg("/up/trans",{},{src:t,dstType:5},!1,function(t){n(t),e.forceClose()})}}};o.prototype.uploadImgByFile=function(e,t){if(t=t||"img",!e)return s.reject("need file");if(e.size>20971520)return s.reject("文件最大限制20M");var n=r(e.type);return i(t,n)?new s(function(t,r){var i=new FileReader;i.readAsDataURL(e),i.onload=function(e){var i=this.result.replace(/[^,]*,/,""),o=new u("upload",{appKey:l.session.getItem(l.KEYS.APPKEY),WSURL:f.customUrl},{onReged:function(){var e=h(o);e.pre({type:p.getIdByType(n)},function(n){200===n.code?e.ci(n,i,function(e){200===e.code?(e.body.mediaId=e.body.uri,e.body.uri=c.mid2Url(e.body.uri),e.body.thumb=c.mid2Url(e.body.thumb),t(e.body)):r(e)}):r(n)})}});o.connect()}}):s.reject("暂不支持此类格式文件")},o.prototype.trans=function(e,t){return e?new s(function(t,n){var r=new u("upload",{appKey:l.session.getItem(l.KEYS.APPKEY),WSURL:f.customUrl},{onReged:function(){var i=h(r);i.trans(e,function(e){200===e.code?t(c.mid2Url(e.body.url)):n(e)})}});r.connect()}):promise.reject("need mediaId")},t.exports=new o},{"../config/config":10,"../io/ws":25,"../storage/storage":43,"../tools/deviceId":50,"./allowType":54,"@ali/ding-filetypes":62,"@ali/ding-mediaid":63,path:83,promise:144}],56:[function(e,t,n){"use strict";function r(){o.register([{objectType:s.RELATION_ALIAS,onSyncMsg:function(e){return new i(function(t,n){a.getUsers([e.openId]).then(function(n){n[0].updateRemark(e),t()},n)})},onNeedPullData:function(){return a.pullUserRemark()}}])}var i=e("promise"),o=e("../sync/syncManager"),s=e("../sync/syncObjectType"),a=(e("./user"),e("./userManager"));t.exports={init:r}},{"../sync/syncManager":47,"../sync/syncObjectType":48,"./user":57,"./userManager":59,promise:144}],57:[function(e,t,n){"use strict";var r=e("promise"),i=e("../idl/idl"),o=i["interface"].UserI,s=i["interface"].AliasI,a=e("../listener/userEvent"),u=e("../listener/followEvent"),c=function(e){
this._genUserData(),e&&this.update(e)};c.prototype={getId:function(){return this.userProfileModel?this.userProfileModel.openId:null},update:function(e){this.userProfileModel=e},updateRemark:function(e){return this.userRemarkModel[e.openId]&&this.userRemarkModel[e.openId]==e?r.resolve():(this.userRemarkModel[e.openId]=e,a.emit(a.EVENTNAME.REMARK_CHANGE,e),r.resolve())},updateFollow:function(e){return this.userFollowModel[e.openId]&&this.userFollowModel[e.openId]==e?r.resolve():(this.userFollowModel[e.openId]=e,u.emit(u.EVENTNAME.FOLLOW_CHANGE,e),r.resolve())},compareTag:function(e){var t=this;this.userProfileModel.ver===e||t.isUpdating||(t.isUpdating=!0,o.getUserProfilesByOpenIds([t.getId()],function(e){200===e.code&&0!==e.body.length?t.update(e.body[0]):console.log("拉取人员失败")}))},_genUserData:function(){this.isUpdating=!1,!this.userProfileModel&&(this.userProfileModel={}),!this.userRemarkModel&&(this.userRemarkModel={}),!this.userFollowModel&&(this.userFollowModel={})},getRemark:function(){return this.userRemarkModel[this.getId()]},getFollow:function(){return this.userFollowModel[this.getId()]},setRemark:function(e){var t=this,n=this.getId(),i={openId:n,alias:e};return new r(function(e,n){s.update([i],function(r){200===r.code?(t.updateRemark(r.body),e(r.body)):n("setRemark fail")})})}},t.exports=c},{"../idl/idl":20,"../listener/followEvent":28,"../listener/userEvent":30,promise:144}],58:[function(e,t,n){function r(e){return s[e]}function i(e,t){if(e&&t){var n=s[e];return n?n.update(t):(n=t instanceof o?t:new o(t),s[e]=n),n}}var o=e("./user.js"),s={};t.exports={get:r,set:i}},{"./user.js":57}],59:[function(e,t,n){function r(e){return f.put({openIds:e})}function i(e){return/^[\d]+$/.test(e)?new l(function(t,n){p.getUserProfileByOpenId(e,function(e){200==e.code?t(e.body):n(e)})}):l.reject("openId, must be number")}function o(e){var t=[];return new l(function(n,i){r(e).then(function(e){e&&(e.forEach(function(e){t.push(e.userProfileModel)}),n(t))})})}function s(e){return new l(function(t,n){p.updateUserProfile(e,function(e){200==e.code?t(e.body):n(e)})})}function a(e){return new l(function(t,n){h.updateData(1,e,function(e){200==e.code?t(e.body):n(e)})})}function u(e){return new l(function(t,n){h.getAliasModel(e,function(e){200==e.code?t(e.body):n(e)})})}function c(){return new l(function(e,t){h.queryAll(function(t){200===t.code?(t.body&&t.body.forEach(function(e){r([e.openId]).then(function(t){t[0]&&t[0].updateRemark(e)})}),e(t.body)):e(t)})})}var l=e("promise"),f=e("./userRequestPool"),d=e("../idl/idl"),p=d["interface"].UserI,h=d["interface"].AliasI;t.exports={getProfiles:o,getProfile:i,getUsers:r,updateProfile:s,updateRemark:a,getRemark:u,pullUserRemark:c}},{"../idl/idl":20,"./userRequestPool":60,promise:144}],60:[function(e,t,n){function r(){this.data=[],this._bufferOpenIds=[],this._waitOpenIds=[],this._requestInterval=30,this._rePullInterval=1e4,this._rePullTimer=null,this._isReadyToSendRequest=!0}function i(e){return c.put(e)}var o=e("promise"),s=e("../idl/idl"),a=s["interface"].UserI,u=e("./userCache");r.prototype.put=function(e){var t=this;return e.promise=new o(function(t,n){e._resolve=t,e._reject=n}),this.data.push(e),this._pushToOpenIdsArray(e.openIds),this._isReadyToSendRequest&&0!==this._bufferOpenIds.length&&(this._isReadyToSendRequest=!1,setTimeout(function(){t._sendRequest(),t._isReadyToSendRequest=!0,t._rePullTimer&&clearTimeout(t._rePullTimer),t._rePullTimer=setTimeout(function(){var e=t._diff(t._waitOpenIds,t._bufferOpenIds);t._bufferOpenIds=t._bufferOpenIds.concat(e),t._waitOpenIds=[],0!==t._bufferOpenIds.length&&t._sendRequest()},t._rePullInterval)},t._requestInterval)),e.promise},r.prototype._pushToOpenIdsArray=function(e){if(e=this._checkCache(e),0===e.length)return void this._resolveData();var t=this._diff(e,this._bufferOpenIds);t=this._diff(t,this._waitOpenIds),this._bufferOpenIds=this._bufferOpenIds.concat(t)},r.prototype._diff=function(e,t){return e.filter(function(e){return-1!=t.indexOf(e)?!1:!0})},r.prototype._checkCache=function(e){var t=[];return e.forEach(function(e){!u.get(e)&&t.push(e)}),t},r.prototype._sendRequest=function(){var e=this,t=[];this._bufferOpenIds=this._bufferOpenIds.filter(function(e){return!String(e).match(/^[\d]+$/)||String(e).length>14?!1:!0});for(var n=[],r=0;r<this._bufferOpenIds.length;r+=100)n.push(this._bufferOpenIds.slice(r,r+100));this._waitOpenIds=this._waitOpenIds.concat(this._bufferOpenIds),this._bufferOpenIds=[],n.forEach(function(e){t.push(new o(function(t,n){a.getUserProfilesByOpenIds(e,function(e){200===e.code?t(e.body):n(e)})}))}),t.forEach(function(t){t.then(function(t){e._saveCache(t),e._resolveData()})})},r.prototype._saveCache=function(e){var t=this;e.forEach(function(e){u.set(e.openId,e);var n=t._waitOpenIds.indexOf(e.openId);-1!==n&&t._waitOpenIds.splice(n,1)})},r.prototype._resolveData=function(){for(var e=this,t=0;t<this.data.length;t++){for(var n=[],r=this.data[t],i=0;i<r.openIds.length;i++)if(void 0===r.openIds[i]||isNaN(r.openIds[i])||0===r.openIds[i])n.push(void 0);else{var o=u.get(r.openIds[i]);if(!o)break;n.push(o)}i===r.openIds.length&&(r._resolve(n),e.data.splice(t,1),t--)}};var c=new r;t.exports={put:i}},{"../idl/idl":20,"./userCache":58,promise:144}],61:[function(e,t,n){t.exports="3.2.5"},{}],62:[function(e,t,n){var r={},i={0:"IMAGE_JPG",1:"IMAGE_GIF",2:"IMAGE_PNG",3:"IMAGE_BMP",4:"AUDIO_AMR",5:"AUDIO_MP3",6:"VIDEO_MP4",7:"AUDIO_WAV",8:"NORMAL_FILE",9:"OFFICE_DOC",10:"OFFICE_DOCX",11:"OFFICE_XLS",12:"OFFICE_XLSX",13:"OFFICE_PPT",14:"OFFICE_PPTX",15:"NORMAL_ZIP",16:"NORMAL_PDF",17:"NORMAL_RAR",18:"NORMAL_PSD",19:"NORMAL_AI",20:"NORMAL_TXT",21:"VIDEO_AVI",22:"VIDEO_RMVB",23:"VIDEO_RM",24:"VIDEO_MPG",25:"VIDEO_WMV",26:"VIDEO_MKV",27:"VIDEO_VOB",28:"NORMAL_TFSPRIVATE",29:"IMAGE_WEBP"};Object.keys(i).forEach(function(e){var t=i[e],n=t.split("_")[1].toLowerCase();r[n]=e}),r.jpeg=0;var o=["jpg","jpeg","bmp","png","gif","doc","docx","xlsx","xls","pdf","ppt","pptx","zip","rar","txt","mp4","psd","ai","avi"],s={getTypeByName:function(e){return e.split(".").pop().toLowerCase()},getIdByType:function(e){if(void 0===r[e])var e="file";return r[e]},getCateTypeById:function(e){if(void 0===i[e])var e="8";return i[e]},getTypeById:function(e){if(void 0===i[e])var e="8";return i[e].split("_")[1].toLowerCase()},getCateTypeByType:function(e){return s.getCateTypeById(s.getIdByType(e))},isValid:function(e){var t=o.indexOf(e);return-1!==t},isImg:function(e){return"IMAGE"===s.getCateTypeByType(e).split("_")[0]},getFileIconByType:function(e){var t=s.getCateTypeByType(e);switch(t){case"OFFICE_DOC":case"OFFICE_DOCX":return"word-icon";case"OFFICE_PPT":case"OFFICE_PPTX":return"ppt-icon";case"NORMAL_PDF":return"pdf-icon";case"OFFICE_XLS":case"OFFICE_XLSX":return"excl-icon";case"NORMAL_ZIP":return"zip-icon";case"NORMAL_RAR":return"rar-icon";case"NORMAL_PSD":return"psd-icon";case"NORMAL_AI":return"ai-icon";case"NORMAL_TXT":return"txt-icon";case"VIDEO_AVI":case"VIDEO_RMVB":case"VIDEO_RM":case"VIDEO_MPG":case"VIDEO_WMV":case"VIDEO_MKV":case"VIDEO_VOB":case"VIDEO_MP4":return"video-icon";case"IMAGE_JPG":case"IMAGE_GIF":case"IMAGE_PNG":case"IMAGE_BMP":return"pic-icon";default:return"default-icon"}}};t.exports=s},{}],63:[function(e,t,n){"use strict";function r(e){for(var t="",n=e.length-1;n>=0;n--)t+=e[n];return t}var i=e("@ali/msgpack"),o=e("@ali/ding-filetypes"),s=e("jsuri"),a="static.dingtalk.com",u="i01.lw.aliimg.com",c="media",l="https://"+a+"/"+c+"/",f=1===window.devicePixelRatio,d=function(e,t){var t=t||{};if("@"!==e.charAt(0))return"https:"===window.location.protocol&&(e=e.replace(/^http(?!s)/,"https")),e;e=e.replace(/-/gi,"+").replace(/_/gi,"/");var e=e.substr(1),n=i.decodeFromB64(e),r=o.getCateTypeById(n[0]).split("_");if("IMAGE"===r[0])if("origin"===t.imageSize)var s=e+"_"+n[3]+"_"+n[2]+"."+r[1].toLowerCase();else if("thumb"===t.imageSize)var a=f?"_60x60q90.jpg":"_120x120q90.jpg",s=e+"_"+n[3]+"_"+n[2]+"."+r[1].toLowerCase()+a;else if("GIF"===r[1])var s=e+"_"+n[3]+"_"+n[2]+"."+r[1].toLowerCase();else var s=e+"_"+n[3]+"_"+n[2]+"."+r[1].toLowerCase()+"_620x10000q90.jpg";else var s=e+"."+r[1].toLowerCase();return s=s.replace(/\//gi,"_").replace(/\+/gi,"-"),l+s},p=function(e){var t=new s(e);if((t.host()===a||t.host()===u)&&t.uriParts.directory==="/"+c+"/"){var n=t.uriParts.file,i=n.indexOf(".");if(-1!==i){n=n.slice(0,i),n=r(n);var o=n.indexOf("_");if(-1!==o){var l=n.indexOf("_",o+1);if(-1!==l&&(n=n.slice(l+1)))return"@"+r(n)}}}return e};n.mid2Url=d,n.url2Mid=p},{"@ali/ding-filetypes":62,"@ali/msgpack":64,jsuri:85}],64:[function(e,t,n){"use strict";function r(e){if(void 0===e)return"undefined";var t,n;if(e instanceof ArrayBuffer?(n="ArrayBuffer",t=new DataView(e)):e instanceof DataView&&(n="DataView",t=e),!t)return JSON.stringify(e);for(var r=[],i=0;i<e.byteLength;i++){if(i>20){r.push("...");break}var o=t.getUint8(i).toString(16);1===o.length&&(o="0"+o),r.push(o)}return"<"+n+" "+r.join(" ")+">"}function i(e,t,n){for(var r=(e.byteLength,0),i=n.length;i>r;r++){var o=n.charCodeAt(r);if(128>o)e.setUint8(t++,o>>>0&127|0);else if(2048>o)e.setUint8(t++,o>>>6&31|192),e.setUint8(t++,o>>>0&63|128);else if(65536>o)e.setUint8(t++,o>>>12&15|224),e.setUint8(t++,o>>>6&63|128),e.setUint8(t++,o>>>0&63|128);else{if(!(1114112>o))throw new Error("bad codepoint "+o);e.setUint8(t++,o>>>18&7|240),e.setUint8(t++,o>>>12&63|128),e.setUint8(t++,o>>>6&63|128),e.setUint8(t++,o>>>0&63|128)}}}function o(e,t,n){for(var r="",i=t,o=t+n;o>i;i++){var s=e.getUint8(i);if(0!==(128&s))if(192!==(224&s))if(224!==(240&s)){if(240!==(248&s))throw new Error("Invalid byte "+s.toString(16));var a=(7&s)<<18|(63&e.getUint8(++i))<<12|(63&e.getUint8(++i))<<6|(63&e.getUint8(++i))<<0,u=Math.floor((a-65536)/1024)+55296,c=(a-65536)%1024+56320;r+=String.fromCharCode(u,c)}else r+=String.fromCharCode((15&s)<<12|(63&e.getUint8(++i))<<6|(63&e.getUint8(++i))<<0);else r+=String.fromCharCode((15&s)<<6|63&e.getUint8(++i));else r+=String.fromCharCode(s)}return r}function s(e){for(var t=0,n=0,r=e.length;r>n;n++){var i=e.charCodeAt(n);if(128>i)t+=1;else if(2048>i)t+=2;else if(65536>i)t+=3;else{if(!(1114112>i))throw new Error("bad codepoint "+i);t+=4}}return t}function a(e,t,n){this.offset=t||0,this.view=e,this.bytes=n}function u(e){var t=e.buffer,n=new DataView(t),r=new a(n,0,e),i=r.parse();if(r.offset!==t.byteLength)throw new Error(t.byteLength-r.offset+" trailing bytes");return i}function c(e,t,n){var r=typeof e;if("string"===r){var o=s(e);if(32>o)return t.setUint8(n,160|o),i(t,n+1,e),1+o;if(65536>o)return t.setUint8(n,218),t.setUint16(n+1,o),i(t,n+3,e),3+o;if(4294967296>o)return t.setUint8(n,219),t.setUint32(n+1,o),i(t,n+5,e),5+o}if(e instanceof ArrayBuffer){var o=e.byteLength;if(65536>o)return t.setUint8(n,216),t.setUint16(n+1,o),new Uint8Array(t.buffer).set(new Uint8Array(e),n+3),3+o;if(4294967296>o)return t.setUint8(n,217),t.setUint32(n+1,o),new Uint8Array(t.buffer).set(new Uint8Array(e),n+5),5+o}if("number"===r){if(e<<0!==e)return t.setUint8(n,203),t.setFloat64(n+1,e),9;if(e>=0){if(128>e)return t.setUint8(n,e),1;if(256>e)return t.setUint8(n,204),t.setUint8(n+1,e),2;if(65536>e)return t.setUint8(n,205),t.setUint16(n+1,e),3;if(4294967296>e)return t.setUint8(n,206),t.setUint32(n+1,e),5;throw new Error("Number too big 0x"+e.toString(16))}if(e>=-32)return t.setInt8(n,e),1;if(e>=-128)return t.setUint8(n,208),t.setInt8(n+1,e),2;if(e>=-32768)return t.setUint8(n,209),t.setInt16(n+1,e),3;if(e>=-2147483648)return t.setUint8(n,210),t.setInt32(n+1,e),5;throw new Error("Number too small -0x"+(-e).toString(16).substr(1))}if("undefined"===r)return t.setUint8(n,196),1;if(null===e)return t.setUint8(n,192),1;if("boolean"===r)return t.setUint8(n,e?195:194),1;if("object"===r){var o,a=0,u=Array.isArray(e);if(u)o=e.length;else{var l=Object.keys(e);o=l.length}var a;if(16>o?(t.setUint8(n,o|(u?144:128)),a=1):65536>o?(t.setUint8(n,u?220:222),t.setUint16(n+1,o),a=3):4294967296>o&&(t.setUint8(n,u?221:223),t.setUint32(n+1,o),a=5),u)for(var f=0;o>f;f++)a+=c(e[f],t,n+a);else for(var f=0;o>f;f++){var d=l[f];a+=c(d,t,n+a),a+=c(e[d],t,n+a)}return a}throw new Error("Unknown type "+r)}function l(e){var t=typeof e;if("string"===t){var n=s(e);if(32>n)return 1+n;if(65536>n)return 3+n;if(4294967296>n)return 5+n}if(e instanceof ArrayBuffer){var n=e.byteLength;if(65536>n)return 3+n;if(4294967296>n)return 5+n}if("number"===t){if(e<<0!==e)return 9;if(e>=0){if(128>e)return 1;if(256>e)return 2;if(65536>e)return 3;if(4294967296>e)return 5;if(0x10000000000000000>e)return 9;throw new Error("Number too big 0x"+e.toString(16))}if(e>=-32)return 1;if(e>=-128)return 2;if(e>=-32768)return 3;if(e>=-2147483648)return 5;if(e>=-0x8000000000000000)return 9;throw new Error("Number too small -0x"+e.toString(16).substr(1))}if("boolean"===t||"undefined"===t||null===e)return 1;if("object"===t){var n,r=0;if(Array.isArray(e)){n=e.length;for(var i=0;n>i;i++)r+=l(e[i])}else{var o=Object.keys(e);n=o.length;for(var i=0;n>i;i++){var a=o[i];r+=l(a)+l(e[a])}}if(16>n)return 1+r;if(65536>n)return 3+r;if(4294967296>n)return 5+r;throw new Error("Array or object too long 0x"+n.toString(16))}throw new Error("Unknown type "+t)}n.inspect=r,n.utf8Write=i,n.utf8Read=o,n.utf8ByteCount=s,n.encode=function(e){var t=new ArrayBuffer(l(e)),n=new DataView(t);return c(e,n,0),t},n.decode=u,a.prototype.map=function(e){for(var t={},n=0;e>n;n++){var r=this.parse();t[r]=this.parse()}return t},a.prototype.buf=function(e){var t=new ArrayBuffer(e);return new Uint8Array(t).set(new Uint8Array(this.view.buffer,this.offset,e),0),this.offset+=e,t},a.prototype.raw=function(e){var t=o(this.view,this.offset,e);return this.offset+=e,t},a.prototype.array=function(e){for(var t=new Array(e),n=0;e>n;n++)t[n]=this.parse();return t},a.prototype.parse=function(){var e,t,n=this.view.getUint8(this.offset);if(160===(224&n))return t=31&n,this.offset++,this.raw(t);if(128===(240&n))return t=15&n,this.offset++,this.map(t);if(144===(240&n))return t=15&n,this.offset++,this.array(t);if(0===(128&n))return this.offset++,n;if(224===(224&n))return e=this.view.getInt8(this.offset),this.offset++,e;switch(n){case 218:return t=this.view.getUint16(this.offset+1),this.offset+=3,this.raw(t);case 219:return t=this.view.getUint32(this.offset+1),this.offset+=5,this.raw(t);case 192:return this.offset++,null;case 194:return this.offset++,!1;case 195:return this.offset++,!0;case 196:return void this.offset++;case 204:return e=this.view.getUint8(this.offset+1),this.offset+=2,e;case 205:return e=this.view.getUint16(this.offset+1),this.offset+=3,e;case 206:return e=this.view.getUint32(this.offset+1),this.offset+=5,e;case 208:return e=this.view.getInt8(this.offset+1),this.offset+=2,e;case 209:return e=this.view.getInt16(this.offset+1),this.offset+=3,e;case 210:return e=this.view.getInt32(this.offset+1),this.offset+=5,e;case 222:return t=this.view.getUint16(this.offset+1),this.offset+=3,this.map(t);case 223:return t=this.view.getUint32(this.offset+1),this.offset+=5,this.map(t);case 220:return t=this.view.getUint16(this.offset+1),this.offset+=3,this.array(t);case 221:return t=this.view.getUint32(this.offset+1),this.offset+=5,this.array(t);case 216:return t=this.view.getUint16(this.offset+1),this.offset+=3,this.buf(t);case 217:return t=this.view.getUint32(this.offset+1),this.offset+=5,this.buf(t);case 202:return e=this.view.getFloat32(this.offset+1),this.offset+=5,e;case 203:return e=this.view.getFloat64(this.offset+1),this.offset+=9,e;case 207:var r=this.bytes;this.offset++;var i=16777216*r[this.offset++]+(r[this.offset++]<<16)+(r[this.offset++]<<8)+r[this.offset++];return 4294967296*i+16777216*r[this.offset++]+(r[this.offset++]<<16)+(r[this.offset++]<<8)+r[this.offset++]}throw new Error("Unknown type 0x"+n.toString(16))},n.decodeFromB64=function(e){for(var t=window.atob(e),r=t.length,i=new Uint8Array(r),o=0;r>o;o++){var s=t.charCodeAt(o);i[o]=s}return n.decode(i)}},{}],65:[function(e,t,n){"use strict";function r(e){var t={};return o.forEach(function(n){t[n]=function(){var t,r=Array.prototype.slice.apply(arguments,[]);r.length>0?(t=r[r.length-1],"function"!=typeof t?t=function(){}:r.pop()):(r=[],t=function(){}),e.sendMsg("/r/"+i+"/"+n,{},r,!1,t)}}),t}var i="AliasI",o=["update","getAliasModel","updateData","queryAll"];t.exports=r},{}],66:[function(e,t,n){"use strict";function r(e){var t={};return o.forEach(function(n){t[n]=function(){var t,r=Array.prototype.slice.apply(arguments,[]);r.length>0?(t=r[r.length-1],"function"!=typeof t?t=function(){}:r.pop()):(r=[],t=function(){}),e.sendMsg("/r/"+i+"/"+n,{},r,!1,t)}}),t}var i="BlacklistI",o=["listAll","getStatus","addToBlacklist","removeFromBlacklist"];t.exports=r},{}],67:[function(e,t,n){"use strict";function r(e){var t={};return o.forEach(function(n){t[n]=function(){var t,r=Array.prototype.slice.apply(arguments,[]);r.length>0?(t=r[r.length-1],"function"!=typeof t?t=function(){}:r.pop()):(r=[],t=function(){}),e.sendMsg("/r/"+i+"/"+n,{},r,!1,t)}}),t}var i="ColdBootI",o=["sendColdBootNotice","login"];t.exports=r},{}],68:[function(e,t,n){"use strict";function r(e){var t={};return o.forEach(function(n){t[n]=function(){var t,r=Array.prototype.slice.apply(arguments,[]);r.length>0?(t=r[r.length-1],"function"!=typeof t?t=function(){}:r.pop()):(r=[],t=function(){}),e.sendMsg("/r/"+i+"/"+n,{},r,!1,t)}}),t}var i="DAuthI",o=["login","refreshToken"];t.exports=r},{}],69:[function(e,t,n){"use strict";function r(e){var t={};return o.forEach(function(n){t[n]=function(){var t,r=Array.prototype.slice.apply(arguments,[]);r.length>0?(t=r[r.length-1],"function"!=typeof t?t=function(){}:r.pop()):(r=[],t=function(){}),e.sendMsg("/r/"+i+"/"+n,{},r,!1,t)}}),t}var i="FollowI",o=["listFollowings","listBilateral","listFollowers","getStatus","listAll","follow","unfollow"];t.exports=r},{}],70:[function(e,t,n){"use strict";function r(e){var t={};return o.forEach(function(n){t[n]=function(){var t,r=Array.prototype.slice.apply(arguments,[]);r.length>0?(t=r[r.length-1],"function"!=typeof t?t=function(){}:r.pop()):(r=[],t=function(){}),e.sendMsg("/r/"+i+"/"+n,{},r,!1,t)}}),t}var i="IDLConversation",o=["listNewest","listConversations","listGroup","listOwnGroup","getById","getByIdUnlimited","create","hide","listMembers","addMembers","addChildGroupMembers","removeMembers","updateTitle","updateIcon","updateTag","updateExtension","updateExtByKeys","updateMemberExtension","quit","quitSilent","updateNotificationOff","hides","updateInfo","setTop","updateStatus","getByIds","quits","disband","listRoles","listGroupByTags","getCode","verifyCode","hideAndClear","getCommonByIds","updateOwner","updateNotificationSound","updateAuthority","updateMemberLimit","updateSuperGroup","clear","clearUnreadPoint","getChildren"];t.exports=r},{}],71:[function(e,t,n){"use strict";function r(e){var t={};return o.forEach(function(n){t[n]=function(){var t,r=Array.prototype.slice.apply(arguments,[]);r.length>0?(t=r[r.length-1],"function"!=typeof t?t=function(){}:r.pop()):(r=[],t=function(){}),e.sendMsg("/r/"+i+"/"+n,{},r,!1,t)}}),t}var i="IDLMessage",o=["listMessages","listUnreadMembers","remove","getMessageById","updateMemberTag","updateMemberExtension","listMemberStatusByMessageId","removes","updateMemberTagAndExt","listTopUsers","updateExtension","recallMessage"];t.exports=r},{}],72:[function(e,t,n){"use strict";function r(e){var t={};return o.forEach(function(n){t[n]=function(){var t,r=Array.prototype.slice.apply(arguments,[]);r.length>0?(t=r[r.length-1],"function"!=typeof t?t=function(){}:r.pop()):(r=[],t=function(){}),e.sendMsg("/r/"+i+"/"+n,{},r,!1,t)}}),t}var i="IDLMessageStatus",o=["updateToRead"];t.exports=r},{}],73:[function(e,t,n){"use strict";function r(e){var t={};return o.forEach(function(n){t[n]=function(){var t,r=Array.prototype.slice.apply(arguments,[]);r.length>0?(t=r[r.length-1],"function"!=typeof t?t=function(){}:r.pop()):(r=[],t=function(){}),e.sendMsg("/r/"+i+"/"+n,{},r,!1,t)}}),t}var i="IDLSend",o=["send","forward"];t.exports=r},{}],74:[function(e,t,n){"use strict";function r(e){var t={};return o.forEach(function(n){t[n]=function(){var t,r=Array.prototype.slice.apply(arguments,[]);r.length>0?(t=r[r.length-1],"function"!=typeof t?t=function(){}:r.pop()):(r=[],t=function(){}),e.sendMsg("/r/"+i+"/"+n,{},r,!1,t)}}),t}var i="Notification",o=["bindAnd","bindiOS","unbind","setBadge"];t.exports=r},{}],75:[function(e,t,n){"use strict";function r(e){var t={};return o.forEach(function(n){t[n]=function(){var t,r=Array.prototype.slice.apply(arguments,[]);r.length>0?(t=r[r.length-1],"function"!=typeof t?t=function(){}:r.pop()):(r=[],t=function(){}),e.sendMsg("/r/"+i+"/"+n,{},r,!1,t)}}),t}var i="OAuthI",o=["login","loginWithToken","refreshToken","sendLoginSms","loginBySms","kick","alogin"];t.exports=r},{}],76:[function(e,t,n){"use strict";function r(e){var t={};return o.forEach(function(n){t[n]=function(){var t,r=Array.prototype.slice.apply(arguments,[]);r.length>0?(t=r[r.length-1],"function"!=typeof t?t=function(){}:r.pop()):(r=[],t=function(){}),e.sendMsg("/r/"+i+"/"+n,{},r,!1,t)}}),t}var i="Sync",o=["getDiff","getState","ackDiff"];t.exports=r},{}],77:[function(e,t,n){"use strict";function r(e){var t={};return o.forEach(function(n){t[n]=function(){var t,r=Array.prototype.slice.apply(arguments,[]);r.length>0?(t=r[r.length-1],"function"!=typeof t?t=function(){}:r.pop()):(r=[],t=function(){}),e.sendMsg("/r/"+i+"/"+n,{},r,!1,t)}}),t}var i="Typing",o=["send"];t.exports=r},{}],78:[function(e,t,n){"use strict";function r(e){var t={};return o.forEach(function(n){t[n]=function(){var t,r=Array.prototype.slice.apply(arguments,[]);r.length>0?(t=r[r.length-1],"function"!=typeof t?t=function(){}:r.pop()):(r=[],t=function(){}),e.sendMsg("/r/"+i+"/"+n,{},r,!1,t)}}),t}var i="UserI",o=["getUserProfileByOpenId","getUserProfileByMobile","getUserProfilesByOpenIds","getUserProfilesByMobiles","updateUserProfile"];t.exports=r},{}],79:[function(e,t,n){"use strict";var r=e("./keyPaddingGen");t.exports=function(t){var n={};return n["interface"]={},n.model={},n["interface"].ColdBootI=e("./dist/ColdBootI")(t),n["interface"].IDLConversation=e("./dist/IDLConversation")(t),n["interface"].IDLMessage=e("./dist/IDLMessage")(t),n["interface"].IDLMessageStatus=e("./dist/IDLMessageStatus")(t),n["interface"].IDLSend=e("./dist/IDLSend")(t),n["interface"].Sync=e("./dist/Sync")(t),n["interface"].UserI=e("./dist/UserI")(t),n["interface"].Typing=e("./dist/Typing")(t),n["interface"].Notification=e("./dist/Notification")(t),n["interface"].OAuthI=e("./dist/OAuthI")(t),n["interface"].DAuthI=e("./dist/DAuthI")(t),n["interface"].AliasI=e("./dist/AliasI")(t),n["interface"].FollowI=e("./dist/FollowI")(t),n["interface"].BlacklistI=e("./dist/BlacklistI")(t),n.model.coldBoot=r({ColdBootTokenModel:{def:{domain:["1","string","domain","// * 域名称"],appKey:["2","string","appKey","// * 应用key"],openId:["3","string","openId","// * 用户ID"],signature:["4","string","signature","// * 签名"],timestamp:["5","int","timestamp","// * 时间戳"],nonce:["6","string","nonce","// * 随机数"]}}}),n.model.sync=r({SyncInfoModel:{def:{pts:["1","int","pts","// * 低优先级数据同步点"],seq:["2","int","seq","// * 同步序列号"],timestamp:["3","int","timestamp","// * 同步时间戳"],highPts:["4","int","highPts","// * 高优先级数据同步点， 当前为IM业务"]},COMMENT:"// 同步三元组, 客户端reg的时候带上 seq和pts, timestamp"},SyncPushModel:{def:{syncPushPackage:["1","SyncPushPackageModel","syncPushPackage","// * push的数据"],syncExtraType:["2","SyncExtraTypeModel","syncExtraType","// * tooLong tooLong2"]},COMMENT:"//服务端下行接口, push topic:  /s/sync  推下行数据包"},SyncPushPackageModel:{def:{startSeq:["1","int","startSeq","// * 起始seq"],endSeq:["2","int","endSeq","// * 结束seq"],timestamp:["3","int","timestamp","// * 上一次同步时间点"],maxPts:["4","int","maxPts","// * 该数据包中包含的最大低优先级pts"],hasMore:["5","boolean","hasMore","// * hasMore=true表示还有数据，客户端后续需要继续拉取数据"],data:["6",["Array","SyncDataModel"],"data"],maxHighPts:["7","int","maxHighPts","// * 该数据包中包含的最大高优先级pts"]},COMMENT:"//服务端下行接口, push topic:  /s/sync  推下行数据包"},SyncDataModel:{def:{objectType:["1","int","objectType","// * 数据包model类型，用于解码"],data:["2","byte[]","data","// * 同步数据"]},COMMENT:"//服务端下行接口, push topic:  /s/sync  推下行数据包"},SyncExtraTypeModel:{def:{type:["1","int","type","// * type=1 TooLong、 type=2 TooLong2"]},COMMENT:"//服务端下行接口, push topic:  /s/sync  推下行数据包"}}),n.model.im=r({SendMessageModel:{def:{uuid:["1","string","uuid","// * 客户端生成的id，绑定一个独立会话"],conversationId:["2","string","conversationId","// * 会话id"],type:["3","int","type","// * 默认为1-普通消息, 2-阅后即焚（暂时不启用）, 3-静默消息（该类消息不修改会话lastModify）"],creatorType:["4","int","creatorType","// * 消息创建者类型 1-SELF：表示用户自身产生消息 2-SYSTEM：表示系统自动生成消息 固定1"],content:["5","ContentModel","content","// * 附件(文本、图片，语音，文件或者组合类型等)"],tag:["6","int","tag","// * 业务自定义"],extension:["7",["Object","string","string"],"extension","// * msg扩展信息，业务自定义"],nickName:["8","string","nickName","// * 用户昵称"],receivers:["9",["Array","int"],"receivers","// * 接收者openId列表"],xpnModel:["10","XpnPushModel","xpnModel","// 服务端model。客户端请忽略"]},COMMENT:"// 消息发送对象"},ForwardMessageModel:{def:{uuid:["1","string","uuid","// * 客户端生成的id，绑定一个独立会话"],messageId:["2","int","messageId","// * 转发的消息id"],toConversationId:["3","string","toConversationId","// * 转发的目标会话id"],nickName:["4","string","nickName","// * 用户昵称"],xpnModel:["5","XpnPushModel","xpnModel","// * xpn推送控制模型"]},COMMENT:"// 消息转发对象"},BaseMessageModel:{def:{messageId:["1","int","messageId","// * 消息id"],conversationId:["2","string","conversationId","// * 会话id"],openIdEx:["3","OpenIdExModel","openIdEx","// * openId和tag"],type:["4","int","type","// * 默认为1-普通消息, 2-阅后即焚"],creatorType:["5","int","creatorType","// * 消息创建者类型 1-SELF：表示用户自身产生消息 2-SYSTEM：表示系统自动生成消息"],createdAt:["6","int","createdAt","// * 消息的创建时间，单位：毫秒"],content:["7","ContentModel","content","// * 附件(文本、图片，语音等)"],tag:["8","int","tag","// * 业务自定义"],extension:["9",["Object","string","string"],"extension","// * msg扩展信息，业务自定义"],memberTag:["10","int","memberTag","// * 业务扩展，只影响当前用户的属性"],memberExtension:["11",["Object","string","string"],"memberExtension","// * msgInbox扩展信息，业务自定义，只影响当前用户的属性"],recallStatus:["12","int","recallStatus","// * 是否为撤回消息"]},COMMENT:"// 基础的消息对象， 对应下行push topic：/s/msg"},MessageModel:{def:{baseMessage:["1","BaseMessageModel","baseMessage","// * 基础消息对象"],receiverMessageStatus:["2","ReceiverMessageStatusModel","receiverMessageStatus","// * 针对接收者的消息状态，已读和未读"],senderMessageStatus:["3","SenderMessageStatusModel","senderMessageStatus","// * 针对发送者的消息状态，未读人数和总人数"]},COMMENT:"// 带状态的消息对象, 对应同步协议type=1000"},ReceiverMessageStatusModel:{def:{readStatus:["1","int","readStatus","// * 接收者 是否已读这个消息 2-已读，其他-未读"]},COMMENT:"// 针对接收者的消息状态"},SenderMessageStatusModel:{def:{unReadCount:["1","int","unReadCount","// * 这条消息还有多少人未读"],totalCount:["2","int","totalCount","// * 消息发送到的总人数"]},COMMENT:"// 针对发送者的消息状态"},ContentModel:{def:{contentType:["1","int","contentType","// 其余组合类型使用attachments字段，contentType限制使用100以上"],textContent:["2","TextContentModel","textContent","// * 文本对象"],photoContent:["3","PhotoContentModel","photoContent","// * 图片对象"],audioContent:["4","AudioContentModel","audioContent","// * 语音对象"],fileContent:["5","FileContentModel","fileContent","// * 普通文件对象"],extension:["6",["Object","string","string"],"extension","// * @Deprecated"],attachments:["7",["Array","AttachmentModel"],"attachments","// * 组合类型字段"],atOpenIds:["8",["Object","string","string"],"atOpenIds","// * @功能的openId列表，key是openId（服务端不支持long类型），value是nick,"]},COMMENT:"// 发送的消息内容"},TextContentModel:{def:{text:["1","string","text","// * 文本内容"],templateId:["2","string","templateId","// * 系统消息模板ID"],templateData:["3",["Array","string"],"templateData","// * 系统消息模板数据列表"]},COMMENT:"// 文本消息"},PhotoContentModel:{def:{mediaId:["1","string","mediaId","// * mediaId"],picSize:["2","int","picSize","// * 原始图片大小"],type:["3","int","type","// * 图片类型，自定义"],picBytes:["4","byte[]","picBytes","// * 缩略图数据，需要控制数据大小, 只是下行使用"],fileType:["5","int","fileType","// * 图片类型 1-webp, 2-png, 3-jpg, 4-gif, 目前只有webp，只是下行使用"],orientation:["6","int","orientation","// * 图片方向，1-normal, 2-flip_horizontal, 3-rotate_180, 4-flip_vertical, 5-transpose, 6-rotate_90, 7-transverse, 8-rotate_270"]},COMMENT:"// 文本消息"},AudioContentModel:{def:{mediaId:["1","string","mediaId","// * mediaId"],duration:["2","int","duration","// * 语音时常"],audioVolumns:["3",["Array","int"],"audioVolumns","// * 语音波形"],audioBytes:["4","byte[]","audioBytes","// * 语音数据，需要控制数据大小, 只是下行使用"]},COMMENT:"// 文本消息"},FileContentModel:{def:{mediaId:["1","string","mediaId","// * mediaId"],fileName:["2","string","fileName","// * 文件名"],fileType:["3","string","fileType","// * 文件类型，取文件后缀"],fileSize:["4","int","fileSize","// * 文件大小"]},COMMENT:"// 文本消息"},OpenIdExModel:{def:{openId:["1","int","openId","// * 信息发送者id"],tag:["2","int","tag","// * 信息发送者的更新相关"]},COMMENT:"// openID扩展对象"},MemberRoleModel:{def:{openIdEx:["1","OpenIdExModel","openIdEx"],role:["2","int","role","// *1 群主，2管理员(现不用)，3普通用户"]},COMMENT:"// openID扩展对象"},UnReadMemberModel:{def:{openIdEx:["1","OpenIdExModel","openIdEx","// * openId和tag"],status:["2","int","status","// 0-未送达，1-已送达，未读，2-已送达，已读"]},COMMENT:"// 未读成员对象"},MemberMessageStatusModel:{def:{openIdEx:["1","OpenIdExModel","openIdEx","// * openId和tag"],status:["2","int","status","// 消息是否已读状态，2-已读，其他 未读"],reachStatus:["3","int","reachStatus","// 消息是否已送达，0和1、未达，2、已达"]},COMMENT:"//成员消息对象--暂时与 UnReadMemberModel有重复"},SendResultModel:{def:{messageId:["1","int","messageId","// * 消息id"],createdAt:["2","int","createdAt","// * 消息创建时间，服务端时间"],model:["3","SenderMessageStatusModel","model","// 未读人数"]},COMMENT:"// 消息发送结果对象（包括转发）"},CreateConversationModel:{def:{openIds:["1",["Array","int"],"openIds","// * 会话成员列表"],title:["2","string","title","// * 会话的标题"],icon:["3","string","icon","// * 会话显示的图片地址信息"],extension:["4",["Object","string","string"],"extension","// * 扩展字段"],tag:["5","int","tag","// * 业务tag"],type:["6","int","type","// * 会话类型：1单聊，2群聊"],memberLimit:["7","int","memberLimit","// * 会话支持的最大人数"],superGroup:["8","int","superGroup","// * 是否开启已读未读功能 0非大群，1大群，其他数字可做大群等级扩展使用"],parentId:["9","string","parentId","// * 父会话id，默认空。"],nodeType:["10","int","nodeType","// * 是否 父会话，0-否，默认；1-是父会话，只作为入口使用"]},COMMENT:"// 创建会话对象"},CommonConversationModel:{def:{conversationId:["1","string","conversationId","// * 会话ID"],type:["2","int","type","// * 会话类型：1单聊，2群聊"],memberCount:["3","int","memberCount","// * 群聊人数"],title:["4","string","title","// * 会话的标题"],icon:["5","string","icon","// * 会话显示的图片地址信息"],tag:["6","int","tag","// * 业务tag"],extension:["7",["Object","string","string"],"extension","// 扩展字段"],authority:["8","int","authority","// * 群加人权限，0-默认，群成员都可以加人，1-只有群主可以加人"],ownerId:["9","int","ownerId","// * 群主openId"]},COMMENT:"// 会话公共属性对象，不包含用户私有的属性"},BaseConversationModel:{def:{conversationId:["1","string","conversationId","// * 会话ID"],type:["2","int","type","// * 会话类型：1单聊，2群聊"],memberCount:["3","int","memberCount","// * 群聊人数"],title:["4","string","title","// * 会话的标题"],icon:["5","string","icon","// * 会话显示的图片地址信息"],extension:["6",["Object","string","string"],"extension","// 扩展字段"],createAt:["7","int","createAt","// 创建时间"],memberExtension:["8",["Object","string","string"],"memberExtension","// * 扩展字段"],notificationOff:["9","int","notificationOff","// * 会话是否接受通知消息 0-接收通知，1-表示关闭通知，不接收消息"],tag:["10","int","tag","// * 业务tag"],sort:["11","int","sort","// * 会话排序字段sort，数值越大排序越靠前，针对设置的用户有效"],status:["12","int","status","// * 0-隐藏，1-可见"],notificationSound:["13","string","notificationSound","// * 通知提醒音，notificationOff为0时有效"],authority:["14","int","authority","// * 群加人权限，0-默认，群成员都可以加人，1-只有群主可以加人"],ownerId:["15","int","ownerId","// * 群主openId"],memberLimit:["16","int","memberLimit","// * 会话支持的最大人数"],superGroup:["17","int","superGroup","// * 0非大群，1大群，其他数字可做大群等级扩展使用"],unreadPoint:["18","int","unreadPoint","// * 红点数量标识"],parentId:["19","string","parentId",'// * 父会话id，默认"0"'],nodeType:["20","int","nodeType","// * 是否 父会话，0-否，默认；1-是父会话，只作为入口使用"]},COMMENT:"// 基础会话对象"},ConversationModel:{def:{baseConversation:["1","BaseConversationModel","baseConversation","// * 基础会话对象"],lastMessages:["2",["Array","MessageModel"],"lastMessages","// * 最后N条消息"]},COMMENT:"// 基础会话对象"},ReconnectMessageModel:{def:{messageList:["1",["Array","MessageModel"],"messageList","// 消息列表"],readList:["2",["Array","DeliveryMessageStatusModel"],"readList","// 消息状态，针对消息发送者"],
conversationList:["3",["Array","ConversationNotificationModel"],"conversationList","// 会话变更列表"],messageTagList:["4",["Array","MessageTagNoticeModel"],"messageTagList","// 消息tag变更列表"],readStatusList:["5",["Array","MessageReadStatusListModel"],"readStatusList","// * @Deprecated"],conversationPrivateList:["6",["Array","ConversationPrivateModel"],"conversationPrivateList","// 会话排序"],msgNoticeList:["8",["Array","MessageNoticeModel"],"msgNoticeList","// 消息变更通知"]},COMMENT:"// 客户端断线重连的推送消息，对应下行push topic：/s/reconn"},DeliveryMessageStatusModel:{def:{conversationId:["1","string","conversationId","// * 会话id"],messageId:["2","int","messageId","// * 消息id"],status:["3","SenderMessageStatusModel","status","// * 未读人数"],uuid:["4","string","uuid","// * 发送消息的uuid"]},COMMENT:"// 推送消息状态对象，对应下行push topic：/s/status"},ConversationNotificationModel:{def:{conversationId:["1","string","conversationId","// * 会话id"],memberCount:["2","int","memberCount","// * 群成员数"],title:["3","string","title","// * 群标题"],icon:["4","string","icon","// * 群icon"],isKicked:["5","boolean","isKicked","// * true 表示被踢"],tag:["6","int","tag","// * 业务tag"],extension:["7",["Object","string","string"],"extension","// * 扩展字段"],isQuit:["8","boolean","isQuit","// * true 主动退群"],isDisband:["9","boolean","isDisband","// * 是否解散群"],authority:["10","int","authority","// * 群加人权限，0-默认，群成员都可以加人，1-只有群主可以加人"],memberLimit:["11","int","memberLimit","// * 会话支持的最大人数"],superGroup:["12","int","superGroup","// * 是否开启已读未读功能 0非大群，1大群，其他数字可做大群等级扩展使用"]},COMMENT:"// 群聊成员、title和icon 变更推送，该消息只有推送通道，对应下行push topic：/s/convex"},MessageTagNoticeModel:{def:{conversationId:["1","string","conversationId","// * 会话id"],messageId:["2","int","messageId","// * 消息id"],memberTag:["3","int","memberTag","// * 业务tag"],memberExtension:["4",["Object","string","string"],"memberExtension","// * 每个人自己的extension"]},COMMENT:"// 业务推送的privateTag or privateExtension变更对象，对应下行push topic：/s/msgTag"},MessageNoticeModel:{def:{conversationId:["1","string","conversationId","// * 会话id"],messageId:["2","int","messageId","// * 消息id"],extension:["3",["Object","string","string"],"extension","// * extension"],recallStatus:["4","int","recallStatus","// * 是否为撤回消息"]},COMMENT:"// 业务推送的 extension变更对象, 对应下行push topic：/s/msgInfo, 对应同步协议type=1001"},MessageDeleteModel:{def:{conversationId:["1","string","conversationId","// * 会话id"],messageId:["2","int","messageId","// * 消息id"]},COMMENT:"// 消息删除Model, 对应同步协议type=1002"},AttachmentModel:{def:{type:["1","int","type","// * 类型"],url:["2","string","url","// * 链接"],size:["3","int","size","// * 大小（文件大小, byte）"],data:["4","byte[]","data","// * 字节数据"],isPreload:["5","boolean","isPreload","// * 是否预加载url"],extension:["6",["Object","string","string"],"extension","// * 扩展字段"]},COMMENT:"// 附件，contentType > 100 解析该字段"},DeliveryMessageReadStatusModel:{def:{conversationId:["1","string","conversationId","// * 会话id"],messageId:["2","int","messageId","// * 消息id"],status:["3","ReceiverMessageStatusModel","status","// * 针对接收者的消息状态，已读和未读"]},COMMENT:"// 消息已读状态对象，针对消息接受者，是为了同步web和客户端的read状态"},MessageReadStatusListModel:{def:{readStatusList:["1",["Array","DeliveryMessageReadStatusModel"],"readStatusList","// * 消息接受者的消息已读状态列表"]},COMMENT:"// 对应下行push topic：/s/readstatus"},XpnPushModel:{def:{sound:["1","string","sound","// * xpn声音字段"],action:["2","XpnActionModel","action","// * xpn统一跳转"],timeTolive:["3","int","timeTolive","// * xpn消息有效周期（ms）"],incrbadge:["4","int","incrbadge","// * xpn提示消息增量"],params:["5",["Object","string","string"],"params","// * xpn自定义参数"],alertContent:["6","string","alertContent","// * xpn推送消息内容"],isXpnOff:["7","int","isXpnOff","// * 是否关闭xpn"],templateId:["8","int","templateId","// * 模板ID"]},COMMENT:"// 服务端model。客户端请忽略"},XpnActionModel:{def:{templateKey:["1","string","templateKey","// * Action指定模板主键"],templateValue:["2","string","templateValue","// * Action指定模板替换值"]},COMMENT:"// 服务端model。客户端请忽略"},ConversationInfoModel:{def:{conversationId:["1","string","conversationId","// * 会话id"],tag:["2","int","tag","// * 业务tag"],extension:["3",["Object","string","string"],"extension","// * 扩展字段"]},COMMENT:"// 会话信息更新model"},ConversationPrivateModel:{def:{conversationId:["1","string","conversationId","// * 会话id"],sort:["2","int","sort","// * 会话排序字段sort，数值越大排序越靠前，针对设置的用户有效"],hide:["3","boolean","hide","// * 会话隐藏"],notificationOff:["4","int","notificationOff","// * 会话是否接受通知消息 0-接收通知，1-表示关闭通知，不接收消息"]},COMMENT:"// 会话排序model，对应下行push topic: /s/conp"}}),n.model.auth=r({OAuthModel:{def:{accessToken:["1","string","accessToken"],refreshToken:["2","string","refreshToken"],expertIn:["3","int","expertIn"],cmd:["4","string","cmd"],openId:["5","int","openId"]}},LoginModel:{def:{org:["1","string","org"],domain:["2","string","domain"],appKey:["3","string","appKey"],appSecret:["4","string","appSecret"],openId:["5","int","openId"],openSecret:["6","string","openSecret"],deviceId:["7","string","deviceId"],withRegister:["8","boolean","withRegister"]}},RefreshTokenModel:{def:{refreshToken:["1","string","refreshToken"],appKey:["2","string","appKey"],deviceId:["3","string","deviceId"]}},TokenLoginModel:{def:{domain:["1","string","domain"],appKey:["2","string","appKey"],deviceId:["3","string","deviceId"],secretToken:["4","string","secretToken"]}},SmsRequestModel:{def:{org:["1","string","org"],domain:["2","string","domain"],appKey:["3","string","appKey"],appSecret:["4","string","appSecret"],mobile:["5","string","mobile"],code:["6","string","code"],deviceId:["7","string","deviceId"]}},AdvancedLoginModel:{def:{domain:["1","string","domain"],appKey:["2","string","appKey"],openId:["3","int","openId"],nonce:["4","string","nonce"],timestamp:["5","int","timestamp","// 随机数"],signature:["6","string","signature"],deviceId:["7","string","deviceId","//签名，规则  SHA1(appToken,appSecret,openId,timestamp,nonce)"]}}}),n.model.oauth=r({DAuthModel:{def:{accessToken:["1","string","accessToken"],refreshToken:["2","string","refreshToken"],expireIn:["3","int","expireIn"],deviceId:["4","string","deviceId"]}},DeviceLoginModel:{def:{domain:["1","string","domain"],appKey:["2","string","appKey"],nonce:["3","string","nonce"],timestamp:["4","int","timestamp"],signature:["5","string","signature"],deviceId:["6","string","deviceId"],accessTokenPeriod:["7","int","accessTokenPeriod","/**自定义的accessToken有效期，单位毫秒。auth系统默认是1天。\n     *目前最长不得超过15天，最短不得低于1天.可以为null,则认为是1天\n     **/"]}}}),n.model.user=r({ProfileModel:{def:{openId:["1","int","openId"],nick:["2","string","nick"],nickPinyin:["3","string","nickPinyin"],gender:["4","int","gender"],avatar:["5","string","avatar"],remark:["6","string","remark"],dob:["7","int","dob"],city:["8","string","city"],stateCode:["9","string","stateCode"],mobile:["10","string","mobile"],isActive:["11","boolean","isActive"],ver:["12","int","ver"],extension:["13","string","extension"]}},AliasModel:{def:{openId:["1","int","openId"],alias:["2","string","alias"],pinyin:["3","string","pinyin","//别名内容"],audio:["4","string","audio","//备注名拼音"],extension:["5",["Object","string","string"],"extension","// 备注音"]}}}),n.model.relation=r({FollowModel:{def:{openId:["1","int","openId"],status:["2","int","status","// 对应的openid信息"],tag:["3","int","tag","// 对应的状态信息,0:following，1：follower，2：双向关系， -1：要推下去。"],lastModify:["4","int","lastModify","//由使用法自定义的筛选标记"]}},FollowPageModel:{def:{models:["1",["Array","FollowModel"],"models","//最后更新的时间戳"],nextCursor:["2","int","nextCursor","//返回的openid结果列表"],previousCursor:["3","int","previousCursor","// 下一页的起始cursor"]}},BlacklistModel:{def:{openId:["1","int","openId","// 4: long totalCount;           //这期暂不加入"],status:["2","int","status","// 对应的openid信息"],lastModify:["3","int","lastModify","// 对应的状态信息,0:openid在我的黑名单中，1：我在openid的黑名单中，2：双方互加为黑名单关系， -1：黑名单关系删除。"]}},BlacklistPageModel:{def:{models:["1",["Array","BlacklistModel"],"models","//最后更新的时间戳"],nextCursor:["2","int","nextCursor","// 返回的openid结果列表"],previousCursor:["3","int","previousCursor","// 下一页的起始cursor"]}}}),n.model.typing=r({TypingModel:{def:{conversationId:["1","string","conversationId"],type:["2","int","type","// 消息类型，0-文字，1-语音，2-图片"],command:["3","int","command","// typing状态，0-正在typing，1-取消typing"]}},DeliveryTypingModel:{def:{typingModels:["1",["Array","TypingModel"],"typingModels"]},COMMENT:"// 下行Typing model, 对应push topic: /s/typing"}}),n.model.push=r({NoticeModel:{def:{type:["1","int","type","// * 业务定义的事件类型"],content:["2","byte[]","content","// * 事件内容"]},COMMENT:"// 业务推送的事件对象"},NoticeListModel:{def:{noticeModels:["1",["Array","NoticeModel"],"noticeModels","// * 列表"]},COMMENT:"// 业务推送的事件列表对象"},PayloadModel:{def:{type:["1","int","type","// * 消息自定义类型"],content:["2","byte[]","content","// * 消息内容"],pushMessageId:["3","string","pushMessageId","// * 消息ID"]},COMMENT:"// 下行推送消息model"}}),n}},{"./dist/AliasI":65,"./dist/BlacklistI":66,"./dist/ColdBootI":67,"./dist/DAuthI":68,"./dist/FollowI":69,"./dist/IDLConversation":70,"./dist/IDLMessage":71,"./dist/IDLMessageStatus":72,"./dist/IDLSend":73,"./dist/Notification":74,"./dist/OAuthI":75,"./dist/Sync":76,"./dist/Typing":77,"./dist/UserI":78,"./keyPaddingGen":80}],80:[function(e,t,n){"use strict";var r=function(e){this.keys=this._processDef(e),this.paddings={};var t=this;Object.keys(e).forEach(function(e){t.paddings[e]=function(n){return t._padding(e,n)}})};r.prototype._padding=function(e,t){var n={},r=this;if(t&&this.keys[e]){var i=this.keys[e].keys;Object.keys(t).forEach(function(e){var o=parseInt(e);if(i[o]){var s=i[o].name,a=i[o].type;if("string"==typeof a&&r.keys[a])var u=r._padding(a,t[e]);else if(Array.isArray(a))if("Array"===a[0]&&r.keys[a[1]])var u=t[e].map(function(e){return r._padding(a[1],e)});else var u=t[e];else var u=t[e];n[s]=u}})}return n},r.prototype._processDef=function(e){var t={};return Object.keys(e).forEach(function(n){var r={};Object.keys(e[n].def).forEach(function(t){var i=e[n].def[t];r[parseInt(i[0])]={type:i[1],name:t}}),t[n]={keys:r}}),t};var i=function(e){return new r(e)};t.exports=i},{}],81:[function(e,t,n){t.exports=function(){var t=e("events"),n={};return n.createDomain=n.create=function(){function e(e){n.emit("error",e)}var n=new t.EventEmitter;return n.add=function(t){t.on("error",e)},n.remove=function(t){t.removeListener("error",e)},n.bind=function(t){return function(){var n=Array.prototype.slice.call(arguments);try{t.apply(null,n)}catch(r){e(r)}}},n.intercept=function(t){return function(n){if(n)e(n);else{var r=Array.prototype.slice.call(arguments,1);try{t.apply(null,r)}catch(n){e(n)}}}},n.run=function(t){try{t()}catch(n){e(n)}return this},n.dispose=function(){return this.removeAllListeners(),this},n.enter=n.exit=function(){return this},n},n}.call(this)},{events:82}],82:[function(e,t,n){function r(){this._events=this._events||{},this._maxListeners=this._maxListeners||void 0}function i(e){return"function"==typeof e}function o(e){return"number"==typeof e}function s(e){return"object"==typeof e&&null!==e}function a(e){return void 0===e}t.exports=r,r.EventEmitter=r,r.prototype._events=void 0,r.prototype._maxListeners=void 0,r.defaultMaxListeners=10,r.prototype.setMaxListeners=function(e){if(!o(e)||0>e||isNaN(e))throw TypeError("n must be a positive number");return this._maxListeners=e,this},r.prototype.emit=function(e){var t,n,r,o,u,c;if(this._events||(this._events={}),"error"===e&&(!this._events.error||s(this._events.error)&&!this._events.error.length)){if(t=arguments[1],t instanceof Error)throw t;throw TypeError('Uncaught, unspecified "error" event.')}if(n=this._events[e],a(n))return!1;if(i(n))switch(arguments.length){case 1:n.call(this);break;case 2:n.call(this,arguments[1]);break;case 3:n.call(this,arguments[1],arguments[2]);break;default:for(r=arguments.length,o=new Array(r-1),u=1;r>u;u++)o[u-1]=arguments[u];n.apply(this,o)}else if(s(n)){for(r=arguments.length,o=new Array(r-1),u=1;r>u;u++)o[u-1]=arguments[u];for(c=n.slice(),r=c.length,u=0;r>u;u++)c[u].apply(this,o)}return!0},r.prototype.addListener=function(e,t){var n;if(!i(t))throw TypeError("listener must be a function");if(this._events||(this._events={}),this._events.newListener&&this.emit("newListener",e,i(t.listener)?t.listener:t),this._events[e]?s(this._events[e])?this._events[e].push(t):this._events[e]=[this._events[e],t]:this._events[e]=t,s(this._events[e])&&!this._events[e].warned){var n;n=a(this._maxListeners)?r.defaultMaxListeners:this._maxListeners,n&&n>0&&this._events[e].length>n&&(this._events[e].warned=!0,console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",this._events[e].length),"function"==typeof console.trace&&console.trace())}return this},r.prototype.on=r.prototype.addListener,r.prototype.once=function(e,t){function n(){this.removeListener(e,n),r||(r=!0,t.apply(this,arguments))}if(!i(t))throw TypeError("listener must be a function");var r=!1;return n.listener=t,this.on(e,n),this},r.prototype.removeListener=function(e,t){var n,r,o,a;if(!i(t))throw TypeError("listener must be a function");if(!this._events||!this._events[e])return this;if(n=this._events[e],o=n.length,r=-1,n===t||i(n.listener)&&n.listener===t)delete this._events[e],this._events.removeListener&&this.emit("removeListener",e,t);else if(s(n)){for(a=o;a-->0;)if(n[a]===t||n[a].listener&&n[a].listener===t){r=a;break}if(0>r)return this;1===n.length?(n.length=0,delete this._events[e]):n.splice(r,1),this._events.removeListener&&this.emit("removeListener",e,t)}return this},r.prototype.removeAllListeners=function(e){var t,n;if(!this._events)return this;if(!this._events.removeListener)return 0===arguments.length?this._events={}:this._events[e]&&delete this._events[e],this;if(0===arguments.length){for(t in this._events)"removeListener"!==t&&this.removeAllListeners(t);return this.removeAllListeners("removeListener"),this._events={},this}if(n=this._events[e],i(n))this.removeListener(e,n);else for(;n.length;)this.removeListener(e,n[n.length-1]);return delete this._events[e],this},r.prototype.listeners=function(e){var t;return t=this._events&&this._events[e]?i(this._events[e])?[this._events[e]]:this._events[e].slice():[]},r.listenerCount=function(e,t){var n;return n=e._events&&e._events[t]?i(e._events[t])?1:e._events[t].length:0}},{}],83:[function(e,t,n){(function(e){function t(e,t){for(var n=0,r=e.length-1;r>=0;r--){var i=e[r];"."===i?e.splice(r,1):".."===i?(e.splice(r,1),n++):n&&(e.splice(r,1),n--)}if(t)for(;n--;n)e.unshift("..");return e}function r(e,t){if(e.filter)return e.filter(t);for(var n=[],r=0;r<e.length;r++)t(e[r],r,e)&&n.push(e[r]);return n}var i=/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/,o=function(e){return i.exec(e).slice(1)};n.resolve=function(){for(var n="",i=!1,o=arguments.length-1;o>=-1&&!i;o--){var s=o>=0?arguments[o]:e.cwd();if("string"!=typeof s)throw new TypeError("Arguments to path.resolve must be strings");s&&(n=s+"/"+n,i="/"===s.charAt(0))}return n=t(r(n.split("/"),function(e){return!!e}),!i).join("/"),(i?"/":"")+n||"."},n.normalize=function(e){var i=n.isAbsolute(e),o="/"===s(e,-1);return e=t(r(e.split("/"),function(e){return!!e}),!i).join("/"),e||i||(e="."),e&&o&&(e+="/"),(i?"/":"")+e},n.isAbsolute=function(e){return"/"===e.charAt(0)},n.join=function(){var e=Array.prototype.slice.call(arguments,0);return n.normalize(r(e,function(e,t){if("string"!=typeof e)throw new TypeError("Arguments to path.join must be strings");return e}).join("/"))},n.relative=function(e,t){function r(e){for(var t=0;t<e.length&&""===e[t];t++);for(var n=e.length-1;n>=0&&""===e[n];n--);return t>n?[]:e.slice(t,n-t+1)}e=n.resolve(e).substr(1),t=n.resolve(t).substr(1);for(var i=r(e.split("/")),o=r(t.split("/")),s=Math.min(i.length,o.length),a=s,u=0;s>u;u++)if(i[u]!==o[u]){a=u;break}for(var c=[],u=a;u<i.length;u++)c.push("..");return c=c.concat(o.slice(a)),c.join("/")},n.sep="/",n.delimiter=":",n.dirname=function(e){var t=o(e),n=t[0],r=t[1];return n||r?(r&&(r=r.substr(0,r.length-1)),n+r):"."},n.basename=function(e,t){var n=o(e)[2];return t&&n.substr(-1*t.length)===t&&(n=n.substr(0,n.length-t.length)),n},n.extname=function(e){return o(e)[3]};var s="b"==="ab".substr(-1)?function(e,t,n){return e.substr(t,n)}:function(e,t,n){return 0>t&&(t=e.length+t),e.substr(t,n)}}).call(this,e("_process"))},{_process:84}],84:[function(e,t,n){function r(){l=!1,a.length?c=a.concat(c):f=-1,c.length&&i()}function i(){if(!l){var e=setTimeout(r);l=!0;for(var t=c.length;t;){for(a=c,c=[];++f<t;)a[f].run();f=-1,t=c.length}a=null,l=!1,clearTimeout(e)}}function o(e,t){this.fun=e,this.array=t}function s(){}var a,u=t.exports={},c=[],l=!1,f=-1;u.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];c.push(new o(e,t)),1!==c.length||l||setTimeout(i,0)},o.prototype.run=function(){this.fun.apply(null,this.array)},u.title="browser",u.browser=!0,u.env={},u.argv=[],u.version="",u.versions={},u.on=s,u.addListener=s,u.once=s,u.off=s,u.removeListener=s,u.removeAllListeners=s,u.emit=s,u.binding=function(e){throw new Error("process.binding is not supported")},u.cwd=function(){return"/"},u.chdir=function(e){throw new Error("process.chdir is not supported")},u.umask=function(){return 0}},{}],85:[function(t,n,r){!function(t){function r(e){return e&&(e=e.toString().replace(a.pluses,"%20"),e=decodeURIComponent(e)),e}function i(e){var t=a.uri_parser,n=["source","protocol","authority","userInfo","user","password","host","port","isColonUri","relative","path","directory","file","query","anchor"],r=t.exec(e||""),i={};return n.forEach(function(e,t){i[e]=r[t]||""}),i}function o(e){var t,n,i,o,s,u,c,l=[];if("undefined"==typeof e||null===e||""===e)return l;for(0===e.indexOf("?")&&(e=e.substring(1)),n=e.toString().split(a.query_separator),t=0,c=n.length;c>t;t++)i=n[t],o=i.indexOf("="),0!==o&&(s=r(i.substring(0,o)),u=r(i.substring(o+1)),l.push(-1===o?[i,null]:[s,u]));return l}function s(e){this.uriParts=i(e),this.queryPairs=o(this.uriParts.query),this.hasAuthorityPrefixUserPref=null}var a={starts_with_slashes:/^\/+/,ends_with_slashes:/\/+$/,pluses:/\+/g,query_separator:/[&;]/,uri_parser:/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@\/]*)(?::([^:@]*))?)?@)?(\[[0-9a-fA-F:.]+\]|[^:\/?#]*)(?::(\d+|(?=:)))?(:)?)((((?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/};Array.prototype.forEach||(Array.prototype.forEach=function(e,t){var n,r;if(null==this)throw new TypeError(" this is null or not defined");var i=Object(this),o=i.length>>>0;if("function"!=typeof e)throw new TypeError(e+" is not a function");for(arguments.length>1&&(n=t),r=0;o>r;){var s;r in i&&(s=i[r],e.call(n,s,r,i)),r++}}),["protocol","userInfo","host","port","path","anchor"].forEach(function(e){s.prototype[e]=function(t){return"undefined"!=typeof t&&(this.uriParts[e]=t),this.uriParts[e]}}),s.prototype.hasAuthorityPrefix=function(e){return"undefined"!=typeof e&&(this.hasAuthorityPrefixUserPref=e),null===this.hasAuthorityPrefixUserPref?-1!==this.uriParts.source.indexOf("//"):this.hasAuthorityPrefixUserPref},s.prototype.isColonUri=function(e){return"undefined"==typeof e?!!this.uriParts.isColonUri:void(this.uriParts.isColonUri=!!e)},s.prototype.query=function(e){var t,n,r,i="";for("undefined"!=typeof e&&(this.queryPairs=o(e)),t=0,r=this.queryPairs.length;r>t;t++)n=this.queryPairs[t],i.length>0&&(i+="&"),null===n[1]?i+=n[0]:(i+=n[0],i+="=","undefined"!=typeof n[1]&&(i+=encodeURIComponent(n[1])));return i.length>0?"?"+i:i},s.prototype.getQueryParamValue=function(e){var t,n,r;for(n=0,r=this.queryPairs.length;r>n;n++)if(t=this.queryPairs[n],e===t[0])return t[1]},s.prototype.getQueryParamValues=function(e){var t,n,r,i=[];for(t=0,r=this.queryPairs.length;r>t;t++)n=this.queryPairs[t],e===n[0]&&i.push(n[1]);return i},s.prototype.deleteQueryParam=function(e,t){var n,i,o,s,a,u=[];for(n=0,a=this.queryPairs.length;a>n;n++)i=this.queryPairs[n],o=r(i[0])===r(e),s=i[1]===t,(1!==arguments.length||o)&&(2!==arguments.length||o&&s)||u.push(i);return this.queryPairs=u,this},s.prototype.addQueryParam=function(e,t,n){return 3===arguments.length&&-1!==n?(n=Math.min(n,this.queryPairs.length),this.queryPairs.splice(n,0,[e,t])):arguments.length>0&&this.queryPairs.push([e,t]),this},s.prototype.hasQueryParam=function(e){var t,n=this.queryPairs.length;for(t=0;n>t;t++)if(this.queryPairs[t][0]==e)return!0;return!1},s.prototype.replaceQueryParam=function(e,t,n){var i,o,s=-1,a=this.queryPairs.length;if(3===arguments.length){for(i=0;a>i;i++)if(o=this.queryPairs[i],r(o[0])===r(e)&&decodeURIComponent(o[1])===r(n)){s=i;break}s>=0&&this.deleteQueryParam(e,r(n)).addQueryParam(e,t,s)}else{for(i=0;a>i;i++)if(o=this.queryPairs[i],r(o[0])===r(e)){s=i;break}this.deleteQueryParam(e),this.addQueryParam(e,t,s)}return this},["protocol","hasAuthorityPrefix","isColonUri","userInfo","host","port","path","query","anchor"].forEach(function(e){var t="set"+e.charAt(0).toUpperCase()+e.slice(1);s.prototype[t]=function(t){return this[e](t),this}}),s.prototype.scheme=function(){var e="";return this.protocol()?(e+=this.protocol(),this.protocol().indexOf(":")!==this.protocol().length-1&&(e+=":"),e+="//"):this.hasAuthorityPrefix()&&this.host()&&(e+="//"),e},s.prototype.origin=function(){var e=this.scheme();return this.userInfo()&&this.host()&&(e+=this.userInfo(),this.userInfo().indexOf("@")!==this.userInfo().length-1&&(e+="@")),this.host()&&(e+=this.host(),(this.port()||this.path()&&this.path().substr(0,1).match(/[0-9]/))&&(e+=":"+this.port())),e},s.prototype.addTrailingSlash=function(){var e=this.path()||"";return"/"!==e.substr(-1)&&this.path(e+"/"),this},s.prototype.toString=function(){var e,t=this.origin();return this.isColonUri()?this.path()&&(t+=":"+this.path()):this.path()?(e=this.path(),a.ends_with_slashes.test(t)||a.starts_with_slashes.test(e)?(t&&t.replace(a.ends_with_slashes,"/"),e=e.replace(a.starts_with_slashes,"/")):t+="/",t+=e):this.host()&&(this.query().toString()||this.anchor())&&(t+="/"),this.query().toString()&&(t+=this.query().toString()),this.anchor()&&(0!==this.anchor().indexOf("#")&&(t+="#"),t+=this.anchor()),t},s.prototype.clone=function(){return new s(this.toString())},"function"==typeof e&&e.amd?e(function(){return s}):"undefined"!=typeof n&&"undefined"!=typeof n.exports?n.exports=s:t.Uri=s}(this)},{}],86:[function(e,t,n){function r(e){var t=e?e.length:0;return t?e[t-1]:void 0}t.exports=r},{}],87:[function(e,t,n){function r(e,t,n,r){var u=e?e.length:0;return u?(null!=t&&"boolean"!=typeof t&&(r=n,n=s(e,t,r)?null:t,t=!1),n=null==n?n:i(n,r,3),t?a(e,n):o(e,n)):[]}var i=e("../internal/baseCallback"),o=e("../internal/baseUniq"),s=e("../internal/isIterateeCall"),a=e("../internal/sortedUniq");t.exports=r},{"../internal/baseCallback":93,"../internal/baseUniq":106,"../internal/isIterateeCall":121,"../internal/sortedUniq":127}],88:[function(e,t,n){function r(e,t){if("function"!=typeof e)throw new TypeError(i);return t=o(void 0===t?e.length-1:+t||0,0),function(){for(var n=arguments,r=-1,i=o(n.length-t,0),s=Array(i);++r<i;)s[r]=n[t+r];switch(t){case 0:return e.call(this,s);case 1:return e.call(this,n[0],s);case 2:return e.call(this,n[0],n[1],s)}var a=Array(t+1);for(r=-1;++r<t;)a[r]=n[r];return a[t]=s,e.apply(this,a)}}var i="Expected a function",o=Math.max;t.exports=r},{}],89:[function(e,t,n){(function(n){function r(e){var t=e?e.length:0;for(this.data={hash:a(null),set:new s};t--;)this.push(e[t])}var i=e("./cachePush"),o=e("./getNative"),s=o(n,"Set"),a=o(Object,"create");r.prototype.push=i,t.exports=r}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./cachePush":109,"./getNative":117}],90:[function(e,t,n){function r(e,t){for(var n=-1,r=e.length;++n<r;)if(t(e[n],n,e))return!0;return!1}t.exports=r},{}],91:[function(e,t,n){function r(e,t,n){for(var r=-1,o=i(t),s=o.length;++r<s;){var a=o[r],u=e[a],c=n(u,t[a],a,e,t);(c===c?c===u:u!==u)&&(void 0!==u||a in e)||(e[a]=c)}return e}var i=e("../object/keys");t.exports=r},{"../object/keys":137}],92:[function(e,t,n){function r(e,t){return null==t?e:i(t,o(t),e)}var i=e("./baseCopy"),o=e("../object/keys");t.exports=r},{"../object/keys":137,"./baseCopy":94}],93:[function(e,t,n){function r(e,t,n){var r=typeof e;return"function"==r?void 0===t?e:s(e,t,n):null==e?a:"object"==r?i(e):void 0===t?u(e):o(e,t)}var i=e("./baseMatches"),o=e("./baseMatchesProperty"),s=e("./bindCallback"),a=e("../utility/identity"),u=e("../utility/property");t.exports=r},{"../utility/identity":142,"../utility/property":143,"./baseMatches":100,"./baseMatchesProperty":101,"./bindCallback":107}],94:[function(e,t,n){function r(e,t,n){n||(n={});for(var r=-1,i=t.length;++r<i;){var o=t[r];n[o]=e[o]}return n}t.exports=r},{}],95:[function(e,t,n){function r(e,t,n){if(null!=e){void 0!==n&&n in i(e)&&(t=[n]);for(var r=0,o=t.length;null!=e&&o>r;)e=e[t[r++]];return r&&r==o?e:void 0}}var i=e("./toObject");t.exports=r},{"./toObject":128}],96:[function(e,t,n){function r(e,t,n){if(t!==t)return i(e,n);for(var r=n-1,o=e.length;++r<o;)if(e[r]===t)return r;return-1}var i=e("./indexOfNaN");t.exports=r},{"./indexOfNaN":118}],97:[function(e,t,n){function r(e,t,n,a,u,c){return e===t?!0:null==e||null==t||!o(e)&&!s(t)?e!==e&&t!==t:i(e,t,r,n,a,u,c)}var i=e("./baseIsEqualDeep"),o=e("../lang/isObject"),s=e("./isObjectLike");t.exports=r},{"../lang/isObject":133,"./baseIsEqualDeep":98,"./isObjectLike":124}],98:[function(e,t,n){function r(e,t,n,r,d,g,v){var m=a(e),y=a(t),b=l,E=l;m||(b=h.call(e),b==c?b=f:b!=f&&(m=u(e))),y||(E=h.call(t),E==c?E=f:E!=f&&(y=u(t)));var M=b==f,w=E==f,x=b==E;if(x&&!m&&!M)return o(e,t,b);if(!d){var C=M&&p.call(e,"__wrapped__"),I=w&&p.call(t,"__wrapped__");if(C||I)return n(C?e.value():e,I?t.value():t,r,d,g,v)}if(!x)return!1;g||(g=[]),v||(v=[]);for(var T=g.length;T--;)if(g[T]==e)return v[T]==t;g.push(e),v.push(t);var S=(m?i:s)(e,t,n,r,d,g,v);return g.pop(),v.pop(),S}var i=e("./equalArrays"),o=e("./equalByTag"),s=e("./equalObjects"),a=e("../lang/isArray"),u=e("../lang/isTypedArray"),c="[object Arguments]",l="[object Array]",f="[object Object]",d=Object.prototype,p=d.hasOwnProperty,h=d.toString;t.exports=r},{"../lang/isArray":131,"../lang/isTypedArray":134,"./equalArrays":112,"./equalByTag":113,"./equalObjects":114}],99:[function(e,t,n){function r(e,t,n){var r=t.length,s=r,a=!n;if(null==e)return!s;for(e=o(e);r--;){var u=t[r];if(a&&u[2]?u[1]!==e[u[0]]:!(u[0]in e))return!1}for(;++r<s;){u=t[r];var c=u[0],l=e[c],f=u[1];if(a&&u[2]){if(void 0===l&&!(c in e))return!1}else{var d=n?n(l,f,c):void 0;if(!(void 0===d?i(f,l,n,!0):d))return!1}}return!0}var i=e("./baseIsEqual"),o=e("./toObject");t.exports=r},{"./baseIsEqual":97,"./toObject":128}],100:[function(e,t,n){function r(e){var t=o(e);if(1==t.length&&t[0][2]){var n=t[0][0],r=t[0][1];return function(e){return null==e?!1:e[n]===r&&(void 0!==r||n in s(e))}}return function(e){return i(e,t)}}var i=e("./baseIsMatch"),o=e("./getMatchData"),s=e("./toObject");t.exports=r},{"./baseIsMatch":99,"./getMatchData":116,"./toObject":128}],101:[function(e,t,n){function r(e,t){var n=a(e),r=u(e)&&c(t),p=e+"";return e=d(e),function(a){if(null==a)return!1;var u=p;if(a=f(a),(n||!r)&&!(u in a)){if(a=1==e.length?a:i(a,s(e,0,-1)),null==a)return!1;u=l(e),a=f(a)}return a[u]===t?void 0!==t||u in a:o(t,a[u],void 0,!0)}}var i=e("./baseGet"),o=e("./baseIsEqual"),s=e("./baseSlice"),a=e("../lang/isArray"),u=e("./isKey"),c=e("./isStrictComparable"),l=e("../array/last"),f=e("./toObject"),d=e("./toPath");t.exports=r},{"../array/last":86,"../lang/isArray":131,"./baseGet":95,"./baseIsEqual":97,"./baseSlice":104,"./isKey":122,"./isStrictComparable":125,"./toObject":128,"./toPath":129}],102:[function(e,t,n){function r(e){return function(t){return null==t?void 0:t[e]}}t.exports=r},{}],103:[function(e,t,n){function r(e){var t=e+"";return e=o(e),function(n){return i(n,e,t)}}var i=e("./baseGet"),o=e("./toPath");t.exports=r},{"./baseGet":95,"./toPath":129}],104:[function(e,t,n){function r(e,t,n){var r=-1,i=e.length;t=null==t?0:+t||0,0>t&&(t=-t>i?0:i+t),n=void 0===n||n>i?i:+n||0,0>n&&(n+=i),i=t>n?0:n-t>>>0,t>>>=0;for(var o=Array(i);++r<i;)o[r]=e[r+t];return o}t.exports=r},{}],105:[function(e,t,n){function r(e){return"string"==typeof e?e:null==e?"":e+""}t.exports=r},{}],106:[function(e,t,n){function r(e,t){var n=-1,r=i,a=e.length,u=!0,c=u&&a>=200,l=c?s():null,f=[];l?(r=o,u=!1):(c=!1,l=t?[]:f);e:for(;++n<a;){var d=e[n],p=t?t(d,n,e):d;if(u&&d===d){for(var h=l.length;h--;)if(l[h]===p)continue e;t&&l.push(p),f.push(d)}else r(l,p,0)<0&&((t||c)&&l.push(p),f.push(d))}return f}var i=e("./baseIndexOf"),o=e("./cacheIndexOf"),s=e("./createCache");t.exports=r},{"./baseIndexOf":96,"./cacheIndexOf":108,"./createCache":111}],107:[function(e,t,n){function r(e,t,n){if("function"!=typeof e)return i;if(void 0===t)return e;switch(n){case 1:return function(n){return e.call(t,n)};case 3:return function(n,r,i){return e.call(t,n,r,i)};case 4:return function(n,r,i,o){return e.call(t,n,r,i,o)};case 5:return function(n,r,i,o,s){return e.call(t,n,r,i,o,s)}}return function(){return e.apply(t,arguments)}}var i=e("../utility/identity");t.exports=r},{"../utility/identity":142}],108:[function(e,t,n){function r(e,t){var n=e.data,r="string"==typeof t||i(t)?n.set.has(t):n.hash[t];return r?0:-1}var i=e("../lang/isObject");t.exports=r},{"../lang/isObject":133}],109:[function(e,t,n){function r(e){var t=this.data;"string"==typeof e||i(e)?t.set.add(e):t.hash[e]=!0}var i=e("../lang/isObject");t.exports=r},{"../lang/isObject":133}],110:[function(e,t,n){function r(e){return s(function(t,n){var r=-1,s=null==t?0:n.length,a=s>2?n[s-2]:void 0,u=s>2?n[2]:void 0,c=s>1?n[s-1]:void 0;for("function"==typeof a?(a=i(a,c,5),s-=2):(a="function"==typeof c?c:void 0,s-=a?1:0),u&&o(n[0],n[1],u)&&(a=3>s?void 0:a,s=1);++r<s;){var l=n[r];l&&e(t,l,a)}return t})}var i=e("./bindCallback"),o=e("./isIterateeCall"),s=e("../function/restParam");t.exports=r},{"../function/restParam":88,"./bindCallback":107,"./isIterateeCall":121}],111:[function(e,t,n){(function(n){var r=e("./SetCache"),i=e("../utility/constant"),o=e("./getNative"),s=o(n,"Set"),a=o(Object,"create"),u=a&&s?function(e){return new r(e)}:i(null);t.exports=u}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"../utility/constant":141,"./SetCache":89,"./getNative":117}],112:[function(e,t,n){function r(e,t,n,r,o,s,a){var u=-1,c=e.length,l=t.length;if(c!=l&&!(o&&l>c))return!1;for(;++u<c;){var f=e[u],d=t[u],p=r?r(o?d:f,o?f:d,u):void 0;if(void 0!==p){if(p)continue;return!1}if(o){if(!i(t,function(e){return f===e||n(f,e,r,o,s,a)}))return!1}else if(f!==d&&!n(f,d,r,o,s,a))return!1}return!0}var i=e("./arraySome");t.exports=r},{"./arraySome":90}],113:[function(e,t,n){function r(e,t,n){switch(n){case i:case o:return+e==+t;case s:return e.name==t.name&&e.message==t.message;case a:return e!=+e?t!=+t:e==+t;case u:case c:return e==t+""}return!1}var i="[object Boolean]",o="[object Date]",s="[object Error]",a="[object Number]",u="[object RegExp]",c="[object String]";t.exports=r},{}],114:[function(e,t,n){function r(e,t,n,r,o,a,u){var c=i(e),l=c.length,f=i(t),d=f.length;if(l!=d&&!o)return!1;for(var p=l;p--;){var h=c[p];if(!(o?h in t:s.call(t,h)))return!1}for(var g=o;++p<l;){h=c[p];var v=e[h],m=t[h],y=r?r(o?m:v,o?v:m,h):void 0;if(!(void 0===y?n(v,m,r,o,a,u):y))return!1;g||(g="constructor"==h)}if(!g){var b=e.constructor,E=t.constructor;if(b!=E&&"constructor"in e&&"constructor"in t&&!("function"==typeof b&&b instanceof b&&"function"==typeof E&&E instanceof E))return!1}return!0}var i=e("../object/keys"),o=Object.prototype,s=o.hasOwnProperty;t.exports=r},{"../object/keys":137}],115:[function(e,t,n){var r=e("./baseProperty"),i=r("length");t.exports=i},{"./baseProperty":102}],116:[function(e,t,n){function r(e){for(var t=o(e),n=t.length;n--;)t[n][2]=i(t[n][1]);return t}var i=e("./isStrictComparable"),o=e("../object/pairs");t.exports=r},{"../object/pairs":139,"./isStrictComparable":125}],117:[function(e,t,n){function r(e,t){var n=null==e?void 0:e[t];return i(n)?n:void 0}var i=e("../lang/isNative");t.exports=r},{"../lang/isNative":132}],118:[function(e,t,n){function r(e,t,n){for(var r=e.length,i=t+(n?0:-1);n?i--:++i<r;){
var o=e[i];if(o!==o)return i}return-1}t.exports=r},{}],119:[function(e,t,n){function r(e){return null!=e&&o(i(e))}var i=e("./getLength"),o=e("./isLength");t.exports=r},{"./getLength":115,"./isLength":123}],120:[function(e,t,n){function r(e,t){return e="number"==typeof e||i.test(e)?+e:-1,t=null==t?o:t,e>-1&&e%1==0&&t>e}var i=/^\d+$/,o=9007199254740991;t.exports=r},{}],121:[function(e,t,n){function r(e,t,n){if(!s(n))return!1;var r=typeof t;if("number"==r?i(n)&&o(t,n.length):"string"==r&&t in n){var a=n[t];return e===e?e===a:a!==a}return!1}var i=e("./isArrayLike"),o=e("./isIndex"),s=e("../lang/isObject");t.exports=r},{"../lang/isObject":133,"./isArrayLike":119,"./isIndex":120}],122:[function(e,t,n){function r(e,t){var n=typeof e;if("string"==n&&a.test(e)||"number"==n)return!0;if(i(e))return!1;var r=!s.test(e);return r||null!=t&&e in o(t)}var i=e("../lang/isArray"),o=e("./toObject"),s=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\n\\]|\\.)*?\1)\]/,a=/^\w*$/;t.exports=r},{"../lang/isArray":131,"./toObject":128}],123:[function(e,t,n){function r(e){return"number"==typeof e&&e>-1&&e%1==0&&i>=e}var i=9007199254740991;t.exports=r},{}],124:[function(e,t,n){function r(e){return!!e&&"object"==typeof e}t.exports=r},{}],125:[function(e,t,n){function r(e){return e===e&&!i(e)}var i=e("../lang/isObject");t.exports=r},{"../lang/isObject":133}],126:[function(e,t,n){function r(e){for(var t=u(e),n=t.length,r=n&&e.length,c=!!r&&a(r)&&(o(e)||i(e)),f=-1,d=[];++f<n;){var p=t[f];(c&&s(p,r)||l.call(e,p))&&d.push(p)}return d}var i=e("../lang/isArguments"),o=e("../lang/isArray"),s=e("./isIndex"),a=e("./isLength"),u=e("../object/keysIn"),c=Object.prototype,l=c.hasOwnProperty;t.exports=r},{"../lang/isArguments":130,"../lang/isArray":131,"../object/keysIn":138,"./isIndex":120,"./isLength":123}],127:[function(e,t,n){function r(e,t){for(var n,r=-1,i=e.length,o=-1,s=[];++r<i;){var a=e[r],u=t?t(a,r,e):a;r&&n===u||(n=u,s[++o]=a)}return s}t.exports=r},{}],128:[function(e,t,n){function r(e){return i(e)?e:Object(e)}var i=e("../lang/isObject");t.exports=r},{"../lang/isObject":133}],129:[function(e,t,n){function r(e){if(o(e))return e;var t=[];return i(e).replace(s,function(e,n,r,i){t.push(r?i.replace(a,"$1"):n||e)}),t}var i=e("./baseToString"),o=e("../lang/isArray"),s=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\n\\]|\\.)*?)\2)\]/g,a=/\\(\\)?/g;t.exports=r},{"../lang/isArray":131,"./baseToString":105}],130:[function(e,t,n){function r(e){return o(e)&&i(e)&&u.call(e)==s}var i=e("../internal/isArrayLike"),o=e("../internal/isObjectLike"),s="[object Arguments]",a=Object.prototype,u=a.toString;t.exports=r},{"../internal/isArrayLike":119,"../internal/isObjectLike":124}],131:[function(e,t,n){var r=e("../internal/getNative"),i=e("../internal/isLength"),o=e("../internal/isObjectLike"),s="[object Array]",a=Object.prototype,u=a.toString,c=r(Array,"isArray"),l=c||function(e){return o(e)&&i(e.length)&&u.call(e)==s};t.exports=l},{"../internal/getNative":117,"../internal/isLength":123,"../internal/isObjectLike":124}],132:[function(e,t,n){function r(e){return null==e?!1:f.call(e)==s?d.test(c.call(e)):o(e)&&a.test(e)}var i=e("../string/escapeRegExp"),o=e("../internal/isObjectLike"),s="[object Function]",a=/^\[object .+?Constructor\]$/,u=Object.prototype,c=Function.prototype.toString,l=u.hasOwnProperty,f=u.toString,d=RegExp("^"+i(c.call(l)).replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");t.exports=r},{"../internal/isObjectLike":124,"../string/escapeRegExp":140}],133:[function(e,t,n){function r(e){var t=typeof e;return!!e&&("object"==t||"function"==t)}t.exports=r},{}],134:[function(e,t,n){function r(e){return o(e)&&i(e.length)&&!!_[A.call(e)]}var i=e("../internal/isLength"),o=e("../internal/isObjectLike"),s="[object Arguments]",a="[object Array]",u="[object Boolean]",c="[object Date]",l="[object Error]",f="[object Function]",d="[object Map]",p="[object Number]",h="[object Object]",g="[object RegExp]",v="[object Set]",m="[object String]",y="[object WeakMap]",b="[object ArrayBuffer]",E="[object Float32Array]",M="[object Float64Array]",w="[object Int8Array]",x="[object Int16Array]",C="[object Int32Array]",I="[object Uint8Array]",T="[object Uint8ClampedArray]",S="[object Uint16Array]",N="[object Uint32Array]",_={};_[E]=_[M]=_[w]=_[x]=_[C]=_[I]=_[T]=_[S]=_[N]=!0,_[s]=_[a]=_[b]=_[u]=_[c]=_[l]=_[f]=_[d]=_[p]=_[h]=_[g]=_[v]=_[m]=_[y]=!1;var O=Object.prototype,A=O.toString;t.exports=r},{"../internal/isLength":123,"../internal/isObjectLike":124}],135:[function(e,t,n){var r=e("../internal/assignWith"),i=e("../internal/baseAssign"),o=e("../internal/createAssigner"),s=o(function(e,t,n){return n?r(e,t,n):i(e,t)});t.exports=s},{"../internal/assignWith":91,"../internal/baseAssign":92,"../internal/createAssigner":110}],136:[function(e,t,n){function r(e,t,n){var r=null==e?void 0:i(e,o(t),t+"");return void 0===r?n:r}var i=e("../internal/baseGet"),o=e("../internal/toPath");t.exports=r},{"../internal/baseGet":95,"../internal/toPath":129}],137:[function(e,t,n){var r=e("../internal/getNative"),i=e("../internal/isArrayLike"),o=e("../lang/isObject"),s=e("../internal/shimKeys"),a=r(Object,"keys"),u=a?function(e){var t=null==e?null:e.constructor;return"function"==typeof t&&t.prototype===e||"function"!=typeof e&&i(e)?s(e):o(e)?a(e):[]}:s;t.exports=u},{"../internal/getNative":117,"../internal/isArrayLike":119,"../internal/shimKeys":126,"../lang/isObject":133}],138:[function(e,t,n){function r(e){if(null==e)return[];u(e)||(e=Object(e));var t=e.length;t=t&&a(t)&&(o(e)||i(e))&&t||0;for(var n=e.constructor,r=-1,c="function"==typeof n&&n.prototype===e,f=Array(t),d=t>0;++r<t;)f[r]=r+"";for(var p in e)d&&s(p,t)||"constructor"==p&&(c||!l.call(e,p))||f.push(p);return f}var i=e("../lang/isArguments"),o=e("../lang/isArray"),s=e("../internal/isIndex"),a=e("../internal/isLength"),u=e("../lang/isObject"),c=Object.prototype,l=c.hasOwnProperty;t.exports=r},{"../internal/isIndex":120,"../internal/isLength":123,"../lang/isArguments":130,"../lang/isArray":131,"../lang/isObject":133}],139:[function(e,t,n){function r(e){e=o(e);for(var t=-1,n=i(e),r=n.length,s=Array(r);++t<r;){var a=n[t];s[t]=[a,e[a]]}return s}var i=e("./keys"),o=e("../internal/toObject");t.exports=r},{"../internal/toObject":128,"./keys":137}],140:[function(e,t,n){function r(e){return e=i(e),e&&s.test(e)?e.replace(o,"\\$&"):e}var i=e("../internal/baseToString"),o=/[.*+?^${}()|[\]\/\\]/g,s=RegExp(o.source);t.exports=r},{"../internal/baseToString":105}],141:[function(e,t,n){function r(e){return function(){return e}}t.exports=r},{}],142:[function(e,t,n){function r(e){return e}t.exports=r},{}],143:[function(e,t,n){function r(e){return s(e)?i(e):o(e)}var i=e("../internal/baseProperty"),o=e("../internal/basePropertyDeep"),s=e("../internal/isKey");t.exports=r},{"../internal/baseProperty":102,"../internal/basePropertyDeep":103,"../internal/isKey":122}],144:[function(e,t,n){"use strict";t.exports=e("./lib")},{"./lib":149}],145:[function(e,t,n){"use strict";function r(){}function i(e){try{return e.then}catch(t){return console.error(t),v=t,m}}function o(e,t){try{return e(t)}catch(n){return console.error(n),v=n,m}}function s(e,t,n){try{e(t,n)}catch(r){return console.error(r),v=r,m}}function a(e){if("object"!=typeof this)throw new TypeError("Promises must be constructed via new");if("function"!=typeof e)throw new TypeError("not a function");this._37=0,this._12=null,this._59=[],e!==r&&h(e,this)}function u(e,t,n){return new e.constructor(function(i,o){var s=new a(r);s.then(i,o),c(e,new p(t,n,s))})}function c(e,t){for(;3===e._37;)e=e._12;return 0===e._37?void e._59.push(t):void g(function(){var n=1===e._37?t.onFulfilled:t.onRejected;if(null===n)return void(1===e._37?l(t.promise,e._12):f(t.promise,e._12));var r=o(n,e._12);r===m?f(t.promise,v):l(t.promise,r)})}function l(e,t){if(t===e)return f(e,new TypeError("A promise cannot be resolved with itself."));if(t&&("object"==typeof t||"function"==typeof t)){var n=i(t);if(n===m)return f(e,v);if(n===e.then&&t instanceof a)return e._37=3,e._12=t,void d(e);if("function"==typeof n)return void h(n.bind(t),e)}e._37=1,e._12=t,d(e)}function f(e,t){e._37=2,e._12=t,d(e)}function d(e){for(var t=0;t<e._59.length;t++)c(e,e._59[t]);e._59=null}function p(e,t,n){this.onFulfilled="function"==typeof e?e:null,this.onRejected="function"==typeof t?t:null,this.promise=n}function h(e,t){var n=!1,r=s(e,function(e){n||(n=!0,l(t,e))},function(e){n||(n=!0,f(t,e))});n||r!==m||(n=!0,f(t,v))}var g=e("asap/raw"),v=null,m={};t.exports=a,a._99=r,a.prototype.then=function(e,t){if(this.constructor!==a)return u(this,e,t);var n=new a(r);return c(this,new p(e,t,n)),n}},{"asap/raw":153}],146:[function(e,t,n){"use strict";var r=e("./core.js");t.exports=r,r.prototype.done=function(e,t){var n=arguments.length?this.then.apply(this,arguments):this;n.then(null,function(e){setTimeout(function(){throw e},0)})}},{"./core.js":145}],147:[function(e,t,n){"use strict";function r(e){var t=new i(i._99);return t._37=1,t._12=e,t}var i=e("./core.js");t.exports=i;var o=r(!0),s=r(!1),a=r(null),u=r(void 0),c=r(0),l=r("");i.resolve=function(e){if(e instanceof i)return e;if(null===e)return a;if(void 0===e)return u;if(e===!0)return o;if(e===!1)return s;if(0===e)return c;if(""===e)return l;if("object"==typeof e||"function"==typeof e)try{var t=e.then;if("function"==typeof t)return new i(t.bind(e))}catch(n){return new i(function(e,t){t(n)})}return r(e)},i.all=function(e){var t=Array.prototype.slice.call(e);return new i(function(e,n){function r(s,a){if(a&&("object"==typeof a||"function"==typeof a)){if(a instanceof i&&a.then===i.prototype.then){for(;3===a._37;)a=a._12;return 1===a._37?r(s,a._12):(2===a._37&&n(a._12),void a.then(function(e){r(s,e)},n))}var u=a.then;if("function"==typeof u){var c=new i(u.bind(a));return void c.then(function(e){r(s,e)},n)}}t[s]=a,0===--o&&e(t)}if(0===t.length)return e([]);for(var o=t.length,s=0;s<t.length;s++)r(s,t[s])})},i.reject=function(e){return new i(function(t,n){n(e)})},i.race=function(e){return new i(function(t,n){e.forEach(function(e){i.resolve(e).then(t,n)})})},i.prototype["catch"]=function(e){return this.then(null,e)}},{"./core.js":145}],148:[function(e,t,n){"use strict";var r=e("./core.js");t.exports=r,r.prototype["finally"]=function(e){return this.then(function(t){return r.resolve(e()).then(function(){return t})},function(t){return r.resolve(e()).then(function(){throw t})})}},{"./core.js":145}],149:[function(e,t,n){"use strict";t.exports=e("./core.js"),e("./done.js"),e("./finally.js"),e("./es6-extensions.js"),e("./node-extensions.js")},{"./core.js":145,"./done.js":146,"./es6-extensions.js":147,"./finally.js":148,"./node-extensions.js":150}],150:[function(e,t,n){"use strict";var r=e("./core.js"),i=e("asap");t.exports=r,r.denodeify=function(e,t){return t=t||1/0,function(){var n=this,i=Array.prototype.slice.call(arguments,0,t>0?t:0);return new r(function(t,r){i.push(function(e,n){e?r(e):t(n)});var o=e.apply(n,i);!o||"object"!=typeof o&&"function"!=typeof o||"function"!=typeof o.then||t(o)})}},r.nodeify=function(e){return function(){var t=Array.prototype.slice.call(arguments),n="function"==typeof t[t.length-1]?t.pop():null,o=this;try{return e.apply(this,arguments).nodeify(n,o)}catch(s){if(null===n||"undefined"==typeof n)return new r(function(e,t){t(s)});i(function(){n.call(o,s)})}}},r.prototype.nodeify=function(e,t){return"function"!=typeof e?this:void this.then(function(n){i(function(){e.call(t,null,n)})},function(n){i(function(){e.call(t,n)})})}},{"./core.js":145,asap:151}],151:[function(e,t,n){"use strict";function r(){if(u.length)throw u.shift()}function i(e){var t;t=a.length?a.pop():new o,t.task=e,s(t)}function o(){this.task=null}var s=e("./raw"),a=[],u=[],c=s.makeRequestCallFromTimer(r);t.exports=i,o.prototype.call=function(){try{this.task.call()}catch(e){i.onerror?i.onerror(e):(u.push(e),c())}finally{this.task=null,a[a.length]=this}}},{"./raw":152}],152:[function(e,t,n){(function(e){"use strict";function n(e){a.length||(s(),u=!0),a[a.length]=e}function r(){for(;c<a.length;){var e=c;if(c+=1,a[e].call(),c>l){for(var t=0,n=a.length-c;n>t;t++)a[t]=a[t+c];a.length-=c,c=0}}a.length=0,c=0,u=!1}function i(e){var t=1,n=new f(e),r=document.createTextNode("");return n.observe(r,{characterData:!0}),function(){t=-t,r.data=t}}function o(e){return function(){function t(){clearTimeout(n),clearInterval(r),e()}var n=setTimeout(t,0),r=setInterval(t,50)}}t.exports=n;var s,a=[],u=!1,c=0,l=1024,f=e.MutationObserver||e.WebKitMutationObserver;s="function"==typeof f?i(r):o(r),n.requestFlush=s,n.makeRequestCallFromTimer=o}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],153:[function(e,t,n){(function(n){"use strict";function r(e){u.length||(o(),c=!0),u[u.length]=e}function i(){for(;l<u.length;){var e=l;if(l+=1,u[e].call(),l>f){for(var t=0,n=u.length-l;n>t;t++)u[t]=u[t+l];u.length-=l,l=0}}u.length=0,l=0,c=!1}function o(){var t=n.domain;t&&(s||(s=e("domain")),s.active=n.domain=null),c&&a?setImmediate(i):n.nextTick(i),t&&(s.active=n.domain=t)}var s,a="function"==typeof setImmediate;t.exports=r;var u=[],c=!1,l=0,f=1024;r.requestFlush=o}).call(this,e("_process"))},{_process:84,domain:81}],154:[function(e,t,n){(function(e){var n;if(e.crypto&&crypto.getRandomValues){var r=new Uint8Array(16);n=function(){return crypto.getRandomValues(r),r}}if(!n){var i=new Array(16);n=function(){for(var e,t=0;16>t;t++)0===(3&t)&&(e=4294967296*Math.random()),i[t]=e>>>((3&t)<<3)&255;return i}}t.exports=n}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],155:[function(e,t,n){function r(e,t,n){var r=t&&n||0,i=0;for(t=t||[],e.toLowerCase().replace(/[0-9a-f]{2}/g,function(e){16>i&&(t[r+i++]=c[e])});16>i;)t[r+i++]=0;return t}function i(e,t){var n=t||0,r=u;return r[e[n++]]+r[e[n++]]+r[e[n++]]+r[e[n++]]+"-"+r[e[n++]]+r[e[n++]]+"-"+r[e[n++]]+r[e[n++]]+"-"+r[e[n++]]+r[e[n++]]+"-"+r[e[n++]]+r[e[n++]]+r[e[n++]]+r[e[n++]]+r[e[n++]]+r[e[n++]]}function o(e,t,n){var r=t&&n||0,o=t||[];e=e||{};var s=void 0!==e.clockseq?e.clockseq:p,a=void 0!==e.msecs?e.msecs:(new Date).getTime(),u=void 0!==e.nsecs?e.nsecs:g+1,c=a-h+(u-g)/1e4;if(0>c&&void 0===e.clockseq&&(s=s+1&16383),(0>c||a>h)&&void 0===e.nsecs&&(u=0),u>=1e4)throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");h=a,g=u,p=s,a+=122192928e5;var l=(1e4*(268435455&a)+u)%4294967296;o[r++]=l>>>24&255,o[r++]=l>>>16&255,o[r++]=l>>>8&255,o[r++]=255&l;var f=a/4294967296*1e4&268435455;o[r++]=f>>>8&255,o[r++]=255&f,o[r++]=f>>>24&15|16,o[r++]=f>>>16&255,o[r++]=s>>>8|128,o[r++]=255&s;for(var v=e.node||d,m=0;6>m;m++)o[r+m]=v[m];return t?t:i(o)}function s(e,t,n){var r=t&&n||0;"string"==typeof e&&(t="binary"==e?new Array(16):null,e=null),e=e||{};var o=e.random||(e.rng||a)();if(o[6]=15&o[6]|64,o[8]=63&o[8]|128,t)for(var s=0;16>s;s++)t[r+s]=o[s];return t||i(o)}for(var a=e("./rng"),u=[],c={},l=0;256>l;l++)u[l]=(l+256).toString(16).substr(1),c[u[l]]=l;var f=a(),d=[1|f[0],f[1],f[2],f[3],f[4],f[5]],p=16383&(f[6]<<8|f[7]),h=0,g=0,v=s;v.v1=o,v.v4=s,v.parse=r,v.unparse=i,t.exports=v},{"./rng":154}],156:[function(t,n,r){(function(){"use strict";function t(){}function r(e,t){for(var n=e.length;n--;)if(e[n].listener===t)return n;return-1}function i(e){return function(){return this[e].apply(this,arguments)}}var o=t.prototype,s=this,a=s.EventEmitter;o.getListeners=function(e){var t,n,r=this._getEvents();if(e instanceof RegExp){t={};for(n in r)r.hasOwnProperty(n)&&e.test(n)&&(t[n]=r[n])}else t=r[e]||(r[e]=[]);return t},o.flattenListeners=function(e){var t,n=[];for(t=0;t<e.length;t+=1)n.push(e[t].listener);return n},o.getListenersAsObject=function(e){var t,n=this.getListeners(e);return n instanceof Array&&(t={},t[e]=n),t||n},o.addListener=function(e,t){var n,i=this.getListenersAsObject(e),o="object"==typeof t;for(n in i)i.hasOwnProperty(n)&&-1===r(i[n],t)&&i[n].push(o?t:{listener:t,once:!1});return this},o.on=i("addListener"),o.addOnceListener=function(e,t){return this.addListener(e,{listener:t,once:!0})},o.once=i("addOnceListener"),o.defineEvent=function(e){return this.getListeners(e),this},o.defineEvents=function(e){for(var t=0;t<e.length;t+=1)this.defineEvent(e[t]);return this},o.removeListener=function(e,t){var n,i,o=this.getListenersAsObject(e);for(i in o)o.hasOwnProperty(i)&&(n=r(o[i],t),-1!==n&&o[i].splice(n,1));return this},o.off=i("removeListener"),o.addListeners=function(e,t){return this.manipulateListeners(!1,e,t)},o.removeListeners=function(e,t){return this.manipulateListeners(!0,e,t)},o.manipulateListeners=function(e,t,n){var r,i,o=e?this.removeListener:this.addListener,s=e?this.removeListeners:this.addListeners;if("object"!=typeof t||t instanceof RegExp)for(r=n.length;r--;)o.call(this,t,n[r]);else for(r in t)t.hasOwnProperty(r)&&(i=t[r])&&("function"==typeof i?o.call(this,r,i):s.call(this,r,i));return this},o.removeEvent=function(e){var t,n=typeof e,r=this._getEvents();if("string"===n)delete r[e];else if(e instanceof RegExp)for(t in r)r.hasOwnProperty(t)&&e.test(t)&&delete r[t];else delete this._events;return this},o.removeAllListeners=i("removeEvent"),o.emitEvent=function(e,t){var n,r,i,o,s=this.getListenersAsObject(e);for(i in s)if(s.hasOwnProperty(i))for(r=s[i].length;r--;)n=s[i][r],n.once===!0&&this.removeListener(e,n.listener),o=n.listener.apply(this,t||[]),o===this._getOnceReturnValue()&&this.removeListener(e,n.listener);return this},o.trigger=i("emitEvent"),o.emit=function(e){var t=Array.prototype.slice.call(arguments,1);return this.emitEvent(e,t)},o.setOnceReturnValue=function(e){return this._onceReturnValue=e,this},o._getOnceReturnValue=function(){return this.hasOwnProperty("_onceReturnValue")?this._onceReturnValue:!0},o._getEvents=function(){return this._events||(this._events={})},t.noConflict=function(){return s.EventEmitter=a,t},"function"==typeof e&&e.amd?e(function(){return t}):"object"==typeof n&&n.exports?n.exports=t:s.EventEmitter=t}).call(this)},{}]},{},[1])(1)});

if(!__app) {
  var __app = {};
}
if(!WKim){
	$.alert("WKim are not load");
}
if(!Handlebars){
	$.alert("Handlebars are not load");
}
__app.faceObj = {
	domain:'http://www.renhe.cn/images/faces/',
	name:{
		"[呵呵]" : "smilea.gif",
		"[可爱]" : "tza.gif",
		"[可怜]" : "kl.gif",
		"[挖鼻屎]" : "kbsa.gif",
		"[吃惊]" : "cj.gif",
		"[挤眼]" : "zy.gif",
		"[闭嘴]" : "bz.gif",
		"[爱你]" : "lovea.gif",
		"[泪]" : "sada.gif",
		"[偷笑]" : "heia.gif",
		"[亲亲]" : "qq.gif",
		"[生病]" : "sb.gif",
		"[太开心]" : "mb.gif",
		"[懒得理你]" : "ldln.gif",
		"[右哼哼]" : "yhh.gif",
		"[左哼哼]" : "zhh.gif",
		"[嘘]" : "x.gif",
		"[衰]" : "cry.gif",
		"[委屈]" : "wq.gif",
		"[吐]" : "t.gif",
		"[打哈气]" : "k.gif",
		"[抱抱]" : "bba.gif",
		"[怒]" : "angrya.gif",
		"[疑问]" : "yw.gif",
		"[馋嘴]" : "cza.gif",
		"[拜拜]" : "88.gif",
		"[思考]" : "sk.gif",
		"[汗]" : "sweata.gif",
		"[困]" : "sleepya.gif",
		"[睡觉]" : "sleepa.gif",
		"[钱]" : "money.gif",
		"[失望]" : "sw.gif",
		"[酷]" : "cool.gif",
		"[花心]" : "hsa.gif",
		"[哼]" : "hatea.gif",
		"[悲伤]" : "bs.gif",
		"[抓狂]" : "crazya.gif",
		"[黑线]" : "h.gif",
		"[阴险]" : "yx.gif",
		"[怒骂]" : "nm.gif",
		"[心]" : "hearta.gif",
		"[伤心]" : "unheart.gif",
		"[微笑]" : "hl_smile_open_mouth.png",
		"[哈哈]" : "hl_haha.png",
		"[嘻嘻]" : "hl_xixi.png",
		"[眉开眼笑]" : "hl_smiling_eyes.png",
		"[光环]" : "hl_smiling_halo.png",
		"[安静]" : "hl_hushed_face.png",
		"[疑惑]" : "hl_confused_face.png",
		"[脸红]" : "hl_blush.png",
		"[高兴]" : "hl_joy.png",
		"[甜蜜微笑]" : "hl_sweat_smile.png",
		"[恶魔]" : "hl_horns.png",
		"[期待]" : "hl_neutral_face.png",
		"[生气]" : "hl_angry_face.png",
		"[笑呵呵]" : "hl_smiley.png",
		"[哈哈大笑]" : "hl_laughing.png",
		"[眨眼睛]" : "hl_wink.png",
		"[面无表情]" : "hl_expressionles.png",
		"[扮鬼脸]" : "hl_grimacing.png",
		"[愤怒]" : "hl_rage.png",
		"[好奇]" : "hl_curiousness.png",
		"[失望的]" : "hl_disappointed.png",
		"[恐惧]" : "hl_fearful.png",
		"[担心]" : "hl_worried.png",
		"[害羞]" : "hl_flushed.png",
		"[哭泣]" : "hl_cry.png",
		"[不屈不挠]" : "hl_persevere.png",
		"[皱眉]" : "hl_frowning.png",
		"[惊叫]" : "hl_scream.png",
		"[晕]" : "hl_dizzy.png",
		"[睡着]" : "hl_sleeping.png",
		"[胜利]" : "hl_triumph.png",
		"[苦恼]" : "hl_anguished.png",
		"[冷汗]" : "hl_cold.png",
		"[惊讶]" : "hl_astonished.png",
		"[抿嘴]" : "hl_no_mouth.png",
		"[口罩]" : "hl_mask.png",
		"[喜欢]" : "hl_heart_eyes.png",
		"[鬼脸]" : "hl_closed_eyes.png",
		"[亲一个]" : "hl_kissing_smiling_eyes.png",
		"[墨镜]" : "hl_sunglasses.png",
		"[困惑]" : "hl_confounded.png",
		"[沮丧]" : "hl_disappointed.png",
		"[吐舌头]" : "hl_stuck_out_tongue.png",
		"[美味]" : "hl_yum.png",
		"[飞吻]" : "hl_kissing_heart.png",
		"[大哭]" : "hl_sob.png",
		"[沉思]" : "hl_pensive.png",
		"[不悦]" : "hl_unamused.png",
		"[眨眼]" : "hl_winking_eye.png",
		"[亲一口]" : "hl_kissing.png",
		"[亲吻]" : "hl_kissing_closed_eyes.png",
		"[放心了]" : "hl_relieved.png",
		"[困了]" : "hl_sleepy.png",
		"[奸笑]" : "hl_smirk.png",
		"[举手]" : "hl_raising_hand.png",
		"[不行]" : "hl_no_good.png",
		"[撅嘴]" : "hl_pouting_face.png",
		"[奸笑猫]" : "hl_smirk_cat.png",
		"[喜欢猫]" : "hl_heart_eyes_cat.png",
		"[流汗]" : "hl_sweat.png",
		"[庆祝]" : "hl_raised_hands.png",
		"[可以]" : "hl_ok_woman.png",
		"[祈祷]" : "hl_pray.png",
		"[笑脸猫]" : "hl_smile_cat.png",
		"[亲亲猫]" : "hl_kissing_cat.png",
		"[疲倦]" : "hl_tired_face.png",
		"[皱眉头]" : "hl_frowning.png",
		"[鞠躬]" : "hl_bow.png",
		"[微笑猫]" : "hl_smiley_cat.png",
		"[欢乐猫]" : "hl_joy_cat.png",
		"[哭泣猫]" : "hl_crying_cat.png",
		"[宝贝]" : "hl_baby.png",
		"[男孩]" : "hl_boy.png",
		"[夫妇]" : "hl_couple.png",
		"[恩爱]" : "hl_couple_with_heart.png",
		"[接吻]" : "hl_couplekiss.png",
		"[家庭]" : "hl_family.png",
		"[女孩]" : "hl_girl.png",
		"[屎]" : "hl_hankey.png",
		"[不听]" : "hl_hear_no_evil.png",
		"[男人]" : "hl_man.png",
		"[老爷爷]" : "hl_older_man.png",
		"[老奶奶]" : "hl_older_woman.png",
		"[撅嘴猫]" : "hl_pouting_cat.png",
		"[尖叫]" : "hl_scream_cat.png",
		"[不看]" : "hl_see_no_evil.png",
		"[不说]" : "hl_speak_no_evil.png",
		"[男人拉手]" : "hl_two_men_holding_hands.png",
		"[妇女]" : "hl_woman.png",
		"[天使]" : "hl_angel.png",
		"[新娘]" : "hl_bride_with_veil.png",
		"[轮廓]" : "hl_bust_in_silhouette.png",
		"[双人轮廓]" : "hl_busts_in_silhouette.png",
		"[建筑工人]" : "hl_construction_worker.png",
		"[警察]" : "hl_cop.png",
		"[舞者]" : "hl_dancer.png",
		"[伴舞]" : "hl_dancers.png",
		"[卫兵]" : "hl_guardsman.png",
		"[理发]" : "hl_haircut.png",
		"[前台]" : "hl_information_desk_person.png",
		"[帽子男子]" : "hl_man_with_gua_pi_mao.png",
		"[穆斯林男人]" : "hl_man_with_turban.png",
		"[按摩]" : "hl_massage.png",
		"[金发女郎]" : "hl_person_with_blond_hair.png",
		"[公主]" : "hl_princess.png",
		"[圣诞老人]" : "hl_santa.png",
		"[女人手牵手]" : "hl_two_women_holding_hands.png",
		"[拳头]" : "hl_punch.png",
		"[挥手]" : "hl_wave.png",
		"[上面]" : "hl_point_up.png",
		"[下面]" : "hl_point_down.png",
		"[左面]" : "hl_point_left.png",
		"[右面]" : "hl_point_right.png",
		"[手势]" : "hl_point_up2.png",
		"[手掌]" : "hl_open_hands.png",
		"[鼓掌]" : "hl_clap.png",
		"[指甲油]" : "hl_nail_polish.png",
		"[食人魔]" : "hl_japanese_ogre.png",
		"[妖精]" : "hl_japanese_goblin.png",
		"[小鬼]" : "hl_imp.png",
		"[鬼]" : "hl_ghost.png",
		"[外星怪物]" : "hl_alien_monster.png",
		"[外星人]" : "hl_extraterrestrial_alien.png",
		"[颅骨]" : "hl_skull.png",
		"[眼睛]" : "hl_eyes.png",
		"[耳朵]" : "hl_ear.png",
		"[鼻子]" : "hl_nose.png",
		"[嘴巴]" : "hl_mouth.png",
		"[舌头]" : "hl_tongue.png",
		"[爱心]" : "hl_heart.png",
		"[脚印]" : "hl_footprints.png",
		"[吻]" : "hl_kiss.png",
		"[蓝心]" : "hl_blue_heart.png",
		"[肌肉]" : "hl_muscle.png",
		"[绿心]" : "hl_green_heart.png",
		"[黄心]" : "hl_yellow_heart.png",
		"[闪心]" : "hl_sparkling_heart.png",
		"[心跳]" : "hl_heartbeat.png",
		"[礼物的心]" : "hl_gift_heart.png",
		"[成长的心]" : "hl_heartpulse.png",
		"[心碎]" : "hl_broken_heart.png",
		"[一见钟情]" : "hl_cupid.png",
		"[紫心]" : "hl_purple_heart.png",
		"[旋转的心]" : "hl_revolving_hearts.png",
		"[装饰的心]" : "hl_heart_decoration.png",
		"[两颗心]" : "hl_two_hearts.png",
		"[赞]" : "hl_good.png",
		"[OK]" : "hl_ok_hand.png",
		"[加油]" : "hl_fist.png",
		"[手]" : "hl_hand.png",
		"[耶]" : "hl_victory.png",
		"[鄙视]" : "hl_step.png"
	},
	name_new:{
		"[微笑]" : "hl_smile_open_mouth.png",
		"[哈哈]" : "hl_haha.png",
		"[嘻嘻]" : "hl_xixi.png",
		"[眉开眼笑]" : "hl_smiling_eyes.png",
		"[光环]" : "hl_smiling_halo.png",
		"[安静]" : "hl_hushed_face.png",
		"[疑惑]" : "hl_confused_face.png",
		"[脸红]" : "hl_blush.png",
		"[高兴]" : "hl_joy.png",
		"[甜蜜微笑]" : "hl_sweat_smile.png",
		"[恶魔]" : "hl_horns.png",
		"[期待]" : "hl_neutral_face.png",
		"[生气]" : "hl_angry_face.png",
		"[笑呵呵]" : "hl_smiley.png",
		"[哈哈大笑]" : "hl_laughing.png",
		"[眨眼睛]" : "hl_wink.png",
		"[面无表情]" : "hl_expressionles.png",
		"[扮鬼脸]" : "hl_grimacing.png",
		"[愤怒]" : "hl_rage.png",
		"[好奇]" : "hl_curiousness.png",
		"[失望的]" : "hl_disappointed.png",
		"[恐惧]" : "hl_fearful.png",
		"[担心]" : "hl_worried.png",
		"[害羞]" : "hl_flushed.png",
		"[哭泣]" : "hl_cry.png",
		"[不屈不挠]" : "hl_persevere.png",
		"[皱眉]" : "hl_frowning.png",
		"[惊叫]" : "hl_scream.png",
		"[晕]" : "hl_dizzy.png",
		"[睡着]" : "hl_sleeping.png",
		"[胜利]" : "hl_triumph.png",
		"[苦恼]" : "hl_anguished.png",
		"[冷汗]" : "hl_cold.png",
		"[惊讶]" : "hl_astonished.png",
		"[抿嘴]" : "hl_no_mouth.png",
		"[口罩]" : "hl_mask.png",
		"[喜欢]" : "hl_heart_eyes.png",
		"[鬼脸]" : "hl_closed_eyes.png",
		"[亲一个]" : "hl_kissing_smiling_eyes.png",
		"[墨镜]" : "hl_sunglasses.png",
		"[困惑]" : "hl_confounded.png",
		"[沮丧]" : "hl_disappointed.png",
		"[吐舌头]" : "hl_stuck_out_tongue.png",
		"[美味]" : "hl_yum.png",
		"[飞吻]" : "hl_kissing_heart.png",
		"[大哭]" : "hl_sob.png",
		"[沉思]" : "hl_pensive.png",
		"[不悦]" : "hl_unamused.png",
		"[眨眼]" : "hl_winking_eye.png",
		"[亲一口]" : "hl_kissing.png",
		"[亲吻]" : "hl_kissing_closed_eyes.png",
		"[放心了]" : "hl_relieved.png",
		"[困了]" : "hl_sleepy.png",
		"[奸笑]" : "hl_smirk.png",
		"[举手]" : "hl_raising_hand.png",
		"[不行]" : "hl_no_good.png",
		"[撅嘴]" : "hl_pouting_face.png",
		"[奸笑猫]" : "hl_smirk_cat.png",
		"[喜欢猫]" : "hl_heart_eyes_cat.png",
		"[流汗]" : "hl_sweat.png",
		"[庆祝]" : "hl_raised_hands.png",
		"[可以]" : "hl_ok_woman.png",
		"[祈祷]" : "hl_pray.png",
		"[笑脸猫]" : "hl_smile_cat.png",
		"[亲亲猫]" : "hl_kissing_cat.png",
		"[疲倦]" : "hl_tired_face.png",
		"[皱眉头]" : "hl_frowning.png",
		"[鞠躬]" : "hl_bow.png",
		"[微笑猫]" : "hl_smiley_cat.png",
		"[欢乐猫]" : "hl_joy_cat.png",
		"[哭泣猫]" : "hl_crying_cat.png",
		"[宝贝]" : "hl_baby.png",
		"[男孩]" : "hl_boy.png",
		"[夫妇]" : "hl_couple.png",
		"[恩爱]" : "hl_couple_with_heart.png",
		"[接吻]" : "hl_couplekiss.png",
		"[家庭]" : "hl_family.png",
		"[女孩]" : "hl_girl.png",
		"[屎]" : "hl_hankey.png",
		"[不听]" : "hl_hear_no_evil.png",
		"[男人]" : "hl_man.png",
		"[老爷爷]" : "hl_older_man.png",
		"[老奶奶]" : "hl_older_woman.png",
		"[撅嘴猫]" : "hl_pouting_cat.png",
		"[尖叫]" : "hl_scream_cat.png",
		"[不看]" : "hl_see_no_evil.png",
		"[不说]" : "hl_speak_no_evil.png",
		"[男人拉手]" : "hl_two_men_holding_hands.png",
		"[妇女]" : "hl_woman.png",
		"[天使]" : "hl_angel.png",
		"[新娘]" : "hl_bride_with_veil.png",
		"[轮廓]" : "hl_bust_in_silhouette.png",
		"[双人轮廓]" : "hl_busts_in_silhouette.png",
		"[建筑工人]" : "hl_construction_worker.png",
		"[警察]" : "hl_cop.png",
		"[舞者]" : "hl_dancer.png",
		"[伴舞]" : "hl_dancers.png",
		"[卫兵]" : "hl_guardsman.png",
		"[理发]" : "hl_haircut.png",
		"[前台]" : "hl_information_desk_person.png",
		"[帽子男子]" : "hl_man_with_gua_pi_mao.png",
		"[穆斯林男人]" : "hl_man_with_turban.png",
		"[按摩]" : "hl_massage.png",
		"[金发女郎]" : "hl_person_with_blond_hair.png",
		"[公主]" : "hl_princess.png",
		"[圣诞老人]" : "hl_santa.png",
		"[女人手牵手]" : "hl_two_women_holding_hands.png",
		"[拳头]" : "hl_punch.png",
		"[挥手]" : "hl_wave.png",
		"[上面]" : "hl_point_up.png",
		"[下面]" : "hl_point_down.png",
		"[左面]" : "hl_point_left.png",
		"[右面]" : "hl_point_right.png",
		"[手势]" : "hl_point_up2.png",
		"[手掌]" : "hl_open_hands.png",
		"[鼓掌]" : "hl_clap.png",
		"[指甲油]" : "hl_nail_polish.png",
		"[食人魔]" : "hl_japanese_ogre.png",
		"[妖精]" : "hl_japanese_goblin.png",
		"[小鬼]" : "hl_imp.png",
		"[鬼]" : "hl_ghost.png",
		"[外星怪物]" : "hl_alien_monster.png",
		"[外星人]" : "hl_extraterrestrial_alien.png",
		"[颅骨]" : "hl_skull.png",
		"[眼睛]" : "hl_eyes.png",
		"[耳朵]" : "hl_ear.png",
		"[鼻子]" : "hl_nose.png",
		"[嘴巴]" : "hl_mouth.png",
		"[舌头]" : "hl_tongue.png",
		"[爱心]" : "hl_heart.png",
		"[脚印]" : "hl_footprints.png",
		"[吻]" : "hl_kiss.png",
		"[蓝心]" : "hl_blue_heart.png",
		"[肌肉]" : "hl_muscle.png",
		"[绿心]" : "hl_green_heart.png",
		"[黄心]" : "hl_yellow_heart.png",
		"[闪心]" : "hl_sparkling_heart.png",
		"[心跳]" : "hl_heartbeat.png",
		"[礼物的心]" : "hl_gift_heart.png",
		"[成长的心]" : "hl_heartpulse.png",
		"[心碎]" : "hl_broken_heart.png",
		"[一见钟情]" : "hl_cupid.png",
		"[紫心]" : "hl_purple_heart.png",
		"[旋转的心]" : "hl_revolving_hearts.png",
		"[装饰的心]" : "hl_heart_decoration.png",
		"[两颗心]" : "hl_two_hearts.png",
		"[赞]" : "hl_good.png",
		"[OK]" : "hl_ok_hand.png",
		"[加油]" : "hl_fist.png",
		"[手]" : "hl_hand.png",
		"[耶]" : "hl_victory.png",
		"[鄙视]" : "hl_step.png"
	},
	getFaceBytext:function(msg){
		var Reg = /\[[\u2E80-\u9FFF]+\]/g;
		var value = msg.match(Reg);
		if(!value) return msg;
		for(var i=0;i<value.length;i++){
			if(!__app.faceObj.name[value[i]]) continue;
			var str = '<img src="'+__app.faceObj.domain+__app.faceObj.name[value[i]]+'" style="width:1rem;"/>';
			msg = msg.replace(value[i],str);
		}
		return msg;
	},
	getFaceByName:function(value){
		return '<img src="'+__app.faceObj.domain+__app.faceObj.name[value]+'" style="width:1rem;"/>'
	}
}
var isDev = true;
__app.chatHref = !isDev? "/im/conv":"/demo/messageschat/index.html";

__app.staticDomain = "";
__app.myWkimDefaultConfig = {
	url:{
		getImSignModel:!isDev? "/im/getImLoginInfo":"/ajax/im.json"
	},
	plugin:{
		"listConversation":true
	},
	dom:{
		convList:".messages-list ul",
		unreadPointTotal:false,
		chat:".messages-content .messages",
		chatSendMsg:"#chatSendMsg"
	},
	template:{
		"listConversation":'{{#each data}}'+
							'{{#is hidden "not" 1}}'+
							'<li>'+
								'<a class="item-content" href="'+__app.chatHref+'?cid={{cid}}">'+
									'<div class="item-media">'+
										'{{#is isSingleChat "===" false}}'+
										'<div class="userimg" style="box-sizing: border-box; line-height: 0; width: 1.8rem; height: 1.8rem; background-image: url({{baseConversation.icon}}); background-size: contain; background-position: 50% 50%; background-repeat: no-repeat;"></div>'+
										'{{else}}'+
										'<div class="userimg" data-avatar="{{openId}}" style="box-sizing: border-box; line-height: 0; width: 1.8rem; height: 1.8rem; background-image: url(http://s1.renhe.cn/images/headnone_50.jpg); background-size: contain; background-position: 50% 50%; background-repeat: no-repeat;"></div>'+
										'{{/is}}'+
										'{{#is baseConversation.unreadPoint "not" 0}}<span class="badge">{{baseConversation.unreadPoint}}</span>{{/is}}'+
										
									'</div>'+
									'<div class="item-inner">'+
										
										'{{#each lastMessages}}'+
										'<div class="item-title-row">'+
											'{{#is ../isSingleChat "===" false}}'+
					      					'<div class="item-title" title="{{../baseConversation.title}}">{{../baseConversation.title}}</div>'+
					      					'{{else}}'+
					      					'<div class="item-title" data-nick="{{../openId}}">{{../openId}}</div>'+
					      					'{{/is}}'+
					      					'<div class="item-after">{{calendar baseMessage.createdAt}}</div>'+
					    				'</div>'+
					    				
					    				'<div class="item-subtitle">'+
						    				'{{#is isSingleChat "===" false}}'+
										    	'{{#is baseMessage.creatorType "not" 2}}'+
										    	'<span data-nick="{{baseMessage.openIdEx.openId}}"></span>:'+
										    	'{{/is}}'+
									    	'{{/is}}'+
								    		'{{#is baseMessage.content.contentType "===" 1}}'+
									    		'{{baseMessage.content.textContent.text}}'+
									    	'{{/is}}'+
									    	'{{#is baseMessage.content.contentType "===" 2}}【图片】{{/is}}'+
									    	'{{#is baseMessage.content.contentType "===" 3}}【语音】{{/is}}'+
									    	'{{#is baseMessage.content.contentType "===" 4}}【文件】{{/is}}'+
									    	'{{#is baseMessage.content.contentType "===" 102}}'+
									    		'{{#each baseMessage.content.attachments}}'+
									    			'{{#chatIsCard url}}'+
									    				'【名片】{{../extension.text}}'+
									    			'{{else}}'+
									    				'【链接】{{../extension.text}}'+
									    			'{{/chatIsCard}}'+
									    		'{{/each}}'+
									    	'{{/is}}'+
					    				'</div>'+
					    				'{{/each}}'+
					  				'</div>'+
								'</a>'+
							'</li>'+
							'{{/is}}'+
							'{{/each}}',
		"listChat":'{{#each data}}'+
						'{{#is baseMessage.creatorType "not" 2}}'+
							'{{#is hideTime "not" true}}'+
							'<div class="messages-date"><span>{{dateFormat baseMessage.createdAt "YYYY-MM-DD HH:mm:ss"}}</span></div>'+
							'{{/is}}'+

							'<div class="message{{#is baseMessage.content.contentType "===" 2}} message-pic{{/is}}{{#is ../myOpenId "not" baseMessage.openIdEx.openId}} message-received{{else}} message-sent{{/is}} message-with-tail message-with-avatar">'+
								'{{#is baseMessage.content.contentType "===" 1}}'+
								'<div class="message-text">{{imMsgTxt baseMessage.content.textContent.text}}</div>'+
								'{{/is}}'+
								
								'{{#is baseMessage.content.contentType "===" 2}}'+
								'<div class="message-text"><img class="js-imphotobrower" imread style="{{setImImgSize baseMessage.content.photoContent.width baseMessage.content.photoContent.height}}" src="{{baseMessage.content.photoContent.imageUrl}}"></div>'+
								'{{/is}}'+
								'{{#is baseMessage.content.contentType "===" 3}}'+
								'<div class="message-text im-audio-content">'+
									'<i class="im-audio" data-msg-id="{{baseMessage.messageId}}" style="width:{{operation baseMessage.content.audioContent.duration "hh"}}" data-media-time="{{baseMessage.content.audioContent.duration}}" data-media-id="{{baseMessage.content.audioContent.mediaId}}"></i>'+
									'<span class="im-audio-info">{{operation baseMessage.content.audioContent.duration "mm"}} \'\'</span>'+
							    	'{{#is receiverMessageStatus.readStatus "not" 2}}'+
							    	'<i class="im-audio-status"></i>'+
							    	'{{/is}}'+
								'</div>'+
								'{{/is}}'+
								'<div data-avatar="{{baseMessage.openIdEx.openId}}" style="background-image:url(http://s1.renhe.cn/images/headnone_50.jpg)" class="message-avatar"></div>'+
							'</div>'+
					
						'{{/is}}'+
					'{{/each}}'
	}
}
Handlebars.registerHelper("calendar",function(value) {
	return moment(value).calendar();
});
Handlebars.registerHelper('chatIsCard', function(url,options) {  
    var Reg = /user:\/\/([a-z0-9]+)/;
     var value = url.match(Reg);
     if(value){
         return options.fn(value)
     }else{
         return options.inverse(url);
     }
});
Handlebars.registerHelper("dateFormat",function(value,format) {
    return moment(value).format(format)
});
Handlebars.registerHelper('imMsgTxt', function(value,options) {
	var str = value;
	var arr = value.match(/((http[s]{0,1}|ftp):\/\/|www)[a-zA-Z0-9\.\-]+\.([a-zA-Z]{2,4})(:\d+)?(\/[a-zA-Z0-9\.\-~!@#$%^&*+?:_/=<>]*)?/g);
	if(arr){
		for(var i=0;i<arr.length;i++){
			var aStlink = /http[s]{0,1}|ftp:\/\//.test(arr[i]) ? arr[i]:"http://"+arr[i];
			str = str.replace(arr[i],'<a class="external"  href="'+aStlink+'" target="_blank">'+arr[i]+'</a>');
		}
	}
	return new Handlebars.SafeString(__app.faceObj.getFaceBytext(str).replace(/(\r\n|\n|\r)/g,'<br>'));
});
Handlebars.registerHelper('iconFileType', function(text,options) {  
    var attrs = [];
    var _type = "unknown";
    var filetype = {"TXT":"txt","excel":"excel","ppt":"ppt","xls":"excel","docx":"word","doc":"word","xlsx":"excel"};
    var staticDomain = __app.staticDomain || "";
    if(filetype[text]){
        _type = filetype[text];
    }
    for(var prop in options.hash) {
        attrs.push(prop + '="' + options.hash[prop] + '"');
    }
    return new Handlebars.SafeString(
        //'<img src="icon_filetype_txt@3x.png" class="media-object squ-img pull-left" style="margin-right:5px;border-radius:0;">'
        '<img src="'+staticDomain+'/assets/img/iconfiletype/icon_filetype_'+_type+'@3x.png" '+attrs.join(" ")+'>'
    );
 });
Handlebars.registerHelper("operation",function(value,name) {
	var Fns = {
		"mm":function(v){
			return Math.round(v/1000);
		},
		"hh":function(v){
			var x = v/1000;
			return Math.floor(20+(x/(30+x)*140))/20+"rem";
		},
        "size_k":function(v){
            return Math.round(v*100/1024)/100;
        }
	}
	if(!Fns[name]) return value;
	return Fns[name](value);
});
Handlebars.registerHelper("map",function(arr,index) {
	var new_arr = arr;
	if(!new_arr) return;
	for(var i=1;i<arguments.length-1;i++){
		if(!new_arr[arguments[i]]){
			continue;
		}
		new_arr = new_arr[arguments[i]]		
	}
	return new_arr;
});
Handlebars.registerHelper("setImImgSize",function(w,h) {
	var realW = 233*$(window).width()/375;
	var imgW = w;
	var imgH = h;
	if(w>realW){
		imgW = realW;
		imgH = imgW*h/w
	}
	return 'width:'+imgW+'px;height:'+imgH+'px;'
})
var conversation = WKim.conversation;
var message = WKim.message;
var user = WKim.user;
var convListener = WKim.conversationListener;
var msgListener = WKim.messageListener;
var follow = WKim.follow;
var upload = WKim.upload;
__app.imConversation = {};
__app.imChat = {};
__app.photos = [];
$(document).on("click",'.js-imphotobrower',function(){
	$.photoBrowser({
	    photos :__app.photos
	}).open($.inArray($(this).attr("src"),__app.photos))
})
__app.myWkim = function(config){
	this.config = $.extend(__app.myWkimDefaultConfig,config);
	this.myOpenId = WKim.auth.getOpenId();
	this.convlistDom = $(this.config.dom["convList"]);
	this.users = {};
	this.curMsgs = {};
	this.photos = [];
	this.init();
}
__app.myWkim.prototype = {
	template:function(html){
		return Handlebars.compile(html);
	},
	init:function(){

		var self = this;
		var token = sessionStorage["token"];
		if (token) {
	        token = JSON.parse(sessionStorage["token"]);
	        this.authLogin(token);
	    }else{
	    	this.getLoginInfo(function(res){
	    		self.authLogin(res.imSignModel);
	    	})
	    }
	},
	getUrlParam:function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg); 
        if (r != null) return unescape(r[2]); return null; 
    },
	getOpenIdByCid:function(cid){
		var self = this;
		var id = "";
		if(cid.indexOf(":")!=-1){	
			cid.split(":").forEach(function(item){
				if(item != self.myOpenId){
					id = item;
				}
			});
		}else{
			id = cid;
		}
		return id;
	},
	getLoginInfo:function(callback){
		$.ajax({
		    url: this.config.url.getImSignModel,
		    dataType: "json",
		    success: function(res) {
		        callback(res);
		    }
		});
	},
	authLogin:function(authInfo,type){
		var self = this;
		WKim.auth.login(authInfo).then(function(token) {
			
	       	self.myImConversationInit();
	        // 登录成功会返回token，需要自己保存，方便下次免登
	        if (token) {
	            sessionStorage["token"] = JSON.stringify(token);
	        }
	    },function(){
	    	console.log("login fail")
	        delete sessionStorage["token"];
	    });
	},
	getProfiles:function(openIds,callback){
		var self = this;
	    var result = [];
	    WKim.user.getProfiles(openIds).then(function(users) {
	        users.forEach(function(item) {
	           self.users[item.openId] = item;
	        });
	        callback(users)
	    })
	},
	setGenProfile:function(dom){
		var self = this;
	    dom.find("[data-nick]").each(function() {
	        var id = $(this).attr("data-nick");
	        var el = $(this);
	        self.getProfiles([id], function(res) {
	            if (res && res[0] && res[0].nick) {
	                el.text(res[0].nick);
	                el.removeAttr("data-nick")
	            }
	        })
	    });
	    dom.find("[data-avatar]").each(function() {
	        var id = $(this).attr("data-avatar");
	        var el = $(this);
	        self.getProfiles([id], function(res) {
	            if (res && res[0] && res[0].avatar) {
	            	el.css({"background-image":"url("+res[0].avatar+")"})
	            	//el.attr("src",res[0].avatar)
	                //el.html("<img src='" + res[0].avatar + "'  />");
	                el.removeAttr("data-avatar")
	            }
	        })
	    });
	},
	myImConversationInit:function(){
		var self = this;
		this.listConversation();
	},
	myImChatInit:function(){
		var self = this;
		var param = this.getUrlParam("cid");
    	var create = this.getUrlParam("create");
    	if(create){
    		return self.createConversation(param,function(conv){
    			conv.clearUnreadPoint();
    			self.getProfiles([conv.peerId()],function(){
    				self.chat(conv)
    			});
    		});
    	}else{
	    	conversation.get(param).then(function(conv){
	    		__app.imConv = conv;
	    		__app.imConv.clearUnreadPoint();
	    		self.chat(__app.imConv)
	    	});
    	}
  		$("#chatSendMsg").click(function(e){
    		self.enterINPUT = $($(e.target).data("target"));
    		self.enterValue = $.trim(self.enterINPUT.val());
    		if(self.enterValue==""){
    			return $.alert("发送内容不能为空！");
    		}
    		self.sendTxtMsg(self.enterValue);
    	})
	},
	updateConversationItem:function(res,callback){
		var self = this;
		var data = {
			data:this.doData([res])
		};
		var lastmsgDom = self.convlistDom.find('[href="#conversation_'+res.cid+'"]').parent("li");
		var _lihtml = $(self.template(self.config.template['listConversation'])(data));
		if(res.isSingleChat){
			this.setGenProfile(_lihtml);
		}
		if(lastmsgDom.length>0){
			lastmsgDom.prependTo(self.convlistDom);
			lastmsgDom.replaceWith(_lihtml);
		}else{
			this.convlistDom.prepend(_lihtml);
		}
		callback && callback(lastmsgDom)
	},
	doData:function(res){
		var self = this;
		$.map(res,function(item){
			if(item.isSingleChat){
				item.openId = self.getOpenIdByCid(item.cid)
			}
			if(item.lastMessages.length==0){
				item.hidden = 1;
			};
			return item;
		})
		return res;
	},
	createConversation:function(param,callback){
		var self = this;
        conversation.create({
            openIds: [param]
        }).then(function(conv) {
        	__app.imConv = conv;
        	callback && callback(conv);
        })
	},
	listConversation:function(){
		var self = this;
		conversation.list(0, 1000).then(function(res) {
			
			self.convlistDom.html(self.template(self.config.template['listConversation'])({
				data:self.doData(res)
			}));
			self.setGenProfile(self.convlistDom);
		})
		convListener.on("convAdd", function(res) {
	        console.log("convAdd")
	    });
	    convListener.on("convToFirst", function(cid) {
	    	if(cid == chat.cid){
	    		return;
	    	}
	    	//setHasMsgui(cid);
	    });
	    convListener.on("convSetTop", function(res) {
	       console.log("convSetTop")
	    });
	    convListener.on("convUnreadPointChange", function(res, value) {
	    	var convLi = self.convlistDom.find('[href="#conversation_'+res.cid+'"]');
	        var pot = convLi.find('.badge');
	        if(pot.length==0){
	        	pot = $('<span class="badge"></span>');
	        	convLi.find('.item-media').append(pot)
	        }
	        if(value==0){
	        	pot.remove()
	        }else{
	        	pot.text(value);
	        }
	        conversation.getTotalUnreadCount().then(function(num){
		    	if(self.config.dom.unreadPointTotal){
		    		$(self.config.dom.unreadPointTotal).text(num);
		    	}
		    });
	    });
	    convListener.on("convLastMessageChange", function(res, msg) {
	    	self.updateConversationItem(res,function(lastmsgDom){
	    		self.setGenProfile(lastmsgDom);
	    	})
	    });
	    convListener.on("convRemove", function(res) {
	        console.log("convRemove")
	    })
	},
	sendTxtMsg:function(value){
		var self = this;
		var msgOpt = {
		    content:{
	            contentType:1,
	            textContent:{
	                text:String(value)
	            }
	        }
	    }
		__app.imConv.sendMsg(msgOpt).then(function(res) {
			//console.log(res)
			self.enterINPUT.val("");
		});
		//chat.nodes.enterValue.val("");
	},
	mediaAudioInit:function(src){
		var curPayMedia = null;
		$('.im-audio[data-media-id]').each(function(){
			var Tag = $(this);
			var mediaId = $(this).attr("data-media-id");
			var mid = mediaId.replace("@",'').replace(".mp3","");
			var msgId = $(this).attr("data-msg-id");
			upload.trans(mediaId).then(function(d){
				var _meida = $('<audio controls="controls" style="display:none;"><source src="'+d+'" /></audio>').appendTo(Tag)[0];
				$(_meida).on("play",function(){
					$(this).parent(".im-audio").addClass("do");
					var _status = $(this).siblings(".im-audio-status");
					if(_status.length>0) _status.remove();
				});
				$(_meida).on("pause",function(){
					$(this).parent(".im-audio").removeClass("do");
				})
				Tag.removeAttr("data-media-id");
			})
		})
		$(document).on("click",".im-audio-content",function(e){
			var Tag = $(this);
			var media = Tag.find("audio")[0];
			if(curPayMedia && !curPayMedia.paused){
				curPayMedia.pause();
			}
			media.play();
		})
	},
	initPhotoBrow:function(){
		var self = this;
		var photos = [];
		$('.js-imphotobrower[imread]').each(function(item){
			photos.push($(this).attr("src"));
			$(this).removeAttr('imread')
		})
		this.photos = photos.concat(this.photos);
		__app.photos = this.photos;
	},
	chat:function(conv){
		var self = this;
		var dom = $(this.config.dom["chat"]);

		var title = conv.getTitle();
		if(conv.isSingleChat){
			this.getProfiles([title],function(res){
				if (res && res[0] && res[0].nick) {
	                $("title").html(res[0].nick);
	                var ttd = $("header.bar-nav .title");
	                if(ttd.length>0){
	                	ttd.html(res[0].nick);
	                }
	            }
			})
		}else{
			$("title").html(title);
            var ttd = $("header.bar-nav .title");
            if(ttd.length>0){
            	ttd.html(title);
            }
		}
		var pageSize = 20;
		var timer = false;
		var lastMsg = null;
		var resultMsg = {};
		__app.imConv = conv;
		__app.imChat.nextMsg = null;
		__app.imChat.prevMsg = null;
		__app.imChat.cid = conv.cid;
		msgListener.removeEvent();
		msgListener.on("msgReceive", function(res) {
			if (res.getConvId() !== __app.imChat.cid) {
	            return
	        }
	        if(resultMsg[res.getId()]){
	        	return;
	        }
	        resultMsg[res.getId()] = true;
	        if(!res.isMe()){
	        	__app.imConv.clearUnreadPoint()
	        }
	        if (lastMsg && (res.baseMessage.createdAt - lastMsg.baseMessage.createdAt < 15 * 1000 * 60)) {
	            res.hideTime = true
	        }
	        lastMsg = res;
	       	var data = {
	    		data:[res],
	    		myOpenId:self.myOpenId
	    	}
	    	dom.append(self.template(self.config.template['listChat'])(data));
	    	$('.infinite-scroll-top').scrollTop(9999);
	    	self.setGenProfile(dom)
		})
		msgListener.on("sendSuccess", function(res) {
			if(resultMsg[res.getId()]){
	        	return;
	        }
	        resultMsg[res.getId()] = true;
	        if (__app.imChat.prevMsg && (res.baseMessage.createdAt - lastMsg.baseMessage.createdAt < 15 * 1000 * 60)) {
	            res.hideTime = true
	        }
	        lastMsg = res;
	       	var data = {
	    		data:[res],
	    		myOpenId:self.myOpenId
	    	}
	    	dom.append(self.template(self.config.template['listChat'])(data));
	    	$('.infinite-scroll-top').scrollTop(9999);
	    	self.setGenProfile(dom)
		})
		msgListener.on("msgStatusChange", function(res) {
		})
		msgListener.on("sendFail", function(res) {
	        console.log(res)
	    });
	    __app.imChat.next = function(msg, num, callback) {
	        conv.listNextMessages(msg, num || 5).then(function(res) {
	            if (res.length == 0) {
	                return callback && callback(res)
	            }
	            if(res.length<pageSize){
	            	$('.infinite-scroll-preloader').hide();
	            }
	           	__app.imChat.nextMsg = res[0];
	            //Setting.chat.nextMsg = conv.getMsgById(conv.msgIds[0]);
	            __app.imChat.prevMsg = res[res.length - 1];
	            var baseTime = new Date().getTime();
	            var __res = $.map(res,function(item) {
	            	if($.inArray(item.baseMessage.content.contentType,[1,2,3])==-1){
	            		return null;
	            	}
		            if (item.baseMessage.createdAt-baseTime < 15 * 1000 * 60) {
		                item.hideTime = true;
		            }
		            baseTime = item.baseMessage.createdAt;
		            return item;
		        });
	            callback && callback(__res)
	        })
	    }
	    $(document).on('infinite', '.infinite-scroll-top',function() {
            var scroller = $('.infinite-scroll-top');
            var scrollHeight = scroller[0].scrollHeight; // 获取当前滚动元素的高度
            // 如果正在加载，则退出
            if (timer) {
              clearTimeout(timer);
            }

            // 模拟1s的加载过程
            timer = setTimeout(function() {

              //addItemsTop(itemsPerLoad,lastIndex);
             
             	__app.imChat.next(__app.imChat.nextMsg, pageSize, function(res) {
			    	var data = {
			    		data:res,
			    		myOpenId:self.myOpenId
			    	}
			    	dom.prepend(self.template(self.config.template['listChat'])(data));
			    	// 将滚动条的位置设置为最新滚动元素高度和之前的高度差
             		scroller.scrollTop(scroller[0].scrollHeight - scrollHeight);
             		self.setGenProfile(dom);
			   		self.mediaAudioInit(dom);
			   		self.initPhotoBrow(dom)
			    })
              	$.refreshScroller();
             
            }, 1000);
	    })
	    __app.imChat.next(null, pageSize, function(res) {

	    	var data = {
	    		data:res,
	    		myOpenId:self.myOpenId
	    	}
	    	lastMsg = res[res.length-1];
	    	dom.html(self.template(self.config.template['listChat'])(data));
	    	$('.infinite-scroll-top').scrollTop(9999);
	   		self.setGenProfile(dom);
	   		self.mediaAudioInit(dom);
	   		self.initPhotoBrow(dom);
	    })
	},
	//表情
	faceInit:function(ele){
		var popu = "#faceMainPopup";
		if($(popu).length==0){
			var str = '<div class="popup faceMainPopup" id="faceMainPopup"><div class="popop-facehd"><h1 class="title">添加表情</h1><a href="#" class="close-popup">关闭</a></div><div class="content-block"><div class="face-content">';
			$.each(__app.faceObj.name,function(index,item){
				str+='<span class="face-item" data-face="'+index+'">'+__app.faceObj.getFaceByName(index)+'</span>';
			})
			str+='</div></div></div>';
			$(str).appendTo("body");
		}
		var target = $("#imMsgTxtarea");
		$(document).on("click",ele,function(e){
			popu = $(this).data("popup");
			$.popup(popu);
		})
		$(document).on("click",".face-item",function(e){
			var face = $(this).data("face");
			target.val(target.val()+face);
			$.closeModal(popu);
		})
	}
};