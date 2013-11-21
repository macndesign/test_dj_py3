/**
 * Created by mario on 11/20/13.
 */
$(document).ready(function () {
    var REST_APP = {};
    REST_APP.list_render = $('#notes');
    REST_APP.log = $('#log');

    REST_APP.templates = {
        alert_success: '<div class="alert alert-success">Success!</div>',
        alert_error: '<div class="alert alert-danger">{{ status }}</div>',
        list_users: '<tr><td>{{ id }}</td><td>{{ url }}</td><td>{{ username }}</td><td>{{ email }}</td></tr>'
    };

    REST_APP.get_list = function () {

        // request ajax
        REST_APP.request = $.ajax({
            url: '/users/?format=json',
            type: 'GET'
        });

        // request done
        REST_APP.request.done(function(data){
            REST_APP.list_render.html('');
            REST_APP.log.html(REST_APP.templates.alert_success);
            var objects = data.results;
            for (var i = 0; i < objects.length; i ++) {
                REST_APP.list_render.append(
                    Mustache.render(REST_APP.templates.list_users, objects[i])
                );
            }
        });

        // request fail
        REST_APP.request.fail(function(jqXHR, textStatus){
            err = {status: textStatus};
            REST_APP.log.html(Mustache.render(REST_APP.templates.alert_error, err));
        });
    };

    $('#load').click(function(e){
        e.preventDefault();
        REST_APP.get_list();
    });
});
