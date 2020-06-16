window.onscroll = function() {
  button = document.getElementById("toTopButton");
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    button.style.display = "block";
  } else {
    button.style.display = "none";
  }
};

function toTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

function getCommittee() {
  $.getJSON("committee.json", function(MESC){
    let exec = MESC.exec
    
    let execHTML = '';
        
    for (office in exec) {
      let title = office.replace(/ /g, '_');
      title = title.replace(/'/g, '');
      let name = exec[office].name;
      let major = exec[office].major;
      
      execHTML += '<h5>' + office + '</h5>';
      
      let url = 'committeeHeadshots/' + encodeURI(name) + '.png';
      
      $.ajax({
        url: url,
        type: 'HEAD',
        error: function() {
            $('#image' + title).attr('src', 'logo.png');
        },
        success: function() {
          $('#image' + title).attr('src', 'committeeHeadshots/' + encodeURI(name) + '.png');
        }
      })    
      
      execHTML += '<img src="' + url + '" id="image' + title + '"/>';
      
      execHTML += '<br>';
      execHTML += '<p>' + name + ', ' + major + '</p?>';
    }
    
    $("#execTab > div").html(execHTML);
    
    let committees = MESC.committees;
    
    let committeeHTML = '';
    
    for (committee in committees) {
      let title = committee.replace(' ', '_');
      let name = committees[committee].head.name;
      let major = committees[committee].head.major;
      
      committeeHTML += '<div class="card">';
        committeeHTML += '<div class="card-header" id="heading' + title + '">';
          committeeHTML += '<h2 class="mb-0">';
            committeeHTML += '<button class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapse' + title + '" aria-expanded="false" aria-controls="#collapse' + title + '">' + committee + '</button>';
          committeeHTML += '</h2>';
        committeeHTML += '</div>';
        committeeHTML += '<div id="collapse' + title + '" class="collapse" aria-labelledby="heading' + title + '" data-parent="#committee">';
          committeeHTML += '<div class="card-body"><h5>Committee Head</h5><p>' + name + ', ' + major + '</p>';
          
          let url = 'committeeHeadshots/' + encodeURI(name) + '.png';

          $.ajax({
            url: url,
            type: 'HEAD',
            error: function() {
                $('#image' + title).attr('src', 'logo.png');
            },
            success: function() {
              $('#image' + title).attr('src', 'committeeHeadshots/' + encodeURI(name) + '.png');
            }
          })    
          
          committeeHTML += '<img src="' + url + '" id="image' + title + '"/>';
      
          let members = committees[committee].members;

          if (Array.isArray(members) && members.length) {
            committeeHTML += '<h5>Members</h5><ul>';
            for (i = 0; i < members.length; i++) {
              let name = members[i].name;
              let major = members[i].major;
              
              committeeHTML += '<li>' + name + ', '  + major + '</li>';
            }
            
            committeeHTML += '</ul>';
          }
      
          committeeHTML += '</div>';
        committeeHTML += '</div>';
      committeeHTML += '</div>';
    }
        
    $("#committee").html($("#committee").html() + committeeHTML);
  });
}