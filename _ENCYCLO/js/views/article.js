class ArticleView extends BaseView {
	update() {
		let html = '<h1>'+ 'article id = '+  this.model.getId() +'</h1>';
		this.container.innerHTML = html;
	}
}