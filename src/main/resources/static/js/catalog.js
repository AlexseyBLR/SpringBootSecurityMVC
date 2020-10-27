$('#nsi-table').on('click', 'tbody tr', function () {
    $(this).addClass('selected').siblings().removeClass('selected');
    $('.nsi-directory-page-buttons button').removeAttr('disabled');
});




$('.view-catalog-modal-button').on('click', function () {
    var $nsiEntryRow = $('#nsi-table').find('.selected');
    var busInitId = '';
    var busOffId = '';
    var busProdCardId = '';
    $nsiEntryRow.find('[class=busInitId').each(function () {
        busInitId = $(this).text();
    });
    $nsiEntryRow.find('[class=busOffId').each(function () {
        busOffId = $(this).text();
    });
    $nsiEntryRow.find('[class=busProdCardId').each(function () {
        busProdCardId = $(this).text();
    });
    console.log(busInitId);
    console.log(busOffId);
    console.log(busProdCardId);

    $.ajax({
        contentType: 'application/json',
        dataType: "json",
        type: "POST",
        data: JSON.stringify({bIId : busInitId}),
        url: window.location.href + "/getBusinessInitiative",
        success: function (data) {
            JSON.stringify(data);
            console.log(JSON.stringify(data))
            console.log(JSON.stringify(data.productDeveloperDept))
            $("#busInit").find('[name=ADDINFO]').text(JSON.stringify(data.businessInitiative.addInfo).replace(/\"/g,''));
            $("#busInit").find('[name=BUSINESSAPPIMPLDATE]').text(JSON.stringify(data.businessInitiative.businessAppimplDate).replace(/\"/g,''));
            $("#busInit").find('[name=BIDATE]').text(JSON.stringify(data.businessInitiative.biDate).replace(/\"/g,''));
            $("#busInit").find('[name=IMPLPLANNINGDATE]').text(JSON.stringify(data.businessInitiative.implPlanningDate).replace(/\"/g,''));
            $("#busInit").find('[name=JOBTYPES]').text(JSON.stringify(data.businessInitiative.jobTypes).replace(/\"/g,''));
            $("#busInit").find('[name=MARKETANALISYS]').text(JSON.stringify(data.businessInitiative.marketAnalisys).replace(/\"/g,''));
            $("#busInit").find('[name=MARKETANALISYSFILE]').text(JSON.stringify(data.businessInitiative.marketAnalisysFile).replace(/\"/g,''));
            $("#busInit").find('[name=BINAME]').text(JSON.stringify(data.businessInitiative.biName).replace(/\"/g,''));
            $("#busInit").find('[name=NONREALIZEEFFECTS]').text(JSON.stringify(data.businessInitiative.nonRealizeEffects).replace(/\"/g,''));
            $("#busInit").find('[name=PLANGRAPHICDATE]').text(JSON.stringify(data.businessInitiative.planGraphicDate).replace(/\"/g,''));
            $("#busInit").find('[name=BIPOINT]').text(JSON.stringify(data.businessInitiative.biPoint).replace(/\"/g,''));
            $("#busInit").find('[name=PRODUCT]').text(JSON.stringify(data.businessInitiative.product).replace(/\"/g,''));
            $("#busInit").find('[name=PRODUCTDEVELOPERDEPT]').text(JSON.stringify(data.businessInitiative.productDeveloperDept).replace(/\"/g,''));
            $("#busInit").find('[name=PRODUCTDEVELOPERFIO]').text(JSON.stringify(data.businessInitiative.productDeveloperFio).replace(/\"/g,''));
            $("#busInit").find('[name=REALIZEPROSPECTIVE]').text(JSON.stringify(data.businessInitiative.realizeProspective).replace(/\"/g,''));
            $("#busInit").find('[name=BISTATUS]').text(JSON.stringify(data.businessInitiative.biStatus).replace(/\"/g,''));
        }
    });

    $.ajax({
        contentType: 'application/json',
        dataType: "json",
        type: "POST",
        data: JSON.stringify({bOId : busOffId}),
        url: window.location.href + "/getBusinessOffer",
        success: function (data) {
            JSON.stringify(data);
            console.log(JSON.stringify(data))
            $("#busOffer").find('[name=BONAME]').text(JSON.stringify(data.businessOffer.boName).replace(/\"/g,''));
            $("#busOffer").find('[name=BOSTATUS]').text(JSON.stringify(data.businessOffer.boStatus).replace(/\"/g,''));
            $("#busOffer").find('[name=PRODUCTMANAGER]').text(JSON.stringify(data.businessOffer.productManeger).replace(/\"/g,''));
            $("#busOffer").find('[name=PRODUCTMANAGERPOSITION]').text(JSON.stringify(data.businessOffer.productManegerPosition).replace(/\"/g,''));
            $("#busOffer").find('[name=PRODUCTMANAGERPHONE]').text(JSON.stringify(data.businessOffer.productManegerPhone).replace(/\"/g,''));
            $("#busOffer").find('[name=PRODUCTMANAGERDEPT]').text(JSON.stringify(data.businessOffer.productManegerDept).replace(/\"/g,''));
            $("#busOffer").find('[name=PRODUCTMANAGERSUPERVISOR]').text(JSON.stringify(data.businessOffer.productManegerSupervisor).replace(/\"/g,''));
            $("#busOffer").find('[name=PRODUCTMANAGERSUPERVISORPOS]').text(JSON.stringify(data.businessOffer.productManegerSupervisorPos).replace(/\"/g,''));
            $("#busOffer").find('[name=PRODUCTMANAGERSUPERVISORPHONE]').text(JSON.stringify(data.businessOffer.productManegerSupervisorPhone).replace(/\"/g,''));
        }
    });

    $.ajax({
        contentType: 'application/json',
        dataType: "json",
        type: "POST",
        data: JSON.stringify({bPCId : busProdCardId}),
        url: window.location.href + "/getBPCard",
        success: function (data) {
            JSON.stringify(data);
            console.log(JSON.stringify(data))
            $("#bpCard").find('[name=PRODUCTNAME]').text(JSON.stringify(data.bpCard.productName).replace(/\"/g,''));
            $("#bpCard").find('[name=PRODUCTSTATUS]').text(JSON.stringify(data.bpCard.productStatus).replace(/\"/g,''));
            $("#bpCard").find('[name=COMMONPRODUCTCHARS]').text(JSON.stringify(data.bpCard.commonProductChars).replace(/\"/g,''));
            $("#bpCard").find('[name=CHANGESTATUSDATE]').text(JSON.stringify(data.bpCard.changeStatusDate).replace(/\"/g,''));
            $("#bpCard").find('[name=PRODUCTADVANTAGES]').text(JSON.stringify(data.bpCard.productAdvantages).replace(/\"/g,''));
            $("#bpCard").find('[name=MAINPRODUCTPARAMS]').text(JSON.stringify(data.bpCard.mainProductParams).replace(/\"/g,''));
            $("#bpCard").find('[name=DOCSFORMS]').text(JSON.stringify(data.bpCard.docsForms).replace(/\"/g,''));
            $("#bpCard").find('[name=LPABANKS]').text(JSON.stringify(data.bpCard.lbaBanks).replace(/\"/g,''));
            $("#bpCard").find('[name=ADDMATERIALS]').text(JSON.stringify(data.bpCard.addMaterials).replace(/\"/g,''));
        }
    });


    $('.invalid-data').removeClass('invalid-data');
    $('.view-catalog-entry-modal').modal('show');

});


$(".view-cancel-catalog-entry-button").on('click', function () {
    $('.view-catalog-entry-modal').modal('hide');
});

$(document).ready(function(){
    $("#liA1").mouseover(function(){
        $("#liA1").css("color", "white");
    });
    $("#liA2").mouseover(function(){
        $("#liA2").css("color", "white");
    });
    $("#liA3").mouseover(function(){
        $("#liA3").css("color", "white");
    });
});

