(this.webpackJsonpinstant_booking_page=this.webpackJsonpinstant_booking_page||[]).push([[0],{112:function(e,t,a){e.exports={toggle:"select_toggle__HCNrW",menu:"select_menu__1YcGA"}},115:function(e,t,a){e.exports={hotelLogo:"hotel_logo_hotelLogo__1KDqS",hotelLogoLink:"hotel_logo_hotelLogoLink__FqwMa"}},116:function(e,t,a){e.exports={locationContainer:"hotel_location_locationContainer__1vnWW",icon:"hotel_location_icon__1vGPp"}},117:function(e,t,a){e.exports={carousel:"photo_slider_carousel__1diqS",carouselItem:"photo_slider_carouselItem__37iIb"}},118:function(e,t,a){e.exports={searchSection:"search_section_searchSection__1k8u3",buttonSection:"search_section_buttonSection__2TT0g"}},119:function(e,t,a){e.exports={ratePlanOccupancyContainer:"rate_plan_occupancy_ratePlanOccupancyContainer__2s19a",ratePlansOccupancyCaption:"rate_plan_occupancy_ratePlansOccupancyCaption__2TVjx"}},120:function(e,t,a){e.exports={bed:"bed_option_bed__3kr6M",roomTitle:"bed_option_roomTitle__1eKRX",bedTitle:"bed_option_bedTitle__10UhV",bedIcon:"bed_option_bedIcon__2CXCw"}},121:function(e,t,a){e.exports={roomAdditionalFacilitiesContainer:"room_additional_facilities_roomAdditionalFacilitiesContainer__e5sEV",toggleButton:"room_additional_facilities_toggleButton__2GAP7"}},182:function(e){e.exports=JSON.parse('{"general":{"locale":"English"},"hotel_page":{"checkin_placeholder":"Check-in","checkout_placeholder":"Check-out","search":"Search","hotel_info":"Hotel Info","hotel_facilities":"Facilities of"},"rates_table":{"title":"Availability","room_type":"Room Type","sleeps":"Sleeps","price":"Price for {n} nights","room_availability":"Only {n} left on our site","your_choises":"Your Choices","select_rooms":"Select Rooms","show_more":"Show more","show_less":"Show less","taxes_and_charges":"taxes and charges"},"room_types":{"0":"Demo room"},"bed_types":{"0":"Demo bed"},"facilities":{"0":"Demo facility"}}')},183:function(e){e.exports=JSON.parse('{"general":{"locale":"TEST"},"hotel_page":{"checkin_placeholder":"Check-in","checkout_placeholder":"Check-out","search":"Search","hotel_info":"Hotel Info","hotel_facilities":"Facilities of"},"rates_table":{"title":"Availability","room_type":"Room Type","sleeps":"Sleeps","price":"Price for {n} nights","room_availability":"Only {n} left on our site","your_choises":"Your Choices","select_rooms":"Select Rooms","show_more":"Show more","show_less":"Show less","taxes_and_charges":"taxes and charges"},"room_types":{"0":"Demo room"},"bed_types":{"0":"Demo bed"},"facilities":{"0":"Demo facility"}}')},189:function(e,t,a){e.exports={icon:"locale_select_icon__1XqV-"}},196:function(e,t,a){e.exports={hotelTitle:"hotel_title_hotelTitle__UGv-J"}},198:function(e,t,a){e.exports={rangepicker:"rangepicker_rangepicker__28JuI"}},199:function(e,t,a){e.exports={button:"search_button_button__1s_qb"}},200:function(e,t,a){e.exports={hotelInfoTitle:"hotel_info_hotelInfoTitle__1CGSH",hotelDescription:"hotel_info_hotelDescription__2yGjz"}},201:function(e,t,a){e.exports={hotelInfoContainer:"hotel_info_section_hotelInfoContainer__2Essu"}},202:function(e,t,a){e.exports={bedOptionsContainer:"bed_options_bedOptionsContainer__2byNU"}},203:function(e,t,a){e.exports={roomFacilities:"room_facilities_roomFacilities___LODV"}},204:function(e,t,a){e.exports={roomTypeColumn:"rates_table_roomTypeColumn__o5B7a"}},205:function(e,t,a){e.exports={hotelRatesTitle:"hotel_rates_section_hotelRatesTitle__XqEAc"}},206:function(e,t,a){e.exports={firstScreen:"hotel_page_firstScreen__3R0OV"}},211:function(e,t,a){e.exports=a(341)},303:function(e,t){},341:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),i=a(18),c=a(351),r=a(89),l=a(182),s=a(183),_=function(){return r.a.init({interpolation:{escapeValue:!1},defaultNS:"common",lng:"en",resources:{en:l,test:s}})},u=a(111),m=a(12),h=a(350),p=a(347),d=a(348),f=a(79),v=a(357),b=a(356),y=a(352),g=a(112),E=a.n(g);function x(e){var t=e.value,a=e.children,i=e.options,c=e.onChange,r=Object(n.useCallback)((function(){return i.map((function(e){return o.a.createElement(y.a.Item,{key:e.key,eventKey:e.key,active:e.key===t},e.value)}))}),[t,i]);return o.a.createElement(y.a,{onSelect:c},o.a.createElement(y.a.Toggle,{className:E.a.toggle,variant:"link"},a),o.a.createElement(y.a.Menu,{className:E.a.menu},r()))}var w=a(189),k=a.n(w),C=[{key:"en",value:"ENG"},{key:"test",value:"TEST"}];function S(){var e=Object(b.a)(),t=e.t,a=e.i18n,i=Object(n.useCallback)((function(e){a.changeLanguage(e)}),[a]);return o.a.createElement(x,{value:a.language,options:C,onChange:i},o.a.createElement(v.a,{className:k.a.icon}),t("general:locale"))}var O=a(21),D=a(194),N=a.n(D),j=a(86),T=a(195),I=function(){return window.location.search.substr(1).split("&").reduce((function(e,t){var a=t.split("="),n=Object(O.a)(a,2),o=n[0],i=n[1],c=void 0===i||i;return Object(T.a)({},e,Object(j.a)({},o,c))}),{})};function P(e){var t=Object(n.useState)("GBP"),a=Object(O.a)(t,2),i=a[0],c=a[1],r=Object(n.useState)([]),l=Object(O.a)(r,2),s=l[0],_=l[1],u=Object(m.f)(),h=function(){var e=I().currency;c(void 0===e?"GBP":e)};return Object(n.useEffect)((function(){var e=Object.values(N.a).map((function(e){var t=e.name,a=e.iso;return{key:a.code,value:"".concat(t," (").concat(a.code,")")}}));_(e),h()}),[]),Object(n.useEffect)((function(){return u.listen((function(){h()}))}),[u]),o.a.createElement(x,{value:i,options:s,onChange:function(e){!function(e,t){var a=new URL(window.location.href),n=new URL(window.location.href);n.search="",a.searchParams.forEach((function(e,t){n.searchParams.set(t,e)})),Object.entries(e).forEach((function(e){var t=Object(O.a)(e,2),a=t[0],o=t[1];n.searchParams.set(a,o)})),t.push("".concat(n.pathname).concat(n.search))}({currency:e},u),c(e)}},i)}var F={xs:"(max-width: 575px)",sm:"(min-width: 576px) and (max-width: 767px)",md:"(min-width: 768px) and (max-width: 991px)",lg:"(min-width: 992px) and (max-width: 1199px)",xl:"(min-width: 1200px)"},L=a(196),A=a.n(L);function R(e){var t=e.property;return o.a.createElement("div",{className:A.a.hotelTitle},t.title)}var q=a(353),B=a(346),G=a(115),V=a.n(G);function J(e){var t=e.property;return o.a.createElement(q.a.Link,{className:V.a.hotelLogoLink,href:t.link,target:"_blank"},o.a.createElement(B.a,{className:V.a.hotelLogo,src:t.logo,roundedCircle:!0}))}var H=a(358),U=a(116),W=a.n(U);function K(e){var t=e.property;return o.a.createElement("div",{className:W.a.locationContainer},o.a.createElement(H.a,{className:W.a.icon}),o.a.createElement("div",null,t.address))}var M=a(70),Y=a.n(M);function X(e){var t=e.property,a=Object(f.a)({queries:F}),n=a.xs||a.sm,i=o.a.createElement("div",{className:Y.a.selectSection},o.a.createElement(S,null),o.a.createElement(P,null));return o.a.createElement(p.a,{className:Y.a.header},o.a.createElement(d.a,{className:Y.a.titleSection,xs:12,md:9},o.a.createElement(J,{property:t}),o.a.createElement("div",{className:Y.a.hotelInfo},o.a.createElement(R,{property:t}),n?i:o.a.createElement(K,{property:t}))),o.a.createElement(d.a,{md:3},n?null:i))}var z=a(354),Q=a(117),$=a.n(Q);function Z(e){var t=e.property.photos;return t&&t.length?o.a.createElement(z.a,{className:$.a.carousel},t.map((function(e,t){return o.a.createElement(z.a.Item,{className:$.a.carouselItem,key:t},o.a.createElement("img",{className:"d-block w-100",src:e,alt:"First slide"}))}))):null}var ee=a(6),te=a.n(ee),ae=a(197),ne=(a(296),a(340),a(198)),oe=a.n(ne);function ie(e){var t=e.startDate,a=e.endDate,i=e.name,c=void 0===i?"":i,r=e.openDirection,l=void 0===r?"down":r,s=e.startDatePlaceholder,_=e.endDatePlaceholder,u=e.onDatesChange,m=Object(n.useState)(null),h=Object(O.a)(m,2),p=h[0],d=h[1],v=Object(f.a)({queries:F}),b=v.xs,y=v.xs||v.sm?1:2;return o.a.createElement("div",{className:oe.a.rangepicker},o.a.createElement(ae.DateRangePicker,{startDate:t,endDate:a,startDatePlaceholderText:s,endDatePlaceholderText:_,startDateId:"".concat(c,"_start_date"),endDateId:"".concat(c,"_end_date"),openDirection:l,numberOfMonths:y,withFullScreenPortal:b,onDatesChange:u,focusedInput:p,onFocusChange:d}))}var ce=a(188),re=a(199),le=a.n(re);function se(e){var t=e.onClick,a=Object(b.a)().t;return o.a.createElement(ce.a,{variant:"primary",className:le.a.button,onClick:t},a("hotel_page:search"))}var _e=a(118),ue=a.n(_e);function me(e){e.property;var t=Object(b.a)().t,a=Object(n.useState)(null),i=Object(O.a)(a,2),c=i[0],r=i[1],l=Object(n.useState)(null),s=Object(O.a)(l,2),_=s[0],u=s[1];Object(n.useEffect)((function(){var e=I(),t=e.startDate,a=e.endDate,n=te()(t),o=te()(a);t&&n.isValid()&&r(n),a&&o.isValid()&&u(o)}),[]);return o.a.createElement(p.a,{className:ue.a.searchSection},o.a.createElement("div",null,o.a.createElement(ie,{startDatePlaceholder:t("hotel_page:checkin_placeholder"),endDatePlaceholder:t("hotel_page:checkout_placeholder"),startDate:c,endDate:_,name:"search_dates",openDirection:"up",onDatesChange:function(e){var t=e.startDate,a=e.endDate;r(t),u(a)}})),o.a.createElement("div",{className:ue.a.buttonSection},o.a.createElement(se,null)))}var he=a(200),pe=a.n(he);function de(e){var t=e.description;return t?o.a.createElement("div",null,o.a.createElement("pre",{className:pe.a.hotelDescription},t)):null}var fe=a(359),ve=fe.a,be={};var ye=a(91),ge=a.n(ye);function Ee(e){var t=e.code,a=Object(b.a)().t,n=function(e){return be[e]||ve}(t);return o.a.createElement("div",{className:ge.a.facility},o.a.createElement(n,{className:ge.a.facilityIcon}),o.a.createElement("div",{className:ge.a.facilityTitle},a("facilities:".concat(t))))}var xe=a(92),we=a.n(xe);function ke(e){var t=e.title,a=e.facilities,n=Object(b.a)().t;return o.a.createElement("div",null,o.a.createElement("div",{className:we.a.hotelFacilitiesTitle},"".concat(n("hotel_page:hotel_facilities")," ").concat(t,":")),o.a.createElement("div",{className:we.a.hotelFacilitiesContainer},a.map((function(e){return o.a.createElement("div",{className:we.a.hotelFacility,key:e},o.a.createElement(Ee,{code:e}))}))))}var Ce=a(201),Se=a.n(Ce);function Oe(e){var t=e.property,a=t.description,n=t.facilities,i=t.title;return o.a.createElement(p.a,{className:Se.a.hotelInfoContainer},o.a.createElement(de,{description:a}),o.a.createElement(ke,{title:i,facilities:n}))}a(349),a(360),a(119);a(93);a(361),a(94);a(120);a(202);a(203);a(355),a(121);a(204);a(205);var De=a(206),Ne=a.n(De);function je(e){var t=e.property;return o.a.createElement("div",null,o.a.createElement("div",{className:Ne.a.firstScreen},o.a.createElement(h.a,null,o.a.createElement(X,{property:t})),o.a.createElement(Z,{property:t}),o.a.createElement(h.a,null,o.a.createElement(me,{property:t}))),o.a.createElement(h.a,null,o.a.createElement(Oe,{property:t})))}function Te(e){return o.a.createElement(u.a,null,o.a.createElement(m.c,null,o.a.createElement(m.a,{path:"/"},o.a.createElement(je,e))))}var Ie=function(){return o.a.createElement(Te,{property:{title:"Test Hotel",logo:"https://www.w3schools.com/howto/img_snow.jpg",link:"https://en.wikipedia.org/wiki/Cross-origin_resource_sharing",photos:["https://www.yourtrainingedge.com/wp-content/uploads/2019/05/background-calm-clouds-747964.jpg","https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&w=1000&q=80"],address:"CountryName, City, Street, Building 14/3",geolocation:{latitude:41.3850014,longitude:2.14649269999995},description:"Some generic hotel awaits for some generic travelers to come by and book some rooms",facilities:["table","fridge","chair","some","more","facilities"],defaultCurrency:"USD",propertyPolicy:"TBD"}})};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));_().then((function(){return Object(i.render)(o.a.createElement(c.a,{i18n:r.a},o.a.createElement(o.a.StrictMode,null,o.a.createElement(Ie,null))),document.getElementById("root"))})),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},70:function(e,t,a){e.exports={header:"header_header__v9FKw",titleSection:"header_titleSection__J90Ki",selectSection:"header_selectSection__1R6Q3",hotelInfo:"header_hotelInfo__IVsaD"}},91:function(e,t,a){e.exports={facility:"facility_facility__2uYqF",facilityIcon:"facility_facilityIcon__2jtrw",facilityTitle:"facility_facilityTitle__1xC6m"}},92:function(e,t,a){e.exports={hotelFacilitiesTitle:"hotel_facilities_hotelFacilitiesTitle__21AxD",hotelFacilitiesContainer:"hotel_facilities_hotelFacilitiesContainer__3uNsB",hotelFacility:"hotel_facilities_hotelFacility__24eNW"}},93:function(e,t,a){e.exports={ratePlanTaxes:"rate_plan_price_ratePlanTaxes__2ICGt"}},94:function(e,t,a){e.exports={roomAvailability:"room_availability_roomAvailability__3t1Hr",roomAvailabilityIcon:"room_availability_roomAvailabilityIcon__uysYr"}}},[[211,1,2]]]);
//# sourceMappingURL=main.d19000fd.chunk.js.map