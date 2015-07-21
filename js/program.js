var spells = spellsFile();
var $container = $("#content-container");

//Create "row" div to hold info from each entry
spells.forEach(function(spell) {
  
  if (spell.hasOwnProperty("anchor")) {
    $container.append("<div class='anchor' id='" + spell.anchor + "'></div>");
  } else {


      var $row = $("<div></div>");
      var rowContent = "";
      var ritual = "";
      var concentration = "";
      var materials = [];
      var classes = [];
      var classSpans = "";
      var matsSpans = "";
      var classList = ["bard", "cleric", "druid", "paladin", "ranger", "sorcerer", "warlock", "wizard"];
      var matsList = ["v", "s", "m"];
      var rowId = spell.name.replace(/\s/g, "-").replace(/\//g, "-").toLowerCase();
      
      $row.addClass("row");

      
      if (spell.ritual === "x") {
        ritual = "Yes";
      } else {
        ritual = "No";
      }
      
      if (spell.concentration === "x") {
        concentration = "Yes";
      } else {
        concentration = "No";
      }
      

      matsList.forEach(function(mat) {
        if (spell[mat] === "x") 
          {matsSpans += "<span class='" + mat + "'>" + mat.toUpperCase() + " </span>";}
      }); 
      

      
      classList.forEach(function(aClass) {
        if (spell[aClass] === "x") {classSpans += "<span class='" + aClass + "'>" + aClass.charAt(0).toUpperCase() + aClass.slice(1) + " </span>";}
      });
     

      
      rowContent += "<a id=\"" + rowId + "\" class=\"anchor\"></a>";
      rowContent += "<a href='#' class=\"name\">" + spell.name + "</a>";
      rowContent += "<ul class=\"list\">";
      rowContent += "<li class=\"page\">PHB Page " + spell.page + "</li>";
      rowContent += "<li class=\"level\">Spell Level: <span class=\"level" + spell.level + "\">" + spell.level + "</span></li>";
      rowContent += "<li class=\"school\">School: <span class='" + spell.school.toLowerCase() + "'>" + spell.school + "</li>";
      rowContent += "<li class=\"castingTime\">Casting Time: " + spell.castingTime + "</li>";
      rowContent += "<li class=\"range\">Range: " + spell.range + "</li>";
      rowContent += "<li class=\"ritual\">Ritual: " + ritual + "</li>";
      rowContent += "<li class=\"materials\">Materials: " + matsSpans + "</li>";
      rowContent += "<li class=\"concentration\">Concentration: " + concentration + "</li>";
      rowContent += "<li class=\"duration\">Duration: " + spell.duration + "</li>";
      rowContent += "<li class=\"classes\">Classes: " + classSpans + "</li>";
      rowContent += "</ul>";
      rowContent += "<div class=\"description\"></div>";


      $row.append(rowContent);
      $row.find(".description").html(spell.description);
      $container.append($row);
    }
});

$(".row").show();
$("body").scrollTop(0);

//Accordion expandable side buttons
$("a.expandButton").click(function(event) {
    event.preventDefault();
    $(this).siblings("ul").toggle();
});


$("a.sideButton").click(function(event) {
    event.preventDefault();
    if ($(this).hasClass("buttonDown")) {
        $(this).removeClass("buttonDown");
        $(this).addClass("buttonUp");
    } else {
        $(this).removeClass("buttonUp");
        $(this).addClass("buttonDown");
    }
});


//Accordion rows to show description when click on name
$("a.name").click(function(event) {
  event.preventDefault();
  $(this).siblings().last().slideToggle(100);
});

//When click on a checkbox
$("#filterBoxes").find("input:checkbox").on("click", newSort); 

$("#allDescriptions").on("click", hideShow); 

function hideShow() {
  if ($("#allDescriptions").hasClass("buttonDown")) {
    $(".row").find(".description").show();
  } else {
    $(".row").find(".description").hide();
  }
}

function newSort() {
  var classChecks = [];
  var levelChecks = [];
  var schoolChecks = [];
  //Hide all rows
  $(".rows").hide();  
  
  
  

  //Go through each groupset and look for checked boxes
  //Creates array for each groupset containing names of checked boxes
  classChecks = findChecked("classes");
  levelChecks = findChecked("level");
  schoolChecks = findChecked("school");

  
  
  //Go through each row
  $(".row").each(function(index, row) {
          
    var classMatch = hasMatch(classChecks, row);
    var levelMatch = hasMatch(levelChecks, row, "level");
    var schoolMatch = hasMatch(schoolChecks, row);
        
    //Show rows that match all
    if(levelMatch && classMatch && schoolMatch) {
      $(row).show();
    } else {
      $(row).hide();
    }
    
  });

  function findChecked(group) {
    var groupChecks = [];
    var boxGroup = $("groupset[name=" + group + "]").find("input:checked");
    boxGroup.each(function() {
        groupChecks.push($(this).attr("value"));
    });

    return groupChecks;
  }

  function hasMatch(checks, row, prefix) {
    var categoryMatch = false;
    prefix = prefix || "";

    if (checks.length === 0) {
        categoryMatch = true;
    } else {
        checks.forEach(function(checkName) {
          if ($(row).find("span").hasClass(prefix + checkName)) {
            categoryMatch = true;
          }
        });
    }

    return categoryMatch;
  }

}














