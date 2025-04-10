const auth = localStorage.getItem('auth');
const expiry = localStorage.getItem('expiry');
	const now = new Date();
	if(!expiry || !auth ||  now.getTime() > expiry || auth != 'YWRtaW46eHhic3h5MTIz') {
		localStorage.clear()	
		window.location.href = '../html/login.html';
	}



