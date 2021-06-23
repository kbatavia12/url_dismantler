const dismantleButton = document.getElementById('dismantle_button');

const urlObject = {};
var i;
function getScheme(url) {
    let slashCount = 0;
    let scheme = "";
    for (i = 0; i < url.length; i++) {
        if (slashCount == 2) break;
        if (url[i] == '/') {
            slashCount++;
        }
        scheme += url[i];
    }

    urlObject["scheme"] = scheme;


}




function getDomains(url) {
    let currentDomain = "";
    let domains = [];

    while (url[i] != '/') {
        if (url[i] == '.') {
            domains.push(currentDomain);
            currentDomain = "";
        }
        currentDomain += url[i];
        i++;
    }

    domains.push(currentDomain);

    urlObject["domains"] = domains;


}


function resolveDomains(domains) {
    if (domains.length === 2) {
        document.getElementById('mid-level-domain').innerText = `Mid Level Domain: ${domains[0].substr(1,)}`;
        document.getElementById('top-level-domain').innerText = `Top Level Domain: ${domains[1]}`;
    } else {
        document.getElementById('subdomain').innerText = `Subdomain: ${domains[0]}`;
        document.getElementById('mid-level-domain').innerText = `Mid Level Domain: ${domains[1].substr(1,)}`;
        document.getElementById('top-level-domain').innerText = `Top Level Domain: ${domains[2]}`;
    }
}





function getPath(url) {
    let currentPath = "";

    while (url[i] != "?" && i != url.length) {
        currentPath += url[i];
        i++;
    }

    urlObject["path"] = currentPath;


}


function getQueryStrings(url) {
    let queryParams = {};
    if (i < url.length) {
        i++;
        let currentParam = "";
        let currentValue = "";
        let flag = 1;
        for (; i < url.length; i++) {

            if (url[i] == '&') {
                flag = !flag;
                queryParams[currentParam] = currentValue;
                currentParam = ""; currentValue = "";
                continue;
            }
            if (url[i] == '=') {
                flag = !flag;
                continue;
            }
            if (flag) {
                currentParam += url[i];
            } else {
                currentValue += url[i];
            }
        }

        queryParams[currentParam] = currentValue;

    }

    urlObject["queryParams"] = queryParams;

}




function updateUI(urlParams) {
    document.getElementById('scheme').innerText = `Scheme: ${urlParams.scheme}`
    document.getElementById('path').innerText = `Path: ${urlParams.path}`
    resolveDomains(urlParams.domains);

}


dismantleButton.addEventListener('click', function () {
    const url = document.getElementById('url_input').value;
    if (url != "") {
        getScheme(url);
        getDomains(url);
        getPath(url);
        getQueryStrings(url);

        console.log(urlObject);
        updateUI(urlObject);
    }
});


