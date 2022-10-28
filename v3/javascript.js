function loadDoc() {
	$(document).ready(function() {
		
		var ID = $(".input").val();
		
		$.ajax({
			method: 'get',
			url: `https://picsum.photos/id/${ID}/info`,
			dataType: 'JSON',
			data: ID,
			success: function(dataFromPicsum){
				console.log(dataFromPicsum);
				$("#check").hide();
				// $("#info_author").html("<b>author:</b> " + dataFromPicsum.author).show();
				
				var foundID = dataFromPicsum.url;
				var foundedID = foundID.slice(foundID.lastIndexOf("/")+1);
				$.ajax({
					method: 'get',
					url: `https://api.unsplash.com/photos/${foundedID}?client_id=grbdcLpc4qD-QoxiYzPFWLU1-bUxyIguc--RcaXNJRo`,
					dataType: 'JSON',
					data: foundedID,
					
					success: function(dataFromUnsplash){
						console.log(dataFromUnsplash);
						$("#info_author").html("<b>author:</b> " + dataFromUnsplash.user.name).show();
						$("#info_unsplash_created_at").html("<b>created:</b> " + dataFromUnsplash.created_at.slice(0, 10)).show();
						$("#info_unsplash_description").html("<b>description:</b> " + dataFromUnsplash.description).show();
						$("img").attr({
							src:dataFromUnsplash.urls.small,
							title:"image",
							alt:"no_image"
						}).show();
					
						$("#info_unsplash_link_download").html("<b>download</b>").show();
						$("a").click(function(){
							$("#info_unsplash_link_download").attr("href", dataFromUnsplash.links.download + "&force=true");
						});
					//}
					},
					
					error: function (jqXHR, exception) {
						if (jqXHR.status != 200) {
							$("#check").html("На сайте <i><u>unsplash.com</u></i> картинки с таким id больше нет").show();
							$("#info_author").hide();
							$("#info_unsplash_created_at").hide();
							$("#info_unsplash_description").hide();
							$("img").hide();
							$("#info_unsplash_link_download").hide();
						}
					}
					
					
					
						
						
					
					
				});
				
			},
			error: function (jqXHR, exception) {
				if (jqXHR.status != 200) {
					$("#check").text("Картинки с таким id не существует").show();
					$("#info_author").hide();
					$("#info_unsplash_created_at").hide();
					$("#info_unsplash_description").hide();
					$("img").hide();
					$("#info_unsplash_link_download").hide();
				}
			}
		});
	});
}