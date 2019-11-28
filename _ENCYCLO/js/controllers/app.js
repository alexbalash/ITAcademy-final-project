class AppController {
	constructor() {
		let mainModel = new MainModel();
		let mainView = new MainView(mainModel);
		mainModel.setView(mainView);
		
		let contentsModel = new ContentsModel();
		let contentsView = new ContentsView(contentsModel);
		contentsModel.setView(contentsView);
		
		let articleModel = new ArticleModel();
		let articleView = new ArticleView(articleModel);
		articleModel.setView(articleView);

		this.mainModel = mainModel;
		this.contentsModel = contentsModel;
		this.articleModel = articleModel;
		
		this.setupListeners();
		this.switchToStateFromURLHash();
	}
	
	setupListeners() {
		window.onhashchange = this.switchToStateFromURLHash.bind(this);
		const self = this;
		const config = {
			childList: true
		}
		var target = document.getElementById('content');
		const observer = new MutationObserver(()=> {
let a = document.getElementsByTagName('a');
for (let i =0; i<a.length; i++){
	a[i].onclick =self.linkOnClickHandler.bind(self);
}
		});
		observer.observe(target, config)
	}

	linkOnClickHandler(e){
const url  = e.target.getAttribute('data-url');
this.switchToState(url);
	}

	switchToMainPage() {
	    this.switchToState('contents');
	}

	switchToState(newState) {
	    location.hash = newState;
	}

	switchToStateFromURLHash() {
		let URLHash = window.location.hash;

    	let stateStr = URLHash.substr(1);

	    let model = this.getCurrentModel(stateStr);
		
		model.updateView();
	}

	getCurrentModel(stateStr) {
		if ( stateStr != "" ) { 
	        let parts = stateStr.split("_")
		    
		    if (parts[0] == 'article') {
		    	let id = parts[1] !== undefined ? parts[1] : 1;
		    	this.articleModel.setId(id);
		    	return this.articleModel;
		    }

		    if (parts[0] == 'contents') {
			    return this.contentsModel;	
		    }

			return this.mainModel;	
	    }

	    return this.mainModel;
	}
}