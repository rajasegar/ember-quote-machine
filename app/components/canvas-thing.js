import Ember from 'ember';
const WIDTH = 120;
const HEIGHT = 160;
const MAX_WIDTH = 100;
const FONT_SIZE = 15;
const LINE_HEIGHT = FONT_SIZE + 5;
const SCALE = 2;

const CANVAS_WIDTH = WIDTH * SCALE;
const CANVAS_HEIGHT = HEIGHT * SCALE;
const MAX_WIDTHX = MAX_WIDTH * SCALE;
const LINE_HEIGHTX = LINE_HEIGHT * SCALE;
const FONT_SIZEX = FONT_SIZE * SCALE;
const TOP = CANVAS_HEIGHT / 2 - HEIGHT;
const LEFT = CANVAS_WIDTH / 2;


export default Ember.Component.extend({
  tagName: 'canvas',
  didInsertElement() {
    this.draw();
  },
  didUpdateAttrs() {
    this.draw();
  },
  draw() {
    let canvas = this.get('element');
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
    canvas.margin = "5px";
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.rect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.fillStyle = this.get('bg');
    ctx.fill();
    ctx.fillStyle = this.get('fg');
    ctx.font = `${FONT_SIZEX}px ${this.get('font')}`;
    this.wrapText(ctx, this.get('quote'), LEFT, TOP, MAX_WIDTHX, LINE_HEIGHTX);
  },
  wrapText(context, text, x, y, maxWidth, lineHeight) {
    var words = text.split(' ');
    var line = '';

    for (var n = 0; n < words.length; n++) {
      var testLine = line + words[n] + ' ';
      var metrics = context.measureText(testLine);
      var testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        context.textAlign = "center";
        context.fillText(line, x, y);
        line = words[n] + ' ';
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    context.fillText(line, x, y);
  }
});
