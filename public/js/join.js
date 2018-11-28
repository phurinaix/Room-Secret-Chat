setTimeout(function(){
    document.getElementById("loader").style.display = "none";
    document.getElementsByClassName("container")[0].style.display = "block";
}, 500);

var joinForm = document.getElementById("join-form");
var createForm = document.getElementById("create-form");
var choose = document.getElementById("choose");

document.getElementById("create").addEventListener('click', function() {
    choose.style.transform = 'scale(0)';
    setTimeout(function() {
        choose.style.display = 'none';
        createForm.style.display = 'block';
        createForm.style.transform = 'scale(1)';
    }, 400);
    joinForm.style.display = 'none';
});
document.getElementById("join").addEventListener('click', function() {
    choose.style.transform = 'scale(0)';
    setTimeout(function() {
        choose.style.display = 'none';
        joinForm.style.display = 'block';
        joinForm.style.transform = 'scale(1)';
    }, 400);
});

const createAlertMessage = document.querySelector('#create-alert-error');
const joinAlertMessage = document.querySelector('#join-alert-error');
createAlertMessage.style.display = 'none';
joinAlertMessage.style.display = 'none';

function setCreateBox() {
    choose.style.display = 'none';
    createForm.style.display = 'block';
    createForm.style.transform = 'scale(1)';
}

function setJoinBox() {
    choose.style.display = 'none';
    joinForm.style.display = 'block';
    joinForm.style.transform = 'scale(1)';
}

function alertError() {
    const urlParams = new URLSearchParams(window.location.search);
    const error = urlParams.get('error');
    const method = urlParams.get('method');
    if (method === 'create') {
        if (error === 'empty') {
            setCreateBox();
            createAlertMessage.innerHTML = 'Name and room name can not be empty';
            createAlertMessage.style.display = 'block';
        }
        else if (error === 'string') {
            setCreateBox();
            createAlertMessage.innerHTML = 'Name and room name must be a string';
            createAlertMessage.style.display = 'block';
        }
        else if (error === 'alpha') {
            setCreateBox();
            createAlertMessage.innerHTML = 'Name and room name must contain only Eng letters, numbers, or dashes.';
            createAlertMessage.style.display = 'block';
        }
        else if (error === 'exist') {
            setCreateBox();
            createAlertMessage.innerHTML = 'This Name or room name already exists';
            createAlertMessage.style.display = 'block';
        }
        else if (error === 'password') {
            setCreateBox();
            createAlertMessage.innerHTML = 'Room password must contain at least 8 characters';
            createAlertMessage.style.display = 'block';
        }
        else {
            createAlertMessage.style.display = 'none';
        }
    } else if (method === 'join') {
        if (error === 'empty') {
            setJoinBox();
            joinAlertMessage.innerHTML = 'Name and room name can not be empty';
            joinAlertMessage.style.display = 'block';
        }
        else if (error === 'string') {
            setJoinBox();
            joinAlertMessage.innerHTML = 'Name and room name must be a string';
            joinAlertMessage.style.display = 'block';
        }
        else if (error === 'exist') {
            setJoinBox();
            joinAlertMessage.innerHTML = 'This name already taken';
            joinAlertMessage.style.display = 'block';
        }
        else if (error === 'alpha') {
            console.log(error + " " + method + "if");
            setJoinBox();
            joinAlertMessage.innerHTML = 'Name and room name must contain only Eng letters, numbers, or dashes.';
            joinAlertMessage.style.display = 'block';
        }
        else if (error === 'noroom') {
            setJoinBox();
            joinAlertMessage.innerHTML = 'This room does not exist';
            joinAlertMessage.style.display = 'block';
        }
        else if (error === 'password') {
            setJoinBox();
            joinAlertMessage.innerHTML = 'Password incorrect!';
            joinAlertMessage.style.display = 'block';
        }
        else {
            console.log('error not show');
            joinAlertMessage.style.display = 'none';
        }
    }
    console.log(error);
}
alertError();