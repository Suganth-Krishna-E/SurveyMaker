let currentState;

const routingTitleLocationModulesMap = {
    'navBar': './modules/navbar.js',
    'createUser': './modules/createuser.js',
    'login': './modules/login.js',
    'home': './modules/home.js',
    'createsurvey': './modules/createsurvey.js',
    'surveySubmit': './modules/surveysubmit.js',
    'viewStats': './modules/viewstats.js',
    'fillSurvey': './modules/fillsurvey.js',
    'viewSurveyDetails': './modules/viewsurveydata.js'
}

const backendConnectionUrl = 'http://localhost:8080';


function loadInitialData() {
    loadNavBar();

    history.replaceState({page: 'index'}, null, 'index');
}

async function loadModule(moduleName) {
    if(moduleName !== 'index') {
        const moduleData = await import(routingTitleLocationModulesMap[moduleName]);

        const mainContainerData = document.querySelector('.main-container');
        const container = await moduleData.getData();


        if(mainContainerData !== null) {
            document.body.removeChild(mainContainerData);
        }
        document.body.appendChild(container);
    
        if(moduleData.attachEventListeners !== undefined) {
            moduleData.attachEventListeners();
        }
    }
    else {
        loadNavBar();
    }
}

async function loadNavBar() {
    const navBarModule = await import('./modules/navbar.js');
    const navBarElement = navBarModule.getData();

    const body = document.querySelector('.nav-bar');

    const mainContainer = document.querySelector('.main-container');
    
    if(body !== null) {
        document.replaceChild(body, navBarElement);
    }
    else {
        document.body.insertBefore(navBarElement, mainContainer);
    }
    

    const listNavBarElements = document.querySelectorAll('.nav-bar li');
    listNavBarElements.forEach((element) => {
        element.addEventListener('click', () => {
            const moduleName = element.getAttribute('id');

            loadModule(moduleName);
            history.pushState({page: moduleName} , null, moduleName);
            currentState = history.state;
        })
    })
}

window.addEventListener('popstate', (e) => {
    e.preventDefault();
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

const userCustomerIdList = [];


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
    return true;
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

    document.body.replaceChildren(loginNavBarElement);
}

export default { checkIsUserAvailable, addNewUser, loadModule, loginToSite, loadHomePageAfterLogin, loadSurveySubmitPage, loadViewStatsPage, loadFillSurveyModule, loadSurveyDetails, backendConnectionUrl };