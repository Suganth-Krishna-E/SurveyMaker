const mainContainer = document.getElementById("main-container");
let currentState;

const routingTitleLocationModulesMap = {
    'navBar': './modules/navbar.js',
    'createUser': './modules/createuser.js',
    'login': './modules/login.js',
    'home': './modules/home.js',
    'createsurvey': './modules/createsurvey.js',
}


function loadInitialData() {
    loadNavBar();

    history.replaceState({page: 'index'}, null, 'index');
}

async function loadModule(moduleName) {
    if(moduleName !== 'index') {
        const moduleData = await import(routingTitleLocationModulesMap[moduleName]);

        const mainContainerData = document.getElementsByTagName('main');

        if(mainContainerData.length !== 0) {
            mainContainer.removeChild(mainContainerData[0]);
        }
    
        mainContainer.appendChild(moduleData.getData());
        history.pushState({page: moduleName} , null, moduleName);
    }
    else if(moduleName === 'home') {
        
    }
    else {
        loadNavBar();
    }
}

async function loadNavBar() {
    const navBarModule = await import('./modules/navbar.js');
    const navBarElement = navBarModule.getData();

    mainContainer.appendChild(navBarElement);

    const mainContainerData = document.getElementsByTagName('main');

    if(mainContainerData.length !== 0) {
        mainContainer.removeChild(mainContainerData[0]);
    }

    const listNavBarElements = document.querySelectorAll('.nav-bar li');
    listNavBarElements.forEach((element) => {
        element.addEventListener('click', () => {
            const moduleName = element.getAttribute('id');
            console.log(moduleName);
            loadModule(moduleName);
            currentState = history.state;
            // console.log(currentState);
        })
    })
}

window.addEventListener('popstate', (e) => {
    console.log(currentState);
    if (e.state) {
        loadModule(e.state.page);
    }
});

loadInitialData();


class User {
    username;
    email;
    customerid;
    pincode;
    password;

    constructor(username, email, customerid, pincode, password) {
        this.username = username;
        this.email = email;
        this.customerid = customerid;
        this.pincode = pincode;
        this.password = password;
    }
}

const listOfUserDetails = [
    new User('Suganth Krishna E', 'suganth@trustrace.com', 'cus_001', '638812', 'Suganth_7575')
];
const userCustomerIdList = [];
userCustomerIdList.push('cus_001');

function addNewUser(data) {
    console.log(listOfUserDetails);
    if(validateNewUserInsertion(data)) {
        const newUser = new User(data.name, data.email, data.customerid, data.pincode, data.password);
        listOfUserDetails.push(newUser);
        userCustomerIdList.push(data.customerid);
        console.log(listOfUserDetails);
        return true;
    }
    else {
        return false;
    }
}


function checkIsUserAvailable(customerid) {
    if(userCustomerIdList.includes(customerid)) {
        return true;
    }
    else {
        return false;
    }
}

function validateNewUserInsertion(data) {
    if(!checkIsUserAvailable(data.customerid)) {
        return true;
    }
}


function loginToSite(username, password) {
    const user = listOfUserDetails.find((user) => user.username === username && user.password === password);
    if(user) {
        return true;
    }
    else {
        return false;
    }
}

function loadHomePageAfterLogin(username) {
    loadLoginNavBar(username);
    loadModule('home');
}

async function loadLoginNavBar(username) {
    const loginNavBarModule = await import('./modules/loginnavbar.js');
    loginNavBarModule.loadInitialData(username);
    const loginNavBarElement = loginNavBarModule.getData();

    mainContainer.replaceChildren(loginNavBarElement);
}

export default { checkIsUserAvailable, addNewUser, loadModule, loginToSite, loadHomePageAfterLogin };