#jquery.xpander.js

@version 1.2.5

View the [demo](http://www.adamleder.com/sandbox/jquery.xpander/).

##Example
### Basic

####HTML

	<ul>
		<li class="sample-expander">
			<h2><a href="#" class="expand-trigger">Sample Headline 1<span>+</span></a></h2>
			<div class="expand-content">
				<p>Pellentesque habitant morbi tristique</p>
			</div>
		</li>
		<li class="sample-expander">
			<h2><a href="#" class="expand-trigger">Sample Headline 2<span>+</span></a></h2>
			<div class="expand-content">
				<p>Pellentesque habitant morbi tristique</p>
			</div>
		</li>
	</ul>

#### jQuery

	$('.sample-expander').xpander({
		expandCopy: "Read More &raquo;",
		collapseCopy: "Close &raquo;",
		gaqPush: { 
			eventName: 'Question/Answers'
		}
	});
	
###Nested xpanders

####HTML

	<ul>
		<li class="level1">
			<h2><a href="#" class="expand-trigger">Sample Headline 1<span>+</span></a></h2>
			<div class="expand-content">
				<p>Pellentesque habitant morbi tristique</p>
			</div>
		</li>
		<li class="level1">
			<h2><a href="#" class="expand-trigger">Sample Headline 2<span>+</span></a></h2>
			<div class="expand-content">
				<p>Pellentesque habitant morbi tristique</p>
				<ul>
					<li class="level2">
						<h2><a href="#" class="expand-trigger">Sample Headline 2.1<span>+</span></a></h2>
						<div class="expand-content">
							<p>Pellentesque habitant morbi tristique</p>
						</div>
					</li>
					<li class="level2">
						<h2><a href="#" class="expand-trigger">Sample Headline 2.2<span>+</span></a></h2>
						<div class="expand-content">
							<p>Pellentesque habitant morbi tristique</p>
						</div>
					</li>
				</ul>
			</div>
		</li>
	</ul>

#### jQuery

	$('.level1').xpander({
		slideSpeed: 500,
		gaqPush: { 
			push: false,
			eventName: 'Department'
		}
	});

	$('.level2').xpander({
		expandCopy: "Read More &raquo;",
		collapseCopy: "Close &raquo;",
		gaqPush: { 
			push: false,
			eventName: 'Team Member Bio'
		}
	});

##Options
The plugin can be passed an {object}, options; A JSON object containing configuration options to override defaults. Possible values are:


Param Type   | Name          | Defaults | Description
:------------ | :------------- | :------------| :------------
bool | closeNested | true | Used to collapse all nested .expand-content.
bool | isButton | false | Used to determine if everything in the expand-trigger link should be replace or not.
string | collapseCopy | - | Copy to replace .expand-trigger when .expand-content is expanded.
bool | expandAll | false  | Used to expand all .expand-content.
string | expandCopy | + | Copy to replace .expand-trigger when .expand-content is collapsed.
bool | expandFirst | false | Used to expand the first .expand-content.
string | previewHeight |  | Used to partially show cotents of .expand-content.
int | slideSpeed | 300 | Speed of slide animation in milliseconds.
bool | switchCopy | true | Whether to switch the copy for the trigger or not.
Object[string, bool]] | gaqPush  |
  |eventName | xpander | Google Analytics event name.  
  |push | false |Turns on/off event pushing.



Copyright (c) 2012 Adam Leder  
Dual licensed under the MIT and GPL licenses.  
Uses the same license as jQuery, see:  
http://docs.jquery.com/License  