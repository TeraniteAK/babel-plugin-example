// normal function
function TreeNode(added_arg, left, right, item) {
  console.log("[addArg] arg name: added_arg");
  console.log("[enter] function TreeNode");
  this.left = left;
  this.right = right;
  this.item = item;
  console.log("[exit ] function TreeNode");
} // anonymous function


TreeNode.prototype.itemCheck = function (added_arg) {
  console.log("[addArg] arg name: added_arg");
  console.log("[enter] anonymous");
  if (this.left == null) return this.item;else return this.item + this.left.itemCheck() - this.right.itemCheck();
  console.log("[exit ] anonymous");
}; // arrow function


const myFun = added_arg => {
  console.log("[addArg] arg name: added_arg");
  console.log("[enter] arrow");
  const c = 1 + 2;
  return c;
  console.log("[exit ] arrow");
}; // async function


function resolveAfter2Seconds(added_arg) {
  console.log("[addArg] arg name: added_arg");
  console.log("[enter] function resolveAfter2Seconds");
  return new Promise((added_arg, resolve) => {
    console.log("[addArg] arg name: added_arg");
    console.log("[enter] arrow");
    setTimeout(added_arg => {
      console.log("[addArg] arg name: added_arg");
      console.log("[enter] arrow");
      resolve('resolved');
      console.log("[exit ] arrow");
    }, 2000);
    console.log("[exit ] arrow");
  });
  console.log("[exit ] function resolveAfter2Seconds");
}

async function asyncCall(added_arg) {
  console.log("[addArg] arg name: added_arg");
  console.log("[enter] function asyncCall");
  console.log('calling');
  const result = await resolveAfter2Seconds();
  console.log(result); // expected output: "resolved"

  console.log("[exit ] function asyncCall");
} // async arrow function


const logout = async added_arg => {
  console.log("[addArg] arg name: added_arg");
  console.log("[enter] async arrow");
  await store.dispatch('user/logout');
  let autoLogin = false;

  if (localStorage.loginInfo) {
    autoLogin = JSON.parse(localStorage.loginInfo).autoLogin;
  }

  router.push({
    path: `/login?redirect=${this.$route.fullPath}`,
    query: {
      autoLogin: autoLogin ? 1 : 0
    }
  });
  sessionStorage.clear();
  console.log("[exit ] async arrow");
}; // method


class Person {
  constructor(firstName, lastName, dob) {
    console.log("[enter] method constructor");
    this.firstName = firstName;
    this.lastName = lastName;
    this.dob = new Date(dob);
    console.log("[exit ] method constructor");
  } // Get Birth Year


  getBirthYear() {
    console.log("[enter] method getBirthYear");
    return this.dob.getFullYear();
    console.log("[exit ] method getBirthYear");
  } // Get Full Name


  getFullName() {
    console.log("[enter] method getFullName");
    return `${this.firstName} ${this.lastName}`;
    console.log("[exit ] method getFullName");
  }

  static sum(a, b) {
    console.log("[enter] static method sum");
    return a + b;
    console.log("[exit ] static method sum");
  }

} // function call


let person = new Person();
person.sum(1, 2); // add args

function pink(added_arg, o, ...keys) {
  console.log("[addArg] arg name: added_arg");
  console.log("[enter] function pink");
  let result = Object.create(null);

  for (let i = 0; i < keys.length; i++) {
    result[keys[i]] = o[keys[i]];
  }

  return result;
  console.log("[exit ] function pink");
}

let book = {
  title: "武汉",
  author: "yyy"
};
let books = pink("myArg", book, 'author', 'age', 'name');

const sum1 = function (added_arg, a, b) {
  console.log("[addArg] arg name: added_arg");
  console.log("[enter] anonymous");
  console.log("sum1: ", a + b);
  console.log("[exit ] anonymous");
};

sum1(1, 2);

const sum2 = (added_arg, a, b) => {
  console.log("[addArg] arg name: added_arg");
  console.log("[enter] arrow");
  console.log("sum2: ", a + b);
  console.log("[exit ] arrow");
};

sum2(3, 4);