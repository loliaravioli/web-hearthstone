export class DialogueView {
    constructor(isPlayer) {
        this.dialogueText = '...';
        this.audioFileStr = '';
        this.audio = new Audio('../media/sounds/voiceovers/jaina_tutorialbattle.mp3');
        this.isPlayer = isPlayer;
        this.divID = this.isPlayer ? 'playerBubble' : 'opponentBubble';
        this.update();
    }

    doDialogue() {
        this.openBubble();

        if (this.audioFileStr != '') {
            this.audio.play();
        } else {
            setTimeout(() => { this.closeBubble(); }, 2 * 1000);
        }
    }

    setDialogueAudio(fileStr) {
        this.audioFileStr = fileStr;
        this.audio = new Audio(this.audioFileStr);
        this.update();
    }

    setDialogueText(text) {
        this.dialogueText = text;
        this.update();
    }

    update() {
        this.audio.addEventListener('ended', () => { this.closeBubble(); });
    }

    openBubble() {
        $(`#${this.divID}`)
            .html(this.dialogueText)
            .css({ 'visibility': 'visible' })
            .addClass('openMenuAnim');
    }

    closeBubble() {
        $(`#${this.divID}`)
            .addClass('easeOutAnim')
            .removeClass('openMenuAnim');

        setTimeout(() => {
            $(`#${this.divID}`)
                .css({ 'visibility': 'hidden' })
                .removeClass('easeOutAnim');
        }, 0.25 * 1000);
    }
}