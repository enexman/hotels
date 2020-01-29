import 'jquery-ui-dist/jquery-ui.min';

class Range {
  constructor(options) {
    this.nodeId = options.nodeId;
    this.amountId = options.amountId;
    this.min = options.min;
    this.max = options.max;
    this.values = options.values;

    this._startSlider();
  }

  _startSlider() {
    $(() => {
      const { amountId } = this;
      $(this.nodeId).slider({
        range: true,
        min: this.min,
        max: this.max,
        values: this.values,
        slide(event, ui) {
          $(amountId).val(`${ui.values[0]}₽ - ${ui.values[1]}₽`);
        },
      });

      $(this.amountId).val(`${$(this.nodeId).slider('values', 0)
      }₽ - ${$(this.nodeId).slider('values', 1)}₽`);
    });
  }
}

new Range(
  {
    nodeId: '#slider-range',
    amountId: '#amount',
    min: 0,
    max: 16500,
    values: [5000, 10000],
  },
);
