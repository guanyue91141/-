// 发送消息到 background.js
function sendMessageToBackground(message) {
    chrome.runtime.sendMessage(message, function(response) {
        console.log("收到来自background.js的回复:", response);
    });
}
// 获取所有 iframe 元素
var iframes = document.getElementsByTagName('iframe');

// 遍历所有 iframe 元素
for (var i = 0; i < iframes.length; i++) {
    var iframe = iframes[i];

    // 检查是否成功获取到 iframe 元素
    if (iframe) {
        // 如果 iframe 已经加载完成，立即处理
        if (iframe.contentDocument.readyState === 'complete') {
            handleIframeContent(iframe);
        } else {
            // 否则，添加加载完成后的事件监听器
            iframe.onload = function() {
                handleIframeContent(this);
            };
        }
    } else {
        console.log("无法获取 iframe 元素。");
    }
}

// 处理 iframe 内容
function handleIframeContent(iframe) {
    // 获取 iframe 内部文档对象
    var iframeDocument = iframe.contentWindow.document;

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

            // 发送数据到 background.js
            sendMessageToBackground({
                questionText: questionTextElement.textContent,
                questionTypeName: questionTypeNameElement.textContent,
                options: Array.from(options).map(option => option.textContent)
            });
        } else {
            console.log("未找到问题文本、问题类型名称元素或选项列表。Iframe ID: ", iframe.id);
        }
    } else {
        console.log("无法获取 iframe 内部文档对象。Iframe ID: ", iframe.id);
    }
}