function hideMenu(ths, ev) {
	if(innerHeight<769 && ths.classList.contains('show-nav') && ev.target.tagName=='BODY'){
		ths.classList.remove('show-nav');
	}
}