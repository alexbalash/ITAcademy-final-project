class MainView extends BaseView {
	update() {
		let html = '<h1>Энциклопедия</h1>';
		html += '<a data-url = "contents">список статей</a>';
		this.container.innerHTML = html;
	}
}