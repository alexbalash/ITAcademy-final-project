class ContentsView extends BaseView {
	update() {
		let html = "<h1>Heads</h1>";
		//html += '<a data-url = "article_1">st1</a>';
		const data = this.model.getContent();
		//for(let k in data){
			///html +='<a data-url"'+k+'">' +data[k] + '</a>';
		///}
		this.container.innerHTML = html;
	}
}