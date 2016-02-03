var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

$urx = (function(window) {
    "use strict";
    var urx = {}; 

    // ==================
    // API Key Management
    // ==================

    var apiKey = null;
    urx["setApiKey"] = function(key) {
        apiKey = key;
    };

    // ==============
    // JSONLD Helpers
    // ==============

    // Get scalar value from a JSONLD map
    urx["getSingle"] = function(map, key) {
        if(map === undefined || key === undefined) {
            return undefined;
        };
        var value = map[key];
        if (value === null) {
            return undefined;
        } else if (Array.isArray(value)) {
            return value[0];
        } else {
            return value;
        }
    };

    // Get a vector value from a JSONLD map
    urx["getMany"] = function(map, key) {
        if(map === undefined || key === undefined) {
            return [];
        };
        var value = map[key];
        if (value === null) {
            return [];
        } else if (Array.isArray(value)) {
            return value;
        } else {
            return [value];
        }
    };

    // ====================
    // User Agent Detection
    // ====================

    // ua-parser-js (https://github.com/faisalman/ua-parser-js)
    (function(window,undefined){"use strict";var LIBVERSION="0.7.3",EMPTY="",UNKNOWN="?",FUNC_TYPE="function",UNDEF_TYPE="undefined",OBJ_TYPE="object",MAJOR="major",MODEL="model",NAME="name",TYPE="type",VENDOR="vendor",VERSION="version",ARCHITECTURE="architecture",CONSOLE="console",MOBILE="mobile",TABLET="tablet",SMARTTV="smarttv",WEARABLE="wearable",EMBEDDED="embedded";var util={extend:function(regexes,extensions){for(var i in extensions){if("browser cpu device engine os".indexOf(i)!==-1&&extensions[i].length%2===0){regexes[i]=extensions[i].concat(regexes[i])}}return regexes},has:function(str1,str2){if(typeof str1==="string"){return str2.toLowerCase().indexOf(str1.toLowerCase())!==-1}},lowerize:function(str){return str.toLowerCase()}};var mapper={rgx:function(){var result,i=0,j,k,p,q,matches,match,args=arguments;while(i<args.length&&!matches){var regex=args[i],props=args[i+1];if(typeof result===UNDEF_TYPE){result={};for(p in props){q=props[p];if(typeof q===OBJ_TYPE){result[q[0]]=undefined}else{result[q]=undefined}}}j=k=0;while(j<regex.length&&!matches){matches=regex[j++].exec(this.getUA());if(!!matches){for(p=0;p<props.length;p++){match=matches[++k];q=props[p];if(typeof q===OBJ_TYPE&&q.length>0){if(q.length==2){if(typeof q[1]==FUNC_TYPE){result[q[0]]=q[1].call(this,match)}else{result[q[0]]=q[1]}}else if(q.length==3){if(typeof q[1]===FUNC_TYPE&&!(q[1].exec&&q[1].test)){result[q[0]]=match?q[1].call(this,match,q[2]):undefined}else{result[q[0]]=match?match.replace(q[1],q[2]):undefined}}else if(q.length==4){result[q[0]]=match?q[3].call(this,match.replace(q[1],q[2])):undefined}}else{result[q]=match?match:undefined}}}}i+=2}return result},str:function(str,map){for(var i in map){if(typeof map[i]===OBJ_TYPE&&map[i].length>0){for(var j=0;j<map[i].length;j++){if(util.has(map[i][j],str)){return i===UNKNOWN?undefined:i}}}else if(util.has(map[i],str)){return i===UNKNOWN?undefined:i}}return str}};var maps={browser:{oldsafari:{major:{1:["/8","/1","/3"],2:"/4","?":"/"},version:{"1.0":"/8",1.2:"/1",1.3:"/3","2.0":"/412","2.0.2":"/416","2.0.3":"/417","2.0.4":"/419","?":"/"}}},device:{amazon:{model:{"Fire Phone":["SD","KF"]}},sprint:{model:{"Evo Shift 4G":"7373KT"},vendor:{HTC:"APA",Sprint:"Sprint"}}},os:{windows:{version:{ME:"4.90","NT 3.11":"NT3.51","NT 4.0":"NT4.0",2000:"NT 5.0",XP:["NT 5.1","NT 5.2"],Vista:"NT 6.0",7:"NT 6.1",8:"NT 6.2",8.1:"NT 6.3",10:"NT 6.4",RT:"ARM"}}}};var regexes={browser:[[/(opera\smini)\/((\d+)?[\w\.-]+)/i,/(opera\s[mobiletab]+).+version\/((\d+)?[\w\.-]+)/i,/(opera).+version\/((\d+)?[\w\.]+)/i,/(opera)[\/\s]+((\d+)?[\w\.]+)/i],[NAME,VERSION,MAJOR],[/\s(opr)\/((\d+)?[\w\.]+)/i],[[NAME,"Opera"],VERSION,MAJOR],[/(kindle)\/((\d+)?[\w\.]+)/i,/(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?((\d+)?[\w\.]+)*/i,/(avant\s|iemobile|slim|baidu)(?:browser)?[\/\s]?((\d+)?[\w\.]*)/i,/(?:ms|\()(ie)\s((\d+)?[\w\.]+)/i,/(rekonq)((?:\/)[\w\.]+)*/i,/(chromium|flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron)\/((\d+)?[\w\.-]+)/i],[NAME,VERSION,MAJOR],[/(trident).+rv[:\s]((\d+)?[\w\.]+).+like\sgecko/i],[[NAME,"IE"],VERSION,MAJOR],[/(yabrowser)\/((\d+)?[\w\.]+)/i],[[NAME,"Yandex"],VERSION,MAJOR],[/(comodo_dragon)\/((\d+)?[\w\.]+)/i],[[NAME,/_/g," "],VERSION,MAJOR],[/(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?((\d+)?[\w\.]+)/i,/(uc\s?browser|qqbrowser)[\/\s]?((\d+)?[\w\.]+)/i],[NAME,VERSION,MAJOR],[/(dolfin)\/((\d+)?[\w\.]+)/i],[[NAME,"Dolphin"],VERSION,MAJOR],[/((?:android.+)crmo|crios)\/((\d+)?[\w\.]+)/i],[[NAME,"Chrome"],VERSION,MAJOR],[/version\/((\d+)?[\w\.]+).+?mobile\/\w+\s(safari)/i],[VERSION,MAJOR,[NAME,"Mobile Safari"]],[/version\/((\d+)?[\w\.]+).+?(mobile\s?safari|safari)/i],[VERSION,MAJOR,NAME],[/webkit.+?(mobile\s?safari|safari)((\/[\w\.]+))/i],[NAME,[MAJOR,mapper.str,maps.browser.oldsafari.major],[VERSION,mapper.str,maps.browser.oldsafari.version]],[/(konqueror)\/((\d+)?[\w\.]+)/i,/(webkit|khtml)\/((\d+)?[\w\.]+)/i],[NAME,VERSION,MAJOR],[/(navigator|netscape)\/((\d+)?[\w\.-]+)/i],[[NAME,"Netscape"],VERSION,MAJOR],[/(swiftfox)/i,/(icedragon|iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo|conkeror)[\/\s]?((\d+)?[\w\.\+]+)/i,/(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix)\/((\d+)?[\w\.-]+)/i,/(mozilla)\/((\d+)?[\w\.]+).+rv\:.+gecko\/\d+/i,/(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf)[\/\s]?((\d+)?[\w\.]+)/i,/(links)\s\(((\d+)?[\w\.]+)/i,/(gobrowser)\/?((\d+)?[\w\.]+)*/i,/(ice\s?browser)\/v?((\d+)?[\w\._]+)/i,/(mosaic)[\/\s]((\d+)?[\w\.]+)/i],[NAME,VERSION,MAJOR]],cpu:[[/(?:(amd|x(?:(?:86|64)[_-])?|wow|win)64)[;\)]/i],[[ARCHITECTURE,"amd64"]],[/(ia32(?=;))/i],[[ARCHITECTURE,util.lowerize]],[/((?:i[346]|x)86)[;\)]/i],[[ARCHITECTURE,"ia32"]],[/windows\s(ce|mobile);\sppc;/i],[[ARCHITECTURE,"arm"]],[/((?:ppc|powerpc)(?:64)?)(?:\smac|;|\))/i],[[ARCHITECTURE,/ower/,"",util.lowerize]],[/(sun4\w)[;\)]/i],[[ARCHITECTURE,"sparc"]],[/((?:avr32|ia64(?=;))|68k(?=\))|arm(?:64|(?=v\d+;))|(?=atmel\s)avr|(?:irix|mips|sparc)(?:64)?(?=;)|pa-risc)/i],[[ARCHITECTURE,util.lowerize]]],device:[[/\((ipad|playbook);[\w\s\);-]+(rim|apple)/i],[MODEL,VENDOR,[TYPE,TABLET]],[/applecoremedia\/[\w\.]+ \((ipad)/],[MODEL,[VENDOR,"Apple"],[TYPE,TABLET]],[/(apple\s{0,1}tv)/i],[[MODEL,"Apple TV"],[VENDOR,"Apple"]],[/(archos)\s(gamepad2?)/i,/(hp).+(touchpad)/i,/(kindle)\/([\w\.]+)/i,/\s(nook)[\w\s]+build\/(\w+)/i,/(dell)\s(strea[kpr\s\d]*[\dko])/i],[VENDOR,MODEL,[TYPE,TABLET]],[/(kf[A-z]+)\sbuild\/[\w\.]+.*silk\//i],[MODEL,[VENDOR,"Amazon"],[TYPE,TABLET]],[/(sd|kf)[0349hijorstuw]+\sbuild\/[\w\.]+.*silk\//i],[[MODEL,mapper.str,maps.device.amazon.model],[VENDOR,"Amazon"],[TYPE,MOBILE]],[/\((ip[honed|\s\w*]+);.+(apple)/i],[MODEL,VENDOR,[TYPE,MOBILE]],[/\((ip[honed|\s\w*]+);/i],[MODEL,[VENDOR,"Apple"],[TYPE,MOBILE]],[/(blackberry)[\s-]?(\w+)/i,/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|huawei|meizu|motorola|polytron)[\s_-]?([\w-]+)*/i,/(hp)\s([\w\s]+\w)/i,/(asus)-?(\w+)/i],[VENDOR,MODEL,[TYPE,MOBILE]],[/\(bb10;\s(\w+)/i],[MODEL,[VENDOR,"BlackBerry"],[TYPE,MOBILE]],[/android.+(transfo[prime\s]{4,10}\s\w+|eeepc|slider\s\w+|nexus 7)/i],[MODEL,[VENDOR,"Asus"],[TYPE,TABLET]],[/(sony)\s(tablet\s[ps])/i],[VENDOR,MODEL,[TYPE,TABLET]],[/\s(ouya)\s/i,/(nintendo)\s([wids3u]+)/i],[VENDOR,MODEL,[TYPE,CONSOLE]],[/android.+;\s(shield)\sbuild/i],[MODEL,[VENDOR,"Nvidia"],[TYPE,CONSOLE]],[/(playstation\s[3portablevi]+)/i],[MODEL,[VENDOR,"Sony"],[TYPE,CONSOLE]],[/(sprint\s(\w+))/i],[[VENDOR,mapper.str,maps.device.sprint.vendor],[MODEL,mapper.str,maps.device.sprint.model],[TYPE,MOBILE]],[/(lenovo)\s?(S(?:5000|6000)+(?:[-][\w+]))/i],[VENDOR,MODEL,[TYPE,TABLET]],[/(htc)[;_\s-]+([\w\s]+(?=\))|\w+)*/i,/(zte)-(\w+)*/i,/(alcatel|geeksphone|huawei|lenovo|nexian|panasonic|(?=;\s)sony)[_\s-]?([\w-]+)*/i],[VENDOR,[MODEL,/_/g," "],[TYPE,MOBILE]],[/[\s\(;](xbox(?:\sone)?)[\s\);]/i],[MODEL,[VENDOR,"Microsoft"],[TYPE,CONSOLE]],[/(kin\.[onetw]{3})/i],[[MODEL,/\./g," "],[VENDOR,"Microsoft"],[TYPE,MOBILE]],[/\s((milestone|droid(?:[2-4x]|\s(?:bionic|x2|pro|razr))?(:?\s4g)?))[\w\s]+build\//i,/(mot)[\s-]?(\w+)*/i],[[VENDOR,"Motorola"],MODEL,[TYPE,MOBILE]],[/android.+\s(mz60\d|xoom[\s2]{0,2})\sbuild\//i],[MODEL,[VENDOR,"Motorola"],[TYPE,TABLET]],[/android.+((sch-i[89]0\d|shw-m380s|gt-p\d{4}|gt-n8000|sgh-t8[56]9|nexus 10))/i,/((SM-T\w+))/i],[[VENDOR,"Samsung"],MODEL,[TYPE,TABLET]],[/((s[cgp]h-\w+|gt-\w+|galaxy\snexus|sm-n900))/i,/(sam[sung]*)[\s-]*(\w+-?[\w-]*)*/i,/sec-((sgh\w+))/i],[[VENDOR,"Samsung"],MODEL,[TYPE,MOBILE]],[/(samsung);smarttv/i],[VENDOR,MODEL,[TYPE,SMARTTV]],[/\(dtv[\);].+(aquos)/i],[MODEL,[VENDOR,"Sharp"],[TYPE,SMARTTV]],[/sie-(\w+)*/i],[MODEL,[VENDOR,"Siemens"],[TYPE,MOBILE]],[/(maemo|nokia).*(n900|lumia\s\d+)/i,/(nokia)[\s_-]?([\w-]+)*/i],[[VENDOR,"Nokia"],MODEL,[TYPE,MOBILE]],[/android\s3\.[\s\w-;]{10}(a\d{3})/i],[MODEL,[VENDOR,"Acer"],[TYPE,TABLET]],[/android\s3\.[\s\w-;]{10}(lg?)-([06cv9]{3,4})/i],[[VENDOR,"LG"],MODEL,[TYPE,TABLET]],[/(lg) netcast\.tv/i],[VENDOR,MODEL,[TYPE,SMARTTV]],[/(nexus\s[45])/i,/lg[e;\s\/-]+(\w+)*/i],[MODEL,[VENDOR,"LG"],[TYPE,MOBILE]],[/android.+(ideatab[a-z0-9\-\s]+)/i],[MODEL,[VENDOR,"Lenovo"],[TYPE,TABLET]],[/linux;.+((jolla));/i],[VENDOR,MODEL,[TYPE,MOBILE]],[/((pebble))app\/[\d\.]+\s/i],[VENDOR,MODEL,[TYPE,WEARABLE]],[/android.+;\s(glass)\s\d/i],[MODEL,[VENDOR,"Google"],[TYPE,WEARABLE]],[/(mobile|tablet);.+rv\:.+gecko\//i],[[TYPE,util.lowerize],VENDOR,MODEL]],engine:[[/(presto)\/([\w\.]+)/i,/(webkit|trident|netfront|netsurf|amaya|lynx|w3m)\/([\w\.]+)/i,/(khtml|tasman|links)[\/\s]\(?([\w\.]+)/i,/(icab)[\/\s]([23]\.[\d\.]+)/i],[NAME,VERSION],[/rv\:([\w\.]+).*(gecko)/i],[VERSION,NAME]],os:[[/microsoft\s(windows)\s(vista|xp)/i],[NAME,VERSION],[/(windows)\snt\s6\.2;\s(arm)/i,/(windows\sphone(?:\sos)*|windows\smobile|windows)[\s\/]?([ntce\d\.\s]+\w)/i],[NAME,[VERSION,mapper.str,maps.os.windows.version]],[/(win(?=3|9|n)|win\s9x\s)([nt\d\.]+)/i],[[NAME,"Windows"],[VERSION,mapper.str,maps.os.windows.version]],[/\((bb)(10);/i],[[NAME,"BlackBerry"],VERSION],[/(blackberry)\w*\/?([\w\.]+)*/i,/(tizen)[\/\s]([\w\.]+)/i,/(android|webos|palm\os|qnx|bada|rim\stablet\sos|meego|contiki)[\/\s-]?([\w\.]+)*/i,/linux;.+(sailfish);/i],[NAME,VERSION],[/(symbian\s?os|symbos|s60(?=;))[\/\s-]?([\w\.]+)*/i],[[NAME,"Symbian"],VERSION],[/\((series40);/i],[NAME],[/mozilla.+\(mobile;.+gecko.+firefox/i],[[NAME,"Firefox OS"],VERSION],[/(nintendo|playstation)\s([wids3portablevu]+)/i,/(mint)[\/\s\(]?(\w+)*/i,/(mageia|vectorlinux)[;\s]/i,/(joli|[kxln]?ubuntu|debian|[open]*suse|gentoo|arch|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk|linpus)[\/\s-]?([\w\.-]+)*/i,/(hurd|linux)\s?([\w\.]+)*/i,/(gnu)\s?([\w\.]+)*/i],[NAME,VERSION],[/(cros)\s[\w]+\s([\w\.]+\w)/i],[[NAME,"Chromium OS"],VERSION],[/(sunos)\s?([\w\.]+\d)*/i],[[NAME,"Solaris"],VERSION],[/\s([frentopc-]{0,4}bsd|dragonfly)\s?([\w\.]+)*/i],[NAME,VERSION],[/(ip[honead]+)(?:.*os\s*([\w]+)*\slike\smac|;\sopera)/i],[[NAME,"iOS"],[VERSION,/_/g,"."]],[/(mac\sos\sx)\s?([\w\s\.]+\w)*/i,/(macintosh|mac(?=_powerpc)\s)/i],[[NAME,"Mac OS"],[VERSION,/_/g,"."]],[/((?:open)?solaris)[\/\s-]?([\w\.]+)*/i,/(haiku)\s(\w+)/i,/(aix)\s((\d)(?=\.|\)|\s)[\w\.]*)*/i,/(plan\s9|minix|beos|os\/2|amigaos|morphos|risc\sos|openvms)/i,/(unix)\s?([\w\.]+)*/i],[NAME,VERSION]]};var UAParser=function(uastring,extensions){if(!(this instanceof UAParser)){return new UAParser(uastring,extensions).getResult()}var ua=uastring||(window&&window.navigator&&window.navigator.userAgent?window.navigator.userAgent:EMPTY);var rgxmap=extensions?util.extend(regexes,extensions):regexes;this.getBrowser=function(){return mapper.rgx.apply(this,rgxmap.browser)};this.getCPU=function(){return mapper.rgx.apply(this,rgxmap.cpu)};this.getDevice=function(){return mapper.rgx.apply(this,rgxmap.device)};this.getEngine=function(){return mapper.rgx.apply(this,rgxmap.engine)};this.getOS=function(){return mapper.rgx.apply(this,rgxmap.os)};this.getResult=function(){return{ua:this.getUA(),browser:this.getBrowser(),engine:this.getEngine(),os:this.getOS(),device:this.getDevice(),cpu:this.getCPU()}};this.getUA=function(){return ua};this.setUA=function(uastring){ua=uastring;return this};this.setUA(ua)};UAParser.VERSION=LIBVERSION;UAParser.BROWSER={NAME:NAME,MAJOR:MAJOR,VERSION:VERSION};UAParser.CPU={ARCHITECTURE:ARCHITECTURE};UAParser.DEVICE={MODEL:MODEL,VENDOR:VENDOR,TYPE:TYPE,CONSOLE:CONSOLE,MOBILE:MOBILE,SMARTTV:SMARTTV,TABLET:TABLET,WEARABLE:WEARABLE,EMBEDDED:EMBEDDED};UAParser.ENGINE={NAME:NAME,VERSION:VERSION};UAParser.OS={NAME:NAME,VERSION:VERSION};if(typeof exports!==UNDEF_TYPE){if(typeof module!==UNDEF_TYPE&&module.exports){exports=module.exports=UAParser}exports.UAParser=UAParser}else{window.UAParser=UAParser;if(typeof define===FUNC_TYPE&&define.amd){define(function(){return UAParser})}var $=window.jQuery||window.Zepto;if(typeof $!==UNDEF_TYPE){var parser=new UAParser;$.ua=parser.getResult();$.ua.get=function(){return parser.getUA()};$.ua.set=function(uastring){parser.setUA(uastring);var result=parser.getResult();for(var prop in result){$.ua[prop]=result[prop]}}}}})(window);

    var currentUserAgent = function() {
        return {"ua":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.111 Safari/537.36","browser":{"name":"Chrome","version":"47.0.2526.111","major":"47"},"engine":{"name":"WebKit","version":"537.36"},"os":{"name":"Mac OS","version":"10.10.0"},"device":{},"cpu":{},"platform":"Desktop"};
    };

    var APPLE_IPHONE = "Apple iPhone";
    var APPLE_IPAD = "Apple iPad";
    var IOS = "iOS";
    var ANDROID = "Android";
    var DESKTOP = "Desktop";

    var plaformFromUserAgent = function(string) {
        var client = (function(){
            var uaParser = new UAParser();
            uaParser.setUA(string);
            return uaParser.getResult();
        })();
        switch(client.os.name) {
            case "Android":
                client.platform = ANDROID;
                break;
            case "iOS":
                if(client.device.type === "tablet") {
                    client.platform = APPLE_IPAD;
                } else {
                    client.platform = APPLE_IPHONE;
                }
                break;
            default:
                client.platform = DESKTOP;
                break;
        }
        return client;
    };

    var isAndroidNewChrome = function(client) { return client.os.name === "Android" && client.browser.name === "Chrome" && client.browser.major >= 25; };
    var isChrome = function(client) { return client.browser.name === "Chrome" || client.browser.name === "Chromium"; };
    var isFirefox = function(client) { return client.browser.name === "Firefox"; };
    var versionGreaterThan = function(client, versionNumber) { return client.browser.major > versionNumber; };
    var versionGreaterThanOrEq = function(client, versionNumber) { return client.browser.major >= versionNumber; };
    var versionLessThan = function(client, versionNumber) { return client.browser.major < versionNumber; };
    var versionLessThanOrEq = function(client, versionNumber) { return client.browser.major <= versionNumber; };


    // ===================
    // API Request Helpers
    // ===================

    var urxApiBaseUrl = "https://beta.urx.io/";
    // The callback will be invoked with the originating request object
    var makeApiRequest = function(url, additionalHeaders, success, failure) {

        var request = new XMLHttpRequest();
        var handleRequest = function() {
            if (request.readyState === 4) success(request);
        };
        var handleTimeout = function() {
            failure(request, "The request to URX API has timed out.");
        };
        request.onreadystatechange = handleRequest;
        request.ontimeout = handleTimeout;
        request.onerror = function() {
            failure(request, "There was an error loading data from the URX API.");
        };
        request.open("GET", url);
        if (apiKey === null) {
            throw "Error, No URX API Key Provided. Please set your API key before making requests.";
        }

        var ua = currentUserAgent();
        if (additionalHeaders) {
            for(var header in additionalHeaders) {
                if (additionalHeaders[header] !== null) {
                    request.setRequestHeader(header, additionalHeaders[header]);
                }
            }
        }
        request.setRequestHeader("X-API-Key", apiKey);
        if (ua.platform != DESKTOP) {
            // TODO: Include OS version
            var clientFeatures = [ua.os.name.toLowerCase(), ua.os.version, "web"];
            var sdkClientUserAgent = "urx-client/1.0 (" + clientFeatures.join("; ") + ")";
            request.setRequestHeader("X-Alternate-User-Agent", sdkClientUserAgent);
        }
        request.setRequestHeader("Accept", "application/json");
        // request.overrideMimeType("application/json");
        request.send();
    };

    var handleFailures = function(request, failure) {
        failure = failure || (function(){});
        switch(request.status) {
            case 400:
                failure(request, "The request going to the URX API was bad.");
                break;
            case 403:
                failure(request, "The URX API will not allow you to execute this request, maybe your API Key is not valid?");
                break;
            case 404:
                failure(request, "No results found for the requested query.");
                break;
            case 422:
                failure(request, "The URX API was unable to process this request.");
                break;
            case 406:
                failure(request, "The query to be executed by the API is unacceptable.");
                break;
            case 410:
                failure(request, "The intended destination no longer exists.");
                break;
            case 429:
                failure(request, "This API key is being rate limited by the URX API.");
                break;
            case 500:
            case 502:
            case 503:
            case 504:
                failure(request, "The URX API is currently unavailable.");
                break;
        }

    };

    // ===================
    // Deeplink Resolution
    // ===================
    var clearTimeoutOnPageUnload = function(redirectTimer) {
        window.addEventListener("pagehide", function() {
            clearTimeout(redirectTimer);
        });
        window.addEventListener("pageshow", function() {
            clearTimeout(redirectTimer);
        });
        window.addEventListener("blur", function() {
            clearTimeout(redirectTimer);
        });
        window.addEventListener("unload", function() {
            clearTimeout(redirectTimer);
        });
        document.addEventListener("webkitvisibilitychange", function() {
            if (document.webkitHidden) {
                clearTimeout(redirectTimer);
            }
        });
    };

    var iframeDeeplinkLaunch = function(deeplink, timeoutTime, timeoutCallback) {
        if (deeplink.match(/^http/)) {
            window.location = deeplink;
            return;
        }
        var hiddenIFrame = document.createElement("iframe");
        hiddenIFrame.style.width = "1px";
        hiddenIFrame.style.height = "1px";
        hiddenIFrame.border = "none";
        hiddenIFrame.style.display = "none";
        hiddenIFrame.src = deeplink;
        document.body.appendChild(hiddenIFrame);
        clearTimeoutOnPageUnload(setTimeout(function() {
            timeoutCallback();
        }, timeoutTime));
    };

    function ios9DeeplinkLaunch(deeplinkUrl, timeoutCallback) {
        setTimeout(function() {
            window.top.location.reload(false);
            setTimeout(timeoutCallback, 1);
        }, 1);
        window.top.location = deeplinkUrl;
    }


    var desktopLaunch = function(desktopLink) {
        window.location = desktopLink;
    };

    var androidDeeplinkLaunch = function(installLink, deeplink, appId, timeoutCallback) {
        // If no appId was given, this is actually a web link
        if (appId === undefined) {
            window.location = deeplink;
            return;
        }
        var ua = currentUserAgent();

        if (isFirefox(ua) || (isChrome(ua) && versionLessThan(ua, 25))) {
            iframeDeeplinkLaunch(deeplink, 2000, timeoutCallback);
        } else if (isChrome(ua) && versionGreaterThanOrEq(ua, 25) && versionLessThan(ua, 35)) {
            window.location.href = "intent:#Intent;" +
            "S.org.chromium.chrome.browser.webapp_url=" + encodeURIComponent("data:text/html," + encodeURIComponent("<sc" + "ript>window.location.href=\"" + deeplink + "\";</sc" + "ript>")) + ";" +
            "S.org.chromium.chrome.browser.webapp_id=0;" +
            "SEL;" +
            "component=com.android.chrome/com.google.android.apps.chrome.webapps.WebappActivity0;" +
            "end";
            clearTimeoutOnPageUnload(setTimeout(function() {
                timeoutCallback();
            }, 2000));
        } else if (isChrome(ua) && versionGreaterThanOrEq(ua, 35)) {
            //Extract scheme from deeplink
            var deeplinkUri = deeplink;
            var pos = deeplinkUri.indexOf(":");
            var scheme = deeplinkUri.slice(0,pos);
            var intent = deeplinkUri.slice(pos+1,deeplinkUri.length);
            //Check if intent, appId and scheme are defined, non empty strings
            if (intent && intent.length > 0 && appId && appId.length > 0 && scheme) {
                // When deeplinking on chrome 35+, there is inherent app store fallback logic built into the browser (likely a bug in Chrome)
                var deeplinkIntent = "intent:"+intent+"#Intent;scheme="+scheme+";package="+appId+";end";
                window.location.replace(deeplinkIntent);
            } else {
                timeoutCallback();
            }            
        } 
    };

    urx["launchDeeplink"] = function(installLink,deeplink, appId, timeoutCallback) {
        var ua = currentUserAgent();
        var timeoutTime;
        switch(ua.platform) {
            case APPLE_IPAD:
            case APPLE_IPHONE:
                // If this is an older iOS device, use the old resolution method with an iframe
                if (window.navigator.userAgent.match(/OS [8765]_/)) {
                    iframeDeeplinkLaunch(deeplink, 1000, timeoutCallback);
                } else {
                    ios9DeeplinkLaunch(deeplink, timeoutCallback)
                }
                break;

            case ANDROID:
                androidDeeplinkLaunch(installLink,deeplink, appId, timeoutCallback);
                break;

            default:
                desktopLaunch(deeplink);
                break;

        }
    };

    urx["resolveUrl"] = function(url, success, failure, additionalHeaders) {
        var handleResolutionResponse = function(request) {
            if (!handleFailures(request)) {
                if(request.responseText === undefined) {
                    failure(request, "No response body.");
                }
                var data;
                var couldParse = false;
                try {
                    data = JSON.parse(request.responseText);
                    couldParse = true;
                } catch (e) {
                    failure(request, "The JSON being returned by the API is unparsable.");
                }
                if (couldParse === true) {
                    var resolutionData = {
                        entityData: data,
                        appId: urx.getSingle(urx.getSingle(data, "application"), "@id"),
                        installLink: urx.getSingle(urx.getSingle(data, "application"), "installUrl"),
                        deepLink: urx.getSingle(data, "urlTemplate"),
                        webLink: urx.getSingle(data, "sameAs")
                    };
                    success(resolutionData);
                }
            }
        };

        var protocolStrippedUrl = url.replace("://",":/");
        makeApiRequest(urxApiBaseUrl + encodeURIComponent(protocolStrippedUrl), additionalHeaders, handleResolutionResponse, failure);
    };
    urx["resolveUrlDeeplink"] = function(url, failure, fallback, additionalHeaders) {
        urx.resolveUrl(url, function(resolutionData) {
            urx.launchDeeplink(resolutionData.installLink,resolutionData.deepLink, resolutionData.appId, function() {
                fallback(resolutionData);
            });
        }, failure, additionalHeaders);
    };
    urx["resolveUrlDeeplinkWithWebFallback"] = function(url, failure, additionalHeaders) {
        urx.resolveUrlDeeplink(url, failure, function(resolutionData){
            window.location = resolutionData.webLink;
        }, additionalHeaders);
    };
    urx["resolveUrlDeeplinkWithAppStoreFallback"] = function(url, failure, additionalHeaders) {
        urx.resolveUrlDeeplink(url, failure, function(resolutionData){
            if (resolutionData.installLink !== undefined) {
                window.location = resolutionData.installLink;
            }
            else {
                window.location = resolutionData.webLink;
            }
        }, additionalHeaders);
    };

    // ==========
    // Search API
    // ==========

    urx["search"] = function(query, success, failure) {
        var handleRequest = function(request) {
            if (!handleFailures(request, failure)) {
                if(request.responseText === undefined) {
                    failure(request, "No response body.");
                }
                var data;
                var couldParse = false;
                try {
                    data = JSON.parse(request.responseText);
                    couldParse = true;
                } catch(e) {
                    failure(request, "The JSON being returned by the API is unparsable.");
                }
                if(couldParse === true) {
                    var correlationId = request.getResponseHeader("x-correlation-id");
                    var results = [];
                    var rawResults = data["result"];
                    // Create and collect the search results
                    var notNullAndIsString = function(value) {
                        if(value === null || value === undefined || typeof value !== "string") {
                            return undefined;
                        }
                        return value;
                    };
                    var extractImageUrl = function(value) {
                        if(value === null || value === undefined) {
                            return undefined;
                        }
                        if(typeof value === "string") {
                            return value;
                        }
                        var contentUrl = urx.getSingle(value, "contentUrl");
                        if(typeof contentUrl === "string") {
                            return contentUrl;
                        }
                        var embedUrl = urx.getSingle(value, "embedUrl");
                        if(typeof embedUrl === "string") {
                            return embedUrl;
                        }
                        var url = urx.getSingle(value, "url");
                        if(typeof url === "string") {
                            return url;
                        }
                        return undefined;
                    };
                    var extractImagesUrl = function(value) {
                        var toReturn = [];
                        for(var i = 0; i < value; i++) {
                            toReturn.push(extractImageUrl(value[i]));
                        }
                        return toReturn;
                    };
                    for(var resultPosition = 0; resultPosition < rawResults.length; resultPosition ++) {
                        var entityData = rawResults[resultPosition];
                        var searchResult = {
                            entityData: entityData,
                            resultPosition: resultPosition,
                            correlationId: correlationId,
                            name: notNullAndIsString(urx.getSingle(entityData, "name")),
                            imageUrl: extractImageUrl(urx.getSingle(entityData, "image")),
                            descriptionText: notNullAndIsString(urx.getSingle(entityData, "description")),
                            callToActionText: notNullAndIsString(urx.getSingle(urx.getSingle(entityData, "potentialAction"), "description")),
                            appName: notNullAndIsString(urx.getSingle(urx.getSingle(entityData, "potentialAction"), "name")),
                            urxResolutionUrl: urxApiBaseUrl + urx.getSingle(urx.getSingle(urx.getSingle(entityData, "potentialAction"), "target"), "urlTemplate").replace("https://urx.io/", "").replace("://", ":/")
                        };
                        searchResult.resolve = function(success, failure) {
                            var handleResolutionResponse = function(request) {
                                if (!handleFailures(request)) {
                                    if(request.responseText === undefined) {
                                        failure(request, "No response body.");
                                    }
                                    var data;
                                    var couldParse = false;
                                    try {
                                        data = JSON.parse(request.responseText);
                                        couldParse = true;
                                    } catch (e) {
                                        failure(request, "The JSON being returned by the API is unparsable.");
                                    }
                                    if (couldParse === true) {
                                        var resolutionData = {
                                            entityData: data,
                                            appId: urx.getSingle(urx.getSingle(data, "application"), "@id"),
                                            installLink: urx.getSingle(urx.getSingle(data, "application"), "installUrl"),
                                            deepLink: urx.getSingle(data, "urlTemplate"),
                                            webLink: urx.getSingle(data, "sameAs")
                                        };
                                        success(resolutionData);
                                    }
                                }
                            };
                            makeApiRequest(this.urxResolutionUrl,{"X-Correlation-Id": this.correlationId,"X-Result-Position": this.resultPosition}, handleResolutionResponse, failure);
                        };
                        searchResult.resolveDeeplink = function(failure, fallback) {
                            this.resolve(function(resolutionData) {
                                urx.launchDeeplink(resolutionData.installLink,resolutionData.deepLink, resolutionData.appId, function() {
                                    fallback(resolutionData);
                                });
                            }, failure);
                        };
                        searchResult.resolveDeeplinkWithWebFallback = function(failure) {
                            this.resolveDeeplink(failure, function(resolutionData){
                                window.location = resolutionData.webLink;
                            });
                        };
                        searchResult.resolveDeeplinkWithAppStoreFallback = function(failure) {
                            this.resolveDeeplink(failure, function(resolutionData){
                                if (resolutionData.installLink !== undefined) {
                                    window.location = resolutionData.installLink;
                                }
                                else {
                                    window.location = resolutionData.webLink;
                                }
                            });
                        };
                        results.push(searchResult);
                    }
                    var searchResponse = {entityData: data, results: results};
                    success(searchResponse);
                }
            }
        };
        makeApiRequest(urxApiBaseUrl + encodeURIComponent(query),{}, handleRequest, failure);
    };

    // Set the global urx variable
    return urx;
})({});// this'll work if window object variables isn't read before its written

//module.exports = $urx // here's where i'm trying to export so i have access to the functions in this JS file
module.exports = $urx