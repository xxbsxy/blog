const auth = localStorage.getItem('auth');
const expiry = localStorage.getItem('expiry');
const n = localStorage.getItem("num") || 0;
if(n >=2) {
	window.location.href = '../html/lock.html';
} else{
		const now = new Date();
	if(!expiry || !auth ||  now.getTime() > expiry || auth != 'YWRtaW46eHhic3h5MTIz') {
		localStorage.clear()	
		window.location.href = '../html/login.html';
	}

}



