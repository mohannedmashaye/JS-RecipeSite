//Client side
var ingredientName = '';

function handleSubmitButton(){
	var xhr = new XMLHttpRequest();
	ingredientName = document.getElementById('text').value;
	let ingredientdiv = document.getElementById('gallery');
	ingredientdiv.innerHTML = '';

	xhr.onreadystatechange = () =>{
		if(xhr.readyState == 4 && xhr.status == 200) {
			let response = JSON.parse(xhr.responseText);
			var obj = JSON.parse(JSON.parse(response));
			ingredientdiv.innerHTML = ingredientdiv.innerHTML + `
		
			`
			for(var i = 0;i<30;i++){
				console.log("+++",obj.recipes[i]);
				ingredientdiv.innerHTML = ingredientdiv.innerHTML + `
				<div class = "slide" style ="float:left">
				<a target="_blank" href="${obj.recipes[i].f2f_url}">
					<img src="${obj.recipes[i].image_url}" width="350" height = "250">
				</a>
				<div class="title" style="text-align:center">${obj.recipes[i].title}</div>
				</div>
				`
			}
		}
	}
	xhr.open('GET', `/recipes?ingredient=${ingredientName}`, true);
	xhr.send();
	console.log("Ingredient name: ",ingredientName);
}
