bcms-js
=======

BCMS (Baidu Cloud Message Service) JS SDK

```
npm install bcms-js
```

usage:
```
var bcms = require('bcms-js')(__your_message_queue_name__);
// info about queue_name see http://developer.baidu.com/wiki/index.php?title=docs/cplat/mq/api

bcms.mail(from, to, subject, content, function(err, body){
  if (!err && !body.error_code){
    // ...
  }
});
```
