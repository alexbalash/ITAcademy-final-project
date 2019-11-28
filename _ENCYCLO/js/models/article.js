class ArticleModel extends BaseModel {
	constructor() {
		super();
		this.id = null;
	}

	setId(id) {
		this.id = id;
	}

	getId() {
		return this.id;
	}
}