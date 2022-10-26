
	function loadDoc() {
	
		const xhttp = new XMLHttpRequest(); 
		let ID = document.querySelector('.input').value;
	
		xhttp.open("GET", `https://picsum.photos/id/${ID}/info`); 
		xhttp.send();
	
		xhttp.onload = function() {
		
			if (xhttp.status != 200) {
					document.getElementById("check").innerHTML = "Картинки с таким id не существует";
					
					document.getElementById("info_author").innerHTML = "author: -";
					document.getElementById("info_unsplash_created_at").innerHTML = "created: -";
					document.getElementById("info_unsplash_description").innerHTML = "description: -";
					document.getElementById("info_unsplash_link_download").innerHTML = "link: -";
					document.getElementById("info_unsplash_urls_small").innerHTML = "image: -";
		
			} else {
				document.getElementById("check").innerHTML = "";
				const info = JSON.parse(this.responseText);
				document.getElementById("info_author").innerHTML = "author: " + info.author;
				
				let foundID = info.url;
				let foundedID = foundID.slice(foundID.lastIndexOf("/")+1);
				
				
				var xxhttp = new XMLHttpRequest();
				xxhttp.open("GET", `https://api.unsplash.com/photos/${foundedID}?client_id=grbdcLpc4qD-QoxiYzPFWLU1-bUxyIguc--RcaXNJRo`); 
				xxhttp.send();
				
				xxhttp.onload = function() {
					const inf = JSON.parse(this.responseText);
					
					document.getElementById("info_unsplash_created_at").innerHTML = "created: " + inf.created_at;
					document.getElementById("info_unsplash_description").innerHTML = "description: " + inf.description;
					document.getElementById("info_unsplash_link_download").innerHTML = "<a href=" + inf.links.download + "&force=true>download</a>";
					document.getElementById("info_unsplash_urls_small").innerHTML = "<img src=" + inf.urls.small + ">";
				}
			}
		}
	}
	
