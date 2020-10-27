$('#users-table').on('click', 'tbody tr', function() {
    $(this).addClass('selected').siblings().removeClass('selected');
    $('.users-page-buttons button').removeAttr('disabled');
});

//LOADING USERS FROM LDAP
// $(".ldap-users-modal-button").click(function () {
//     $.ajax({
//         dataType: "json",
//         url: "ldap-users",
//         success: function (users) {
//             $('.ldap-users-modal-left-list').empty();
//             $('.ldap-users-modal-right-list').empty();
//             $('.ldap-users-load input').empty();
//             users.forEach(function (user) {
//                 var $li = $('<li>');
//                 $li.addClass('list-group-item');
//
//                 var $span = $('<span>');
//                 $span.attr('name', 'name');
//                 $span.text(user['name']);
//
//                 var $input = $('<input>');
//                 $input.attr('value', user['description']);
//                 $input.attr('type', 'hidden');
//                 $input.attr('name', 'description');
//
//                 $span.appendTo($li);
//                 $input.appendTo($li);
//                 $li.click(function () {
//                     $(this).toggleClass('pressed');
//                 });
//                 $('.ldap-users-modal-left-list').append($li);
//             });
//         }
//     });
// });
//
// $(".ldap-users-modal-move-to-right-button").click(function () {
//     $(".ldap-users-modal-left-list .pressed").detach().appendTo(".ldap-users-modal-right-list");
//     $(".ldap-users-modal-right-list .pressed").removeClass('pressed');
// });
//
// $(".ldap-users-modal-move-to-left-button").click(function () {
//     $(".ldap-users-modal-right-list .pressed").detach().appendTo(".ldap-users-modal-left-list");
//     $(".ldap-users-modal-left-list .pressed").removeClass('pressed');
// });
//
//
// $(".ldap-users-modal-move-all-to-right-button").click(function () {
//     $(".ldap-users-modal-left-list .list-group-item").detach().appendTo(".ldap-users-modal-right-list");
//     $(".ldap-users-modal-left-list .pressed").removeClass('pressed');
//     $(".ldap-users-modal-right-list .pressed").removeClass('pressed');
// });
//
// $(".ldap-users-modal-move-all-to-left-button").click(function () {
//     $(".ldap-users-modal-right-list .list-group-item").detach().appendTo(".ldap-users-modal-left-list");
//     $(".ldap-users-modal-left-list .pressed").removeClass('pressed');
//     $(".ldap-users-modal-right-list .pressed").removeClass('pressed');
// });
//
// var $ldapUsersToUpdate = [];
//
// $(".ldap-users-submit-button").click(function () {
//
//     var $ldapUsers = [];
//     var $ldapUser;
//     $('.ldap-users-modal-right-list .list-group-item').each(function () {
//         $ldapUser = {};
//         $ldapUser.name = $(this).find("span[name='name']").text();
//         $ldapUser.description = $(this).find("input[name='description']").val();
//         $ldapUsers.push($ldapUser);
//     });
//
//     var $ldapUsersJSON = JSON.stringify($ldapUsers);
//     var $updateIfExist = $('.ldap-users-modal-bottom input[name="updateIfExist"]').is(':checked');
//     $.ajax({
//         contentType: 'application/json',
//         dataType: "json",
//         data: $ldapUsersJSON,
//         type: "POST",
//         url: "load-ldap-users?updateIfExist=" + $updateIfExist,
//         beforeSend: function () {
//             $('.ldap-users-submit-button').attr('disabled', true);
//             $('.ldap-users-submit-button-text').hide();
//             $('.ldap-users-spinner').show();
//         },
//         success: function (ldapUsersToUpdate) {
//             $('.ldap-users-modal').modal('hide');
//             $ldapUsersToUpdate = ldapUsersToUpdate;
//             $offerLdapUserToUpdate();
//         }
//     });
// });
//
// var $offerLdapUserToUpdate = function () {
//     if (Array.isArray($ldapUsersToUpdate) && $ldapUsersToUpdate.length > 0) {
//         var $user = $ldapUsersToUpdate.shift();
//         $('.load-ldap-user-modal-username').text($user['name']);
//         $('.load-ldap-user-modal-description').text($user['description']);
//         $('.load-ldap-user-modal').modal('show');
//     } else {
//         window.location.replace("");
//     }
// };
//
// $('.load-ldap-user-modal-yes-button').click(function () {
//     var $user = {};
//     $user.name = $('.load-ldap-user-modal-username').text();
//     $user.description = $('.load-ldap-user-modal-description').text();
//
//     var $userJSON = JSON.stringify($user);
//
//     $.ajax({
//         contentType: 'application/json',
//         dataType: "json",
//         data: $userJSON,
//         type: "POST",
//         url: "update-ldap-user",
//         success: function () {
//             $offerLdapUserToUpdate();
//         },
//         error: function () {
//             $offerLdapUserToUpdate();
//         }
//     });
// });
//
// $('.load-ldap-user-modal-no-button').click(function () {
//     $offerLdapUserToUpdate();
// });
//
// $('.load-ldap-user-modal-cancel-button').click(function () {
//     $ldapUsersToUpdate = [];
//     window.location.replace("");
// });
//
// $('.load-ldap-user-close-cross').click(function () {
//     $offerLdapUserToUpdate();
// });

////////////////////////////////////////////

function fillNotUserRoles(username) {
    return $.ajax({
        dataType: "json",
        url: "roles-user-is-not?userName=" + username,
        success: function (groups) {
            groups.forEach(function (group) {
                var $li = $('<li>');
                $li.addClass('list-group-item');
                $li.text(group['name']);
                $li.click(function () {
                    $(this).toggleClass('pressed');
                });
                $('.user-role-modal-left-list').append($li);
            });
        }
    });
}

function fillUserRoles(username) {
    return $.ajax({
        dataType: "json",
        url: "user-roles?userName=" + username,
        success: function (groups) {
            groups.forEach(function (group) {
                var $li = $('<li>');
                $li.addClass('list-group-item');
                $li.text(group['name']);
                $li.click(function () {
                    $(this).toggleClass('pressed');
                });
                $('.user-role-modal-right-list').append($li);
            });
        }
    });
}

$('.user-role-modal-button').on('click', function () {

    $('.user-role-modal-left-list').empty();
    $('.user-role-modal-right-list').empty();

    var $username = $('#users-table').find('.selected .table-user-name').text();

    $.when(fillNotUserRoles($username), fillUserRoles($username)).then(function () {
        $('.user-role-modal-username').val($username);
        $('.user-role-modal').modal('show')
    });

});

///////////////



$(".user-role-modal-move-to-right-button").click(function () {
    $(".user-role-modal-left-list .pressed").detach().appendTo(".user-role-modal-right-list");
    $(".user-role-modal-right-list .pressed").removeClass('pressed');
});

$(".user-role-modal-move-to-left-button").click(function () {
    $(".user-role-modal-right-list .pressed").detach().appendTo(".user-role-modal-left-list");
    $(".user-role-modal-left-list .pressed").removeClass('pressed');
});


$(".user-role-modal-move-all-to-right-button").click(function () {
    $(".user-role-modal-left-list .list-group-item").detach().appendTo(".user-role-modal-right-list");
    $(".user-role-modal-left-list .pressed").removeClass('pressed');
    $(".user-role-modal-right-list .pressed").removeClass('pressed');
});

$(".user-role-modal-move-all-to-left-button").click(function () {
    $(".user-role-modal-right-list .list-group-item").detach().appendTo(".user-role-modal-left-list");
    $(".user-role-modal-left-list .pressed").removeClass('pressed');
    $(".user-role-modal-right-list .pressed").removeClass('pressed');
});

$('.user-role-submit-button').on('click', function () {
    var $userRoles = [];
    var $username = $('.user-role-modal-username').val();

    $('.user-role-modal-right-list .list-group-item').each(function () {
            $userRoles.push($(this).text());
        }
    );

    $.ajax({
        contentType: 'application/json',
        dataType: "json",
        type: "POST",
        data: JSON.stringify($userRoles),
        url: "update-user-roles?userName=" + $username,
        success: function () {
            window.location.replace('');
        },
        fail: function () {
            console.log('error');
        }
    });
});

