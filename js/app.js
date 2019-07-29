var resultDiv;
var resultCode;
var code;
var resultTabla;


var cont=0;



document.addEventListener("deviceready", init, false);
function init() {
	document.querySelector("#startScan").addEventListener("touchend", startScan, false);
	var buttonAction=document.querySelector('#anadir');
		buttonAction.addEventListener('click', this.agregarFila);
	//resultDiv = document.querySelector("#results");
	resultCode = document.querySelector("#producto");
	resultTabla = document.querySelector("#prod");
}

function startScan() {

	cordova.plugins.barcodeScanner.scan(
		function (result) {
			code=""+result.text+"";
			/*var s = "Result: " + result.text + "<br/>" +
			"Format: " + result.format + "<br/>" +
			"Cancelled: " + result.cancelled;
			resultDiv.innerHTML = s;*/
            document.querySelector("#producto").value=code;
			//resultCode.value=code;
			verificacion();

		}, 
		function (error) {
			alert("Scanning failed: " + error);
		}
	);

}

function prueba(){
	//alert('hola '+code);
    $.ajax({
        type: "POST",
        url: "https://inventaapp.000webhostapp.com/acciones.php?ac=3&cod="+code,
        //url: "http://192.168.0.108/EMPRENDIMIENTO/servidor/acciones.php?ac=3&cod="+code,
        data:"cod="+code,
        success: function(result) {
            console.log(result);
            //alert('hola1');
            $('#prod').html(result);
            //alert('hola2');
            cont++;
            agregarFila();
            
            //document.getElementById("total_prod").innerHTML += '<td>1</td><td>2</td><td>3</td><td><button class="button">X</button></td>';
            //resultDiv.innerHTML = result;
        }
    });
}


function agregarFila(){
    var nom=document.getElementById('nom_pro').value;
    var prec=document.getElementById('pre_pro').value;
    var med=document.getElementById('med_pro').value;
    //var cant=document.getElementById('cantidad').value;
    //alert(nom+prec+med);
    var tabla=document.getElementById("total_prod").innerHTML;
    //alert(tabla);
    //document.getElementById("total_prod").innerHTML= tabla+'<tr><td>'+nom+'</td><td>'+pre+'</td><td>'+cant+'</td><td><button class="button">X</button></td></tr>';
    //document.getElementById("total_prod").insertRow(-1).innerHTML = '<td>'+nom+'</td><td>'+pre+'</td><td>'+cant+'</td><td><button class="button">X</button></td>';
    //var tabla=document.getElementById("total_prod").innerHTML;
    //alert(tabla);
    //document.getElementById("total_prod").innerHTML += '<td>1</td><td>2</td><td>3</td><td><button class="button">X</button></td>';
    //document.getElementById("total_prod").innerHTML += '<td>'+nom+'</td><td>'+prec+'</td><td><input type="number" id="cantidad_pro_'+cont+'" class="numero" value="1"></td><td>'+prec+'</td><td><button class="button">X</button></td>';
    document.getElementById("total_prod").innerHTML += 
    `<td>`+nom+`
    <input type="hidden" id="nom_pro_`+cont+`" value="`+nom+`"></td>
    <td>`+prec+`
    <input type="hidden" id="pre_pro_`+cont+`" value="`+prec+`"></td>
    <td><input type="number" id="cantidad_pro_`+cont+`" class="numero" onblur="recalcular('cantidad_pro_`+cont+`')" value="1"></td>
    <td><label id="lb_subt_pro_`+cont+`">`+prec+`</label>
    <input type="hidden" id="subt_pro_`+cont+`" value="`+prec+`"></td>
    <td><button class="button">X</button></td>
    `;
    TOTAL();
    //document.getElementById("total_prod").insertRow(-1).innerHTML = '<td>1</td><td>2</td><td>3</td><td><button class="button">X</button></td>';
    //document.getElementById("total_prod").insertRow(-1).innerHTML = '<td>'+nom+'</td><td>'+pre+'</td><td>'+cant+'</td><td><button class="button">X</button></td>';
}


function recalcular(cam_can){
		for (var i = 1; i <= cont; i++) {
			if (cam_can==`cantidad_pro_`+i) {
				var prec=document.getElementById('pre_pro_'+i).value;
				var n_cant=document.getElementById('cantidad_pro_'+i).value;
				var subt=prec*n_cant;
				//alert(subt);
				document.getElementById('subt_pro_'+i).value=subt;
				document.getElementById('lb_subt_pro_'+i).innerHTML=subt;
				TOTAL();
			}
		}
}

function TOTAL(){
	var tot=0;
	for (var i = 1; i <= cont; i++) {
		var sub=document.getElementById('subt_pro_'+i).value;
		tot=parseFloat(tot)+parseFloat(sub);
	}
	document.getElementById('total').value="";
	document.getElementById('total').value=tot;
}

function verificacion(){
    //alert('verificacion');
    //alert('hola '+code);
    $.ajax({
        type: "POST",
        url: "https://inventaapp.000webhostapp.com/acciones.php?ac=2&cod="+code,
        //url: "http://192.168.0.108/EMPRENDIMIENTO/servidor/acciones.php?ac=3&cod="+code,
        data:"cod="+code,
        success: function(result) {
            console.log(result);
            //alert('consola');
            $('#prod').html(result);
            //alert('html');
            cont++;
        //agregarFila();
            
            //document.getElementById("total_prod").innerHTML += '<td>1</td><td>2</td><td>3</td><td><button class="button">X</button></td>';
            //resultDiv.innerHTML = result;
        }
    });
}

function guardado(){
    //alert('hola '+code);
    var nom=document.getElementById('nom_pro').value;
    var pre=document.getElementById('val_pro').value;
    $.ajax({
        type: "POST",
        url: "https://inventaapp.000webhostapp.com/acciones.php?ac=1&cod="+code+"&nom="+nom+"&pre="+pre,
        //url: "http://192.168.0.108/EMPRENDIMIENTO/servidor/acciones.php?ac=3&cod="+code,
        data:"cod="+code,
        success: function(result) {
            console.log(result);
            alert('Guardado');
            $('#prod').html(result);
            //document.getElementById("total_prod").innerHTML += '<td>1</td><td>2</td><td>3</td><td><button class="button">X</button></td>';
            //resultDiv.innerHTML = result;
        }
    });
}