window.fbAsyncInit = function() {
  FB.init({
    appId      : '1272410873388179',
    cookie     : true,
    xfbml      : true,
    version    : 'v16.0'
  });

  FB.AppEvents.logPageView();

  // Add your own code here to handle the SDK initialization
};

(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "https://connect.facebook.net/en_US/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));
