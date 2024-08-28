# Trello-Colors-Extension

*Version 3.0 is out! Check the changelog at the bottom of the README for more information. Reinstall the extension to recieve the new updates!*

## To install this extension, follow these steps:

1. Download this repository by clicking on the green button with a down arrow labeled "Code", then selecting "Download ZIP".
2. Unzip the downloaded file.
3. Head on over to "chrome://extensions".
4. Enable Developer Mode by toggling the switch in the top right corner of the extensions page.
5. Click the "LOAD UNPACKED" button in the top left corner of the extensions page, and select the unzipped folder that you downloaded in step 1.
6. Head on over to Trello (or reload the page), and you're all set!

### OR

1. Install [TamperMonkey](https://www.tampermonkey.net).
2. Install the extension as a userscript from [GreasyFork](https://greasyfork.org/en/scripts/505507-trello-colors).
3. Head on over to Trello (or reload the page), and you're all set!

## To update this extension from an older version, follow these steps:

1. Head on over to "chrome://extensions".
2. Find the older version of Trello Colors, and click on the "Remove" button to delete it.
3. Install the new version, following the steps outlined above.

### OR

1. Update the userscript from [GreasyFork](https://greasyfork.org/en/scripts/505507-trello-colors).

## How to use the extension:

1. Head on over to [Trello](https://www.trello.com).
2. Open up the label editor on one of your cards to create a new label (but don't create it yet!). You can also edit a pre-existing label.
3. Name the label starting with the hex color, followed by a colon, followed by the label name. For a red label named "Example", you would enter the following: **#FF0000:Example**
4. The color you select under "Select a color" does not matter—it will only appear as this color for users without the extension installed.
5. Click on "Save".
6. You're all set! The label should automatically change to the color that you set. It will appear as that color for all users with the extension, even after a page reload!

## A quick note:

To anyone not using the extension, the name will show up exactly how you entered it (with the color code in the title), and it will not have the custom color. Unfortunately, there's really no other way to store the color, aside from in the label's name, so there's not much I can do about it. Have them install the extension too, if you really need to.

## Features (v3):

The latest version of this extension comes with several new features!

1. The extension can now be installed as a userscript (since v2.4)! Install it on [GreasyFork](https://greasyfork.org/en/scripts/505507-trello-colors).
3. Labels with custom colors will now also show customized tooltips on hover, displaying the custom color (in hex) and the correct title.
2. Hovering a label with a custom color will now change its color, in line with the default label colors.
4. Labels with custom colors now animate properly when showing or hiding the text on the front of cards.
5. Colorblind cues now display properly on labels with custom colors.
6. The white/black text color threshold has been adjusted to prefer white, making label text more readable in most cases.

## Features (v2):

Trello Colors v2 introduced quite a few new features:

1. When editing a label, the color on the label will update in real time, so you don't have to guess what the label will look like when inputting a color.
2. Darker colored labels will now show up with white text, making them much more readable. 3 character hex codes are also supported with this feature.
3. Using a custom color will get rid of the dot found next to labels, and the label will show up as its true color, rather than a pastel color.
4. All labels are now colored properly, no matter where you look!
5. The extension now uses Manifest v3, rather than the previous v2.
