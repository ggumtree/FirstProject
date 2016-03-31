function _getEditorHtml(isHtml)
{
	// 2015.12.01 에스엔유프리시젼 기존 전자결재 이관받은 문서 수정시 border 0값으로 변하여서 선이 보이지 않아서 주석처리
	//IE 7.0이하에서 테이블에 숨긴선이 보이는문제로 강제로 BORDER를 0으로 처리(2009-06-22)
	//_setTableBorderZero();

	if(isHtml){
		return document.TWE.BodyValue;
	}else{
		var sHtml = document.TWE.BodyValue;
		var xHtml= sHtml.replace(/(<[\/]?)object/gi,'$1xDirtyObject');
		_setEditorHtml(xHtml);
		var xMime = fnGetMimeValue();
		_setEditorHtml(sHtml);
		return xMime;
	}
}

function _setTableBorderZero(){
	var dom = document.TWE.GetDOM();
	var elmArr = dom.getElementsByTagName("TABLE");

	if(elmArr !=null){
		for(var i=0; i<elmArr.length; i++){
			var obj = elmArr[i];
			if(obj.border==1){
				obj.border=0;
			}
		}
	}
}

function _getEditorText()
{
	return document.TWE.TextValue();
}

function fnGetMimeValue()
{
	return document.TWE.MimeEnValue();
}

function _addHtmlToEditor(sHtml){
	document.TWE.InsertHtml(sHtml);
}

function _setEditorHtml(sHtml){
	document.TWE.bodyValue = sHtml;
}

function _getEditorElement(id){
	return document.TWE.GetElementById(id);
}

function fnMIMEProcess(sFrmName)
{
	var strMIMEValue = TWE.MimeEnValue();

	var oForm = eval("parent.document." + sFrmName );

	if( typeof(oForm.mime_contents) == "undefined" )
	{
		var tags;
		tags = parent.document.createElement("input");
		tags.setAttribute("type", "hidden");
		tags.name = "mime_contents";
		tags.value = strMIMEValue;
		oForm.appendChild(tags);
	}
	else
	{
		oForm.mime_contents.value = strMIMEValue;
	}
}

function DivideString(sFrmName)
{
	var strMIMEValue = fnGetMimeValue();

	var tags;
	var oForm = eval("parent.document." + sFrmName );

	while( strMIMEValue.length > 0 )
	{
		tags = parent.document.createElement("input");
		tags.setAttribute("type", "hidden");
		tags.name = "mime_contents";
		tags.value = strMIMEValue.substr(0, 102400);
		oForm.appendChild(tags);
		strMIMEValue = strMIMEValue.substr(102400);
	}

	tags = parent.document.createElement("input");
	tags.setAttribute("type","hidden");
	tags.name = "mime_contents";
	tags.value = strMIMEValue;
	oForm.appendChild(tags);
}


var tweClsid =  "976A7D6C-B14C-4e50-A5C3-B43D8C49D8C8";
var tweVersion = "3,7,1,1014";
var cab = "tweditor.cab";
var tweId = "TWE";
var tweApplyinitdata = 1;//apply:1
var tweEditmode = 0;//edit:0

var tweKey = "Rnf9+1Lq2EhDqk5CIFOZHeaAH+MeIAV5Tt57C92E3yOB/SgthYNyBsY8ZU049NaD6o9wDqk6R9ZKI0EXuCQPFXBvYGHx/T8loIWMgKDrD8kARB8te9t7CkUZDoqzDzP/UU/lxfiHX5MKifzaSKVJaEIEW/7neOx6ZKz/7igG5hB9P8Fnc26SLoJ2LCrPGOUqO1UYMEwxFxLuWDpecGKfi0mxe82h/YDWsq9DosRUWN4=";

function createTWEditor(tweAdminMode){
	document.write('<object ID="'+tweId+'" width="'+tEditorWidth+'" height="'+tEditorHeight+'" CLASSID="CLSID:'+tweClsid+'" CODEBASE="'+tweCab+'#version='+tweVersion+'" >');
	document.write('<PARAM name="InitFile" value="'+tweEnv+'"/>');
	document.write('<PARAM name="ApplyInitData" VALUE="'+tweApplyinitdata+'"/>');
	document.write('<PARAM name="Mode" VALUE="'+tweEditmode+'"/>');
	document.write('<PARAM name="LicenseKey" value="'+tweKey+'">');
	if(tweAdminMode){
		document.write('<PARAM name="AdminMode" value="1">') ;
	}
	document.write('</object>');
}
