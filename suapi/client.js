<<<<<<< Updated upstream

=======
<<<<<<< HEAD
=======

>>>>>>> 9c02b6fd22181dadf992c35ad6ab3fc62cb242fb
>>>>>>> Stashed changes
/**
 * Classe que representa um token de autorização.
 *
 * @constructor
 *
 * @param {string} token - A sequência de caracteres que representa o Token.
 * @param {number} expirationTime - Número de segundos que o token durará.
 * @param {string} scope - A lista de escopos (separados por espaço) que foi autorizado pelo usuário.
 */
<<<<<<< Updated upstream
var Token = function(value, expirationTimeInSeconds, scope) {
  
=======
<<<<<<< HEAD
var Token = function (value, expirationTimeInSeconds, scope) {
=======
var Token = function(value, expirationTimeInSeconds, scope) {
  
>>>>>>> 9c02b6fd22181dadf992c35ad6ab3fc62cb242fb
>>>>>>> Stashed changes
  /* Atributos */

  var value = value;
  var startTime = new Date().getTime(); // O valor em milissegundos.
  var finishTime = new Date(startTime + expirationTimeInSeconds * 1000); // O objeto Date.
  var scope = scope;
<<<<<<< Updated upstream
=======
<<<<<<< HEAD

  // Cria os cookies para o token, seu momento da expiração e seus escopos.

  var cookieOptions = {
    expires: finishTime,
    secure: window.location.protocol === "https:",
  };

  if (!Cookies.get("suapToken")) {
    Cookies.set("suapToken", value, cookieOptions);
  } else {
    value = Cookies.get("suapToken");
  }

  if (!Cookies.get("suapTokenExpirationTime")) {
    Cookies.set("suapTokenExpirationTime", finishTime, cookieOptions);
  } else {
    finishTime = Cookies.get("suapTokenExpirationTime");
  }

  if (!Cookies.get("suapScope")) {
    Cookies.set("suapScope", scope, cookieOptions);
  } else {
    scope = Cookies.get("suapScope");
  }

  this.getValue = function () {
    return value;
  };

  this.getExpirationTime = function () {
    return finishTime;
  };

  this.getScope = function () {
    return scope;
  };

  this.isValid = function () {
    if (Cookies.get("suapToken") && value != null) {
=======
>>>>>>> Stashed changes
  
  // Cria os cookies para o token, seu momento da expiração e seus escopos.
  
  if (!Cookies.get('suapToken')) {
    Cookies.set('suapToken', value, { expires: finishTime});
  } else {
    value = Cookies.get('suapToken');
  }

  if (!Cookies.get('suapTokenExpirationTime')) {
    Cookies.set('suapTokenExpirationTime', finishTime, { expires: finishTime});
  } else {
    finishTime = Cookies.get('suapTokenExpirationTime');
  }

  if (!Cookies.get('suapScope')) {
    Cookies.set('suapScope', scope, { expires: finishTime});
  } else {
    scope = Cookies.get('suapScope');
  }

  this.getValue = function() {
    return value;
  };

  this.getExpirationTime = function() {
    return finishTime;
  };

  this.getScope = function() {
    return scope;
  };

  this.isValid = function() {
    if (Cookies.get('suapToken') && value != null) {
<<<<<<< Updated upstream
=======
>>>>>>> 9c02b6fd22181dadf992c35ad6ab3fc62cb242fb
>>>>>>> Stashed changes
      return true;
    }
    return false;
  };

<<<<<<< Updated upstream
  this.revoke = function() {

=======
<<<<<<< HEAD
  this.revoke = function () {
=======
  this.revoke = function() {

>>>>>>> 9c02b6fd22181dadf992c35ad6ab3fc62cb242fb
>>>>>>> Stashed changes
    value = null;
    startTime = null;
    finishTime = null;

<<<<<<< Updated upstream
=======
<<<<<<< HEAD
    if (Cookies.get("suapToken")) {
      Cookies.remove("suapToken");
    }

    if (Cookies.get("suapTokenExpirationTime")) {
      Cookies.remove("suapTokenExpirationTime");
    }

    if (Cookies.get("suapScope")) {
      Cookies.remove("suapScope");
    }
  };
};

=======
>>>>>>> Stashed changes
    if (Cookies.get('suapToken')){
      Cookies.remove('suapToken');
    }

    if (Cookies.get('suapTokenExpirationTime')){
      Cookies.remove('suapTokenExpirationTime');
    }

    if (Cookies.get('suapScope')){
      Cookies.remove('suapScope');
    }

  };

};


<<<<<<< Updated upstream
=======
>>>>>>> 9c02b6fd22181dadf992c35ad6ab3fc62cb242fb
>>>>>>> Stashed changes
/**
 * Classe principal do SDK e seu construtor, que inicializa os principais atributos.
 *
 * @constructor
 *
 * @param {string} authHost - URI do host de autenticação.
 * @param {string} clientID - ID da aplicação registrado no SuapClient.
 * @param {string} redirectURI - URI de redirecionamento da aplicação cadastrada no SuapClient.
 *
 */
<<<<<<< Updated upstream
 var SuapClient = function(authHost, clientID, redirectURI, scope) {

=======
<<<<<<< HEAD
var SuapClient = function (authHost, clientID, redirectURI, scope) {
=======
 var SuapClient = function(authHost, clientID, redirectURI, scope) {

>>>>>>> 9c02b6fd22181dadf992c35ad6ab3fc62cb242fb
>>>>>>> Stashed changes
  /* Atributos privados */

  var authHost = authHost;
  var clientID = clientID;
  var redirectURI = redirectURI;
  var scope = scope;

<<<<<<< Updated upstream
=======
<<<<<<< HEAD
  var resourceURL = authHost + "/api/rh/eu/";
  var authorizationURL = authHost + "/o/authorize/";
  var logoutURL = authHost + "/o/revoke_token/";

  var responseType = "token";
  var grantType = "implict"; // Necessário para utilizar Oauth2 com Javascript

  // Remove a '/' caso ela já esteja inserida no auth_host.
  if (authHost.charAt(authHost.length - 1) == "/") {
=======
>>>>>>> Stashed changes
  var resourceURL = authHost + '/api/rh/eu/';
  var authorizationURL = authHost + '/o/authorize/';
  var logoutURL = authHost + '/o/revoke_token/';

  var responseType = 'token';
  var grantType = 'implict'; // Necessário para utilizar Oauth2 com Javascript

  // Remove a '/' caso ela já esteja inserida no auth_host.
  if (authHost.charAt(authHost.length - 1) == '/') {
<<<<<<< Updated upstream
=======
>>>>>>> 9c02b6fd22181dadf992c35ad6ab3fc62cb242fb
>>>>>>> Stashed changes
    authHost = authHost.substr(0, authHost.length - 1);
  }

  var dataJSON;
  var token;

  /* Métodos privados */

  /**
   * Extrai o token da URL e retorna-o.
   *
   * @return {string} O token de autorização presente na URL de retorno.
   */
<<<<<<< Updated upstream
  var extractToken = function() {
=======
<<<<<<< HEAD
  var extractToken = function () {
=======
  var extractToken = function() {
>>>>>>> 9c02b6fd22181dadf992c35ad6ab3fc62cb242fb
>>>>>>> Stashed changes
    var match = document.location.hash.match(/access_token=(\w+)/);
    if (match != null) {
      return !!match && match[1];
    }
    return null;
  };

<<<<<<< Updated upstream

=======
<<<<<<< HEAD
=======

>>>>>>> 9c02b6fd22181dadf992c35ad6ab3fc62cb242fb
>>>>>>> Stashed changes
  /**
   * Extrai os escopos autorizados da URL e retorna-os caso o usuário já esteja autenticado.
   * @return {string} Escopos autorizados pelo usuário (separados por espaço).
   */
<<<<<<< Updated upstream
=======
<<<<<<< HEAD
  var extractScope = function () {
    var match = document.location.hash.match(/scope=(.*)/);
    if (match != null) {
      return match[1].split("+").join(" ");
=======
>>>>>>> Stashed changes
  var extractScope = function() {
    var match = document.location.hash.match(/scope=(.*)/);
    if (match != null) {
      return match[1].split('+').join(' ');
<<<<<<< Updated upstream
=======
>>>>>>> 9c02b6fd22181dadf992c35ad6ab3fc62cb242fb
>>>>>>> Stashed changes
    }
    return null;
  };

  /**
   * Extrai o tempo de duração do token (em segundos) da URL.
   * @return {number} Tempo de duração do token.
   */
<<<<<<< Updated upstream
  var extractDuration = function() {

=======
<<<<<<< HEAD
  var extractDuration = function () {
=======
  var extractDuration = function() {

>>>>>>> 9c02b6fd22181dadf992c35ad6ab3fc62cb242fb
>>>>>>> Stashed changes
    var match = document.location.hash.match(/expires_in=(\d+)/);

    if (match != null) {
      return Number(!!match && match[1]);
    }

    return 0;
  };

  var getCookie = function (name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
  };

<<<<<<< Updated upstream

=======
<<<<<<< HEAD
=======

>>>>>>> 9c02b6fd22181dadf992c35ad6ab3fc62cb242fb
>>>>>>> Stashed changes
  /* Métodos públicos */

  /**
   * Inicializa os objetos token e o dataJSON.
   *
   */
<<<<<<< Updated upstream
  this.init = function() {
=======
<<<<<<< HEAD
  this.init = function () {
=======
  this.init = function() {
>>>>>>> 9c02b6fd22181dadf992c35ad6ab3fc62cb242fb
>>>>>>> Stashed changes
    token = new Token(extractToken(), extractDuration(), extractScope());
    dataJSON = {};
  };

  /**
   * Retorna o objeto token.
   *
   * @return {string} token se o usuário estiver autenticado; null caso contrário.
   */
<<<<<<< Updated upstream
=======
<<<<<<< HEAD
  this.getToken = function () {
    return token;
  };

=======
>>>>>>> Stashed changes
  this.getToken = function() {
    return token;
  };


<<<<<<< Updated upstream
=======
>>>>>>> 9c02b6fd22181dadf992c35ad6ab3fc62cb242fb
>>>>>>> Stashed changes
  /**
   * Retorna o objeto dataJSON, que contém os dados retornados após a requisição Ajax.
   *
   * @return {Object} O objeto JSON com os dados requisitados.
   */
<<<<<<< Updated upstream
=======
<<<<<<< HEAD
  this.getDataJSON = function () {
    return dataJSON;
  };

=======
>>>>>>> Stashed changes
  this.getDataJSON = function() {
    return dataJSON;
  };


<<<<<<< Updated upstream
=======
>>>>>>> 9c02b6fd22181dadf992c35ad6ab3fc62cb242fb
>>>>>>> Stashed changes
  /**
   * Retorna a URI de redirecionamento.
   *
   * @return {string} URI de redirecionamento.
   */
<<<<<<< Updated upstream
  this.getRedirectURI = function() {
=======
<<<<<<< HEAD
  this.getRedirectURI = function () {
=======
  this.getRedirectURI = function() {
>>>>>>> 9c02b6fd22181dadf992c35ad6ab3fc62cb242fb
>>>>>>> Stashed changes
    return redirectURI;
  };

  /**
   * Retorna se o usuário está autenticado ou não com base no estado do token.
   * @return {Boolean} true se o usuário estiver autenticado; false caso contrário.
   */
<<<<<<< Updated upstream
=======
<<<<<<< HEAD
  this.isAuthenticated = function () {
    return token.isValid();
  };

=======
>>>>>>> Stashed changes
  this.isAuthenticated = function() {
    return token.isValid();
  };


<<<<<<< Updated upstream
=======
>>>>>>> 9c02b6fd22181dadf992c35ad6ab3fc62cb242fb
>>>>>>> Stashed changes
  /**
   * Cria a URL de login com todos os parâmetros da aplicação.
   * @return {string} A URL de login do SuapClient.
   */
<<<<<<< Updated upstream
=======
<<<<<<< HEAD
  this.getLoginURL = function () {
    var loginUrl =
      authorizationURL +
      "?response_type=" +
      responseType +
      "&grant_type=" +
      grantType +
      "&client_id=" +
      clientID +
      "&scope=" +
      encodeURIComponent(scope) +
      "&redirect_uri=" +
      encodeURIComponent(redirectURI);
    return loginUrl;
  };

=======
>>>>>>> Stashed changes
  this.getLoginURL = function() {
    var loginUrl = authorizationURL +
      "?response_type=" + responseType +
      "&grant_type="    + grantType +
      "&client_id="     + clientID +
      "&scope="  + scope;
      "&redirect_uri="  + redirectURI;
    return loginUrl;
  };


<<<<<<< Updated upstream
=======
>>>>>>> 9c02b6fd22181dadf992c35ad6ab3fc62cb242fb
>>>>>>> Stashed changes
  /**
   * Cria a URL de cadastro com retorno.
   * @return {string} A URL de cadastro do SuapClient.
   */
<<<<<<< Updated upstream
=======
<<<<<<< HEAD
  this.getRegistrationURL = function () {
    var registrationUrl =
      authHost + "/register/" + "?redirect_uri=" + redirectURI;
    return registrationUrl;
  };

  this.getResource = function (scope, callback) {
    $.ajax({
      url: authHost + "/api/rh/meus-dados/",
      headers: {
        Authorization: "Bearer " + token.getValue(),
        Accept: "application/json",
      },
      type: "GET",
      success: callback,
      error: function (xhr, status, error) {
        alert("Falha na comunicação com o SUAP (Erro " + xhr.status + ")");
      },
    });
  };

  this.getAuthenticatedResource = function (path, callback, errorCallback) {
    $.ajax({
      url: authHost + path,
      headers: {
        Authorization: "Bearer " + token.getValue(),
        Accept: "application/json",
      },
      type: "GET",
      success: callback,
      error: function (xhr, status, error) {
        if (errorCallback) {
          errorCallback(xhr, status, error);
        }
      },
    });
  };

  this.login = function () {
    window.location = this.getLoginURL();
  };

  this.logout = function () {
    $.ajax({
      url: logoutURL,
      data: { token: token.getValue(), client_id: clientID },
      type: "POST",
      success: function (response) {
        token.revoke();
        window.location = redirectURI;
      },
      error: function (response) {
        alert("Falha na comunicação com o SUAP");
      },
    });
  };
=======
>>>>>>> Stashed changes
  this.getRegistrationURL = function() {
    var registrationUrl = authHost +
      "/register/" +
      "?redirect_uri="  + redirectURI;
    return registrationUrl;
  };

  this.getResource = function(scope, callback) {
    $.ajax({
      url: authHost + '/api/rh/meus-dados/',
      headers: {
        "Authorization": "Bearer " + token.getValue(),
        "Accept": "application/json"
      },
      type: 'GET',
      success: function(response) {
        console.log("Dados obtidos com sucesso:", response);
        callback(response);
      },
      error: function(xhr, status, error) {
        console.error("Erro completo do AJAX:", xhr);
        alert('Falha na comunicação com o SUAP (Erro ' + xhr.status + ')');
      }
    });
  };

  this.login = function() {
    window.location = this.getLoginURL();
  };
	
  this.logout = function() {
  	$.ajax({
		url: logoutURL,
        data: {'token': token.getValue(), 'client_id': clientID},
		type: 'POST',
		success: function(response) {
			token.revoke();
			window.location = redirectURI;
		},
		error: function(response) {
			alert('Falha na comunicação com o SUAP');
            console.log(response);
		}
    });
  };
  
<<<<<<< Updated upstream
=======
>>>>>>> 9c02b6fd22181dadf992c35ad6ab3fc62cb242fb
>>>>>>> Stashed changes
};