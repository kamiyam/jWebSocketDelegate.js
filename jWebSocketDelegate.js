/*!
 * jWebSocketDelegate JavaScript Library
 *
 * author      kamiyam (http://twitter.com/kamiyam)
 * copyright   (c) WebSocket Connect JavaScript Library
 * license     The MIT License
 *
 */
var jWebSocketDelegate = function( hostpath, isAutoStart )
{	
	//デフォルトはfalse
	isAutoStart = isAutoStart || false;
	
	//websocket
	var ws;
	
	//URL組み立て
	var protocol = ( location.protocol == "https:" ) ? "wss" : "ws";
	var url = protocol + "://" + hostpath;
	
	//関数チェック
	var p_isFunction = function( func )
	{
		return ( func != null && ( typeof( func ) == "function" ) );
	}

	var p_create = function()
	{
		if ( ! window["WebSocket"] )	return ;
		if ( ws == null )	ws = new WebSocket( url );
	}
	
	//イベント登録
	var bindEvent = function()
	{		
		// リスナーの追加
		if( ws.addEventListener )
		{
			//WebSocketのイベントの登録
			ws.addEventListener( "open", p_openFunc, false );
			ws.addEventListener( "close", p_closeFunc, false );
			ws.addEventListener( "message", p_messageFunc, false );
		}
		else if( ws.attachEvent )
		{
			//WebSocketのイベントの登録
			ws.attachEvent( "open", p_openFunc );
			ws.attachEvent( "close", p_closeFunc );
			ws.attachEvent( "message", p_messageFunc );
		}
		
	}
	
	//イベント削除
	var cancelEvent = function()
	{
		// リスナーの追加
		if( ws.removeEventListener )
		{
			//WebSocketのイベントの登録
			ws.removeEventListener( "open", p_openFunc, false );
			ws.removeEventListener( "close", p_closeFunc, false );
			ws.removeEventListener( "message", p_messageFunc, false );
		}
		else if( ws.detachEvent )
		{
			//WebSocketのイベントの削除
			ws.detachEvent( "open", p_openFunc );
			ws.detachEvent( "close", p_closeFunc );
			ws.detachEvent( "message", p_messageFunc );
		}
	}
	
	//Dispoze
	var p_dispose = function()
	{
		if ( ws != null )	ws.close();
	};
	
	//ハンドラーオブジェクト『それ』
	var that = {};

	that.start = function ()
	{
		p_create();
		bindEvent();
	}

	that.stop = function()
	{
		if ( ws == null )
		{
			return;
		}
		cancelEvent();
	}

	//ws.open時処理
	that.open = function(){};
	var p_openFunc = function()
	{
		if ( p_isFunction( that.open ) ) that.open();
	};

	//ws.close時処理
	that.close = function(){};
	var p_closeFunc = function()
	{
		if ( p_isFunction( that.close ) ) that.close();
	};

	//ws.messag時処理
	that.message = function( event ){};
	var p_messageFunc = function( event )
	{
		if ( p_isFunction( that.message ) ) that.message( event );
	};
		
	//message送信処理
	that.send = function( message )
	{
		if ( ws == null )
		{
			return;
		}
		ws.send( message );
	}
	
	
	
	/////////////////////////////////
	// initialize
	/////////////////////////////////
	if ( isAutoStart )
	{
		// window.onloadリスナーの追加
		if( window.addEventListener )	window.addEventListener( "load", that.start, false );
		else if( window.attachEvent )	window.attachEvent( "load", that.start );
	}
	
	// window.unloadリスナーの追加
	if( window.addEventListener )	window.addEventListener( "unload", p_dispose, false );
	else if( window.attachEvent )	window.attachEvent( "unload", p_dispose );
	
	return that;
};