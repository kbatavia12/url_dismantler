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
        document.getElementById('subdomain-value').innerText = 'www';
        document.getElementById('mid-level-domain-value').innerText = domains[0];
        document.getElementById('top-level-domain-value').innerText = domains[1];
    } else {
        document.getElementById('subdomain-value').innerText = domains[0];
        document.getElementById('mid-level-domain-value').innerText = domains[1];
        document.getElementById('top-level-domain-value').innerText = domains[2];
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

    } else {
        urlObject["queryParams"] = null;
        return;
    }

    urlObject["queryParams"] = queryParams;

}


function createQueryNode(key, value) {
    let container = document.createElement('div');
    container.classList.add("url-info-container");

    let keyContainer = document.createElement('div');
    keyContainer.classList.add("url-info-value");
    keyContainer.classList.add("border-right");
    let valueContainer = document.createElement('div');
    valueContainer.classList.add("url-info-value");

    let textNodeKey = document.createElement('h4');
    keyContainer.appendChild(textNodeKey);
    let textNodeValue = document.createElement('h4');
    valueContainer.appendChild(textNodeValue);

    textNodeKey.innerText = key;
    textNodeValue.innerText = value;

    container.appendChild(keyContainer);
    container.appendChild(valueContainer);


    return container;


}

function appendQueryNode(queryParams) {
    if (queryParams) {
        let keys = Object.keys(queryParams);
        let values = Object.values(queryParams);

        for (let j = 0; j < keys.length; j++) {
            let container = createQueryNode(keys[j], values[j]);
            document.querySelector('.query-string-container').appendChild(container);
        }
    }


}



//Todo Multiple appends to query string
function updateUI(urlParams) {
    document.getElementById('scheme-value').innerText = urlParams.scheme;
    document.getElementById('path-value').innerText = urlParams.path;
    resolveDomains(urlParams.domains);
    document.getElementById('url-parts-table').style = "display: block;"
    window.location.href = "#url-parts-table";

    if (urlParams.queryParams) {
        document.getElementById('query-table').style = "display: flex;";
    } else {
        document.getElementById('query-table').style = "display: none;";
    }

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
        appendQueryNode(urlObject.queryParams);
    }
});


