# React Modal Dialog

This project is in progress. Feel free to read the code to use on your own. Documentation is coming; or if you want to contribute to the documentation, that is great as well.

Most of the core code is done, but the website and documentation are still in progress. Will update to version 1.0.0 once this API is stable.

## Design Considerations

When you have two dialogs, the ESC key will only close the top level one (there is an event manager implemented like a stack)

Dialogs bounce in with a spring animation (not a standard ease-in, ease-out). It is on the roadmap to make this part more extensible.

Dialogs that are too long will scroll in their viewport

The portal which opens the dialog, the background that the dialogs are loaded on, and the dialog itself are separate components. This way, you can hide a dialog and show a spinner on the dark portion, then show a success dialog. And neither the background or the dialog know about the portal.

## For Your Own Implementation

For now, I recommend you check out the source code of this project, as it is quite simple, to really get an understanding of how this dialog works. I've spent a lot of time trying many paradigms (you can read about all that [here](#todo)), and I've settled on this one for good reasons.

The hardest part about dialogs is their architecture, not the UI or specific implementation. Feel free to swap out your own ModalDialog class into my existing ModalContainer, or disassemble ModalContainer into your own portal and background class.

To get the esc key to only close the top dialog when there are two modal dialogs, I employed the use of an event controller. However, you may find this to be peculiar or you may want to attach your dialogs to your own event controller. If that's true, you may want to branch this project to edit the code in `componentDidMount` and `componentWillUnmount` of `ModalPortal`.

## Building

To build the website, navigate to `/site` and run `npm start`

## Usage

...

## Styles (CSS and Images)

For your convenience, I have included some stylesheets in the package that you can either load in with something like webpack, or use as a reference for your own style implementation. I have also included the images necessary for the close button.
