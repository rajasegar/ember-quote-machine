import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'canvas',
  classNames: ['large-canvas'],
  didInsertElement() {
    this.drawCanvas();
  },
  didUpdateAttrs() {

    this.drawCanvas();
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
  },

  drawCanvas() {


    let bg = this.get('bg');
    let fg = this.get('fg');
    let fontSize = this.get('fontSize');
    let font = this.get('font');
    let quote = this.get('quote');
    let lineHeight = Number(fontSize) + 40;

    let canvas = this.get('element');

    canvas.width = 1200;
    canvas.height = 1600;
    canvas.margin = "5px";
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = bg;
    ctx.fill();

    ctx.fillStyle = fg;
    ctx.strokeStyle = fg;
    ctx.lineWidth = 10;
    ctx.strokeRect(50, 50, 1100, 1500);
    // ctx.fillText('"',600,100);
    ctx.font = `${fontSize}px ${font}`;
    this.wrapText(ctx, quote, 600, 300, 1000, lineHeight);


  },

  drawRect(ctx, x, y, width, height, bg) {
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.fillStyle = bg;
    ctx.fill();
  }

  
});
