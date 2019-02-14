
var fs = require('fs');
//var path = require('path');
var mysql = require('mysql');
var xml2js = require('xml2js');
var xmlBuild2 = require('xmlbuilder');

var xmlParser = new xml2js.Parser({explicitArray:false, mergeAttrs:true});
var xmlBuild = new xml2js.Builder({pretty:false});
//var dt = require('date-utils');

/***
utils
***/
// 지정된 포맷으로 현재 일시 반환
function getDate(format) {
	var d = new Date();
	return ''//d.toFormat(format);
}
function logTime() {
	return "["+getDate('HH24:MI:SS')+"] ";
}
function isString(v) { return typeof v === 'string'; }
function log(arg, arg2) {
	if ( arg2 === void 0 ){
		if( typeof arg === 'string' ) {
			console.log(logTime(), arg);
		} else {
			console.log(logTime(), arg);
		}
	} else {
		if( typeof arg === 'string' && typeof arg2 === 'string') {
			console.log(logTime(), arg, arg2);
		} else if (typeof arg === 'string') {
			console.log(logTime(), arg, arg2);
			console.log(arg2);
		}
	}
}
function getValue(arg) {
	if( arg !== void 0 && arg !== null) {
		return arg.value();
	}
	return "";
}



// 설정 정보
var serverConfiguration = require( "../server/server-config" );


// pool 생성
var connectionPool = mysql.createPool(serverConfiguration.gulp.db);
var metaXml = '';
var themeXml = '';
var metaMap = {};
var themeInfo = {};

function mergeMeta( deployPath, filePath, themeFilePath, type, themeName ){

	if( filePath != null ){

		try {
			fs.readFile(filePath, {encoding: 'utf-8'}, function(err,fdata){
				if( !err ){
					var metaInfo = {};
					metaXml = fdata;

					xmlParser.parseString(metaXml, function(err, result){
						metaInfo = result;
						metaInfo['theme']['name'] = themeName || metaInfo['theme']['name'];
					});

					metaMap = metaInfo;
				}else{
					console.log('read File error');
				}
			});
		} catch (err) {
			log(err);
		}
	}

}

function upload( changePath, basePath, fileType ) {
	var changePath = changePath.split(String.fromCharCode(92)).join('/');
	var basePath = basePath.split(String.fromCharCode(92)).join('/');
	var realPath = "/" + changePath.replace( basePath, "").replace("."+fileType, "");

	/*log("changePath ", changePath);
	log("basePath ", basePath);
	log("realPath ", realPath);
	log("themeInfo ", themeInfo);*/

	fs.readFile(changePath, {encoding: 'utf-8'}, function(err,data){
		if (!err){
			var replaceData = data.split('href="/assets/').join('href="/cmsstatic/theme/' + metaMap.theme.name + '/assets/');
			replaceData = replaceData.split("href='/assets/").join("href='/cmsstatic/theme/" + metaMap.theme.name + "/assets/");

			replaceData = replaceData.split('src="/assets/').join('src="/cmsstatic/theme/' + metaMap.theme.name + '/assets/');
			replaceData = replaceData.split("src='/assets/").join("src='/cmsstatic/theme/" + metaMap.theme.name + "/assets/");

			replaceData = replaceData.split('url("/assets/').join('url("/cmsstatic/theme/' + metaMap.theme.name + '/assets/');
			replaceData = replaceData.split("url('/assets/").join("url('/cmsstatic/theme/" + metaMap.theme.name + "/assets/");
			replaceData = replaceData.split('url(/assets/').join('url(/cmsstatic/theme/' + metaMap.theme.name + '/assets/');
			updateContent('/assets' + realPath, replaceData);
		}else{
			log(err);
		}
	});
}

function updateContent(realPath, content) {
	// DB 커넥션 풀에서 커넥션 얻기
	try {
		connectionPool.getConnection(function(connectionError,connection){
			if(connectionError) {
				log(connectionError);
				return;
			}

			//var updateColumns = {tmplt_source : content, date_updated : 'now()'};

			// insert & update query
			var queryString = 'update blc_page_tmplt set tmplt_source = ?, date_updated = now() where tmplt_path = ? and theme_id = 102';

			// run query
			log("(---- content ==> ");
			log(content);

			log("(---- realPath ==> ");
			log(realPath);
			var query = connection.query(queryString, [content, realPath], function(queryError, result) {

				//log("mysql query", query.sql);

				// 에러 발생 시
				if(queryError){
					// connection 반환
					connection.release();
					log(queryError);
					return;
				}

				// connection 반환
				connection.release();

				log("result=====================> " + realPath);
				log(result);
				log("\n\n\n");
			});
		});
	} catch (err) {
		connection.release();
		log(err);
	}
}

function upload_html(args, basePath) {
	log(args);
	upload( args.path, basePath, "html" );
}
// js, css 변경 감지도 추가 할것.
// 단, theme upload 되야 함.
// 못찾는 정보의 경우 예외처리 필요..
function upload_js(args, basePath) {
	//log(args);

	// mockData 예외처리
	if(args.path.indexOf("/mockData/") > -1 ) {
		console.log("====> mockData 처리 예외처리");
		return;
	}

	upload( args.path, basePath, "js" );
}
function upload_css(args, basePath) {
	log(args);
	upload( args.path, basePath, "css" );
}



module.exports = {
	upload_html : upload_html,
	upload_js : upload_js,
	upload_css : upload_css,
	mergeMeta : mergeMeta
}


// exports.start = function (args) {
// }
