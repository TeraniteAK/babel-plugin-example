// normal function
function TreeNode(left,right,item){
    this.left = left;
    this.right = right;
    this.item = item;
}

// anonymous function
TreeNode.prototype.itemCheck = function(){
    if (this.left==null) return this.item;
    else return this.item + this.left.itemCheck() - this.right.itemCheck();
}

// arrow function
const myFun = () => {
    const c = 1 + 2
    return c
}

// async function
function resolveAfter2Seconds() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('resolved');
        }, 2000);
    });
}

async function asyncCall() {
    console.log('calling');
    const result = await resolveAfter2Seconds();
    console.log(result);
    // expected output: "resolved"
}

// async arrow function
const logout = async() => {
    await store.dispatch('user/logout')
    let autoLogin = false
    if (localStorage.loginInfo) {
        autoLogin = JSON.parse(localStorage.loginInfo).autoLogin
    }
    router.push({
        path: `/login?redirect=${this.$route.fullPath}`,
        query: {
            autoLogin: autoLogin ? 1 : 0
        }
    })
    sessionStorage.clear()
}

// method
class Person {
    constructor(firstName, lastName, dob) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.dob = new Date(dob);
    }

    // Get Birth Year
    getBirthYear() {
        return this.dob.getFullYear();
    }

    // Get Full Name
    getFullName() {
        return `${this.firstName} ${this.lastName}`
    }

    static sum(a, b) {
        return a + b
    }
}

// function call
let person = new Person
person.sum(1, 2)

// add args
function pink(o,...keys) {
    let result = Object.create(null);

    for(let i = 0; i < keys.length; i++){
        result[keys[i]] = o[keys[i]];
    }
    return result;
}

let book = {
    title:"武汉",
    author:"yyy"
};
let books = pink(book,'author','age','name');

const sum1 = function(a, b) {
    console.log("sum1: ", a + b)
}

sum1(1, 2)

const sum2 = (a, b) => {
    console.log("sum2: ", a + b)
}

sum2(3, 4)