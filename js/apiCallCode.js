const getdata=()=>{
	  var myMovieList=[];
      let dropdown = $('#movielist');
      dropdown.empty();
      var myquery=document.getElementById("input-for-movie").value;   
      $.get("https://api.themoviedb.org/3/search/movie?api_key=67d6da3847ec38002c6ddd186648528d&language=en-US&query="+myquery+"&page=1&include_adult=false",function(moviedata){
          for(var i=0;i<moviedata.results.length;i++){
                myMovieList.push(moviedata.results[i]);
          }

          for(var i=0;i<myMovieList.length;i++){
            dropdown.append($('<option id='+myMovieList[i].id+'></option>').attr('value',myMovieList[i].title));
          }
      });
};

$('#input-for-movie').change(function(){
    var movieName=$('#input-for-movie').val();
    
    $.get("https://api.themoviedb.org/3/search/movie?api_key=67d6da3847ec38002c6ddd186648528d&language=en-US&query="+movieName+"&page=1&include_adult=false",function(moviedata){
      document.getElementsByClassName('detail-component')[0].innerHTML=moviedata.results[0].title;
      document.getElementsByClassName('detail-component')[1].innerHTML=moviedata.results[0].vote_average;
      document.getElementsByClassName('detail-component')[2].innerHTML=moviedata.results[0].video;
      document.getElementsByClassName('detail-component')[3].innerHTML=moviedata.results[0].id;
      document.getElementsByClassName('detail-component')[4].innerHTML=moviedata.results[0].vote_count;
      $('.movie-details').css('display','block');
    });
});


const debounce=function(fn,d)
{
  let timer;
  return function(){
    let context=this,
    args=arguments;
    clearTimeout(timer);
    timer=setTimeout(()=>{
        getdata.apply(context,arguments);
    },d);
  }
}
const betterFunction=debounce(getdata,300);