var arr=JSON.parse(localStorage.getItem('testpractice'));

var checkboxes = {
	username: 1,
	age: 2,
	name: 3,
	gender: 4,
	company: 5,
	phone: 6,
	view: 7,
	delete: 8
};

if(arr.length==0||arr==null){
	$.ajax({
		type:"GET",
		url:'http://127.0.0.1:8080/Test_Practice_JS/data.json',
		success:function(data){
			localStorage.setItem('testpractice',JSON.stringify(data));
			displaydata(data);
		}
	})
}
else{
	 displaydata(arr);

}

function displaydata(data){

		// $('#container').html("<tr><td>Username<input value='username' class='checkboxes' type='checkbox'></td><td><input value='age' class='checkboxes' type='checkbox'>Age</td><td><input class='checkboxes' type='checkbox' value='name'>Name</td><td><input value='gender' class='checkboxes' type='checkbox'>Gender</td><td><input class='checkboxes' type='checkbox' value='company'>Company</td><td><input class='checkboxes' type='checkbox' value='phone'>Phone</td></tr></table>");

		for(var i=0;i<data.length;i++){
			var str="";	
			
			for(const key in data[i]){
				if(data[i].hasOwnProperty(key)){

					str=`<tr id=`+data[i]._id+`>`;
					str+="<td seltr='toggle_username'>"+data[i].username+"</td>";
					str+="<td>"+data[i].age+"</td>";
					str+="<td>"+data[i].name+"</td>";
					str+="<td>"+data[i].gender+"</td>";
					str+="<td>"+data[i].company+"</td>";
					str+="<td>"+data[i].phone+"</td>";
					str+=`<td><button class='viewclass'> View</td>`;
					str+=`<td><button class='deleteclass'> Delete</td>`;

				}		}
				str+="</tr>";
				document.getElementById('tab').insertAdjacentHTML("beforeend",str);		

			}


			$(document).on('change','.checkboxes', function () {
				console.log(this.value);

				$('#tab tr>td:nth-child(' + (checkboxes[this.value] ) + ')').toggle();//every row
				$('#tab tr>th:nth-child(' + (checkboxes[this.value] ) + ')').toggle();

			});

			$(document).on('click','.viewclass',function(e){
				var x=e.target.parentNode.parentNode.id;
				if(document.getElementById(x+`vd`)){
					document.getElementById(x+`vd`).remove();
				}else{

					var x=e.target.parentNode.parentNode.id;

					for(var i=0;i<data.length;i++){
						var str="";	
						if(data[i]._id==x){

							str=`<tr id=`+x+`vd><td colspan='8'>`;
							str+='id: '+data[i]._id+"<br>";
							str+='username: '+data[i].username+"<br>";
							str+='Balance: '+data[i].balance+"<br>";
							str+='Picture: '+data[i].picture+"<br>";
							str+='age: '+data[i].age+"<br>";
							str+='eyecolor: '+data[i].eyeColor+"<br>";
							str+='name: '+data[i].name+"<br>";
							str+='gender: '+data[i].gender+"<br>";
							str+='company: '+data[i].company+"<br>";
							str+='email: '+data[i].email+"<br>";
							str+='phone: '+data[i].phone+"<br>";
							str+='address: '+data[i].address+"<br>";
							str+='company: '+data[i].company+"<br>";
							str+='about: '+data[i].about+"<br> friends:";
							for( var j=0;j<data[i].friends.length;j++){
							str+=' '+data[i].friends[j].id+" "+data[i].friends[j].name+"<br>";
							}
							str+='registered: '+data[i].registered+"<br>";
							str+='tags: '+data[i].tags+"<br>";
							str+='greeting: '+data[i].greeting+"<br>";
							str+='favoriteFruit: '+data[i].favoriteFruit;

						}					
						str+="</td></tr>";
						$('#'+data[i]._id).after(str);
					}
				}

			});


			$(document).on('click','.deleteclass',function(e){
				var x=e.target.parentNode.parentNode.id;
				for(var i=0;i<data.length;i++){
					if(data[i]._id==x){	
						document.getElementById(x).remove();
						data.splice(i,1);
						localStorage.setItem('testpractice',JSON.stringify(data));

					}
				}

			});


// Used a better method-Check mjt.js(Kartik_test)
$('#inpbox').keyup(function () {
    var val = $(this).val().toString();
    var allTdData = $('#tab tr');
    jQuery('#tab tr').hide();
    jQuery('#tab tr td:contains("'+val+'"):not(td:has("button"))').parent().toggle();

});


			
			
		}

