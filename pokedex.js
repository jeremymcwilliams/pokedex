console.log("pokedex");

var found=["Bulbasaur", "Charmander", "Squirtle"];




$.get('https://webster.cs.washington.edu/pokedex/pokedex.php', {pokedex: "all"},function(data) {      /* output content from ajax1.php is set to variable "data" */
    //  console.log(data);
    var lines = data.split('\n');
      for(var i = 0;i < lines.length;i++){
          //console.log("line"+lines[i]);
          var s=lines[i];
          var t=s.split(":");
          var im=t[1];
          var title=t[0];
          var f=found.indexOf(title);
        //  console.log(f+":"+im);
          if (found.indexOf(title)>-1){statusClass="found";}
          else{statusClass="unfound";}
          var html="<img src='sprites/"+im+"' id='"+title+"' class='sprite "+statusClass+"'>";
          $("#pokedex-view").append(html);


      }


      $(".found").click(function(){

        getPokeData(this.id);

      });
             /* puts "data" in the "ajax_area" div   */
});



function getPokeData(id){

  $.get('https://webster.cs.washington.edu/pokedex/pokedex.php', {pokemon: id},function(data) {

      console.log(data);

      /*  get values from returned json  */
      var name=data.name;
      var image=data.images.photo;
      var desc=data.info.description;
      var hp=data.hp;


      /*  put data in elements */
      $(".card .name").html(name);
      $(".card .info").html(desc);
      $(".pokepic").attr("src", image);
      $(".card .hp").html(hp+"HP");





   });





}






/*
$.get( "https://webster.cs.washington.edu/peokedex/pokedex.php",{ pokedex: "all" }, function( data ) {
  $( "body" )
    .append( "Name: " + data.name ) // John
    .append( "Time: " + data.time ); //  2pm
}, "json" );
*/
