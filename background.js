// 监听来自 content.js 的消息
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    console.log("接收到来自 content.js 的消息:", message);

    // 在回复中包含收到的消息
    var responseMessage = {
        receivedMessage: message,
        reply: "收到你的消息啦！"
    };

    // 发送回复消息
    sendResponse(responseMessage);
});
