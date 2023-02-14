module.exports.hashCode = (s) => {
    var h = 0, l = s.length, i = 0;
    if ( l > 0 )
        while (i < l)
        h = (h << 5) - h + s.charCodeAt(i++) | 0;
    return h;
};

module.exports.getTimestamp = ()=> {
    const date = new Date();
    const dateValues = [
        date.getFullYear(),
        date.getMonth()+1,
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
        date.getMilliseconds(),
    ];
    return dateValues.join('');
}

module.exports.getUserBase64Hash = (req) => {
    const device = req.headers['user-agent'];
    const cookies = req.headers['cookie'];
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const buff = Buffer.from(JSON.stringify({device, cookies, ip}));
    return buff.toString('base64');
}