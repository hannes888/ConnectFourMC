
class TreeNode {
  private _utility: number = 0;
  private _visits: number = 0;
  private _move: number;
  private _parent?: TreeNode | null;
  private _children: TreeNode[];

  constructor(move: number = 0) {
    this._move = move;
    this._children = [];
    this._parent = null;
  }

  public addChild(node: TreeNode) {
    this._children?.push(node);
  }

  public increaseVisits(n: number) {
    this._visits += n;
  }

  public increaseUtility(n: number) {
    this._visits += n;
  }


  get utility(): number {
    return this._utility;
  }

  set utility(value: number) {
    this._utility = value;
  }

  get visits(): number {
    return this._visits;
  }

  set visits(value: number) {
    this._visits = value;
  }

  get parent(): TreeNode | null | undefined {
    return this._parent;
  }

  set parent(value: TreeNode | null) {
    this._parent = value;
  }

  get children(): TreeNode[] | undefined {
    return this._children;
  }

  set children(value: TreeNode[]) {
    this._children = value;
  }


  get move(): number | null {
    return this._move;
  }

  set move(value: number | null) {
    this._move = value;
  }
}
