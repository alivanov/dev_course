 
//npm i -g typescript
//tsc index.ts --outDir ./dist

interface Rect {
  readonly id: string
  color?: string
  size: {
    width: number
    height: number
  }
}

const rect1: Rect = {
  id: '1234',
  size: {
    width: 20,
    height: 30
  },
  color: '#ccc'
}

const rect2: Rect = {
  id: '12345',
  size: {
    width: 10,
    height: 5
  }
}

rect2.color = 'black'
// rect2.id = '3232'

const rect3 = {} as Rect
const rect4 = <Rect>{}

// =====================

interface RectWithArea extends Rect {
  getArea: () => number
}

const rect5: RectWithArea = {
  id: '123',
  size: {
    width: 20,
    height: 20
  },
  getArea(): number {
    return this.size.width * this.size.height
  }
}

// ==================

interface IClock {
  time: Date
  setTime(date: Date): void
}

class Clock implements IClock {
  time: Date = new Date()

  setTime(date: Date): void {
    this.time = date;
  }
}

function printClock(clock: IClock): void {
  console.log(clock.time);
}

const clock = new Clock();
printClock(clock);
clock.setTime(new Date('December 17, 1995 03:24:00'));
printClock(clock);

// =================

interface Styles {
  [key: string]: string
}

const css: Styles = {
  border: '1px solid black',
  marginTop: '2px',
  borderRadius: '5px'
}
