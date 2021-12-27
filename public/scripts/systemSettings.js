var URL = location.protocol + '//' + location.host;

$(document).ready(function() {
    var diseasesAPI = URL + "/app/getdiseases/";

    $.getJSON(diseasesAPI).done(function(allDiseases) {
           var diseasesScoresCheckboxes = [];

           for(var disease in allDiseases) {
             var diseaseScoreCheckbox = [];
        	   diseaseScoreCheckbox[0] = disease;
        	   diseaseScoreCheckbox[1] = allDiseases[disease]; // This is the score.
             diseaseScoreCheckbox[2] = "<input type=\"checkbox\" name=\"DD[]\" value=\"" + disease + "\">";

        	   diseasesScoresCheckboxes.push(diseaseScoreCheckbox)
           }

           $('#diseases-table').dataTable({
		      data: diseasesScoresCheckboxes,
		      columns:[{
	              title: "疾病",
                  width: "50%"
	          },{
	              title: "危险程度",
                  width: "20%"
	          },{
	              title: "选择",
                  width: "30%"
	          }],
		      scrollY: '40vh',
		      scrollCollapse: true,
		      paging: false,
                info: false,
                language: {
                  searchPlaceholder: "查询疾病...",
                  sSearch: ""
                },
		 });
    });
});


// fill the rooms table
$(document).ready(function() {
    var roomsAPI = URL + "/app/getrooms/";

    $.getJSON(roomsAPI).done(function(allRooms) {
           var roomsScoresCheckboxes = [];

           for(var room in allRooms) {
               if (room !== 'noroom') {
                    var roomScoreCheckbox = [];
                    roomScoreCheckbox[0] = room;
                    roomScoreCheckbox[1] = "<input type=\"checkbox\" name=\"RD[]\" value=\"" + room + "\">";

                    roomsScoresCheckboxes.push(roomScoreCheckbox);
               }
           }

           $('#rooms-table').dataTable({
		      data: roomsScoresCheckboxes,
		      columns:[{
	              title: "房间",
                  width: "60%"
                },{
	              title: "选择",
                  width: "40%"
	           }],
		      scrollY: '40vh',
		      scrollCollapse: true,
		      paging: false,
                info: false,
                language: {
                  searchPlaceholder: "查找房间...",
                  sSearch: ""
                },
		 });
    });
});
//fill the users tables
$(document).ready(function() {
  var usersAPI = URL + "/app/getusers/";

    $.getJSON(usersAPI).done(function(allUsers) {
           var passwordCheckboxes = [];

           for(var username in allUsers) {
             var passwordCheckbox = [];
        	   passwordCheckbox[0] = username;
             passwordCheckbox[1] = "<input type=\"checkbox\" name=\"UD[]\" value=\"" + username + "\">";

        	   passwordCheckboxes.push(passwordCheckbox)
           }

           $('#users-table').dataTable({
		      data: passwordCheckboxes,
		      columns:[{
            title: "房间",
              width: "60%"
            },{
            title: "选择",
              width: "40%"
         }],
		      scrollY: '40vh',
		      scrollCollapse: true,
		      paging: false,
                info: false,
                language: {
                  searchPlaceholder: "查询用户...",
                  sSearch: ""
                },
		 });
    });
});

/*
     Google analytics
*/
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-97568701-1', 'auto');
ga('send', 'pageview');
