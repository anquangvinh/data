function loadData() {
  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      loadJson(JSON.parse(this.responseText))
    }
  }
  xmlhttp.open("GET", "order.json", true);
  xmlhttp.send();
}

function loadJson(arr) {
  var out = "";
  out += "<table border='1'>";
  out += "<tr><th>Product</th><th>Quantity</th><th>Price</th></tr>";
  for (i = 0; i < arr.order.length; i++) {
    out += "<tr><td>" + arr.order[i].product + "</td><td>" + arr.order[i].quantity + "</td><td>" +arr.order[i].price+ "</td></tr>";
  }
  out += "</table>"
  document.getElementById("demo").innerHTML = out;
}

function loadJson2(arr) {
  var out = "";
  out += "<table border='1'>";
  out += "<tr><th>Product</th><th>Quantity</th><th>Price</th></tr>";
  for (i = 0; i < arr.length; i++) {
    out += "<tr><td>" + arr[i].product + "</td><td>" + arr[i].quantity + "</td><td>" +arr[i].price+ "</td></tr>";
  }
  out += "</table>"
  document.getElementById("demo").innerHTML = out;
}

function order(product, quantity, price){
  this.product = product;
  this.quantity = quantity;
  this.price = price;
}

var arr2 = [];
function add(){
  var sanpham = document.getElementById("txtName").value;
  var soluong = document.getElementById("txtQuantity").value;
  var gia = document.getElementById("txtPrice").value;

  arr2.push(new order(sanpham, soluong, gia));

  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var arr = JSON.parse(this.responseText);

      var arr3 = arr2.concat(arr.order);
      loadJson2(arr3);
    }
  }
  xmlhttp.open("GET", "order.json", true);
  xmlhttp.send();
}
