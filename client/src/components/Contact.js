import React from "react";
var EmojiConvertor = require('emoji-js');
var emoji = new EmojiConvertor();

// Flags that are not supported by the emoji-js library
emoji.addAliases({
    'ne' : '1f1f3-1f1f1'
  });

const Contact = () => {
    return (
        <div>
            <h1>{emoji.replace_colons(":doge:")}</h1>
        </div>
    );
};

export default Contact;

