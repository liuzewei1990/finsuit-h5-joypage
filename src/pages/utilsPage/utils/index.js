export default {
    ajax_method(url, method = "post") {
        return new Promise(resolve => {
            var xhr = new XMLHttpRequest();
            xhr.open(method, url);
            xhr.send('name=fox&age=18');
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    resolve(JSON.parse(xhr.responseText));
                }
            };
        })

    }
}
