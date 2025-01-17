import Base from './Base';
const SVGtoPDF = require('svg-to-pdfkit');

class Svg extends Base {
  get name() {
    return 'Svg';
  }
  clone() {
    const clone = super.clone();
    clone.image = this.image;
    return clone;
  }

  getAbsoluteLayout() {
    const parent = this.parent;
    const parentLayout =
      parent && parent.getAbsoluteLayout
        ? parent.getAbsoluteLayout()
        : { left: 0, top: 0 };

    return {
      left: this.left + parentLayout.left,
      top: this.top + parentLayout.top,
      height: this.height,
      width: this.width,
    };
  }
  async render() {
    this.root.instance.save();
    const layout = this.getAbsoluteLayout();
    SVGtoPDF(
      this.root.instance,
      this.props.content,
      layout.left,
      layout.top,
      this.props.svgToPdfOptions,
    );
    if (this.props.debug) this.debug();
    this.root.instance.restore();
  }
}

export default Svg;
