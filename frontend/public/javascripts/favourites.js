let value;
let index;

function setCheckStatus(value_, index_) {
  console.log(value_);
  console.log(index_);
  value = value_;
  index = index_;
  sendCheckStatus(value_, index_);
}

async function sendCheckStatus(value_, index_) {
  await fetch("/setFavourite", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      value: value,
      index: index
    })
  });
}
