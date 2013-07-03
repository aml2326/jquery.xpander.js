/*global jQuery, _gaq, window */

/**
 * jQuery xpander Plugin
 *
 * Copyright (c) 2012 Adam Leder
 * Dual licensed under the MIT and GPL licenses.
 * Uses the same license as jQuery, see:
 * http://docs.jquery.com/License
 *
 * @version 1.2.5
 *
 * @param {object} options A JSON object containing configuration options to override defaults. Possible values are:
 *        {bool}   closeNested   Used to collapse all nested .expand-content. Default: true.
 *        {bool}   isButton      Used to determine if everything in the expand-trigger link should be replace or not. Default: false.
 *        {string} collapseCopy  Copy to replace .expand-trigger when .expand-content is expanded. Default: '-'
 *        {bool}   expandAll     Used to expand all .expand-content. Default: false.
 *        {string} expandCopy    Copy to replace .expand-trigger when .expand-content is collapsed. Default: '+'
 *        {bool}   expandFirst   Used to expand the first .expand-content. Default: false.
 *        {string} previewHeight Used to partially show cotents of .expand-content.
 *        {int}    slideSpeed    Speed of slide animation in milliseconds. Default: 300.
 *        {bool}   switchCopy    Whether to switch the copy for the trigger or not. Default: true.
 *        {object} gaqPush       Google Analytics tracking event object to be passed to _gaq.push. Contents:
 *                 {string} eventName     Google Analytics event name. Default: xpander.
 *                 {bool}   push          Turns on/off event pushing. Default: false.
 */
(function ($) {
  $.fn.extend({xpander: function (options) {

    var $expandContainers = $(this);
    var $expandTrigger = $expandContainers.find('.expand-trigger:first');

    // Show expand triggers if javascript is enabled
    $expandTrigger.show();

    // Find/Store all expand content buckets
    var $expandContent = $expandContainers.find('.expand-content:first');

    // Default values options
    var defaults = {
      expandFirst: false,
      expandAll: false,
      isButton: false,
      closeNested: true,
      previewHeight: 'auto',
      expandCopy: '+',
      collapseCopy: '-',
      switchCopy: true,
      slideSpeed: 300,
      gaqPush: {
        push: false,
        eventName: 'xpander'
      }
    };

    // Extened the default values with the user inputted ones
    options = $.extend(defaults, options);

    if (options.previewHeight !== 'auto') {
      // Set the expand trigger copy
      if (options.switchCopy) {
        if (options.isButton) {
          $expandTrigger.html(options.expandCopy);
        } else {
          $expandTrigger.find('span').html(options.expandCopy);
        }
      }

      // Add CSS properties to .expand-content to animate
      $expandContent.data('orgHeight', $expandContent.height()).css({
        height: options.previewHeight,
        overflow: 'hidden',
        display: 'block'
      });

    }

    //Check if a hash exists and expand it
    if (window.location.hash.length) {
      var hash = window.location.hash.substr(1);

      //Delay expanding the hash so xpander initiate
      var t = setTimeout(function () {

        //Store the hash ID
        var $targetExpander = $('#' + hash);

        //Check if the hash ID has a parent xpander
        if ($targetExpander.parents('.expand-content').length) {

          //Expand the parent then find the nexted hash and expand it
          $expandContainers.find($targetExpander).parents('.expand-content').parent().find('.expand-trigger:first').trigger('click').end()
              .find($targetExpander).not('.xpanded').find('.expand-trigger:first').trigger('click');

        } else {

          //Expand the container with the hash ID
          $targetExpander.not('.xpanded').find('.expand-trigger:first').trigger('click');

        }

      }, 1);

    }

    // Return the elements with xpander applied
    return this.each(function () {
      var $this = $(this);

      //$expandTrigger.not(':hidden')
      $this.find($expandTrigger).first().on('click', function () {
        // Store current clicked expand-trigger
        var $this = $(this);

        // Find/Store the closets expanded-content bucket
        // relative to the click expand-trigger
        var $parent = $this;
        var $expand;
        do {
          $parent = $parent.parent();
          $expand = $parent.find('.expand-content:first');
        } while (!$expand.length);

        var $expandContainer = $parent;

        $expandContainers.removeClass('xpanded');

        // Check if preview of expand content is set
        if (options.previewHeight !== 'auto') {
          // Store current height of $expand
          var $expandedHeight = String($expand.height() + 'px');

          // Slide up all expand-content buckets but the
          // closest bucket relative to the clicked expand-trigger
          $expandContent.not($expand).stop().animate({ height: options.previewHeight }, options.slideSpeed);
          if (options.switchCopy) {
            if (options.isButton) {
              $expandTrigger.html(options.expandCopy);
            } else {
              $expandTrigger.find('span').html(options.expandCopy);
            }
          }

          if (parseInt($expandedHeight, 10) !== parseInt(options.previewHeight, 10)) {

            //Slide Up
            $expand.stop().animate({ height: options.previewHeight }, options.slideSpeed);
            // Set expand copy
            if (options.switchCopy) {
              if (options.isButton) {
                $this.html(options.expandCopy);
              } else {
                $this.find('span').html(options.expandCopy);
              }
            }
            $expandContainers.removeClass('xpanded');

          } else {

            // Slide Down
            $expand.stop().animate({ height: $expand.data('orgHeight') }, options.slideSpeed, function () { $(this).css('height', 'auto'); });

            // Set collapse copy
            if (options.switchCopy) {
              if (options.isButton) {
                $this.html(options.collapseCopy);
              } else {
                $this.find('span').html(options.collapseCopy);
              }
            }
            $expandContainer.addClass('xpanded');
            // Send Google Analytics
            if (options.gaqPush.push === true) {
              _gaq.push(['_trackEvent', options.gaqPush.eventName, $expandContainer.data('gaq')]);
            }

          }

        } else {

          // Slide up all expand-content buckets but the
          // closest bucket relative to the clicked expand-trigger
          $expandContent.not($expand).slideUp(options.slideSpeed);

          // Reset all triggers to expand copy
          if (options.switchCopy) {
            if (options.isButton) {
              $expandTrigger.html(options.expandCopy);
            } else {
              $expandTrigger.find('span').html(options.expandCopy);
            }
          }

          // Toggle the visibility of the expand-content buckets
          $expand.slideToggle(options.slideSpeed, function () {
            // Store main expander container
            var $expander = $this.parent().parent();

            // If the expand content bucket is expanded change copy to close
            // Else reset to read more
            if ($expand.is(':visible')) {
              if (options.switchCopy) {
                if (options.isButton) {
                  $this.html(options.collapseCopy);
                } else {
                  $this.find('span').html(options.collapseCopy);
                }
              }
              $expandContainer.addClass('xpanded');

              // Send Google Analytics
              if (options.gaqPush.push === true) {
                _gaq.push(['_trackEvent', options.gaqPush.eventName, $expandContainer.data('gaq')]);
              }
            } else {
              if (options.switchCopy) {
                if (options.isButton) {
                  $this.html(options.expandCopy);
                } else {
                  $this.find('span').html(options.expandCopy);
                }
              }
              $expandContainers.removeClass('xpanded');
            }
          });

        }

        // Close all children content containers
        if (options.closeNested === true) {
          $expandContainers.find('.xpanded .expand-trigger').trigger('click');
        }

        return false;
      });

      if (options.previewHeight === 'auto') {

        /**
         * Handles when
         * expandFirst = true
         * expandAll = true
         */
        if ($this.index() === 0 && options.expandFirst === true) {
          // Expand just the first one in the list
          $this.find($expandContent).first().slideDown(options.slideSpeed);
          if (options.switchCopy) {
            if (options.isButton) {
              $this.find($expandTrigger).first().html(options.collapseCopy);
            } else {
              $this.find($expandTrigger).first().find('span').html(options.collapseCopy);
            }
          }
          $this.addClass('xpanded');
        } else if (options.expandAll === true) {
          // Do nothing to expand all
          if (options.switchCopy) {
            $this.find($expandTrigger).html(options.collapseCopy);
            if (options.isButton) {
              $this.find($expandTrigger).html(options.collapseCopy);
            } else {
              $this.find($expandTrigger).find('span').html(options.collapseCopy);
            }
          }
          $this.addClass('xpanded');

        } else {
          // Ensure all but the first one is collapse
          // when expandFirst is set to true
          $this.find($expandContent).hide().end();
          if (options.switchCopy) {
            if (options.isButton) {
              $this.find($expandTrigger).html(options.expandCopy);
            } else {
              $this.find($expandTrigger).find('span').html(options.expandCopy);
            }
          }
          $this.removeClass('xpanded');

        }
      }


    });
  }});
}(jQuery));
