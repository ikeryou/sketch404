import { MyDisplay } from "../core/myDisplay";
import { Tween } from "../core/tween";
import { Point } from "../libs/point";
import { Rect } from "../libs/rect";

// -----------------------------------------
//
// -----------------------------------------
export class Pt extends MyDisplay {

  private _rect: Rect = new Rect()
  public get rect(): Rect { return this._rect }

  private _isShow: boolean = true
  public get isShow(): boolean { return this._isShow }
  public set isShow(value: boolean) {
    if(!this._isShow) this.showCnt = 0
    this._isShow = value
  }

  private _op: number = 1

  private _showCnt: number = 0
  public get showCnt(): number { return this._showCnt }
  public set showCnt(value: number) {
    this._showCnt = value
  }

  constructor(opt:any) {
    super(opt)

    this.useGPU(this.el)
  }

  public setSize(rect: Rect):void {
    this._rect.copy(rect)

    Tween.instance.set(this.el, {
      width: rect.width,
      height: rect.height,
      x: rect.x,
      y: rect.y,
      // 'backdrop-filter': 'blur(' + Util.randomInt(1, 10) + 'px)',
      'backdrop-filter': 'blur(' + (20) + 'px)',
    })
  }

  public getHitPoint(): Point {
    return new Point(this._rect.x + this._rect.width * 0.5, this._rect.y + this._rect.height * 0.5)
  }

  protected _update():void {
    super._update();

    if(!this._isShow) {
      this._showCnt++
    }

    const tg = (this._isShow) ? 1 : 0
    this._op += (tg - this._op) * 0.15
    if(this._op > 0.01 || this._op <= 0.99) {
      Tween.instance.set(this.el, {
        opacity: this._op,
      })
    }
  }
}