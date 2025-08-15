import{aB as Et,aC as Mt,_ as l,g as ce,s as le,t as ue,q as de,a as fe,b as he,c as ct,d as gt,aD as ke,aE as me,aF as ye,e as ge,S as pe,aG as ve,aH as j,l as Tt,aI as Te,aJ as Nt,aK as Bt,aL as xe,aM as be,aN as we,aO as _e,aP as De,aQ as Se,aR as Ce,aS as Gt,aT as Ht,aU as Xt,aV as jt,aW as qt,aX as Ee,k as Me,j as Ie,z as Ae,u as Le}from"./theme.CNuSobGQ.js";import"./framework.qnqjiyko.js";var $t={exports:{}};(function(t,a){(function(r,n){t.exports=n()})(Et,function(){var r="day";return function(n,i,m){var f=function(M){return M.add(4-M.isoWeekday(),r)},_=i.prototype;_.isoWeekYear=function(){return f(this).year()},_.isoWeek=function(M){if(!this.$utils().u(M))return this.add(7*(M-this.isoWeek()),r);var g,I,O,P,B=f(this),C=(g=this.isoWeekYear(),I=this.$u,O=(I?m.utc:m)().year(g).startOf("year"),P=4-O.isoWeekday(),O.isoWeekday()>4&&(P+=7),O.add(P,r));return B.diff(C,"week")+1},_.isoWeekday=function(M){return this.$utils().u(M)?this.day()||7:this.day(this.day()%7?M:M-7)};var Y=_.startOf;_.startOf=function(M,g){var I=this.$utils(),O=!!I.u(g)||g;return I.p(M)==="isoweek"?O?this.date(this.date()-(this.isoWeekday()-1)).startOf("day"):this.date(this.date()-1-(this.isoWeekday()-1)+7).endOf("day"):Y.bind(this)(M,g)}}})})($t);var Fe=$t.exports;const Ye=Mt(Fe);var Kt={exports:{}};(function(t,a){(function(r,n){t.exports=n()})(Et,function(){var r={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},n=/(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|Q|YYYY|YY?|ww?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g,i=/\d/,m=/\d\d/,f=/\d\d?/,_=/\d*[^-_:/,()\s\d]+/,Y={},M=function(p){return(p=+p)+(p>68?1900:2e3)},g=function(p){return function(S){this[p]=+S}},I=[/[+-]\d\d:?(\d\d)?|Z/,function(p){(this.zone||(this.zone={})).offset=function(S){if(!S||S==="Z")return 0;var L=S.match(/([+-]|\d\d)/g),F=60*L[1]+(+L[2]||0);return F===0?0:L[0]==="+"?-F:F}(p)}],O=function(p){var S=Y[p];return S&&(S.indexOf?S:S.s.concat(S.f))},P=function(p,S){var L,F=Y.meridiem;if(F){for(var H=1;H<=24;H+=1)if(p.indexOf(F(H,0,S))>-1){L=H>12;break}}else L=p===(S?"pm":"PM");return L},B={A:[_,function(p){this.afternoon=P(p,!1)}],a:[_,function(p){this.afternoon=P(p,!0)}],Q:[i,function(p){this.month=3*(p-1)+1}],S:[i,function(p){this.milliseconds=100*+p}],SS:[m,function(p){this.milliseconds=10*+p}],SSS:[/\d{3}/,function(p){this.milliseconds=+p}],s:[f,g("seconds")],ss:[f,g("seconds")],m:[f,g("minutes")],mm:[f,g("minutes")],H:[f,g("hours")],h:[f,g("hours")],HH:[f,g("hours")],hh:[f,g("hours")],D:[f,g("day")],DD:[m,g("day")],Do:[_,function(p){var S=Y.ordinal,L=p.match(/\d+/);if(this.day=L[0],S)for(var F=1;F<=31;F+=1)S(F).replace(/\[|\]/g,"")===p&&(this.day=F)}],w:[f,g("week")],ww:[m,g("week")],M:[f,g("month")],MM:[m,g("month")],MMM:[_,function(p){var S=O("months"),L=(O("monthsShort")||S.map(function(F){return F.slice(0,3)})).indexOf(p)+1;if(L<1)throw new Error;this.month=L%12||L}],MMMM:[_,function(p){var S=O("months").indexOf(p)+1;if(S<1)throw new Error;this.month=S%12||S}],Y:[/[+-]?\d+/,g("year")],YY:[m,function(p){this.year=M(p)}],YYYY:[/\d{4}/,g("year")],Z:I,ZZ:I};function C(p){var S,L;S=p,L=Y&&Y.formats;for(var F=(p=S.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g,function(b,T,k){var w=k&&k.toUpperCase();return T||L[k]||r[k]||L[w].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g,function(c,u,h){return u||h.slice(1)})})).match(n),H=F.length,X=0;X<H;X+=1){var Q=F[X],q=B[Q],y=q&&q[0],x=q&&q[1];F[X]=x?{regex:y,parser:x}:Q.replace(/^\[|\]$/g,"")}return function(b){for(var T={},k=0,w=0;k<H;k+=1){var c=F[k];if(typeof c=="string")w+=c.length;else{var u=c.regex,h=c.parser,d=b.slice(w),v=u.exec(d)[0];h.call(T,v),b=b.replace(v,"")}}return function(s){var o=s.afternoon;if(o!==void 0){var e=s.hours;o?e<12&&(s.hours+=12):e===12&&(s.hours=0),delete s.afternoon}}(T),T}}return function(p,S,L){L.p.customParseFormat=!0,p&&p.parseTwoDigitYear&&(M=p.parseTwoDigitYear);var F=S.prototype,H=F.parse;F.parse=function(X){var Q=X.date,q=X.utc,y=X.args;this.$u=q;var x=y[1];if(typeof x=="string"){var b=y[2]===!0,T=y[3]===!0,k=b||T,w=y[2];T&&(w=y[2]),Y=this.$locale(),!b&&w&&(Y=L.Ls[w]),this.$d=function(d,v,s,o){try{if(["x","X"].indexOf(v)>-1)return new Date((v==="X"?1e3:1)*d);var e=C(v)(d),A=e.year,D=e.month,E=e.day,N=e.hours,W=e.minutes,V=e.seconds,$=e.milliseconds,it=e.zone,nt=e.week,dt=new Date,ft=E||(A||D?1:dt.getDate()),ot=A||dt.getFullYear(),z=0;A&&!D||(z=D>0?D-1:dt.getMonth());var Z,G=N||0,st=W||0,K=V||0,rt=$||0;return it?new Date(Date.UTC(ot,z,ft,G,st,K,rt+60*it.offset*1e3)):s?new Date(Date.UTC(ot,z,ft,G,st,K,rt)):(Z=new Date(ot,z,ft,G,st,K,rt),nt&&(Z=o(Z).week(nt).toDate()),Z)}catch{return new Date("")}}(Q,x,q,L),this.init(),w&&w!==!0&&(this.$L=this.locale(w).$L),k&&Q!=this.format(x)&&(this.$d=new Date("")),Y={}}else if(x instanceof Array)for(var c=x.length,u=1;u<=c;u+=1){y[1]=x[u-1];var h=L.apply(this,y);if(h.isValid()){this.$d=h.$d,this.$L=h.$L,this.init();break}u===c&&(this.$d=new Date(""))}else H.call(this,X)}}})})(Kt);var We=Kt.exports;const Ve=Mt(We);var Jt={exports:{}};(function(t,a){(function(r,n){t.exports=n()})(Et,function(){return function(r,n){var i=n.prototype,m=i.format;i.format=function(f){var _=this,Y=this.$locale();if(!this.isValid())return m.bind(this)(f);var M=this.$utils(),g=(f||"YYYY-MM-DDTHH:mm:ssZ").replace(/\[([^\]]+)]|Q|wo|ww|w|WW|W|zzz|z|gggg|GGGG|Do|X|x|k{1,2}|S/g,function(I){switch(I){case"Q":return Math.ceil((_.$M+1)/3);case"Do":return Y.ordinal(_.$D);case"gggg":return _.weekYear();case"GGGG":return _.isoWeekYear();case"wo":return Y.ordinal(_.week(),"W");case"w":case"ww":return M.s(_.week(),I==="w"?1:2,"0");case"W":case"WW":return M.s(_.isoWeek(),I==="W"?1:2,"0");case"k":case"kk":return M.s(String(_.$H===0?24:_.$H),I==="k"?1:2,"0");case"X":return Math.floor(_.$d.getTime()/1e3);case"x":return _.$d.getTime();case"z":return"["+_.offsetName()+"]";case"zzz":return"["+_.offsetName("long")+"]";default:return I}});return m.bind(this)(g)}}})})(Jt);var Oe=Jt.exports;const Pe=Mt(Oe);var _t=function(){var t=l(function(w,c,u,h){for(u=u||{},h=w.length;h--;u[w[h]]=c);return u},"o"),a=[6,8,10,12,13,14,15,16,17,18,20,21,22,23,24,25,26,27,28,29,30,31,33,35,36,38,40],r=[1,26],n=[1,27],i=[1,28],m=[1,29],f=[1,30],_=[1,31],Y=[1,32],M=[1,33],g=[1,34],I=[1,9],O=[1,10],P=[1,11],B=[1,12],C=[1,13],p=[1,14],S=[1,15],L=[1,16],F=[1,19],H=[1,20],X=[1,21],Q=[1,22],q=[1,23],y=[1,25],x=[1,35],b={trace:l(function(){},"trace"),yy:{},symbols_:{error:2,start:3,gantt:4,document:5,EOF:6,line:7,SPACE:8,statement:9,NL:10,weekday:11,weekday_monday:12,weekday_tuesday:13,weekday_wednesday:14,weekday_thursday:15,weekday_friday:16,weekday_saturday:17,weekday_sunday:18,weekend:19,weekend_friday:20,weekend_saturday:21,dateFormat:22,inclusiveEndDates:23,topAxis:24,axisFormat:25,tickInterval:26,excludes:27,includes:28,todayMarker:29,title:30,acc_title:31,acc_title_value:32,acc_descr:33,acc_descr_value:34,acc_descr_multiline_value:35,section:36,clickStatement:37,taskTxt:38,taskData:39,click:40,callbackname:41,callbackargs:42,href:43,clickStatementDebug:44,$accept:0,$end:1},terminals_:{2:"error",4:"gantt",6:"EOF",8:"SPACE",10:"NL",12:"weekday_monday",13:"weekday_tuesday",14:"weekday_wednesday",15:"weekday_thursday",16:"weekday_friday",17:"weekday_saturday",18:"weekday_sunday",20:"weekend_friday",21:"weekend_saturday",22:"dateFormat",23:"inclusiveEndDates",24:"topAxis",25:"axisFormat",26:"tickInterval",27:"excludes",28:"includes",29:"todayMarker",30:"title",31:"acc_title",32:"acc_title_value",33:"acc_descr",34:"acc_descr_value",35:"acc_descr_multiline_value",36:"section",38:"taskTxt",39:"taskData",40:"click",41:"callbackname",42:"callbackargs",43:"href"},productions_:[0,[3,3],[5,0],[5,2],[7,2],[7,1],[7,1],[7,1],[11,1],[11,1],[11,1],[11,1],[11,1],[11,1],[11,1],[19,1],[19,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,2],[9,2],[9,1],[9,1],[9,1],[9,2],[37,2],[37,3],[37,3],[37,4],[37,3],[37,4],[37,2],[44,2],[44,3],[44,3],[44,4],[44,3],[44,4],[44,2]],performAction:l(function(c,u,h,d,v,s,o){var e=s.length-1;switch(v){case 1:return s[e-1];case 2:this.$=[];break;case 3:s[e-1].push(s[e]),this.$=s[e-1];break;case 4:case 5:this.$=s[e];break;case 6:case 7:this.$=[];break;case 8:d.setWeekday("monday");break;case 9:d.setWeekday("tuesday");break;case 10:d.setWeekday("wednesday");break;case 11:d.setWeekday("thursday");break;case 12:d.setWeekday("friday");break;case 13:d.setWeekday("saturday");break;case 14:d.setWeekday("sunday");break;case 15:d.setWeekend("friday");break;case 16:d.setWeekend("saturday");break;case 17:d.setDateFormat(s[e].substr(11)),this.$=s[e].substr(11);break;case 18:d.enableInclusiveEndDates(),this.$=s[e].substr(18);break;case 19:d.TopAxis(),this.$=s[e].substr(8);break;case 20:d.setAxisFormat(s[e].substr(11)),this.$=s[e].substr(11);break;case 21:d.setTickInterval(s[e].substr(13)),this.$=s[e].substr(13);break;case 22:d.setExcludes(s[e].substr(9)),this.$=s[e].substr(9);break;case 23:d.setIncludes(s[e].substr(9)),this.$=s[e].substr(9);break;case 24:d.setTodayMarker(s[e].substr(12)),this.$=s[e].substr(12);break;case 27:d.setDiagramTitle(s[e].substr(6)),this.$=s[e].substr(6);break;case 28:this.$=s[e].trim(),d.setAccTitle(this.$);break;case 29:case 30:this.$=s[e].trim(),d.setAccDescription(this.$);break;case 31:d.addSection(s[e].substr(8)),this.$=s[e].substr(8);break;case 33:d.addTask(s[e-1],s[e]),this.$="task";break;case 34:this.$=s[e-1],d.setClickEvent(s[e-1],s[e],null);break;case 35:this.$=s[e-2],d.setClickEvent(s[e-2],s[e-1],s[e]);break;case 36:this.$=s[e-2],d.setClickEvent(s[e-2],s[e-1],null),d.setLink(s[e-2],s[e]);break;case 37:this.$=s[e-3],d.setClickEvent(s[e-3],s[e-2],s[e-1]),d.setLink(s[e-3],s[e]);break;case 38:this.$=s[e-2],d.setClickEvent(s[e-2],s[e],null),d.setLink(s[e-2],s[e-1]);break;case 39:this.$=s[e-3],d.setClickEvent(s[e-3],s[e-1],s[e]),d.setLink(s[e-3],s[e-2]);break;case 40:this.$=s[e-1],d.setLink(s[e-1],s[e]);break;case 41:case 47:this.$=s[e-1]+" "+s[e];break;case 42:case 43:case 45:this.$=s[e-2]+" "+s[e-1]+" "+s[e];break;case 44:case 46:this.$=s[e-3]+" "+s[e-2]+" "+s[e-1]+" "+s[e];break}},"anonymous"),table:[{3:1,4:[1,2]},{1:[3]},t(a,[2,2],{5:3}),{6:[1,4],7:5,8:[1,6],9:7,10:[1,8],11:17,12:r,13:n,14:i,15:m,16:f,17:_,18:Y,19:18,20:M,21:g,22:I,23:O,24:P,25:B,26:C,27:p,28:S,29:L,30:F,31:H,33:X,35:Q,36:q,37:24,38:y,40:x},t(a,[2,7],{1:[2,1]}),t(a,[2,3]),{9:36,11:17,12:r,13:n,14:i,15:m,16:f,17:_,18:Y,19:18,20:M,21:g,22:I,23:O,24:P,25:B,26:C,27:p,28:S,29:L,30:F,31:H,33:X,35:Q,36:q,37:24,38:y,40:x},t(a,[2,5]),t(a,[2,6]),t(a,[2,17]),t(a,[2,18]),t(a,[2,19]),t(a,[2,20]),t(a,[2,21]),t(a,[2,22]),t(a,[2,23]),t(a,[2,24]),t(a,[2,25]),t(a,[2,26]),t(a,[2,27]),{32:[1,37]},{34:[1,38]},t(a,[2,30]),t(a,[2,31]),t(a,[2,32]),{39:[1,39]},t(a,[2,8]),t(a,[2,9]),t(a,[2,10]),t(a,[2,11]),t(a,[2,12]),t(a,[2,13]),t(a,[2,14]),t(a,[2,15]),t(a,[2,16]),{41:[1,40],43:[1,41]},t(a,[2,4]),t(a,[2,28]),t(a,[2,29]),t(a,[2,33]),t(a,[2,34],{42:[1,42],43:[1,43]}),t(a,[2,40],{41:[1,44]}),t(a,[2,35],{43:[1,45]}),t(a,[2,36]),t(a,[2,38],{42:[1,46]}),t(a,[2,37]),t(a,[2,39])],defaultActions:{},parseError:l(function(c,u){if(u.recoverable)this.trace(c);else{var h=new Error(c);throw h.hash=u,h}},"parseError"),parse:l(function(c){var u=this,h=[0],d=[],v=[null],s=[],o=this.table,e="",A=0,D=0,E=2,N=1,W=s.slice.call(arguments,1),V=Object.create(this.lexer),$={yy:{}};for(var it in this.yy)Object.prototype.hasOwnProperty.call(this.yy,it)&&($.yy[it]=this.yy[it]);V.setInput(c,$.yy),$.yy.lexer=V,$.yy.parser=this,typeof V.yylloc>"u"&&(V.yylloc={});var nt=V.yylloc;s.push(nt);var dt=V.options&&V.options.ranges;typeof $.yy.parseError=="function"?this.parseError=$.yy.parseError:this.parseError=Object.getPrototypeOf(this).parseError;function ft(U){h.length=h.length-2*U,v.length=v.length-U,s.length=s.length-U}l(ft,"popStack");function ot(){var U;return U=d.pop()||V.lex()||N,typeof U!="number"&&(U instanceof Array&&(d=U,U=d.pop()),U=u.symbols_[U]||U),U}l(ot,"lex");for(var z,Z,G,st,K={},rt,J,Rt,yt;;){if(Z=h[h.length-1],this.defaultActions[Z]?G=this.defaultActions[Z]:((z===null||typeof z>"u")&&(z=ot()),G=o[Z]&&o[Z][z]),typeof G>"u"||!G.length||!G[0]){var wt="";yt=[];for(rt in o[Z])this.terminals_[rt]&&rt>E&&yt.push("'"+this.terminals_[rt]+"'");V.showPosition?wt="Parse error on line "+(A+1)+`:
`+V.showPosition()+`
Expecting `+yt.join(", ")+", got '"+(this.terminals_[z]||z)+"'":wt="Parse error on line "+(A+1)+": Unexpected "+(z==N?"end of input":"'"+(this.terminals_[z]||z)+"'"),this.parseError(wt,{text:V.match,token:this.terminals_[z]||z,line:V.yylineno,loc:nt,expected:yt})}if(G[0]instanceof Array&&G.length>1)throw new Error("Parse Error: multiple actions possible at state: "+Z+", token: "+z);switch(G[0]){case 1:h.push(z),v.push(V.yytext),s.push(V.yylloc),h.push(G[1]),z=null,D=V.yyleng,e=V.yytext,A=V.yylineno,nt=V.yylloc;break;case 2:if(J=this.productions_[G[1]][1],K.$=v[v.length-J],K._$={first_line:s[s.length-(J||1)].first_line,last_line:s[s.length-1].last_line,first_column:s[s.length-(J||1)].first_column,last_column:s[s.length-1].last_column},dt&&(K._$.range=[s[s.length-(J||1)].range[0],s[s.length-1].range[1]]),st=this.performAction.apply(K,[e,D,A,$.yy,G[1],v,s].concat(W)),typeof st<"u")return st;J&&(h=h.slice(0,-1*J*2),v=v.slice(0,-1*J),s=s.slice(0,-1*J)),h.push(this.productions_[G[1]][0]),v.push(K.$),s.push(K._$),Rt=o[h[h.length-2]][h[h.length-1]],h.push(Rt);break;case 3:return!0}}return!0},"parse")},T=function(){var w={EOF:1,parseError:l(function(u,h){if(this.yy.parser)this.yy.parser.parseError(u,h);else throw new Error(u)},"parseError"),setInput:l(function(c,u){return this.yy=u||this.yy||{},this._input=c,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},"setInput"),input:l(function(){var c=this._input[0];this.yytext+=c,this.yyleng++,this.offset++,this.match+=c,this.matched+=c;var u=c.match(/(?:\r\n?|\n).*/g);return u?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),c},"input"),unput:l(function(c){var u=c.length,h=c.split(/(?:\r\n?|\n)/g);this._input=c+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-u),this.offset-=u;var d=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),h.length-1&&(this.yylineno-=h.length-1);var v=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:h?(h.length===d.length?this.yylloc.first_column:0)+d[d.length-h.length].length-h[0].length:this.yylloc.first_column-u},this.options.ranges&&(this.yylloc.range=[v[0],v[0]+this.yyleng-u]),this.yyleng=this.yytext.length,this},"unput"),more:l(function(){return this._more=!0,this},"more"),reject:l(function(){if(this.options.backtrack_lexer)this._backtrack=!0;else return this.parseError("Lexical error on line "+(this.yylineno+1)+`. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
`+this.showPosition(),{text:"",token:null,line:this.yylineno});return this},"reject"),less:l(function(c){this.unput(this.match.slice(c))},"less"),pastInput:l(function(){var c=this.matched.substr(0,this.matched.length-this.match.length);return(c.length>20?"...":"")+c.substr(-20).replace(/\n/g,"")},"pastInput"),upcomingInput:l(function(){var c=this.match;return c.length<20&&(c+=this._input.substr(0,20-c.length)),(c.substr(0,20)+(c.length>20?"...":"")).replace(/\n/g,"")},"upcomingInput"),showPosition:l(function(){var c=this.pastInput(),u=new Array(c.length+1).join("-");return c+this.upcomingInput()+`
`+u+"^"},"showPosition"),test_match:l(function(c,u){var h,d,v;if(this.options.backtrack_lexer&&(v={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(v.yylloc.range=this.yylloc.range.slice(0))),d=c[0].match(/(?:\r\n?|\n).*/g),d&&(this.yylineno+=d.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:d?d[d.length-1].length-d[d.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+c[0].length},this.yytext+=c[0],this.match+=c[0],this.matches=c,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(c[0].length),this.matched+=c[0],h=this.performAction.call(this,this.yy,this,u,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),h)return h;if(this._backtrack){for(var s in v)this[s]=v[s];return!1}return!1},"test_match"),next:l(function(){if(this.done)return this.EOF;this._input||(this.done=!0);var c,u,h,d;this._more||(this.yytext="",this.match="");for(var v=this._currentRules(),s=0;s<v.length;s++)if(h=this._input.match(this.rules[v[s]]),h&&(!u||h[0].length>u[0].length)){if(u=h,d=s,this.options.backtrack_lexer){if(c=this.test_match(h,v[s]),c!==!1)return c;if(this._backtrack){u=!1;continue}else return!1}else if(!this.options.flex)break}return u?(c=this.test_match(u,v[d]),c!==!1?c:!1):this._input===""?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+`. Unrecognized text.
`+this.showPosition(),{text:"",token:null,line:this.yylineno})},"next"),lex:l(function(){var u=this.next();return u||this.lex()},"lex"),begin:l(function(u){this.conditionStack.push(u)},"begin"),popState:l(function(){var u=this.conditionStack.length-1;return u>0?this.conditionStack.pop():this.conditionStack[0]},"popState"),_currentRules:l(function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},"_currentRules"),topState:l(function(u){return u=this.conditionStack.length-1-Math.abs(u||0),u>=0?this.conditionStack[u]:"INITIAL"},"topState"),pushState:l(function(u){this.begin(u)},"pushState"),stateStackSize:l(function(){return this.conditionStack.length},"stateStackSize"),options:{"case-insensitive":!0},performAction:l(function(u,h,d,v){switch(d){case 0:return this.begin("open_directive"),"open_directive";case 1:return this.begin("acc_title"),31;case 2:return this.popState(),"acc_title_value";case 3:return this.begin("acc_descr"),33;case 4:return this.popState(),"acc_descr_value";case 5:this.begin("acc_descr_multiline");break;case 6:this.popState();break;case 7:return"acc_descr_multiline_value";case 8:break;case 9:break;case 10:break;case 11:return 10;case 12:break;case 13:break;case 14:this.begin("href");break;case 15:this.popState();break;case 16:return 43;case 17:this.begin("callbackname");break;case 18:this.popState();break;case 19:this.popState(),this.begin("callbackargs");break;case 20:return 41;case 21:this.popState();break;case 22:return 42;case 23:this.begin("click");break;case 24:this.popState();break;case 25:return 40;case 26:return 4;case 27:return 22;case 28:return 23;case 29:return 24;case 30:return 25;case 31:return 26;case 32:return 28;case 33:return 27;case 34:return 29;case 35:return 12;case 36:return 13;case 37:return 14;case 38:return 15;case 39:return 16;case 40:return 17;case 41:return 18;case 42:return 20;case 43:return 21;case 44:return"date";case 45:return 30;case 46:return"accDescription";case 47:return 36;case 48:return 38;case 49:return 39;case 50:return":";case 51:return 6;case 52:return"INVALID"}},"anonymous"),rules:[/^(?:%%\{)/i,/^(?:accTitle\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*\{\s*)/i,/^(?:[\}])/i,/^(?:[^\}]*)/i,/^(?:%%(?!\{)*[^\n]*)/i,/^(?:[^\}]%%*[^\n]*)/i,/^(?:%%*[^\n]*[\n]*)/i,/^(?:[\n]+)/i,/^(?:\s+)/i,/^(?:%[^\n]*)/i,/^(?:href[\s]+["])/i,/^(?:["])/i,/^(?:[^"]*)/i,/^(?:call[\s]+)/i,/^(?:\([\s]*\))/i,/^(?:\()/i,/^(?:[^(]*)/i,/^(?:\))/i,/^(?:[^)]*)/i,/^(?:click[\s]+)/i,/^(?:[\s\n])/i,/^(?:[^\s\n]*)/i,/^(?:gantt\b)/i,/^(?:dateFormat\s[^#\n;]+)/i,/^(?:inclusiveEndDates\b)/i,/^(?:topAxis\b)/i,/^(?:axisFormat\s[^#\n;]+)/i,/^(?:tickInterval\s[^#\n;]+)/i,/^(?:includes\s[^#\n;]+)/i,/^(?:excludes\s[^#\n;]+)/i,/^(?:todayMarker\s[^\n;]+)/i,/^(?:weekday\s+monday\b)/i,/^(?:weekday\s+tuesday\b)/i,/^(?:weekday\s+wednesday\b)/i,/^(?:weekday\s+thursday\b)/i,/^(?:weekday\s+friday\b)/i,/^(?:weekday\s+saturday\b)/i,/^(?:weekday\s+sunday\b)/i,/^(?:weekend\s+friday\b)/i,/^(?:weekend\s+saturday\b)/i,/^(?:\d\d\d\d-\d\d-\d\d\b)/i,/^(?:title\s[^\n]+)/i,/^(?:accDescription\s[^#\n;]+)/i,/^(?:section\s[^\n]+)/i,/^(?:[^:\n]+)/i,/^(?::[^#\n;]+)/i,/^(?::)/i,/^(?:$)/i,/^(?:.)/i],conditions:{acc_descr_multiline:{rules:[6,7],inclusive:!1},acc_descr:{rules:[4],inclusive:!1},acc_title:{rules:[2],inclusive:!1},callbackargs:{rules:[21,22],inclusive:!1},callbackname:{rules:[18,19,20],inclusive:!1},href:{rules:[15,16],inclusive:!1},click:{rules:[24,25],inclusive:!1},INITIAL:{rules:[0,1,3,5,8,9,10,11,12,13,14,17,23,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52],inclusive:!0}}};return w}();b.lexer=T;function k(){this.yy={}}return l(k,"Parser"),k.prototype=b,b.Parser=k,new k}();_t.parser=_t;var ze=_t;j.extend(Ye);j.extend(Ve);j.extend(Pe);var Ut={friday:5,saturday:6},tt="",It="",At=void 0,Lt="",ht=[],kt=[],Ft=new Map,Yt=[],xt=[],ut="",Wt="",te=["active","done","crit","milestone","vert"],Vt=[],mt=!1,Ot=!1,Pt="sunday",bt="saturday",Dt=0,Re=l(function(){Yt=[],xt=[],ut="",Vt=[],pt=0,Ct=void 0,vt=void 0,R=[],tt="",It="",Wt="",At=void 0,Lt="",ht=[],kt=[],mt=!1,Ot=!1,Dt=0,Ft=new Map,Ae(),Pt="sunday",bt="saturday"},"clear"),Ne=l(function(t){It=t},"setAxisFormat"),Be=l(function(){return It},"getAxisFormat"),Ge=l(function(t){At=t},"setTickInterval"),He=l(function(){return At},"getTickInterval"),Xe=l(function(t){Lt=t},"setTodayMarker"),je=l(function(){return Lt},"getTodayMarker"),qe=l(function(t){tt=t},"setDateFormat"),Ue=l(function(){mt=!0},"enableInclusiveEndDates"),Ze=l(function(){return mt},"endDatesAreInclusive"),Qe=l(function(){Ot=!0},"enableTopAxis"),$e=l(function(){return Ot},"topAxisEnabled"),Ke=l(function(t){Wt=t},"setDisplayMode"),Je=l(function(){return Wt},"getDisplayMode"),tr=l(function(){return tt},"getDateFormat"),er=l(function(t){ht=t.toLowerCase().split(/[\s,]+/)},"setIncludes"),rr=l(function(){return ht},"getIncludes"),sr=l(function(t){kt=t.toLowerCase().split(/[\s,]+/)},"setExcludes"),ar=l(function(){return kt},"getExcludes"),ir=l(function(){return Ft},"getLinks"),nr=l(function(t){ut=t,Yt.push(t)},"addSection"),or=l(function(){return Yt},"getSections"),cr=l(function(){let t=Zt();const a=10;let r=0;for(;!t&&r<a;)t=Zt(),r++;return xt=R,xt},"getTasks"),ee=l(function(t,a,r,n){return n.includes(t.format(a.trim()))?!1:r.includes("weekends")&&(t.isoWeekday()===Ut[bt]||t.isoWeekday()===Ut[bt]+1)||r.includes(t.format("dddd").toLowerCase())?!0:r.includes(t.format(a.trim()))},"isInvalidDate"),lr=l(function(t){Pt=t},"setWeekday"),ur=l(function(){return Pt},"getWeekday"),dr=l(function(t){bt=t},"setWeekend"),re=l(function(t,a,r,n){if(!r.length||t.manualEndTime)return;let i;t.startTime instanceof Date?i=j(t.startTime):i=j(t.startTime,a,!0),i=i.add(1,"d");let m;t.endTime instanceof Date?m=j(t.endTime):m=j(t.endTime,a,!0);const[f,_]=fr(i,m,a,r,n);t.endTime=f.toDate(),t.renderEndTime=_},"checkTaskDates"),fr=l(function(t,a,r,n,i){let m=!1,f=null;for(;t<=a;)m||(f=a.toDate()),m=ee(t,r,n,i),m&&(a=a.add(1,"d")),t=t.add(1,"d");return[a,f]},"fixTaskDates"),St=l(function(t,a,r){r=r.trim();const i=/^after\s+(?<ids>[\d\w- ]+)/.exec(r);if(i!==null){let f=null;for(const Y of i.groups.ids.split(" ")){let M=at(Y);M!==void 0&&(!f||M.endTime>f.endTime)&&(f=M)}if(f)return f.endTime;const _=new Date;return _.setHours(0,0,0,0),_}let m=j(r,a.trim(),!0);if(m.isValid())return m.toDate();{Tt.debug("Invalid date:"+r),Tt.debug("With date format:"+a.trim());const f=new Date(r);if(f===void 0||isNaN(f.getTime())||f.getFullYear()<-1e4||f.getFullYear()>1e4)throw new Error("Invalid date:"+r);return f}},"getStartDate"),se=l(function(t){const a=/^(\d+(?:\.\d+)?)([Mdhmswy]|ms)$/.exec(t.trim());return a!==null?[Number.parseFloat(a[1]),a[2]]:[NaN,"ms"]},"parseDuration"),ae=l(function(t,a,r,n=!1){r=r.trim();const m=/^until\s+(?<ids>[\d\w- ]+)/.exec(r);if(m!==null){let g=null;for(const O of m.groups.ids.split(" ")){let P=at(O);P!==void 0&&(!g||P.startTime<g.startTime)&&(g=P)}if(g)return g.startTime;const I=new Date;return I.setHours(0,0,0,0),I}let f=j(r,a.trim(),!0);if(f.isValid())return n&&(f=f.add(1,"d")),f.toDate();let _=j(t);const[Y,M]=se(r);if(!Number.isNaN(Y)){const g=_.add(Y,M);g.isValid()&&(_=g)}return _.toDate()},"getEndDate"),pt=0,lt=l(function(t){return t===void 0?(pt=pt+1,"task"+pt):t},"parseId"),hr=l(function(t,a){let r;a.substr(0,1)===":"?r=a.substr(1,a.length):r=a;const n=r.split(","),i={};zt(n,i,te);for(let f=0;f<n.length;f++)n[f]=n[f].trim();let m="";switch(n.length){case 1:i.id=lt(),i.startTime=t.endTime,m=n[0];break;case 2:i.id=lt(),i.startTime=St(void 0,tt,n[0]),m=n[1];break;case 3:i.id=lt(n[0]),i.startTime=St(void 0,tt,n[1]),m=n[2];break}return m&&(i.endTime=ae(i.startTime,tt,m,mt),i.manualEndTime=j(m,"YYYY-MM-DD",!0).isValid(),re(i,tt,kt,ht)),i},"compileData"),kr=l(function(t,a){let r;a.substr(0,1)===":"?r=a.substr(1,a.length):r=a;const n=r.split(","),i={};zt(n,i,te);for(let m=0;m<n.length;m++)n[m]=n[m].trim();switch(n.length){case 1:i.id=lt(),i.startTime={type:"prevTaskEnd",id:t},i.endTime={data:n[0]};break;case 2:i.id=lt(),i.startTime={type:"getStartDate",startData:n[0]},i.endTime={data:n[1]};break;case 3:i.id=lt(n[0]),i.startTime={type:"getStartDate",startData:n[1]},i.endTime={data:n[2]};break}return i},"parseData"),Ct,vt,R=[],ie={},mr=l(function(t,a){const r={section:ut,type:ut,processed:!1,manualEndTime:!1,renderEndTime:null,raw:{data:a},task:t,classes:[]},n=kr(vt,a);r.raw.startTime=n.startTime,r.raw.endTime=n.endTime,r.id=n.id,r.prevTaskId=vt,r.active=n.active,r.done=n.done,r.crit=n.crit,r.milestone=n.milestone,r.vert=n.vert,r.order=Dt,Dt++;const i=R.push(r);vt=r.id,ie[r.id]=i-1},"addTask"),at=l(function(t){const a=ie[t];return R[a]},"findTaskById"),yr=l(function(t,a){const r={section:ut,type:ut,description:t,task:t,classes:[]},n=hr(Ct,a);r.startTime=n.startTime,r.endTime=n.endTime,r.id=n.id,r.active=n.active,r.done=n.done,r.crit=n.crit,r.milestone=n.milestone,r.vert=n.vert,Ct=r,xt.push(r)},"addTaskOrg"),Zt=l(function(){const t=l(function(r){const n=R[r];let i="";switch(R[r].raw.startTime.type){case"prevTaskEnd":{const m=at(n.prevTaskId);n.startTime=m.endTime;break}case"getStartDate":i=St(void 0,tt,R[r].raw.startTime.startData),i&&(R[r].startTime=i);break}return R[r].startTime&&(R[r].endTime=ae(R[r].startTime,tt,R[r].raw.endTime.data,mt),R[r].endTime&&(R[r].processed=!0,R[r].manualEndTime=j(R[r].raw.endTime.data,"YYYY-MM-DD",!0).isValid(),re(R[r],tt,kt,ht))),R[r].processed},"compileTask");let a=!0;for(const[r,n]of R.entries())t(r),a=a&&n.processed;return a},"compileTasks"),gr=l(function(t,a){let r=a;ct().securityLevel!=="loose"&&(r=Ie(a)),t.split(",").forEach(function(n){at(n)!==void 0&&(oe(n,()=>{window.open(r,"_self")}),Ft.set(n,r))}),ne(t,"clickable")},"setLink"),ne=l(function(t,a){t.split(",").forEach(function(r){let n=at(r);n!==void 0&&n.classes.push(a)})},"setClass"),pr=l(function(t,a,r){if(ct().securityLevel!=="loose"||a===void 0)return;let n=[];if(typeof r=="string"){n=r.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);for(let m=0;m<n.length;m++){let f=n[m].trim();f.startsWith('"')&&f.endsWith('"')&&(f=f.substr(1,f.length-2)),n[m]=f}}n.length===0&&n.push(t),at(t)!==void 0&&oe(t,()=>{Le.runFunc(a,...n)})},"setClickFun"),oe=l(function(t,a){Vt.push(function(){const r=document.querySelector(`[id="${t}"]`);r!==null&&r.addEventListener("click",function(){a()})},function(){const r=document.querySelector(`[id="${t}-text"]`);r!==null&&r.addEventListener("click",function(){a()})})},"pushFun"),vr=l(function(t,a,r){t.split(",").forEach(function(n){pr(n,a,r)}),ne(t,"clickable")},"setClickEvent"),Tr=l(function(t){Vt.forEach(function(a){a(t)})},"bindFunctions"),xr={getConfig:l(()=>ct().gantt,"getConfig"),clear:Re,setDateFormat:qe,getDateFormat:tr,enableInclusiveEndDates:Ue,endDatesAreInclusive:Ze,enableTopAxis:Qe,topAxisEnabled:$e,setAxisFormat:Ne,getAxisFormat:Be,setTickInterval:Ge,getTickInterval:He,setTodayMarker:Xe,getTodayMarker:je,setAccTitle:he,getAccTitle:fe,setDiagramTitle:de,getDiagramTitle:ue,setDisplayMode:Ke,getDisplayMode:Je,setAccDescription:le,getAccDescription:ce,addSection:nr,getSections:or,getTasks:cr,addTask:mr,findTaskById:at,addTaskOrg:yr,setIncludes:er,getIncludes:rr,setExcludes:sr,getExcludes:ar,setClickEvent:vr,setLink:gr,getLinks:ir,bindFunctions:Tr,parseDuration:se,isInvalidDate:ee,setWeekday:lr,getWeekday:ur,setWeekend:dr};function zt(t,a,r){let n=!0;for(;n;)n=!1,r.forEach(function(i){const m="^\\s*"+i+"\\s*$",f=new RegExp(m);t[0].match(f)&&(a[i]=!0,t.shift(1),n=!0)})}l(zt,"getTaskTags");var br=l(function(){Tt.debug("Something is calling, setConf, remove the call")},"setConf"),Qt={monday:Ce,tuesday:Se,wednesday:De,thursday:_e,friday:we,saturday:be,sunday:xe},wr=l((t,a)=>{let r=[...t].map(()=>-1/0),n=[...t].sort((m,f)=>m.startTime-f.startTime||m.order-f.order),i=0;for(const m of n)for(let f=0;f<r.length;f++)if(m.startTime>=r[f]){r[f]=m.endTime,m.order=f+a,f>i&&(i=f);break}return i},"getMaxIntersections"),et,_r=l(function(t,a,r,n){const i=ct().gantt,m=ct().securityLevel;let f;m==="sandbox"&&(f=gt("#i"+a));const _=m==="sandbox"?gt(f.nodes()[0].contentDocument.body):gt("body"),Y=m==="sandbox"?f.nodes()[0].contentDocument:document,M=Y.getElementById(a);et=M.parentElement.offsetWidth,et===void 0&&(et=1200),i.useWidth!==void 0&&(et=i.useWidth);const g=n.db.getTasks();let I=[];for(const y of g)I.push(y.type);I=q(I);const O={};let P=2*i.topPadding;if(n.db.getDisplayMode()==="compact"||i.displayMode==="compact"){const y={};for(const b of g)y[b.section]===void 0?y[b.section]=[b]:y[b.section].push(b);let x=0;for(const b of Object.keys(y)){const T=wr(y[b],x)+1;x+=T,P+=T*(i.barHeight+i.barGap),O[b]=T}}else{P+=g.length*(i.barHeight+i.barGap);for(const y of I)O[y]=g.filter(x=>x.type===y).length}M.setAttribute("viewBox","0 0 "+et+" "+P);const B=_.select(`[id="${a}"]`),C=ke().domain([me(g,function(y){return y.startTime}),ye(g,function(y){return y.endTime})]).rangeRound([0,et-i.leftPadding-i.rightPadding]);function p(y,x){const b=y.startTime,T=x.startTime;let k=0;return b>T?k=1:b<T&&(k=-1),k}l(p,"taskCompare"),g.sort(p),S(g,et,P),ge(B,P,et,i.useMaxWidth),B.append("text").text(n.db.getDiagramTitle()).attr("x",et/2).attr("y",i.titleTopMargin).attr("class","titleText");function S(y,x,b){const T=i.barHeight,k=T+i.barGap,w=i.topPadding,c=i.leftPadding,u=pe().domain([0,I.length]).range(["#00B9FA","#F95002"]).interpolate(ve);F(k,w,c,x,b,y,n.db.getExcludes(),n.db.getIncludes()),H(c,w,x,b),L(y,k,w,c,T,u,x),X(k,w),Q(c,w,x,b)}l(S,"makeGantt");function L(y,x,b,T,k,w,c){y.sort((o,e)=>o.vert===e.vert?0:o.vert?1:-1);const h=[...new Set(y.map(o=>o.order))].map(o=>y.find(e=>e.order===o));B.append("g").selectAll("rect").data(h).enter().append("rect").attr("x",0).attr("y",function(o,e){return e=o.order,e*x+b-2}).attr("width",function(){return c-i.rightPadding/2}).attr("height",x).attr("class",function(o){for(const[e,A]of I.entries())if(o.type===A)return"section section"+e%i.numberSectionStyles;return"section section0"}).enter();const d=B.append("g").selectAll("rect").data(y).enter(),v=n.db.getLinks();if(d.append("rect").attr("id",function(o){return o.id}).attr("rx",3).attr("ry",3).attr("x",function(o){return o.milestone?C(o.startTime)+T+.5*(C(o.endTime)-C(o.startTime))-.5*k:C(o.startTime)+T}).attr("y",function(o,e){return e=o.order,o.vert?i.gridLineStartPadding:e*x+b}).attr("width",function(o){return o.milestone?k:o.vert?.08*k:C(o.renderEndTime||o.endTime)-C(o.startTime)}).attr("height",function(o){return o.vert?g.length*(i.barHeight+i.barGap)+i.barHeight*2:k}).attr("transform-origin",function(o,e){return e=o.order,(C(o.startTime)+T+.5*(C(o.endTime)-C(o.startTime))).toString()+"px "+(e*x+b+.5*k).toString()+"px"}).attr("class",function(o){const e="task";let A="";o.classes.length>0&&(A=o.classes.join(" "));let D=0;for(const[N,W]of I.entries())o.type===W&&(D=N%i.numberSectionStyles);let E="";return o.active?o.crit?E+=" activeCrit":E=" active":o.done?o.crit?E=" doneCrit":E=" done":o.crit&&(E+=" crit"),E.length===0&&(E=" task"),o.milestone&&(E=" milestone "+E),o.vert&&(E=" vert "+E),E+=D,E+=" "+A,e+E}),d.append("text").attr("id",function(o){return o.id+"-text"}).text(function(o){return o.task}).attr("font-size",i.fontSize).attr("x",function(o){let e=C(o.startTime),A=C(o.renderEndTime||o.endTime);if(o.milestone&&(e+=.5*(C(o.endTime)-C(o.startTime))-.5*k,A=e+k),o.vert)return C(o.startTime)+T;const D=this.getBBox().width;return D>A-e?A+D+1.5*i.leftPadding>c?e+T-5:A+T+5:(A-e)/2+e+T}).attr("y",function(o,e){return o.vert?i.gridLineStartPadding+g.length*(i.barHeight+i.barGap)+60:(e=o.order,e*x+i.barHeight/2+(i.fontSize/2-2)+b)}).attr("text-height",k).attr("class",function(o){const e=C(o.startTime);let A=C(o.endTime);o.milestone&&(A=e+k);const D=this.getBBox().width;let E="";o.classes.length>0&&(E=o.classes.join(" "));let N=0;for(const[V,$]of I.entries())o.type===$&&(N=V%i.numberSectionStyles);let W="";return o.active&&(o.crit?W="activeCritText"+N:W="activeText"+N),o.done?o.crit?W=W+" doneCritText"+N:W=W+" doneText"+N:o.crit&&(W=W+" critText"+N),o.milestone&&(W+=" milestoneText"),o.vert&&(W+=" vertText"),D>A-e?A+D+1.5*i.leftPadding>c?E+" taskTextOutsideLeft taskTextOutside"+N+" "+W:E+" taskTextOutsideRight taskTextOutside"+N+" "+W+" width-"+D:E+" taskText taskText"+N+" "+W+" width-"+D}),ct().securityLevel==="sandbox"){let o;o=gt("#i"+a);const e=o.nodes()[0].contentDocument;d.filter(function(A){return v.has(A.id)}).each(function(A){var D=e.querySelector("#"+A.id),E=e.querySelector("#"+A.id+"-text");const N=D.parentNode;var W=e.createElement("a");W.setAttribute("xlink:href",v.get(A.id)),W.setAttribute("target","_top"),N.appendChild(W),W.appendChild(D),W.appendChild(E)})}}l(L,"drawRects");function F(y,x,b,T,k,w,c,u){if(c.length===0&&u.length===0)return;let h,d;for(const{startTime:D,endTime:E}of w)(h===void 0||D<h)&&(h=D),(d===void 0||E>d)&&(d=E);if(!h||!d)return;if(j(d).diff(j(h),"year")>5){Tt.warn("The difference between the min and max time is more than 5 years. This will cause performance issues. Skipping drawing exclude days.");return}const v=n.db.getDateFormat(),s=[];let o=null,e=j(h);for(;e.valueOf()<=d;)n.db.isInvalidDate(e,v,c,u)?o?o.end=e:o={start:e,end:e}:o&&(s.push(o),o=null),e=e.add(1,"d");B.append("g").selectAll("rect").data(s).enter().append("rect").attr("id",function(D){return"exclude-"+D.start.format("YYYY-MM-DD")}).attr("x",function(D){return C(D.start)+b}).attr("y",i.gridLineStartPadding).attr("width",function(D){const E=D.end.add(1,"day");return C(E)-C(D.start)}).attr("height",k-x-i.gridLineStartPadding).attr("transform-origin",function(D,E){return(C(D.start)+b+.5*(C(D.end)-C(D.start))).toString()+"px "+(E*y+.5*k).toString()+"px"}).attr("class","exclude-range")}l(F,"drawExcludeDays");function H(y,x,b,T){let k=Te(C).tickSize(-T+x+i.gridLineStartPadding).tickFormat(Nt(n.db.getAxisFormat()||i.axisFormat||"%Y-%m-%d"));const c=/^([1-9]\d*)(millisecond|second|minute|hour|day|week|month)$/.exec(n.db.getTickInterval()||i.tickInterval);if(c!==null){const u=c[1],h=c[2],d=n.db.getWeekday()||i.weekday;switch(h){case"millisecond":k.ticks(qt.every(u));break;case"second":k.ticks(jt.every(u));break;case"minute":k.ticks(Xt.every(u));break;case"hour":k.ticks(Ht.every(u));break;case"day":k.ticks(Gt.every(u));break;case"week":k.ticks(Qt[d].every(u));break;case"month":k.ticks(Bt.every(u));break}}if(B.append("g").attr("class","grid").attr("transform","translate("+y+", "+(T-50)+")").call(k).selectAll("text").style("text-anchor","middle").attr("fill","#000").attr("stroke","none").attr("font-size",10).attr("dy","1em"),n.db.topAxisEnabled()||i.topAxis){let u=Ee(C).tickSize(-T+x+i.gridLineStartPadding).tickFormat(Nt(n.db.getAxisFormat()||i.axisFormat||"%Y-%m-%d"));if(c!==null){const h=c[1],d=c[2],v=n.db.getWeekday()||i.weekday;switch(d){case"millisecond":u.ticks(qt.every(h));break;case"second":u.ticks(jt.every(h));break;case"minute":u.ticks(Xt.every(h));break;case"hour":u.ticks(Ht.every(h));break;case"day":u.ticks(Gt.every(h));break;case"week":u.ticks(Qt[v].every(h));break;case"month":u.ticks(Bt.every(h));break}}B.append("g").attr("class","grid").attr("transform","translate("+y+", "+x+")").call(u).selectAll("text").style("text-anchor","middle").attr("fill","#000").attr("stroke","none").attr("font-size",10)}}l(H,"makeGrid");function X(y,x){let b=0;const T=Object.keys(O).map(k=>[k,O[k]]);B.append("g").selectAll("text").data(T).enter().append(function(k){const w=k[0].split(Me.lineBreakRegex),c=-(w.length-1)/2,u=Y.createElementNS("http://www.w3.org/2000/svg","text");u.setAttribute("dy",c+"em");for(const[h,d]of w.entries()){const v=Y.createElementNS("http://www.w3.org/2000/svg","tspan");v.setAttribute("alignment-baseline","central"),v.setAttribute("x","10"),h>0&&v.setAttribute("dy","1em"),v.textContent=d,u.appendChild(v)}return u}).attr("x",10).attr("y",function(k,w){if(w>0)for(let c=0;c<w;c++)return b+=T[w-1][1],k[1]*y/2+b*y+x;else return k[1]*y/2+x}).attr("font-size",i.sectionFontSize).attr("class",function(k){for(const[w,c]of I.entries())if(k[0]===c)return"sectionTitle sectionTitle"+w%i.numberSectionStyles;return"sectionTitle"})}l(X,"vertLabels");function Q(y,x,b,T){const k=n.db.getTodayMarker();if(k==="off")return;const w=B.append("g").attr("class","today"),c=new Date,u=w.append("line");u.attr("x1",C(c)+y).attr("x2",C(c)+y).attr("y1",i.titleTopMargin).attr("y2",T-i.titleTopMargin).attr("class","today"),k!==""&&u.attr("style",k.replace(/,/g,";"))}l(Q,"drawToday");function q(y){const x={},b=[];for(let T=0,k=y.length;T<k;++T)Object.prototype.hasOwnProperty.call(x,y[T])||(x[y[T]]=!0,b.push(y[T]));return b}l(q,"checkUnique")},"draw"),Dr={setConf:br,draw:_r},Sr=l(t=>`
  .mermaid-main-font {
        font-family: ${t.fontFamily};
  }

  .exclude-range {
    fill: ${t.excludeBkgColor};
  }

  .section {
    stroke: none;
    opacity: 0.2;
  }

  .section0 {
    fill: ${t.sectionBkgColor};
  }

  .section2 {
    fill: ${t.sectionBkgColor2};
  }

  .section1,
  .section3 {
    fill: ${t.altSectionBkgColor};
    opacity: 0.2;
  }

  .sectionTitle0 {
    fill: ${t.titleColor};
  }

  .sectionTitle1 {
    fill: ${t.titleColor};
  }

  .sectionTitle2 {
    fill: ${t.titleColor};
  }

  .sectionTitle3 {
    fill: ${t.titleColor};
  }

  .sectionTitle {
    text-anchor: start;
    font-family: ${t.fontFamily};
  }


  /* Grid and axis */

  .grid .tick {
    stroke: ${t.gridColor};
    opacity: 0.8;
    shape-rendering: crispEdges;
  }

  .grid .tick text {
    font-family: ${t.fontFamily};
    fill: ${t.textColor};
  }

  .grid path {
    stroke-width: 0;
  }


  /* Today line */

  .today {
    fill: none;
    stroke: ${t.todayLineColor};
    stroke-width: 2px;
  }


  /* Task styling */

  /* Default task */

  .task {
    stroke-width: 2;
  }

  .taskText {
    text-anchor: middle;
    font-family: ${t.fontFamily};
  }

  .taskTextOutsideRight {
    fill: ${t.taskTextDarkColor};
    text-anchor: start;
    font-family: ${t.fontFamily};
  }

  .taskTextOutsideLeft {
    fill: ${t.taskTextDarkColor};
    text-anchor: end;
  }


  /* Special case clickable */

  .task.clickable {
    cursor: pointer;
  }

  .taskText.clickable {
    cursor: pointer;
    fill: ${t.taskTextClickableColor} !important;
    font-weight: bold;
  }

  .taskTextOutsideLeft.clickable {
    cursor: pointer;
    fill: ${t.taskTextClickableColor} !important;
    font-weight: bold;
  }

  .taskTextOutsideRight.clickable {
    cursor: pointer;
    fill: ${t.taskTextClickableColor} !important;
    font-weight: bold;
  }


  /* Specific task settings for the sections*/

  .taskText0,
  .taskText1,
  .taskText2,
  .taskText3 {
    fill: ${t.taskTextColor};
  }

  .task0,
  .task1,
  .task2,
  .task3 {
    fill: ${t.taskBkgColor};
    stroke: ${t.taskBorderColor};
  }

  .taskTextOutside0,
  .taskTextOutside2
  {
    fill: ${t.taskTextOutsideColor};
  }

  .taskTextOutside1,
  .taskTextOutside3 {
    fill: ${t.taskTextOutsideColor};
  }


  /* Active task */

  .active0,
  .active1,
  .active2,
  .active3 {
    fill: ${t.activeTaskBkgColor};
    stroke: ${t.activeTaskBorderColor};
  }

  .activeText0,
  .activeText1,
  .activeText2,
  .activeText3 {
    fill: ${t.taskTextDarkColor} !important;
  }


  /* Completed task */

  .done0,
  .done1,
  .done2,
  .done3 {
    stroke: ${t.doneTaskBorderColor};
    fill: ${t.doneTaskBkgColor};
    stroke-width: 2;
  }

  .doneText0,
  .doneText1,
  .doneText2,
  .doneText3 {
    fill: ${t.taskTextDarkColor} !important;
  }


  /* Tasks on the critical line */

  .crit0,
  .crit1,
  .crit2,
  .crit3 {
    stroke: ${t.critBorderColor};
    fill: ${t.critBkgColor};
    stroke-width: 2;
  }

  .activeCrit0,
  .activeCrit1,
  .activeCrit2,
  .activeCrit3 {
    stroke: ${t.critBorderColor};
    fill: ${t.activeTaskBkgColor};
    stroke-width: 2;
  }

  .doneCrit0,
  .doneCrit1,
  .doneCrit2,
  .doneCrit3 {
    stroke: ${t.critBorderColor};
    fill: ${t.doneTaskBkgColor};
    stroke-width: 2;
    cursor: pointer;
    shape-rendering: crispEdges;
  }

  .milestone {
    transform: rotate(45deg) scale(0.8,0.8);
  }

  .milestoneText {
    font-style: italic;
  }
  .doneCritText0,
  .doneCritText1,
  .doneCritText2,
  .doneCritText3 {
    fill: ${t.taskTextDarkColor} !important;
  }

  .vert {
    stroke: ${t.vertLineColor};
  }

  .vertText {
    font-size: 15px;
    text-anchor: middle;
    fill: ${t.vertLineColor} !important;
  }

  .activeCritText0,
  .activeCritText1,
  .activeCritText2,
  .activeCritText3 {
    fill: ${t.taskTextDarkColor} !important;
  }

  .titleText {
    text-anchor: middle;
    font-size: 18px;
    fill: ${t.titleColor||t.textColor};
    font-family: ${t.fontFamily};
  }
`,"getStyles"),Cr=Sr,Ir={parser:ze,db:xr,renderer:Dr,styles:Cr};export{Ir as diagram};
