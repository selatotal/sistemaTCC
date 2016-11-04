$(function() {

    const $form = $('#form-js');
    const itemID = $form.find('#id').val();
    const restURL = './professor/';
    const listaURL = './professor/';

	/*******************************************************************
	 * Configuração de máscaras de campo
	 *******************************************************************/
	//Mascara para campo telefone
	var maskTelefone = function (val) {
		return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
	},
	options = {onKeyPress: function(val, e, field, options) {
			field.mask(maskTelefone.apply({}, arguments), options);
		}
	};
	
	$('#telefone').mask(maskTelefone, options);
	
	/*****************************************************************
	 * Função para verificação de erros no preenchimento dos campos
	 *****************************************************************/
	
    function verifyErrors(err) {
        const errors = err || {};
        $.each(['nome', 'email', 'telefone'], function(key, value) {
            const message = errors[value] || false;
            const element = $form.find('#' + value);
            if (message) {
                element.parent().addClass('has-error').find('.help-block').html(message);
            } else {
                element.parent().removeClass('has-error').find('.help-block').html('');
            }
        });
    }

    $form.on('submit', function(event) {
        event.preventDefault();

        const values = {
            nome: $form.find('#nome').val(),
            telefone: $form.find('#telefone').val(),
            email: $form.find('#email').val(),
            sexo: $form.find('input[name=sexo]:checked').val()
        };

        const url = restURL + (itemID ? itemID + '/' : '' );
        const method = itemID ? 'put' : 'post';

        const request = $.ajax({
                url: url,
                type: method,
                dataType: 'json',
                data: values
            });

        // Caiu aqui deu certo
        request.done(function(data) {
            verifyErrors();
            swal({
                title: "OK",
                text: "Alterado!",
                type: "success",
                showCancelButton: false,
                confirmButtonText: "Voltar para Lista",
                closeOnConfirm: false },
                function() {
                    location.href = listaURL;
                });
        });

        // Caiu aqui, tem erro
        request.fail(function(err) {
            const errors = err.responseJSON;
            verifyErrors(errors);
        });

    });

});
