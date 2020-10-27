$('#roles-table').on('click', 'tbody tr', function() {
    $(this).addClass('selected').siblings().removeClass('selected');
    $('.roles-page-buttons button').removeAttr('disabled');
});

$('.edit-role-modal-button').on('click', function () {
    $('#input-role-name-edit').val($('.selected .table-role-name').text());
    $('#input-role-description-edit').val($('.selected .table-role-description').text());
    $('.edit-role-modal').modal('show');
});

$('.edit-role-modal').on('hidden.bs.modal', function () {
    $('#input-role-name-edit').empty();
    $('#input-role-description-edit').empty();
});

$('.remove-role-modal-button').on('click', function () {
    $('<form id="remove-role-form" action="remove-role" method="POST">' +
        '<input type="hidden" name="roleName" value="' + $('.selected .table-role-name').text() + '">' +
        '</form>').appendTo('body');
    $('#remove-role-form').submit();
});