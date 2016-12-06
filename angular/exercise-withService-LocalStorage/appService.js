app.factory('userServices', function() {
    var userObj = {};
    var userArr =
        [{ name: 'Donald', email: 'donald@gmail.com'},
        { name: 'Trump', email: 'trump@gmail.com'},
        { name: 'Obama', email: 'obama@gmail.com'},
        { name: 'Bush', email: 'bush@gmail.com'},
        { name: 'Steve', email: 'steve@gmail.com'},
        { name: 'Flash', email: 'flash@gmail.com'},
        { name: 'Arrow', email: 'arrow@gmail.com'}];

    //get User List
    userObj.getUsers = function() {
      if(localStorage.getItem('users') !== null){
        userArr = JSON.parse(localStorage.getItem('users'));
      }else {
        localStorage.setItem('users', JSON.stringify(userArr));
      }
      return userArr;
    }

    //delete User
    userObj.deleteUser = function(id){
      var arr = this.getUsers();
      arr.splice(id, 1);
      localStorage.setItem('users', JSON.stringify(arr));
      return arr;
    }

    //edit User
    userObj.userDetail = function(id){
      var arr = this.getUsers();
      return arr[id];
    }

    userObj.userEdit = function(id, obj){
      var arr = this.getUsers();
      arr[id].name = obj.name;
      arr[id].email = obj.email;
      localStorage.setItem('users', JSON.stringify(arr));
      return arr;
    }

    //add User
    userObj.addUser = function(obj){
      var arr = this.getUsers();
      arr.push({ name: obj.name, email: obj.email});
      localStorage.setItem('users', JSON.stringify(arr));

      return arr;
    }

    return userObj;
});
// .service('userServices', function(){
//   var userArr =
//         [{ name: 'Donald', email: 'donald@gmail.com'},
//         { name: 'Trump', email: 'trump@gmail.com'},
//         { name: 'Obama', email: 'obama@gmail.com'},
//         { name: 'Bush', email: 'bush@gmail.com'},
//         { name: 'Steve', email: 'steve@gmail.com'},
//         { name: 'Flash', email: 'flash@gmail.com'},
//         { name: 'Arrow', email: 'arrow@gmail.com'}];

//   this.getUsers = function(){
//     return userArr;
//   }
// });
