#jquery.xpander.js

@version 1.2.5  

The plugin can be passed an {object}, options; A JSON object containing configuration options to override defaults. Possible values are:


Param Type   | Name          | Description
:------------ | :------------- | :------------
bool | closeNested  | Used to collapse all nested .expand-content. Default: true.
bool | isButton  | Used to determine if everything in the expand-trigger link should be replace or not. Default: false.
string | collapseCopy  | Copy to replace .expand-trigger when .expand-content is expanded. Default: '-'
bool | expandAll  | Used to expand all .expand-content. Default: false.
string | expandCopy  | Copy to replace .expand-trigger when .expand-content is collapsed. Default: '+'
bool | expandFirst | Used to expand the first .expand-content. Default: false.
string | previewHeight  | Used to partially show cotents of .expand-content.
int | slideSpeed  | Speed of slide animation in milliseconds. Default: 300.
bool | switchCopy  | Whether to switch the copy for the trigger or not. Default: true.
Object[string, bool]] | gaqPush  |
|eventName | Google Analytics event name. Default: xpander.  
|push|Turns on/off event pushing. Default: false.



Copyright (c) 2012 Adam Leder  
Dual licensed under the MIT and GPL licenses.  
Uses the same license as jQuery, see:  
http://docs.jquery.com/License  