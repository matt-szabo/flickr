var page = 1;

function getPhotosForSearch(searchkey,page) {
  //  var url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&nojsoncallback=1&api_key=be7e284c7c8bc84c932bccd6c537f5b7&text=car?page=2' ;
 var url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&nojsoncallback=1&api_key=be7e284c7c8bc84c932bccd6c537f5b7&text=`+searchkey+`&page=`+page;
 
    return (
      $.getJSON(url).then(function(jsonresponse){
        console.log(jsonresponse)
       

                    var photos = jsonresponse.photos.photo;
                    var photoData = photos.map(function(fdata){

                          return{
                              title: fdata.title,
                              thumb: 'https://farm'+fdata.farm+'.staticflickr.com/'+fdata.server+'/'+fdata.id+'_'+fdata.secret+'_q.jpg',
                              large: 'https://farm'+fdata.farm+'.staticflickr.com/'+fdata.server+'/'+fdata.id+'_'+fdata.secret+'_b.jpg',
                          }
                                              })

                        return photoData;
                         })
           )
                              //  console.log(photo) //AMAZING WORKS
        }

function createFlickrThumb(photoData) {




var string = '<a href="'+photoData.large+'" target="_blank"><img src="'+photoData.thumb+'" alt="'+photoData.title+'"></a>';

return string;
  
}






var bigphoto = {};
 var app = $('#app')
  var cityForm = app.find('.city-form');
  var photoInput = cityForm.find('.city-input');
  //var getWeatherButton = cityForm.find('.get-weather-button');

//var photopage = app.find('.photopage');

var reset = app.find('.clear-form');
$(".reset").on('submit',function(){
//console.log("clear me")
$(".photopage").text("");

})

//jquery listen to submit

//inside run the ajax requests
cityForm.on('submit', function(event) { // this line changes

event.preventDefault(); // prevent the form from submitting
                  
var photo = photoInput.val();

         bigphoto = {
          item:photo
          }
  return getPhotosForSearch(photo,page)
  .then(data => {
     //   console.log(data)

          $(".searchtext").text("You just searched for '" + photo + "' photos via the Flickr API.  Don't forget to test the infinite scroll feature to view as many pics as possible!");

        data.forEach(function(b1){
            // console.log('RESULT ON LINE 60', data)
        $(".photopage").append(createFlickrThumb(b1));
        return photo;

        });
  });

})



function getDocHeight() {
    var D = document;
    return Math.max(
        D.body.scrollHeight, D.documentElement.scrollHeight,
        D.body.offsetHeight, D.documentElement.offsetHeight,
        D.body.clientHeight, D.documentElement.clientHeight
    )
}



window.addEventListener('scroll', function(){
  amountscrolled(bigphoto.item)
 // console.log("bro you are scrolling")
});
//amountscrolled();

function amountscrolled(bbb){

  //console.log("2nd search " + bbb)
    var winheight= window.innerHeight //|| (document.documentElement || document.body).clientHeight
  //  console.log("Winheight: "+ winheight)

    var docheight = getDocHeight();
    var scrollTop = window.pageYOffset //|| (document.documentElement || document.body.parentNode || document.body).scrollTop
    
    //console.log("scrollTop: " + scrollTop + " pageYOffset: " + pageYOffset)

    var trackLength = docheight - winheight
    var pctScrolled = Math.floor(scrollTop/trackLength * 100) // gets percentage scrolled (ie: 80 or NaN if tracklength == 0)
 //   console.log(pctScrolled + '% scrolled')

    if (pctScrolled > 99){
                                   page++;
 console.log(page);

      return getPhotosForSearch(bbb,page)
          .then(data => {

                    for (var i = 0; i<25 ; i++){

                        $(".photopage").append(createFlickrThumb(data[i]))
                      }

          });



    }
}


