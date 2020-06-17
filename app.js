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

function loadCommittee() {
  loadButtons();
  changeCommittee('Exec');
}

function loadButtons() {
  $.getJSON("committee.json", function(committeeJSON){
    let buttonsHTML = '';
    
    buttonsHTML += '<button class="btn btn-secondary active" id="buttonExec" type="button" data-toggle="collapse" data-target="#infoExec" data-parent="#committeeList" href="#infoExec" role="button" aria-expanded="false" aria-controls="infoExec" onclick="changeCommittee(\'Exec\')">Exec</button>';
    
    let committees = committeeJSON.committees;
    
    for (committee in committees) {
      let committeeNameEncoded = committee.replace(/[ -']/g, '');
      
      buttonsHTML += '<button class="btn btn-secondary" id="button' + committeeNameEncoded + '" type="button" data-toggle="collapse" data-target="#info' + committeeNameEncoded + '" data-parent="#committeeList" href="#info' + committeeNameEncoded + '" role="button" aria-expanded="false" aria-controls="info' + committeeNameEncoded + '" onclick="changeCommittee(\'' + committee + '\')">' + committee + '</button>';    }
    
    $("#committeeList").html(buttonsHTML);
  });
}

function changeCommittee(committeeName) {
  $.getJSON("committee.json", function(committeeJSON) {
    let committeeNameEncoded = committeeName.replace(/[ -']/g, '');

    $(".btn").removeClass("active");
    $("#button" + committeeNameEncoded).addClass("active");

    let committeeHTML = '';

    switch (committeeNameEncoded) {
      case 'Exec':
        for (office in committeeJSON.exec) {
          let officerName = committeeJSON.exec[office].name;
          let officerMajor = committeeJSON.exec[office].major;
          
          committeeHTML += '<h3>' + office + ': ' + officerName + ', ' + officerMajor + '</h3>';
          committeeHTML += getImage(officerName, office);
        }
        break;

      case 'NewMembers':
        let head1Name = committeeJSON.committees[committeeName].head1.name;
        let head1Major = committeeJSON.committees[committeeName].head1.major;
        committeeHTML += '<h3>Co-Head: ' + head1Name + ', ' + head1Major + '</h3>';
        committeeHTML += getImage(head1Name, 'NewMembersHead1');

        let head2Name = committeeJSON.committees[committeeName].head2.name;
        let head2Major = committeeJSON.committees[committeeName].head2.major;
        committeeHTML += '<h3>Co-Head: ' + head2Name + ', ' + head2Major + '</h3>';
        committeeHTML += getImage(head2Name, 'NewMembersHead2');

        break;

      default:
        let headName = committeeJSON.committees[committeeName].head.name;
        let headMajor = committeeJSON.committees[committeeName].head.major;

        committeeHTML += '<h3>Head: ' + headName + ', ' + headMajor + '</h3>';
        committeeHTML += getImage(headName, committeeNameEncoded);
        
        break;
    }

    $("#committee").html(committeeHTML);
  });
}

function getImage(name, title) {
  let imgHTML = '';
  title = title.replace(/[ -']/g, '');
  
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

  imgHTML += '<img src="' + url + '" id="image' + title + '"/>';
    
  return imgHTML;
}