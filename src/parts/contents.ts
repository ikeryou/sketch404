import { Func } from "../core/func";
import { MousePointer } from "../core/mousePointer";
import { MyDisplay } from "../core/myDisplay";
import { Rect } from "../libs/rect";
import { Pt } from "./pt";

// -----------------------------------------
//
// -----------------------------------------
export class Contents extends MyDisplay {

  private _line: number = 8
  private _item: Array<Pt> = []


  constructor(opt:any) {
    super(opt)

    const num = this._line * this._line
    const parent = document.querySelector('.l-pt') as HTMLElement
    for(let i = 0; i < num; i++) {
      const el = document.createElement('div')
      el.classList.add('item')
      parent.append(el)

      this._item.push(new Pt({
        el: el,
      }))
    }

    this._resize()
  }

  protected _update(): void {
    super._update();

    const mx = MousePointer.instance.x
    const my = MousePointer.instance.y

    this._item.forEach((item) => {
      const test = item.getHitPoint()
      const dist = Math.sqrt(Math.pow(mx - test.x, 2) + Math.pow(my - test.y, 2))
      if(item.showCnt <= 0 || item.showCnt >= 60) {
        item.isShow = (dist >= Math.max(item.rect.width * 0.75, item.rect.height * 0.75))
      }
    })
  }

  protected  _resize(): void {
    super._resize();

    const sw = Func.sw()
    const sh = Func.sh()
    this._item.forEach((item, i) => {
      const x = i % this._line
      const y = Math.floor(i / this._line)
      const size = new Rect(
        x * (sw / this._line),
        y * (sh / this._line),
        sw / this._line,
        sh / this._line,
      )
      item.setSize(size)
    })
  }
}