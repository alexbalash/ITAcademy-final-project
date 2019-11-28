class ContentsModel extends BaseModel {
    static get urls(){
        return {
            'contents': 'contents.json'
        }
    }

async getContent(){
let response = await fetch('https://raw.githubusercontent.com/alexbalash/encyclo/master/list.json', {mode: 'no-cors'});
let result = await response.text();
console.log(result)
return result

}
}