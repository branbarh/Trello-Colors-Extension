# Trello-Colors-Extension

*Trello changed a few things on their end which broke the old version of the extension; the extension has been updated to reflect these changes. Reinstall the extension and it should work again! I've also fixed the live preview when editing labels, as Trello also updated this.*

## To install this extension, follow these steps:

1. Download this repository by clicking on the green button with a down arrow labeled "Code", then selecting "Download ZIP".
2. Unzip the downloaded file.
3. Head on over to "chrome://extensions".
4. Enable Developer Mode by toggling the switch in the top right corner of the extensions page.
5. Click the "LOAD UNPACKED" button in the top left corner of the extensions page, and select the unzipped folder that you downloaded in step 1.
6. Head on over to Trello, and you're all set!

## To update this extension from an older version, follow these steps:

1. Head on over to "chrome://extensions".
2. Find the older version of Trello Colors, and click on the "Remove" button to delete it.
3. Install the new version, following the steps outlined above.

## How to use the extension:

1. Head on over to [Trello](https://www.trello.com).
2. Open up the label editor on one of your cards to create a new label (but don't create it yet!). You can also edit a pre-existing label.
3. Name the label starting with the hex color, followed by a colon, followed by the label name. For a red label named "Example", you would enter the following: **#FF0000:Example**
4. The color you select under "Select a color" does not matter—it will only appear as this color for users without the extension installed.
5. Click on "Save".
6. You're all set! The label should automatically change to the color that you set. It will appear as that color for all users with the extension, even after a page reload!

## A quick note:

To anyone not using the extension, the name will show up exactly how you entered it (with the color code in the title), and it will not have the custom color. Unfortunately, there's really no other way to store the color, aside from in the label's name, so there's not much I can do about it. Have them install the extension too, if you really need to.

## Features (v2):

The latest version of this extension comes with some new features!

1. When editing a label, the color on the label will update in real time, so you don't have to guess what the label will look like when inputting a color.
2. Darker colored labels will now show up with white text, making them much more readable. 3 character hex codes are also supported with this feature.
3. Using a custom color will get rid of the dot found next to labels, and the label will show up as its true color, rather than a pastel color.
4. All labels are now colored properly, no matter where you look!
5. The extension now uses Manifest v3, rather than the previous v2.
