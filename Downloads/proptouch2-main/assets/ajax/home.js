$(document).ready(function () {

    var refID = 1;


    countAllUsers();


});

function countAllUsers() {

    refID = 1;

    var actionUrl = $('#countAllUsersListURL').attr('value');

    // getCustomerBranchNameList
    $.ajax({
        type: "POST",
        url: actionUrl,
        data: "ref=" + refID,
        beforeSend: function () {

        },
        error: function () {

        },
        success: function (resp) {

            // clients
            var activeClients = parseFloat(((resp.ActiveClients / resp.TotalClients) * 100).toFixed(0));
            var inactiveClients = parseFloat(((resp.InactiveClients / resp.TotalClients) * 100).toFixed(0));
            if (isNaN(activeClients)) activeClients = 0;
            if (isNaN(inactiveClients)) inactiveClients = 0;
            $('.total-clients').html(resp.TotalClients);
            $('.active-clients').html(activeClients + "%");
            $('.inactive-clients').html(inactiveClients + "%");
            $('#active-clients-percentage').css("width", activeClients + "%");


            // teams
            var activeTeams = parseFloat(((resp.ActiveTeams / resp.TotalTeams) * 100).toFixed(0));
            var inactiveTeams = parseFloat(((resp.InactiveTeams / resp.TotalTeams) * 100).toFixed(0));
            if (isNaN(activeTeams)) activeTeams = 0;
            if (isNaN(inactiveTeams)) inactiveTeams = 0;
            $('.total-teams').html(resp.TotalTeams);
            $('.active-teams').html(activeTeams + "%");
            $('.inactive-teams').html(inactiveTeams + "%");
            $('#active-teams-percentage').css("width", activeTeams + "%");

             // agents
             var activeAgents = parseFloat(((resp.ActiveAgents / resp.TotalAgents) * 100).toFixed(0));
             var inactiveAgents = parseFloat(((resp.InactiveAgents / resp.TotalAgents) * 100).toFixed(0));
             if (isNaN(activeAgents)) activeAgents = 0;
             if (isNaN(inactiveAgents)) inactiveAgents = 0;
             $('.total-agents').html(resp.TotalAgents);
             $('.active-agents').html(activeAgents + "%");
             $('.inactive-agents').html(inactiveAgents + "%");
             $('#active-agents-percentage').css("width", activeAgents + "%");

        }
    });

}
