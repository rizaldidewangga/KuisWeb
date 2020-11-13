const ApiKey = "";
const baseUrl = "http://ergast.com/api/f1/2020/";
const teamEndPoin = `${baseUrl}constructors.json`;
const matchEndPoin = `${baseUrl}.json`;

const contents = document.querySelector("#content-list");
const title = document.querySelector(".card-title");
const fetchres = fetch(teamEndPoin);
const fetchresmatch = fetch(matchEndPoin);

function getListConstructors() {
    title.innerHTML = "Daftar Tim F1"
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
    title.innerHTML = "Standing F1";
    fetch(matchEndPoin, fetchresmatch)
        .then(response => response.json())
        .then(resJson => {
            console.log(matchEndPoin);
            let Stand = "";
            console.log(resJson.MRData.StandingsTable.StandingsLists);
            resJson.MRData.StandingsTable.StandingsLists.forEach(StandingsLists => 
                Stand += `
                <li class="collection-item avatar">
                    <span class="title">${StandingsLists.DriverStandings.position}</span>
                    <p>Season: ${StandingsLists.season}<br>
                       Ronde: ${StandingsLists.round} <br>
                       Point: ${StandingsLists.DriverStandings.points}<br>
                       Menang: ${StandingsLists.DriverStandings.wins}<br>
                    </p>
                    <a href="#" data-id="${StandingsLists.id}" class="secondary-content"><i class="material-icons" data-id="${StandingsLists.id}">info</i></a>
                </li>
                `
            );
            contents.innerHTML = '<ul class="collection">' + Stand + '</ul>';
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