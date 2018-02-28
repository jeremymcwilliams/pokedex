console.log("pokedex");

var found=["Bulbasaur", "Charmander", "Squirtle"];



/* populate pokedex view   */
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

      /* add event handler   */
      $(".found").click(function(){

        getPokeData(this.id);

      });
             /* puts "data" in the "ajax_area" div   */
});



function getPokeData(id){

  $.get('https://webster.cs.washington.edu/pokedex/pokedex.php', {pokemon: id},function(data) {

      console.log(data);


      /*  put data in elements */
      $("#my-card .card .name").html(data.name);
      $("#my-card .card .info").html(data.info.description);
      $("#my-card .pokepic").attr("src", data.images.photo);
      $("#my-card .card .type").attr("src", data.images.typeIcon);
      $("#my-card .card .weakness").attr("src", data.images.weaknessIcon);
      $("#my-card .card .hp").html(data.hp+"HP");

      for(var i = 0;i < data.moves.length;i++){
        $("#my-card .card .moves button:eq("+i+") .move").html(data.moves[i].name);
        $("#my-card .card .moves button:eq("+i+") .dp").html(data.moves[i].dp || "");
        $("#my-card .card .moves button:eq("+i+") img").attr("src", "icons/"+data.moves[i].type+".jpg");

      }

      $("#start-btn").removeClass("hidden");

      $("#start-btn").click(function(){
        fight(this);

      });

      //$(".card .moves button:eq(1) .move").html(data.moves[1].name);
   });

}

function fight(x){

  console.log(x);
  $("#pokedex-view").hide();
  $("#their-card").show();
  $("#results-container").show();
  $("#results-container").children("img").show();
  $("#my-card .hp-info").show();


}
