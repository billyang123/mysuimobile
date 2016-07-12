
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
var isDev = false;
__app.chatHref = !isDev? "/im/conv":"/demo/messageschat/index.html";
__app.bindinfinite = false;
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
							'<li data-cid="{{cid}}">'+
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
	    		self.authLogin(isDev?res.imSignModel:res.ref);
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
		var lastmsgDom = self.convlistDom.find('[data-cid="'+res.cid+'"]');
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
			if($("#pageMessagesChat").length>0){
				self.myImChatInit();
			}
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
	           
	           	__app.imChat.nextMsg = conv.getMsgById(conv.msgIds[0]);
            	//__app.imChat.prevMsg = res[res.length - 1];
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
	    !__app.bindinfinite && $(document).on('infinite', '.infinite-scroll-top',function() {
            var scroller = $('.infinite-scroll-top');
            var scrollHeight = scroller[0].scrollHeight; // 获取当前滚动元素的高度
            // if(scroller.scrollTop()>=50){
            // 	return;
            // }
            // 如果正在加载，则退出
            if (timer) {
              clearTimeout(timer);
            }

            // 模拟1s的加载过程
            timer = setTimeout(function() {

              //addItemsTop(itemsPerLoad,lastIndex);
             
             	__app.imChat.next(__app.imChat.nextMsg, pageSize, function(res) {
             		if(res.length==0) {
             				// 加载完毕，则注销无限加载事件，以防不必要的加载
		                  $.detachInfiniteScroll($('.infinite-scroll'));
		                  // 删除加载提示符
		                  $('.infinite-scroll-preloader').remove();
             		};
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
	    __app.bindinfinite = true;
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