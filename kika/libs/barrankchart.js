!function(t){function e(a){if(i[a])return i[a].exports;var r=i[a]={i:a,l:!1,exports:{}};return t[a].call(r.exports,r,r.exports,e),r.l=!0,r.exports}var i={};e.m=t,e.c=i,e.i=function(t){return t},e.d=function(t,i,a){e.o(t,i)||Object.defineProperty(t,i,{configurable:!1,enumerable:!0,get:a})},e.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(i,"a",i),i},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=4)}([function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),i(2);var a=i(1),r=function(t){return t&&t.__esModule?t:{default:t}}(a),n={version:"1.0.22",build:1506807137648};e.default=Vizabi.Tool.extend("BarRankChart",{init:function(t,e){this.name="barrankchart",this.components=[{component:r.default,placeholder:".vzb-tool-viz",model:["state.time","state.entities","state.marker","locale","ui"]},{component:Vizabi.Component.get("timeslider"),placeholder:".vzb-tool-timeslider",model:["state.time","state.entities","state.marker","ui"]},{component:Vizabi.Component.get("dialogs"),placeholder:".vzb-tool-dialogs",model:["state","ui","locale"]},{component:Vizabi.Component.get("buttonlist"),placeholder:".vzb-tool-buttonlist",model:["state","ui","locale"]},{component:Vizabi.Component.get("treemenu"),placeholder:".vzb-tool-treemenu",model:["state.marker","state.marker_tags","state.time","locale"]},{component:Vizabi.Component.get("datanotes"),placeholder:".vzb-tool-datanotes",model:["state.marker","locale"]},{component:Vizabi.Component.get("datawarning"),placeholder:".vzb-tool-datawarning",model:["locale"]},{component:Vizabi.Component.get("steppedspeedslider"),placeholder:".vzb-tool-stepped-speed-slider",model:["state.time","locale"]}],this._super(t,e)},default_model:{state:{time:{},entities:{autoconfig:{type:"entity_domain",excludeIDs:["tag"]}},entities_colorlegend:{autoconfig:{type:"entity_domain",excludeIDs:["tag"]}},entities_tags:{autoconfig:{type:"entity_domain",includeOnlyIDs:["tag"]}},marker_tags:{space:["entities_tags"],label:{use:"property"},hook_parent:{}},entities_allpossible:{autoconfig:{type:"entity_domain",excludeIDs:["tag"]}},marker_allpossible:{space:["entities_allpossible"],label:{use:"property",autoconfig:{includeOnlyIDs:["name"],type:"string"}}},marker:{space:["entities","time"],axis_x:{use:"indicator",allow:{scales:["linear","log"]}},axis_y:{use:"property",allow:{scales:["ordinal","nominal"]},autoconfig:{type:"entity_domain"}},label:{use:"property",autoconfig:{includeOnlyIDs:["name"],type:"string"}},color:{syncModels:["marker_colorlegend"]}},marker_colorlegend:{space:["entities_colorlegend"],label:{use:"property",which:"name"},hook_rank:{use:"property",which:"rank"},hook_geoshape:{use:"property",which:"shape_lores_svg"}}},locale:{},ui:{chart:{},datawarning:{doubtDomain:[],doubtRange:[]},buttons:["colors","find","show","moreoptions","fullscreen","presentation"],dialogs:{popup:["timedisplay","colors","find","axes","show","moreoptions"],sidebar:["timedisplay","colors","find"],moreoptions:["opacity","speed","colors","presentation","about"]},presentation:!1}},versionInfo:n})},function(t,e,i){"use strict";function a(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}function r(t){if(Array.isArray(t)){for(var e=0,i=Array(t.length);e<t.length;e++)i[e]=t[e];return i}return Array.from(t)}Object.defineProperty(e,"__esModule",{value:!0});var n=function(){function t(t,e){var i=[],a=!0,r=!1,n=void 0;try{for(var o,s=t[Symbol.iterator]();!(a=(o=s.next()).done)&&(i.push(o.value),!e||i.length!==e);a=!0);}catch(t){r=!0,n=t}finally{try{!a&&s.return&&s.return()}finally{if(r)throw n}}return i}return function(e,i){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,i);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),o=Vizabi.utils,s=Vizabi.helpers["d3.axisWithLabelPicker"],l=Vizabi.iconset.question,h=Vizabi.iconset.warn,c=Vizabi.Component.extend("barrankchart",{init:function(t,e){var a=this;this.name="barrankchart",this.template=i(3),this.model_expects=[{name:"time",type:"time"},{name:"entities",type:"entities"},{name:"marker",type:"model"},{name:"locale",type:"locale"},{name:"ui",type:"ui"}],this.model_binds={"change:time.value":function(){a.model._ready&&a._readyOnce&&a.onTimeChange()},"change:marker.select":function(){a._readyOnce&&(a._selectBars(),a._updateOpacity(),a._updateDoubtOpacity(),a._scroll())},"change:marker.axis_x.scaleType":function(){a._readyOnce&&a.loadData()&&a.draw(!0)},"change:marker.color.palette":function(){a._drawColors()},"change:marker.highlight":function(){a._updateOpacity()},"change:marker.opacitySelectDim":function(){a._updateOpacity()},"change:marker.opacityRegular":function(){a._updateOpacity()}},this._super(t,e),this.xScale=null,this.cScale=d3.scaleOrdinal(d3.schemeCategory10),this.xAxis=s("bottom")},onTimeChange:function(){var t=this;this.model.marker.getFrame(this.model.time.value,function(e){t.values=e,t.values&&t.loadData()&&t.draw()})},readyOnce:function(){this.element=d3.select(this.element),this.header=this.element.select(".vzb-br-header"),this.infoEl=this.element.select(".vzb-br-axis-info"),this.barViewport=this.element.select(".vzb-br-barsviewport"),this.barSvg=this.element.select(".vzb-br-bars-svg"),this.barContainer=this.element.select(".vzb-br-bars"),this.dataWarningEl=this.element.select(".vzb-data-warning"),this.wScale=d3.scaleLinear().domain(this.model.ui.datawarning.doubtDomain).range(this.model.ui.datawarning.doubtRange),this.xAxis.tickFormat(this.model.marker.axis_x.getTickFormatter()),this._localeId=this.model.locale.id,this._entityLabels={},this._presentation=!this.model.ui.presentation,this._formatter=this.model.marker.axis_x.getTickFormatter(),this.ready(),this._selectBars()},ready:function(){var t=this;this.model.marker.getFrame(this.model.time.value,function(e){t.values=e,t.values&&t.loadData()&&(t.draw(!0),t._updateOpacity(),t._drawColors())})},resize:function(){this.draw(!0),this._drawColors()},loadData:function(){var t=this,e=this;this.translator=this.model.locale.getTFunction();var i=this.values.axis_x;if(!Object.keys(i).length)return!1;this.sortedEntities=this._sortByIndicator(i),this.header.select(".vzb-br-title").select("text").on("click",function(){return t.parent.findChildByName("gapminder-treemenu").markerID("axis_x").alignX("left").alignY("top").updateView().toggle()}),this.xScale=this.model.marker.axis_x.getScale().copy(),this.cScale=this.model.marker.color.getScale(),o.setIcon(this.dataWarningEl,h).select("svg").attr("width",0).attr("height",0),this.dataWarningEl.append("text").text(this.translator("hints/dataWarning")),this.dataWarningEl.on("click",function(){return t.parent.findChildByName("gapminder-datawarning").toggle()}).on("mouseover",function(){return t._updateDoubtOpacity(1)}).on("mouseout",function(){return t._updateDoubtOpacity()});var a=this.model.marker.axis_x.getConceptprops();return o.setIcon(this.infoEl,l).select("svg").attr("width",0).attr("height",0).style("opacity",Number(Boolean(a.description||a.sourceLink))),this.infoEl.on("click",function(){t.parent.findChildByName("gapminder-datanotes").pin()}),this.infoEl.on("mouseover",function(){var t=this.getBBox(),i=o.makeAbsoluteContext(this,this.farthestViewportElement),a=i(t.x-10,t.y+t.height+10);e.parent.findChildByName("gapminder-datanotes").setHook("axis_x").show().setPos(a.x,a.y)}),this.infoEl.on("mouseout",function(){e.parent.findChildByName("gapminder-datanotes").hide()}),!0},draw:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];this.time_1=null==this.time?this.model.time.value:this.time,this.time=this.model.time.value;var e=this.model.time.playing&&this.time-this.time_1>0?this.model.time.delayAnimations:0;this.drawAxes(e,t)||this.drawData(e,t)},drawAxes:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,e={small:{margin:{top:60,right:5,left:5,bottom:20},headerMargin:{top:10,right:20,bottom:20,left:20},infoElHeight:16,infoElMargin:5,barHeight:18,barMargin:3,barRectMargin:5,barValueMargin:5,scrollMargin:20},medium:{margin:{top:60,right:5,left:5,bottom:20},headerMargin:{top:10,right:20,bottom:20,left:20},infoElHeight:16,infoElMargin:5,barHeight:21,barMargin:3,barRectMargin:5,barValueMargin:5,scrollMargin:25},large:{margin:{top:60,right:5,left:5,bottom:20},headerMargin:{top:10,right:20,bottom:20,left:20},infoElHeight:16,infoElMargin:5,barHeight:28,barMargin:4,barRectMargin:5,barValueMargin:5,scrollMargin:25}},i={medium:{margin:{top:60,right:10,left:10,bottom:40},headerMargin:{top:10,right:20,bottom:20,left:20},infoElHeight:25,infoElMargin:10,barHeight:25,barMargin:6},large:{margin:{top:60,right:10,left:10,bottom:40},headerMargin:{top:10,right:20,bottom:20,left:20},infoElHeight:16,infoElMargin:10,barHeight:30,barMargin:6}};this.activeProfile=this.getActiveProfile(e,i);var a=this.activeProfile,r=a.margin,n=a.headerMargin,s=a.infoElHeight,l=a.infoElMargin;if(this.height=parseInt(this.element.style("height"),10)||0,this.width=parseInt(this.element.style("width"),10)||0,!this.height||!this.width)return o.warn("Dialog resize() abort: vizabi container is too little or has display:none");this.barViewport.style("height",this.height-r.bottom-r.top+"px"),this.header.attr("height",r.top);var h=this.header.select(".vzb-br-title"),c=this.model.marker.axis_x.getConceptprops(),d=c.name,g=c.unit,u=h.select("text");if(g){u.text(d+", "+g);n.left+h.node().getBBox().width+l+s>this.width-n.right&&u.text(d)}else u.text(d);var m=h.node().getBBox(),b=n.left,p=n.top+m.height;h.attr("transform","translate("+b+", "+p+")");var f=this.infoEl;f.select("svg").attr("width",s+"px").attr("height",s+"px");var v=b+h.node().getBBox().width+l,y=n.top+s/4;f.attr("transform","translate("+v+", "+y+")");var x=this.header.select(".vzb-br-total");t?x.select("text").transition("text").delay(t).text(this.model.time.formatDate(this.time)):x.select("text").interrupt().text(this.model.time.formatDate(this.time)),x.style("opacity",Number("large"!==this.getLayoutProfile()));var _=x.node().getBBox(),w=this.width-n.right-_.width,z=n.top+_.height;x.attr("transform","translate("+w+", "+z+")").classed("vzb-transparent",m.width+_.width+10>this.width),this.element.select(".vzb-data-warning-svg").style("height",r.bottom+"px");var k=this.dataWarningEl.select("text").node().getBBox();this.dataWarningEl.attr("transform","translate("+(this.width-r.right-k.width)+", "+k.height+")").select("text"),this.dataWarningEl.select("svg").attr("width",k.height).attr("height",k.height).attr("x",-k.height-5).attr("y",1-k.height),this._updateDoubtOpacity()},drawData:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,i=arguments.length>1&&void 0!==arguments[1]&&arguments[1];this._createAndDeleteBars(this.barContainer.selectAll(".vzb-br-bar").data(this.sortedEntities,function(t){return t.entity}));var a=this.model.ui.presentation,n=this._presentation!==a;n&&(this._presentation=a);var o="undefined"===typeof this._entitiesCount||this._entitiesCount!==this.sortedEntities.length;(n||o)&&o&&(this._entitiesCount=this.sortedEntities.length),this._resizeSvg(),this._scroll(e),this._drawColors();var s=this.activeProfile,l=s.barRectMargin,h=s.barValueMargin,c=s.scrollMargin,d=s.margin,g=this.model.marker.axis_x,u=g.getLimits(g.which),m=Math.abs(u.max)>=Math.abs(u.min),b=m?u.min<0:u.max>0,p=(this.width-d.right-d.left-l-c-(b?0:this._getWidestLabelWidth()))/(b?2:1);this.xScale.range([0,p]),"log"!==this.model.marker.axis_x.scaleType&&this.xScale.domain([0,Math.max.apply(Math,r(this.xScale.domain()))]);var f=b?p:this._getWidestLabelWidth(),v=function(e){return t.xScale(e)},y=function(t){return m?t>=0:t>0},x=function(t){return y(t)?"end":"start"},_=function(t){return y(t)?"start":"end"},w=function(e){return y(e)?d.left+f:t.width-f-c-d.right},z=function(t){return y(t)?w(t)+l:w(t)-l},k=function(t){return y(t)?z(t)+h:z(t)-h},C=this._getWidestLabelWidth(!0)+(m?d.left:d.right)<f;this.sortedEntities.forEach(function(a){var r=a.value;if((i||n||a.isNew||a.changedValue)&&(a.barLabel.attr("x",w(r)).attr("y",t.activeProfile.barHeight/2).attr("text-anchor",x(r)).text(C?a.labelFull:a.labelSmall),a.barRect.attr("rx",t.activeProfile.barHeight/4).attr("ry",t.activeProfile.barHeight/4).attr("height",t.activeProfile.barHeight),a.barValue.attr("x",k(r)).attr("y",t.activeProfile.barHeight/2).attr("text-anchor",_(r))),i||a.changedWidth||n){var o=Math.max(0,r&&v(Math.abs(r)))||0;(i||a.changedWidth||n)&&a.barRect.transition().duration(e).ease(d3.easeLinear).attr("width",o),a.barRect.attr("x",z(r)-(r<0?o:0)),(i||a.changedValue)&&a.barValue.text(t._formatter(r)||t.translator("hints/nodata"))}(i||a.changedIndex||n)&&(e?a.self.transition().duration(e).ease(d3.easeLinear):a.self).attr("transform","translate(0, "+t._getBarPosition(a.index)+")")})},_resizeSvg:function(){var t=this.activeProfile,e=t.barHeight,i=t.barMargin;this.barSvg.attr("height",(e+i)*this.sortedEntities.length+"px")},_scroll:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,e=this.barContainer.select(".vzb-selected");if(!e.empty()){var i=e.datum(),a=this._getBarPosition(i.index),r=this.activeProfile.margin,n=this.height-r.top-r.bottom,o=a-(n+this.activeProfile.barHeight)/2;this.barViewport.transition().duration(t).tween("scrollfor"+i.entity,this._scrollTopTween(o))}},_createAndDeleteBars:function(t){var e=this,i=n(this.sortedEntities,1),a=i[0];this._entityLabels[a.entity]||(this._entityLabels[a.entity]=a.label);var r=this._entityLabels[a.entity]!==this.values.label[a.entity]&&this.model.locale.id!==this._localeId;r&&(this._localeId=this.model.locale.id,this._entityLabels[a.entity]=this.values.label[a.entity]),t.exit().remove(),t=(r?t:t.enter().append("g")).each(function(t){var i=d3.select(this),a=e.values.label[t.entity],n=a.length<12?a:a.substring(0,9)+"...",o=i.select(".vzb-br-label"),s=o.size()?o:i.append("text").attr("class","vzb-br-label").attr("dy",".325em"),l=s.text(a).node().getBBox().width,h=s.text(n).node().getBBox().width;if(Object.assign(t,{labelFullWidth:l,labelSmallWidth:h,labelFull:a,labelSmall:n,barLabel:s}),!r){i.attr("class","vzb-br-bar").classed("vzb-selected",e.model.marker.isSelected(t)).attr("id","vzb-br-bar-"+t.entity+"-"+e._id).on("mousemove",function(t){return e.model.marker.highlightMarker(t)}).on("mouseout",function(){return e.model.marker.clearHighlighted()}).on("click",function(t){e.model.marker.selectMarker(t)});var c=i.append("rect").attr("stroke","transparent"),d=i.append("text").attr("class","vzb-br-value").attr("dy",".325em");Object.assign(t,{self:i,isNew:!0,barRect:c,barValue:d})}}).merge(t)},_getWidestLabelWidth:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0],e=t?"labelFullWidth":"labelSmallWidth",i=t?"labelFull":"labelSmall",a=this.sortedEntities.reduce(function(t,i){return t[e]<i[e]?i:t}),r=a.barLabel.text(),n=a.barLabel.text(a[i]).node().getBBox().width;return a.barLabel.text(r),n},_drawColors:function(){var t=this,e=this;this.barContainer.selectAll(".vzb-br-bar>rect").each(function(t){var i=t.entity,a=d3.select(this),r=e.values.color[i],n=r||0===r,o=n?String(e._getColor(r)):"rgb(253, 253, 253)",s=n?"transparent":"rgb(51, 51, 51)";a.style("fill")!==o&&a.style("fill",o),a.style("stroke")!==s&&a.style("stroke",s)}),this.barContainer.selectAll(".vzb-br-bar>text").style("fill",function(e){var i=e.entity;return t._getDarkerColor(t.values.color[i]||null)})},_getColor:function(t){return d3.rgb(this.cScale(t))},_getDarkerColor:function(t){return this._getColor(t).darker(2)},_scrollTopTween:function(t){return function(){var e=this,i=d3.interpolateNumber(this.scrollTop,t);return function(t){e.scrollTop=i(t)}}},_getBarPosition:function(t){return(this.activeProfile.barHeight+this.activeProfile.barMargin)*t},_entities:{},_sortByIndicator:function(t){var e=this;return Object.keys(t).map(function(i){var r,n=e._entities[i],o=t[i],s=e.values.label[i],l=e._formatter(o);return n?Object.assign(n,{value:o,label:s,formattedValue:l,changedValue:l!==n.formattedValue,changedWidth:o!==n.value,isNew:!1}):e._entities[i]=(r={entity:i,value:o,formattedValue:l},a(r,e.model.entities.dim,i),a(r,"changedValue",!0),a(r,"changedWidth",!0),a(r,"isNew",!0),r)}).sort(function(t,e){var i=t.value;return e.value-i}).map(function(t,e){return Object.assign(t,{index:e,changedIndex:e!==t.index})})},_selectBars:function(){var t=this,e=this.model.entities.dim,i=this.model.marker.select;this.barContainer.classed("vzb-dimmed-selected",!1),this.barContainer.selectAll(".vzb-br-bar.vzb-selected").classed("vzb-selected",!1),i.length&&(this.barContainer.classed("vzb-dimmed-selected",!0),i.forEach(function(i){t.barContainer.select("#vzb-br-bar-"+i[e]+"-"+t._id).classed("vzb-selected",!0)}))},_updateOpacity:function(){var t=this.model.marker,e=t.highlight,i=t.select,a=t.opacityHighlightDim,r=t.opacitySelectDim,n=t.opacityRegular,o=e.length>0,s=i.length>0;this.barContainer.selectAll(".vzb-br-bar").style("opacity",function(e){return o&&t.isHighlighted(e)?1:s?t.isSelected(e)?n:r:o?a:n})},_updateDoubtOpacity:function(t){this.dataWarningEl.style("opacity",t||(this.model.marker.select.length?1:this.wScale(+this.model.time.value.getUTCFullYear().toString())))}});e.default=c},function(t,e){},function(t,e){t.exports='\x3c!-- Bar Chart Component --\x3e\n<div class="vzb-barrankchart">\n  <svg class="vzb-br-header">\n    <g class="vzb-br-title">\n      <text></text>\n    </g>\n    <g class="vzb-br-total">\n      <text></text>\n    </g>\n    <g class="vzb-br-axis-info vzb-noexport"></g>\n  </svg>\n\n  <div class="vzb-br-barsviewport vzb-dialog-scrollable">\n    <svg class="vzb-br-bars-svg">\n      <g class="vzb-br-bars"></g>\n    </svg>\n  </div>\n\n  <svg class="vzb-data-warning-svg">\n    <g class="vzb-data-warning vzb-noexport">\n      <svg></svg>\n      <text></text>\n    </g>\n  </svg>\n</div>\n'},function(t,e,i){t.exports=i(0)}]);
//# sourceMappingURL=barrankchart.js.map