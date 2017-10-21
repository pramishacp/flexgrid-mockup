/**
 * Image Select control for MCE popup
 */
;(function ($) {
    $(document).on('click', '.mce-awb-panel .awb_attach_image_btn', function(e) {
        e.preventDefault();
        var $this = $(this);
        var $input = $this.prev('.awb_attach_image').children('input');
        var $label = $this.next('.awb_attach_image_label');
        var frame = $this.data('wp-frame');

        // if selected - remove
        if ($this.hasClass('awb_attach_image_btn_selected')) {
            $input.val('').trigger('change');
            $label.html('');
            $this.val($this.attr('data-select-title'));
            $this.removeClass('awb_attach_image_btn_selected');
            return;
        }

        // If the media frame already exists, reopen it.
        if (frame) {
            frame.open();
            return;
        }

        if (!wp.media) {
            console.error('Can\'t access wp.media object.');
            return;
        }

        // Create a new media frame
        frame = wp.media({
            title: 'Select or Upload Image',
            button: {
                text: 'Use this image'
            },
            multiple: false,
            library: {
                type : 'image'
            }
        });
        $this.data('wp-frame', frame);


        // When an image is selected in the media frame...
        frame.on('select', function() {
            // Get media attachment details from the frame state
            var attachment = frame.state().get('selection').first().toJSON();

            if (attachment) {
                $input.val(attachment.id).trigger('change');
                if (attachment.sizes && attachment.sizes.medium) {
                    $label.html('<img src="' + attachment.sizes.medium.url + '" alt="">');
                } else {
                    $label.html('<img src="' + attachment.url + '" alt="">');
                }
                $this.val($this.attr('data-remove-title'));
                $this.addClass('awb_attach_image_btn_selected');
            }
        });

        // Finally, open the modal on click
        frame.open();
    });
})(jQuery);