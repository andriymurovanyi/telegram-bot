function getMessages(){
    let rows = "";
    $.ajax({
        url: "/messages",
        type: "GET",
        contentType: "application/json",
    }).done(function (messages) {
        console.log("Success");
        $("#main_table td").parent().remove();
        $.each(messages, function (index, message) {
            // добавляем полученные элементы в таблицу
            rows += makeRow(message);
        });
        $("#main_table").append(rows);
    }).fail(function () {
        console.log("Fail");
    });
}


$(function () {
    $("#text_form").submit(function (e) {
        let $form = $(this);
        $.ajax({
            type: "POST",
            url: "/",
            data: $form.serialize()
        }).done(function () {
            console.log("Success");
        }).fail(function () {
            console.log("fail");
        });

        let message = `<tr>
                                    <td>Bot</td>
                                    <td>${new Date().toLocaleString()}</td>
                                    <td>${$("#t").val()}</td>
                               </tr>`;
        $("#main_table").append(message);
        $('#text_form')[0].reset();
        e.preventDefault();
    });
});

$("#search").on('input', function (e) {
    searchByName(this.value);
});

function searchByName(value) {
    $.ajax({
        url: "/messages/" + value,
        type: "GET",
        contentType: "application/json",
    }).done(function (messages) {
        console.log("Success");
        let rows = "";
        if (messages.length > 0){
            $("#main_table td").parent().remove();
            $.each(messages, function (index, message) {
                // добавляем полученные элементы в таблицу
                rows += makeRow(message);
            });
            $("#main_table").append(rows);
        }
        else {
            getMessages();
        }
    }).fail(function () {
        console.log("Fail");
    });
}

function makeRow(message) {
    return `<tr>
                        <td>${message.from.username}</td>
                        <td>${message.date.toLocaleString()}</td>
                        <td>${message.text}</td>
                   </tr>`;
}

getMessages();