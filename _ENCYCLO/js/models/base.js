class BaseModel {
	constructor() {
		this.view = null;
	}

	setView(view) {
		this.view = view;
	}

	updateView() {
		this.view.update();
	}
}