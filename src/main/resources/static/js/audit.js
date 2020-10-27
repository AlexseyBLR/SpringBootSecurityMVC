$('#audit-table').on('click', 'tbody tr', function () {
    $(this).addClass('selected').siblings().removeClass('selected');
    $('.audit-directory-page-buttons button').removeAttr('disabled');
});

var parseEntryRow = function () {
    var $auditEntryRow = $('#audit-table').find('.selected');
    $auditEntryRow.find("[data-audit]").each(function () {
        $(".view-audit-entry-modal").find('[name=' + this.className + ']').val($(this).text());
    });
};

$(".create-cancel-audit-entry-button").on('click', function () {
    $('.create-audit-entry-modal input').each(function () {
        $(this).val('');
    });
    $('.create-audit-entry-modal').modal('hide');
});

$('.view-audit-modal-button').on('click', function () {
    parseEntryRow();
    $('.view-audit-entry-modal .form-group input').attr('disabled', '');
    $('.invalid-data').removeClass('invalid-data');
    $('.view-audit-entry-modal').modal('show');
});

$('.audit-edit-entry-modal-button').on('click', function () {
    parseEntryRow();
    $('.view-audit-entry-modal .form-group input').removeAttr('disabled');
    $('.audit-entry-buttons').attr('hidden', '');
    $('.audit-entry-edit-buttons').removeAttr('hidden');
    $('.invalid-data').removeClass('invalid-data');
    $('.view-audit-entry-modal').modal('show');
});

$('.audit-edit-entry-button').on('click', function () {
    $('.view-audit-entry-modal .form-group input').removeAttr('disabled');
    $('.audit-entry-buttons').attr('hidden', '');
    $('.audit-entry-edit-buttons').removeAttr('hidden');
});

$(document).ready((function () {




    $('.view-audit-entry-modal').find('[data-audit]').each(function () {
        var input = $(this).attr('type');
        if (input == 'number') {
            $(this).change((function () {
                $('.view-audit-entry-modal').find('#errorSelect').attr('hidden', 'true');
                $('.view-audit-entry-modal').find('#errorSelect12').attr('hidden', 'true');
                $('.view-audit-entry-modal').find('#errorSelect3Params').attr('hidden', 'true');
                $('.audit-edit-save-button').removeAttr('disabled');
                var value = $(this).val();
                var min = $(this).attr('min');
                var max = $(this).attr('max');
                if (min == '0' && max == '1') {
                    if (value < 0 | value > 1) {
                        $('.view-audit-entry-modal').find('#errorSelect').removeAttr('hidden');
                        $('.audit-edit-save-button').attr('disabled', 'true');
                        return false;
                    }
                }
                if (min == '1' && max == '2') {
                    if (value < 1 | value > 2) {
                        $('.view-audit-entry-modal').find('#errorSelect12').removeAttr('hidden');
                        $('.audit-edit-save-button').attr('disabled', 'true');
                        return false;
                    }
                }
                if (min == '0' && max == '2') {
                    if (value < 0 | value > 2) {
                        $('.view-audit-entry-modal').find('#errorSelect3Params').removeAttr('hidden');
                        $('.audit-edit-save-button').attr('disabled', 'true');
                        return false;
                    }
                }
            }))
        }
    });
}));

$('.audit-edit-save-button').on('click', function () {

    var $auditEntry = {};

    $('.view-audit-entry-modal').find('[data-audit]').each(function () {
        $auditEntry[$(this).attr('name')] = $(this).val();
    });




    $.ajax({
        contentType: 'application/json',
        dataType: "json",
        type: "POST",
        data: JSON.stringify($auditEntry),
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

$('.audit-edit-cancel-button').on('click', function () {
    parseEntryRow();
    $('.invalid-data').removeClass('invalid-data');
    $('.view-audit-entry-modal .form-group input').attr('disabled', '');
    $('.audit-entry-buttons').removeAttr('hidden');
    $('.audit-entry-edit-buttons').attr('hidden', '');
});

$('.audit-remove-entry-button').on('click', function () {
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

$('.audit-delete-entry-button').on('click', function () {
    var $auditEntry = {};
    $('.view-audit-entry-modal').find('[data-audit]').each(function () {
        $auditEntry[$(this).attr('name')] = $(this).val();
    });
    var deleteId = JSON.parse(JSON.stringify($auditEntry)).id;
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