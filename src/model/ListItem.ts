export interface Item {
  id: string;
  item: string;
  checked: boolean;
}

// class는 직접적으로 인터페이스에서 정의한 속성들을 가지지 않고, 대신 이 속성들에 대한
// getter/setter를 제공해서 인터페이스 요구사항 충족시킬 수 있음!
// --> Typescript에서 이러한 getter/setter도 속성으로 간주함
export default class ListItem implements Item {
  constructor(
    private _id: string = "",
    private _item: string = "",
    private _checked: boolean = false
  ) {}

  // id (getter/setter)
  get id(): string {
    return this._id;
  }
  set id(id: string) {
    this._id = id;
  }

  // item (getter/setter)
  get item(): string {
    return this._item;
  }
  set item(item: string) {
    this._item = item;
  }

  // checked (getter/setter)
  get checked(): boolean {
    return this._checked;
  }
  set checked(checked: boolean) {
    this._checked = checked;
  }
}
