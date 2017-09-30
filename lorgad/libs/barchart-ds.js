!function(t){function e(s){if(i[s])return i[s].exports;var a=i[s]={i:s,l:!1,exports:{}};return t[s].call(a.exports,a,a.exports,e),a.l=!0,a.exports}var i={};e.m=t,e.c=i,e.i=function(t){return t},e.d=function(t,i,s){e.o(t,i)||Object.defineProperty(t,i,{configurable:!1,enumerable:!0,get:s})},e.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(i,"a",i),i},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=4)}([function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),i(2);var s=i(1),a=function(t){return t&&t.__esModule?t:{default:t}}(s),r={version:"1.0.8",build:1503781837740},n=Vizabi.Tool.extend("BarChartDS",{init:function(t,e){this.name="barchartds",this.components=[{component:a.default,placeholder:".vzb-tool-viz",model:["state.time","state.marker","state.marker_order","state.entities","state.entities_side","state.entities_allpossible","state.entities_geodomain","locale","ui"]},{component:Vizabi.Component.get("timeslider"),placeholder:".vzb-tool-timeslider",model:["state.time","state.entities","state.marker","ui"]},{component:Vizabi.Component.get("dialogs"),placeholder:".vzb-tool-dialogs",model:["state","ui","locale"]},{component:Vizabi.Component.get("buttonlist"),placeholder:".vzb-tool-buttonlist",model:["state","ui","locale"]},{component:Vizabi.Component.get("treemenu"),placeholder:".vzb-tool-treemenu",model:["state.marker","state.marker_tags","state.time","locale"]},{component:Vizabi.Component.get("datanotes"),placeholder:".vzb-tool-datanotes",model:["state.marker","locale"]},{component:Vizabi.Component.get("steppedspeedslider"),placeholder:".vzb-tool-stepped-speed-slider",model:["state.time","locale"]}],this._super(t,e)},validate:function(t){if(t=this.model||t,this._super(t),!this.model){var e=t.state.entities;if(Object.keys(e.show).length>0){var i={};e.show[e.dim]&&1!==Object.keys(e.show).length&&(i[e.dim]=e.show[e.dim]),e.show[e.dim]&&1==Object.keys(e.show).length||(e.show=i)}var s=t.state.entities_geodomain;s.skipFilter=t.state.entities.dim===s.dim||t.state.entities_side.dim===s.dim}},default_model:{state:{marker_tags:{}},ui:{chart:{stacked:!0,inpercent:!1,flipSides:!0},buttons:["colors","inpercent","find","side","moreoptions","fullscreen"],dialogs:{popup:["timedisplay","colors","find","side","moreoptions"],sidebar:["timedisplay","colors","find"],moreoptions:["opacity","speed","colors","side","presentation","about"]},presentation:!1},locale:{}},versionInfo:r});e.default=n},function(t,e,i){"use strict";function s(t){if(Array.isArray(t)){for(var e=0,i=Array(t.length);e<t.length;e++)i[e]=t[e];return i}return Array.from(t)}Object.defineProperty(e,"__esModule",{value:!0});var a=Vizabi,r=a.utils,n=a.Component,o=a.helpers["d3.axisWithLabelPicker"],l=a.iconset.question,h=n.extend("barchartds",{init:function(t,e){this.name="barchartds",this.template=i(3),this.model_expects=[{name:"time",type:"time"},{name:"marker",type:"model"},{name:"marker_order",type:"model"},{name:"entities",type:"entities"},{name:"entities_side",type:"entities"},{name:"entities_allpossible",type:"entities"},{name:"entities_geodomain",type:"entities"},{name:"locale",type:"locale"},{name:"ui",type:"ui"}];var s=this;this.model_binds={"change:time.value":function(t){if(s._readyOnce){if(1!=s.model.time.step&&!s.snapped&&!s.model.time.playing&&!s.model.time.dragging){var e=d3.bisectLeft(s.timeSteps,s.model.time.value);if(0!=e&&s.timeSteps[e]-s.model.time.value){s.snapped=!0;var i=s.model.time.value,a=s.timeSteps[e-1];e=s.timeSteps[e];var r=i-a<e-i?a:e;s.model.time.value=new Date(r)}}s.snapped||s.model.marker.getFrame(s.model.time.value,function(t){s.frame=t,s.frameAxisX=t.axis_x,s.model.marker_order.getFrame(s.model.time.value,function(t){s.frameOrder=t.hook_order,s._reorderBars(),s._updateEntities(!0),s.updateBarsOpacity()})}),s.snapped=!1}},"change:marker":function(t,e){if(s._readyOnce)return e.indexOf("scaleType")>-1?void s.ready():void 0},"change:marker.select":function(t){s.someSelected=s.model.marker.select.length>0,s.nonSelectedOpacityZero=!1,s.updateBarsOpacity()},"change:marker.highlight":function(t,e){s._readyOnce&&s._highlightBars()},"change:marker.opacitySelectDim":function(){s.updateBarsOpacity()},"change:marker.opacityRegular":function(){s.updateBarsOpacity()},"change:marker.color.palette":function(t){s._readyOnce&&s._updateEntities()},"change:marker.color.scaleType":function(t){s._readyOnce&&s._updateEntities()},"change:marker.color.which":function(t){s._readyOnce&&(s.model.marker_order.hook_order.which=s.model.marker.color.which)},"change:marker.side.which":function(t){if(s._readyOnce){var e=void 0,i={},a={};if("constant"==s.model.marker.side.use)e=null;else{var r=s.model.marker.side.getConceptprops();e="entity_set"==r.concept_type?r.domain:s.model.marker.side.which}s.model.marker.side.clearSideState();var n=e!==s.geoDomainDimension;n||(i["is--"+s.model.marker.side.which]=!0),s.model.entities_side.skipFilter=n,a.show=i,a.dim=e,s.model.entities_side.set(a),s.model.entities_geodomain.skipFilter=(e===s.geoDomainDimension||s.STACKDIM===s.geoDomainDimension)&&(Boolean(s.model.entities.getFilteredEntities().length)||!s.model.entities_side.skipFilter)}},"change:entities.show":function(t){if(s._readyOnce){if(s.model.entities.dim===s.model.entities_side.dim&&!r.isEmpty(s.model.entities_side.show)){var e=s.model.entities_side.getFilteredEntities().filter(function(t){return!s.model.entities.isShown(t)});e.length&&(s.model.marker.side.clearSideState(),s.model.entities_side.showEntity(e))}s.model.entities_geodomain.skipFilter=(s.SIDEDIM===s.geoDomainDimension||s.STACKDIM===s.geoDomainDimension)&&(Boolean(s.model.entities.getFilteredEntities().length)||!s.model.entities_side.skipFilter)}},"change:entities_side.show":function(t){if(s._readyOnce){var e=!1,i=null;if(r.forEach(s.model.marker.side._space,function(t){t.dim===s.model.entities_side.dim&&t._name!==s.model.entities_side._name&&t._name!==s.model.entities_geodomain._name&&(i=t)}),i){s.model.entities.getFilteredEntities();var a=s.model.entities_side.getFilteredEntities().filter(function(t){return!i.isShown(t)});a.length&&(i.showEntity(a),e=!0)}s.SIDEDIM!==s.model.entities_side.dim&&(e=!0),e||(s._updateIndicators(),s.model.ready&&s.frame&&(s._updateLimits(),s.resize(),s._updateEntities(!0)))}},"change:ui.chart.inpercent":function(t){s._readyOnce&&(s._updateLimits(),s.resize(),s._updateEntities())},"change:ui.chart.flipSides":function(t){s._readyOnce&&(s.model.marker.side.switchSideState(),s._updateIndicators(),s.resize(),s._updateEntities(!0))}},this._super(t,e),this.xScale=null,this.yScale=null,this.cScale=null,this.xAxis=o("bottom"),this.xAxisLeft=o("bottom"),this.yAxis=o("left"),this.xScales=[],this.totalFieldName="Total"},checkDimensions:function(){var t=this.model.entities.dim,e=this.model.entities_side.dim;this.colorUseNotProperty="constant"==this.model.marker.color.use||this.model.marker.color.which==this.TIME,this.stackSkip=t==e,this.geoLess=t!==this.geoDomainDimension&&e!==this.geoDomainDimension,this.sideSkip="constant"==this.model.marker.side.use},readyOnce:function(){var t=this;this.el=this.el?this.el:d3.select(this.element),this.element=this.el,this.interaction=this._interaction(),this.graph=this.element.select(".vzb-bc-graph"),this.yAxisEl=this.graph.select(".vzb-bc-axis-y"),this.xAxisEl=this.graph.select(".vzb-bc-axis-x"),this.xAxisLeftEl=this.graph.select(".vzb-bc-axis-x-left"),this.xTitleEl=this.element.select(".vzb-bc-axis-x-title"),this.xInfoEl=this.element.select(".vzb-bc-axis-x-info"),this.yTitleEl=this.graph.select(".vzb-bc-axis-y-title"),this.barsCrop=this.graph.select(".vzb-bc-bars-crop"),this.labelsCrop=this.graph.select(".vzb-bc-labels-crop"),this.bars=this.graph.select(".vzb-bc-bars"),this.labels=this.graph.select(".vzb-bc-labels"),this.labels.select(".vzb-bc-stack").attr("y",-10),this.title=this.element.select(".vzb-bc-title"),this.titleRight=this.element.select(".vzb-bc-title-right"),this.year=this.element.select(".vzb-bc-year"),this.geoDomainDimension=this.model.entities_geodomain.getDimension(),this.geoDomainDefaultValue=((this.model.entities_geodomain.show[this.geoDomainDimension]||{}).$in||{})[0],t.someSelected=t.model.marker.select.length>0,t.nonSelectedOpacityZero=!1,this.on("resize",function(){t._updateEntities()}),this._attributeUpdaters={_newWidth:function(e,i){e.x_=0;var s=r.getValueMD(e,t.frameAxisX,t.KEYS);return e.width_=s?t.xScale(s):0,t.ui.chart.inpercent&&(e.width_/=t.total[e[t.PREFIXEDSIDEDIM]]),e.width_},_newX:function(t,e){var i=this.previousSibling;if(i){var s=d3.select(i).datum();t.x_=s.x_+s.width_}else t.x_=0;return t.x_},_newColor:function(e,i){return t.cScale(t.colorUseNotProperty?t.frame.color[e[t.STACKDIM]]:(t.frame.color[e[t.STACKDIM]]||{})[e[t.PREFIXEDSIDEDIM]])}}},ready:function(){var t=this;if(this.model.marker._ready){var e=this;this.timeSteps=this.model.time.getAllSteps(),this.TIME=this.model.marker._getFirstDimension({type:"time"}),this.KEYS=r.unique(this.model.marker._getAllDimensions({exceptType:"time"})),this.side=this.model.marker.label_side.getEntity(),this.SIDEDIM=this.side.getDimension(),this.PREFIXEDSIDEDIM="side_"+this.SIDEDIM,this.stack=this.model.marker.axis_y.getEntity(),this.STACKDIM=this.stack.getDimension(),this.PREFIXEDSTACKDIM="stack_"+this.STACKDIM,this.TIMEDIM=this.model.time.getDimension(),this.checkDimensions(),this.updateUIStrings(),this._updateIndicators(),this.frame=null,this.model.marker.getFrame(e.model.time.value,function(i){e.frame=i,e.frameAxisX=i.axis_x,e.model.marker_order.getFrame(e.model.time.value,function(i){e.frameOrder=i.hook_order,e._createLimits(),e._updateLimits(),e._reorderBars(),e.markers=t.model.marker.getKeys(e.STACKDIM),e.resize(),e._updateEntities(!0),e.updateBarsOpacity()})})}},updateUIStrings:function(){var t=this;this.translator=this.model.locale.getTFunction();var e=this.xTitleEl.selectAll("text").data([0]);e.enter().append("text"),e.on("click",function(){t.parent.findChildByName("gapminder-treemenu").markerID("axis_x").alignX(t.model.locale.isRTL()?"right":"left").alignY("top").updateView().toggle()});var i=this.model.marker.axis_x.getConceptprops();r.setIcon(this.xInfoEl,l).select("svg").attr("width","0px").attr("height","0px").style("opacity",Number(Boolean(i.description||i.sourceLink))),this.xInfoEl.on("click",function(){t.parent.findChildByName("gapminder-datanotes").pin()}),this.xInfoEl.on("mouseover",function(){if(!t.model.time.dragging){var e=this.getBBox(),i=r.makeAbsoluteContext(this,this.farthestViewportElement)(e.x-10,e.y+e.height+10),s=t.root.element.getBoundingClientRect(),a=t.element.node().getBoundingClientRect();t.parent.findChildByName("gapminder-datanotes").setHook("axis_x").show().setPos(i.x+a.left-s.left,i.y)}}),this.xInfoEl.on("mouseout",function(){t.model.time.dragging||t.parent.findChildByName("gapminder-datanotes").hide()})},_updateIndicators:function(){var t=this,e=this;this.duration=this.model.time.delayAnimations,this.yScale=this.model.marker.axis_y.getScale(),this.xScale=this.model.marker.axis_x.getScale(),this.yAxis.tickFormat(e.model.marker.axis_y.getTickFormatter()),this.xAxis.tickFormat(e.model.marker.axis_x.getTickFormatter()),this.xAxisLeft.tickFormat(e.model.marker.axis_x.getTickFormatter());var i=this.SIDEDIM,s=this.STACKDIM,a=this.model.marker.getKeys(s),n=[];n=a.map(function(t){return t[s]}),this.stackKeys=n;var o=this.model.marker.label_side.getItems(),l=[];if(!r.isEmpty(o)){var h=!!this.model.marker.side.getEntity().show[i];if(l=this.model.marker.getKeys(i).filter(function(e){return!h||t.model.marker.side.getEntity().isShown(e)}).map(function(t){return t[i]}),l.length>2&&(l.length=2),l.length>1){var c=this.ui.chart.flipSides?d3.ascending:d3.descending;l.sort(c)}}if(l.length||l.push("undefined"),this.sideKeys=l,this.twoSided=this.sideKeys.length>1,this.titleRight.classed("vzb-hidden",!this.twoSided),this.twoSided)this.xScaleLeft=this.xScale.copy(),this.title.text(o[this.sideKeys[1]]),this.titleRight.text(o[this.sideKeys[0]]);else{var d=this.sideKeys.length&&o[this.sideKeys[0]]?o[this.sideKeys[0]]:"";this.title.text(d)}this.cScale=this.model.marker.color.getScale()},_reorderBars:function(){var t=this,e=this.yScale.domain(),i=this.sideKeys;e.sort(function(e,s){var a=d3.ascending(t.frameOrder[e]||0,t.frameOrder[s]||0);return 0!==a?a:d3.ascending((t.frameAxisX[e]||{})[i[0]]||0,(t.frameAxisX[s]||{})[i[0]]||0)}),this.yScale.domain(e)},_createLimits:function(){var t=this,e=this.model.marker.axis_x,i=Object.keys(this.model.marker.side.getNestedItems([this.SIDEDIM]));i.length||i.push("undefined");var a=this.sideSkip?[]:[this.SIDEDIM],n=e.getLimitsByDimensions(a.concat([this.STACKDIM,this.TIMEDIM])),o=e.getUnique(),l={},h={},c={};i.forEach(function(t){c[t]=[],h[t]=[]}),t.sideSkip?r.forEach(o,function(e){l[e]={};var s=0,a=[];r.forEach(t.stackKeys,function(t){if(n[t]&&n[t][e]){var i=n[t][e].max;s+=i,a.push(i)}}),l[e][i[0]]=s;var o=Math.max.apply(Math,a);h[i[0]].push(o/s),c[i[0]].push(o)}):r.forEach(o,function(e){l[e]={},r.forEach(i,function(i){var s=0,a=[];r.forEach(t.stackKeys,function(t){if(n[i]&&n[i][t]&&n[i][t][e]){var r=n[i][t][e].max;s+=r,a.push(r)}}),l[e][i]=s;var o=Math.max.apply(Math,a);h[i].push(o/s),c[i].push(o)})}),this.maxLimits={},this.inpercentMaxLimits={},i.forEach(function(e){t.maxLimits[e]=Math.max.apply(Math,s(c[e])),t.inpercentMaxLimits[e]=Math.max.apply(Math,s(h[e]))}),this.totals=l},_updateLimits:function(){var t=this,e=this.model.marker.axis_x,i="log"==e.scaleType?.01:0,a=void 0;a=this.ui.chart.inpercent?[.01*i,Math.max.apply(Math,s(this.sideKeys.map(function(e){return t.inpercentMaxLimits[e]})))]:null!=e.domainMin&&null!=e.domainMax?[+e.domainMin,+e.domainMax]:[i,Math.max.apply(Math,s(this.sideKeys.map(function(e){return t.maxLimits[e]})))],this.xScale.domain(a),this.xScaleLeft&&this.xScaleLeft.domain(this.xScale.domain())},_interpolateBetweenTotals:function(t,e,i){var s=d3.bisectLeft(t,i),a=(i-t[s-1])/(t[s]-t[s-1]),n={};return r.forEach(this.sideKeys,function(i){n[i]=e[t[s]][i]*a+e[t[s-1]][i]*(1-a)}),n},_updateEntities:function(t){var e=this,i=this.model.time,s=this.SIDEDIM,a=this.PREFIXEDSIDEDIM,r=this.STACKDIM,n=(this.PREFIXEDSTACKDIM,this.TIMEDIM,i.playing?i.delayAnimations:0);this.ui.chart.inpercent&&(this.total=this.totals[i.value]?this.totals[i.value]:this._interpolateBetweenTotals(this.timeSteps,this.totals,i.value));var o=(this.yScale.domain(),this.markers.slice(0));this.entityBars=this.bars.selectAll(".vzb-bc-bar").data(o,function(t){return t[r]}),this.entityBars.exit().remove();var l=this.barHeight,h=this.firstBarOffsetY;this.entityBars=this.entityBars.enter().append("g").attr("class",function(t){return"vzb-bc-bar vzb-bc-bar-"+t[r]}).attr("transform",function(t,i){return"translate(0,"+(h-e.yScale(t[r]))+")"}).merge(this.entityBars);var c=this._attributeUpdaters;if(this.sideBars=this.entityBars.selectAll(".vzb-bc-side").data(function(t){return e.sideKeys.map(function(e){var i={};return i[r]=t[r],i[a]=e,i[s]=e,i})},function(t){return t[a]}),this.sideBars.exit().remove(),this.sideBars=this.sideBars.enter().append("g").attr("class",function(t,i){return"vzb-bc-side vzb-bc-side-"+(!i!=!e.twoSided?"right":"left")}).call(function(t){t.append("rect").attr("class",function(t,i){return"vzb-bc-stack vzb-bc-stack-"+i+(e.highlighted?" vzb-dimmed":"")}).attr("y",0).attr("height",l).attr("fill",c._newColor).attr("width",c._newWidth).attr("x",c._newX).on("mouseover",e.interaction.mouseover).on("mouseout",e.interaction.mouseout).on("click",e.interaction.click).onTap(e.interaction.tap)}).merge(this.sideBars),t&&this.sideBars.attr("transform",function(t,i){return i?"scale(-1,1) translate("+e.activeProfile.centerWidth+",0)":""}),this.stackBars=this.sideBars.selectAll(".vzb-bc-stack"),t&&this.stackBars.attr("fill",c._newColor),n){var d=d3.transition().duration(n).ease(d3.easeLinear);this.entityBars.attr("transform",function(t,i){return"translate(0,"+(h-e.yScale(t[r]))+")"}),this.stackBars.transition(d).attr("width",c._newWidth).attr("x",c._newX)}else this.entityBars.interrupt().attr("transform",function(t,i){return"translate(0,"+(h-e.yScale(t[r]))+")"}),this.stackBars.interrupt().attr("width",c._newWidth).attr("x",c._newX);n?this.year.transition().duration(n).ease(d3.easeLinear).on("end",this._setYear(i.value)):this.year.interrupt().text(i.formatDate(i.value)).transition()},_setYear:function(t){var e=this.model.time.formatDate(t);return function(){d3.select(this).text(e)}},_interaction:function(){var t=this;return{mouseover:function(e,i){r.isTouchDevice()||t.model.marker.highlightMarker(e)},mouseout:function(e,i){r.isTouchDevice()||t.model.marker.clearHighlighted()},click:function(e,i){r.isTouchDevice()||t.model.marker.selectMarker(e)},tap:function(e){d3.event.stopPropagation(),t.model.marker.selectMarker(e)}}},_highlightBars:function(t){var e=this;e.someHighlighted=e.model.marker.highlight.length>0,e.updateBarsOpacity(),e.someHighlighted?e._showLabel(e.model.marker.highlight[0]):e.labels.selectAll(".vzb-hovered").classed("vzb-hovered",!1)},_showLabel:function(t){if(this.frame){var e=this,i=e.ui.chart.inpercent?d3.format(".2%"):e.model.marker.axis_x.getTickFormatter(),s=e.SIDEDIM,a=e.STACKDIM,n=this.KEYS,o=e.sideKeys.indexOf(t[s]),l=e.labels.select(".vzb-bc-label"),h=e.bars.select(".vzb-bc-bar-"+t[a]);l.attr("transform",h.attr("transform")).select(".vzb-bc-stack").text(function(o){var l=e.frame.label_stack[t[a]];l=e.twoSided?l:l+" "+e.stackItems[t[a]];var h=e.ui.chart.inpercent?e.total[t[s]]:1,c=r.getValueMD(t,e.frameAxisX,n)/h;return l+": "+i(c)}).attr("x",(o?-1:1)*(.5*e.activeProfile.centerWidth+7)).classed("vzb-text-left",o),l.classed("vzb-hovered",!0)}},presentationProfileChanges:{medium:{margin:{right:80,bottom:80},infoElHeight:32},large:{margin:{top:100,right:100,left:100,bottom:80},infoElHeight:32}},profiles:{small:{margin:{top:70,right:20,left:40,bottom:40},infoElHeight:16,centerWidth:2,titlesSpacing:5},medium:{margin:{top:80,right:60,left:60,bottom:40},infoElHeight:20,centerWidth:2,titlesSpacing:10},large:{margin:{top:100,right:60,left:60,bottom:40},infoElHeight:22,centerWidth:2,titlesSpacing:20}},resize:function(){var t=this;this.activeProfile=this.getActiveProfile(this.profiles,this.presentationProfileChanges);var e=this.activeProfile.margin,i=this.activeProfile.infoElHeight;if(this.height=parseInt(this.element.style("height"),10)-e.top-e.bottom||0,this.width=parseInt(this.element.style("width"),10)-e.left-e.right||0,this.height<=0||this.width<=0)return r.warn("BarchartDS resize() abort: vizabi container is too little or has display:none");this.graph.attr("transform","translate("+e.left+","+e.top+")"),this.barsCrop.attr("width",this.width).attr("height",Math.max(0,this.height)),this.labelsCrop.attr("width",this.width).attr("height",Math.max(0,this.height));var s=this.yScale.domain(),a=this.barHeight="ordinal"==this.model.marker.axis_y.scaleType?this.height/s.length:this.height/Math.abs(s[1]-s[0]);this.firstBarOffsetY=this.height-this.barHeight,this.stackBars&&this.stackBars.attr("height",a),this.sideBars&&this.sideBars.attr("transform",function(e,i){return i?"scale(-1,1) translate("+t.activeProfile.centerWidth+",0)":""}),this.yScale.range([this.height,0]);var n=this.twoSided?.5*(this.width-this.activeProfile.centerWidth):this.width;this.xScale.range([0,n]),this.yAxis.scale(this.yScale).tickValues([]).tickSizeInner(-this.width).tickSizeOuter(0).tickPadding(6).tickSizeMinor(-this.width,0).labelerOptions({scaleType:this.model.marker.axis_y.scaleType,toolMargin:e,limitMaxTickNumber:1});var o=this.ui.chart.inpercent?d3.format(".1%"):this.model.marker.axis_x.getTickFormatter();this.xAxis.scale(this.xScale).tickFormat(o).tickSizeInner(-this.height).tickSizeOuter(0).tickPadding(6).tickSizeMinor(-this.height,0).labelerOptions({scaleType:this.model.marker.axis_x.scaleType,toolMargin:e,limitMaxTickNumber:6});var l=this.twoSided?.5*(this.width+t.activeProfile.centerWidth):0;if(this.xAxisEl.attr("transform","translate("+l+","+this.height+")").call(this.xAxis),this.yAxisEl.attr("transform","translate(0,0)").call(this.yAxis),this.xAxisLeftEl.classed("vzb-hidden",!this.twoSided),this.twoSided){"ordinal"!==this.model.marker.axis_x.scaleType?this.xScaleLeft.range([.5*(this.width-this.activeProfile.centerWidth),0]):this.xScaleLeft.rangePoints([.5*(this.width-this.activeProfile.centerWidth),0]).range(),this.xAxisLeft.scale(this.xScaleLeft).tickFormat(o).tickSizeInner(-this.height).tickSizeOuter(0).tickPadding(6).tickSizeMinor(-this.height,0).labelerOptions({scaleType:this.model.marker.axis_x.scaleType,toolMargin:e,limitMaxTickNumber:6}),this.xAxisLeftEl.attr("transform","translate(0,"+this.height+")").call(this.xAxisLeft);var h=this.xAxisEl.select(".tick text");if(!h.empty()){var c=h.node().getBBox().width;h.attr("dx",.5*-(this.activeProfile.centerWidth+c))}this.xAxisEl.select(".tick line").classed("vzb-hidden",!0);var d=this.xAxisLeftEl.selectAll(".tick").nodes();d3.select(d[d.length-1]).classed("vzb-hidden",!0)}var m=this.model.locale.isRTL();if(this.bars.attr("transform","translate("+l+",0)"),this.labels.attr("transform","translate("+l+",0)"),this.title.attr("x",e.left+(this.twoSided?l-this.activeProfile.titlesSpacing:0)).style("text-anchor",this.twoSided?"end":"").attr("y",.7*e.top),this.titleRight.attr("x",e.left+l+this.activeProfile.titlesSpacing).attr("y",.7*e.top),this.xTitleEl.style("font-size",i+"px").attr("transform","translate("+(m?this.width:.4*e.left)+","+.4*e.top+")"),this.xTitleEl.select("text").text(this.model.marker.axis_x.getConceptprops().name),this.xInfoEl.select("svg").node()){var p=this.xTitleEl.node().getBBox(),u=r.transform(this.xTitleEl.node()),g=m?p.x+u.translateX-1.4*i:p.x+u.translateX+p.width+.4*i;this.xInfoEl.select("svg").attr("width",i+"px").attr("height",i+"px"),this.xInfoEl.attr("transform","translate("+g+","+(u.translateY-.8*i)+")")}this.year.attr("x",this.width+e.left).attr("y",.4*e.top)},updateBarsOpacity:function(t){var e=this,i=this.model.marker.opacityHighlightDim,s=this.model.marker.opacityRegular,a=this.model.marker.opacityRegular,r=this.model.marker.opacitySelectDim;this.stackBars.style("opacity",function(t){return e.someHighlighted&&e.model.marker.isHighlighted(t)?1:e.someSelected?e.model.marker.isSelected(t)?s:r:e.someHighlighted?i:a}),this.stackBars.style("stroke",function(t){return e.model.marker.isSelected(t)?"#333":null});var n=e.model.marker.opacitySelectDim<.01;n!=this.nonSelectedOpacityZero&&this.stackBars.style("pointer-events",function(t){return e.someSelected&&n&&!e.model.marker.isSelected(t)?"none":"visible"}),this.nonSelectedOpacityZero=e.model.marker.opacitySelectDim<.01}});e.default=h},function(t,e){},function(t,e){t.exports='\x3c!-- BarChartDS Component --\x3e\n<svg class="vzb-barchartds">\n    <g class="vzb-bc-header">\n        <g class="vzb-bc-axis-x-title"></g>\n        <g class="vzb-bc-axis-x-info vzb-noexport"></g>\n        <text class="vzb-bc-title"></text>\n        <text class="vzb-bc-title vzb-bc-title-right"></text>\n        <text class="vzb-bc-year"></text>\n    </g>\n    <g class="vzb-bc-graph">\n\n        <g class="vzb-bc-axis-y-title"></g>\n\n        <g class="vzb-bc-axis-y"></g>\n\n        <svg class="vzb-bc-bars-crop">\n            <g class="vzb-bc-bars"></g>\n        </svg>\n\n        <g class="vzb-bc-axis-x"></g>\n        <g class="vzb-bc-axis-x vzb-bc-axis-x-left"></g>\n\n        <svg class="vzb-bc-labels-crop">\n            <g class="vzb-bc-labels">\n                <g class="vzb-bc-label"><text class="vzb-bc-stack"></text></g>\n            </g>\n        </svg>\n\n        <g class="vzb-bc-axis-labels">\n            \x3c!-- <text class="vzb-x_label">Lifespan</text>\n                  <text class="vzb-y_label">Lifespan</text> --\x3e\n        </g>\n    </g>\n</svg>\n'},function(t,e,i){t.exports=i(0)}]);
//# sourceMappingURL=barchart-ds.js.map