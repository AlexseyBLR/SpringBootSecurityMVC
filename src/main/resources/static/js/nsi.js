$('#nsi-table').on('click', 'tbody tr', function () {
    $(this).addClass('selected').siblings().removeClass('selected');
    $('.nsi-directory-page-buttons button').removeAttr('disabled');
});

var parseEntryRow = function () {
    var $nsiEntryRow = $('#nsi-table').find('.selected');
    $nsiEntryRow.find("[data-nsi]").each(function () {
        $(".view-nsi-entry-modal").find('[name=' + this.className + ']').val($(this).text());
    });
};

$(".create-cancel-nsi-entry-button").on('click', function () {
    $('.create-nsi-entry-modal input').each(function () {
        $(this).val('');
    });
    $('.create-nsi-entry-modal').modal('hide');
});

$('.view-nsi-modal-button').on('click', function () {
    parseEntryRow();
    $('.view-nsi-entry-modal .form-group input').attr('disabled', '');
    $('.invalid-data').removeClass('invalid-data');
    $('.view-nsi-entry-modal').modal('show');
});

$('.nsi-edit-entry-modal-button').on('click', function () {
    parseEntryRow();
    $('.view-nsi-entry-modal .form-group input').removeAttr('disabled');
    $('.nsi-entry-buttons').attr('hidden', '');
    $('.nsi-entry-edit-buttons').removeAttr('hidden');
    $('.invalid-data').removeClass('invalid-data');
    $('.view-nsi-entry-modal').modal('show');
});

$('.nsi-edit-entry-button').on('click', function () {
    $('.view-nsi-entry-modal .form-group input').removeAttr('disabled');
    $('.nsi-entry-buttons').attr('hidden', '');
    $('.nsi-entry-edit-buttons').removeAttr('hidden');
});

$(document).ready((function () {




    $('.view-nsi-entry-modal').find('[data-nsi]').each(function () {
        var input = $(this).attr('type');
        if (input == 'number') {
            $(this).change((function () {
                $('.view-nsi-entry-modal').find('#errorSelect').attr('hidden', 'true');
                $('.view-nsi-entry-modal').find('#errorSelect12').attr('hidden', 'true');
                $('.view-nsi-entry-modal').find('#errorSelect3Params').attr('hidden', 'true');
                $('.nsi-edit-save-button').removeAttr('disabled');
                var value = $(this).val();
                var min = $(this).attr('min');
                var max = $(this).attr('max');
                if (min == '0' && max == '1') {
                    if (value < 0 | value > 1) {
                        $('.view-nsi-entry-modal').find('#errorSelect').removeAttr('hidden');
                        $('.nsi-edit-save-button').attr('disabled', 'true');
                        return false;
                    }
                }
                if (min == '1' && max == '2') {
                    if (value < 1 | value > 2) {
                        $('.view-nsi-entry-modal').find('#errorSelect12').removeAttr('hidden');
                        $('.nsi-edit-save-button').attr('disabled', 'true');
                        return false;
                    }
                }
                if (min == '0' && max == '2') {
                    if (value < 0 | value > 2) {
                        $('.view-nsi-entry-modal').find('#errorSelect3Params').removeAttr('hidden');
                        $('.nsi-edit-save-button').attr('disabled', 'true');
                        return false;
                    }
                }
            }))
        }
    });
}));

$('.nsi-edit-save-button').on('click', function () {

    var $nsiEntry = {};

    $('.view-nsi-entry-modal').find('[data-nsi]').each(function () {
        $nsiEntry[$(this).attr('name')] = $(this).val();
    });




    $.ajax({
        contentType: 'application/json',
        dataType: "json",
        type: "POST",
        data: JSON.stringify($nsiEntry),
        url: window.location.href + "/edit",
        success: function () {
            window.location.replace('');
        },
        fail: function () {
            console.log('error');
            alert("Ошибка при обращении к серверу. Попробуйте позже.")
        }
    });

});

$('.nsi-edit-cancel-button').on('click', function () {
    parseEntryRow();
    $('.invalid-data').removeClass('invalid-data');
    $('.view-nsi-entry-modal .form-group input').attr('disabled', '');
    $('.nsi-entry-buttons').removeAttr('hidden');
    $('.nsi-entry-edit-buttons').attr('hidden', '');
});

$('.nsi-remove-entry-button').on('click', function () {
    $.ajax({
        contentType: 'application/json',
        type: "POST",
        data: $('.selected').find('.id').text(),
        url: window.location.href + "/remove",
        success: function () {
            window.location.replace('');
        },
        fail: function () {
            console.log('error');
        }
    });
});

$('.nsi-delete-entry-button').on('click', function () {
    var $nsiEntry = {};
    $('.view-nsi-entry-modal').find('[data-nsi]').each(function () {
        $nsiEntry[$(this).attr('name')] = $(this).val();
    });
    var deleteId = JSON.parse(JSON.stringify($nsiEntry)).id;
    $.ajax({
        contentType: 'application/json',
        type: "POST",
        data: deleteId,
        url: window.location.href + "/remove",
        success: function () {
            window.location.replace('');
        },
        fail: function () {
            console.log('error');
        }
    });
});