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
                    
          committeeHTML += '<div class="card">';
          committeeHTML += getImage(officerName, office);
          committeeHTML += '<div class="card-body">';
          committeeHTML += '<h5 class="card-title">' + office + '</h5>';
          committeeHTML += '<p class="card-text">' + officerName + ', ' + officerMajor + '</p>';
          committeeHTML += '</div></div>';
        }
        break;

      case 'NewMembers':
        let head1Name = committeeJSON.committees[committeeName].head1.name;
        let head1Major = committeeJSON.committees[committeeName].head1.major;
        
        committeeHTML += '<div class="card">';
        committeeHTML += getImage(head1Name, 'NewMembersHead1');
        committeeHTML += '<div class="card-body">';
        committeeHTML += '<h5 class="card-title">Co-Committee Head</h5>';
        committeeHTML += '<p class="card-text">' + head1Name + ', ' + head1Major + '</p>';
        committeeHTML += '</div></div>';
        
        let head2Name = committeeJSON.committees[committeeName].head2.name;
        let head2Major = committeeJSON.committees[committeeName].head2.major;
        
        committeeHTML += '<div class="card">';
        committeeHTML += getImage(head2Name, 'NewMembersHead2');
        committeeHTML += '<div class="card-body">';
        committeeHTML += '<h5 class="card-title">Co-Committee Head</h5>';
        committeeHTML += '<p class="card-text">' + head2Name + ', ' + head2Major + '</p>';
        committeeHTML += '</div></div>';
        
        if (committeeJSON.committees[committeeName].members.length > 0) {
          committeeHTML += '<div class="card" id="membersCard">';
          committeeHTML += '<div class="card-body">';
          committeeHTML += '<h5 class="card-title">Members</h5>';
          committeeHTML += '<p class="card-text">' + getMembers(committeeName, committeeJSON) + '</p>';
          committeeHTML += '</div></div>';
        }

        break;

      default:
        let headName = committeeJSON.committees[committeeName].head.name;
        let headMajor = committeeJSON.committees[committeeName].head.major;

        committeeHTML += '<div class="card">';
        committeeHTML += getImage(headName, 'NewMembersHead2');
        committeeHTML += '<div class="card-body">';
        committeeHTML += '<h5 class="card-title">Committee Head</h5>';
        committeeHTML += '<p class="card-text">' + headName + ', ' + headMajor + '</p>';
        committeeHTML += '</div></div>';
        
        if (committeeJSON.committees[committeeName].members.length > 0) {
          committeeHTML += '<div class="card" id="membersCard">';
          committeeHTML += '<div class="card-body">';
          committeeHTML += '<h5 class="card-title">Members</h5>';
          committeeHTML += '<p class="card-text">' + getMembers(committeeName, committeeJSON) + '</p>';
          committeeHTML += '</div></div>';
        }
                
        break;
    }
    
    $("#committee").html(committeeHTML);
    updateSizes();
  });
}

function getMembers(committeeName, committeeJSON) {
  let members = committeeJSON.committees[committeeName].members;
  
  let membersString = '<ul>';
  
  for (member in members) {
    membersString += '<li>' + members[member].name + ', ' + members[member].major + '</li>';
  }
  
  membersString += '</ul>';
  return membersString;
}

function getImage(name, title) {
  let imgHTML = '';
  title = title.replace(/[ -']/g, '');
  
  let url = 'committeeHeadshots/' + encodeURI(name) + '.jpeg';

  $.ajax({
    url: url,
    type: 'HEAD',
    error: function() {
        $('#image' + title).attr('src', 'logo.png');
    },
    success: function() {
      $('#image' + title).attr('src', 'committeeHeadshots/' + encodeURI(name) + '.jpeg');
    }
  })    

  imgHTML += '<img class="card-img-top" src="' + url + '" id="image' + title + '" alt="Card image cap"/>';
    
  return imgHTML;
}

function updateSizes() {
    var cards = document.querySelectorAll("#committee .card");
  
    for (var i = 0; i < cards.length; i++) {
      var card = cards[i];
      
      if($(window).width() < 800) {
        card.style.width = "100%";
      } else {
        card.style.width = "17%";
      }
    }
  
    if ($(window).width() < 800 ) {
      $("#committee").removeClass("d-flex").addClass("flex-wrap");
    } else {
      $("#committee").removeClass("flex-wrap").addClass("d-flex");
    }
}

function formateDate(ISOdate) {
  let date = new Date(ISOdate);
  date.setDate(date.getDate() + 1);
  let daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  let dateString = '';
  dateString += daysOfTheWeek[date.getDay()] + ', ';
  dateString += months[date.getMonth()] + ' ';
  dateString += date.getDate();
  
  switch (date.getDate() % 10) {
    case 1:
      dateString += 'st ';
      break;
      
    case 2:
      dateString += 'nd ';
      break;
      
    case 3:
      dateString += 'rd ';
      break;
      
    default:
      dateString += 'th ';
      break;
  }
  
  dateString += date.getFullYear();
  
  return dateString;
}