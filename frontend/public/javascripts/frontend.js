var ul = document.getElementById("mostViewedList");
var main = document.createElement("li");
var dinolist = document.createElement("li");
var period = document.createElement("li");
var forum = document.createElement("li");

let user;

async function getUsers() {
  let response = await fetch("./user");
  let data = await response.json();
  return data;
}
getUsers().then((data) => {
  user = data;
  if (user) {
    //console.log(user);
    main.appendChild(
      document.createTextNode(
        "Hauptseite wurde besucht: " + user.mostVisitedContent.main + " mal"
      )
    );
    dinolist.appendChild(
      document.createTextNode(
        "Dinoliste wurde besucht: " + user.mostVisitedContent.dinolist + " mal"
      )
    );
    period.appendChild(
      document.createTextNode(
        "Zeitalter wurde besucht: " + user.mostVisitedContent.period + " mal"
      )
    );
    forum.appendChild(
      document.createTextNode(
        "Forum wurde besucht: " + user.mostVisitedContent.forum + " mal"
      )
    );

    ul.appendChild(main);
    ul.appendChild(dinolist);
    ul.appendChild(period);
    ul.appendChild(forum);
  }
});

async function getAllComments() {
  let data = await fetch("/getAllComments");
  let comment = await data.json();
  return comment;
}

getAllComments().then((data) => {
  data.forEach((element) => {
    createComment(element.userId, element.comment);
  });
});
function createComment(userId, comment) {
  var newCommentRow = document.createElement("tr");
  var tableUserId = document.createElement("td");
  var tableComment = document.createElement("td");
  tableUserId.appendChild(document.createTextNode(userId));
  tableComment.appendChild(document.createTextNode(comment));
  newCommentRow.appendChild(tableUserId);
  newCommentRow.appendChild(tableComment);

  document.getElementById("kommentar-tabelle").appendChild(newCommentRow);
}

document.getElementById("commentForm").onsubmit = function () {
  fetch("/comment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      userId: user.userId,
      comment: document.getElementById("kommentar").value
    })
  });

  createComment(user.userId, document.getElementById("kommentar").value);
  return false;
};
