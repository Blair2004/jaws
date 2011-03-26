var jaws=function(c){var b,d;c.title=function(c){if(c)return b.innerHTML=c;return b.innerHTML};c.unpack=function(){["Sprite","SpriteList","Animation","Viewport","SpriteSheet","Parallax","TileMap","Rect","pressed"].forEach(function(b){window[b]?c.log(b+"already exists in global namespace"):window[b]=c[b]})};c.log=function(b,c){if(d)b+="<br />",d.innerHTML=c?d.innerHTML.toString()+b:b};c.init=function(){b=document.getElementsByTagName("title")[0];for(var e=c,f=[],j,g=window.location.href.slice(window.location.href.indexOf("?")+
1).split("&"),h=0;h<g.length;h++)j=g[h].split("="),f.push(j[0]),f[j[0]]=j[1];e.url_parameters=f;d=document.getElementById("jaws-log");if(c.url_parameters.debug&&!d)d=document.createElement("div"),d.style.cssText="overflow: auto; color: #aaaaaa; width: 300px; height: 150px; margin: 40px auto 0px auto; padding: 5px; border: #444444 1px solid; clear: both; font: 10px verdana; text-align: left;",document.body.appendChild(d);c.canvas=document.getElementsByTagName("canvas")[0];c.canvas?c.context=c.canvas.getContext("2d"):
(c.dom=document.getElementById("canvas"),c.dom.style.position="relative");c.width=c.canvas?c.canvas.width:c.dom.offsetWidth;c.height=c.canvas?c.canvas.height:c.dom.offsetHeigh};c.start=function(b,d){function j(b,d){c.log(d+"%: "+b,!0)}function g(b){c.log("Error loading: "+b)}function h(){c.log("all assets loaded",!0);b&&c.isFunction(b)&&(b=new b);b||(b=window);c.gameloop=new c.GameLoop(b.setup,b.update,b.draw,l);c.game_state=b;c.gameloop.start()}var l=d&&d.fps||60;c.init();c.log("setupInput()",!0);
c.setupInput();c.log("assets.loadAll()",!0);c.assets.length()>0?c.assets.loadAll({onload:j,onerror:g,onfinish:h}):h()};c.switchGameState=function(b){c.gameloop.stop();c.clearKeyCallbacks();c.isFunction(b)&&(b=new b);c.previous_game_state=c.game_state;c.game_state=b;c.gameloop=new c.GameLoop(b.setup,b.update,b.draw,c.gameloop.fps);c.gameloop.start()};c.forceArray=function(b){return Array.isArray(b)?b:[b]};c.clear=function(){c.context.clearRect(0,0,c.width,c.height)};c.isImage=function(b){return Object.prototype.toString.call(b)===
"[object HTMLImageElement]"};c.isCanvas=function(b){return Object.prototype.toString.call(b)==="[object HTMLCanvasElement]"};c.isDrawable=function(b){return c.isImage(b)||c.isCanvas(b)};c.isString=function(b){return typeof b=="string"};c.isArray=function(b){return b.constructor.toString().indexOf("Array")!=-1};c.isFunction=function(b){return Object.prototype.toString.call(b)==="[object Function]"};return c}(jaws||{});
jaws=function(c){var b={},d=[],e=[],f=[];c.setupInput=function(){var c=[];c[8]="backspace";c[9]="tab";c[13]="enter";c[16]="shift";c[17]="ctrl";c[18]="alt";c[19]="pause";c[20]="capslock";c[27]="esc";c[32]="space";c[33]="pageup";c[34]="pagedown";c[35]="end";c[36]="home";c[37]="left";c[38]="up";c[39]="right";c[40]="down";c[45]="insert";c[46]="delete";c[91]="leftwindowkey";c[92]="rightwindowkey";c[93]="selectkey";c[106]="multiply";c[107]="add";c[109]="subtract";c[110]="decimalpoint";c[111]="divide";c[144]=
"numlock";c[145]="scrollock";c[186]="semicolon";c[187]="equalsign";c[188]="comma";c[189]="dash";c[190]="period";c[191]="forwardslash";c[192]="graveaccent";c[219]="openbracket";c[220]="backslash";c[221]="closebracket";c[222]="singlequote";for(var h=["numpad1","numpad2","numpad3","numpad4","numpad5","numpad6","numpad7","numpad8","numpad9"],l=["f1","f2","f3","f4","f5","f6","f7","f8","f9"],m=["1","2","3","4","5","6","7","8","9"],n=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r",
"s","t","u","v","w","x","y","z"],k=0;m[k];k++)c[48+k]=m[k];for(k=0;n[k];k++)c[65+k]=n[k];for(k=0;h[k];k++)c[96+k]=h[k];for(k=0;l[k];k++)c[112+k]=l[k];d=c;window.onkeydown=function(c){event=c?c:window.event;var f=d[event.keyCode];b[f]=!0;e[f]&&(e[f](),c.preventDefault());j[f]&&c.preventDefault()};window.onkeyup=function(c){event=c?c:window.event;var e=d[event.keyCode];b[e]=!1;f[e]&&(f[e](),c.preventDefault());j[e]&&c.preventDefault()};window.onkeypress=function(){}};var j=[];c.preventDefaultKeys=function(b){b.forEach(function(b){j[b]=
!0})};c.pressed=function(c){return b[c]};c.on_keydown=function(b,d){if(c.isArray(b))for(var f=0;b[f];f++)e[b[f]]=d;else e[b]=d};c.on_keyup=function(b,d){if(c.isArray(b))for(var e=0;b[e];e++)f[b[e]]=d;else f[b]=d};c.clearKeyCallbacks=function(){f=[];e=[]};return c}(jaws||{});
jaws=function(c){function b(b){var c=document.createElement("canvas");c.src=b.src;c.width=b.width;c.height=b.height;c.getContext("2d").drawImage(b,0,0,b.width,b.height);return c}c.Assets=function(){this.loaded=[];this.loading=[];this.src_list=[];this.data=[];this.fuchia_to_transparent=this.image_to_canvas=!0;this.root="";this.file_type={};this.file_type.json="json";this.file_type.wav="audio";this.file_type.mp3="audio";this.file_type.ogg="audio";this.file_type.png="image";this.file_type.jpg="image";
this.file_type.jpeg="image";this.file_type.gif="image";this.file_type.bmp="image";this.file_type.tiff="image";var d=this;this.length=function(){return this.src_list.length};this.get=function(b){if(c.isArray(b))return b.map(function(b){return d.data[b]});else if(this.loaded[b])return this.data[b];else c.log("No such asset: "+b)};this.isLoading=function(b){return this.loading[b]};this.isLoaded=function(b){return this.loaded[b]};this.getPostfix=function(b){postfix_regexp=/\.([a-zA-Z]+)/;return postfix_regexp.exec(b)[1]};
this.getType=function(b){b=this.getPostfix(b);return this.file_type[b]?this.file_type[b]:b};this.add=function(b){if(c.isArray(b))for(var d=0;b[d];d++)this.add(b[d]);else b=this.root+b,this.src_list.push(b);return this};this.loadAll=function(b){this.error_count=this.load_count=0;this.onload=b.onload;this.onerror=b.onerror;this.onfinish=b.onfinish;for(i=0;this.src_list[i];i++)this.load(this.src_list[i])};this.getOrLoad=function(b,c,d){this.data[b]?c():this.load(b,c,d)};this.load=function(b,c,d){var g=
{};g.src=b;g.onload=c;g.onerror=d;this.loading[b]=!0;switch(this.getType(g.src)){case "image":b=g.src+"?"+parseInt(Math.random()*1E7);g.image=new Image;g.image.asset=g;g.image.onload=this.assetLoaded;g.image.onerror=this.assetError;g.image.src=b;break;case "audio":b=g.src+"?"+parseInt(Math.random()*1E7);g.audio=new Audio(b);g.audio.asset=g;this.data[g.src]=g.audio;g.audio.addEventListener("canplay",this.assetLoaded,!1);g.audio.addEventListener("error",this.assetError,!1);g.audio.load();break;default:b=
g.src+"?"+parseInt(Math.random()*1E7),c=new XMLHttpRequest,c.asset=g,c.onreadystatechange=this.assetLoaded,c.open("GET",b,!0),c.send(null)}};this.assetLoaded=function(){var e=this.asset,f=e.src,j=d.getType(e.src);d.loaded[f]=!0;d.loading[f]=!1;if(j=="json"){if(this.readyState!=4)return;d.data[e.src]=JSON.parse(this.responseText)}else if(j=="image"){f=d.image_to_canvas?b(e.image):e.image;if(d.fuchia_to_transparent&&d.getPostfix(e.src)=="bmp"){canvas=c.isImage(f)?b(f):f;f=canvas.getContext("2d");j=
f.getImageData(0,0,canvas.width,canvas.height);for(var g=j.data,h=0;h<g.length;h+=4)g[h]==255&&g[h+1]==0&&g[h+2]==255&&(g[h+3]=0);f.putImageData(j,0,0);f=canvas}d.data[e.src]=f}else if(j=="audio")e.audio.removeEventListener("canplay",d.assetLoaded,!1),d.data[e.src]=e.audio;d.load_count++;if(e.onload)e.onload();d.processCallbacks(e)};this.assetError=function(){var b=this.asset;d.error_count++;if(b.onerror)b.onerror(b);d.processCallbacks(b)};this.processCallbacks=function(b){var c=parseInt((d.load_count+
d.error_count)/d.src_list.length*100);if(d.onload)d.onload(b.src,c);if(c==100){if(d.onfinish)d.onfinish();d.onload=null;d.onerror=null;d.onfinish=null}}};c.assets=new c.Assets;return c}(jaws||{});
jaws=function(c){function b(b){this.size=b;this.values=Array(this.size);this.add=function(b){if(this.values.length>this.size){this.values.splice(0,1);for(var c=this.value=0;this.values[c];c++)this.value+=this.values[c];this.value/=this.size}this.values.push(b);return this};this.get=function(){return parseInt(this.value)}}c.GameLoop=function(d,e,f,j){this.fps=this.tick_duration=this.ticks=0;var g,h=!1,l=this,m=new b(20);this.start=function(){c.log("gameloop start",!0);this.current_tick=(new Date).getTime();
this.last_tick=(new Date).getTime();d&&d();g=setInterval(this.loop,1E3/j);c.log("gameloop loop",!0)};this.loop=function(){l.current_tick=(new Date).getTime();l.tick_duration=l.current_tick-l.last_tick;l.fps=m.add(1E3/l.tick_duration).get();h||(e&&e(),f&&f(),l.ticks++);l.last_tick=l.current_tick};this.pause=function(){h=!0};this.unpause=function(){h=!1};this.stop=function(){g&&clearInterval(g)}};return c}(jaws||{});
jaws=function(c){c.Rect=function(b,c,e,f){this.x=b;this.y=c;this.width=e;this.height=f;this.right=b+e;this.bottom=c+f};c.Rect.prototype.getPosition=function(){return[this.x,this.y]};c.Rect.prototype.move=function(b,c){this.x+=b;this.y+=c;this.right+=b;this.bottom+=c};c.Rect.prototype.moveTo=function(b,c){this.x=b;this.y=c;this.right=this.x+this.width;this.bottom=this.y+this.height;return this};c.Rect.prototype.resize=function(b,c){this.width+=b;this.height+=c;this.right=this.x+this.width;this.bottom=
this.y+this.height;return this};c.Rect.prototype.resizeTo=function(b,c){this.width=b;this.height=c;this.right=this.x+this.width;this.bottom=this.y+this.height;return this};c.Rect.prototype.draw=function(){c.context.strokeStyle="red";c.context.strokeRect(this.x,this.y,this.width,this.height);return this};c.Rect.prototype.collidePoint=function(b,c){return b>=this.x&&b<=this.right&&c>=this.y&&c<=this.bottom};c.Rect.prototype.collideRect=function(b){return(this.x>=b.x&&this.x<=b.right||b.x>=this.x&&b.x<=
this.right)&&(this.y>=b.y&&this.y<=b.bottom||b.y>=this.y&&b.y<=this.bottom)};c.Rect.prototype.toString=function(){return"[Rect "+this.x+", "+this.y+", "+this.width+", "+this.height+"]"};return c}(jaws||{});if(typeof module!=="undefined"&&"exports"in module)module.exports=jaws.TileMap;
jaws=function(c){c.Sprite=function(b){this.options=b;this.set(b);(this.context=b.context||c.context)||this.createDiv()};c.Sprite.prototype.set=function(b){this.scale_factor_x=this.scale_factor_y=b.scale||1;if(!b.anchor_x==void 0)this.anchor_x=b.anchor_x;if(!b.anchor_y==void 0)this.anchor_y=b.anchor_y;this.x=b.x||0;this.y=b.y||0;this.alpha=b.alpha||1;this.angle=b.angle||0;this.flipped=b.flipped||!1;this.anchor(b.anchor||"top_left");b.image&&this.setImage(b.image);this.cacheOffsets();return this};c.Sprite.prototype.setImage=
function(b){var d=this;if(c.isDrawable(b))return this.image=b,this.cacheOffsets();else c.assets.isLoaded(b)?(this.image=c.assets.get(b),this.cacheOffsets()):c.assets.load(b,function(){d.image=c.assets.get(b);d.cacheOffsets()});return this};c.Sprite.prototype.flip=function(){this.flipped=this.flipped?!1:!0;return this};c.Sprite.prototype.flipTo=function(b){this.flipped=b;return this};c.Sprite.prototype.rotate=function(b){this.angle+=b;return this};c.Sprite.prototype.rotateTo=function(b){this.angle=
b;return this};c.Sprite.prototype.moveTo=function(b,c){this.x=b;this.y=c;return this};c.Sprite.prototype.move=function(b,c){b&&(this.x+=b);c&&(this.y+=c);return this};c.Sprite.prototype.scale=function(b){this.scale_factor_x*=b;this.scale_factor_y*=b;return this.cacheOffsets()};c.Sprite.prototype.scaleTo=function(b){this.scale_factor_x=this.scale_factor_y=b;return this.cacheOffsets()};c.Sprite.prototype.scaleWidth=function(b){this.scale_factor_x*=b;return this.cacheOffsets()};c.Sprite.prototype.scaleHeight=
function(b){this.scale_factor_y*=b;return this.cacheOffsets()};c.Sprite.prototype.setX=function(b){this.x=b;return this};c.Sprite.prototype.setY=function(b){this.y=b;return this};c.Sprite.prototype.setWidth=function(b){this.scale_factor_x=b/this.image.width;return this.cacheOffsets()};c.Sprite.prototype.setHeight=function(b){this.scale_factor_y=b/this.image.height;return this.cacheOffsets()};c.Sprite.prototype.resize=function(b,c){this.scale_factor_x=(this.width+b)/this.image.width;this.scale_factor_y=
(this.height+c)/this.image.height;return this.cacheOffsets()};c.Sprite.prototype.resizeTo=function(b,c){this.scale_factor_x=b/this.image.width;this.scale_factor_y=c/this.image.height;return this.cacheOffsets()};c.Sprite.prototype.anchor=function(b){if(a={top_left:[0,0],left_top:[0,0],center_left:[0,0.5],left_center:[0,0.5],bottom_left:[0,1],left_bottom:[0,1],top_center:[0.5,0],center_top:[0.5,0],center_center:[0.5,0.5],center:[0.5,0.5],bottom_center:[0.5,1],center_bottom:[0.5,1],top_right:[1,0],right_top:[1,
0],center_right:[1,0.5],right_center:[1,0.5],bottom_right:[1,1],right_bottom:[1,1]}[b])this.anchor_x=a[0],this.anchor_y=a[1],this.image&&this.cacheOffsets();return this};c.Sprite.prototype.cacheOffsets=function(){if(this.image)return this.width=this.image.width*this.scale_factor_x,this.height=this.image.height*this.scale_factor_y,this.left_offset=this.width*this.anchor_x,this.top_offset=this.height*this.anchor_y,this.right_offset=this.width*(1-this.anchor_x),this.bottom_offset=this.height*(1-this.anchor_y),
this.cached_rect&&this.cached_rect.resizeTo(this.width,this.height),this};c.Sprite.prototype.rect=function(){if(!this.cached_rect)this.cached_rect=new c.Rect(this.x,this.top,this.width,this.height);this.cached_rect.moveTo(this.x-this.left_offset,this.y-this.top_offset);return this.cached_rect};c.Sprite.prototype.createDiv=function(){this.div=document.createElement("div");this.div.style.position="absolute";if(this.image)this.div.style.width=this.image.width+"px",this.div.style.height=this.image.height+
"px",this.div.style.backgroundImage="url("+this.image.src+")";c.dom&&c.dom.appendChild(this.div);this.updateDiv()};c.Sprite.prototype.updateDiv=function(){this.div.style.left=this.x+"px";this.div.style.top=this.y+"px";var b="";b+="rotate("+this.angle+"deg) ";b+=this.flipped?"scale(-"+this.scale_factor_x+","+this.scale_factor_y+")":"scale("+this.scale_factor_x+","+this.scale_factor_y+")";this.div.style.MozTransform=b;this.div.style.WebkitTransform=b;this.div.style.transform=b;return this};c.Sprite.prototype.draw=
function(){if(!this.image)return this;if(c.dom)return this.updateDiv();this.context.save();this.context.translate(this.x,this.y);this.angle!=0&&c.context.rotate(this.angle*Math.PI/180);this.flipped&&this.context.scale(-1,1);this.context.globalAlpha=this.alpha;this.context.translate(-this.left_offset,-this.top_offset);this.context.drawImage(this.image,0,0,this.width,this.height);this.context.restore();return this};c.Sprite.prototype.asCanvasContext=function(){var b=document.createElement("canvas");
b.width=this.width;b.height=this.height;b=b.getContext("2d");b.mozImageSmoothingEnabled=c.context.mozImageSmoothingEnabled;b.drawImage(this.image,0,0,this.width,this.height);return b};c.Sprite.prototype.toString=function(){return"[Sprite "+this.x+", "+this.y+","+this.width+","+this.height+"]"};return c}(jaws||{});
jaws=function(c){c.SpriteList=function(){};c.SpriteList.prototype=[];c.SpriteList.prototype.remove=function(b){b=this.indexOf(b);b>-1&&this.splice(b,1)};c.SpriteList.prototype.draw=function(){for(i=0;this[i];i++)this[i].draw()};c.SpriteList.prototype.drawIf=function(b){for(i=0;this[i];i++)b(this[i])&&this[i].draw()};c.SpriteList.prototype.update=function(){for(i=0;this[i];i++)this[i].update()};c.SpriteList.prototype.updateIf=function(b){for(i=0;this[i];i++)b(this[i])&&this[i].update()};c.SpriteList.prototype.deleteIf=
function(b){for(var c=0;this[c];c++)b(this[c])&&this.splice(c,1)};c.SpriteList.prototype.toString=function(){return"[SpriteList "+this.length+" sprites]"};return c}(jaws||{});
jaws=function(c){function b(b,c,f,j,g){var h=document.createElement("canvas");h.width=j;h.height=g;h.getContext("2d").drawImage(b,c,f,j,g,0,0,h.width,h.height);return h}c.SpriteSheet=function(d){this.image=c.isDrawable(d.image)?d.image:c.assets.data[d.image];this.orientation=d.orientation||"right";this.frame_size=d.frame_size||[32,32];this.frames=[];for(d=0;d<this.image.width;d+=this.frame_size[0])for(var e=0;e<this.image.height;e+=this.frame_size[1])this.frames.push(b(this.image,d,e,this.frame_size[0],
this.frame_size[1]))};c.SpriteSheet.prototype.toString=function(){return"[SpriteSheet "+this.frames.length+" frames]"};return c}(jaws||{});
jaws=function(c){c.Parallax=function(b){this.scale=b.scale||1;this.repeat_x=b.repeat_x;this.repeat_y=b.repeat_y;this.camera_x=b.camera_x||0;this.camera_y=b.camera_y||0;this.layers=[]};c.Parallax.prototype.draw=function(){for(var b,d,e,f=0;f<this.layers.length;f++){b=this.layers[f];d=b.x;e=b.y;b.x=-(this.camera_x/b.damping);for(b.y=-(this.camera_y/b.damping);this.repeat_x&&b.x>0;)b.x-=b.width;for(;this.repeat_y&&b.y>0;)b.y-=b.width;for(;this.repeat_x&&b.x<c.width;){for(;this.repeat_y&&b.y<c.height;)b.draw(),
b.y+=b.height;b.y=e;b.draw();b.x+=b.width-1}for(;b.repeat_y&&!b.repeat_x&&b.y<c.height;)b.draw(),b.y+=b.height;b.x=d}};c.Parallax.prototype.addLayer=function(b){b=new c.ParallaxLayer(b);b.scale(this.scale);this.layers.push(b)};c.Parallax.prototype.toString=function(){return"[Parallax "+this.x+", "+this.y+". "+this.layers.length+" layers]"};c.ParallaxLayer=function(b){this.damping=b.damping||0;c.Sprite.call(this,b)};c.ParallaxLayer.prototype=c.Sprite.prototype;c.Parallax.prototype.toString=function(){return"[ParallaxLayer "+
this.x+", "+this.y+"]"};return c}(jaws||{});
jaws=function(c){c.Animation=function(b){this.options=b;this.frames=b.frames||[];this.frame_duration=b.frame_duration||100;this.index=b.index||0;this.loop=b.loop||1;this.bounce=b.bounce||0;this.frame_direction=1;if(b.sprite_sheet){var d=c.isDrawable(b.sprite_sheet)?b.sprite_sheet:c.assets.get(b.sprite_sheet);this.frames=(new c.SpriteSheet({image:d,frame_size:b.frame_size})).frames}this.current_tick=(new Date).getTime();this.last_tick=(new Date).getTime();this.sum_tick=0};c.Animation.prototype.update=
function(){this.current_tick=(new Date).getTime();this.sum_tick+=this.current_tick-this.last_tick;this.last_tick=this.current_tick;if(this.sum_tick>this.frame_duration)this.index+=this.frame_direction,this.sum_tick=0;if(this.index>=this.frames.length||this.index<=0)if(this.bounce)this.frame_direction=-this.frame_direction,this.index+=this.frame_direction*2;else if(this.loop)this.index=0;return this};c.Animation.prototype.slice=function(b,d){var e={};e.frame_duration=this.frame_duration;e.loop=this.loop;
e.bounce=this.bounce;e.frame_direction=this.frame_direction;e.frames=this.frames.slice().slice(b,d);return new c.Animation(e)};c.Animation.prototype.next=function(){this.update();return this.frames[this.index]};c.Animation.prototype.currentFrame=function(){return this.frames[this.index]};c.Animation.prototype.toString=function(){return"[Animation, "+this.frames.length+" frames]"};return c}(jaws||{});
jaws=function(c){c.Viewport=function(b){this.options=b;this.context=b.context||c.context;this.width=b.width||c.width;this.height=b.height||c.height;this.max_x=b.max_x||c.width;this.max_y=b.max_y||c.height;this.verifyPosition=function(){var b=this.max_x-this.width;if(this.x<0)this.x=0;if(this.x>b)this.x=b;b=this.max_y-this.height;if(this.y<0)this.y=0;if(this.y>b)this.y=b};this.move=function(b,c){b&&(this.x+=b);c&&(this.y+=c);this.verifyPosition()};this.moveTo=function(b,c){if(b!=void 0)this.x=b;if(c!=
void 0)this.y=c;this.verifyPosition()};this.isOutside=function(b){return!this.isInside(b)};this.isInside=function(b){return b.x>=this.x&&b.x<=this.x+this.width&&b.y>=this.y&&b.y<=this.y+this.height};this.centerAround=function(b){this.x=b.x-this.width/2;this.y=b.y-this.height/2;this.verifyPosition()};this.apply=function(b){this.context.save();this.context.translate(-this.x,-this.y);b();this.context.restore()};this.moveTo(b.x||0,b.y||0)};c.Viewport.prototype.toString=function(){return"[Viewport "+this.x+
", "+this.y+","+this.width+","+this.height+"]"};return c}(jaws||{});
jaws=function(c){c.TileMap=function(b){this.cell_size=b.cell_size||[32,32];this.size=b.size;this.cells=Array(this.size[0]);for(b=0;b<this.size[0];b++){this.cells[b]=Array(this.size[1]);for(var c=0;c<this.size[1];c++)this.cells[b][c]=[]}};c.TileMap.prototype.clear=function(){for(var b=0;b<this.size[0];b++)for(var c=0;c<this.size[1];c++)this.cells[b][c]=[]};c.TileMap.prototype.push=function(b){if(Array.isArray(b)){for(var c=0;c<b.length;c++)this.push(b[c]);return b}if(b.rect)return this.pushAsRect(b,
b.rect());else{c=parseInt(b.x/this.cell_size[0]);var e=parseInt(b.y/this.cell_size[1]);return this.pushToCell(c,e,b)}};c.TileMap.prototype.pushAsPoint=function(b){if(Array.isArray(b)){for(var c=0;c<b.length;c++)this.pushAsPoint(b[c]);return b}else{c=parseInt(b.x/this.cell_size[0]);var e=parseInt(b.y/this.cell_size[1]);return this.pushToCell(c,e,b)}};c.TileMap.prototype.pushAsRect=function(b,c){for(var e=parseInt(c.x/this.cell_size[0]),f=parseInt((c.right-1)/this.cell_size[0]);e<=f;e++)for(var j=parseInt(c.y/
this.cell_size[1]),g=parseInt((c.bottom-1)/this.cell_size[1]);j<=g;j++)this.pushToCell(e,j,b);return b};c.TileMap.prototype.pushToCell=function(b,c,e){return this.cells[b][c].push(e)};c.TileMap.prototype.at=function(b,c){var e=parseInt(b/this.cell_size[0]),f=parseInt(c/this.cell_size[1]);return this.cells[e][f]};c.TileMap.prototype.atRect=function(b){for(var c=[],e=parseInt(b.x/this.cell_size[0]),f=parseInt(b.right/this.cell_size[0]);e<=f;e++)for(var j=parseInt(b.y/this.cell_size[1]),g=parseInt(b.bottom/
this.cell_size[1]);j<=g;j++){var h=this.cells[e][j];h&&(Array.isArray(h)?h.forEach(function(b){c.indexOf(b)==-1&&c.push(b)}):c.indexOf(h)==-1&&c.push(h))}return c};c.TileMap.prototype.cell=function(b,c){return this.cells[b][c]};c.TileMap.prototype.toString=function(){return"[TileMap "+this.size[0]+" cols, "+this.size[1]+" rows]"};return c}(jaws||{});if(typeof module!=="undefined"&&"exports"in module)module.exports=jaws.TileMap;
