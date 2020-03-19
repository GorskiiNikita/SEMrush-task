'use strict';


function renderAuthPage() {
    let mainDiv = document.getElementById('main')
	clearAllChild(mainDiv);
	let authBtn = document.createElement('button');
	authBtn.innerText = 'Авторизоваться';
	authBtn.setAttribute('onclick', 'loginVk()');
	mainDiv.appendChild(authBtn);
}


function renderMainPage() {
	clearAllChild(document.getElementById('main'));
	renderHeaderMainPage();
	renderSearch();
}


function renderHeaderMainPage() {

    let divHeader = document.createElement('div');
    divHeader.setAttribute('class', 'header');

    let divContainer = document.createElement('div');
    divContainer.setAttribute('class', 'container');
    divHeader.appendChild(divContainer);

    let divUser = document.createElement('div');
    divUser.setAttribute('class', 'user');
    divContainer.appendChild(divUser);

    let btnLogout = document.createElement('button');
    btnLogout.setAttribute('class', 'btn-logout');
    btnLogout.setAttribute('onclick', 'logoutVk()');
    btnLogout.innerText = 'Выйти';
    divContainer.appendChild(btnLogout);

    let imgAvatar = document.createElement('img');
    imgAvatar.setAttribute('class','user-avatar');
    divUser.appendChild(imgAvatar);

    let h1Fullname = document.createElement('h1');
    h1Fullname.setAttribute('class', 'fullname');
    divUser.appendChild(h1Fullname);

    let pCountFriends = document.createElement('p');
    pCountFriends.setAttribute('class', 'count-friends');
    divUser.appendChild(pCountFriends);

    VK.Api.call('users.get', {v:"5.103", fields:"photo_100"}, function (r) {
        imgAvatar.setAttribute('src', r.response[0].photo_100);
        h1Fullname.innerText = r.response[0].first_name + ' ' + r.response[0].last_name;
	});

    VK.Api.call('friends.get', {v: '5.103'}, function (r) {
		pCountFriends.innerText = 'Друзья: ' + r.response.count;
	});

    let mainDiv = document.getElementById('main');
    mainDiv.appendChild(divHeader);
}


function renderSearch() {
    let divMiddle = document.createElement('div');
    divMiddle.setAttribute('class', 'middle');

    let divContainer = document.createElement('div');
    divContainer.setAttribute('class', 'container');
    divMiddle.appendChild(divContainer);

    let divSearch = document.createElement('div');
    divSearch.setAttribute('class', 'search');
    divContainer.appendChild(divSearch);

    let inputName = document.createElement('input');
    inputName.setAttribute('id', 'input_name');
    divSearch.appendChild(inputName);

    let btnSearch = document.createElement('button');
    btnSearch.setAttribute('onclick', 'renderFriends()');
    btnSearch.innerText = 'Поиск';
    divSearch.appendChild(btnSearch);

    let mainDiv = document.getElementById('main');
    mainDiv.appendChild(divMiddle);
}


function renderFriends() {
    let container = document.getElementsByClassName('container')[1];

    let tableFriends = document.getElementsByClassName('friends')[0];

    if (!tableFriends) {
        tableFriends = document.createElement('table');
        tableFriends.setAttribute('class', 'friends');
        container.appendChild(tableFriends);
    }


    let inputText = document.getElementById('input_name').value;
    if (inputText.length === 0) {
        clearAllChild(tableFriends);
        let tr, td;
        tr = document.createElement('tr');
        td = document.createElement('td');
        td.innerText = 'Задан пустой поисковой запрос';
        tr.appendChild(td);
        tableFriends.appendChild(tr);
        return;
    }

    VK.Api.call('users.search', {v: '5.103', q: inputText, count: '20', fields: 'photo_50', from_list: 'friends'}, function(r) {
        clearAllChild(tableFriends);
        let trFriend, tdAvatar, tdFullname, imgAvatar;

        if (r.response.count === 0) {
            let tr = document.createElement('tr');
            let td = document.createElement('td');
            td.innerText = 'Друзей с таким именем/фамилией не найдено';
            tr.appendChild(td);
            tableFriends.appendChild(tr);
            return;
        }


        for (let i = 0; i < r.response.count; i++) {
            trFriend = document.createElement('tr');

            tdAvatar = document.createElement('td');
            trFriend.appendChild(tdAvatar);

            tdFullname = document.createElement('td');
            tdFullname.setAttribute('class', 'friend-name');
            tdFullname.innerText = r.response.items[i].first_name + ' ' + r.response.items[i].last_name;
            trFriend.appendChild(tdFullname);

            imgAvatar = document.createElement('img');
            imgAvatar.setAttribute('src', r.response.items[i].photo_50);
            imgAvatar.setAttribute('class', 'friend-avatar');
            tdAvatar.appendChild(imgAvatar);

            tableFriends.appendChild(trFriend);
        }
    })
}
