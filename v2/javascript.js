function loadDoc() {
	$(document).ready(function() {
		
		var ID = $(".input").val();

		const xhttp = new XMLHttpRequest(); 
		xhttp.open("GET", `https://picsum.photos/id/${ID}/info`); 
		xhttp.send();
	
		xhttp.onload = function() {
			
			if (xhttp.status != 200) {
				$("#check").text("Картинки с таким id не существует").show();
				$("#info_author").hide();
				$("#info_unsplash_created_at").hide();
				$("#info_unsplash_description").hide();
				$("img").hide();
				$("#info_unsplash_link_download").hide();
			
			} else {
				$("#check").hide();
				const info = JSON.parse(this.responseText);
				
				$("#info_author").text("author: " + info.author).show();
				
				let foundID = info.url;
				let foundedID = foundID.slice(foundID.lastIndexOf("/")+1);
				
				var xxhttp = new XMLHttpRequest();
				xxhttp.open("GET", `https://api.unsplash.com/photos/${foundedID}?client_id=grbdcLpc4qD-QoxiYzPFWLU1-bUxyIguc--RcaXNJRo`); 
				xxhttp.send();
				
				xxhttp.onload = function() {
					const inf = JSON.parse(this.responseText);
					
					$("#info_unsplash_created_at").text("created: " + inf.created_at).show();
					$("#info_unsplash_description").text("description: " + inf.description).show();
					$("img").attr({
						src:inf.urls.small,
						title:"image",
						alt:"no_image"
					}).show();
					
					$("#info_unsplash_link_download").text("download").show();
					$("a").click(function(){
						$("#info_unsplash_link_download").attr("href", inf.links.download + "&force=true");
					});
				}
			}	
		}
	});
}
