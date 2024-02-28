import ListItem from "./ListItem";

interface List {
  list: ListItem[];
  load(): void;
  save(): void;
  clearList(): void;
  addItem(itemObj: ListItem): void;
  removeItem(id: string): void;
}

// singleton(싱글톤) -> there will be only one instance
// --> 클래스의 인스턴스가 오직 하나만 생성되어 전역에서 접근 가능하도록 하는 패턴
// --> 전역변수를 사용하지 않고 하나의 인스턴스만 생성하여 어디서든지 이 인스턴스에 접근하도록
export default class FullList implements List {
  // 유일한 하나의 인스턴스
  static instance: FullList = new FullList();
  // 생성자에다가 private 붙임으로써
  // 해당 클래스 외부에서 new 키워드를 사용하여 인스턴스 생성 불가능하게..
  // 싱글톤 패턴의 원칙
  private constructor(private _list: ListItem[] = []) {}

  get list(): ListItem[] {
    return this._list;
  }

  load(): void {
    // localstorage에서 데이터 불러오기
    const storedList: string | null = localStorage.getItem("myList");
    //type guard
    if (typeof storedList !== "string") return;

    //??
    const parsedList: { _id: string; _item: string; _checked: boolean }[] =
      JSON.parse(storedList);

    parsedList.forEach((itemObj) => {
      const newListItem = new ListItem(
        itemObj._id,
        itemObj._item,
        itemObj._checked
      );
      FullList.instance.addItem(newListItem);
    });
  }
  save(): void {
    // localstorage에 값 저장
    localStorage.setItem("myList", JSON.stringify(this._list));
  }
  clearList(): void {
    // _list 초기화 -> localstorage에 반영
    this._list = [];
    this.save();
  }
  addItem(itemObj: ListItem): void {
    this._list.push(itemObj);
    this.save();
  }
  removeItem(id: string): void {
    this._list = this._list.filter((item) => {
      return item.id !== id;
    });
    this.save();
  }
}
