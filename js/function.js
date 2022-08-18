$(function(){

	/* sistema de pesquisa*/

	var currentValue = 0;//valor padrão da barra zero
	var isDrag = false;
	var preco_maximo = 99000;
	var preco_atual = 0;

	$('.pointer-barra').mousedown(function(){
		isDrag = true;
		
	})

	$(document).mouseup(function(){
		isDrag = false;
		enableTextSelection();
	})

	$('.barra-preco').mousemove(function(e){
		if(isDrag){

			disableTextSelection();
			var elBase = $(this);
			var mouseX = e.pageX - elBase.offset().left;
			/*Pegar a posição do mouse*/
			if(mouseX < 0)
				mouseX = 0;
			if(mouseX > elBase.width())
				mouseX = elBase.width();

			$('.pointer-barra').css('left',(mouseX-15)+'px');
			currentValue = (mouseX / elBase.width()) * 100;
			$('.barra-preco-fill').css('width',currentValue+'%');
			
			preco_atual = (currentValue/100) * preco_maximo;
			preco_atual = formatarPreco(preco_atual);
			$('.preco_pesquisa').html('R$' + preco_atual);
			
		}
	})

	/*Função para formatar o preço na barra de pesquisa*/
	function formatarPreco(preco_atual){
		preco_atual = preco_atual.toFixed(2);
		/*toFixed - função nativa do jquery para ter apenas 2 casas decimais*/
		preco_arr = preco_atual.split('.');
		/*split - funcao nativa do jquery que funciona como delimitador do (.ponto)ex.R$10'.'000 divido o numero pelo ponto*/

		var novo_preco = formatarTotal(preco_arr);
		return novo_preco;
	}

	function formatarTotal(preco_arr){
		if(preco_arr[0] < 1000){
			return preco_arr[0]+','+preco_arr[1];
		}else if(preco_arr[0] < 10000){
			return preco_arr[0][0]+'.'+preco_arr[0].substr(1,preco_arr[0].length)+','+preco_arr[1];
		}else{
			return preco_arr[0][0]+preco_arr[0][1]+'.'+preco_arr[0].substr(2,preco_arr[0].length)+','+preco_arr[1];
		}
	}


	/*Função para desabilitar o mouse após soltá-lo fora da caixa de progresso em todos os navegadores*/
	function disableTextSelection(){
		$("body").css("-webkit-user-select","none");
		$("body").css("-moz-user-select","none");
		$("body").css("-ms-user-select","none");
		$("body").css("-o-user-select","none");
		$("body").css("-user-select","none");
	}

	/*Função para Habilitar o mouse após soltá-lo fora da caixa de progresso em todos os navegadores*/
	function enableTextSelection(){
		$("body").css("-webkit-user-select","auto");
		$("body").css("-moz-user-select","auto");
		$("body").css("-ms-user-select","auto");
		$("body").css("-o-user-select","auto");
		$("body").css("-user-select","auto");
	}

	/* Anotações page veiculo1

	class="mini-img-wraper" = style="background-color: rgb(210,210,210);
	

	*/

	/*GALERIA DE IMAGENS DA PÁGINA DE VENDA INDIVIDUAL DE VEICULO1*/

	var imgShow = 3;//mostrar apenas 3 imagens
	var maxIndex = Math.ceil($('.mini-img-wraper').length/3) -1; //contador maximo
	//O Math.ceil()arredonda um número PARA CIMA para o inteiro mais próximo e retorna o resultado.
	var curIndex = 0;//valor atual do contador

	initSlider();//chamando a função para iniciar os minis slides
	navigateSlider();//chamando a função para navegar os minis slides
	clickSlider();// chamando a função para trocar a foto destaque

	function initSlider(){
		var amt = $('.mini-img-wraper').length*33.3;//qtd de img q vai aparecer an div
		var elScroll = $('.nav-galeria-wraper'); //elemento que se usa pra fazer o scroll da div*/
		var elSingle = $('.mini-img-wraper'); // é o mini-img
		elScroll.css('width',amt+'%')// alterando o tamanho da largura do Scroll
		elSingle.css('width',33.3*(100/amt)+'%')// alterando o tamanho da largura da mini
	}

	// Setas da galeria
	function navigateSlider(){

		// SETA DA DIREITA
		$('.arrow-right-nav').click(function(){
			if(curIndex < maxIndex){
				curIndex++;
				var elOff = $('.mini-img-wraper').eq(curIndex*3).offset().left - $('.nav-galeria-wraper').offset().left;
				$('.nav-galeria').animate({'scrollLeft':elOff+'px'});//animação de mudança de slides em três
			}else{
				//console.log("Chegamos até o Final!");
			}
		});

		// SETA DA ESQUERDA
		$('.arrow-left-nav').click(function(){
			if(curIndex > 0){
				curIndex--;
				var elOff = $('.mini-img-wraper').eq(curIndex*3).offset().left - $('.nav-galeria-wraper').offset().left;
				$('.nav-galeria').animate({'scrollLeft':elOff+'px'});//animação de mudança de slides em três
			}else{
				//console.log("Chegamos até o Ínicio!");
			}
		});

		}

		/*Trocar a foto destaque */

		function clickSlider(){
			$('.mini-img-wraper').click(function(){
				$('.mini-img-wraper').css('background-color','transparent');//não clicados fiquem transparent
				$(this).css('background-color', 'rgb(210,210,210)');// clicado fique cinza
				var img = $(this).children().css('background-image');
				$('.foto-destaque').css('background-image',img);
			})
			$('.mini-img-wraper').eq(4).click();
			// ao clicar pela 1ª vez vai carregar a foto destaque pela sequencia eq() 

		}


	

		/*MENU RESPONSIVO*/

		$('.mobile').click(function(){
			$(this).find('ul').slideToggle();
		})

		/*SISTEMA DE NAVEGAÇÃO INFINITO DOS DEPOIMENTOS NO INDEX.HTML*/
		var amtDepoimento = $('.depoimento-single p').length;
		var curIndex = 0;

		iniciarDepoimentos();
		navegarDepoimentos();

        function iniciarDepoimentos(){
        	$('.depoimento-single p').hide();//suma todos os depoimentos
        	$('.depoimento-single p').eq(0).show();//apareça o 1º depoimento
        }

		function navegarDepoimentos(){
			$('[next]').click(function(){
				curIndex++;
				if(curIndex >= amtDepoimento)
					curIndex=0;
				$('.depoimento-single p').hide();//suma todos os depoimentos
        		$('.depoimento-single p').eq(curIndex).show();//apareça o 1º depoimento
			})

			$('[prev]').click(function(){
				curIndex--;
				if(curIndex < 0)
					curIndex = amtDepoimento-1;
				$('.depoimento-single p').hide();//suma todos os depoimentos
        		$('.depoimento-single p').eq(curIndex).show();//apareça o 1º depoimento
			})
		}
		








	
});//begin