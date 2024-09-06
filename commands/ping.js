module.exports = (client) => {
    client.on('message', async message => {
        if (message.body === '.ping') {
            const buttons = [
                { buttonId: 'ping', buttonText: { displayText: 'PING' }, type: 1 }
            ];
            
            const responseTime = Date.now() - message.timestamp * 1000;
            const buttonMessage = {
                text: 'TEST PING ✅',
                buttons: buttons,
                headerType: 1
            };
            
            await client.sendMessage(message.from, buttonMessage);
            
            client.on('message', async response => {
                if (response.body === 'PING') {
                    await client.sendMessage(response.from, `Pong : ${responseTime}ms`);
                }
            });
        }
    });
};