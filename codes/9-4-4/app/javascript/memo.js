/////////// standard plan
var SessionToken = window["app-bridge"].actions.SessionToken;
var app = window.app;

app.dispatch(SessionToken.request());

// Save a session token for future requests
window.sessionToken = await new Promise((resolve) => {
  app.subscribe(SessionToken.Action.RESPOND, (data) => {
    resolve(data.sessionToken || "");
  });
});

var Redirect = window["app-bridge"].actions.Redirect;
var redirect = Redirect.create(app);

var headers = new Headers({ Authorization: "Bearer " + window.sessionToken });
fetch("/app_subscription/standard", { headers, method: "POST" })
  .then((response) => response.json())
  .then((data) => {
    var confirmationUrl = data.app_subscription.confirmation_url;
    redirect.dispatch(Redirect.Action.REMOTE, confirmationUrl);
  });

/////////// activate

var SessionToken = window["app-bridge"].actions.SessionToken;
var app = window.app;

app.dispatch(SessionToken.request());

// Save a session token for future requests
window.sessionToken = await new Promise((resolve) => {
  app.subscribe(SessionToken.Action.RESPOND, (data) => {
    resolve(data.sessionToken || "");
  });
});

var Redirect = window["app-bridge"].actions.Redirect;
var redirect = Redirect.create(app);

var headers = new Headers({ Authorization: "Bearer " + window.sessionToken });
fetch("/app_subscription/activate", { headers, method: "POST" })
  .then((response) => response.json())
  .then((data) => {
    var appSubscription = data.app_subscription;
    var list = "<li>" + `Plan: ${appSubscription.plan}` + "</li>";
    document.getElementById("appSubscription").innerHTML =
      "<ul>" + list + "</ul>";
  });

/////////// free

var SessionToken = window["app-bridge"].actions.SessionToken;
var app = window.app;

app.dispatch(SessionToken.request());

// Save a session token for future requests
window.sessionToken = await new Promise((resolve) => {
  app.subscribe(SessionToken.Action.RESPOND, (data) => {
    resolve(data.sessionToken || "");
  });
});

var Redirect = window["app-bridge"].actions.Redirect;
var redirect = Redirect.create(app);

var headers = new Headers({ Authorization: "Bearer " + window.sessionToken });
fetch("/app_subscription/free", { headers, method: "POST" })
  .then((response) => response.json())
  .then((data) => {
    var appSubscription = data.app_subscription;
    var list = "<li>" + `Plan: ${appSubscription.plan}` + "</li>";
    document.getElementById("appSubscription").innerHTML =
      "<ul>" + list + "</ul>";
  });
