const mainContainer = document.getElementById("main-container");
let currentState;

const routingTitleLocationModulesMap = {
    'navBar': './modules/navbar.js',
    'createUser': './modules/createuser.js',
    'login': './modules/login.js',
    'home': './modules/home.js',
    'createsurvey': './modules/createsurvey.js',
    'surveySubmit': './modules/surveysubmit.js',
    'viewStats': './modules/viewstats.js',
    'fillSurvey': './modules/fillSurvey.js',
    'viewSurveyDetails': './modules/viewSurveyData.js'
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
    
        const container = await moduleData.getData();
        mainContainer.appendChild(container);
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

            loadModule(moduleName);
            history.pushState({page: moduleName} , null, moduleName);
            currentState = history.state;
            // console.log(currentState);
        })
    })
}

window.addEventListener('popstate', (e) => {

    if (e.state) {
        loadModule(e.state.page);
        history.pushState({page: e.state.page} , null, e.state.page);
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

let currentLoggedUser;

function addNewUser(data) {

    if(validateNewUserInsertion(data)) {
        const newUser = new User(data.name, data.email, data.customerid, data.pincode, data.password);
        listOfUserDetails.push(newUser);
        userCustomerIdList.push(data.customerid);

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
    currentLoggedUser = username;
    loadLoginNavBar(username);
    loadModule('home');
    history.pushState({page: 'home'} , null, 'home');
}

function loadSurveySubmitPage(surveyId, surveyTitle) {
    loadLoginNavBar(currentLoggedUser);
    history.pushState({ page: 'surveySubmit' }, null, `surveySubmit?surveyId=${surveyId}&surveyTitle=${encodeURIComponent(surveyTitle)}`);
    loadModule('surveySubmit');
}

function loadViewStatsPage(adminId) {
    loadLoginNavBar(currentLoggedUser);
    history.pushState({ page: 'viewStats' }, null, `viewStats?adminId=${adminId}`);
    loadModule('viewStats');
}

function loadFillSurveyModule() {
    loadLoginNavBar(currentLoggedUser);
    history.pushState({ page: 'fillSurvey' }, null, `fillSurvey`);
    loadModule('fillSurvey');
}

function loadSurveyDetails(surveyId) {
    loadLoginNavBar(currentLoggedUser);
    history.pushState({ page: 'viewSurveyDetails' }, null, `viewSurveyDetails?surveyId=${surveyId}`);
    loadModule('viewSurveyDetails');
}

async function loadLoginNavBar(username) {
    const loginNavBarModule = await import('./modules/loginnavbar.js');
    loginNavBarModule.loadInitialData(username);
    const loginNavBarElement = loginNavBarModule.getData();
    mainContainer.replaceChildren(loginNavBarElement);
}

export default { checkIsUserAvailable, addNewUser, loadModule, loginToSite, loadHomePageAfterLogin, loadSurveySubmitPage, loadViewStatsPage, loadFillSurveyModule, loadSurveyDetails };