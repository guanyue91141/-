// 获取 iframe 元素
var iframeElement = document.querySelector('.layui-layer.layui-layer-iframe');

// 检查是否成功获取到 iframe 元素
if (iframeElement) {
    // 延时等待加载
    setTimeout(function() {
        // 获取 iframe 的 contentWindow
        var iframeWindow = iframeElement.contentWindow;

        // 检查是否成功获取到 contentWindow
        if (iframeWindow) {
            // 获取 iframe 内部文档对象
            var iframeDocument = iframeWindow.document;

            // 检查是否成功获取到文档对象
            if (iframeDocument) {
                // 在 iframe 内部文档中查找元素
                var questionTextElement = iframeDocument.querySelector("#QuestionText");
                var questionTypeNameElement = iframeDocument.querySelector("#QuestionTypeName");

                // 获取选项元素的父元素
                var optionsList = iframeDocument.querySelector("#Options");

                // 检查是否成功获取到元素
                if (questionTextElement && questionTypeNameElement && optionsList) {
                    // 打印元素的值
                    console.log("问题文本：", questionTextElement.textContent);
                    console.log("问题类型名称：", questionTypeNameElement.textContent);

                    // 获取所有选项
                    var options = optionsList.querySelectorAll("input[type=checkbox] + div span");

                    // 遍历每个选项并打印值
                    options.forEach(function(option) {
                        console.log("选项文本：", option.textContent);
                    });
                } else {
                    console.log("未找到问题文本、问题类型名称元素或选项列表。");
                }
            } else {
                console.log("无法获取 iframe 内部文档对象。");
            }
        } else {
            console.log("无法获取 iframe 的 contentWindow。");
        }
    }, 5000); // 这里设置延时时间，单位为毫秒
} else {
    console.log("找不到具有类名 'layui-layer layui-layer-iframe' 的 iframe 元素。");
}
