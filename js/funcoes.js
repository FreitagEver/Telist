$(function() {
  $('#menu-navegacao').find('a').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});
$(function(){

	var ops = "S"; 
	var indice = 0;
	var dbbanco = localStorage.getItem("Contatos");
	dbbanco = JSON.parse(dbbanco); 
	if(dbbanco == null) 
		dbbanco = [];

function Adicionar(){
	if($("#txtNome").val() ==''|$("#txtSobrenome").val()==''|$("#txtTelefone").val()==''|$("#txtCelular").val()==''){
		alert('Preencha todos os campos!');
	}else{	
	var r=confirm("Salvar contato!");
	var Contato = JSON.stringify({
			Nome     : $("#txtNome").val(),
			Sobrenome     : $("#txtSobrenome").val(),
			Telefone : $("#txtTelefone").val(),
			Celular    : $("#txtCelular").val(),
			Endereco    : $("#txtEndereco").val(),
			Email    : $("#txtEmail").val()
		});
		if (r==true){
			dbbanco.push(Contato);
			localStorage.setItem("Contatos", JSON.stringify(dbbanco));
			document.getElementById("btnSalvar").innerHTML=x; 
			return true;
		}else{
			alert('Cadastro Cancelado!');
		}
	}
}

function Editar(){
		dbbanco[indice] = JSON.stringify({
				Nome     : $("#txtNome").val(),
				Sobrenome     : $("#txtSobrenome").val(),
				Telefone : $("#txtTelefone").val(),
				Celular    : $("#txtCelular").val(),
				Endereco    : $("#txtEndereco").val(),
				Email    : $("#txtEmail").val()
			});
		var r=confirm("Editar contato!");
		if(r==true){
			localStorage.setItem("Contatos", JSON.stringify(dbbanco));
			document.getElementById("btnEditar").innerHTML=x;
			return true;
		}else{
			alert("Edição Cancelada!");
		}
}

function Excluir(indice){
	var r=confirm("Excluir contato!");	
	if (r==true){
		dbbanco.splice(indice,1);
		localStorage.setItem("Contatos", JSON.stringify(dbbanco));
		document.getElementById("btnExcluir").innerHTML=x;
		return true;
	}else{
		alert("Exclusão Cancelada!");
	}
}

function Listar(){
	$("table").html("");
	$("table").html(
		"<thead>"+		
		"	<th>Ações</th>"+
		"	<th>Nome</th>"+
		"	<th>Celular</th>"+
		"	<th>Detalhes</th>"+
		"</thead>"+
		"<tbody>"+
		"</tbody>"
		);

	 for(var i in dbbanco){ 
	 var Contato = JSON.parse(dbbanco[i]); 
	 $("table tbody").append("<tr>");
	 $("table tbody").append("<td><img src='image/edit.png' data-indice='"+i+"' onclick='Editar' class='btnEditar'/><img src='image/delete.png' data-indice='"+i+"' onclick='Excluir' class='btnExcluir'/></td>"); 
	 $("table tbody").append("<td>"+Contato.Nome+"</td>");  
	 $("table tbody").append("<td>"+Contato.Celular+"</td>"); 
	 $("table tbody").append("<td><img src='image/more.png' data-indice='"+i+"' onclick='detalhe' class='btndetalhe' data-toggle='modal' data-target='#myModal'/></td>");
	 $("table tbody").append("</tr>");
	 }
}

Listar();

function GetCliente(propriedade, valor){
		var Contato = null;
        for (var cart in dbbanco) {
            var i = JSON.parse(dbbanco[cart]);
            if (i[propriedade] == valor)
            	Contato = i;
        }
        return Contato;
	}

$("#frmCadastro").bind("submit",function(){	
	if(ops == "S") {
			return Adicionar();
		}else{		
			return Editar();
		}		
});

$(".btnEditar").bind("click", function(){
		ops = "E";
		indice = $(this).attr("data-indice");
		var Contato = JSON.parse(dbbanco[indice]);
		$("#txtNome").val(Contato.Nome);
		$("#txtSobrenome").val(Contato.Sobrenome);
		$("#txtTelefone").val(Contato.Telefone);
		$("#txtCelular").val(Contato.Celular);
		$("#txtEndereco").val(Contato.Endereco);
		$("#txtEmail").val(Contato.Email);
		$("#txtNome").focus();
	});

$(".btnExcluir").bind("click", function(){
		indice = $(this).attr("data-indice");
		Excluir(indice);
		Listar();
});

$(".btndetalhe").bind("click", function(){
	$("valor").html("");
	indice = $(this).attr("data-indice");
	var Contato = JSON.parse(dbbanco[indice]);
	$("valor").append("<h4>"+"Nome: "+Contato.Nome+"</h4>");
	$("valor").append("<h4>"+"Sobrenome: "+Contato.Sobrenome+"</h4>");
	$("valor").append("<h4>"+"Telefone Fixo: "+Contato.Telefone+"</h4>");
	$("valor").append("<h4>"+"Celular: "+Contato.Celular+"</h4>");
	$("valor").append("<h4>"+"Endereço: "+Contato.Endereco+"</h4>");
	$("valor").append("<h4>"+"E-mail: "+Contato.Email+"</h4>");
	
});
});
  
function masTelefone(txtTelefone){
	  if(txtTelefone.value.length == 1)
		  txtTelefone.value = '(' + txtTelefone.value;
	   if(txtTelefone.value.length == 3)
		   txtTelefone.value = txtTelefone.value + ') ';
	   if(txtTelefone.value.length == 9)
		 txtTelefone.value = txtTelefone.value + '-';  
}

function masCelular(txtCelular){
	   if(txtCelular.value.length == 1)
		  txtCelular.value = '(' + txtCelular.value; 
	   if(txtCelular.value.length == 3)
		   txtCelular.value = txtCelular.value + ') '; 
	   if(txtCelular.value.length == 9)
		 txtCelular.value = txtCelular.value + '-';  
}
