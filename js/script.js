const ApiKey = "";
const baseUrl = "http://ergast.com/api/f1/2020/";
const teamEndPoin = `${baseUrl}constructors.json`;
const matchEndPoin = `${baseUrl}drivers.json`;

const contents = document.querySelector("#content-list");
const title = document.querySelector(".card-title");
const fetchres = fetch(teamEndPoin);
const fetchresmatch = fetch(matchEndPoin);

function getListConstructors() {
    title.innerHTML = "Daftar Pemabalap F1 2020"
    fetch(teamEndPoin, fetchres)
        .then(response => response.json())
        .then(resJson => {
            console.log(teamEndPoin);
            let ConstructorsLists = "";
            resJson.MRData.ConstructorTable.Constructors.forEach(Constructors => 
                ConstructorsLists += `
                <li class="collection-item avatar">
                    <p> Nama Pembalap : ${Constructors.name}<br>
                        Inisial : ${Constructors.constructorId} <br>
                        Negara Tim : ${Constructors.nationality}
                    </p>
                    <a href="#" data-id="${Constructors.id}" class="secondary-content"><i class="material-icons" data-id="${Constructors.id}">info</i></a>
                </li>
                `
            );
            contents.innerHTML = '<ul class="collection">' + ConstructorsLists + '</ul>';
        }).catch(err => {
            console.error(err);
        })
}

function getListMatches() {
    title.innerHTML = "Biodata Pembalap F1 2020";
    fetch(matchEndPoin, fetchresmatch)
        .then(response => response.json())
        .then(resJson => {
            console.log(matchEndPoin);
            let DriverList = "";
            console.log(resJson.MRData.DriverTable.Drivers);
            resJson.MRData.DriverTable.Drivers.forEach(Drivers => 
                DriverList += `
                <li class="collection-item avatar">
                    <span class="title">${Drivers.driverId}</span>
                    <p> Kode: ${Drivers.code} <br>
                        Nama Depan: ${Drivers.givenName}<br>
                        Nama Belakang: ${Drivers.familyName}<br>
                        Lahir: ${Drivers.dateOfBirth}<br>
                        Kebangsaan: ${Drivers.nationality}<br>
                    </p>
                    <a href="#" data-id="${Drivers.id}" class="secondary-content"><i class="material-icons" data-id="${Drivers.id}">info</i></a>
                </li>
                `
            );
            contents.innerHTML = '<ul class="collection">' + DriverList + '</ul>';
        }).catch(err => {
            console.error(err);
        })
}

function loadPage(page) {
    switch (page) {
        case "teams":
            getListConstructors();
            break;
        case "matches":
            getListMatches();
            break;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);

    document.querySelectorAll(".sidenav a, .topnav a").forEach(elm => {
        elm.addEventListener("click", evt => {
            let sideNav = document.querySelector(".sidenav");
            M.Sidenav.getInstance(sideNav).close();
            page = evt.target.getAttribute("href").substr(1);
            loadPage(page);
        })
    })
    var page = window.location.hash.substr(1);
    if (page === "" || page === "!") page = "teams";
    loadPage(page);
});
