define(function () {
    return function render(json_data) {
        string = "";
        string = string + "<p>";
        for j in json_data:
            string = string + j + "<br/>";
        string = string + "</p>";
        return string
    };    
});